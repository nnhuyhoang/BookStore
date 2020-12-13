import React,{useState,useEffect} from 'react'
import * as OrderActions from "./../../actions/orders"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotAvailable from "./../Error/NotAvailable"
import OrderItem from "./../OrderItem/OrderItem"
const OrderManage=()=>{
    const [Search, setSearch] = useState("")
    const [OrderList, setOrderList] = useState([])

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const handleOrderRender=()=>{
        return OrderList.map((ele,index)=>{
            return <OrderItem key={index} order={ele} isProcess={true}/>
        })
    }

    const onKeyDownHandler=async (e)=>{
        if(e.keyCode===13){
            const ret=await OrderActions.searchOrder(Search)
            if(ret.status){
                setOrderList(ret.data)
            }
        }
    }
    const handleClick=async()=>{
        const ret=await OrderActions.searchOrder(Search)
        if(ret.status){
            setOrderList(ret.data)
        }
    }

    const getOrders=async ()=>{
        const ret=await OrderActions.getOrdersProcessing()
        if(ret.status){
            setOrderList(ret.data)
        }
    }

    useEffect(() => {
        getOrders()
        return () => {
            console.log("clean up order management");
            
        }
    }, [])

    return (
        <div>
            <div className="modifiedContainer">
                <div className="modifiedSearchOption">
                    <input 
                        className="inputText" 
                        value={Search}  
                        type="text" 
                        placeholder="User Order" 
                        onChange={handleSearch}
                        onKeyDown={onKeyDownHandler}/>
                    <button>
                        <FontAwesomeIcon  icon="search" onClick={handleClick}/>
                    </button>
                </div>
            
            </div>
            <div className="OrderArea">
                {OrderList.length>0?handleOrderRender(): <NotAvailable/>}
            </div>
        </div>
    )
}


export default OrderManage
