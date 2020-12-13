import * as types from "./../constants/actionTypes"
import api from "../api"


export const getHistoryOrderByUserId=(userId)=>(dispatch)=>{
    return api.get(`api/orders/history/${userId}`)
        .then(ret=>{
            dispatch({
                type: types.GET_HISTORY_BY_USER_ID,
                payload: ret.data
            })
            return Promise.resolve({status: true,data: ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}