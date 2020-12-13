import {combineReducers} from "redux"
import books from "./books"
import categories from "./categories"
import departments from "./departments"
import auth from "./auth"
import cart from "./cart"
import address from "./address"
import reviews from "./reviews"
import authors from "./authors"
import orders from "./orders"
import histories from "./histories"
const rootReducer=combineReducers({
    books,categories,departments,auth,cart,address,reviews,authors,orders,histories
})

export default rootReducer