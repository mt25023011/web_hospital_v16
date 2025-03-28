import React, { Component } from "react";
import { Modal, Button, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { userService } from "../../../services";
import { FormattedMessage } from 'react-intl';
import { ToastUtil } from "../../../utils";
import { injectIntl } from 'react-intl';

class ModelCreateUser extends Component {
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
    };
  }

  // Hàm resetForm để xóa dữ liệu
  resetForm = () => {
    this.setState({
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
    });
  };

  handleOnChangeInput = (event, type) => {
    if (type === "image") {
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

  toggle = () => {
    this.setState({
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
    });
    this.props.toggle();
  };

  handleCreateUser = (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName, phoneNumber, gender, roleID, image } = this.state;

    // Basic validation
    if (email === "" || password === "" || firstName === "" || lastName === "" || phoneNumber === "") {
      this.setState({
        errMessage: <FormattedMessage id="system.user-manage.invalid-input" />,
      });
      return;
    }

    // Clear error message before submission
    this.setState({
      errMessage: "",
    });

    // Create the user data object
    const data = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address: this.state.address,
      roleID,
      gender,
      image,
    };

    // Call the userService to create the user
    userService.createUser(data)
      .then(response => {
        const { intl } = this.props; // Get intl object

        // Use intl.formatMessage to get the string values
        const successMessage = intl.formatMessage({ id: "common.success" });
        const userCreationSuccessMessage = intl.formatMessage({ id: "system.user-manage.add-user-success" });

        // Show success toast with formatted messages
        ToastUtil.success(successMessage, userCreationSuccessMessage);

        // Reset form and close the modal after success
        this.resetForm();
        this.props.refreshUserList(); // Refresh the user list
        this.props.toggle(); // Close the modal
      })
      .catch(error => {
        console.error('Error creating user:', error);
        this.setState({
          errMessage: error.response?.data?.message || <FormattedMessage id="system.user-manage.add-user-fail" />,
        });
      });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg">
        <ModalHeader toggle={() => this.toggle()}>
          <i className="fas fa-user-plus me-2"></i>
          <FormattedMessage id="system.user-manage.add-user" />
        </ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            {this.state.errMessage && (
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle me-2"></i>
                {this.state.errMessage}
              </div>
            )}

            <form onSubmit={this.handleCreateUser} method="POST">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    <FormattedMessage id="system.user-manage.email" defaultMessage="Email" />
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
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2 text-primary"></i>
                    <FormattedMessage id="system.user-manage.password" defaultMessage="Password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                    placeholder="Enter password"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <i className="fas fa-user me-2 text-primary"></i>
                    <FormattedMessage id="system.user-manage.firstname" defaultMessage="First Name" />
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
                    <FormattedMessage id="system.user-manage.lastname" defaultMessage="Last Name" />
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
                    <FormattedMessage id="system.user-manage.phone-number" defaultMessage="Phone" />
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
                    <FormattedMessage id="system.user-manage.address" defaultMessage="Address" />
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
                    <FormattedMessage id="system.user-manage.gender" defaultMessage="Gender" />
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
                    <FormattedMessage id="system.user-manage.female" >
                      {(text) => <option value="0">{text}</option>}
                    </FormattedMessage>
                  </select>
                </div>

                <div className="col-md-2 mb-3">
                  <label htmlFor="role" className="form-label fw-bold">
                    <i className="fas fa-user-tag me-2 text-primary"></i>
                    <FormattedMessage id="system.user-manage.role" defaultMessage="Role" />
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
                    <FormattedMessage id="system.user-manage.image" defaultMessage="Image" />
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
          <Button color="primary" onClick={this.handleCreateUser}>
            <i className="fas fa-save me-2"></i>
            <FormattedMessage id="system.user-manage.save" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default injectIntl(ModelCreateUser);