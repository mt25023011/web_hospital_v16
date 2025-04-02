import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeHeader from '../../../HomePage/HomeHeader';
import HomeFooter from '../../../HomePage/HomeFooter';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { fetchDoctorDetail } from '../../../../store/actions/userActions';
import { Buffer } from 'buffer';
import './DoctorDetail.scss';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserMd } from 'react-icons/fa';

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

// Icon component
const InfoIcon = React.memo(({ icon: Icon, text }) => (
    <div className='info-item'>
        <Icon className='info-icon' aria-hidden="true" />
        <span>{text}</span>
    </div>
));

InfoIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired
};

// Sub-components
const DoctorBasicInfo = React.memo(({ doctorDetail }) => (
    <div className='doctor-detail-info'>
        <div className='doctor-detail-name'>
            <span>{`${doctorDetail.lastName} ${doctorDetail.firstName}`}</span>
        </div>
        <InfoIcon icon={FaUserMd} text={doctorDetail.positionData?.value_En || 'Doctor'} />
        <InfoIcon icon={FaPhone} text={doctorDetail.phoneNumber} />
        <InfoIcon icon={FaEnvelope} text={doctorDetail.email} />
        <InfoIcon icon={FaMapMarkerAlt} text={doctorDetail.address} />
    </div>
));

DoctorBasicInfo.propTypes = {
    doctorDetail: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        positionData: PropTypes.shape({
            value_En: PropTypes.string
        }),
        phoneNumber: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired
};

const DoctorDescription = React.memo(({ description }) => (
    <div className='doctor-detail-description'>
        {description || 'No description available'}
    </div>
));

DoctorDescription.propTypes = {
    description: PropTypes.string
};

const DoctorEducation = React.memo(({ contentHTML }) => (
    <div className='doctor-education-container'>
        <div
            className='education-content'
            dangerouslySetInnerHTML={renderHTML(contentHTML || 'No education information available')} 
        />
    </div>
));

DoctorEducation.propTypes = {
    contentHTML: PropTypes.string
};

const DoctorDetail = ({ doctorDetail, isLoadingDoctorDetail, fetchDoctorDetail, match, location }) => {
    const [error, setError] = useState(null);

    // Scroll to top effect
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        };

        scrollToTop();
    }, [location.pathname]);

    // Load doctor detail effect
    useEffect(() => {
        const loadDoctorDetail = async () => {
            try {
                await fetchDoctorDetail(match.params.id);
            } catch (error) {
                setError('Failed to load doctor information. Please try again later.');
            }
        };

        loadDoctorDetail();
    }, [match.params.id, fetchDoctorDetail]);

    return (
        <div className="doctor-detail-page">
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
                        <>
                            <div className='doctor-detail-content'>
                                <div className='doctor-detail-left'>
                                    <div className='doctor-detail-image'>
                                        <img
                                            src={handleBase64Image(doctorDetail.image)}
                                            alt={`Doctor ${doctorDetail.firstName} ${doctorDetail.lastName}`}
                                            className="img-fluid" />
                                    </div>
                                </div>
                                <div className='doctor-detail-right'>
                                    <DoctorBasicInfo doctorDetail={doctorDetail} />
                                    <div className='doctor-detail-section'>
                                        <h3>About Doctor</h3>
                                        <DoctorDescription description={doctorDetail.doctorData?.description} />
                                    </div>
                                </div>
                            </div>
                            <DoctorEducation contentHTML={doctorDetail.doctorData?.contentHTML} />
                        </>
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
};

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
    fetchDoctorDetail: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    doctorDetail: state.user.doctorDetail,
    isLoadingDoctorDetail: state.user.isLoadingDoctorDetail
});

const mapDispatchToProps = dispatch => ({
    fetchDoctorDetail: (doctorId) => dispatch(fetchDoctorDetail(doctorId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
