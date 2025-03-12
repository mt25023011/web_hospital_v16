import express from 'express';
import userService from '../services/userService';

let getlistUser = async (req, res) => {
    try {
        let data = await userService.getlistUser();
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ error: "not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let getUserById = async (req, res) => {
    try {
        let data = await userService.getUserbyID(req.query.id);
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ error: "user not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let createNewUser = async (req, res) => {
    try {
        let data = await userService.createNewUser(req.body);
        return res.status(201).json(data);
    } catch (error) {
        console.error('Error in createNewUser controller:', error);
        return res.status(500).json({ error: error.message });
    }
}

let deleteUser = async (req, res) => {
    try {
        let data = await userService.deleteUser(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let updateUser = async (req, res) => {
    try {
        const id = req.query.id;
        console.log('Update request - ID:', id);
        console.log('Update request - Body:', req.body);
        
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Update data is required" });
        }

        let data = await userService.updateUser(id, req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in updateUser:', error);
        return res.status(500).json({ error: error.message });
    }
}

export default {
    getlistUser: getlistUser,
    getUserById: getUserById,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}
