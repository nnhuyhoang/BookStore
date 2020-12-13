const express=require("express")
const userController=require("./users")
const {validatePostUser}=require("./../../../validation/validation_post_user")
const router=express.Router()

router.post("/",validatePostUser,userController.createUser)
router.post("/admin",userController.createAdmin)
router.post("/login",userController.login)
router.put("/",userController.updateUser)
module.exports=router