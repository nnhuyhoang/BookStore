import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useParams} from "react-router"
import { Message,Container } from 'semantic-ui-react'
import { Link, Redirect ,withRouter} from 'react-router-dom';
import * as AuthActions from "./../../actions/auth"
import Logo from '../Logo/Logo';
import MobileTypeInput from "../UI/MobileTypeInput/MobileTypeInput"
import SubmitGradientButton from '../UI/SubmitGradientButton/SubmitGradientButton'
import ErrorMessage from "../Error/ErrorMessage"
import ConfirmDialog from "./../ConfirmDialog/ConfirmDialog"
import useDialog from "./../ConfirmDialog/useDialog"
import "./style.css"

  
const ResultConfirmMessage=(props)=>{
    const {isShowing,toggle}=useDialog()
    const [IsVerified,setIsVerified]=useState(false)
    const [Refer,setRefer]=useState(false)
    const [Password,setPassword]=useState("")
    const [Error,setError]=useState(false)
    const [message,setMessage]=useState('')
    const {email,token}=useParams()
    const auth=useSelector(state=>state.auth)
    const dispatchAuth=useDispatch()

    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }

    const checkVerified=async(token)=>{
        const ret=await AuthActions.confirmSignup(token)
        if(ret.status){
            setIsVerified(true)
        }
    }

    const loginHandler=async(e)=>{
        e.preventDefault();
        if(Password === ''){
            ErrorHandle(true, 'Enter Password'); return;
        }
        const credentials={email: email,password:Password}
        console.log(credentials);
        
        const retLogin=await dispatchAuth(AuthActions.login(credentials))
        if(retLogin.status){
            console.log(retLogin);
            
            setRefer(true)
            return
        }
        else{
            ErrorHandle(true,retLogin.message); return;
        }
    }

    const handleClick=async(e)=>{
        e.preventDefault()
        const ret=await AuthActions.resendToken(email)
        if(ret.status){
            toggle()
        }
        
    }

    useEffect(() => {
        console.log(IsVerified);
        
        if(!IsVerified){
            checkVerified(token)
        }
        return () => {
            console.log("clean up verify");
            
        }
    }, [])

    console.log("render Verify");
    if( auth.profile.isVerified || Refer){
        console.log("Im here");
        
        return (<Redirect to="/store" />)
    }
    if(!IsVerified){
        return(
            <div className="div-message">
                <div className="container-message">
                <Message attached size="big">
                    <Message.Header>Something wrong!!!</Message.Header>
                    <p>
                        We cannot verify your Account. Please&nbsp; Click <a href='' onClick={handleClick}><span style={{color: "blue"}}>here</span></a>&nbsp;to resend verify Email.
                    </p>
                </Message>

                </div>
                <ConfirmDialog 
                    isShowing={isShowing}
                    hide={toggle}
                    email={email}/>
            </div>
        )
    }
    return (
        <div className="LoginContainer">
            <div className="WelcomeText">
                <h3>Verification Successfully</h3>
                <h3>Please Re-enter your password to Login</h3>
            </div>
            <div className="LoginWrapper">
                <p></p>
                <form onSubmit={loginHandler} autoComplete="off">
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
            
            
        </div>
    )
}

export default withRouter(ResultConfirmMessage)
