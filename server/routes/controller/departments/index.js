const express=require('express')
const DepartmentController=require('./departments')
const router=express.Router()

router.post('/',DepartmentController.createDepartment)
router.get("/:id",DepartmentController.getDepartmentById)
router.get("/",DepartmentController.getDepartments)
router.put("/",DepartmentController.updateDepartmentById)
router.put("/category",DepartmentController.addCategoryToDepartment)
module.exports=router