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

};

export default userService;