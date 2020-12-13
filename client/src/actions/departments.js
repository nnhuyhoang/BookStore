import api from "./../api/index"
import * as types from "./../constants/actionTypes"
import axios from "axios"

export const createDepartment=(name)=>(dispatch)=>{
    return api.post("api/departments/",{name})
    .then(res=>{
        dispatch({
            type: types.CREATE_DEPARTMENT,
            payload: res.data
        })
        return Promise.resolve({status: true,data:res.data})
    })
    .catch(err=>{
        return ({status:false,message: err.response.data.message})
    })
}

export const getDepartments=()=>(dispatch)=>{
    
    return api.get("api/departments/")
        .then(res=>{
            /* const transData={departmentList: res.data,current: {}} */
            dispatch({
                type: types.GET_DEPARTMENTS,
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err=>{
            console.log(err);
            
            return ({message: err.response.data.message})
        })
}

export const updateDepartment=(name,departId)=>(dispatch)=>{
    return api.put("api/departments/",{name,departId})
    .then(res=>{
        dispatch({
            type: types.UPDATE_DEPARTMENT,
            payload: res.data
        })
        return Promise.resolve({status: true,data:res.data})
    })
    .catch(err=>{
        return ({status:false,message: err.response.data.message})
    })
}