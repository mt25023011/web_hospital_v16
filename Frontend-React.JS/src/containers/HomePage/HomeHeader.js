import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import './HomeHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faQuestionCircle,faHospital,faSearch, faPhone, faBed, faUserAlt, faTooth, faMicroscope } from '@fortawesome/free-solid-svg-icons';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { language } = this.props;
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
                                <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.check-health"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <FontAwesomeIcon className='f-question-icon' icon={faQuestionCircle} />
                                <FormattedMessage id="homeheader.support"/>
                            </div>
                            <div className='language-switch'>
                                <span 
                                    className={language === languages.VI ? 'language-vi active' : 'language-vi'}
                                    onClick={() => this.changeLanguage(languages.VI)}
                                >
                                    VN
                                </span>
                                <span 
                                    className={language === languages.EN ? 'language-en active' : 'language-en'}
                                    onClick={() => this.changeLanguage(languages.EN)}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className="title1"><FormattedMessage id="banner.title1"/></div>
                        <div className="title2"><FormattedMessage id="banner.title2"/></div>
                        <div className="search">
                            <FontAwesomeIcon className='search-icon'  icon={faSearch} /> 
                            <input type="text" placeholder={this.props.language === languages.VI ? "Tìm chuyên khoa khám bệnh" : "Find a medical specialty"} />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className="option">
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faHospital} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child1"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faPhone} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child2"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faBed} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child3"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faMicroscope} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child4"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faUserAlt} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child5"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='option-child-icon'> <FontAwesomeIcon icon={faTooth} /></div>
                                <div className='option-child-text'><FormattedMessage id="banner.child6"/></div>
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
