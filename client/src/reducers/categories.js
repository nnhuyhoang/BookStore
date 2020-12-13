import * as  types from "../constants/actionTypes"
import _ from "lodash"
const initialState=[]

const CategoriesReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.CREATE_CATEGORY:
            state.push(action.payload)
            return [...state]
        case types.GET_CATEGORIES:
            return action.payload
        case types.UPDATE_CATEGORIES:
            const ret=action.payload
            const index=_.findIndex(state,function(o){return o._id===ret._id})
            state[index]=ret
            return [...state]
        default:
            
            return state
    }
}

export default CategoriesReducer