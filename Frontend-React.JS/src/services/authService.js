import axios from '../axios';

const authService = {
    handleLogin(email, password) {
        let res = axios.post('/api/login', { email, password });
        return res;
    },
};

export default authService;
