import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userRedux.css";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";
import { createUser, fetchGenderStart, fetchPositionStart, fetchRoleStart } from "../../../store/actions/adminActions";
import * as actions from "../../../store/actions";
import UserListShow from "./UserListShow";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            genders: [],
            positions: [],
            formData: {
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                gender: 0,
                role: 2,
                position: 0,
                phoneNumber: "",
                address: "",
                image: null,
            },
            errors: {
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                address: "",
                phoneNumber: "",
            }
        };
    }

    async componentDidMount() { 
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({ genders: this.props.genders });
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({ positions: this.props.positions });
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({ roles: this.props.roles });
        }
    }

    validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword = (password) => {
        return password.length >= 6;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let errors = { ...this.state.errors };

        // Validate fields
        switch (name) {
            case 'email':
                errors.email = this.validateEmail(value) ? '' : this.props.intl.formatMessage({ id: "validate.email" });
                break;
            case 'password':
                errors.password = this.validatePassword(value) ? '' : this.props.intl.formatMessage({ id: "validate.password" });
                break;
            case 'firstname':
                errors.firstname = value.length < 2 ? this.props.intl.formatMessage({ id: "validate.firstName" }) : '';
                break;
            case 'lastname':
                errors.lastname = value.length < 2 ? this.props.intl.formatMessage({ id: "validate.lastName" }) : '';
                break;
            case 'address':
                errors.address = value.length < 5 ? this.props.intl.formatMessage({ id: "validate.address" }) : '';
                break;
            case 'phoneNumber':
                errors.phoneNumber = value.length < 10 ? this.props.intl.formatMessage({ id: "validate.phoneNumber" }) : '';
                break;
            default:
                break;
        }

        this.setState({
            errors,
            formData: {
                ...this.state.formData,
                [name]: value,
            },
        });
    };

    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('File must be an image');
                return;
            }
            this.setState({
                formData: { ...this.state.formData, image: file },
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.formData.email === '') {
            this.setState({ errors: { ...this.state.errors, email: this.props.intl.formatMessage({ id: "validate.email" }) } });
            return;
        }
        if(this.state.formData.password === '') {
            this.setState({ errors: { ...this.state.errors, password: this.props.intl.formatMessage({ id: "validate.password" }) } });
            return;
        }
        if(this.state.formData.firstname === '') {
            this.setState({ errors: { ...this.state.errors, firstname: this.props.intl.formatMessage({ id: "validate.firstName" }) } });
            return;
        }
        if(this.state.formData.lastname === '') {
            this.setState({ errors: { ...this.state.errors, lastname: this.props.intl.formatMessage({ id: "validate.lastName" }) } });
            return;
        }
        if(this.state.formData.phoneNumber === '') {
            this.setState({ errors: { ...this.state.errors, phoneNumber: this.props.intl.formatMessage({ id: "validate.phoneNumber" }) } });
            return;
        }
        if(this.state.formData.address === '') {
            this.setState({ errors: { ...this.state.errors, address: this.props.intl.formatMessage({ id: "validate.address" }) } });
            return;
        }
        try {
            let formData = { ...this.state.formData };
            if (formData.role !== "1") {
                formData.position = "";
            }
            let data = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstname,
                lastName: formData.lastname,
                phoneNumber: formData.phoneNumber,
                gender: parseInt(formData.gender),
                roleID: formData.role,
                positionID: formData.position,
                address: formData.address,
                image: formData.image ? formData.image.name : "",
            }
            this.props.createUser(data);
            // Add your API call here
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error appropriately
        }
    };

    render() {
        const { intl } = this.props;
        const { formData, errors } = this.state;
        let language = this.props.language;

        return (
            <Container className="mt-1">
                <Row className="justify-content-center">
                    <Col md={12} lg={12}>
                        <Card className="shadow-lg p-4 rounded-4 border-0 bg-white container-user">
                            <Card.Title className="text-center mb-5">
                                <h3 className="fw-bold text-primary mb-0">
                                    <FormattedMessage id="system.user-manage.title" defaultMessage="User Registration" />
                                </h3>
                                <div className="text-muted small mt-2">
                                    <FormattedMessage id="system.user-manage.subtitle" defaultMessage="Please fill in the information below" />
                                </div>
                            </Card.Title>
                            <Form onSubmit={this.handleSubmit} encType="multipart/form-data" className="needs-validation">
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-capitalize fw-medium">
                                        <FormattedMessage id="system.user-manage.email" defaultMessage="Email" />
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={this.handleChange}
                                        required
                                        isInvalid={!!errors.email}
                                        className="py-2"
                                        placeholder="Enter your email"
                                    />
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-capitalize fw-medium">
                                        <FormattedMessage id="system.user-manage.password" defaultMessage="Password" />
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={this.handleChange}
                                        required
                                        isInvalid={!!errors.password}
                                        className="py-2"
                                        placeholder="Enter your password"
                                    />
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row className="g-4">
                                    <Col>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.firstname" defaultMessage="First Name" />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstname"
                                                value={formData.firstname}
                                                onChange={this.handleChange}
                                                required
                                                isInvalid={!!errors.firstname}
                                                className="py-2"
                                                placeholder="Enter first name"
                                            />
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors.firstname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.lastname" defaultMessage="Last Name" />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={this.handleChange}
                                                required
                                                isInvalid={!!errors.lastname}
                                                className="py-2"
                                                placeholder="Enter last name"
                                            />
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors.lastname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="g-4">
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.gender" defaultMessage="Gender" />
                                            </Form.Label>
                                            <Form.Select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={this.handleChange}
                                                className="py-2"
                                            >
                                                {this.state.genders.map((gender, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {language === LANGUAGES.VI ? gender.value_Vi : gender.value_En}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.role" defaultMessage="Role" />
                                            </Form.Label>
                                            <Form.Select
                                                name="role"
                                                value={formData.role}
                                                onChange={this.handleChange}
                                                className="py-2"
                                            >
                                                {this.state.roles.map((role, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {language === LANGUAGES.VI ? role.value_Vi : role.value_En}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.phoneNumber" defaultMessage="Phone Number" />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={this.handleChange}
                                                required
                                                isInvalid={!!errors.phoneNumber}
                                                className="py-2"
                                                placeholder="Enter your phone number"
                                            />
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    {formData.role === "1" && (
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="text-capitalize fw-medium">
                                                    <FormattedMessage id="system.user-manage.position" defaultMessage="Position" />
                                                </Form.Label>
                                                <Form.Select
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={this.handleChange}
                                                    className="py-2"
                                                >
                                                    {this.state.positions.map((position, index) => {
                                                        return (
                                                            <option key={index} value={index}>
                                                                {language === LANGUAGES.VI ? position.value_Vi : position.value_En}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>


                                <Form.Group className="mb-4">
                                    <Form.Label className="text-capitalize fw-medium">
                                        <FormattedMessage id="system.user-manage.address" defaultMessage="Address" />
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={formData.address}
                                        onChange={this.handleChange}
                                        required
                                        isInvalid={!!errors.address}
                                        className="py-2"
                                        placeholder="Enter your address"
                                    />
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-capitalize fw-medium">
                                        <FormattedMessage id="system.user-manage.profile-image" defaultMessage="Profile Image" />
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={this.handleImageChange}
                                        className="py-2"
                                    />
                                    {formData.image && (
                                        <div className="text-center mt-3">
                                            <img
                                                src={URL.createObjectURL(formData.image)}
                                                alt="Preview"
                                                className="rounded-circle shadow-sm border border-2 border-primary"
                                                width={120}
                                                height={120}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="text-center d-flex justify-content-center gap-3 mt-5">
                                    <Button
                                        type="submit"
                                        className="px-5 py-2 fw-bold shadow-sm save-btn"
                                        disabled={Object.values(errors).some(error => error !== '')}
                                        onClick={this.handleSubmit}
                                    >
                                        <FormattedMessage id="system.user-manage.save" defaultMessage="Save" />
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <UserListShow />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenderStart: () => dispatch(fetchGenderStart()),
        fetchPositionStart: () => dispatch(fetchPositionStart()),
        fetchRoleStart: () => dispatch(fetchRoleStart()),
        createUser: (data) => dispatch(createUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));
