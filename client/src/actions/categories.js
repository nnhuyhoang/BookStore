import api from "./../api/index"
import * as types from "./../constants/actionTypes"
import axios from "axios"


export const createaCategory=(name,departId)=>(dispatch)=>{
    return api.post("api/categories",{name,departId})
        .then(res=>{
            dispatch({
                type: types.CREATE_CATEGORY,
                payload: res.data
            })
            console.log(res.data);
            
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            console.log(err);
            
            return ({status:false,message: err.response.data.message})
        })
}

export const getCategories=()=>(dispatch)=>{
   
    
    return api.get("api/categories/")
        .then(res=>{
            /* const transData={categoryList: res.data,current: {}} */
            dispatch({
                type: types.GET_CATEGORIES,
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err=>{
            console.log(err);
            
            return ({message: err.response.data.message})
        })
}

export const updateCategory=(name,cateId,departId)=>(dispatch)=>{
    return api.put("api/categories/",{name,cateId,departId})
    .then(res=>{
        /* const transData={categoryList: res.data,current: {}} */
        dispatch({
            type: types.UPDATE_CATEGORIES,
            payload: res.data
        })
        console.log(res.data);
        
        return Promise.resolve({status: true,data:res.data})
    })
    .catch(err=>{
        return ({status:false,message: err.response.data.message})
    })
}