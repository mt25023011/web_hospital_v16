import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Doctorschedule.css';
import { connect } from 'react-redux';
import { USER_ROLE } from '../../../utils/constant';
import _ from 'lodash';
import { fetchDoctorList } from '../../../store/actions/userActions';
import { fetchTimeStart } from '../../../store/actions/adminActions';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTimeSlot: null,
            selectedDoctor: '',
            selectedDate: '',
            timeSlots: [
            ],
            doctorList: [],
            currentUser: null,
            isUserInfoLoaded: false
        }
    }

    componentDidMount() {
        // Wait for user info to be loaded
        if (this.props.userInfo) {
            this.handleUserInfo();
            this.handleGetTime();
        }
        
    }

    componentDidUpdate(prevProps) {
        // Handle user info changes
        if (prevProps.userInfo !== this.props.userInfo) {
            this.handleUserInfo();
        }

        // Handle doctor list changes
        if (prevProps.isLoadingDoctorList !== this.props.isLoadingDoctorList && !this.props.isLoadingDoctorList) {
            if (this.props.doctorList && this.props.doctorList.length > 0) {
                this.handleGetDoctorList();
            }
        }

        // Handle time slots changes
        if (prevProps.time !== this.props.time && this.props.time) {
            this.handleGetTimeSlots();
        }
    }

    handleGetTime = () => {
        this.props.fetchTimeStart();
    }

    handleGetTimeSlots = () => {
        if (this.props.time && Array.isArray(this.props.time)) {
            this.setState({
                timeSlots: this.props.time.map(time => ({
                    id: time.keyMap,
                    label: time.value_En,
                    formatted: time.value_Vi
                }))
            });
        }
    }

    handleUserInfo = () => {
        const { userInfo } = this.props;
        
        if (userInfo && !_.isEmpty(userInfo)) {
            const role = userInfo.roleId;
            
            if (role === USER_ROLE.ADMIN) {
                // Fetch doctor list for admin
                this.props.fetchDoctorList();
            } else {
                // Set current doctor for non-admin users
                this.setState({
                    doctorList: [
                        {
                            id: userInfo.id,
                            name: userInfo.lastName + ' ' + userInfo.firstName
                        }
                    ]
                });
            }
            this.setState({ isUserInfoLoaded: true });
        } else {
            console.log('No userInfo available');
        }
    }

    handleGetDoctorList = () => {
        const { doctorList } = this.props;
        if (doctorList && Array.isArray(doctorList) && doctorList.length > 0) {
            this.setState({
                doctorList: doctorList.map(doctor => ({
                    id: doctor.id,
                    name: doctor.lastName + ' ' + doctor.firstName
                }))
            });
        } else {
            this.setState({
                doctorList: []
            });
        }
    }

    handleTimeSlotSelect = (timeSlot) => {
        this.setState({ selectedTimeSlot: timeSlot.id });
    }

    handleDoctorSelect = (event) => {
        this.setState({ selectedDoctor: event.target.value });
    }

    handleDateSelect = (event) => {
        this.setState({ selectedDate: event.target.value });
    }

    handleSaveSchedule = () => {
        const { selectedTimeSlot, selectedDoctor, selectedDate } = this.state;
        if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
            alert('Vui lòng chọn đầy đủ thông tin bác sĩ, ngày và giờ khám');
            return;
        }
        const schedule = {
            doctorId: selectedDoctor,
            timeSlot: selectedTimeSlot,
            date: selectedDate
        };
        console.log('Lưu thông tin khám bệnh', schedule);
    }
    
    render() {
        return (
            <Container>
                <Row className="mt-5">
                    <Col xs={12}>
                        <h1 className="text-center">Quản Lý Kế Hoạch Khám Bệnh Của Bác Sĩ</h1>
                    </Col>

                    {/* Chọn Bác Sĩ Khám Bệnh */}
                    <Col md={6}>
                        <div className="choose-doctor-container">
                            <h5 className="choose-doctor-title">Chọn Bác Sĩ Khám Bệnh</h5>
                            <Form.Control 
                                as="select" 
                                className="choose-doctor-list"
                                value={this.state.selectedDoctor}
                                onChange={this.handleDoctorSelect}
                            >
                                {this.state.doctorList && this.state.doctorList.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </Form.Control>
                        </div>
                    </Col>

                    {/* Chọn Ngày Khám Bệnh */}
                    <Col md={6}>
                        <div className="doctor-schedule-date">
                            <h5 className="doctor-schedule-title">Ngày Khám Bệnh</h5>
                            <Form.Control 
                                type="date" 
                                className="doctor-schedule-content"
                                min={new Date().toISOString().split('T')[0]}
                                value={this.state.selectedDate}
                                onChange={this.handleDateSelect}
                            />
                        </div>
                    </Col>

                    {/* Khoảng thời gian khám bệnh */}
                    <Col xs={12}>
                        <div className="time-slot">
                            <h6 className="mb-4">Khoảng thời gian khám bệnh</h6>
                            <Row className="g-3">
                                {this.state.timeSlots.map((timeSlot) => (
                                    <Col xs={3} md={1} key={timeSlot.id}>
                                        <Button
                                            variant={this.state.selectedTimeSlot === timeSlot.id ? "primary" : "outline-primary"} 
                                            className="w-100 time-slot-button mb-2"
                                            size='sm'
                                            onClick={() => this.handleTimeSlotSelect(timeSlot)}
                                            style={{
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {timeSlot.formatted}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>

                    {/* Lưu thông tin khám bệnh */}
                    <Col xs={12} className="text-center mt-4">
                        <Button variant="primary" onClick={this.handleSaveSchedule}>Lưu thông tin khám bệnh</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        doctorList: state.user.doctorList,
        isLoadingDoctorList: state.user.isLoadingDoctorList,
        time: state.admin.time,
        isLoadingTime: state.admin.isLoadingTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorList: () => dispatch(fetchDoctorList()),
        fetchTimeStart: () => dispatch(fetchTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);