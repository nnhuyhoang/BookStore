import api from "./../api/index"
import * as types from "./../constants/actionTypes"
import axios from "axios"

export const createReview=(data)=>(dispatch)=>{
    return api.post(`api/reviews/`,data)
        .then(ret=>{
            console.log(ret.data);
            
            dispatch({
                type:types.CREATE_REVIEW,
                payload: ret.data
            })
            return Promise.resolve({status: true,data: ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const getReviewsByBookId=(bookId)=>(dispatch)=>{
    return api.get(`api/reviews/${bookId}`)
        .then(ret=>{
            let transData={
                commentList:[],
                rate: 0,
                rateCount: 0
            }
            if(ret.data.length>0) transData={commentList: ret.data,rate: ret.data[0].book.rate,rateCount: ret.data[0].book.rateCount}
            dispatch({
                type:types.GET_REVIEWS,
                payload: transData
            })
            return Promise.resolve({status: true,data: transData})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
    
}

export const updateReviewById=(data)=>(dispatch)=>{
    return api.put("api/reviews/",data)
        .then(ret=>{
            dispatch({
                type:types.UPDATE_REVIEW,
                payload: ret.data
            })
            return Promise.resolve({status: true,data: ret.data})
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}

export const deleteReviewById=(reviewId)=>(dispatch)=>{

    return api.delete(`api/reviews/${reviewId}`,)
    .then(ret=>{
        dispatch({
            type:types.DELETE_REVIEW,
            payload: ret.data
        })
        return Promise.resolve({status: true,data: ret.data})
    })
    .catch(err=>{
        return {status: false,message:err}
    })
}