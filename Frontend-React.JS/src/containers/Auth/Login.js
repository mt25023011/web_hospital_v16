import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12">
                            <form className="login-form mt-3">
                                <h1 className="text-center col-12 mb-4">Login</h1>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="mb-2">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="mb-2">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn-submit">Login</button>
                                <div className="row justify-content-center mb-4">
                                    <span className='col-5'>Forgot your password?</span>
                                    <span className='col-6'>Don't have an account? <a href="#">Sign up</a></span>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-12 text-center mb-3">
                                        <span>Or login with:</span>
                                    </div>
                                    <div className="col-12 text-center social-login">
                                        <button type="button" className="btn btn-social mx-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>
                                        </button>
                                        <button type="button" className="btn btn-social mx-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
<path d="M52,96C27.738,96,8,76.262,8,52S27.738,8,52,8c11.018,0,21.562,4.095,29.689,11.529 c1.264,1.155,2.033,2.803,2.106,4.518c0.073,1.712-0.55,3.418-1.71,4.68l-8.528,9.269l15.189-0.003 c3.079,0,5.758,2.189,6.371,5.205C95.703,46.081,96,49.043,96,52C96,76.262,76.262,96,52,96z" opacity=".35"></path><path fill="#f2f2f2" d="M50,94C25.738,94,6,74.262,6,50S25.738,6,50,6c11.018,0,21.562,4.095,29.689,11.529 c1.264,1.155,2.033,2.803,2.106,4.518c0.073,1.712-0.55,3.418-1.71,4.68l-8.528,9.269l15.189-0.003 c3.079,0,5.758,2.189,6.371,5.205C93.703,44.081,94,47.043,94,50C94,74.262,74.262,94,50,94z"></path><path fill="#f9b84f" d="M86.697,42.747h-3.022v-0.156h-33.77V57.6H71.11c-3.094,8.737-11.407,15.009-21.206,15.009 c-12.433,0-22.513-10.08-22.513-22.513s10.08-22.513,22.513-22.513c5.739,0,10.96,2.165,14.936,5.702L75.454,22.67 c-6.702-6.246-15.666-10.097-25.549-10.097c-20.722,0-37.522,16.801-37.522,37.522s16.801,37.522,37.522,37.522 s37.522-16.801,37.522-37.522C87.427,47.58,87.168,45.124,86.697,42.747z"></path><path fill="#f4665c" d="M16.708,32.631l12.328,9.041c3.336-8.259,11.414-14.09,20.868-14.09 c5.739,0,10.96,2.165,14.936,5.702L75.454,22.67c-6.702-6.246-15.666-10.097-25.549-10.097 C35.492,12.573,22.993,20.71,16.708,32.631z"></path><path fill="#96c362" d="M49.904,87.618c9.692,0,18.499-3.709,25.157-9.741L63.448,68.05 c-3.767,2.854-8.45,4.559-13.544,4.559c-9.76,0-18.046-6.223-21.168-14.908L16.5,67.129C22.71,79.28,35.321,87.618,49.904,87.618z"></path><path fill="#2785bd" d="M86.697,42.747h-3.022v-0.156h-33.77V57.6H71.11c-1.486,4.197-4.186,7.816-7.668,10.452 c0.002-0.002,0.004-0.002,0.006-0.004l11.613,9.827c-0.822,0.747,12.366-9.019,12.366-27.78 C87.427,47.58,87.168,45.124,86.697,42.747z"></path><path fill="none" stroke="#40396e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M86.747,42.492L49.5,42.5v15h21.715c-3.089,8.738-11.419,15-21.215,15c-12.426,0-22.5-10.074-22.5-22.5 c0-12.426,10.074-22.5,22.5-22.5c5.834,0,11.149,2.221,15.147,5.862l10.155-11.038C68.632,16.224,59.751,12.5,50,12.5 c-20.711,0-37.5,16.789-37.5,37.5S29.289,87.5,50,87.5S87.5,70.711,87.5,50C87.5,47.429,87.24,44.918,86.747,42.492z"></path>
</svg>
                                        </button>
                                        <button type="button" className="btn btn-social mx-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path fill="#af87ce" d="M25,48C12.318,48,2,37.683,2,25S12.318,2,25,2s23,10.317,23,23S37.682,48,25,48z M25,6 C14.523,6,6,14.523,6,25s8.523,19,19,19s19-8.523,19-19S35.477,6,25,6z"></path><path fill="#af87ce" d="M25,32c-6.617,0-12-4.528-12-10.095c0-1.765,0.546-3.486,1.586-5.015l0.702-6.771l5.557,2.317 c2.672-0.832,5.639-0.832,8.311,0l5.557-2.317l0.702,6.771c1.04,1.528,1.586,3.25,1.586,5.015C37,27.472,31.617,32,25,32z M18.712,15.881l-0.261,2.52l-0.347,0.449C17.372,19.801,17,20.828,17,21.905C17,25.266,20.589,28,25,28s8-2.734,8-6.095 c0-1.077-0.372-2.104-1.104-3.056L31.549,18.4l-0.261-2.52l-2.028,0.847l-0.744-0.282c-2.23-0.844-4.802-0.844-7.032,0 l-0.744,0.282L18.712,15.881z"></path><path fill="#af87ce" d="M33,46h-4V36c0-2.206-1.794-4-4-4s-4,1.794-4,4v10h-4V36c0-4.411,3.589-8,8-8s8,3.589,8,8V46z"></path><path fill="#af87ce" d="M18.391,40.44c-6.794-3.519-9.19-10.512-9.289-10.808l3.793-1.271 c0.02,0.058,2.016,5.771,7.335,8.526L18.391,40.44z"></path><path fill="#742bc9" d="M17,42.209v4.353c1.283,0.478,2.621,0.839,4,1.082v-4.077C19.601,43.267,18.267,42.801,17,42.209z"></path><path fill="#742bc9" d="M29,43.568v4.077c1.379-0.243,2.717-0.604,4-1.082v-4.353C31.733,42.801,30.399,43.267,29,43.568z"></path>
</svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
