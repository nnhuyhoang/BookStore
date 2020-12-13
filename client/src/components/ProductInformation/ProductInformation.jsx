import React,{useState,useEffect} from 'react'
import "./style.css"
import {Header,Item,Button,Form} from 'semantic-ui-react'
import ErrorMessage from "./../Error/ErrorMessage"
const ProductInformation=(props)=>{
    const [IsEdit, setIsEdit] = useState(false)
    const [Book, setBook] = useState({...props.book})
    const [Error,setError]=useState(true)
    const [Message,setMessage]=useState('')
    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }
    return (
        <div className="productContainer">
            <Header>Product Information</Header>
            <div className="RowInfo">
                <div className="blockInfo">
                    <Header className="inforHeader">Image</Header>
                    <Item className="avatarImage">
                        <img alt="" src={Book.image}/>
                    </Item>
                    {/* {IsEditProfile?<input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>:null} */}
                </div>
                {IsEdit?
                <Form className="blockInfo">
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' value={Book.name} onChange={e=>setBook({...Book,name:e.target.value})}/>
                    </Form.Field>
                    
                    <ErrorMessage>
                        {Message}
                    </ErrorMessage>
                </Form>

                :<div className="blockInfo">
                    <div className="inforBound">
                        <Header>Name</Header>
                        <p>{Book.name}</p>
                    </div>
                    <div className="inforBound">
                        <Header>Password</Header>
                        <p>************</p>
                    </div>
                    <div className="inforBound">
                        <Header>Email</Header>
                        <p>{Book.quantity}</p>
                    </div>
                </div>}
            </div>
            {/* {IsEditProfile?<div className="ButtonEdit"><Button onClick={handleSubmitProfile} primary>Finish</Button><Button onClick={()=>setIsEditProfile(false)} secondary>Cancel</Button></div>:<div className="ButtonEdit"><Button onClick={()=>setIsEditProfile(true)} primary>Edit Profile</Button></div>} */}
            
        </div>
    )
}

export default ProductInformation
