import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../../services';
import { toast } from 'react-toastify';

class ModelEditUser extends Component {
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

    // Fetch user info when modal opens
    componentDidMount() {
        if (this.props.currentUser && this.props.currentUser.id) {
            this.getUserInfo(this.props.currentUser.id);
        }
    }

    // If currentUser changes, update the user info
    componentDidUpdate(prevProps) {
        if (this.props.currentUser && this.props.currentUser.id !== prevProps.currentUser.id) {
            this.getUserInfo(this.props.currentUser.id);
        }
    }

    async getUserInfo(id) {
        console.log("Fetching user info for id:", id);
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
        } catch (error) {
            console.error("Error fetching user:", error);
            this.setState({ errMessage: "Error loading user data" });
        }
    };

    // Handle input changes
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
    };

    // Handle user data update
    handleEditUser = async (event) => {
        event.preventDefault();
        const { id, email, firstName, lastName, phoneNumber, gender, address, roleID, image } = this.state;

        // Create the data to send to the API
        const userData = {
            id,
            email,
            firstName,
            lastName,
            phoneNumber,
            gender,
            address,
            roleID,
            image,  // If you want to handle image upload, you'll need to process it
        };

        try {
            // Call the service to update user info
            const response = await userService.updateUser(userData);
            console.log('User updated successfully:', response);
            toast.success(<FormattedMessage id="system.user-manage.edit-user-success" />);
            this.props.refreshUserList();  // Fetch users after successful update
            this.props.toggle();  // Close the modal after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(<FormattedMessage id="system.user-manage.edit-user-fail" />);
            this.setState({ errMessage: "Error updating user data" });
        }
    };

    // Close modal
    toggle = () => {
        this.props.toggle();
    };

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>
                    <i className="fas fa-user-plus me-2"></i>
                    <FormattedMessage id="system.user-manage.edit-user" />
                </ModalHeader>
                <ModalBody>
                    <div className="container-fluid">
                        {this.state.errMessage && (
                            <div className="alert alert-danger">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {this.state.errMessage}
                            </div>
                        )}

                        <form onSubmit={this.handleEditUser}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <i className="fas fa-envelope me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.email" />
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        <i className="fas fa-user me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.firstname" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        <i className="fas fa-user me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.lastname" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                        placeholder="Enter last name"
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">
                                        <i className="fas fa-phone me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.phone-number" />
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

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="address" className="form-label">
                                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.address" />
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

                                <div className="col-md-2 mb-3">
                                    <label htmlFor="gender" className="form-label fw-bold">
                                        <i className="fas fa-venus-mars me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.gender" />
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="form-select form-select-lg"
                                        value={this.state.gender}
                                        onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    >
                                        <FormattedMessage id="system.user-manage.male">
                                            {(text) => <option value="1">{text}</option>}
                                        </FormattedMessage>
                                        <FormattedMessage id="system.user-manage.female">
                                            {(text) => <option value="0">{text}</option>}
                                        </FormattedMessage>
                                    </select>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <label htmlFor="role" className="form-label fw-bold">
                                        <i className="fas fa-user-tag me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.role" />
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="form-select form-select-lg"
                                        value={this.state.roleID}
                                        onChange={(event) => this.handleOnChangeInput(event, 'roleID')}
                                    >
                                        <FormattedMessage id="system.user-manage.admin">
                                            {(text) => <option value="0">{text}</option>}
                                        </FormattedMessage>
                                        <FormattedMessage id="system.user-manage.doctor">
                                            {(text) => <option value="1">{text}</option>}
                                        </FormattedMessage>
                                        <FormattedMessage id="system.user-manage.patient">
                                            {(text) => <option value="2">{text}</option>}
                                        </FormattedMessage>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="image" className="form-label fw-bold">
                                        <i className="fas fa-image me-2 text-primary"></i>
                                        <FormattedMessage id="system.user-manage.image" />
                                    </label>
                                    <div className="d-flex align-items-center gap-3">
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={(event) => this.handleOnChangeInput(event, 'image')}
                                        />
                                        {this.state.imagePreviewUrl && (
                                            <img src={this.state.imagePreviewUrl} alt="Preview" style={{ width: "50px", height: "50px" }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>
                        <i className="fas fa-times me-2"></i>
                        <FormattedMessage id="system.user-manage.close" />
                    </Button>
                    <Button color="primary" onClick={this.handleEditUser}>
                        <i className="fas fa-save me-2"></i>
                        <FormattedMessage id="system.user-manage.save" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModelEditUser;
