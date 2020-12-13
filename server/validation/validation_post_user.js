const validator=require("validator")
const _=require("lodash")
const {User}=require("./../models/User")


module.exports.validatePostUser=async (req,res,next)=>{
    const {email,password,password2,name}=req.body
    const errors={}
    //email
    if(!email){
        errors.message="Email is required"
    }
    else if(!validator.isEmail(email)){
        errors.message="Email is invalid"
    }
    const user=await User.findOne({email: email})
    if(user) errors.message= "Email is already exists"

    //password
    if(!password){
        errors.message="password is required"
    }
    else if(!validator.isLength(password,{min: 6})){
        errors.message="password has to have at least 6 character"
    }

    //password2
    if(!password2){
        errors.message="confirm password is required"
    }
    else if(!validator.equals(password,password2)){
        errors.message="password must match"
    }

    //name
    if(!name){
        errors.message="name is required"
    }

    if(_.isEmpty(errors)) return next()
    return res.status(400).json(errors)
}