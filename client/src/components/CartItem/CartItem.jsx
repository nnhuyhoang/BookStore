import React,{useState,useCallback,useEffect, memo} from 'react'
import QuantityControl from "./../QuantityControl/QuantityControl"
import {useSelector,useDispatch} from "react-redux"
import * as CartActions from "./../../actions/cart"
import "./style.css"
const CartItem=(props)=> {
    const [Quantity,setQuantity]=useState(props.quantity)
    const dispatchCart=useDispatch()
    const regexNumber=(str)=>{
        const regNumber=/^\d+$/
        return regNumber.test(str)
    }
    
    const increaseQuantity=useCallback(
        async () => {
            if(Quantity<props.maximumCanBuy){
                const retIncrease=await dispatchCart(CartActions.updateQuantity({id:props.productId,change: Quantity+1}))
                if(retIncrease.status){
                    setQuantity(Quantity+1)
                }
                
            }
        },[Quantity]
    )
    const decreaseQuantity=useCallback(
        async () => {
            if(Quantity>1){
                const retDecrease=await dispatchCart(CartActions.updateQuantity({id:props.productId,change: Quantity-1}))
                if(retDecrease.status){
                    setQuantity(Quantity-1)
                }
            }
        },[Quantity]
    )
    const handleQuantity=useCallback(
        async (e) => {
            e.preventDefault()
            const num=regexNumber(e.target.value)
            if(num){
                let value=parseInt(e.target.value,10)
                let ret={}
                if(value>props.maximumCanBuy){
                    value=props.maximumCanBuy
                    ret=await dispatchCart(CartActions.updateQuantity({id:props.productId,change: value}))
                }
                else if(value<1){
                    value=1
                    ret=await dispatchCart(CartActions.updateQuantity({id:props.productId,change: value}))
                }
                else{
                    ret=await dispatchCart(CartActions.updateQuantity({id:props.productId,change: value}))
                }
                if(ret.status){
                    setQuantity(value)
                }
                
            }
        },[Quantity]
    )

    const handleRemove=()=>{
        dispatchCart(CartActions.deleteProduct(props.productId))
    }
    useEffect(() => {
        setQuantity(props.quantity)
        return () => {
            console.log("cleanup cartItem:",props);
            
        }
    }, [props.quantity])
    console.log("render cartItem");
    
    
    return (
        <div className="SingleItem">
            <div className="ItemWrapper">
                <div className="ItemDescription">
                    <div className="ItemImage" style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}}>
                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={props.image} alt="" />
                    </div>
                    <div className="ItemDetails">
                        <p className="ItemName">{props.name}</p>
                        <p className="ItemPrice">${props.total}</p>
                    </div>  
                </div>
                <QuantityControl
                    className="quantityControl"
                    productQuantity={Quantity}
                    changeQuantity={handleQuantity} 
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    name={props.name}
                />
            </div>
            <div className="CartActionButtons">
                
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

export default React.memo(CartItem)
