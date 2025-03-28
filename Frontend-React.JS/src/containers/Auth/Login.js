import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {userService} from '../../services/';
import {authService} from '../../services/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false
        }
    }
    handleOnChangeInput = (event, type) => {
        this.setState({
            [type]: event.target.value
        });
    }
    handleLogin = async() => {
        this.setState({
            errMessage: ''
        });
        try {
            const res = await authService.handleLogin(this.state.email, this.state.password);
            if(res.errCode !== 0){
                this.setState({
                    errMessage: res.message
                });
            }else{
                
                this.props.userLoginSuccess(res.user);
            }

        } catch (error) {
            this.setState({
                errMessage: "hãy nhập email hoặc mật khẩu"
            });
        }
    }
    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12">
                            <div className="login-form mt-3">
                                <h1 className="text-center col-12 mb-4">Login</h1>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="mb-2">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        placeholder="Enter email" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="mb-2">Password</label>
                                    <div className="input-group">
                                        <input type={this.state.showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={this.state.password}
                                            className="form-control"
                                            onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                            placeholder="Enter password" />
                                        <i className={`fas ${this.state.showPassword ? 'fa-eye-slash' : 'fa-eye'} input-group-text`}
                                            onClick={() => this.handleShowPassword()}
                                        ></i>
                                    </div>

                                </div>
                                <div className="col-12">
                                    {this.state.errMessage && <div className="alert alert-danger">{this.state.errMessage}</div>}
                                </div>
                                {/* login button */}
                                <button type="submit" className="btn-submit"
                                    onClick={() => this.handleLogin()}
                                    onKeyDown={(event) => {
                                        if(event.key === 'Enter'){
                                            this.handleLogin();
                                        }
                                    }}
                                >Login</button>

                                {/* forgot password */}
                                <div className="row justify-content-center mb-4">
                                    <span className='col-5'>Forgot your password?</span>
                                    <span className='col-6'>Don't have an account? <a href="#">Sign up</a></span>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-12 text-center mb-3">
                                        <span className='text-login'>Or login with:</span>
                                    </div>
                                    <div className="col-12 text-center social-login">
                                        <button type="button" className="google-btn btn-social mx-3">
                                            <i className="fab fa-google"></i>
                                        </button>
                                        <button type="button" className="facebook-btn btn-social mx-3">
                                            <i className="fab fa-facebook"></i>
                                        </button>
                                        <button type="button" className="github-btn btn-social mx-3">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
