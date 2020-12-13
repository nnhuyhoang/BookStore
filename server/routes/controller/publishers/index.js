const express=require('express')
const PublisherController=require('./publishers')
const router=express.Router()

router.post('/',PublisherController.createPublisher)
router.get("/:id",PublisherController.getPublisherById)
router.get("/",PublisherController.getPublishers)
module.exports=router