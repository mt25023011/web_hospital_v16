import db from '../models/index';
import bcrypt, { compareSync } from 'bcrypt';

let getlistUser = async () => {
    try {
        let data = await db.User.findAll({
            raw: true,
            attributes: {
                exclude: ['password']
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

let getUserbyID = async (id) => {
    try {
        let data = await db.User.findOne({ where: { id: id } });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

let createNewUser = async (data) => {
    try {
        console.log('Body in service:', data);
        console.log('data.password:', data.password);
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);

        }
        if(data.roleID) {
            data.roleID = `R${data.roleID === '1' ? '1' : data.roleID === '0' ? '0' : '2'}`;
        }
        // Create new user in database
        const newUser = await db.User.create(data);
        
        // Return created user without password
        const { password, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

let deleteUser = async (id) => {
    try {
        let data = await db.User.findOne({ where: { id: id } });
        if(!data) {
            throw new Error('User not found');
        }
        await db.User.destroy({ where: { id: id } });
        return "Delete user successfully";
    } catch (error) {
        console.log(error);
        throw error;
    }
}

let updateUser = async (id, data) => {
    console.log('data in service:',id, data);
    try {
        let user = await db.User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error('User not found');
        }
        let password = data.password;
        if(password) {
            let salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(password, salt);
        }
        let roleID = data.roleID;
        if(roleID) {
            data.roleID = `R${roleID === '1' ? '1' : roleID === '0' ? '0' : '2'}`;
        }
        console.log('data in service:',data);
        await db.User.update(data, { where: { id: id } });
        return "Update user successfully";
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export default {
    getlistUser: getlistUser,
    getUserbyID: getUserbyID,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}
