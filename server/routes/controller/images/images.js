const mongoose=require("mongoose")
const {User}=require("./../../../models/User")
const { v4: uuidv4 } = require('uuid');
const _=require("lodash")
const AWS=require("aws-sdk")
const keys=require("./../../../config/index")


const s3=new AWS.S3({
    accessKeyId: keys.accessBucketKeyId,
    secretAccessKey: keys.secretAccessId
})

module.exports.upLoadImage=(req,res,next)=>{
    const {userId,type}=req.body
    console.log(type);
    
    const endpoint=type.split("/")
    const key=`${userId}/${uuidv4()}.${endpoint[1]}`

    s3.getSignedUrl('putObject',{
        Bucket: 'my-bookstore-bucket-123',
        ContentType: type,
        Key: key
    },(err,url)=>{
        if(err){
            return Promise.reject(res.status(500).json(err))
        }
        else{
            console.log(key,url);
            
            return res.status(200).json({key,url})
        }
    })
}