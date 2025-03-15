import React, { Component } from "react";
import { connect } from "react-redux";
import { userService } from "../../../services";
import './UserManage.scss';
import ConfirmModal from "../../../components/ConfirmModal";
import * as actions from "../../../store/actions";
import { ToastUtil } from "../../../utils";
import ModelCreateUser from './ModelCreateUser';
import ModelEditUser from "./ModelEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpen: false,
      isOpenEdit: false,
      currentUser:{},
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

    this.props.setContentOfConfirmModal({
      isOpen: true,
      messageId: `Bạn có chắc chắn muốn xóa người dùng ${userToDelete.firstName} ${userToDelete.lastName}?`,
      status: "danger",
      handleFunc: () => {
        userService.deleteUser(id).then((res) => {
          if (res) {
            ToastUtil.success("Thành công", "Xóa người dùng thành công");
            this.fetchUserList(); // Refresh the user list after deleting
          } else {
            ToastUtil.error("Lỗi", "Xóa người dùng thất bại");
          }
        }).catch((error) => {
          console.log("Error deleting user:", error);
          ToastUtil.error("Lỗi", "Có lỗi xảy ra khi xóa người dùng");
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
        <div className="title text-center">Manage Users</div>
        <div className="users-table mt-4 mx-3">
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={this.handleAddUser}>
              Add User
            </button>
          </div>
          <div className="table-responsive" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <table className="table table-hover table-bordered">
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Email</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
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
                        <span className="badge bg-primary fs-7">Male</span>
                      ) : (
                        <span className="badge bg-success fs-7">Female</span>
                      )}
                    </td>
                    <td className="text-center">
                      {user.roleID === "R0" ? (
                        <span className="badge bg-primary fs-7">Admin</span>
                      ) : user.roleID === "R1" ? (
                        <span className="badge bg-success fs-7">Doctor</span>
                      ) : (
                        <span className="badge bg-secondary fs-7">Patient</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn px-2 fs-7 btn-edit" onClick={() => this.handleEditUser(user)}>
                          <i className="fas fa-pencil-alt"></i>
                          <span className="mx-2">Edit</span>
                        </button>
                        <button className="btn px-2 fs-7 btn-delete" onClick={() => this.handleDeleteUser(user.id)}>
                          <i className="fas fa-trash-alt"></i>
                          <span className="mx-2">Delete</span>
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

const mapStateToProps = (state) => ({
  // mapStateToProps logic here
});

const mapDispatchToProps = (dispatch) => ({
  setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
