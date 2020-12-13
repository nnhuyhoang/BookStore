const express=require("express")
const ReviewController=require("./reviews")
const router=express.Router()

router.post("/",ReviewController.createReview)
router.get("/:bookId",ReviewController.getReviewsByBookId)
router.put("/",ReviewController.updateReview)
router.delete("/:reviewId",ReviewController.deleteReview)

module.exports=router