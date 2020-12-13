import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux"
import { Button, Header, Image, Modal, Form,TextArea,Input,Dropdown} from 'semantic-ui-react'
import * as BookActions from "./../../actions/books"
import _ from "lodash"
import "./style.css"


export const UpdateModal=(props)=>{
    const [Name, setName] = useState(props.book.name)
    const [Category, setCategory] = useState(props.book.category._id)
    const [CategoryList, setCategoryList] = useState(useSelector(state=>state.categories))
    const [Description, setDescription] = useState(props.book.description)
    const [Price,setPrice]=useState(props.book.price)
    const [Quantity,setQuantity]=useState(props.book.quantity)
    const [Author,setAuthor]=useState(props.book.author.name)
    const [Publisher,setPublisher]=useState(props.book.publisher.name)
    const [ReleaseDate, setReleaseDate] = useState(props.book.releaseDate.slice(0,10))
    const [Image, setImage] = useState({
        status: false,
        image: {}
    })
    const [Errors,setErrors] =useState([])
    const [ModalOpen, setModalOpen] = useState(false)

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
        await setErrors(err)
        if(!_.isEmpty(err)){
            return null
        }
        const index=_.findIndex(categories,function(o){return o._id===Category})
        const chosenCategory=categories[index]
        const data={
            _id:props.book._id,
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
        const ret=await BookActions.updateBookByBookId(data,Image)
        if(ret.status){
            setModalOpen(false)
        }
        else{
            err.push("Something wrong")
            await setErrors(err)
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
        <Modal trigger={<Button className="ButtonElement" color='blue' onClick={()=>{
            setImage({status: false, image: {}})
            setModalOpen(true)
        }}>UPDATE</Button>} open={ModalOpen}>
            <Modal.Header>Product Information</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Product Name</label>
                        <input placeholder='Book Name' value={Name} onChange={e=>setName(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <Dropdown placeholder='Category' value={Category} fluid selection options={CategoryList}  onChange={categoryChangeHandle}/>
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
                        <input type="file" accept="image/*" onChange={e=>{
                            setImage({
                                status: true,
                                image: e.target.files[0]
                            })
                        }}/>
                    </Form.Field>
                    <p style={{color: !_.isEmpty(Errors)? "red": "green"}}>{!_.isEmpty(Errors)?
                        Errors[0]:null}</p>
                    <div className="ButtonArea">
                        <Button type='submit' onClick={submitHandle} color='blue'>Submit</Button>
                        <Button onClick={()=>setModalOpen(false)} secondary>Cancel</Button>
                    </div>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default UpdateModal
