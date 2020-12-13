const mongoose=require('mongoose')
const mongoosastic=require("mongoosastic")
const {CategorySchema} = require('./Category')
const {DepartmentSchema} = require('./Department')
const {AuthorSchema} = require('./Author')
const {PublisherSchema} = require('./Publisher')
const BookSchema=new mongoose.Schema({
    name: {type: String,required: true, es_indexed:true},
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        es_schema: DepartmentSchema,
        es_indexed:true,
        required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        es_schema: CategorySchema,
        es_indexed:true,
        required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        es_schema: AuthorSchema,
        es_indexed:true,
        required: true},
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        es_schema: PublisherSchema,
        es_indexed:true,
        required: true},
    rate:{type:Number,default:0, es_indexed:true},
    rateCount: {type:Number,default:0,es_indexed:true},
    releaseDate: {type: Date,required: true, es_indexed:true},
    description: {type: String,required: true, es_indexed:true},
    quantity: {type: Number,default: 1, es_indexed:true},
    price: {type: Number, required: true, es_indexed:true},
    image: {type: String,es_indexed:true},
    maximumCanBuy:{type: Number,es_indexed:true}
})


BookSchema.plugin(mongoosastic,{
    hosts: [
        'localhost:9200'
    ],
    populate: [
        {path: 'department'},
        {path: 'category'},
        {path: 'author'},
        {path: 'publisher'}
      ]
})


const Book=mongoose.model("Book",BookSchema,"Book")

module.exports={
    Book,BookSchema
}