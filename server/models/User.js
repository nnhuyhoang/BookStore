const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const {promisify}=require("util")
const UserSchema=new mongoose.Schema({
    name: {type: String, required: true},
    password:   {type: String,required: true},
    email:      {type: String,required: true},
    isAdmin:   {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    avatar: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTS-hDkQ016mlzP2is3LKGCkKs2WHUEUy8udSvanP9P3tSBX6wk"}

})
const genSalt=promisify(bcrypt.genSalt)
const hash=promisify(bcrypt.hash)

UserSchema.pre("save",function(next){
    const user=this
    if(!user.isModified("password")) return next()
    genSalt(10)
        .then(salt=>{
            return hash(user.password,salt)
        })
        .then(hash=>{
            user.password=hash
            return next()
        })
})


const User=mongoose.model("User",UserSchema,"User");

module.exports={
    User,UserSchema
}