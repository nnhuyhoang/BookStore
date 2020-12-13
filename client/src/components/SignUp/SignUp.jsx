import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link, Redirect ,withRouter} from 'react-router-dom';
import './style.css';
import _ from "lodash"
import Logo from '../Logo/Logo';
import * as AuthActions from "./../../actions/auth"
import MobileTypeInput from "../UI/MobileTypeInput/MobileTypeInput"
import SubmitGradientButton from '../UI/SubmitGradientButton/SubmitGradientButton'
import ErrorMessage from "../Error/ErrorMessage"
const SignUp=()=> {

    const [Name,setName]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [RePassword,setRePassword]=useState('')
    const [Error,setError]=useState(true)
    const [Message,setMessage]=useState('')
    let success=false
    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }
    const singupHandler=async (e)=>{
        e.preventDefault();
        if(Name === ''){
            ErrorHandle(true, 'Enter Name');
            return;
        }

        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(Email)){
            ErrorHandle(true, 'Invalid Email Address'); return;
        }

        if(Password === ''){
            ErrorHandle(true, 'Enter Password'); return;
        }
        
        if(RePassword === ''){
            ErrorHandle(true, 'Enter RePassword'); return;
        }
        if(Password !== RePassword){
            ErrorHandle(true, 'Password dosent match');
            return;
        }
        
        
        const ret=await AuthActions.signup({name:Name,password: Password,password2: RePassword,email: Email})
        if(ret.status){
            console.log(ret);
            ErrorHandle(false,ret.message)
            return
        }
        else{
            console.log(ret);
            
            ErrorHandle(true,ret.message)
            return
        }
    }




    console.log("render");
    
    
    return (
        <div className="LoginContainer">
            <div className="WelcomeText">
                <h3>Signup</h3>
            </div>
            <Logo style={{margin: '0 auto'}} />
            <div className="LoginWrapper">
                <form onSubmit={singupHandler} autoComplete="off">

                    <MobileTypeInput 
                        type="text"
                        placeholder="User Name"
                        value={Name}
                        textHandler={e=>setName(e.target.value)}
                        name="userName"
                    />

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
                    <MobileTypeInput 
                        type="password"
                        placeholder="Re-enter Password"
                        value={RePassword}
                        textHandler={e=>setRePassword(e.target.value)}
                        name="repassword"
                    />
                    
                    {!Error?
                    <Redirect to={{
                        pathname: "/message",
                        state: {email:Email}
                    }}/>:
                    <ErrorMessage>
                        {Message}
                    </ErrorMessage>}

                    <SubmitGradientButton 
                        label="Signup"
                        style={{marginTop: '30px'}}
                    />
                </form>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link to="/login">Login</Link>
                <Link to="/forget-password">Forgot Password ?</Link>
            </div>
            
            
        </div>
    )
}

export default SignUp
