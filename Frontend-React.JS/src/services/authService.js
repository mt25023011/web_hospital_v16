import axios from '../axios';

const authService = {
    handleLogin(email, password) {
        let res = axios.post('/api/login', { email, password });
        console.log(res);
        return res;
    },
};

export default authService;
