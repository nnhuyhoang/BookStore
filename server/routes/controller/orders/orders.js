const {User}=require("./../../../models/User")
const {Product}=require("./../../../models/Product")
const {Order}=require("./../../../models/Order")
const {Address}=require("./../../../models/Address")
const _=require("lodash")
module.exports.createOrder= async(req,res,next)=>{
    const {products,userId,addressId,payment,receiver}=req.body
    try {
        const user= await User.findById(userId)
        if(!user) throw new Error("User not found")
        const add=await Address.findById(addressId)
        if(!add) throw new Error("Address not found")
        const prods= await Product.find({_id: {$in: products}})
        let ret=prods.filter(prod=>{
            if(!_.isEmpty(prod)){
                prod.isSold=true
                return prod
            }
        })
        const productReq=[]
        ret.forEach(item => {
            productReq.push(item.save())
        });
        const productId=ret.map(ele=>ele._id)
        await Promise.all(productReq)        
        const totalPrice=ret.reduce((sum,current)=>sum+current.totalPrice,0)
        const newOrder=new Order({receiver,products: productId,address: add,user: userId,payment:payment,totalPrice: totalPrice})
        const order=await newOrder.save()
        return res.status(200).json(order)
    } catch (err) {
        if(err.message==='User not found') return res.status(404).json({message: err.message})
        if(err.message==='Address not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
    
}


module.exports.getOrdersByUserId=(req,res,next)=>{
    const {userId}=req.params
    Order.find({$and: [{user: userId},{status: {$ne: "Delivered"}}]})
        .populate("products","book.name quantity totalPrice ")
        .then(orders=>res.status(200).json(orders))
        .catch(err=>res.status(500).json(err))
}

module.exports.getOrdersProcessing=(req,res,next)=>{
    Order.find({status: {$ne: "Delivered"}})
        .populate("products","book.name quantity totalPrice ")
        .then(orders=>res.status(200).json(orders))
        .catch(err=>res.status(500).json(err))
}

module.exports.getOrdersHistory=(req,res,next)=>{
    Order.find({status: "Delivered"})
        .populate("products","book.name quantity totalPrice ")
        .then(orders=>res.status(200).json(orders))
        .catch(err=>res.status(500).json(err))
}


module.exports.changeOrderStatus=(req,res,next)=>{
    const {orderId,status}=req.body
    console.log(req.body);
    
    Order.findById(orderId)
        .then(order=>{
            if(!order) return Promise.reject({status: 404, message: "Order not found"})
            order.status=status
            return order.save()
        })
        .then(order=>res.status(200).json(order))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}


module.exports.getHistoryByUserId=(req,res,next)=>{
    const {userId}=req.params
    console.log(userId);
    
    Order.find({$and: [{user: userId},{status: {$eq: "Delivered"}}]})
        .populate("products","book.name quantity totalPrice ")
        .then(orders=>res.status(200).json(orders))
        .catch(err=>res.status(500).json(err))
}


module.exports.searchOrders=(req,res,next)=>{
    const {pattern}=req.body
    Order.search({
        "bool": {
            "should": [
                {
                    "match": {
                        "receiver": pattern
                    }
                },
                {
                    "nested":{
                        "path": "address",
                        "query":{
                            "match": {
                                "address.mobile": pattern
                            }
                        }
                    }
                }
            ],
            "must_not": [
                {
                    "term": {
                        "status.keyword": "Delivered"
                    }
                }
            ]
        }
    },function(err, results) {
        if(err){
            console.log(err);
            
            return res.status(500).json(err)
        }
        return res.status(200).json(results.hits.hits)
    })
}

module.exports.searchHistory=(req,res,next)=>{
    const {pattern}=req.body
    Order.search({
        "bool": {
            "must_not": [
              {
                "terms": {
                  "status.keyword": [
                    "Delivering",
                    "Checking"
                  ]
                }
              }
            ],
            "should": [
              {
                "match": {
                  "receiver": pattern
                }
              },
              {
                "nested": {
                  "path": "address",
                  "query": {
                    "match": {
                      "address.mobile": pattern
                    }
                  }
                }
              }
            ]
        }
    },function(err, results) {
        if(err){
            console.log(err);
            
            return res.status(500).json(err)
        }
        return res.status(200).json(results.hits.hits)
    })
}