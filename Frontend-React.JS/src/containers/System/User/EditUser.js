import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from '../../../services';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            roleID: 2,
            gender: 0,
            image: null,
            imagePreviewUrl: null,
            errMessage: "",
            id: "",
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }
    handleOnChangeInput = (event, type) => {
        if (type === 'image') {
            const file = event.target.files[0];
            this.setState({
                image: file,
                imagePreviewUrl: URL.createObjectURL(file),
            });
        } else {
            this.setState({
                [type]: event.target.value,
            });
        }
    }
    async getUserInfo() {
        let id = this.props.match?.params?.id;
        if (!id) {
            // Get ID from URL directly if props.match is not available
            const pathSegments = window.location.pathname.split('/');
            id = pathSegments[pathSegments.length - 1];
        }
        console.log("User ID:", id);
        if (id) {
            try {
                const response = await userService.getUserInfo(id);
                const { email, firstName, lastName, phoneNumber, gender: originGender, address, roleID: originalRoleID } = response;
                const transformGender = originGender === true ? 1 : 0;
                const transformedRoleID = originalRoleID === "R0" ? 0 : originalRoleID === "R1" ? 1 : 2;
                this.setState({
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    gender: transformGender,
                    roleID: transformedRoleID,
                    address,
                    id,
                });
                console.log("User info:", response.gender);
                console.log("User info:", response.roleID);
            } catch (error) {
                console.error("Error fetching user:", error);
                this.setState({ errMessage: "Error loading user data" });
            }
        }
    };

    handleEditUser = async (event) => {
        event.preventDefault();
        const { email, firstName, lastName, phoneNumber, gender, roleID, address, id } = this.state;
        const { image } = this.state;
        const data = {
            email,
            firstName,
            lastName,
            phoneNumber,
            gender,
            roleID,
            address,
            id,
            image,
        };
        console.log("Data:", data);

        userService.updateUser(data)
            .then(response => {
                console.log('Response from update success:', response);
                alert('User Update successfully!');
                this.props.history.push('/system/user-manage/');
            })
            .catch(error => {
                console.error('Error Update user:', error);
                this.setState({
                    errMessage: error.response?.data?.message || 'Error creating user'
                });
            });
    };

    render() {
        return (
            <div className="container">
                <div className="create-user-container border border-primary rounded shadow p-4 mt-5">
                    <h2 className="text-center mb-4 text-primary">
                        <FormattedMessage id="createUser.title" defaultMessage="Edit User" />
                    </h2>
                    <div className="d-flex justify-content-end mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.props.history.push('/system/user-manage')}
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Return
                        </button>
                    </div>

                    {this.state.errMessage && (
                        <div className="alert alert-danger">
                            <i className="fas fa-exclamation-circle me-2"></i>
                            {this.state.errMessage}
                        </div>
                    )}

                    <form className="row g-3" onSubmit={this.handleEditUser} method="POST">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label fw-bold">
                                <i className="fas fa-envelope me-2 text-primary"></i>
                                <FormattedMessage id="createUser.email" defaultMessage="Email" />
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName" className="form-label fw-bold">
                                <i className="fas fa-user me-2 text-primary"></i>
                                <FormattedMessage id="createUser.firstName" defaultMessage="First Name" />
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control form-control-lg"
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName" className="form-label fw-bold">
                                <i className="fas fa-user me-2 text-primary"></i>
                                <FormattedMessage id="createUser.lastName" defaultMessage="Last Name" />
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control form-control-lg"
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="address" className="form-label fw-bold">
                                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                <FormattedMessage id="createUser.address" defaultMessage="Address" />
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control form-control-lg"
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                placeholder="Enter address"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="phoneNumber" className="form-label fw-bold">
                                <i className="fas fa-phone me-2 text-primary"></i>
                                <FormattedMessage id="createUser.phoneNumber" defaultMessage="Phone" />
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control form-control-lg"
                                value={this.state.phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <label htmlFor="gender" className="form-label fw-bold">
                                <i className="fas fa-venus-mars me-2 text-primary"></i>
                                <FormattedMessage id="createUser.gender" defaultMessage="Gender" />
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-select form-select-lg"
                                value={this.state.gender}
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                            >
                                <FormattedMessage id="createUser.gender.male" defaultMessage="Male">
                                    {text => <option value="1">{text}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="createUser.gender.female" defaultMessage="Female">
                                    {text => <option value="0">{text}</option>}
                                </FormattedMessage>
                            </select>
                        </div>

                        <div className="col-md-2 mb-3">
                            <label htmlFor="role" className="form-label fw-bold">
                                <i className="fas fa-user-tag me-2 text-primary"></i>
                                <FormattedMessage id="createUser.role" defaultMessage="Role" />
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="form-select form-select-lg"
                                value={this.state.roleID}
                                onChange={(event) => this.handleOnChangeInput(event, 'roleID')}
                            >
                                <FormattedMessage id="createUser.role.admin" defaultMessage="Admin">
                                    {text => <option value="0">{text}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="createUser.role.user" defaultMessage="Doctor">
                                    {text => <option value="1">{text}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="createUser.role.user" defaultMessage="Patient">
                                    {text => <option value="2">{text}</option>}
                                </FormattedMessage>
                            </select>
                        </div>

                        <div className="col-12 mb-3">
                            <label htmlFor="image" className="form-label fw-bold">
                                <i className="fas fa-image me-2 text-primary"></i>
                                <FormattedMessage id="createUser.image" defaultMessage="Image" />
                            </label>
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control form-control-lg"
                                    onChange={(event) => this.handleOnChangeInput(event, 'image')}
                                />
                                {this.state.imagePreviewUrl && (
                                    <div className="position-relative">
                                        <img
                                            src={this.state.imagePreviewUrl}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 d-grid mt-4">
                            <button type="submit" className="btn btn-primary btn-lg">
                                <i className="fas fa-save me-2"></i>
                                <FormattedMessage id="createUser.submit" defaultMessage="Submit" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
