const mongoose=require('mongoose')

const DepartmentSchema=new mongoose.Schema({
    name: {type: String,required: true},
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"}]
})

const Department=mongoose.model("Department",DepartmentSchema,"Department")

module.exports={
    Department,DepartmentSchema
}