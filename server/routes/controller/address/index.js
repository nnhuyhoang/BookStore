const express=require("express")
const AddressController=require("./address")
const router=express.Router()

router.post('/',AddressController.createAddress)
router.get("/:userId",AddressController.getAddressByUserId)
router.put("/",AddressController.updateAddress)
module.exports=router