import React,{useState,useEffect} from 'react'
import { Button, Header, Image, Modal, Form,TextArea,Input,Dropdown} from 'semantic-ui-react'
import _ from "lodash"
import * as CategoryActions from "./../../actions/categories"
import * as DepartmentActions from "./../../actions/departments"
import {useSelector,useDispatch} from "react-redux"


export default function DepartmentUpdateForm(props) {
    const [Department, setDepartment] = useState(props.department)
    const [ModalOpen, setModalOpen] = useState(false)
    const [Errors,setErrors] =useState([])
    const departments=useSelector(state=>state.departments)
    const dispatchDepartment=useDispatch()

    const handleChangeDepartName=(e)=>{
        setDepartment({...Department,name:e.target.value})
    }


    const submitHandle=async ()=>{
        const err=[]
        if(/^\s*$/.test(Department.name)){
            err.push("Category Name cannot be blank")
        }
        const name=Department.name
        const departId=Department._id
        const ret=await dispatchDepartment(DepartmentActions.updateDepartment(name,departId))
        if(ret.status){
            await dispatchDepartment(DepartmentActions.getDepartments())
            await props.setUpdate()
            setModalOpen(false)
        }
        else{
            err.push(ret.message)
            setErrors(err)
        }
    }

    console.log(Department);
    
    



    return (
        <Modal trigger={<Button  color='blue' onClick={()=>{
            setModalOpen(true)
        }}>UPDATE</Button>} open={ModalOpen}>
            <Modal.Header>Department Information</Modal.Header>
            <Modal.Content>
            <Form>
                    <Form.Field>
                    <label>Department Name</label>
                    <input placeholder='Department Name' value={Department.name} onChange={handleChangeDepartName}/>
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
