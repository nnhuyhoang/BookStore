const mongoose=require("mongoose")
const {BookSchema}=require("./Book")

const ProductSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    book: {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        price: {type: Number},
        quantity: {type: Number},
        maximumCanBuy: {type: Number},
        image: {type: String}
    },
    quantity: {type: Number,default:1},
    totalPrice:{type: Number},
    isSold: {type:Boolean,default:false},
})

const Product=mongoose.model("Product",ProductSchema,"Product")

module.exports={
    Product,ProductSchema
}