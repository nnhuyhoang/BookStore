const {User}=require("./../../../models/User")
const {Token}=require("./../../../models/Token")
const keys=require("./../../../config/index")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
const {promisify}=require("util")
const jwt=require("jsonwebtoken")
const {sendRegisterEmail}=require("./../../../services/email/sendRegisterEmail")

module.exports.createUser=(req,res,next)=>{
    const {name,password,email}=req.body
    const isAdmin=false
    const isVerified=false
    const newUser=new User({name,password,email,isAdmin,isVerified})
    newUser.save()
        .then(user=>{
            const token=new Token({userId: user._id,token: crypto.randomBytes(16).toString('hex')})
            return Promise.all([token.save(),user])
            
        })
        .then(ret=>{
            sendRegisterEmail(ret[0],ret[1])
            return res.status(200).json(ret[1])
        })
        .catch(err=>{
            if(err.status) return res.status(err.status).json({message: err.message})
            return res.status(500).json(err)
        })
}

module.exports.createAdmin=(req,res,next)=>{
    const {name,password,email}=req.body
    const isAdmin=true
    const isVerified=true
    const newUser=new User({name,password,email,isAdmin,isVerified})
    newUser.save()
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            if(err.status) return res.status(err.status).json({message: err.message})
            return res.status(500).json(err)
        })
}

const jwtSign=promisify(jwt.sign)
const comparePassword=promisify(bcrypt.compare)
module.exports.login=(req,res,next)=>{
    const {email,password}=req.body
    
    User.findOne({email:email})
        .then(user=>{
            if(!user) return Promise.reject({status: 404,message: "User not found"})

            return Promise.all([comparePassword(password,user.password),user])
        })
        .then(ret=>{
            
            const isMatch=ret[0]
            const user=ret[1]
            if(!isMatch) return Promise.reject({status: 400,message: "Password not match"})
            const payload={
                email: user.email,
                isAdmin: user.isAdmin,
                isVerified:user.isVerified,
                avatar: user.avatar,
                name: user.name,
                id: user._id,
                
            }
            
            return jwtSign(
                payload,
                keys.secret_key,
                {expiresIn:3600}
            )
        })
        .then(token=>{
            return res.status(200).json({message: "login successfully",token:token})
        })
        .catch(err=>{
            console.log(err);
            
            if(err.status) return res.status(err.status).json({message: err.message})
            return res.status(500).json(err)
        })
}

module.exports.updateUser=(req,res,next)=>{
    const {userId,name,password,newpassword,avatar}=req.body
    
    User.findById(userId)
        .then(user=>{
            if(!user) return Promise.reject({status: 404,message: "User not found"})
            return Promise.all([comparePassword(password,user.password),user])
        })
        .then(ret=>{
            
            const isMatch=ret[0]
            const user=ret[1]
            if(!isMatch) return Promise.reject({status: 400,message: "You enter wrong password"})
            user.name=name
            user.password=newpassword
            if(avatar){
                user.avatar=keys.awsDomain+`/${avatar}`
            }
            return user.save()
        })
        .then(modifiedUser=>{
            const payload={
                email: modifiedUser.email,
                isAdmin: modifiedUser.isAdmin,
                isVerified:modifiedUser.isVerified,
                avatar: modifiedUser.avatar,
                name: modifiedUser.name,
                id: modifiedUser._id,
                
            }
            
            return jwtSign(
                payload,
                keys.secret_key,
                {expiresIn:3600}
            )
        })
        .then(token=>{
            return res.status(200).json({message: "login successfully",token:token})
        })
        .catch(err=>{
            if(err.status) return res.status(err.status).json({message: err.message})
            return res.status(500).json(err)
        })
}