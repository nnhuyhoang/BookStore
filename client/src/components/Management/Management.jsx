import React,{useState,useEffect} from 'react'
import ModalForm from "./../ModalForm/ModalForm"
import ModifiedProduct from "./../ModifiedProduct/ModifiedProduct"
import ManageDepartCate from "./../ManageDepartCate/ManageDepartCate"
import OrderManage from "./../OrderManage/OrderManage"
import HistoryManage from "./../HistoryManage/HistoryManage"
import {useSelector} from "react-redux"
import "./style.css"
import { withRouter } from 'react-router-dom'
const Management=(props)=>{
    const [State, setState] = useState(0)
    const auth=useSelector(state=>state.auth)

    const handleResult=()=>{
        setState(0)
    }

    const handleRender=()=>{
        if(State===1){
            return <ModalForm handleResult={handleResult}/>
        }
        else if(State===2){
            return <ModifiedProduct/>
        }
        else if(State===3){
            return <ManageDepartCate/>
        }
        else if(State===4){
            return <OrderManage/>
        }
        else if(State===5){
            return <HistoryManage/>
        }
        else{
            return null
        }
    }



    if(!auth.isAuthenticated || !auth.profile.isAdmin){
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
                                <li className="SiteProfile" onClick={()=>setState(1)}>Create Product</li>
                                <li className="SiteProfile" onClick={()=>setState(2)}>Update/Delete Product</li>
                                <li className="SiteProfile" onClick={()=>setState(3)}>Create Department/Category</li>
                                <li className="SiteProfile" onClick={()=>setState(4)}>Manage Orders</li>
                                <li className="SiteProfile" onClick={()=>setState(5)}>Orders History</li>
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


export default withRouter(Management)