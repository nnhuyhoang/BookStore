import React,{useState,useEffect} from 'react'
import {Dropdown,Button,Icon,Form,Header} from "semantic-ui-react"
import * as CategoryActions from "./../../actions/categories"
import * as DepartmentActions from "./../../actions/departments"
import {useSelector,useDispatch} from "react-redux"
import DepartmentUpdateForm from "./../DepartmentUpdateForm/DepartmentUpdateForm"
import DepartmentModal from "./../DepartmentModal/DepartmentModal"
import _ from "lodash"
import "./style.css"


const DepartmentForm=(props)=>{
    const [Department, setDepartment] = useState({})
    const [DepartmentList, setDepartmentList] = useState([])
    const [IsUpdate, setIsUpdate] = useState(false)
    const departments=useSelector(state=>state.departments)
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

    const handleChangeDepartment=(event,{value})=>{
        const index=_.findIndex(departments,function(o){return o._id===value})
        setDepartment(departments[index])
        setIsUpdate(true)
    }

    const setUpdate=()=>{
        setIsUpdate(false)
    }


    useEffect(() => {
        setDepartments()
        return () => {
            console.log("modal form");
            
        }
    }, [])

    console.log(Department);
    
    
    return (
        <div>
            <div className="CategoryFormContainer">
                <div className="selectCategory">
                    <Dropdown
                        placeholder='Select Department'
                        fluid
                        selection
                        options={DepartmentList}
                        onChange={handleChangeDepartment}
                    />
                </div>
                <div className="ButtonCate">
                <DepartmentModal/>
                </div>  
            </div>
            {IsUpdate?<div>
                <div className="inforBound">
                    <Header>Name</Header>
                    <p>{Department.name}</p>
                </div>
                <div className="ButtonAreaInCategory">
                    <DepartmentUpdateForm department={Department} setUpdate={setUpdate}/>
                </div>
            </div>:null}
        </div>
    )
}

export default DepartmentForm
