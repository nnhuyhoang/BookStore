import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import CartItem from "./../CartItem/CartItem"
import "./style.css"

const CartList=(props)=> {

    const cart=useSelector(state=>state.cart)   
    const renderItems=()=>{
        return cart.productList.map((item,index)=>{
            return <CartItem
                key={item._id}
                productId={item._id}
                name={item.book.name}
                image={item.book.image}
                price={item.book.price}
                quantity={item.quantity}
                total={item.totalPrice}
                maximumCanBuy={item.book.maximumCanBuy}
            />
        })
    }


    console.log("render CartList");
    
    return (
        <div className="CartDetails">
            {/* List cart items */}
            <div className="CardTitle">
                <h3>My Cart</h3>
            </div>
            <div className="CardBody">
                {renderItems()}

            </div>
            
        </div>
    )
}

export default CartList
