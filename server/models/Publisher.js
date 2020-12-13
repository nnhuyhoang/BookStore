const mongoose=require('mongoose')

const PublisherSchema=new mongoose.Schema({
    name: {type: String,required: true},
})

const Publisher=mongoose.model("Publisher",PublisherSchema,"Publisher")

module.exports={
    Publisher,PublisherSchema
}