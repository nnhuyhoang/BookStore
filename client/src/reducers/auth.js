import _ from "lodash"
import * as  types from "../constants/actionTypes"
const initialState={
    isAuthenticated: false,
    profile: {}
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.SET_CURRENT_USER:
            
            return {
                ...state,
                isAuthenticated: !_.isEmpty(action.payload),
                profile: action.payload
            }
        default:
            break;
    }
    return state

}

export default authReducer