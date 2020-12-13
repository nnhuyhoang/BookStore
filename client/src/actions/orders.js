import api from "../api/index"
import * as types from "./../constants/actionTypes"
import axios from "axios"
export const createOrder=(data)=>{
    console.log(data);
    
    return api.post("api/orders/",data)
        .then(ret=>{
            console.log(ret.data);
            return Promise.resolve({status:true,data:ret.data})
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const getOrdersByUserId=(userId)=>(dispatch)=>{
    return api.get(`api/orders/${userId}`)
        .then(ret=>{
            dispatch({
                type: types.GET_ORDER_BY_USER_ID,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
            
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const getOrdersProcessing=()=>{
    return api.get("api/orders/processing")
        .then(ret=>{
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const getOrdersHistory=()=>{
    return api.get("api/orders/history")
        .then(ret=>{
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const changeOrderStatus=(orderId,status)=>{
    return api.put("api/orders/status",{orderId,status})
        .then(ret=>{
            return Promise.resolve({status:true,data:ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

let cancel
export const searchOrder=(pattern)=>{
    if(cancel){
        console.log("Im in cancel");
        
        cancel.cancel()
    }
    
    cancel = axios.CancelToken.source()
    const data={pattern:pattern}
    return api({method:"post",url:"api/orders/admin/search",data,cancelToken: cancel.token})
        .then(res=>{
            const transData=res.data.map(item=>{return {...item._source,_id:item._id}})
            return Promise.resolve({status: true,data:transData})
            
        })
        .catch(error=>{
            if(axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log('Request canceled', error.message);
                } else {
                // Handle usual errors
                console.log('Something went wrong: ', error.message)
                }
            return {status: false,message:error.message}
        })
}


export const searchHistory=(pattern)=>{
    if(cancel){
        console.log("Im in cancel");
        
        cancel.cancel()
    }
    
    cancel = axios.CancelToken.source()
    const data={pattern:pattern}
    return api({method:"post",url:"api/orders/admin/search/history",data,cancelToken: cancel.token})
        .then(res=>{
            const transData=res.data.map(item=>{return {...item._source,_id:item._id}})
            return Promise.resolve({status: true,data:transData})
        })
        .catch(error=>{
            if(axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log('Request canceled', error.message);
                } else {
                // Handle usual errors
                console.log('Something went wrong: ', error.message)
                }
            return {status: false,message:error.message}
        })
}

