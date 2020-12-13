import * as  types from "../constants/actionTypes"
import _ from "lodash"
const initialState=[]

const DepartmentsReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.CREATE_DEPARTMENT:
            state.push(action.payload)
            return [...state]
        case types.GET_DEPARTMENTS:
            return action.payload
        case types.UPDATE_DEPARTMENT:
            const ret=action.payload
            const index=_.findIndex(state,function(o){return o._id===ret._id})
            state[index]=ret
            return [...state]
        default:
            
            return state
    }
}

export default DepartmentsReducer