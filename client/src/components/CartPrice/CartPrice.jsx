import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import * as CartActions from "./../../actions/cart"
import "./style.css"
const CartPrice=()=> {  
    const cart=useSelector(state=>state.cart)
    const totalQuantity=cart.productList.reduce((fin,cur)=>fin+cur.quantity,0)
    const totalPrice=Math.round((cart.productList.reduce((fin,cur)=>fin+cur.totalPrice,0)) * 100) / 100
    const renderItems=()=>{
        return cart.productList.map((prod,index)=>{
            return <div className="subRow" key={index}>
                <span>{prod.book.name} x {prod.quantity}</span>
                <span>${prod.totalPrice}</span>
            </div>

        })
    }
    console.log("render Cart Price");
    
    return (
        <div className="PriceWrapper">
            {/* show price */}
            <div className="CardTitle">
                <h3>PRICE DETAILS</h3>
            </div>
            <div className="CardBody">
                <div className="FinalBilling">
                    <div className="Row">
                        <p>Price ({totalQuantity})</p>
                        <p>${totalPrice}</p>
                    </div>
                    
                    <div className="itemRow">
                        {renderItems()}
                    </div>
                    <hr/>
                    <div className="Row">
                        <p>Delivery</p>
                        <p>$0</p>
                    </div>
                    <hr />
                    <div className="Row">
                        <h4>Total Payable</h4>
                        <h4 className="totalPay">${totalPrice}</h4>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CartPrice
