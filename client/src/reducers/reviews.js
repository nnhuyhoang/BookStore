import * as  types from "../constants/actionTypes"
import _ from "lodash"
const initialState={
    commentList: [],
    rateCount: 0,
    rate: 0
}

const ReviewsReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.CREATE_REVIEW:
            state.commentList.push(action.payload)
            state.rate=action.payload.book.rate
            state.rateCount=action.payload.book.rateCount
            return {...state}
        case types.GET_REVIEWS:
            return action.payload
        case types.UPDATE_REVIEW:
            const index=_.findIndex(state.commentList,function(o){return o._id===action.payload._id})      
            state.commentList[index]=action.payload
            state.rate=action.payload.book.rate
            state.rateCount=action.payload.book.rateCount
            return {...state}
        case types.DELETE_REVIEW:
            const indexDelete=_.findIndex(state.commentList,function(o){return o._id===action.payload.id})      
            state.commentList.splice(indexDelete,1)
            state.rate=action.payload.rate
            state.rateCount=action.payload.rateCount
            return {...state}
        default:
            return state
    }
}

export default ReviewsReducer