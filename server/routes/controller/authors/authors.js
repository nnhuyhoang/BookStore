const {Author}=require("./../../../models/Author")




module.exports.createAuthor=(req,res,next)=>{
    const {name}=req.body
    Author.findOne({name:name})
        .then(author=>{
            if(author) return Promise.reject({status: 400,message: "Author already existed"})
            const newAuthor=new Author({name})
            return newAuthor.save()
        })
        .then(author=>res.status(200).json(author))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getAuthors=(req,res,next)=>{
    Author.find().cache({key: "guest"})
        .then(authors=>res.status(200).json(authors))
        .catch(err=>res.status(500).json(err))
}

module.exports.getAuthorById=(req,res,next)=>{
    const {id}=req.params
    Author.findById(id).cache({key: "guest"})
        .then(author=>res.status(200).json(author))
        .catch(err=>res.status(500).json(err))
}

module.exports.updateAuthorById=(req,res,next)=>{
    const {id,name}=req.body

    Author.findById(id)
        .then(author=>{

            if(!author) return Promise.reject({status:404,message: "Author not found"})
            author.name=name
            return author.save()
        })
        .then(author=>{
            
            return res.status(200).json(author)})
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}