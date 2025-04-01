import db from '../models/index';
import bcrypt, { compareSync } from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

// Custom error classes
class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Validation helpers
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

const formatRoleID = (roleID) => {
    const validRoles = ['0', '1', '2'];
    if (!validRoles.includes(roleID)) {
        throw new ValidationError('Invalid role ID');
    }
    return `R${roleID}`;
};

const formatPositionID = (positionID) => {
    const validPositions = ['0', '1', '2', '3', '4'];
    if (!validPositions.includes(positionID)) {
        throw new ValidationError('Invalid position ID');
    }
    return `P${positionID}`;
};

const getlistUser = async () => {
    try {
        const data = await db.User.findAll({
            raw: true,
            attributes: {
                exclude: ['password']
            }
        });
        return data;
    } catch (error) {
        console.error('Error in getlistUser:', error);
        throw error;
    }
};

const getUserbyID = async (id) => {
    try {
        const data = await db.User.findOne({ where: { id } });
        if (!data) {
            throw new UserNotFoundError('User not found');
        }
        return data;
    } catch (error) {
        console.error('Error in getUserbyID:', error);
        throw error;
    }
};

const checkEmailExists = async (email) => {
    try {
        const user = await db.User.findOne({ where: { email } });
        return !!user;
    } catch (error) {
        console.error('Error in checkEmailExists:', error);
        throw error;
    }
};

const createNewUser = async (data) => {
    try {
        // Validate required fields
        if (!data.email || !validateEmail(data.email)) {
            throw new ValidationError('Invalid email format');
        }
        if (!validatePassword(data.password)) {
            throw new ValidationError('Password must be at least 6 characters');
        }

        // Check if email already exists
        const emailExists = await checkEmailExists(data.email);
        if (emailExists) {
            return {
                status: 400,
                message: 'Email already exists'
            };
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        // Format role and position
        if (data.roleID) {
            data.roleID = formatRoleID(data.roleID);
        }
        if (data.positionID) {
            data.positionID = formatPositionID(data.positionID);
        }

        // Handle image
        data.image = data.image || "";

        // Create user
        const newUser = await db.User.create(data);
        const { password, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;
    } catch (error) {
        console.error('Error in createNewUser:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await db.User.findOne({ where: { id } });
        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        await db.User.destroy({ where: { id } });
        return {
            status: 200,
            message: "Delete user successfully"
        };
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw error;
    }
};

const updateUser = async (id, data) => {
    try {
        const user = await db.User.findOne({ where: { id } });
        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        // Validate email if provided
        if (data.email && !validateEmail(data.email)) {
            throw new ValidationError('Invalid email format');
        }

        // Handle password update
        if (data.password) {
            if (!validatePassword(data.password)) {
                throw new ValidationError('Password must be at least 6 characters');
            }
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }

        // Handle role and position
        if (data.roleID) {
            data.roleID = formatRoleID(data.roleID);
        }

        if (data.roleID !== 'R1') {
            data.positionID = null;
        } else if (data.positionID) {
            data.positionID = formatPositionID(data.positionID);
        }

        await db.User.update(data, { where: { id } });

        // Get updated user
        const updatedUser = await db.User.findOne({ where: { id } });
        const { password, ...userWithoutPassword } = updatedUser.toJSON();

        return {
            status: 200,
            message: "Update user successfully",
            data: userWithoutPassword
        };
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
};

const getUserRole = async (type, limit) => {
    try {
        limit = parseInt(limit) || 10;
        const data = await db.User.findAll({
            where: { roleID: type },
            raw: true,
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Allcodes,
                    as: 'positionData',
                    attributes: ['value_En', 'value_Vi'],
                },
                {
                    model: db.Allcodes,
                    as: 'genderData',
                    attributes: ['value_En', 'value_Vi'],
                }
            ],
            nest: true,
            order: [['createdAt', 'DESC']],
            limit: limit,
            group: ['User.id'],
            distinct: true
        });
        console.log(data);
        return {
            status: 200,
            message: "Get user role successfully",
            data
        };
    } catch (error) {
        console.error('Error in getUserRole:', error);
        return {
            status: 500,
            message: "Internal server error1",
            data: null

        };
    }
};

const addDoctorInfo = (doctorInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctorInfoData = {
                doctorId: doctorInfo.doctorId,
                contentMarkdown: doctorInfo.introduction,
                contentHTML: doctorInfo.introductionHTML,
                description: doctorInfo.description
            }
            console.log('doctorInfoData', doctorInfoData);
            if (!doctorInfoData.doctorId || !doctorInfoData.contentMarkdown || !doctorInfoData.contentHTML || !doctorInfoData.description) {
                return {
                    status: 400,
                    message: "Missing parameters"
                };
            } else {
                await db.Markdown.create(doctorInfoData);
                resolve({
                    status: 200,
                    message: "Add doctor info successfully",
                    data: doctorInfoData,
                    errCode: 0
                });
            }
        } catch (error) {
            console.error('Error in addDoctorInfo:', error);
            reject(error);
        }
    });
};



const getDoctorInfoById = async (id) => {
    try {
        console.log('id', id);
        const doctorInfo = await db.User.findOne(
            {
                where: { id: id },
                attributes: {
                    include: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'image', 'address', 'roleID', 'positionID'],
                    exclude: ['password']
                },
                include: [{
                    model: db.Allcodes,
                    as: 'positionData',
                    attributes: ['value_En', 'value_Vi'],
                },
                {
                    model: db.Allcodes,
                    as: 'genderData',
                    attributes: ['value_En', 'value_Vi'],
                },
                {
                    model: db.Markdown,
                    as: 'doctorData',
                    attributes: [
                        'id',
                        'doctorId',
                        'contentMarkdown',
                        'contentHTML',
                        'description'
                    ]
                }
                ],
                nest: true,
                raw: true
            });
        console.log('doctorInfo', doctorInfo);
        if (!doctorInfo) {
            return {
                status: 400,
                message: "Doctor not found"
            };
        }
        return {
            status: 200,
            message: "Get doctor info successfully",
            data: doctorInfo
        };
    } catch (error) {
        console.error('Error in getDoctorInfoById:', error);
        throw error;
    }
}

export default {
    getlistUser,
    getUserbyID,
    createNewUser,
    deleteUser,
    updateUser,
    getUserRole,
    addDoctorInfo,
    getDoctorInfoById
};
