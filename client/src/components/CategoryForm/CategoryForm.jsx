import React,{useState,useEffect} from 'react'
import {Dropdown,Button,Icon,Form,Header} from "semantic-ui-react"
import * as CategoryActions from "./../../actions/categories"
import * as DepartmentActions from "./../../actions/departments"
import {useSelector,useDispatch} from "react-redux"
import CategoryUpdateForm from "./../CategoryUpdateForm/CategoryUpdateForm"
import CategoryModal from "./../CategoryModal/CategoryModal"
import _ from "lodash"
import "./style.css"


const CategoryForm=(props)=>{
    const [Category, setCategory] = useState({})
    const [CategoryList, setCategoryList] = useState([])
    const [IsUpdate, setIsUpdate] = useState(false)
    const categories=useSelector(state=>state.categories)
    const setCategories=()=>{
        const categoriesList=categories.map(ele=>{
            return {
                key: ele.name,
                text: ele.name,
                value: ele._id,
            }
        })
        setCategoryList(categoriesList)
    }

    const handleChangeCategory=(event,{value})=>{
        const index=_.findIndex(categories,function(o){return o._id===value})
        setCategory(categories[index])
        setIsUpdate(true)
    }

    const setUpdate=()=>{
        setIsUpdate(false)
    }

    const handleDeleteCategory=()=>{

    }

    useEffect(() => {
        setCategories()
        return () => {
            console.log("modal form");
            
        }
    }, [])

    console.log(Category);
    
    
    return (
        <div>
            <div className="CategoryFormContainer">
                <div className="selectCategory">
                    <Dropdown
                        placeholder='Select Category'
                        fluid
                        selection
                        options={CategoryList}
                        onChange={handleChangeCategory}
                    />
                </div>
                <div className="ButtonCate">
                <CategoryModal/>
                </div>  
            </div>
            {IsUpdate?<div>
                <div className="inforBound">
                    <Header>Name</Header>
                    <p>{Category.name}</p>
                </div>
                <div className="inforBound">
                    <Header>Belong to Department</Header>
                    <p>{Category.department.name}</p>
                </div>
                <div className="ButtonAreaInCategory">
                    <CategoryUpdateForm category={Category} department={Category.department} setUpdate={setUpdate}/>
                </div>
            </div>:null}
        </div>
    )
}

export default CategoryForm
