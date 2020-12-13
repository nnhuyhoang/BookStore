import React from 'react'
import jwtDecode from "jwt-decode"
import { connect } from 'react-redux';  
import {withRouter} from "react-router-dom"
import * as  Auth from "./../actions/auth"

export default function(ComposeComponent){

    class Authenticate extends React.Component{
        constructor(props){
            super(props)
            this.state={
                isAuthenticated: false
            }
        }
        
        static getDerivedStateFromProps(props,state){
            if(props.auth.isAuthenticated!==state.isAuthenticated ){
                if(props.auth.profile.token){
                    const token=props.auth.profile.token
                    const decoded=jwtDecode(token)
                    if(decoded.exp<new Date().getTime()/1000){
                        props.Logout()
                        
                        return {isAuthenticated: false}
                    }
                    if(!props.auth.profile.isAdmin){
                        return {isAuthenticated: false}
                    }
                    return {isAuthenticated: true}
                }  
            }
            return {isAuthenticated: state.isAuthenticated}
        }
        render(){

            return(
                <span>
                    {this.state.isAuthenticated?<ComposeComponent {...this.props}/>:null}
                </span>
            )
        }
    }

    const mapStateToProps=(state)=>{
        return {
            auth: state.auth
        }
    }
    const mapDispatchToProps={
        Logout: Auth.logout
    }
    return withRouter(connect(mapStateToProps,mapDispatchToProps)(Authenticate))
}
