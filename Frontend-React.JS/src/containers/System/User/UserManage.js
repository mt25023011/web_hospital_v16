import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import './UserManage.scss';
import ConfirmModal from "../../../components/ConfirmModal";
import * as actions from "../../../store/actions";
import { ToastUtil } from "../../../utils";
import ModelCreateUser from './ModelCreateUser';
import ModelEditUser from "./ModelEditUser";
import { FormattedMessage, injectIntl } from 'react-intl';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpen: false,
      isOpenEdit: false,
      currentUser: {},
    };
  }

  componentDidMount() {
    this.fetchUserList(); // Fetch the list of users
  }

  fetchUserList = () => {
    userService.getAllUsers().then((res) => {
      this.setState({
        users: res,
      });
    }).catch((error) => {
      console.log("Error fetching user list:", error);
    });
  };

  handleDeleteUser = (id) => {
    const userToDelete = this.state.users.find((user) => user.id === id);
    if (!userToDelete) {
      ToastUtil.error("Lỗi", "Người dùng không tồn tại");
      return;
    }

    const { intl } = this.props; // Ensure intl is available

    if (!intl) {
      console.error('intl is not available');
      return;
    }

    // Use intl.formatMessage to get the string values
    const successMessage = intl.formatMessage({ id: "common.success" });
    const errorMessage = intl.formatMessage({ id: "common.error" });
    const userCreationSuccessMessage = intl.formatMessage({ id: "system.user-manage.del-user-success" });
    const userCreationFailMessage = intl.formatMessage({ id: "system.user-manage.del-user-fail" });
    const sureDeleteUserMessage = intl.formatMessage({ id: "system.user-manage.sure-delete-user" });

    this.props.setContentOfConfirmModal({
      isOpen: true,
      messageId: sureDeleteUserMessage,
      status: "danger",
      handleFunc: () => {
        userService.deleteUser(id).then((res) => {
          if (res) {
            ToastUtil.success(successMessage, userCreationSuccessMessage);
            this.fetchUserList(); // Refresh the user list after deleting
          } else {
            ToastUtil.error(errorMessage, userCreationFailMessage);
          }
        }).catch((error) => {
          console.log("Error deleting user:", error);
          ToastUtil.error(errorMessage, userCreationFailMessage);
        });
      },
    });
  };

  handleEditUser = (user) => {
    this.setState({ isOpenEdit: true });
    this.setState({ currentUser: user });
  };

  handleAddUser = () => {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <div className="users-container">
        <ModelCreateUser
          isOpen={this.state.isOpen}
          toggle={() => this.setState({ isOpen: !this.state.isOpen })}
          refreshUserList={this.fetchUserList}
        />
        <ModelEditUser
          isOpen={this.state.isOpenEdit}
          toggle={() => this.setState({ isOpenEdit: !this.state.isOpenEdit })}
          refreshUserList={this.fetchUserList}
          currentUser={this.state.currentUser}
        />
        <ConfirmModal /> {/* Ensure this is rendered */}
        <div className="title text-center">
          <FormattedMessage id="system.user-manage.manage-users" />
        </div>
        <div className="users-table mt-4 mx-3">
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={this.handleAddUser}>
              <FormattedMessage id="system.user-manage.add-user" />
            </button>
          </div>
          <div className="table-responsive" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <table className="table table-hover table-bordered">
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"><FormattedMessage id="system.user-manage.image" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.email" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.fullname" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.address" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.phone-number" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.gender" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.role" /></th>
                  <th scope="col"><FormattedMessage id="system.user-manage.action" /></th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => (
                  <tr key={index} className="fs-5">
                    <th scope="row" className="text-center">{index + 1}</th>
                    <td className="text-center">
                      <img
                        src={user.image ? `${process.env.REACT_APP_BACKEND_URL}${user.image}` : 'http://localhost:8080/user/images/default.jfif'}
                        alt="User"
                        className="img-fluid rounded-circle"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{user.email}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td className="text-center">
                      {user.gender === 1 ? (
                        <span className="badge bg-primary fs-7"><FormattedMessage id="system.user-manage.male" /></span>
                      ) : (
                        <span className="badge bg-success fs-7"><FormattedMessage id="system.user-manage.female" /></span>
                      )}
                    </td>
                    <td className="text-center">
                      {user.roleID === "R0" ? (
                        <span className="badge bg-primary fs-7"><FormattedMessage id="system.user-manage.admin" /></span>
                      ) : user.roleID === "R1" ? (
                        <span className="badge bg-success fs-7"><FormattedMessage id="system.user-manage.doctor" /></span>
                      ) : (
                        <span className="badge bg-secondary fs-7"><FormattedMessage id="system.user-manage.patient" /></span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn px-2 fs-7 btn-edit" onClick={() => this.handleEditUser(user)}>
                          <i className="fas fa-pencil-alt"></i>
                          <span className="mx-2"><FormattedMessage id="system.user-manage.edit" /></span>
                        </button>
                        <button className="btn px-2 fs-7 btn-delete" onClick={() => this.handleDeleteUser(user.id)}>
                          <i className="fas fa-trash-alt"></i>
                          <span className="mx-2"><FormattedMessage id="system.user-manage.delete" /></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
});

export default injectIntl(connect(null, mapDispatchToProps)(UserManage)); // Wrap with injectIntl
