import React from 'react'
import { Message,Container } from 'semantic-ui-react'
import { Link, Redirect ,withRouter} from 'react-router-dom';
import * as AuthActions from "./../../actions/auth"
import ConfirmDialog from "./../ConfirmDialog/ConfirmDialog"
import useDialog from "./../ConfirmDialog/useDialog"
import "./style.css"

  
const ConfirmMessage=(props)=>{
    const {isShowing,toggle}=useDialog()
    const handleClick=async (e)=>{
        e.preventDefault();
        const ret=await AuthActions.resendToken(props.location.state.email)
        if(ret.status){
            toggle()
        }
    }
    return (
        <div className="div-message">
                <div className="container-message">
                <Message attached size="big">
                    <Message.Header>Thank you for your Registration</Message.Header>
                    <p>
                    Please check your Email yo verify tour registration
                    </p>
                </Message>
                <Message attached='bottom' warning size="big">
                    If you did not received Verification Email.&nbsp; Click <a href='' onClick={handleClick}><span style={{color: "blue"}}>here</span></a>&nbsp;to resend it.
                </Message>
                <ConfirmDialog 
                    isShowing={isShowing}
                    hide={toggle}
                    email={props.location.state.email}/>
                </div>
        </div>

    )
}

export default ConfirmMessage
