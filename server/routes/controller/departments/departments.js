const {Department}=require("./../../../models/Department")
const {Category}=require("./../../../models/Category")



module.exports.createDepartment=(req,res,next)=>{
    const {name}=req.body
    Department.findOne({name:name})
        .then(depart=>{
            if(depart) return Promise.reject({status: 400,message: "Department already existed"})
            const newDepartment=new Department({name})
            return newDepartment.save()
        })
        .then(depart=>res.status(200).json(depart))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}

module.exports.getDepartments=(req,res,next)=>{
    Department.find()
        .populate("categories")
        .then(departments=>res.status(200).json(departments))
        .catch(err=>res.status(500).json(err))
}

module.exports.addCategoryToDepartment=async (req,res,next)=>{
    const{categoryId,departmentId}=req.body
    try {
        const [cate,depart]= await Promise.all([Category.findById(categoryId),Department.findById(departmentId)])
        if(!cate) throw new Error("Category not found")
        if(!depart) throw new Errow("Department not found")
        
        
        if(!cate.department || cate.department.toString()!==departmentId ){

            cate.department=departmentId
            await cate.save()
        }
        let check=false
        for(var ele of depart.categories){
            if(ele.toString()===categoryId){
                check=true
                break;
            }
        }
        if(!check){

            depart.categories.push(categoryId)
            const ret=await depart.save()
            return res.status(200).json(ret)
        }
        return res.status(400).json({message: "It already added"})
    } catch (err) {
        if(err.message==='Category not found') return res.status(404).json({message: err.message})
        if(err.message==='Department not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
}


module.exports.getDepartmentById=(req,res,next)=>{
    const {id}=req.params
    Department.findById(id)
        .then(depart=>res.status(200).json(depart))
        .catch(err=>res.status(500).json(err))
}


module.exports.updateDepartmentById=(req,res,next)=>{
    const {name,departId}=req.body
    Department.findById(departId)
        .then(department=>{
            if(!department) return Promise.reject({status: 404,message: "Department not found"})
            department.name=name
            return department.save()
        })
        .then(depart=>{
            return depart.populate("categories").execPopulate()
        })
        .then(result=>res.status(200).json(result))
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}