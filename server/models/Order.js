const mongoose=require('mongoose')
const mongoosastic=require("mongoosastic")
const {AddressSchema}=require("./Address")
const {ProductSchema}=require("./Product")
const {UserSchema}=require('./User')
const OrderSchema=new mongoose.Schema({
    receiver: {type :String,required: true,es_indexed:true},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        es_schema: ProductSchema,
        es_indexed:true,
        required: true}],
    totalPrice: {type: Number,es_indexed:true,required: true},
    address: {type: AddressSchema,
        es_indexed:true,
        es_type: 'nested',
        es_include_in_parent: true,
        required: true},
    user: {type: mongoose.Schema.Types.ObjectId,
        es_schema: UserSchema,
        es_indexed:true,
        required: true},
    payment: {type: String,es_indexed:true,required: true},
    createAt: {type: Date,es_indexed:true,default:Date.now()},
    status: {type: String,es_indexed:true,default: "Checking"}
})

OrderSchema.plugin(mongoosastic,{
    hosts:[
        'localhost:9200'
    ],
    populate: [
        {path: 'products'},
        {path: 'user'},
      ]
})

const Order=mongoose.model("Order",OrderSchema,"Order")



module.exports={
    Order,OrderSchema
}