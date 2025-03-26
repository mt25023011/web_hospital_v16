import db from '../models/index';
import bcrypt, { compareSync } from 'bcrypt';
import fs from 'fs';
import path from 'path';

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
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }
        if(data.roleID) {
            data.roleID = `R${data.roleID === '1' ? '1' : data.roleID === '0' ? '0' : '2'}`;
        }
        if(data.positionID) {
            data.positionID = `P${data.positionID==='0'?'0':data.positionID==='1'?'1':data.positionID==='2'?'2':data.positionID==='3'?'3':'4'}`;
        }
        // Handle image upload
        if(data.image!=='') {
            try {
                data.image = `/user/images/${data.image}`;
            } catch (error) {
                console.error('Error processing image:', error);
                throw new Error(`Image processing failed: ${error.message}`);
            }
        }else{
            data.image = '';
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
        if(data.image) {
            const imagePath = path.join(__dirname, '../public', data.image);
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            
        }
        await db.User.destroy({ where: { id: id } });
        return {
            status: 200,
            message: "Delete user successfully"
        };
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

        // Handle password update
        if (data.password) {
            let salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }

        // Handle role update
        if (data.roleID) {
            data.roleID = `R${data.roleID === '1' ? '1' : data.roleID === '0' ? '0' : '2'}`;
        }
        if (data.positionID) {
            data.positionID = `P${data.positionID==='0'?'0':data.positionID==='1'?'1':data.positionID==='2'?'2':data.positionID==='3'?'3':'4'}`;
        }
        // Handle image update
        if (data.image) {
            try {
                // Delete old image if exists
                if (user.image) {
                    const oldImagePath = path.join(__dirname, '../public', user.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                // Process and save new image
                const imageBuffer = Buffer.from(data.image.split(',')[1], 'base64');
                const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
                const uploadPath = path.join(__dirname, '../public/user/images');

                // Create directory if not exists
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }

                // Save new image
                const filePath = path.join(uploadPath, fileName);
                fs.writeFileSync(filePath, imageBuffer);

                // Update image path in data
                data.image = `/user/images/${fileName}`;
            } catch (error) {
                console.error('Error processing image:', error);
                throw new Error(`Image processing failed: ${error.message}`);
            }
        }

        await db.User.update(data, { where: { id: id } });
        
        // Get updated user data
        const updatedUser = await db.User.findOne({ where: { id: id } });
        const { password, ...userWithoutPassword } = updatedUser.toJSON();
        
        return {
            status: 200,
            message: "Update user successfully",
            data: userWithoutPassword
        };
    } catch (error) {
        console.error('Error updating user:', error);
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
