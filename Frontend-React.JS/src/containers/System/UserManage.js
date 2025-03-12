import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {userService} from '../../services/';
class UserManage extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.getAllUsers();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {}

  getAllUsers = () => {
    userService.getAllUsers().then((res) => {
      console.log(res);
      this.setState({
        users: res,
      });
    });
  };

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender === 1 ? "Male" : "Female"}</td>
                  <td>{user.role === "R1" ? "Admin" : "User"}</td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
