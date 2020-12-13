const express=require('express')
const BookController=require('./books')
const router=express.Router()


router.post("/",BookController.createBook)
router.post("/sort",BookController.sortBook)
router.post("/search",BookController.searchBook)
router.get("/size/:to",BookController.getBooks)
router.get("/name/:bookName",BookController.getBookByName)
router.get("/author/:authorName/:to",BookController.getBooksByAuthorName)
router.get("/category/:categoryId/",BookController.getBookByCategoryId)
router.get("/:departmentName/:to",BookController.getBooksByDepartmentName)
router.get("/:departmentName/:categoryName/:to",BookController.getBooksByCategoryName)

router.get("/:id",BookController.getBookById)
router.put("/image/:bookId",BookController.addImageToBookByBookId)
router.put("/",BookController.updateBookByBookId)
router.delete("/:bookId",BookController.deleteBookByBookId)
module.exports=router