const express=require('express')
const AuthorController=require('./authors')
const {authenticate}=require('./../../../middleware/auth')
const {cleanCache}=require('./../../../middleware/cleanCache')
const {secret_key}=require("./../../../config/index")
const router=express.Router()

router.post('/',authenticate(secret_key),cleanCache(),AuthorController.createAuthor)
router.get("/:id",AuthorController.getAuthorById)
router.get("/",AuthorController.getAuthors)
router.put("/",authenticate(secret_key),cleanCache(),AuthorController.updateAuthorById)

module.exports=router