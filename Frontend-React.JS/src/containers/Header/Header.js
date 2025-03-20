import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLanguage: 'vi'
        };
    }
    handleLanguageChange = (language) => {
        this.setState({
            currentLanguage: language
        });
        
        this.props.changeLanguageApp(language);

    }

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="header-right-container">
                    <div className="language">
                        <span className={`language-item language-vi ${this.props.language === LANGUAGES.VI ? 'active' : ''}`} onClick={() => this.handleLanguageChange('vi')}>VN</span>
                        <span className={`language-item language-en ${this.props.language === LANGUAGES.EN ? 'active' : ''}`} onClick={() => this.handleLanguageChange('en')}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
