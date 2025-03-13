import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from '../../../services';

class CreateUser extends Component {
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

    handleCreateUser = (event) => {
        event.preventDefault();
        const { email, password, firstName, lastName, phoneNumber, gender, roleID, image } = this.state;
        
        // Basic validation
        if (email === "" || password === "" || firstName === "" || lastName === "" || phoneNumber === "") {
            this.setState({
                errMessage: "Please fill all fields",
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
                console.log('Response from createUser:', response);
                alert('User created successfully!');
                this.props.history.push('/system/user-manage/');
            })
            .catch(error => {
                console.error(error); // handle error if necessary
                this.setState({
                    errMessage: error.response ? error.response.data : error.message,
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="create-user-container border border-primary p-4 mt-5">
                    <h2 className="text-center"><FormattedMessage id="createUser.title" defaultMessage="Create New User" /></h2>
                    <form className="row mt-4" onSubmit={this.handleCreateUser} method="POST">
                        {/* Email */}
                        <div className="form-group col-6 mb-2">
                            <label htmlFor="email"><FormattedMessage id="createUser.email" defaultMessage="Email" /></label>
                            <input type="email" id="email" name="email" className="form-control"
                                value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, 'email')}
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group col-6 mb-2">
                            <label htmlFor="password"><FormattedMessage id="createUser.password" defaultMessage="Password" /></label>
                            <input type="password" id="password" name="password" className="form-control"
                                value={this.state.password} onChange={(event) => this.handleOnChangeInput(event, 'password')}
                            />
                        </div>

                        {/* First Name */}
                        <div className="form-group col-6 mb-2">
                            <label htmlFor="firstName"><FormattedMessage id="createUser.firstName" defaultMessage="First Name" /></label>
                            <input type="text" id="firstName" name="firstName" className="form-control"
                                value={this.state.firstName} onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="form-group col-6 mb-2">
                            <label htmlFor="lastName"><FormattedMessage id="createUser.lastName" defaultMessage="Last Name" /></label>
                            <input type="text" id="lastName" name="lastName" className="form-control"
                                value={this.state.lastName} onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-group col-3 mb-2">
                            <label htmlFor="phoneNumber"><FormattedMessage id="createUser.phoneNumber" defaultMessage="Phone" /></label>
                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control"
                                value={this.state.phoneNumber} onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group col-3 mb-2">
                            <label htmlFor="address"><FormattedMessage id="createUser.address" defaultMessage="Address" /></label>
                            <input type="text" id="address" name="address" className="form-control"
                                value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>

                        {/* Gender */}
                        <div className="form-group col-3 mb-2">
                            <label htmlFor="gender"><FormattedMessage id="createUser.gender" defaultMessage="Gender" /></label>
                            <select id="gender" name="gender" className="form-control"
                                value={this.state.gender} onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                <FormattedMessage id="createUser.gender.male" defaultMessage="Male">
                                    {text => <option value="1">{text}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="createUser.gender.female" defaultMessage="Female">
                                    {text => <option value="0">{text}</option>}
                                </FormattedMessage>
                            </select>
                        </div>

                        {/* Role */}
                        <div className="form-group col-3 mb-2">
                            <label htmlFor="role"><FormattedMessage id="createUser.role" defaultMessage="Role" /></label>
                            <select id="role" name="role" className="form-control"
                                value={this.state.roleID} onChange={(event) => this.handleOnChangeInput(event, 'roleID')}>
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

                        {/* Image */}
                        <div className="form-group col-6 mb-2 d-flex align-items-center">
                            <label htmlFor="image" className="mr-2"><FormattedMessage id="createUser.image" defaultMessage="Image" /></label>
                            <input type="file" id="image" name="image" className="form-control mr-2"
                                onChange={(event) => this.handleOnChangeInput(event, 'image')} />
                            {this.state.imagePreviewUrl && (
                                <img src={this.state.imagePreviewUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} className="img-thumbnail" />
                            )}
                        </div>

                        {/* Error Message */}
                        {this.state.errMessage && (
                            <div className="alert alert-danger">
                                {this.state.errMessage}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary mt-4"><FormattedMessage id="createUser.submit" defaultMessage="Submit" /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
