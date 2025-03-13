import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import multer from 'multer';

let router = express.Router();
const upload = multer();

let initWebRoutes = (app) => {
    router.get('/', homeController.homePage);

    router.get('/user/getlistuser', userController.getlistUser);
    router.get('/user/getuserbyid', userController.getUserById);
    router.post('/user/createuser', upload.none(), userController.createNewUser);
    router.delete('/user/deleteuser', userController.deleteUser);
    router.put('/user/updateuser', upload.none(), userController.updateUser);

    //api login
    router.post('/api/login', authController.handleLogin);

    return app.use('/', router);
}

export default initWebRoutes;

