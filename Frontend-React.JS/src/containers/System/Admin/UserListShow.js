import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userRedux.css";
import { Table, Button, Container, Card } from "react-bootstrap";

class UserListShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", phone: "1234567890", address: "123 Main St, Anytown, USA", gender: "Male", position: "Manager" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", phone: "1234567890", address: "123 Main St, Anytown, USA", gender: "Female", position: "Staff" },
                { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor", phone: "1234567890", address: "123 Main St, Anytown, USA", gender: "Male", position: "Editor" }
            ],
        };
    }

    handleDelete = (id) => {
        this.setState({ users: this.state.users.filter(user => user.id !== id) });
    };

    render() {
        return (
            <Container className="mt-5">
                <Card className="shadow-lg p-4 rounded-4 border-0 bg-white">
                    <Card.Title className="text-center mb-4">
                        <h3 className="fw-bold text-primary mb-0">User List</h3>
                    </Card.Title>
                    <Table striped bordered hover responsive className="text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.role}</td>
                                    <td>{user.position}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => this.handleDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        );
    }
}

export default UserListShow;
