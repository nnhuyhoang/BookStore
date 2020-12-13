import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import InformationForm from "../InformationForm/InformationForm"
import RadioButton from "./../UI/RadioButton/RadioButton"
import './style.css';


const CartOrder=(props)=>{
        const cart=useSelector(state=>state.cart)
        const auth=useSelector(state=>state.auth)

        return (
            <React.Fragment>
                <div className="ContentPlaceOrder">
                    <div className="PlaceOrderWrapper">        

                            <div className="Card">
                                <p className="CardText">Name: {auth.profile.name}</p>
                                <p className="CardText">Email: {auth.profile.email}</p>
                            </div>   
                            <div className="Card">
                                <p className="CardText">Delivery Address</p>
                                <InformationForm/>
                            </div>                     
                    </div>
                </div>
                
            </React.Fragment>
        );

}

export default CartOrder