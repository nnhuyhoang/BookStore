
import api from "./../api/index"
import * as types from "./../constants/actionTypes"
export const getAuthors=()=>(dispatch)=>{

    return api.get("api/authors/")
        .then(ret=>{
            dispatch({
                type: types.GET_AUTHORS,
                payload: ret.data
            })
            return Promise.resolve({status:true,data:ret.data})
            
        })
        .catch(err=>{
            return {status: false,message:err}
        })
}