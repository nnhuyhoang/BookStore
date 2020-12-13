require('dotenv').config()

let secret_key=process.env.SECRET_KEY
let api_key=process.env.API_KEY
let email= process.env.EMAIL_LOCAL
let password=process.env.PASSWORD_LOCAL
let redisURL=process.env.REDISURL
let accessBucketKeyId=process.env.ACCESSKEYBUCKETID
let secretAccessId=process.env.SECRETACCESSID
let awsDomain=process.env.AWSDOMAIN
module.exports={
    secret_key,api_key,email,password,redisURL,accessBucketKeyId,secretAccessId,awsDomain
}