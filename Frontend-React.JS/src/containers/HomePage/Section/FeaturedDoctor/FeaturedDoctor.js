import React, { Component } from 'react';
import { connect } from "react-redux";
import './FeaturedDoctor.scss';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/FeaturedDoctor';
import banner from '../../../../assets/images/140311-background5.png';
import { fetchUserRole } from '../../../../store/actions/userActions';

class FeaturedDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: null
        }
    }

    componentDidMount() {
        this.props.fetchUserRole
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

        const FeaturedDoctors = [
            { image: images.bsNguyenVanLieu, title: 'Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn Liệu', description: 'Thần kinh' },
            { image: images.bsKieuDinhHung, title: 'Phó Giáo sư, Tiến sĩ Kiều Đình Hùng', description: 'Thần kinh,Cột sống,Ngoại thần kinh' },
            { image: images.bsThuyVi, title: 'Thạc sĩ, Bác sĩ Hứa Thúy Vi', description: 'Tiêu hoá,Bệnh Viêm gan' },
            { image: images.bsNguyenTienLang, title: 'Thầy thuốc Ưu tú, Bác sĩ CKII Nguyễn Tiến Lãng', description: 'Tiểu đường - Nội tiết,Ung bướu,Tuyến giáp' },
            { image: images.bsNguyenThiUt, title: 'Tiến sĩ, Bác sĩ Nguyễn Thị Út', description: 'Tiêu hoá,Bệnh Viêm gan' },
            { image: images.bsThaiHa, title: 'Tiến sĩ, Bác sĩ Vũ Thái Hà', description: 'Da liễu,Da liễu thẩm mỹ' }
        ];

        return (
            <div className='FeaturedDoctor-container'>
                <div className='FeaturedDoctor-header'>
                    <div className='FeaturedDoctor-header-title'>
                        <span>Bác sĩ nổi bật</span>
                    </div>
                    <div className='FeaturedDoctor-header-view-more'>
                        <button className='FeaturedDoctor-header-view-more-button'>Xem thêm</button>
                    </div>
                </div>
                <div className='FeaturedDoctor-content'>
                    <Slider {...settings}>
                        {FeaturedDoctors.map((FeaturedDoctor, index) => (
                            <div key={index} className="FeaturedDoctor-item">
                                <img src={FeaturedDoctor.image} alt={FeaturedDoctor.title} />
                                <span>{FeaturedDoctor.title}</span>
                                <span>{FeaturedDoctor.description}</span>
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
        userRole: state.user.userRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRole: () => dispatch(fetchUserRole())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor);
