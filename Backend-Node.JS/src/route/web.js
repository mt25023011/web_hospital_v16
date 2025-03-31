import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import allCodesController from '../controllers/allCodesController';
let router = express.Router();

// Cấu hình multer cho upload ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../public/user/images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `user-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // tăng lên 10MB
        fieldSize: 10 * 1024 * 1024 // tăng giới hạn field size
    },
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận file ảnh
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

// Khởi tạo các routes
let initWebRoutes = (app) => {
    // Home routes
    router.get('/', homeController.homePage);

    // User routes
    router.get('/user/getlistuser', userController.getlistUser);
    router.get('/user/getuserbyid', userController.getUserById);
    router.post('/user/createuser', upload.single('image'), userController.createNewUser);
    router.delete('/user/deleteuser', userController.deleteUser);
    router.put('/user/updateuser', upload.single('image'), userController.updateUser);

    // Auth routes
    router.post('/api/login', authController.handleLogin);

    //
    router.get('/allcodes', allCodesController.getAllCodes);

    // user Role
    router.get('/api/user/getrole', userController.getUserRole);

    // Doctor info routes
    router.post('/api/user/adddoctorinfo', userController.addDoctorInfo);
    return app.use('/', router);
    
}

export default initWebRoutes;

