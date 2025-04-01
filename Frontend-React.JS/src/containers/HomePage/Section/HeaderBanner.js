import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions';
import '.././Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle, faHospital, faSearch, faPhone, faBed, faUserAlt, faTooth, faMicroscope } from '@fortawesome/free-solid-svg-icons';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { language } = this.props;
        return (
            <React.Fragment>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className="title1"><FormattedMessage id="banner.title1" /></div>
                        <div className="title2"><FormattedMessage id="banner.title2" /></div>
                        <div className="search">
                            <FontAwesomeIcon className='search-icon' icon={faSearch} />
                            <input type="text" placeholder={this.props.language === languages.VI ? "Tìm chuyên khoa khám bệnh" : "Find a medical specialty"} />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className="option">
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faHospital} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child1" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faPhone} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child2" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faBed} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child3" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faMicroscope} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child4" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faUserAlt} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child5" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon className='option-child-icon' icon={faTooth} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child6" /></div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
