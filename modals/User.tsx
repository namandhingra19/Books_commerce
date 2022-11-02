import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    }
})

// export const joiValidate =(obj) =>{
// 	var schema = {
//         email: Joi.types.String().email().required(),
// 		password: Joi.types.String().min(4).max(30).required(),
//         fullname: Joi.types.String().required()
// 	}
// 	return Joi.validate(obj, schema);
// }
mongoose.models={};
const User= mongoose.model('users',UserSchema)

export default User;