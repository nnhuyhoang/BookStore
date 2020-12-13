const mongoose=require('mongoose')

const AuthorSchema=new mongoose.Schema({
    name: {type: String,required: true},
    
})

const Author=mongoose.model("Author",AuthorSchema,"Author")

module.exports={
    Author,AuthorSchema
}