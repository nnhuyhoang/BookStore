const mongoose=require("mongoose")
const redis=require('redis')
const key =require("./../config/index")
const {promisify}=require('util')

const redisURL=key.redisURL
const client=redis.createClient(redisURL)
client.hget=promisify(client.hget)
const exec=mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache= function(options={}){
    this.useCache=true
    this.hashKey=JSON.stringify(options.key ||"")
    
    return this
}


mongoose.Query.prototype.exec=async function(){
    if(!this.useCache) return exec.apply(this,arguments)

    const key= JSON.stringify(Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    }))
    
    const cacheValue=await client.hget(this.hashKey,key)
    
    if(cacheValue){  
        const doc=JSON.parse(cacheValue)
        
        return Array.isArray(doc)
            ? doc.map(d=>new this.model(d))
            : new this.model(doc)
        
        
    }
    const result=await exec.apply(this,arguments)
    
    client.hset(this.hashKey,key,JSON.stringify(result))
    client.expire(this.hashKey,300)
    
    return result
    
}

module.exports={
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey))
    }
}