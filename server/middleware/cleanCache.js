const {clearHash}=require("./../services/cache")

module.exports.cleanCache=()=>{
    return async (req,res,next)=>{
        await next()
        clearHash("guest")
    }
    
}