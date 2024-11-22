import express from 'express'
import userRoute from './userRoute.js';


const indexRoute = express.Router();
indexRoute.use('/teachers',userRoute);
export default indexRoute;