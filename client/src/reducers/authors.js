import * as  types from "../constants/actionTypes"
const initialState=[]

const AuthorReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_AUTHORS:
            return action.payload
        default:
            return state
    }
}

export default AuthorReducer