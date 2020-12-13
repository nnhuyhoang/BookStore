import React,{useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import * as BookActions from "./../../actions/books"
import _ from "lodash"
import "./style.css"
const DeleteModal=(props)=>{

    const [OpenModal, setOpenModal] = useState(false)
    const [Errors,setErrors] =useState("")
    const handleCancel=()=>{
        setOpenModal(false)
    }
    const handleDelete=async()=>{
        const ret =await BookActions.deleteBookByBookId(props.book._id)
        if(ret.status){
            setOpenModal(false)
            props.handleDelete()
        }
        else{
            setErrors(ret.message)
        }
    }
    return (
        <Modal trigger={<Button className="ButtonElement"  color='red'  onClick={()=>setOpenModal(true)}>Delete</Button>} closeIcon onClose={handleCancel} open={OpenModal}>
            <Header icon='archive' content='Delete Confirmation' />
            <Modal.Content>
                <p>
                    Are you sure to delete this Book : {props.book.name}
                </p>
                <p style={{color: !_.isEmpty(Errors)? "red": "green"}}>{!_.isEmpty(Errors)?
                        Errors[0]:null}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={handleCancel}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={handleDelete}>
                    <Icon name='checkmark'  /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteModal
