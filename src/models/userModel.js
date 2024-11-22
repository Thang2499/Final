import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String
    },
    image:{
        type:String
    },
    address:{
        type:String
    },
    identity:{
        type:String
    },
    dob:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum: ['STUDENT', 'TEACHER', 'ADMIN'],
        default:'TEACHER'
    }
})

const userModel = mongoose.model('users',userSchema);

export default userModel;