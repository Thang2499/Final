import express from 'express'
import teacherController from '../controllers/teacherController.js';
import multer from 'multer';
const userRoute = express.Router();
const upload = multer();
userRoute.get('/teachers',teacherController.getList);
userRoute.post('/Addteachers',upload.none(),teacherController.addTeacher);
userRoute.get('/position',teacherController.getProsition);
userRoute.post('/Addposition',upload.none(),teacherController.AddPosition);
export default userRoute;