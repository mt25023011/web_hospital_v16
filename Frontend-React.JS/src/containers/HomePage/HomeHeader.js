import React, { Component } from 'react';
import { connect } from "react-redux";
import './HomeHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class HomeHeader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <FontAwesomeIcon className='f-bar-icon' icon={faBars} />
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-titke'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-titke'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-titke'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <FontAwesomeIcon className='f-question-icon' icon={faQuestionCircle} />
                                Hỗ trợ
                            </div>
                            <div className='flag'>
                                <div className='vn-flag'>VN</div>
                                <div className='en-flag'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <FontAwesomeIcon className='search-icon'  icon={faSearch} /> 
                            <input type="text" placeholder="Tìm kiếm chuyên khoa..." />
                            
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className="option">
                            <div className='option-child'>
                                <div className='option-child-icon'></div>
                                <div className='option-child-title'></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'></div>
                                <div className='option-child-title'></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'></div>
                                <div className='option-child-title'></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'></div>
                                <div className='option-child-title'></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'></div>
                                <div className='option-child-title'></div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
