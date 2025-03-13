import authService from '../services/authService';
import express from 'express';

//Authenticate
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let userData = await authService.handleUserLogin(email, password);
    return res.status(200).json(userData);
}

export default {
    handleLogin: handleLogin
}

