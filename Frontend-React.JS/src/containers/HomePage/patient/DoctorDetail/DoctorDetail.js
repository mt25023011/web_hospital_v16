import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeHeader from '../../../HomePage/HomeHeader';
import HomeFooter from '../../../HomePage/HomeFooter';
import { Container, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { fetchDoctorDetail } from '../../../../store/actions/userActions';
import { Buffer } from 'buffer';
import './DoctorDetail.scss';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserMd, FaGraduationCap } from 'react-icons/fa';

// Utility functions
const handleBase64Image = (image) => {
    if (image) {
        return Buffer.from(image, 'base64').toString('binary');
    }
    return '/assets/images/default-doctor.png';
};

const renderHTML = (html) => {
    return { __html: html };
};

// Sub-components
const DoctorBasicInfo = React.memo(({ doctorDetail }) => (
    <div className='doctor-detail-info'>
        <div className='doctor-detail-name'>
            <span>{`${doctorDetail.lastName} ${doctorDetail.firstName}`}</span>
        </div>
        <div className='doctor-detail-specialty'>
            <FaUserMd aria-hidden="true" />
            <span>{doctorDetail.positionData?.value_En || 'Doctor'}</span>
        </div>
        <div className='doctor-detail-phone'>
            <FaPhone aria-hidden="true" />
            <span>{doctorDetail.phoneNumber}</span>
        </div>
        <div className='doctor-detail-email'>
            <FaEnvelope aria-hidden="true" />
            <span>{doctorDetail.email}</span>
        </div>
        <div className='doctor-detail-address'>
            <FaMapMarkerAlt aria-hidden="true" />
            <span>{doctorDetail.address}</span>
        </div>
    </div>
));

const DoctorDescription = React.memo(({ description }) => (
    <div className='doctor-detail-description'>
        {description || 'No description available'}
    </div>
));

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            error: null
        };
    }

    componentDidMount() {
        this.loadDoctorDetail();
    }

    componentDidUpdate(prevProps) {
        const { id } = this.props.match.params;
        if (prevProps.match.params.id !== id) {
            this.setState({ doctorId: id, error: null });
            this.loadDoctorDetail();
        }
    }

    loadDoctorDetail = async () => {
        try {
            const { id } = this.props.match.params;
            await this.props.fetchDoctorDetail(id);
        } catch (error) {
            this.setState({ error: 'Failed to load doctor information. Please try again later.' });
        }
    };

    render() {
        const { doctorDetail, isLoadingDoctorDetail } = this.props;
        const { error } = this.state;

        return (
            <div>
                <HomeHeader />
                <Container>
                    <div className='doctor-detail-container'>
                        {isLoadingDoctorDetail ? (
                            <div className="text-center my-5" role="status" aria-label="Loading doctor information">
                                <Spinner animation="border">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : error ? (
                            <Alert variant="danger" className="my-5">
                                {error}
                            </Alert>
                        ) : doctorDetail ? (
                            <div className='doctor-detail-content'>
                                <div className='doctor-detail-left'>
                                    <div className='doctor-detail-image'>
                                        <img
                                            src={handleBase64Image(doctorDetail.image)}
                                            alt={`Doctor ${doctorDetail.firstName} ${doctorDetail.lastName}`}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <DoctorBasicInfo doctorDetail={doctorDetail} />
                                </div>
                                <div className='doctor-detail-right'>
                                    <h3>About Doctor</h3>
                                    <DoctorDescription description={doctorDetail.doctorData?.description} />
                                    <div className='doctor-detail-education'>
                                        <h3>Education & Experience</h3>
                                        <div 
                                            className='education-content'
                                            dangerouslySetInnerHTML={renderHTML(doctorDetail.doctorData?.contentHTML || 'No education information available')}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center my-5">
                                <p>No doctor information available</p>
                            </div>
                        )}
                    </div>
                </Container>
                <HomeFooter />
            </div>
        );
    }
}

DoctorDetail.propTypes = {
    doctorDetail: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        positionData: PropTypes.shape({
            value_En: PropTypes.string
        }),
        doctorData: PropTypes.shape({
            description: PropTypes.string,
            contentHTML: PropTypes.string
        })
    }),
    isLoadingDoctorDetail: PropTypes.bool,
    fetchDoctorDetail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    doctorDetail: state.user.doctorDetail,
    isLoadingDoctorDetail: state.user.isLoadingDoctorDetail
});

const mapDispatchToProps = dispatch => ({
    fetchDoctorDetail: (doctorId) => dispatch(fetchDoctorDetail(doctorId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
