import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux"
import { Button, Modal,Header, Form,TextArea,Input,Dropdown} from 'semantic-ui-react'
import * as BookActions from "./../../actions/books"
import _ from "lodash"
import "./style.css"

const formatDate=(dateformatting)=>{
    const date=dateformatting.split("/")
    const month=date[0]
    const day=date[1]
    const year=date[2]
    return month + "-"+day+"-"+year
}
const ModalForm=(props)=>{
    const [Name, setName] = useState("")
    const [Category, setCategory] = useState("")
    const [CategoryList, setCategoryList] = useState(useSelector(state=>state.categories))
    const [Description, setDescription] = useState("")
    const [Price,setPrice]=useState("")
    const [Quantity,setQuantity]=useState("")
    const [Author,setAuthor]=useState("")
    const [Publisher,setPublisher]=useState("")
    const [ReleaseDate, setReleaseDate] = useState("")
    const [Image, setImage] = useState()
    const [Errors,setErrors] =useState([])

    const auth=useSelector(state=>state.auth)
    const categories=useSelector(state=>state.categories)
    const categoryChangeHandle=(event,{value})=>{
        setCategory(value)
    }


    const submitHandle=async ()=>{
        const err=[]
        if(/^\s*$/.test(Name)){
            err.push("Product Name cannot be blank")
        }
        if(!/^\d*\.?\d*$/.test(Price)){
            err.push("Price has only number")
        }
        if(!/^\d*\.?\d*$/.test(Quantity)){
            err.push("Quantity has only number")
        }
        if(_.isEmpty(Category)){
            err.push("Category cannot be blank")
        }
        if(/^\s*$/.test(Description)){
            err.push("Description cannot be blank")
        }
        if(!_.isEmpty(err)){
            setErrors(err)
            return null
        }
        const index=_.findIndex(categories,function(o){return o._id===Category})
        const chosenCategory=categories[index]
        const data={
            name: Name,
            department: chosenCategory.department._id,
            category: chosenCategory._id,
            author: Author,
            publisher:Publisher,
            releaseDate: ReleaseDate,
            description: Description,
            quantity: Quantity,
            price: Price,
        }
        const ret= await BookActions.createBook(data,Image)
        if(ret.status){
            props.handleResult()
        }
        else{
            err.push(ret.message)
            setErrors(err)
        }
        
    }
    

    const setCategories=()=>{
        const categories=CategoryList.map(ele=>{
            return {
                key: ele.name,
                text: ele.name,
                value: ele._id,
            }
        })
        setCategoryList(categories)
    }
    useEffect(() => {
        setCategories()
        return () => {
            console.log("modal form");
            
        }
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Product Name</label>
                    <input placeholder='Book Name' value={Name} onChange={e=>setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <Dropdown placeholder='Category' fluid selection options={CategoryList}  onChange={categoryChangeHandle}/>
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='Author'
                        placeholder="Author's Name"
                        value={Author}
                        onChange={e=>setAuthor(e.target.value)}
                    ></Form.Field>
                    
                    <Form.Field
                        control={Input}
                        label='Publisher'
                        placeholder="Publisher's Name"
                        value={Publisher}
                        onChange={e=>setPublisher(e.target.value)}
                    />
                    
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field 
                        control={Input}
                        label='Release Date'
                        placeholder='yyyy-mm-dd'
                        value={ReleaseDate}
                        onChange={e=>setReleaseDate(e.target.value)}
                    ></Form.Field>
                    <Form.Field
                        control={Input}
                        label='Price'
                        placeholder='Price for each Product'
                        value={Price}
                        onChange={e=>setPrice(e.target.value)}
                    ></Form.Field>
                    
                    <Form.Field
                        control={Input}
                        label='Quantity'
                        placeholder='Quantity'
                        value={Quantity}
                        onChange={e=>setQuantity(e.target.value)}
                    />
                    
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='Descriptions'
                    placeholder='Book Description...'
                    value={Description}
                    onChange={e=>setDescription(e.target.value)}
                />
                <Form.Field>
                    <label>Image</label>
                    <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>
                </Form.Field>
                <p style={{color: !_.isEmpty(Errors)? "red": "green"}}>{!_.isEmpty(Errors)?
                    Errors[0]:null}</p>
                <Button type='submit' onClick={submitHandle}>Submit</Button>
            </Form>
        </div>)
}


export default ModalForm
