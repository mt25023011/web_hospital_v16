import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userRedux.css";
import { Table, Button, Container, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaUserShield, FaUserMd, FaUser, FaGraduationCap, FaUserGraduate, FaUserTie, FaChalkboardTeacher, FaStethoscope, FaMars, FaVenus, FaUserSecret, FaExclamationTriangle } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchAllUsersStart, deleteUserStart } from "../../../store/actions/adminActions";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { ToastUtil } from "../../../utils";
import ConfirmModal from "../../../components/ConfirmModal";
import * as actions from "../../../store/actions";
import { Buffer } from "buffer";

class UserListShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: props.genders || [],
            positions: props.positions || [],
            roles: props.roles || [],
            usersRedux: [],
            isDeleting: false,
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({ 
                usersRedux: Array.isArray(this.props.userRedux) ? this.props.userRedux : [],
                isLoading: false,
                error: null
            });
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({ genders: this.props.genders });
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({ positions: this.props.positions });
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({ roles: this.props.roles });
        }
    }

    loadUsers = async () => {
        try {
            this.setState({ isLoading: true, error: null });
            await this.props.fetchAllUsersStart();
        } catch (error) {
            this.setState({ 
                isLoading: false,
                error: this.props.intl.formatMessage({ id: "system.user-manage.load-error" })
            });
            ToastUtil.error(
                this.props.intl.formatMessage({ id: "common.error" }),
                this.props.intl.formatMessage({ id: "system.user-manage.load-error" })
            );
        }
    };

    handleDelete = async (id) => {
        const { intl } = this.props;
        const userToDelete = this.state.usersRedux.find((user) => user.id === id);

        if (!userToDelete) {
            ToastUtil.error(
                intl.formatMessage({ id: "common.error" }),
                intl.formatMessage({ id: "system.user-manage.del-user-fail" })
            );
            return;
        }

        this.props.setContentOfConfirmModal({
            isOpen: true,
            messageId: "system.user-manage.sure-delete-user",
            status: "danger",
            handleFunc: async () => {
                this.setState({ isDeleting: true });
                try {
                    await this.props.deleteUserStart(id);
                    ToastUtil.success(
                        intl.formatMessage({ id: "common.success" }),
                        intl.formatMessage({ id: "system.user-manage.del-user-success" })
                    );
                    await this.loadUsers();
                } catch (error) {
                    ToastUtil.error(
                        intl.formatMessage({ id: "common.error" }),
                        intl.formatMessage({ id: "system.user-manage.del-user-fail" })
                    );
                } finally {
                    this.setState({ isDeleting: false });
                }
            },
        });
    };

    handleEdit = (user) => {
        this.props.handleEditFromParent(user);
    };

    getRoleIcon = (roleId) => {
        if (!roleId) return <FaUser className="me-1" />;
        switch (roleId) {
            case "R0": return <FaUserShield className="me-1" />;    // Admin
            case "R1": return <FaUserMd className="me-1" />;        // Doctor
            case "R2": return <FaUserSecret className="me-1" />;    // Patient
            default: return <FaUser className="me-1" />;
        }
    }

    getRoleColor = (roleId) => {
        switch (roleId) {
            case "R0": return "danger";     // Admin - Đỏ
            case "R1": return "primary";    // Doctor - Xanh dương
            case "R2": return "success";    // Patient - Xanh lá
            default: return "secondary";
        }
    }

    getGenderIcon = (gender) => {
        if (gender === null || gender === undefined) return <FaUser className="me-1" />;
        switch (gender) {
            case 1: return <FaMars className="me-1" />;     // Nam
            case 0: return <FaVenus className="me-1" />;    // Nữ
            default: return <FaUser className="me-1" />;
        }
    }

    getGenderColor = (gender) => {
        switch (gender) {
            case 1: return "info";      // Nam - Xanh nhạt
            case 0: return "warning";   // Nữ - Vàng
            default: return "secondary";
        }
    }

    getPositionIcon = (positionId) => {
        if (!positionId) return <FaUser className="me-1" />;
        switch (positionId) {
            case "P0": return <FaStethoscope className="me-1" />;      // Bác sĩ
            case "P1": return <FaUserGraduate className="me-1" />;     // Thạc sĩ
            case "P2": return <FaGraduationCap className="me-1" />;    // Tiến sĩ
            case "P3": return <FaChalkboardTeacher className="me-1" />; // Phó giáo sư
            case "P4": return <FaUserTie className="me-1" />;          // Giáo sư
            default: return <FaUser className="me-1" />;
        }
    }

    getPositionColor = (positionId) => {
        switch (positionId) {
            case "P0": return "primary";    // Bác sĩ
            case "P1": return "info";       // Thạc sĩ
            case "P2": return "success";    // Tiến sĩ
            case "P3": return "warning";    // Phó giáo sư
            case "P4": return "danger";     // Giáo sư
            default: return "secondary";
        }
    }

    renderUserImage = (item) => {
        if (item.image && item.image.data) {
            return (
                <img
                    src={`${Buffer.from(item.image.data, 'base64').toString('binary')}`}
                    alt={`${item.firstName} ${item.lastName}`}
                    className="img-fluid rounded-circle"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
            );
        }
        return (
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}>
                <FaUser className="text-secondary" />
            </div>
        );
    };

    renderTableContent = () => {
        const { isLoading, error, usersRedux } = this.state;

        if (isLoading) {
            return (
                <tr>
                    <td colSpan="10" className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </td>
                </tr>
            );
        }

        if (error) {
            return (
                <tr>
                    <td colSpan="10" className="text-center py-5">
                        <Alert variant="danger" className="d-flex align-items-center justify-content-center gap-2">
                            <FaExclamationTriangle />
                            {error}
                        </Alert>
                    </td>
                </tr>
            );
        }

        if (!Array.isArray(usersRedux) || usersRedux.length === 0) {
            return (
                <tr>
                    <td colSpan="10" className="text-center py-5">
                        <Alert variant="info" className="d-flex align-items-center justify-content-center gap-2">
                            <FaUser />
                            <FormattedMessage id="system.user-manage.no-users" />
                        </Alert>
                    </td>
                </tr>
            );
        }

        return usersRedux
            .sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((item, index) => (
                <tr key={item.id} className="border-bottom">
                    <td className="py-3 px-4 border-end">{index + 1}</td>
                    <td className="py-3 px-4 border-end">{this.renderUserImage(item)}</td>
                    <td className="py-3 px-4 border-end fw-medium">{item.firstName} {item.lastName}</td>
                    <td className="py-3 px-4 border-end">{item.email}</td>
                    <td className="py-3 px-4 border-end">{item.phoneNumber || '-'}</td>
                    <td className="py-3 px-4 border-end">{item.address || '-'}</td>
                    <td className="py-3 px-4 border-end">
                        <Badge
                            bg={this.getGenderColor(item.gender)}
                            className="d-flex align-items-center justify-content-center gap-1"
                        >
                            {this.getGenderIcon(item.gender)}
                            {this.props.genders.find(gender =>
                                gender && gender.key && item.gender !== null &&
                                parseInt(gender.key) === parseInt(item.gender)) ?
                                (this.props.language === LANGUAGES.VI ?
                                    this.props.genders.find(gender => parseInt(gender.key) === parseInt(item.gender)).value_Vi :
                                    this.props.genders.find(gender => parseInt(gender.key) === parseInt(item.gender)).value_En)
                                : '-'}
                        </Badge>
                    </td>
                    <td className="py-3 px-4 border-end">
                        <Badge
                            bg={this.getRoleColor(item.roleID)}
                            className="d-flex align-items-center justify-content-center gap-1"
                        >
                            {this.getRoleIcon(item.roleID)}
                            {this.props.roles.find(role => role.key === item.roleID) ?
                                (this.props.language === LANGUAGES.VI ?
                                    this.props.roles.find(role => role.key === item.roleID).value_Vi :
                                    this.props.roles.find(role => role.key === item.roleID).value_En)
                                : '-'}
                        </Badge>
                    </td>
                    <td className="py-3 px-4 border-end">
                        <Badge
                            bg={this.getPositionColor(item.positionID)}
                            className="d-flex align-items-center justify-content-center gap-1"
                        >
                            {this.getPositionIcon(item.positionID)}
                            {this.props.positions.find(position => position.key === item.positionID) ?
                                (this.props.language === LANGUAGES.VI ?
                                    this.props.positions.find(position => position.key === item.positionID).value_Vi :
                                    this.props.positions.find(position => position.key === item.positionID).value_En)
                                : '-'}
                        </Badge>
                    </td>
                    <td className="py-3 px-4">
                        <div className="d-flex justify-content-center gap-2">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="d-flex align-items-center gap-1"
                                onClick={() => this.handleEdit(item)}
                            >
                                <FaEdit />
                                <FormattedMessage id="system.user-manage.edit" />
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="d-flex align-items-center gap-1"
                                onClick={() => this.handleDelete(item.id)}
                                disabled={this.state.isDeleting}
                            >
                                {this.state.isDeleting ? (
                                    <Spinner animation="border" size="sm" className="me-1" />
                                ) : (
                                    <FaTrash />
                                )}
                                <FormattedMessage id="system.user-manage.delete" />
                            </Button>
                        </div>
                    </td>
                </tr>
            ));
    };

    render() {
        return (
            <Container className="mt-4">
                <ConfirmModal />
                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Header className="bg-white border-0 py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0 fw-bold text-primary">
                                <FormattedMessage id="menu.system.user-manage.header" />
                            </h4>
                            <Button
                                variant="primary"
                                onClick={this.loadUsers}
                                disabled={this.state.isLoading}
                                className="d-flex align-items-center gap-1"
                            >
                                {this.state.isLoading ? (
                                    <Spinner animation="border" size="sm" className="me-1" />
                                ) : (
                                    <FaUser className="me-1" />
                                )}
                                <FormattedMessage id="common.refresh" />
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 table-bordered">
                                <thead>
                                    <tr className="bg-dark text-white">
                                        <th className="py-3 px-4 border-end">#</th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.image" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.username" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.email" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.phone-number" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.address" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.gender" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.role" /></th>
                                        <th className="py-3 px-4 border-end"><FormattedMessage id="system.user-manage.position" /></th>
                                        <th className="py-3 px-4"><FormattedMessage id="system.user-manage.action" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableContent()}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userRedux: state.admin.users,
        language: state.app.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersStart: () => dispatch(fetchAllUsersStart()),
        deleteUserStart: (id) => dispatch(deleteUserStart(id)),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserListShow));
