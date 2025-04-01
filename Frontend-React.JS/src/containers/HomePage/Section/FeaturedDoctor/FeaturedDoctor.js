import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './temp.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchDoctorList } from '../../../../store/actions/userActions';
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";

// Constants for the slider settings
const SLIDER_SETTINGS = {
    dots: true,
    speed: 500,
    slidesToScroll: 1,
    pauseOnHover: true,
    infinite: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
};

// Utility function for image transformation
const transformImage = (imageBase64) => {
    if (!imageBase64) return null;
    try {
        return Buffer.from(imageBase64, 'base64').toString('binary');
    } catch (error) {
        console.error('Error transforming image:', error);
        return null;
    }
};

// Memoized CustomArrow component for the navigation arrows
const CustomArrow = React.memo(({ direction, onClick, disabled }) => (
    <div
        className={`custom-arrow ${direction} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? onClick : null}
        onKeyPress={(e) => e.key === 'Enter' && !disabled && onClick()}
        role="button"
        tabIndex={0}
        aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
    >
        <FontAwesomeIcon icon={direction === 'next' ? faArrowRight : faArrowLeft} />
    </div>
));

CustomArrow.propTypes = {
    direction: PropTypes.oneOf(['next', 'prev']).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

// DoctorCard component to display individual doctor information
const DoctorCard = React.memo(({ doctor, language, onClick }) => {
    const position = doctor.positionData?.[language === 'vi' ? 'value_Vi' : 'value_En'] || '';
    const image = transformImage(doctor.image);

    return (
        <div className="FeaturedDoctor-item" role="article" onClick={onClick}>
            <img
                src={image}
                alt={`${doctor.lastName} ${doctor.firstName}`}
                loading="lazy"
                className='FeaturedDoctor-item-image'
                onError={(e) => {
                    e.target.src = '/images/doctor-placeholder.png';
                }}
            />
            <div className='FeaturedDoctor-item-info'>
                <div className='FeaturedDoctor-item-info-name'>
                    <span className='position-absolute'>{position}</span>
                    <span>{doctor.lastName} {doctor.firstName}</span>
                </div>
                <div className='FeaturedDoctor-item-info-description'>
                    <span>{doctor.description}</span>
                </div>
            </div>
        </div>
    );
});

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        image: PropTypes.string,
        positionData: PropTypes.object,
        description: PropTypes.string
    }).isRequired,
    language: PropTypes.string.isRequired
};

class FeaturedDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: [],
            isLoading: true,
            error: null,
            currentIndex: 0  // To track the current slide index
        };
    }

    componentDidMount() {
        this.getDoctorList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.doctorList !== this.props.doctorList) {
            this.setState({
                doctorList: this.props.doctorList,
                isLoading: false
            });
        }
    }

    getDoctorList = async () => {
        try {
            this.setState({ isLoading: true, error: null });
            await this.props.fetchDoctorList();
        } catch (error) {
            this.setState({
                isLoading: false,
                error: this.props.intl.formatMessage({ id: "system.user-manage.load-error" })
            });
        }
    };

    getLanguage = () => {
        return this.props.language === 'vi' ? 'value_Vi' : 'value_En';
    }

    handleSlideChange = (currentIndex) => {
        this.setState({ currentIndex });
    };

    handleDoctorClick = (doctorId) => {
        console.log("doctorId", doctorId);
        this.props.history.push(`/patient/doctor-detail/${doctorId}`);
    };

    render() {
        const { doctorList = [], language } = this.props;
        const { currentIndex } = this.state;
        const settings = {
            ...SLIDER_SETTINGS,
            infinite: doctorList?.length > 4,
            slidesToShow: Math.min(4, doctorList?.length || 0),
            arrows: doctorList?.length > 4,
            nextArrow: (
                <CustomArrow
                    direction="next"
                    onClick={() => this.slider.slickNext()}
                    disabled={currentIndex === doctorList.length - 1}
                />
            ),
            prevArrow: (
                <CustomArrow
                    direction="prev"
                    onClick={() => this.slider.slickPrev()}
                    disabled={currentIndex === 0}
                />
            ),
            beforeChange: (oldIndex, newIndex) => {
                this.handleSlideChange(newIndex);
            },
            ref: (slider) => (this.slider = slider)
        };

        return (
            <section className='FeaturedDoctor-container' aria-label="Featured Doctors Section">
                <div className='FeaturedDoctor-header'>
                    <h2 className='FeaturedDoctor-header-title'>
                        <FormattedMessage id="homepage.featured-doctor" defaultMessage="Bác sĩ nổi bật" />
                        
                    </h2>
                    <div className='FeaturedDoctor-header-view-more'>
                        <button 
                            className='FeaturedDoctor-header-view-more-button'
                            aria-label="View more doctors"
                        >
                            <FormattedMessage id="homepage.view-more" defaultMessage="Xem thêm" />
                        </button>
                    </div>
                </div>
                <div className='FeaturedDoctor-content' >
                    {this.state.isLoading ? (
                        <div className="loading-container" role="status" aria-label="Loading doctors">
                            <div className="loading-spinner"></div>
                            <p>
                                <FormattedMessage id="common.loading" defaultMessage="Đang tải..." />
                            </p>
                        </div>
                    ) : this.state.error ? (
                        <div className="error-container" role="alert">
                            <p>{this.state.error}</p>
                        </div>
                    ) : doctorList?.length > 0 ? (
                        <Slider {...settings}>
                            {doctorList.map((doctor, index) => (
                                <DoctorCard 
                                    key={`${doctor.id || index}`} 
                                    doctor={doctor} 
                                    language={language}
                                    onClick={() => this.handleDoctorClick(doctor.id)}
                                />
                            ))}
                        </Slider>
                    ) : (
                        <div className="no-data-container" role="status">
                            <p>
                                <FormattedMessage id="common.no-data" defaultMessage="Không có dữ liệu" />
                            </p>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

FeaturedDoctor.propTypes = {
    doctorList: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    isLoadingDoctorList: PropTypes.bool.isRequired,
    fetchDoctorList: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    doctorList: state.user.doctorList,
    language: state.app.language,
    isLoadingDoctorList: state.user.isLoadingDoctorList
});

const mapDispatchToProps = dispatch => ({
    fetchDoctorList: () => dispatch(fetchDoctorList())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(FeaturedDoctor)));
