import React, { Component } from 'react';
import { connect } from "react-redux";
import './Specialty.scss';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/Specialty';

class Specialty extends Component {
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
            { image: images.coXuongKhop, title: 'Cơ xương khớp' },
            { image: images.timMach, title: 'Tim mạch' },
            { image: images.taiMuiHong, title: 'Tai mũi họng' },
            { image: images.tieuHoa, title: 'Tiêu hóa' },
            { image: images.thanKinh, title: 'Thần kinh' },
            { image: images.cotSong, title: 'Cột sống' }
        ];

        return (
            <div className='specialty-container'>
                <div className='specialty-header'>
                    <div className='specialty-header-title'>
                        <span>Chuyên khoa phổ biến</span>
                    </div>
                    <div className='specialty-header-view-more'>
                        <button className='specialty-header-view-more-button'>Xem thêm</button>
                    </div>
                </div>
                <div className='specialty-content'>
                    <Slider {...settings}>
                        {specialties.map((specialty, index) => (
                            <div key={index} className="specialty-item">
                                <img src={specialty.image} alt={specialty.title} />
                                <span>{specialty.title}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
