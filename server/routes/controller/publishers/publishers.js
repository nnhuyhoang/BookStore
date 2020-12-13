const {Publisher}=require("./../../../models/Publisher")




module.exports.createPublisher=(req,res,next)=>{
    const {name}=req.body
    Publisher.findOne({name:name})
        .then(publish=>{
            if(publish) return Promise.reject({status: 400,message: "Publisher already existed"})
            const newPublisher=new Publisher({name})
            return newPublisher.save()
        })
        .then(publish=>res.status(200).json(publish))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getPublishers=(req,res,next)=>{
    Publisher.find()
        .then(publishers=>res.status(200).json(publishers))
        .catch(err=>res.status(500).json(err))
}


module.exports.getPublisherById=(req,res,next)=>{
    const {id}=req.params
    Publisher.findById(id)
        .then(publish=>res.status(200).json(publish))
        .catch(err=>res.status(500).json(err))
}