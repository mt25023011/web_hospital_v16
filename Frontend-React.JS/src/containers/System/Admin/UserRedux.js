import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col, Alert, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";
import { createUser, fetchGenderStart, fetchPositionStart, fetchRoleStart, fetchAllUsersStart, updateUserStart } from "../../../store/actions/adminActions";
import * as actions from "../../../store/actions";
import UserListShow from "./UserListShow";
import { FaSave, FaExclamationCircle } from 'react-icons/fa';
import ToastUtil from "../../../utils/ToastUtil";
import { CRUD_ACTION } from "../../../utils/constant";
import CommonUtils from "../../../utils/CommonUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userRedux.css";
import { validateUser } from '../../../services/validationService';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            genders: [],
            positions: [],
            formData: {
                id: "",
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
            action: CRUD_ACTION.CREATE,
            errors: {
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                address: "",
                phoneNumber: "",
            },
            showSuccessAlert: false,
            isSubmitting: false,
            showConfirmReturn: false,
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

    handleChange = (e) => {
        const { name, value } = e.target;
        let errors = { ...this.state.errors };

        // Validate fields using service
        switch (name) {
            case 'email':
                errors.email = validateUser.email(value) ? '' : this.props.intl.formatMessage({ id: "validate.email" });
                break;
            case 'password':
                errors.password = validateUser.password(value) ? '' : this.props.intl.formatMessage({ id: "validate.password" });
                break;
            case 'firstname':
            case 'lastname':
                errors[name] = validateUser.name(value) ? '' : this.props.intl.formatMessage({ id: `validate.${name}` });
                break;
            case 'address':
                errors.address = validateUser.address(value) ? '' : this.props.intl.formatMessage({ id: "validate.address" });
                break;
            case 'phoneNumber':
                errors.phoneNumber = validateUser.phoneNumber(value) ? '' : this.props.intl.formatMessage({ id: "validate.phoneNumber" });
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

    handleImageChange = async (e) => {
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
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                formData: { ...this.state.formData, image: file, imageBase64: base64 },
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form using service
        const { isValid, errors } = validateUser.validateForm(this.state.formData, this.props.intl);

        if (!isValid) {
            this.setState({ errors });
            return;
        }

        this.setState({ isSubmitting: true }); // Start loading

        const successMessage = this.props.intl.formatMessage({ id: "common.success" });
        const userCreationSuccessMessage = this.props.intl.formatMessage({ id: "system.user-manage.add-user-success" });
        const userCreationFailMessage = this.props.intl.formatMessage({ id: "system.user-manage.add-user-fail" });
        const errorMessage = this.props.intl.formatMessage({ id: "common.error" });

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
                image: formData.imageBase64,
            }
            let res = await this.props.createUser(data);
            console.log("res", res);
            if (res && res.status === 201) {
                await this.props.fetchAllUsersStart();
                ToastUtil.success(successMessage, userCreationSuccessMessage);
                this.handleReset();
            }
            else {
                ToastUtil.error(errorMessage, res?.message || userCreationFailMessage);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            ToastUtil.error(
                this.props.intl.formatMessage({ id: "common.error" }),
                this.props.intl.formatMessage({ id: "system.user-manage.add-user-fail" })
            );
        } finally {
            this.setState({ isSubmitting: false }); // End loading
        }
    };
    handleEditFromParent = (user) => {
        console.log("user Parent", user);
        if (user.roleID === "R1") {
            user.roleID = 1;
            if (user.positionID === "P0") {
                user.positionID = 0;
            } else if (user.positionID === "P1") {
                user.positionID = 1;
            } else if (user.positionID === "P2") {
                user.positionID = 2;
            } else if (user.positionID === "P3") {
                user.positionID = 3;
            } else {
                user.positionID = 4;
            }
        } else if (user.roleID === "R0") {
            user.roleID = 0;
            user.positionID = "";
        } else if (user.roleID === "R2") {
            user.roleID = 2;
            user.positionID = "";
        }
        console.log("user Edit", user);
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            action: CRUD_ACTION.EDIT,
            formData: {
                id: user.id,
                email: user.email,
                password: "Hardcoded password",
                firstname: user.firstName,
                lastname: user.lastName,
                gender: user.gender,
                role: user.roleID,
                position: user.positionID,
                phoneNumber: user.phoneNumber,
                address: user.address,
                image: imageBase64,
                imageBase64: imageBase64,
            }
        });
    }
    handleUpdate = async (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true }); // Thêm loading state

        const successMessage = this.props.intl.formatMessage({ id: "common.success" });
        const errorMessage = this.props.intl.formatMessage({ id: "common.error" });
        const userUpdateSuccessMessage = this.props.intl.formatMessage({ id: "system.user-manage.update-user-success" });
        const userUpdateFailMessage = this.props.intl.formatMessage({ id: "system.user-manage.update-user-fail" });

        try {
            let formData = { ...this.state.formData };
            const user = {
                id: formData.id,
                firstName: formData.firstname,
                lastName: formData.lastname,
                gender: formData.gender,
                roleID: formData.role,
                positionID: formData.position,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                image: formData.image,
            }
            await this.props.updateUserStart(user);
            await this.props.fetchAllUsersStart();

            ToastUtil.success(successMessage, userUpdateSuccessMessage);
            this.handleReset();
        } catch (error) {
            console.error("Error updating user:", error);
            ToastUtil.error(errorMessage, userUpdateFailMessage);
        } finally {
            this.setState({ isSubmitting: false }); // Kết thúc loading state
        }
    }
    handleReset = () => {
        this.setState({
            action: CRUD_ACTION.CREATE,
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
                imageBase64: "",
            },
        });
        this.props.fetchAllUsersStart();
    }
    handleReturnClick = () => {
        this.setState({ showConfirmReturn: true });
    };

    handleConfirmReturn = () => {
        this.handleReset();
        this.setState({ showConfirmReturn: false });
    };

    handleCancelReturn = () => {
        this.setState({ showConfirmReturn: false });
    };

    render() {
        const { formData, errors } = this.state;
        let language = this.props.language;

        return (
            <Container className="mt-4">

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
                                <Row>
                                    <Col>
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
                                                disabled={this.state.action === CRUD_ACTION.EDIT}
                                                placeholder="Enter your email"
                                            />
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="text-capitalize fw-medium">
                                                <FormattedMessage id="system.user-manage.password" defaultMessage="Password" />
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                disabled={this.state.action === CRUD_ACTION.EDIT}
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
                                    </Col>
                                </Row>
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
                                    {formData.role === "1" && this.state.action === CRUD_ACTION.CREATE && (
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
                                    {this.state.action === CRUD_ACTION.EDIT && (
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
                                                src={this.state.action === CRUD_ACTION.EDIT ? formData.imageBase64 : URL.createObjectURL(formData.image)}
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
                                        className={`px-5 py-2 fw-bold shadow-sm save-btn ${this.state.action === CRUD_ACTION.EDIT ? 'btn-warning' : 'btn-primary'}`}
                                        disabled={Object.values(errors).some(error => error !== '') || this.state.isSubmitting}
                                        onClick={this.state.action === CRUD_ACTION.EDIT ? this.handleUpdate : this.handleSubmit}
                                    >
                                        {this.state.isSubmitting ? (
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <FaSave className="me-2" />
                                        )}
                                        {this.state.action === CRUD_ACTION.EDIT ? (
                                            <FormattedMessage id="system.user-manage.update" defaultMessage="Update" />
                                        ) : (
                                            <FormattedMessage id="system.user-manage.save" defaultMessage="Save" />
                                        )}
                                    </Button>
                                    {
                                        this.state.action === CRUD_ACTION.EDIT && (
                                            <Button
                                                variant="danger"
                                                onClick={this.handleReturnClick}
                                            >
                                                <FormattedMessage id="system.user-manage.reset" defaultMessage="Return" />
                                            </Button>
                                        )
                                    }
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <UserListShow
                    genders={this.state.genders}
                    positions={this.state.positions}
                    roles={this.state.roles}
                    language={this.props.language}
                    handleEditFromParent={this.handleEditFromParent}
                    action={this.state.action}
                />

                <Modal
                    show={this.state.showConfirmReturn}
                    onHide={this.handleCancelReturn}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FormattedMessage id="system.user-manage.confirm-title" defaultMessage="Confirm Return" />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <FaExclamationCircle className="text-warning mb-3" size={50} />
                            <p>
                                <FormattedMessage
                                    id="system.user-manage.confirm-message"
                                    defaultMessage="Are you sure you want to return? All unsaved changes will be lost."
                                />
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button
                            variant="secondary"
                            onClick={this.handleCancelReturn}
                            className="px-4"
                        >
                            <FormattedMessage id="system.user-manage.cancel" defaultMessage="Cancel" />
                        </Button>
                        <Button
                            variant="danger"
                            onClick={this.handleConfirmReturn}
                            className="px-4"
                        >
                            <FormattedMessage id="system.user-manage.confirm" defaultMessage="Confirm" />
                        </Button>
                    </Modal.Footer>
                </Modal>
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
        fetchAllUsersStart: () => dispatch(fetchAllUsersStart()),
        updateUserStart: (data) => dispatch(updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));