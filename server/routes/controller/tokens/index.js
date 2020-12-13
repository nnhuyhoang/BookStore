const express=require("express")
const TokenController=require("./tokens")
const router=express.Router()
router.post("/resend",TokenController.ResendConfirmMessage)
router.get("/verify/:token",TokenController.ConfirmationPost)

module.exports=router
