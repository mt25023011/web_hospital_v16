import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userRedux.css";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaUserShield, FaUserMd, FaUser, FaGraduationCap, FaUserGraduate, FaUserTie, FaChalkboardTeacher, FaStethoscope, FaMars, FaVenus, FaUserSecret } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchAllUsersStart, deleteUserStart } from "../../../store/actions/adminActions";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { ToastUtil } from "../../../utils";
import ConfirmModal from "../../../components/ConfirmModal";
import * as actions from "../../../store/actions";

class UserListShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: props.genders || [],
            positions: props.positions || [],
            roles: props.roles || [],
            usersRedux: []
        };
    }
    componentDidMount() {
        this.props.fetchAllUsersStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({ usersRedux: this.props.userRedux });
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

    handleDelete = (id) => {
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
            handleFunc: () => {
                let res = this.props.deleteUserStart(id);
                if (res) {
                    ToastUtil.success(
                        intl.formatMessage({ id: "common.success" }),
                        intl.formatMessage({ id: "system.user-manage.del-user-success" })
                    );
                    setTimeout(() => {
                        this.props.fetchAllUsersStart();
                    }, 500);
                } else {
                    ToastUtil.error(
                        intl.formatMessage({ id: "common.error" }),
                        intl.formatMessage({ id: "system.user-manage.del-user-fail" })
                    );
                }
            },
        });
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

    render() {
        return (
            <Container className="mt-4">
                <ConfirmModal />
                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Header className="bg-white border-0 py-4">
                        <h4 className="mb-0 fw-bold text-primary text-center">
                            <FormattedMessage id="menu.system.user-manage.header" />
                        </h4>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 table-bordered">
                                <thead>
                                    <tr className="bg-dark text-white">
                                        <th className="py-3 px-4 border-end">#</th>
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
                                    {[...this.props.userRedux]
                                        .sort((a, b) => {
                                            if (!a.createdAt || !b.createdAt) return 0;
                                            return new Date(b.createdAt) - new Date(a.createdAt);
                                        })
                                        .map((item, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="py-3 px-4 border-end">{index + 1}</td>
                                                <td className="py-3 px-4 border-end fw-medium">{item.firstName} {item.lastName}</td>
                                                <td className="py-3 px-4 border-end">{item.email}</td>
                                                <td className="py-3 px-4 border-end">{item.phoneNumber}</td>
                                                <td className="py-3 px-4 border-end">{item.address}</td>
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
                                                            : ''}
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
                                                            : ''}
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
                                                            : ''}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="d-flex align-items-center gap-1"
                                                        >
                                                            <FaEdit />
                                                            <FormattedMessage id="system.user-manage.edit" />
                                                        </Button>
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            className="d-flex align-items-center gap-1"
                                                            onClick={() => this.handleDelete(item.id)}
                                                        >
                                                            <FaTrash />
                                                            <FormattedMessage id="system.user-manage.delete" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
        userRedux: state.admin.users
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
