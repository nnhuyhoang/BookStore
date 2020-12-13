const {Category}=require('./../../../models/Category')
const {Department}=require('./../../../models/Department')
const {Book}=require('./../../../models/Book')
const mongoose=require("mongoose")
const _=require("lodash")

module.exports.createCategory=async (req,res,next)=>{
    const {name,departId}=req.body

    try {
        const cate=await Category.findOne({name:name})
        if(cate) throw new Error("Category already existed")
        const depart=await Department.findById(departId)
        if(!depart) throw new Error("Department not found")
        const newCategory=new Category({name:name,department: departId})
        const savedCate=await newCategory.save()
        depart.categories.push(savedCate._id)
        await depart.save()
        const result=await savedCate.populate("department").execPopulate()   
        return res.status(200).json(result)
    } catch (err) {
        if(err.message==='Category already existed') return res.status(404).json({message: err.message})
        if(err.message==='Department not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
}

module.exports.getCategories=(req,res,next)=>{
    Category.find()
        .populate("department")
        .then(categories=>res.status(200).json(categories))
        .catch(err=>res.status(500).json(err))
}


module.exports.getCategoryById=(req,res,next)=>{
    const {id}=req.params
    Category.findById(id)
        .then(cate=>res.status(200).json(cate))
        .catch(err=>res.status(500).json(err))
}

module.exports.addDepartmentToCategory=async (req,res,next)=>{
    const{categoryId,departmentId}=req.body
    try {
        const [cate,depart]= await Promise.all([Category.findById(categoryId),Department.findById(departmentId)])
        if(!cate) throw new Error("Category not found")
        if(!depart) throw new Errow("Department not found")
        let check=false
        for(var ele of depart.categories){
            if(ele.toString()===categoryId){
                check=true
                break;
            }
        }
        if(!check){

            depart.categories.push(categoryId)
            await depart.save()
        }

        if(!cate.department || cate.department.toString()!==departmentId ){

            cate.department=departmentId
            const ret=await cate.save()
            return res.status(200).json(ret)
        }
        return res.status(400).json({message: "It already added"})
    } catch (err) {
        if(err.message==='Category not found') return res.status(404).json({message: err.message})
        if(err.message==='Department not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
}


module.exports.updateCategoryById=async (req,res,next)=>{
    const {name,cateId,departId}=req.body
    try {
        const [category,department]= await Promise.all([Category.findById(cateId),Department.findById(departId)])
        if(!category) throw new Error("Category not found")
        if(!department) throw new Errow("Department not found")
        const oldDepartment=await Department.findById(category.department)
        if(!oldDepartment) throw new Errow("Old Department not found")
        const bookList=await Book.find({category: cateId})
        if(bookList.length>0){
            bookList.forEach(ele => {
                    ele.department=departId
            });
            const reqList=bookList.map(ele=>{
                return ele.save()
            })
            await Promise.all(reqList)
        }
        let resultCate={}
        let resultDepart={}
        let resultOld={}
        if(oldDepartment._id.toString()!==department._id.toString()){
            const index=_.findIndex(oldDepartment.categories,function(o){return o.toString()===cateId})
            if(index<0) throw new Errow("Cannot find category in department")
            oldDepartment.categories.splice(index,1)
            department.categories.push(cateId)
            category.department=departId
            category.name=name
            resultCate=await category.save()
            resultDepart=await department.save()
            resultOld= await oldDepartment.save()
            const result=await resultCate.populate("department").execPopulate()
            return res.status(200).json(result)
        }
        else{
            category.name=name
            resultCate=await category.save()
            const result=await resultCate.populate("department").execPopulate()     

            return res.status(200).json(result)
        }
    } catch (err) {
        console.log(err);
        if(err.message==='Cannot find category in department') return res.status(404).json({message: err.message})
        if(err.message==='Category not found') return res.status(404).json({message: err.message})
        if(err.message==='Department not found') return res.status(404).json({message: err.message})
        if(err.message==='Old Department not found') return res.status(404).json({message: err.message})
        return res.status(500).json(err)
    }
}


module.exports.deleteCategoryById=async (req,res,next)=>{
    const {cateId}=req.params
    Category.findById(cateId)
        .then(cate=>{
            if(!cate) return Promise.reject({status:404,message: "Category not found"})
            return Department.findById(cate.department)
        
        })
        .then(depart=>{
            const index=_.findIndex(depart.categories,function(o){return o===cateId})
            depart.splice(index,1)
            return Promise.all[Category.deleteOne({_id: cateId}),depart.save()]
        })
        .then(result=>{
            const cate=result[0]
            const depart=result[1]
            if(cate.n===0) return Promise.reject({status:400,message: "Cannot delete Category"})
            return res.status(200).json({message: "Delete Category Successfully"})
        })
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}