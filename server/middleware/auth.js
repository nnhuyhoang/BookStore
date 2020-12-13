const jwt=require("jsonwebtoken")
const {promisify}=require("util")


const verifyJwt=promisify(jwt.verify)

module.exports.authenticate=(key)=>{
    return (req,res,next)=>{
        const token=req.header("token")
        
        verifyJwt(token,key)
            .then(decoded=>{
                req.user=decoded
                return next()  
            })
            .catch(err=>{return res.status(401).json(err)})
    }
}

module.exports.authorize=()=>{
    return (req,res,next)=>{
        const {user}=req
        if(user.isAdmin===true) return next()
        return res.status(401).json({message: "you are not authorized"})
    }
}