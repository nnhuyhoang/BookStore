import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import CartPrice from "./../CartPrice/CartPrice"
import CartList from "./../CartList/CartList"
import CartOrder from "./../CartOrder/CartOrder"
import * as CartActions from "./../../actions/cart"
import "./style.css"

const Cart=(props)=> {

    const [isOrder,setIsOrder]=useState(false)
    const auth=useSelector(state=>state.auth)
    const cart=useSelector(state=>state.cart)
    const dispatchCart=useDispatch()
    const placeOrderHandle=()=>{
        setIsOrder(true)
    }   
    const cartListHandle=()=>{
        setIsOrder(false)
    }
    
    useEffect(() => {
        if(!auth.isAuthenticated){
            console.log("im in auth check");
            
            props.history.push("/login")
            return
        }
        return () => {
            console.log("clean up cart");
            
        }
    }, [])
    
    console.log("render Cart");
    
    return (
        auth.isAuthenticated?<React.Fragment>
        <div className="Content">
            <div className="CartWrapper">
                {(isOrder&&cart.productList.length>0)?<CartOrder/>:<CartList/>}
                <div className="CartPrice">
                    <CartPrice/>
                    <div className="PlaceOrder">
                    <button style={{visibility: (isOrder &&cart.productList.length>0)?"visible":"hidden"}} className="PlaceOrderButton" onClick={cartListHandle}>Go Back Products List</button>
                    <button style={{visibility: (!isOrder&&cart.productList.length>0)?"visible":"hidden"}} className="PlaceOrderButton" onClick={placeOrderHandle}>Place Order</button>
                    </div>
                </div>
                
            </div>
        </div>
    </React.Fragment>:null
    )
}

export default Cart
