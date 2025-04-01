import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle, faHospital, faSearch, faPhone, faBed, faUserAlt, faTooth, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

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
                            <div className='header-logo' onClick={() => this.props.history.push('/home')}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <FontAwesomeIcon className='f-question-icon' icon={faQuestionCircle} />
                                <FormattedMessage id="homeheader.support" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
