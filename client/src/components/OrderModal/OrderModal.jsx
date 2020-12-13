import React,{useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import * as OrderActions from "./../../actions/orders"
import _ from "lodash"
const OrderModal=(props)=>{
    const [Errors,setErrors] =useState("")
    const handleCancel=()=>{
        props.setOpenModal(false)
    }

    const handleSubmit=async ()=>{
        const err=[]
        const ret=await OrderActions.changeOrderStatus(props.order._id,props.Status)
        if(ret.status){
            props.setOpenModal(false)
            if(props.isProcess && ret.data.status==="Delivered"){
                props.setDisable(true)
            }
            else if(!props.isProcess && ret.data.status!=="Delivered"){
                props.setDisable(true)
            }
        }
        else{
            err.push(ret.message)
            setErrors(err)
        }
    }
    return (
        <Modal closeIcon onClose={handleCancel} open={props.OpenModal}>
            <Header icon='archive' content='Delete Confirmation' />
            <Modal.Content>
                <p>
                    Are you sure to change status of this order : {props.order._id}
                </p>
                <p style={{color: !_.isEmpty(Errors)? "red": "green"}}>{!_.isEmpty(Errors)?
                        Errors[0]:null}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={handleCancel}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={handleSubmit}>
                    <Icon name='checkmark'  /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default OrderModal
