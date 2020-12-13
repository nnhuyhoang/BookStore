import * as  types from "../constants/actionTypes"
const initialState={
    //0: all
    //1: search
    //2: department
    //3: category
    //4: author
    status:0,
    bookList: [],
    to: 20,
    currentDepartment: {},
    currentCategory: {}

}

const BooksReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_BOOKS:
            return action.payload
        case types.GET_BOOKS_BY_DEPARTMENT_NAME:
            return action.payload
        case types.GET_BOOKS_BY_CATEGORY_NAME:
            return action.payload
        case types.GET_BOOKS_BY_AUTHOR_NAME:
            return action.payload
        case types.SET_SEARCH_LIST:
            return action.payload
        case types.SET_BOOK_LIST:
            return {...state,bookList:action.payload}
        default:
            return state
    }
}

export default BooksReducer