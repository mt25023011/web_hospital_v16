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
        const { type } = req.query;
        if (!type) {
            return sendResponse(res, 400, null, 'Role type is required');
        }

        const data = await userService.getUserRole(type);
        return sendResponse(res, 200, data, 'User roles retrieved successfully');
    } catch (error) {
        console.error('Error in getUserRole:', error);
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
}
