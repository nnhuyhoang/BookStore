import React,{useState,useEffect} from 'react'
import Information from "./../Information/Information.jsx"
import * as OrderActions from "./../../actions/orders"
import * as HistoryActions from "./../../actions/histories"
import OrderItem from "../OrderItem/OrderItem"
import { withRouter } from 'react-router-dom'
import {useParams} from "react-router"
import {useSelector,useDispatch} from "react-redux"

import "./style.css"
const Profile=(props)=>{
    const [State, setState] = useState(1)
    const [Orders,setOrders]=useState([])
    const [History,setHistory]=useState([])
    const dispatchOrder =useDispatch()
    const dispatchHistory=useDispatch()
    const auth=useSelector(state=>state.auth)
    const {userParam}=useParams()
    const renderOrderItem=()=>{
        return Orders.map((ele,index)=>{
            return <OrderItem key={index} order={ele} />
        })
    }
    const renderHistoryItem=()=>{
        return History.map((ele,index)=>{
            return <OrderItem key={index} order={ele} />
        })
    }

    const handleRender=()=>{
        if(State===1){
            return <div className="ProfileArea">
                <Information/>
            </div>
        }
        else if(State===2){
            return <div className="OrderArea">
                    {renderOrderItem()}
            </div>
        }
        else if(State===3){
            return <div className="OrderArea">
                    {renderHistoryItem()}
            </div>
        }
    }


    const getOrders=async()=>{
        const retOrder=await dispatchOrder(OrderActions.getOrdersByUserId(auth.profile.id))
        const retHistory=await dispatchHistory(HistoryActions.getHistoryOrderByUserId(auth.profile.id))
        if(retOrder.status){
            setOrders(retOrder.data)
        }
        if(retHistory.status){
            setHistory(retHistory.data)
        }


    }

    useEffect(() => {
        getOrders()
        return () => {
            console.log("clean up user Orders");
            
        }
    }, [])


    const handleProfileClick=()=>{
        setState(1)
    }

    const handleOrderClick=()=>{
        setState(2)
    }

    const handleHistoryClick=()=>{
        setState(3)
    }
    
    if(!auth.isAuthenticated || auth.profile.id!==userParam){
        console.log("im in auth check");
        
        props.history.push("/")
        return null
    }
    else{
        return (
            <div className="Content">
                <div className="ContentBody">
                    <div className="SideMenu">
                        <h3 className="SideMenuTitle">Categories</h3>
                        <div className="Filter">
                            <ul>
                                <li className="SiteProfile" onClick={handleProfileClick}  data-id="1">Profile</li>
                                <li className="SiteProfile" onClick={handleOrderClick}>Order</li>
                                <li className="SiteProfile" onClick={handleHistoryClick}>History</li>
                            </ul>
                        </div>
                        
                    </div>
                    
                    <div className="MainContent">
                        {handleRender()}
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Profile)
