import React,{useState,useEffect} from 'react'
import { Button, Header, Image, Modal, Form,Icon,Input,Dropdown} from 'semantic-ui-react'
import _ from "lodash"
import * as CategoryActions from "../../actions/categories"
import * as DepartmentActions from "../../actions/departments"
import {useSelector,useDispatch} from "react-redux"


export default function DepartmentModal(props) {
    const [Department, setDepartment] = useState("")
    const [ModalOpen, setModalOpen] = useState(false)
    const [Errors,setErrors] =useState([])
    const dispatchDepartment=useDispatch()


    const submitHandle=async ()=>{
        const err=[]
        if(/^\s*$/.test(Department)){
            err.push("Department name cannot be blank")
        }
        if(!_.isEmpty(err)){
            setErrors(err)
            return null
        }
        const name=Department
        const ret=await dispatchDepartment(DepartmentActions.createDepartment(name))
        if(ret.status){
            await dispatchDepartment(DepartmentActions.getDepartments())
            setModalOpen(false)
        }
        else{
            err.push(ret.message)
            setErrors(err)
        }
    }




    return (
        <Modal trigger={<Button icon labelPosition='left' color='blue' onClick={()=>{
            setModalOpen(true)
        }}><Icon name='plus' />Create New Department</Button>} open={ModalOpen}>
            <Modal.Header>Department Information</Modal.Header>
            <Modal.Content>
            <Form>
                    <Form.Field>
                    <label>Department Name</label>
                    <input placeholder='Department Name'  onChange={(e)=>setDepartment(e.target.value)}/>
                    </Form.Field>
                    <p style={{color: !_.isEmpty(Errors)? "red": "green"}}>{!_.isEmpty(Errors)?
                    Errors[0]:null}</p>
                    <Button type='submit' color="blue" onClick={submitHandle}>Submit</Button>
                    <Button color="red" onClick={()=>setModalOpen(false)}>Cancel</Button>
                </Form>
            </Modal.Content>
        </Modal>
        
    )
}
