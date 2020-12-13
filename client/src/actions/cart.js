
import api from "./../api/index"
import * as types from "./../constants/actionTypes"

export const addCartUser=(data)=>(dispatch)=>{

    return api.post("api/products",data)
        .then(ret=>{

            dispatch({
                type: types.ADD_CART,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}


export const addCartUserNotDelete=(data)=>(dispatch)=>{
    return api.post("api/products",data)
        .then(ret=>{
            return Promise.resolve({status:true,data:ret.data})
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const addCartGuest=(data)=>(dispatch)=>{
    dispatch({
        type: types.ADD_CART,
        payload: data
    })
    return Promise.resolve({status:true})
}

export const mergeProducts=(userId)=>(dispatch)=>{

    
    return api.post("api/products/merge",{userId})
        .then(ret=>{
            console.log(ret.data);
            
            dispatch({
                type: types.MERGE_CART,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const updateQuantity=(data)=>(dispatch)=>{
    return api.put("api/products/quantity",data)
        .then(ret=>{
            dispatch({
                type:types.UPDATE_QUANTITY,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const deleteProduct=(productId)=>(dispatch)=>{
    
    return api.delete(`api/products/${productId}`)
        .then(ret=>{
            if(ret.data.status){
                dispatch({
                    type:types.DELETE_PRODUCT,
                    payload: productId
                })
            }
            return Promise.resolve({status:ret.data.status})
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const resetProducts=()=>(dispatch)=>{
    dispatch({
        type: types.RESET_PRODUCTS
    })
}
export const deleteCart=()=>(dispatch)=>{
    dispatch({
        type: types.DELETE_CART
    })

}


