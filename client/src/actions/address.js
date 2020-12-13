import api from "./../api/index"
import * as types from "./../constants/actionTypes"
export const createAddress=(data)=>(dispatch)=>{
    return api.post("api/address/",data)
        .then(ret=>{
            dispatch({
                type: types.CREATE_ADDRESS,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}
export const updateAddress=(data)=>(dispatch)=>{
    return api.put("api/address/",data)
        .then(ret=>{
            dispatch({
                type: types.UPDATE_ADDRESS,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}
export const getAddress=(userId)=>(dispatch)=>{
    return api.get(`api/address/${userId}`)
        .then(ret=>{
            dispatch({
                type: types.GET_ADDRESS,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}
export const deleteAddress=()=>(dispatch)=>{
        dispatch({
            type: types.DELETE_ADDRESS,
            payload: {}
        })

}