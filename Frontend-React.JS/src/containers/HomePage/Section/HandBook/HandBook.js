import React, { Component } from 'react';
import { connect } from "react-redux";
import '../MedicalFacility/MedicalFacility.scss';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/MedicalFacility';

class HandBook extends Component {

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
            { image: images.bvChoray, title: 'Top 8 bệnh viện, phòng khám Tai mũi họng nhi Hà Nội uy tín' },
            { image: images.bvChoray, title: 'Top 7 Bác sĩ khám Tai Mũi Họng giỏi, mát tay Hà Nội (phần 2)' },
            { image: images.bvChoray, title: 'B7 địa chỉ khám chữa bệnh Tai Mũi Họng tốt tại TPHCM (Phần 1)' },
            { image: images.bvChoray, title: 'Top 8 Bác sĩ Tai Mũi Họng giỏi ở Hà Nội (Phần 1)' },
            { image: images.bvChoray, title: 'Bệnh viện Chợ Rẫy' },
            { image: images.bvChoray, title: 'Bệnh viện Chợ Rẫy' },
        ];

        return (
            <div className='MedicalFacility-container'>
                <div className='MedicalFacility-header'>
                    <div className='MedicalFacility-header-title'>
                        <span>Cẩm nang</span>
                    </div>
                    <div className='MedicalFacility-header-view-more'>
                        <button className='MedicalFacility-header-view-more-button'>Xem thêm</button>
                    </div>
                </div>
                <div className='MedicalFacility-content'>
                    <Slider {...settings}>
                        {specialties.map((MedicalFacility, index) => (
                            <div key={index} className="MedicalFacility-item">
                                <img src={MedicalFacility.image} style={{ width: '100%', height: '200px' }} alt={MedicalFacility.title} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
