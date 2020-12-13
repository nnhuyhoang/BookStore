const mongoose=require("mongoose")


const ReviewSchema = new mongoose.Schema({
    content: {type: String,required: true},
    rate: {type:Number,required: true},
    user: {type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    book: {type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },

})
const Review=mongoose.model("Review",ReviewSchema,"Review")

module.exports={
    Review,ReviewSchema
}