const {Book} = require('./../../../models/Book')
const {Category}=require('./../../../models/Category')
const {Department}=require('./../../../models/Department')
const {Publisher}=require('./../../../models/Publisher')
const {Author}=require("./../../../models/Author")
const _=require("lodash")
const keys=require("./../../../config/index")
const {promisify}=require("util")
module.exports.createBook=async (req,res,next)=>{
    const {name,department,category,author,publisher,releaseDate,description,quantity,price,image}=req.body
    try {
        const firstList=[]
        firstList.push(Author.findOne({name: author}))
        firstList.push(Publisher.findOne({name:publisher}))
        const result=await Promise.all(firstList)
        publish=result[1]
        auth=result[0]
        let publishId=0
        let authorId=0
        if(!publish){
            const newPublisher=await new Publisher({name: publisher}).save()
            publishId=newPublisher._id
        }
        else{
            publishId=publish._id
        }
        if(!auth){
            const newAuthor=await new Author({name: author}).save()
            authorId=newAuthor._id
        }
        else{
            authorId=auth._id
        }
        const checkList=[]
        checkList.push(Book.findOne({name: name}))
        checkList.push(Category.findById(category))
        checkList.push(Department.findById(department))
        const ret=await Promise.all(checkList)
        book=ret[0]
        cate=ret[1]
        depart=ret[2]
        if(book) throw new Error("Book already Existed")
        if(!cate) throw new Error("Category not found")
        if(!depart) throw new Error("Department not found")
        const maximumCanBuy=Math.floor(quantity/10)
        const newBook= new Book({name,department,category,author: authorId,publisher:publishId,releaseDate,description,quantity,price,image,maximumCanBuy})
        const final=await newBook.save()
        return res.status(200).json(final)
    } catch (err) {
        if(err.message==='Book already Existed') return res.status(404).json({message: err.message})
        if(err.message==='Category not found') return res.status(404).json({message: err.message})
        if(err.message==='Department not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }

}


module.exports.addImageToBookByBookId=(req,res,next)=>{
    const {ImageUrl}=req.body
    const {bookId}=req.params

    Book.findById(bookId)
        .then(book=>{
            if(!book) return Promise.reject({status: 404,message: "Book not found"})
            book.image=keys.awsDomain+`/${ImageUrl}`
            return book.save()
        })
        .then(result=>res.status(200).json(result))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getBooks=(req,res,next)=>{
    const quantity=parseInt(req.params.to)
    Book.find()
        .limit(quantity)
        .populate("department")
        .populate("category")
        .populate("author")
        .populate("publisher")
        .then(books=>res.status(200).json(books))
        .catch(err=>res.status(500).json(err))
}

module.exports.getBookById=(req,res,next)=>{
    console.log(req.params);
    
    const {id}=req.params
    Book.findById(id)
        .then(book=>res.status(200).json(book))
        .catch(err=>res.status(500).json(err))
}

module.exports.getBookByName=(req,res,next)=>{
    console.log("getBookByName");
    const name=req.params.bookName.replace(/-/g,' ')
    Book.findOne({name: name})
        .populate("department")
        .populate("category")
        .then(book=>res.status(200).json(book))
        .catch(err=>res.status(500).json(err))
}


module.exports.getBooksByAuthorName=(req,res,next)=>{
    const authorName=req.params.authorName.replace(/_/g,' ')
    const quantity=parseInt(req.params.to)

    console.log(req.body);
    
    Author.findOne({name: authorName})
        .then(author=>{
            if(!author) return Promise.reject({status:404,message: "Author not found"})
            return Book.find({author: author._id})
            .limit(quantity)
            .populate("author")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status:404, message: "Book not found"})
            return res.status(200).json(books)
        })
        .catch(err=>{
            if(res.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}


module.exports.getBookByCategoryId=(req,res,next)=>{
    console.log("getBooksByCategoryId");
    console.log(req.params);
    const {categoryId}=req.params
    Category.findById(categoryId)
        .then(cate=>{
            if(!cate) return Promise.reject({status: 404,message: "Category not found"})
            return Book.find({category: categoryId})
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404, message: "Books not found"})
            return res.status(200).json(books)
        })
        .catch(err=>{
            if(res.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}


module.exports.getBooksByDepartmentName=(req,res,next)=>{
    console.log("getBooksByDepartmentName");
    console.log(req.params);
    
    const departmentName=req.params.departmentName.replace(/_/g,' ')
    const quantity=parseInt(req.params.to)
    
    Department.findOne({name:departmentName})
        .then(depart=>{
            if(!depart) return Promise.reject({status:404,message: "Department not found"})
            return Book.find({department: depart._id})
                .limit(quantity)
                .populate("department")
                .populate("category")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404,message: "Not available Item yet"})
            return res.status(200).json(books)
        })
        .catch(err=>{
            if(res.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getBooksByCategoryName=(req,res,next)=>{
    console.log("getBooksByCategoryName");
    
    const categoryName=req.params.categoryName.replace(/_/g,' ')
    const quantity=parseInt(req.params.to)

    Category.findOne({name:categoryName})
        .then(cate=>{
            if(!cate) return Promise.reject({status:404,message: "Category not found"})
            return Book.find({category: cate._id})
                .limit(quantity)
                .populate("department")
                .populate("category")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404,message: "Not available Item yet"})
            return res.status(200).json(books)
        })
        .catch(err=>{
            console.log(err);
            
            if(res.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.updateBookByBookId=async (req,res,next)=>{
    const {_id,name,department,category,author,publisher,releaseDate,description,quantity,price,image}=req.body
    try {
        const firstList=[]
        firstList.push(Author.findOne({name: author}))
        firstList.push(Publisher.findOne({name:publisher}))
        const result=await Promise.all(firstList)
        publish=result[1]
        auth=result[0]
        let publishId=0
        let authorId=0
        if(!publish){
            const newPublisher=await new Publisher({name: publisher}).save()
            publishId=newPublisher._id
        }
        else{
            publishId=publish._id
        }
        if(!auth){
            const newAuthor=await new Author({name: author}).save()
            authorId=newAuthor._id
        }
        else{
            authorId=auth._id
        }
        const book=await Book.findById(_id)
        if(!book) throw new Error("Book not found")
        book.name=name
        book.department=department
        book.category=category
        book.author=authorId
        book.publisher=publishId
        book.releaseDate=releaseDate
        book.description=description
        book.price=price
        book.quantity=quantity
        book.maximumCanBuy=Math.floor(quantity/10)
        const final=await book.save()
        return res.status(200).json(final)
    } catch (err) {
        if(err.message==='Book not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
}

module.exports.deleteBookByBookId=(req,res,next)=>{
    const {bookId}=req.params
    Book.findById(bookId,function(err,book){
        if(err){
            return res.status(500).json(err)
        }
        if(!book) return res.status(404).json({message: "Book not found"})
        book.remove(function (err,ret){
            if(err){
                return res.status(500).json(err)
            }
            if(ret.n===0) return res.status(400).json({messge: "Cannot delete Book"})
            return res.status(200).json({message: "Delete Book successfully"})
        })

    })

}



module.exports.searchBook=(req,res,next)=>{
    const {name,quantity}=req.body   
    if(name==="") return res.status(200).json([])
    Book.search({
        "match":{
            "name": name
        }},
        {"from": 0, "size": quantity}, function(err, results) {
            if(err){
                return res.status(500).json(err)
            }
            
            return res.status(200).json(results.hits.hits)
    })
/*     Book.find({"name" : {$regex : `.*${name}.*`,$options: 'i'}})
        .then(ret=>{
            console.log(ret);
            
            return res.status(200).json(ret)
        })
        .catch(err=>res.status(500).json(err)) */
}

module.exports.sortBook=async (req,res,next)=>{
    const {status,order,quantity}=req.body
    try {
        var result={}
        if(status===0){
            result=await sortBookAll(order,quantity)     
        }
        else if(status===1){
            sortBookBySearchName(order,quantity,req.body.name,function(response){
                if(response.status){
                    return res.status(200).json(response.data)
                }
                return res.status(500).json(response.message)
            })
        }
        else if(status===2){
            result=await sortBookByDepartment(order,quantity,req.body.departmentName)
        }
        else if(status===3){
            result=await sortBookByCategory(order,quantity,req.body.categoryName)
        }
        else if(status===4){
            result=await sortBookByAuthorName(order,quantity,req.body.authorName)
        }
        if(status!==1 && result.status){
            return res.status(200).json(result.data)
        }
    } catch (error) { 
        return res.status(500).json(error)
    }
    
}

const sortBookAll=async (order,quantity)=>{
    return Book.find()
    .sort({price: order})
    .limit(quantity)
    .populate("department")
    .populate("category")
    .populate("author")
    .populate("publisher")
    .then(books=>{return {status: true,data:books}})
    .catch(err=>{return {status:false,message: err}})

}

const sortBookByAuthorName=(order,quantity,authorName)=>{
    const authName=authorName.replace(/_/g,' ')
    return Author.findOne({name:authName})
        .then(author=>{
            if(!author) return Promise.reject({status:404,message: "Author not found"})
            return Book.find({author: author._id})
                .sort({price: order})
                .limit(quantity)
                .populate("author")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404,message: "Not available Item yet"})
            return {status:true,data:books}
        })
        .catch(err=>{
            if(res.status) return {status:false,message: err.message}
            return {status:false,message: err}
        })
}

const sortBookByDepartment=(order,quantity,departmentName)=>{
    const departName=departmentName.replace(/_/g,' ')
    return Department.findOne({name:departName})
        .then(depart=>{
            if(!depart) return Promise.reject({status:404,message: "Department not found"})
            return Book.find({department: depart._id})
                .sort({price: order})
                .limit(quantity)
                .populate("department")
                .populate("category")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404,message: "Not available Item yet"})
            return {status:true,data:books}
        })
        .catch(err=>{
            if(res.status) return {status:false,message: err.message}
            return {status:false,message: err}
        })
}

const sortBookByCategory=(order,quantity,categoryName)=>{
    const cateName=categoryName.replace(/_/g,' ')

    return Category.findOne({name:cateName})
        .then(cate=>{
            if(!cate) return Promise.reject({status:404,message: "Category not found"})
            return Book.find({category: cate._id})
                .sort({price: order})
                .limit(quantity)
                .populate("department")
                .populate("category")
        })
        .then(books=>{
            if(books.length<=0) return Promise.reject({status: 404,message: "Not available Item yet"})
            return {status:true,data:books}
        })
        .catch(err=>{
            if(res.status) return {status:false,message: err.message}
            return {status:false,message: err}
        })
}

const sortBookBySearchName=async (order,quantity,name,callback)=>{  
    if(name==="") return {status:true,data:[]}
    let searchSort=order===1?"asc":"desc"
    Book.search({
        "match":{
            "name": name
        }},
        {"sort":[
            {"price":{"order":searchSort}}
        ],
        "from": 0, 
        "size": quantity}
        ,function(err, results) {
        if(err){
            return callback({status:false,message: err})
        }
        return callback({status: true,data:results.hits.hits})
    })
    
}