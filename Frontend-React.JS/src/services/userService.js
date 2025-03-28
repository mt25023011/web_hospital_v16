import axios from '../axios';
import React from "react";

const userService = {

    getAllUsers() {
        let res = axios.get(`/user/getlistuser`);

        return res;
    },

    deleteUser(id) {
        let res = axios.delete(`/user/deleteuser?id=${id}`);

        return res;
    },

    async createUser(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        return axios.post('/user/createuser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                if (res.data.status === 400) {
                    return {
                        status: 400,
                        message: res.data.message
                    };
                }
                return {
                    status: 201,
                    data: res
                };
            })
            .catch((error) => {
                console.error('Error creating user:', error.response ? error.response.data : error.message);
                if (error.response && error.response.status === 413) {
                    console.error('Payload size:', JSON.stringify(data).length);
                }
                throw error;
            });
    },

    getUserInfo(id) {
        let res = axios.get(`/user/getuserbyid?id=${id}`);

        return res;
    },
    getAllCodesService(inputData) {
        return axios.get(`/allcodes?type=${inputData}`);
    },

    async updateUser(data) {
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
            });
        }
        else {
            formData.delete('image');
        }
        return axios.put(`/user/updateuser?id=${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log('Response from updateUser:', res);
                return res;
            })
            .catch((error) => {
                console.error('Error updating user:', error.response ? error.response.data : error.message);
                if (error.response && error.response.status === 413) {
                    console.error('Payload size:', JSON.stringify(data).length);
                }
                throw error;
            });
    },

};

export default userService;