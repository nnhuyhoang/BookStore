const express=require("express")
const ProductController=require("./products")
const router=express.Router()

router.post("/",ProductController.createProduct)
router.post("/user",ProductController.addUserToProduct)
router.post("/merge",ProductController.mergeProducts)
router.get("/:userId",ProductController.getProductsByUserId)
router.put("/quantity",ProductController.updateQuantity)
router.delete("/:id",ProductController.deleteProductById)
module.exports=router