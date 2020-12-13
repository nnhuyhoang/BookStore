const mongoose=require("mongoose")

const AddressSchema= new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId,required: true},
    order: {type:mongoose.Schema.Types.ObjectId},
    street: {type: String,required: true},
    district: {type: String,required: true},
    city: {type: String,required: true},
    zipcode: {type: Number,required: true},
    mobile: {type: String,required: true},
    alternate: {type: String,default: ""}
})

const Address=mongoose.model("Address",AddressSchema,"Address")

module.exports={
    Address,AddressSchema
}