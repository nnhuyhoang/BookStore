const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({
    name: {type: String,required: true},
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"},
})

const Category=mongoose.model("Category",CategorySchema,"Category")

module.exports={
    Category,CategorySchema
}