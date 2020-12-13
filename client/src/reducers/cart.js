import _ from "lodash"
import * as  types from "../constants/actionTypes"
const initialState={
    productList: [],
    isSetup: false
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.ADD_CART:
            return {
                ...state,
                productList:[...state.productList,action.payload],
                isSetup: false}
        case types.DELETE_CART:
            return {
                ...state,
                productList:[],
                isSetup: false
            }
        case types.MERGE_CART:
            return {
                ...state,
                productList:action.payload,
                isSetup: true
            }
        case types.UPDATE_QUANTITY:
            const ret=action.payload
            const index=_.findIndex(state.productList,function(prod){return prod._id===ret._id})
            state.productList[index]=ret
            return {...state}
        case types.RESET_PRODUCTS:
            state.isSetup=false
            return {...state}
        case types.DELETE_PRODUCT:
            const productId=action.payload
            const deleteIndex=_.findIndex(state.productList,function(prod){return prod._id===productId})
            state.productList.splice(deleteIndex,1)
            return {...state}
        default:
            break;
    }
    return state

}

export default authReducer