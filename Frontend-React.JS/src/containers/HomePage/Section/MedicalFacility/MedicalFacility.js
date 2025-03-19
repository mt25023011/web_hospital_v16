import React, { Component } from 'react';
import { connect } from "react-redux";
import './MedicalFacility.scss';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/MedicalFacility';

class MedicalFacility extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const CustomArrow = ({ direction, onClick }) => (
            <div
                className={`custom-arrow ${direction}`}
                onClick={onClick}
            >
                <FontAwesomeIcon icon={direction === 'next' ? faArrowRight : faArrowLeft} />
            </div>
        );

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: <CustomArrow direction="next" />,
            prevArrow: <CustomArrow direction="prev" />,
        };

        const specialties = [
            { image: images.bvChoray, title: 'Bệnh viện Chợ Rẫy' },
            { image: images.hungViet, title: 'Bệnh viện Ung bướu Hưng Việt' },
            { image: images.medtaiHN, title: 'Hệ thống y tế MEDLATEC' },
            { image: images.yDuoc, title: 'Phòng khám Bệnh viện Đại học Y Dược 1' },
            { image: images.vietDuc, title: 'Bệnh viện Hữu nghị Việt Đức' },
            { image: images.doctorCheck, title: 'Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn' }
        ];

        return (
            <div className='MedicalFacility-container'>
                <div className='MedicalFacility-header'>
                    <div className='MedicalFacility-header-title'>
                        <span>Cơ sở y tế</span>
                    </div>
                    <div className='MedicalFacility-header-view-more'>
                        <button className='MedicalFacility-header-view-more-button'>Xem thêm</button>
                    </div>
                </div>
                <div className='MedicalFacility-content'>
                    <Slider {...settings}>
                        {specialties.map((MedicalFacility, index) => (
                            <div key={index} className="MedicalFacility-item">
                                <img src={MedicalFacility.image} alt={MedicalFacility.title} />
                                <span>{MedicalFacility.title}</span>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
