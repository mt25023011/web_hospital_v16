import axios from '../axios';

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

    // Create a user (method not implemented yet)
    createUser(data) {
        // Implement the creation logic
        console.log('Data to create user:', data);
        return axios.post('/user/createuser', data)
            .then((res) => {
                console.log('Response from createUser:', res);
                return res;
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                throw error;
            });
    },

};

export default userService;