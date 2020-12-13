const {User}=require("./../../../models/User")
const {Book}=require("./../../../models/Book")
const {Product}=require("./../../../models/Product")
const mongoose=require("mongoose")
const _=require("lodash")
module.exports.createProduct=async (req,res,next)=>{
    try {
        const {book,userId,quantity}=req.body
        
        const user=await  User.findById(userId)
        if(!user) throw new Error("User not found")
        const prod=await Book.findById(book.id)
        if(!prod) throw new Error("Book not found")
        book.quantity=prod.quantity
        if(book.quantity<1) throw new Error("Not enough quantity")
        book.name=prod.name
        book.price=prod.price
        book.maximumCanBuy=prod.maximumCanBuy
        book.image=prod.image
        const totalPrice=Math.round((book.price*quantity) * 100) / 100
        const newProduct=new Product({book,user:userId,quantity,totalPrice})
        prod.quantity=prod.quantity-1
        const ret=await newProduct.save()
        
        if(ret) return res.status(200).json(ret)
    } catch (err) {
        console.log(err);
        
        if(err.message==='User not found') return res.status(404).json({message: err.message})
        if(err.message==='Book not found') return res.status(404).json({message: err.message})
        if(err.message==='Not enough quantity') return res.status(400).json({message: err.message})
        return res.status(500).json(err)
    }
    
}

module.exports.addUserToProduct=(req,res,next)=>{
    const {bookId,userId,quantity}=req.body
    Book.findById(bookId)
    Product.findById(id)
        .then(prod=>{
            if(!prod) return Promise.reject({status:404,message:"Products not found"})
            prod.user=userId
            return prod.save()
        })
        .then(product=>res.status(200).json(product))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.mergeProducts=(req,res,next)=>{
    const {userId}=req.body
    Product.find({
        $and:[
            {user: userId},
            {isSold: false}
        ]
        })
        .then(products=>{
            if(products.length<1) return Promise.reject({status:404,message:"Products not found"})
            const dup=[]
            const deleteRequest=[]
            const ret=products
                .map(prod=>prod.book.id.toString())
                .map((bookId,index,arr)=>{
                    let current=arr.indexOf(bookId)
                    if(current===index){
                        return index
                    }
                    else{
                        dup.push({bookId:bookId, quantity: products[index].quantity})
                        deleteRequest.push(products[index]._id)
                        return false
                    }
                })
                .filter(index=>products[index])
                .map(finalIndex=>products[finalIndex])

            dup.forEach(book => {
                let index=_.findIndex(ret,function(o){return o.book.id.toString()==book.bookId})
                if(index>=0){
                    ret[index].quantity=ret[index].quantity+book.quantity
                    ret[index].totalPrice=Math.round((ret[index].quantity*ret[index].book.price) * 100) / 100

                }
            });

            return Promise.all([ret,Product.deleteMany({_id:{$in: deleteRequest}})])

        })
        .then(prods=>{
            const final=prods[0]
            const finalRequest=final.map(prod=>prod.save())
            return Promise.all(finalRequest)
        })
        .then(result=>res.status(200).json(result))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}


module.exports.getProductsByUserId=(req,res,next)=>{
    const {userId}=req.params
    Product.find({user: userId})
        .then(products=>{
            if(products.length<1) return Promise.reject({status:404,message:"Products not found"})
            const dup=[]
            const ret=products
                .map(prod=>prod.book.id.toString())
                .map((bookId,index,arr)=>{
                    let current=arr.indexOf(bookId)
                    if(current===index){
                        return index
                    }
                    else{
                        dup.push(bookId)
                        return false
                    }
                })
                .filter(index=>products[index])
                .map(finalIndex=>products[finalIndex])
            dup.forEach(bookId => {
                let index=_.findIndex(ret,function(o){return o.book.id.toString()==bookId})
                if(index>=0){
                    ret[index].quantity=ret[index].quantity+1
                }
                
            });
            return res.status(200).json(ret)
        })
        .catch(err=>res.status(500).json(err))
}


module.exports.updateQuantity=(req,res,next)=>{
    const {id,change}=req.body
    Product.findById(id)
        .then(prod=>{
            let alter=change
            if(!prod) return Promise.reject({status: 404,message: "Product not found"})

            if(change<=0){
                alter=1
            }
            else if(change>prod.book.maximumCanBuy){
                alter=prod.book.maximumCanBuy
            }
            prod.quantity=alter
            prod.totalPrice=Math.round((alter*prod.book.price) * 100) / 100
            return prod.save()
        })
        .then(product=>{
            return res.status(200).json(product)
        })
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}


module.exports.deleteProductById=(req,res,next)=>{
    const {id}=req.params
    
    
    Product.deleteOne({_id:id})
    .then((result) =>{
        if(result.n===0) return Promise.reject({status:404,message: "Not found"})
        return res.status(200).json({status:true,message: "Delete successfully"})
    })
    .catch(err =>{            
        if(err.status) return res.status(err.status).json({status:false,message: err.message})
        return res.status(500).json(err)
    })
}