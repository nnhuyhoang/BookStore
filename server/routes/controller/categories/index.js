const express=require('express')
const CategoryController=require('./categories')
const router=express.Router()

router.post("/",CategoryController.createCategory)
router.get("/:id",CategoryController.getCategoryById)
router.get("/",CategoryController.getCategories)
router.put("/",CategoryController.updateCategoryById)
router.put("/department",CategoryController.addDepartmentToCategory)

module.exports=router