import express from 'express';
import userService from '../services/userService';

// Common response format
const sendResponse = (res, status, data, message = '') => {
    return res.status(status).json({
        success: status < 400,
        message,
        data
    });
};

let getlistUser = async (req, res) => {
    try {
        const data = await userService.getlistUser();
        if (data) {
            return sendResponse(res, 200, data, 'Users retrieved successfully');
        }
        return sendResponse(res, 404, null, 'No users found');
    } catch (error) {
        console.error('Error in getlistUser:', error);
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

let getUserById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return sendResponse(res, 400, null, 'User ID is required');
        }

        const data = await userService.getUserbyID(id);
        return sendResponse(res, 200, data, 'User retrieved successfully');
    } catch (error) {
        console.error('Error in getUserById:', error);
        
        if (error.name === 'UserNotFoundError') {
            return sendResponse(res, 404, null, error.message);
        }
        
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

let createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        
        // Basic validation
        if (!userData.email || !userData.password) {
            return sendResponse(res, 400, null, 'Email and password are required');
        }

        const data = await userService.createNewUser(userData);
        return sendResponse(res, 201, data, 'User created successfully');
    } catch (error) {
        console.error('Error in createNewUser:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return sendResponse(res, 400, null, error.message);
        }
        
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

let deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return sendResponse(res, 400, null, 'User ID is required');
        }

        const data = await userService.deleteUser(id);
        return sendResponse(res, 200, data, 'User deleted successfully');
    } catch (error) {
        console.error('Error in deleteUser:', error);
        
        if (error.name === 'UserNotFoundError') {
            return sendResponse(res, 404, null, error.message);
        }
        
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

let updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const updateData = req.body;

        if (!id) {
            return sendResponse(res, 400, null, 'User ID is required');
        }

        if (Object.keys(updateData).length === 0) {
            return sendResponse(res, 400, null, 'Update data is required');
        }

        const data = await userService.updateUser(id, updateData);
        return sendResponse(res, 200, data, 'User updated successfully');
    } catch (error) {
        console.error('Error in updateUser:', error);
        
        if (error.name === 'UserNotFoundError') {
            return sendResponse(res, 404, null, error.message);
        }
        
        if (error.name === 'ValidationError') {
            return sendResponse(res, 400, null, error.message);
        }
        
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

let getUserRole = async (req, res) => {
    try {
        let type  = req.query.type;
        let  limit= req.query.limit;
        let errCode = 1;
        if (!type) {
            errCode = 1;
            return sendResponse(res, 400, {
                errCode,
                message: 'Missing parameters',
                data: null
            }, 'Missing parameters');
        }

        const data = await userService.getUserRole(type, limit);
        return sendResponse(res, 200, data, 'User roles retrieved successfully');
    } catch (error) {
        console.error('Error in getUserRole:', error);
        return sendResponse(res, 500, {
            errCode: 1,
            message: 'Internal server error',
            data: null
        }, 'Internal server error');
    }
}

let addDoctorInfo = async (req, res) => {
    try {
        const  doctorInfo  = req.body;
        console.log('doctorInfo', doctorInfo);
        if(!doctorInfo){
            return sendResponse(res, 400, null, 'Missing parameters');
        }
        const data = await userService.addDoctorInfo(doctorInfo);
        return sendResponse(res, 200, data, 'Doctor info added successfully');
    } catch (error) {
        console.error('Error in addDoctorInfo:', error);
        return sendResponse(res, 500, null, 'Internal server error');
    }
}

export default {
    getlistUser,
    getUserById,
    createNewUser,
    deleteUser,
    updateUser,
    getUserRole,
    addDoctorInfo
}
