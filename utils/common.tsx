import { NextApiResponse } from "next"
import Joi from 'joi'
import { join } from "path"

export const errorHandler=(data:any,res:NextApiResponse,code=400)=>{
    res.status(code).json({
        hasError:true,
        errorMessage:data
    })
}

export const responseHandler=(data:any,res:NextApiResponse,code=200)=>{
    res.status(code).json({
        hasError:false,
        body:data
    })
}
export const emailSchema=Joi.string().email({ tlds: { allow: false } }).required().label('Email');
export const passwordSchema=Joi.string().min(4).max(20).required().description('password').label('Password');
export const nameSchema=Joi.string().required().description('Name').label('Name');
export const validateUser=(user:{})=>
{
    const JoiSchema = Joi.object({
        email: emailSchema,
		password: passwordSchema,
        fullname: nameSchema
    });
    return JoiSchema.validate(user);
}

export const getValue=(obj,path,defaultValue)=>{
    try{
        if(!(obj instanceof Array)){
            let myValue=obj;
            for(let key of path){
                if(!(key in myValue)){
                    return defaultValue;
                }
                else{
                    myValue=myValue[key];
                }
            }
            return myValue;
        }
        return defaultValue;
    }catch(err){
        return defaultValue;
    }
}
