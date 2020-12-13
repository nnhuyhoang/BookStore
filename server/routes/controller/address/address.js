
const {User}=require("./../../../models/User")
const {Address}=require("./../../../models/Address")

module.exports.createAddress=(req,res,next)=>{
    const {userId,street,district,city,zipcode,mobile,alternate}=req.body
    User.findById(userId)
        .then(user=>{
            if(!user) return Promise.reject({status:404,message: "User not found"})
            const newAddress=new Address({user:userId,street,district,city,zipcode,mobile,alternate})
            return newAddress.save()
        })
        .then(add=>res.status(200).json(add))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getAddressByUserId=(req,res,next)=>{
    const {userId}=req.params
    User.findById(userId)
    .then(user=>{
        if(!user) return Promise.reject({status:404,message: "User not found"})
        return Address.findOne({user: userId})
    })
    .then(add=>{
        if(!add) return Promise.reject({status:404,message: "Address not found"})
        return res.status(200).json(add)
    })
    .catch(err=>{
        if(err.status) return res.status(err.status).json(err.message)
        return res.status(500).json(err)
    })
}

module.exports.updateAddress=(req,res,next)=>{
    const {userId,street,district,city,zipcode,mobile,alternate}=req.body

    User.findById(userId)
        .then(user=>{
            
            if(!user) return Promise.reject({status:404,message: "User not found"})
            return Address.findOne({user: userId})
        })
        .then(address=>{
            if(!address) return Promise.reject({status:404,message: "Address not found"})
            address.street=street
            address.district=district
            address.city=city
            address.zipcode=zipcode
            address.mobile=mobile
            if(alternate){
                address.alternate=alternate
            }
            return address.save()
        })
        .then(updateAddress=>res.status(200).json(updateAddress))
        .catch(err=>{
            console.log(err);
            
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}