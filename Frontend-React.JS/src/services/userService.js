import axios from '../axios';

const userService = {

    handleLogin(email, password) {
        let res = axios.post('/api/login', { email, password });
        console.log(res);
        return res;
    }

};

export default userService;