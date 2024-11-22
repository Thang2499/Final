import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './src/models/userModel.js';
import indexRoute from './src/routes/indexRoute.js';
import cors from 'cors'
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
await mongoose.connect(process.env.connect).then(()=>{
    console.log('connect mongoose success');
});

app.use('/',indexRoute)
app.listen(process.env.PORT || 8080,()=>{
    console.log('server is running');
});