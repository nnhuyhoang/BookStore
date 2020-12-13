import * as  types from "../constants/actionTypes"
const initialState=[]

const OrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_ORDER_BY_USER_ID:
            return action.payload
        default:
            return state
    }
}

export default OrderReducer