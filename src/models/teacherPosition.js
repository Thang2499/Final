import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
    name:{
        type:String
    },
    code:{
        type:String
    },
    des:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true},{collection:"teacherpositions"})

const teacherpositionModel = mongoose.model('teacherpositions',teacherPositionSchema);
export default teacherpositionModel;