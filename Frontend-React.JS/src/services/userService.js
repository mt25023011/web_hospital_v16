import axios from '../axios';
import React from "react";

const userService = {

    getAllUsers() {
        let res = axios.get(`/user/getlistuser`);
        console.log(res);
        return res;
    },

    deleteUser(id) {
        let res = axios.delete(`/user/deleteuser?id=${id}`);
        console.log(res);
        return res;
    },

    async createUser(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
            
        }
        if (data.image && data.image instanceof File) {
            const reader = new FileReader();
            await new Promise((resolve, reject) => {
                reader.onload = () => {
                    formData.set('image', reader.result);
                    resolve();
                };
                reader.onerror = reject;
                reader.readAsDataURL(data.image);
                console.log(data.image);
            });
        }
        else {
            formData.set('image', "");
        }
        

        return axios.post('/user/createuser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log('Response from createUser:', res);
            return res;
        })
        .catch((error) => {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 413) {
                console.error('Payload size:', JSON.stringify(data).length);
            }
            throw error;
        });
    },

};

export default userService;