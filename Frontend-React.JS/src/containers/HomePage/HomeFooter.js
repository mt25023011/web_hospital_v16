import React, { Component } from 'react';
import { connect } from "react-redux";
import './Home.scss';

class HomeFooter extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { language } = this.props;
        return (
            <div className='HomeFooter-container'>
                <div className='HomeFooter-content'>
                    <div className='HomeFooter-content-title'>
                        <p>&copy; 2025 Trịnh Quang Minh <b>All rights reserved</b></p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
