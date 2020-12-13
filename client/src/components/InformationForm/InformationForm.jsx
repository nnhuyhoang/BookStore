import React, { useState,useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { Link, Redirect ,withRouter} from 'react-router-dom';
import NormalInput from "../UI/NormalInput/NormalInput";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ErrorMessage from "../Error/ErrorMessage"
import OrderDialog from "../OrderDialog/OrderDialog"
import * as AddressActions from "./../../actions/address"
import * as OrderActions from "./../../actions/orders"
import * as CartActions from "./../../actions/cart"
import _ from "lodash"
import "./style.css"
import useOrderDialog from '../OrderDialog/useOrderDialog';
const InformationForm = (props) =>  {
    const [isUpdate,setIsUpdate]=useState(false)
    const [Payment, setPayment] = useState('Cash');
    const [Receiver,setReceiver]=useState("")
    const [state,setState]=useState({
        mobile: "",
        street: "",
        district: "",
        city: "",
        zipcode: 0,
        alternate: ""
    })
    const [Error,setError]=useState(false)
    const [Message,setMessage]=useState('')
    const {isShowing,toggle}=useOrderDialog()
    const auth=useSelector(state=>state.auth)
    const cart=useSelector(state=>state.cart)
    const address=useSelector(state=>state.address)
    const dispatchAddress=useDispatch()
    const dispatchCart=useDispatch()
    const getAddress=()=>{
        if(_.isEmpty(address)) return
        const add={...address}
        setIsUpdate(true)
        setState(add)
    }
    const inputHandler=(e)=>{
        const value=e.target.value
        setState({
            ...state,
            [e.target.name]:value
        })
    }
    const receiverHandle=(e)=>{
        setReceiver(e.target.value)
    }
    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }
    const submitHandle=async()=>{
        if(Receiver === ''){
            ErrorHandle(true, "Enter Receiver' Name"); return;
        }
        if(state.mobile === ''){
            ErrorHandle(true, "Enter Mobile Phone"); return;
        }
        if(state.street === ''){
            ErrorHandle(true, "Enter Address"); return;
        }
        if(state.district === ''){
            ErrorHandle(true, "Enter District"); return;
        }
        if(state.city === ''){
            ErrorHandle(true, "Enter City"); return;
        }
        const numberPattern = new RegExp(/^\d+$/);
        if(!numberPattern.test(state.mobile)){
            ErrorHandle(true, 'Invalid Mobile Phone'); return;
        }
        let ret={}
        if(isUpdate){
            if(!_.isEqual(state,address)){
                ret=await dispatchAddress(AddressActions.updateAddress({...state,userId: auth.profile.id}))
            }
            else{
                ret={status: true,data:address}
            }
        }
        else{
            ret=await dispatchAddress(AddressActions.createAddress({...state,userId: auth.profile.id}))
            
        };
        if(ret.status){
            const prods=cart.productList.map(items=>items._id)
            const data={
                receiver: Receiver,
                addressId: ret.data._id,
                userId: auth.profile.id,
                payment:Payment,
                products: prods
            }
            const result=await OrderActions.createOrder(data)
            console.log(result);
            
            if(result.status){
                await dispatchCart(CartActions.deleteCart())
                /* toggle() */

            }           
        }
    }

    useEffect(() => {
        getAddress()
        return () => {
            console.log("clean up information form");
            
        }
    }, [])
    const handleChange = event => {
        setPayment(event.target.value);
      };

    
        return (
                 <React.Fragment>
                     <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="receiver"
                                value={Receiver}
                                placeholder={`Receiver's Name`}
                                inputHandler={receiverHandle}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="mobile"
                                value={state.mobile}
                                placeholder={'Mobile Number'}
                                inputHandler={inputHandler}
                                type="text"
                            />
                        </div>
                    </div>
    
                    <div className="Row">
                        <NormalInput 
                                name="street"
                                value={state.street}
                                placeholder={'Address (Area and Street)'}
                                inputHandler={inputHandler}
                                type="textarea"
                                style={{height: '60px'}}
                        />
                    </div>
    
                    <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="district"
                                value={state.district}
                                placeholder={'District'}
                                inputHandler={inputHandler}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="city"
                                value={state.city}
                                placeholder={'City/Province'}
                                inputHandler={inputHandler}
                                type="text"
                            />
                        </div>
                    </div>
    
                    <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="zipcode"
                                value={state.zipcode}
                                placeholder={'Zipcode'}
                                inputHandler={inputHandler}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="alternate"
                                value={state.alternate}
                                placeholder={'Alternate Phone (Optional)'}
                                inputHandler={inputHandler}
                                type="text"

                            />
                        </div>
                    </div>
                    <div className="Row">
                        <div style={{width: '49%'}}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend" className="CardtText">Payment Method</FormLabel>
                            <RadioGroup aria-label="payment" name="payment1" value={Payment} onChange={handleChange}>
                                <div style={{display: "flex", justifyContent: "flex-start"}}>
                                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                                <FormControlLabel value="VISA" control={<Radio />} label="VISA" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        </div>
                    </div>
                    {Payment==="VISA"?
                    <div>
                        <div className="Row">
                            <div style={{width: '75%'}}>
                                <NormalInput 
                                    name="Owner"
                        /*            value={address.landmark} */
                                    placeholder={"Owner's Name"}
                            /*        inputHandler={props.inputHandler} */
                                    type="text"
                                />
                            </div>
                            <div style={{width: '23%'}}>
                                <NormalInput 
                                    name="CVV"
                /*                  value={address.alternateNumber} */
                                    placeholder={'CVV'}
                        /*             inputHandler={props.inputHandler} */
                                    type="text"

                                />
                            </div>
                        </div>
                        <div className="Row">
                            <div style={{width: '75%'}}>
                                <NormalInput 
                                    name="cardNumber"
                        /*            value={address.landmark} */
                                    placeholder={"Card Number"}
                            /*        inputHandler={props.inputHandler} */
                                    type="text"
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between" ,width: '23%'}}>
                                <input style={{width: "45%"}} type = "number" placeholder = "MM" id = "month" maxlength = {2} />
                                <input style={{width: "45%"}} type = "number" placeholder = "YY" id = "year" maxlength = {2} />
                            </div>
                        </div>
                    </div>:null}
                    <ErrorMessage>
                        {Message}
                    </ErrorMessage>
                    <div className="Row" style={{display: "flex", justifyContent:"flex-end"}}>
                        <button className="DeliveryAddressButton" onClick={submitHandle}>Checkout</button>
                    </div>
                    {/* <OrderDialog
                        isShowing={isShowing}
                        hide={toggle}/> */}
                 </React.Fragment>
        );
    
    
}

export default withRouter(InformationForm);