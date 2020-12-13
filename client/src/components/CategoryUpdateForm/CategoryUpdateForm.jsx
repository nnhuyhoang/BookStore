import React,{useState,useEffect} from 'react'
import { Button, Header, Image, Modal, Form,TextArea,Input,Dropdown} from 'semantic-ui-react'
import _ from "lodash"
import * as CategoryActions from "./../../actions/categories"
import * as DepartmentActions from "./../../actions/departments"
import {useSelector,useDispatch} from "react-redux"


export default function CategoryUpdateForm(props) {
    const [Category, setCategory] = useState(props.category)
    const [Department, setDepartment] = useState(props.department)
    const [DepartmentList, setDepartmentList] = useState([])
    const [ModalOpen, setModalOpen] = useState(false)
    const [Errors,setErrors] =useState([])
    const departments=useSelector(state=>state.departments)
    const dispatchCategory=useDispatch()
    const dispatchDepartment=useDispatch()
    const setDepartments=()=>{
        const departmentList=departments.map(ele=>{
            return {
                key: ele.name,
                text: ele.name,
                value: ele._id,
            }
        })
        setDepartmentList(departmentList)
    }

    const handleChangeCateName=(e)=>{
        setCategory({...Category,name:e.target.value})
    }

    const handleChangeDepartment=(event,{value})=>{
        const index=_.findIndex(departments,function(o){return o._id===value})
        setDepartment(departments[index])
    }

    const submitHandle=async ()=>{
        const err=[]
        if(/^\s*$/.test(Category.name)){
            err.push("Category Name cannot be blank")
        }
        if(!_.isEmpty(err)){
            setErrors(err)
            return null
        }
        const name=Category.name
        const cateId=Category._id
        const departId=Department._id
        const ret=await dispatchCategory(CategoryActions.updateCategory(name,cateId,departId))
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
    useEffect(() => {
        setDepartments()
        return () => {
            console.log("clean up update cateogy form");
            
        }
    }, [])

    console.log(Category);
    console.log(Department);
    
    



    return (
        <Modal trigger={<Button  color='blue' onClick={()=>{
            setModalOpen(true)
        }}>UPDATE</Button>} open={ModalOpen}>
            <Modal.Header>Category Information</Modal.Header>
            <Modal.Content>
            <Form>
                    <Form.Field>
                    <label>Category Name</label>
                    <input placeholder='Category Name' value={Category.name} onChange={handleChangeCateName}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Belong to Department</label>
                        <Dropdown
                            placeholder='Select Department'
                            fluid
                            selection
                            value={Department._id}
                            options={DepartmentList}
                            onChange={(handleChangeDepartment)}
                        />
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
