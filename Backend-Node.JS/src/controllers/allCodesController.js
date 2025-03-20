import express from 'express';
import allCodesService from '../services/allCodesService';
let getAllCodes = async (req, res) => {
    try {
        let data = await allCodesService.getAllCodes(req.query.type);
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ 
                errCode: 1,
                message: "Not found",
                error: error.message 
            });
        }
    } catch (error) {
        return res.status(500).json({
                errCode: -1,
                message: "Error from server",
                error: error.message 
            });
    }
}

module.exports = {
    getAllCodes: getAllCodes
};
