const mongoose=require("mongoose")

const TokenSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    token: {type: String,required: true},
    createAt: {type: Date,default:Date.now(),required: true,expires:60}
})

const Token =mongoose.model("Token",TokenSchema,"Token")

module.exports={
    Token,TokenSchema
}