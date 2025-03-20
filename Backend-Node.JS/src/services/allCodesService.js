import db from '../models/index';
import bcrypt, { compareSync } from 'bcrypt';

//Authentication
let getAllCodes = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters",
                });
            }else{
                let data = {}
                let allcodes = await db.Allcodes.findAll({
                    where: {
                        type: typeInput
                    },
                    raw: true
                });
                data = allcodes;
                resolve(
                    {
                        errCode: 0,
                        message: "Success",
                        data: data
                    }
                );
            }
        } catch (error) {
            reject(
                {
                    errCode: -1,
                    message: "Error from service",
                    error: error.message
                }
            );
        }
    });
}
export default {
    getAllCodes: getAllCodes
}