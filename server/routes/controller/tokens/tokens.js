const {Token}=require("./../../../models/Token")
const {User}=require("./../../../models/User")
const crypto=require("crypto")
const {sendRegisterEmail}=require("./../../../services/email/sendRegisterEmail")
module.exports.ConfirmationPost=(req,res,next)=>{
    const {token}=req.params
    
    Token.findOne({token: token})
        .then(token=>{
            if(!token) return Promise.reject({status:404,message: "Token not found"})
            return User.findById(token.userId)
        })
        .then(user=>{
            if(!user) return Promise.reject({status:404,message: "User not found"})
            user.isVerified=true            
            return user.save()
        })
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.ResendConfirmMessage=(req,res,next)=>{
    const {email}=req.body
    
    User.findOne({email: email})
        .then(user=>{      
            if(!user) return Promise.reject({status:404,message: "User not found"})
            const newToken=new Token({userId: user._id,token:crypto.randomBytes(16).toString('hex')})

            return Promise.all([newToken.save(),user])
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