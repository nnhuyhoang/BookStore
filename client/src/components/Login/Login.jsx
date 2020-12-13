import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link, Redirect ,withRouter} from 'react-router-dom';
import './style.css';
import _ from "lodash"
import Logo from '../Logo/Logo';
import MobileTypeInput from "../UI/MobileTypeInput/MobileTypeInput"
import SubmitGradientButton from '../UI/SubmitGradientButton/SubmitGradientButton'
import ErrorMessage from "../Error/ErrorMessage"
import * as AuthActions from "./../../actions/auth"
import * as AddressActions from "./../../actions/address"
import * as CartActions from "./../../actions/cart"
const Login=(props)=>{


    const [Refer,setRefer]=useState(false)
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [Error,setError]=useState(false)
    const [Message,setMessage]=useState('')
    const auth=useSelector(state=>state.auth)
    const cart=useSelector(state=>state.cart)
    const dispatchAuth=useDispatch()
    const dispatchAddress=useDispatch()
    const dispatchCart=useDispatch()
    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }


    const loginHandler = async (e) => {
        e.preventDefault();

        if(Email === ''){
            ErrorHandle(true, 'Enter Email'); return;
        }

        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(Email)){
            ErrorHandle(true, 'Invalid Email Address'); return;
        }

        if(Password === ''){
            ErrorHandle(true, 'Enter Password'); return;
        }
        console.log(Email,Password);
        
        const ret=await dispatchAuth(AuthActions.login({email:Email,password:Password}))
        if(ret.status){ 
            console.log(ret.data);
            
            await dispatchAddress(AddressActions.getAddress(ret.data.id))
            if(cart.productList.length>0 && !cart.productList[0].user){
                const data=[...cart.productList]
                for(let prod of data){
                    await dispatchCart(CartActions.addCartUserNotDelete({userId:ret.data.id,book:prod.book,quantity: prod.quantity}))
                };  
            }
            if(!cart.isSetup) {
                console.log("Im in wait");
                
                await dispatchCart(CartActions.mergeProducts(ret.data.id))
                console.log(cart);
                
            }
            setRefer(true)         
        }
        else{
            ErrorHandle(true,ret.message)
        }
        
    }

    if(Refer){
        props.history.goBack()
    }
    return (
        
        <div className="LoginContainer">
            <div className="WelcomeText">
                <h3>Login</h3>
            </div>
            <Logo style={{margin: '0 auto'}} />
            <div className="LoginWrapper">
                <p></p>
                <form onSubmit={loginHandler} autoComplete="off">

                    <MobileTypeInput 
                        type="text"
                        placeholder="Email"
                        value={Email}
                        textHandler={e=>setEmail(e.target.value)}
                        name="email"
                    />
                    <MobileTypeInput 
                        type="password"
                        placeholder="Password"
                        value={Password}
                        textHandler={e=>setPassword(e.target.value)}
                        name="password"
                    />

                    <ErrorMessage>
                        {Message}
                    </ErrorMessage>
                    
                    <SubmitGradientButton 
                        label="Login"
                        style={{marginTop: '30px'}}
                        
                    />
                </form>

                

            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link to="/signup">Create a new account</Link>
                <Link to="/forget-password">Forgot Password ?</Link>
            </div>
            
            
        </div>
    );
}

export default withRouter(Login)