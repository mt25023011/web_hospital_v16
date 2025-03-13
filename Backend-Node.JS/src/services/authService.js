import db from '../models/index';
import bcrypt, { compareSync } from 'bcrypt';

//Authentication
let checkUserEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isUserExist = await checkUserEmail(email);

            if(!isUserExist) {
                userData.errCode = 1;
                userData.message = "User not found";
                return resolve(userData);
            } else {
                // First get user with password for comparison
                let userWithPassword = await db.User.findOne({ 
                    where: { email: email },
                    raw: true
                });

                let checkPassword = await bcrypt.compare(password, userWithPassword.password);
                
                if(!checkPassword) {
                    userData.errCode = 2;
                    userData.message = "Password is incorrect";
                    return resolve(userData);
                } else {
                    // Get user data without password for response
                    let user = await db.User.findOne({ 
                        attributes: ['id', 'email', 'roleId', 'firstName', 'lastName'],
                        where: { email: email },
                        raw: true,
                    });

                    userData.errCode = 0;
                    userData.message = "Login successfully";
                    userData.user = user;
                    return resolve(userData);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

export default {
    handleUserLogin: handleUserLogin
}


