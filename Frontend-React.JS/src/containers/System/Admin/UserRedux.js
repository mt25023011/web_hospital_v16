import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserRedux.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            genders: [],
            formData: {
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                gender: "1",
                role: "2",
                address: "",
                image: null,
            },
        };
    }

    async componentDidMount() {
        try {
            let res = await userService.getAllCodesService("ROLE");
            let resGender = await userService.getAllCodesService("GENDER");
            this.setState({ roles: res.data, genders: resGender.data });
            console.log(res, resGender);
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleImageChange = (e) => {
        const file = e.target.files[0];
        this.setState({
            formData: { ...this.state.formData, image: file },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", this.state.formData);
    };

    render() {
        const { intl } = this.props;
        const { formData } = this.state;
        let language = this.props.language;
        console.log('Current language:', language);
        return (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-lg p-4 rounded-4 border-0">
                            <Card.Title className="text-center mb-4 fw-bold fs-4 text-primary">
                                <FormattedMessage id="system.user-manage.title" defaultMessage="User Registration" />
                            </Card.Title>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-capitalize">
                                        <FormattedMessage id="system.user-manage.email" defaultMessage="Email" />
                                    </Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-capitalize">
                                        <FormattedMessage id="system.user-manage.password" defaultMessage="Password" />
                                    </Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={this.handleChange} required />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-capitalize">
                                                <FormattedMessage id="system.user-manage.firstname" defaultMessage="First Name" />
                                            </Form.Label>
                                            <Form.Control type="text" name="firstname" value={formData.firstname} onChange={this.handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-capitalize">
                                                <FormattedMessage id="system.user-manage.lastname" defaultMessage="Last Name" />
                                            </Form.Label>
                                            <Form.Control type="text" name="lastname" value={formData.lastname} onChange={this.handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-capitalize">
                                                <FormattedMessage id="system.user-manage.gender" defaultMessage="Gender" />
                                            </Form.Label>
                                            <Form.Select name="gender" value={formData.gender} onChange={this.handleChange}>
                                                {this.state.genders.map((gender, index) => {
                                                    return (
                                                        <option key={gender.keyMap} value={index}>
                                                            {language === LANGUAGES.VI ? gender.value_Vi : gender.value_En}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-capitalize">
                                                <FormattedMessage id="system.user-manage.role" defaultMessage="Role" />
                                            </Form.Label>
                                            <Form.Select name="role" value={formData.role} onChange={this.handleChange}>
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

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-capitalize">
                                        <FormattedMessage id="system.user-manage.address" defaultMessage="Address" />
                                    </Form.Label>
                                    <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-capitalize">
                                        <FormattedMessage id="system.user-manage.profile-image" defaultMessage="Profile Image" />
                                    </Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={this.handleImageChange} />
                                    {formData.image && (
                                        <div className="text-center mt-3">
                                            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="rounded-circle shadow" width={100} height={100} />
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="text-center">
                                    <Button variant="primary" type="submit" className="px-4 py-2 fw-bold shadow-sm">
                                        <FormattedMessage id="system.user-manage.save" defaultMessage="Save" />
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));
