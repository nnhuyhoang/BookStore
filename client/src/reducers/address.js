import * as  types from "../constants/actionTypes"
const initialState={}

const AddressReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.CREATE_ADDRESS:
            return action.payload
        case types.UPDATE_ADDRESS:
            return action.payload
        case types.GET_ADDRESS:
            return action.payload
        case types.DELETE_ADDRESS:
            return {}
        default:
            return state
    }
}

export default AddressReducer