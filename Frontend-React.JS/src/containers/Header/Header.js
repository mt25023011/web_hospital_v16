import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _  from 'lodash';
import { USER_ROLE } from '../../utils/constant';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLanguage: 'vi',
            currentMenu: []
        };
    }
    handleLanguageChange = (language) => {
        this.setState({
            currentLanguage: language
        });
        
        this.props.changeLanguageApp(language);
    }

    handleLogout = () => {
        this.props.processLogout();
        this.props.navigate('/login');
    }

    componentDidMount() {
        let userInfo = this.props.userInfo;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }else{
                menu = [];
            }
        }
        this.setState({
            currentMenu: menu
        });
    }

    render() {
        const { processLogout } = this.props;
        return (
            <div className="header-container ">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.currentMenu} />
                </div>
                <div className="header-right-container">
                    <div className="language">
                        <span className='welcome'><FormattedMessage id="menu.system.welcome" />,
                        {this.props.userInfo && this.props.userInfo.firstName ? " "+this.props.userInfo.firstName + "!" : 'Admin'} </span>
                        <span className={`language-item language-vi ${this.props.language === LANGUAGES.VI ? 'active' : ''}`} onClick={() => this.handleLanguageChange('vi')}>VN</span>
                        <span className={`language-item language-en ${this.props.language === LANGUAGES.EN ? 'active' : ''}`} onClick={() => this.handleLanguageChange('en')}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={this.handleLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language)),
        navigate: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
