const express=require("express")
const ImageController=require("./images")
const router=express.Router()

router.post("/upload/",ImageController.upLoadImage)


module.exports=router