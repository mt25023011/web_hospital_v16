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
      <div className="user-manage-container">
        <h1>User Manage</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
});

export default injectIntl(connect(null, mapDispatchToProps)(UserManage)); // Wrap with injectIntl
