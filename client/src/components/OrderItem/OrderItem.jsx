import React,{useState} from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Dropdown,Button} from "semantic-ui-react"
import OrderModal from "./../OrderModal/OrderModal"
import {useSelector} from "react-redux"
import "./style.css"
const options=[
    {
        key: 'Checking',
        text: 'Checking',
        value: 'Checking',
      },
      {
        key: 'Delivering',
        text: 'Delivering',
        value: 'Delivering',
      },
      {
        key: 'Delivered',
        text: 'Delivered',
        value: 'Delivered',
      },
]
const OrderItem=(props)=>{
    const [OpenModal, setOpenModal] = useState(false)
    const [Disable, setDisable] = useState(false)
    const [Status, setStatus] = useState(props.order.status)
    const [isProcess, setisProcess] = useState(props.isProcess)
    const auth=useSelector(state=>state.auth)
    const regexStringURL=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '-')
    }
    const renderOrderItems=()=>{
        return props.order.products.map((prod,index)=>{
            return <div className="subOrderRow" key={index}>
                <Link to={{pathname: `/product/${regexStringURL(prod.book.name)}`}}>
                    <span>{prod.book.name} x {prod.quantity}</span>
                </Link>
                <span>${prod.totalPrice}</span>
            </div>

        })
    }

    const statusChangeHandler=(event,{value})=>{
        setStatus(value)
        setOpenModal(true)
    }

    console.log(props.order);
    console.log(Status);
    

    const totalQuantity=props.order.products.reduce((fin,cur)=>fin+cur.quantity,0)
    if(Disable){
        return null
    }
    else{
        return (
            <div className="Order">
                <div className="OrderWrapper">
                    {/* show price */}
                    <div className="CardOrderTitle">
                        <h3 className="inlineTitleOrderitem">Order ID: {props.order._id}</h3>
                        {auth.profile.isAdmin?
                        <div className="inlineTitleOrderitem"><Dropdown
                        placeholder='Change Order Status'
                        fluid
                        selection
                        value={Status}
                        onChange={statusChangeHandler}
                        options={options}
                    /></div>:<h3 className="inlineTitleOrderitem" style={{color: (props.order.status==="Delivering"|| props.order.status==="Delivered")?"green":"orange"}}>{props.order.status}</h3>}
                        
                        
                    </div>
                    <div className="CardOrderBody">
                        <div className="FinalOrderBilling">
                            <div className="OrderRow">
                                <p>Price ({totalQuantity})</p>
                                <p>${props.order.totalPrice}</p>
                            </div>
                            
                            <div className="itemOrderRow">
                                {renderOrderItems()}
                            </div>
                            <hr/>
                            <div className="OrderRow">
                                <p>Delivery</p>
                                <p>$0</p>
                            </div>
                            <hr />
                            <div className="OrderRow">
                                <h4>Total Payable</h4>
                                <h4 className="OrdertotalPay">${props.order.totalPrice}</h4>
                            </div>
                        </div>
                        
                    </div>
                    <div className="CardOrderTitle">
                        <h3>Contact Information</h3>
                    </div>
                    <div className="CardOrderBody">
                        <div className="FinalOrderBilling">
                            <div className="OrderRow">
                                <h4>Receiver: </h4>
                            </div>
                            <div className="itemOrderRow">
                                <div className="subAddressOrderRow">
                                    <span>{props.order.receiver}</span>
                                </div>
                            </div>
                            <div className="OrderRow">
                                <h4>Address: </h4>
                            </div>
                            <div className="itemOrderRow">
                                <div className="subAddressOrderRow">
                                    <span>{props.order.address.street}, District {props.order.address.district}, {props.order.address.city} City</span>
                                </div>
                            </div>
                            <div className="OrderRow">
                                <h4>Zipcode </h4>
                            </div>
                            <div className="itemOrderRow">
                                <div className="subAddressOrderRow">
                                    <span>{props.order.address.zipcode}</span>
                                </div>
                            </div>
                            <div className="OrderRow">
                                <h4>Mobile </h4>
                            </div>
                            <div className="itemOrderRow">
                                <div className="subAddressOrderRow">
                                    <span>{props.order.address.mobile} {props.order.address.alternate?("("+props.order.address.alternate+")"):null}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <OrderModal OpenModal={OpenModal} order={props.order} setOpenModal={value=>setOpenModal(value)} setDisable={value=>setDisable(value)} Status={Status} isProcess={isProcess}/>
            </div>
        )
    }
}

export default OrderItem
