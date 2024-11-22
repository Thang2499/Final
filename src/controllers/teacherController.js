import teacherModel from "../models/teacherModel.js"
import teacherpositionModel from "../models/teacherPosition.js";
import userModel from "../models/userModel.js";

const teacherController = {
    getList: async (req,res)=>{
        try{
            const query = req.query;
            const startPo = (query.page -1) * query.limit;
            const endPo = startPo + query.limit;
            const getList = await teacherModel.find().populate({
                path: 'teacherPositionsId',
                model: 'teacherpositions',
              }).populate({
                path: 'userId',
                model: 'users',
              }).skip(startPo).limit(endPo);
           
            res.send(getList)
        }catch(err){
            res.send({
                message:err.message
            })
        }
    },
    addTeacher: async (req,res)=>{
        try{
            const {name,email,phoneNumber,address,identity,dob,idPosition,degrees} = req.body;
            // if (!Array.isArray(degrees) || !Array.isArray(idPosition)) {
            //     return res.status(400).send({ message: "degrees hoặc idPosition phải là mảng" });
            //   }
            const findEmail = await userModel.findOne({email:email});
            if(findEmail){
                return  res.status(400).send({
                    message:'người dùng đã tồn tại'})
            }
            const generateUniqueCode = () => {
                const digits = Array.from({ length: 10 }, (_, i) => i); 
                const shuffled = digits.sort(() => Math.random() - 0.5); 
                return shuffled.join(''); 
              };
            const newUser = await userModel.create({
                name:name,
                email:email,
                phoneNumber:phoneNumber,
                address:address,
                identity:identity,
                dob:dob,  
            })
 
            const newTeacher = await teacherModel.create({
                userId:newUser._id,
                teacherPositionsId:idPosition,
                code:generateUniqueCode(),
                startDate:Date.now(),
                degrees: JSON.parse(degrees)
            })
          
            res.status(200).send({ 
                newTeacher,newUser
            })
        }catch(err){
            res.send({
                message:err.message
            })
        }
    },
    getProsition: async(req,res)=>{
        try {
            const getPosition = await teacherpositionModel.find();
            res.status(200).send(getPosition)
        } catch(err){
            res.send({
                message:err.message
            })
        }
    },
    AddPosition:async (req,res)=>{
        try {
            const {name,code,des} = req.body;
            console.log(req.body)
            const findCode = await teacherpositionModel.findOne({code:code});
            if(findCode){
                return res.send({
                    message:"Vị trí đã tồn tại"
                });
            }
            const createPosition = await teacherpositionModel.create({
                name:name,
                code:code,
                des:des
            });
            res.send(createPosition)
        } catch(err){
            res.send({
                message:err.message
            })
        }
    }
}
export default teacherController;