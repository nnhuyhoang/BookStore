import * as  types from "../constants/actionTypes"
const initialState=[]

const HistoryReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_HISTORY_BY_USER_ID:
            return action.payload
        default:
            return state
    }
}

export default HistoryReducer