import React,{useState,useEffect} from 'react'
import "./style.css"
import {useSelector, useDispatch} from "react-redux"
import _ from "lodash"
import ErrorMessage from "./../Error/ErrorMessage"
import * as AuthActions from "./../../actions/auth"
import * as AddressActions from "./../../actions/address"
import {Header,Item,Button,Form} from 'semantic-ui-react'
const Information=()=>{
    const [Profile, setProfile] = useState({
        name: "",
        password: "",
        email: "",
        avatar: ""
    })
    const [Address, setAddress] = useState({
        mobile: "",
        street: "",
        district: "",
        city: "",
        zipcode: "",
        alternate: ""
    })

    const [IsEditProfile,setIsEditProfile]=useState(false)
    const [IsEditAddress,setIsEditAddress]=useState(false)
    const [NewPassword,setNewPassword]=useState("")
    const [ReNewPassword,setReNewPassword]=useState("")
    const [Error,setError]=useState(true)
    const [Message,setMessage]=useState('')
    const [IsUpdateAddress,setIsUpdateAddress]=useState(false)
    const [Image,setImage]=useState({})
    const auth=useSelector(state=>state.auth)
    const address=useSelector(state=>state.address)
    const dispatchAuth=useDispatch()
    const dispatchAddress=useDispatch()
    const ErrorHandle = (error, message) => {
        setError(error)
        setMessage(message)
    }

    const getData=async ()=>{
        const temp=auth.profile
        temp.password=""
        const add=!_.isEmpty(address)
        setProfile(temp)
        if(add){
            setAddress(address)
        }
        setIsUpdateAddress(add)
    }
    useEffect(() => {
        getData()
        return () => {
            console.log("clean up information");
            
        }
    }, [])

    const handleSubmitProfile=async ()=>{
        console.log("Im here");
        
        if(Profile.name === ''){
            ErrorHandle(true, 'Enter Name');
            return;
        }
        if(Profile.password === ''){
            ErrorHandle(true, 'Enter Old Password'); return;
        }
        if(NewPassword === ''){
            ErrorHandle(true, 'Enter New Password'); return;
        }
        
        if(ReNewPassword === ''){
            ErrorHandle(true, 'Enter RePassword'); return;
        }
        if(NewPassword !== ReNewPassword){
            ErrorHandle(true, 'Password does not match');
            return;
        }
        const data={userId:auth.profile.id,name: Profile.name,password:Profile.password,newpassword:NewPassword}
        const ret=await dispatchAuth(AuthActions.updateProfile(data,Image))
        if(ret.status){
            setIsEditProfile(false)
        }
        else{
            ErrorHandle(true, ret.message);
            return
        }
    }
    const handleSubmitAddress=async ()=>{
        if(Address.mobile === ''){
            ErrorHandle(true, "Enter Mobile Phone"); return;
        }
        if(Address.street === ''){
            ErrorHandle(true, "Enter Address"); return;
        }
        if(Address.district === ''){
            ErrorHandle(true, "Enter District"); return;
        }
        if(Address.city === ''){
            ErrorHandle(true, "Enter City"); return;
        }
        const numberPattern = new RegExp(/^\d+$/);
        if(!numberPattern.test(Address.mobile)){
            ErrorHandle(true, 'Invalid Mobile Phone'); return;
        }
        const data={...Address,userId: auth.profile.id}
        let ret={}
        if(IsUpdateAddress){
            if(!_.isEqual(data,address)){
                ret=await dispatchAddress(AddressActions.updateAddress(data))
            }
            else{
                ret={status: true,data:address}
            }
        }
        else{
            ret=await dispatchAddress(AddressActions.createAddress(data))
        }
        await setIsEditAddress(false)
    }
    return (
        <div className="infoContainer">
            <Header>Profile</Header>
            <div className="RowInfo">
                <div className="blockInfo">
                    <Header className="inforHeader">Avatar</Header>
                    <Item className="avatarImage">
                        <img alt="" src={Profile.avatar}/>
                    </Item>
                    {IsEditProfile?<input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>:null}
                </div>
                {IsEditProfile?
                <Form className="blockInfo">
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' value={Profile.name} onChange={e=>setProfile({...Profile,name:e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Old Password</label>
                        <input type="password" placeholder='Old Password' value={Profile.password} onChange={e=>setProfile({...Profile,password:e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>New Password</label>
                        <input type="password" placeholder='New Password' value={Profile.NewPassword} onChange={e=>setNewPassword(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>re-enter New Password</label>
                        <input type="password" placeholder='re-enter New Password' value={Profile.ReNewPassword} onChange={e=>setReNewPassword(e.target.value)}/>
                    </Form.Field>
                    <ErrorMessage>
                        {Message}
                    </ErrorMessage>
                </Form>

                :<div className="blockInfo">
                    <div className="inforBound">
                        <Header>Name</Header>
                        <p>{Profile.name}</p>
                    </div>
                    <div className="inforBound">
                        <Header>Password</Header>
                        <p>************</p>
                    </div>
                    <div className="inforBound">
                        <Header>Email</Header>
                        <p>{Profile.email}</p>
                    </div>
                </div>}
            </div>
            {IsEditProfile?<div className="ButtonEdit"><Button onClick={handleSubmitProfile} primary>Finish</Button><Button onClick={()=>setIsEditProfile(false)} secondary>Cancel</Button></div>:<div className="ButtonEdit"><Button onClick={()=>setIsEditProfile(true)} primary>Edit Profile</Button></div>}
            <Header>Address</Header>
            {IsEditAddress?
            <div className="RowInfoAddress">
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Street' placeholder='Street' value={Address.street} onChange={e=>setAddress({...Address,street: e.target.value})}/>
                        <Form.Input fluid label='District' placeholder='District' value={Address.district} onChange={e=>setAddress({...Address,district: e.target.value})}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='City' placeholder='City' value={Address.city} onChange={e=>setAddress({...Address,city: e.target.value})}/>
                        <Form.Input fluid label='Zipcode' placeholder='Zipcode' value={Address.zipcode} onChange={e=>setAddress({...Address,zipcode: e.target.value})}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Mobile' placeholder='Mobile' value={Address.mobile} onChange={e=>setAddress({...Address,mobile: e.target.value})}/>
                        <Form.Input fluid label='Alternative Mobile' placeholder='Alternative Mobile' value={Address.alternate} onChange={e=>setAddress({...Address,alternate: e.target.value})}/>
                    </Form.Group>

                </Form>
            </div>
            :<div className="RowInfoAddress">
                <div className="RowAddress">
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>Street</Header>
                            <p>{Address.street}</p>
                        </div>
                    </div>
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>District</Header>
                            <p>{Address.district}</p>
                        </div>
                    </div>
                </div>
                <div className="RowAddress">
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>City</Header>
                            <p>{Address.city}</p>
                        </div>
                    </div>
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>Zipcode</Header>
                            <p>{Address.zipcode}</p>
                        </div>
                    </div>
                </div>
                <div className="RowAddress">
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>Mobile</Header>
                            <p>{Address.mobile}</p>
                        </div>
                    </div>
                    <div className="blockAddress">
                        <div className="inforBound">
                            <Header>Alternative Mobile</Header>
                            <p>{Address.alternate}</p>
                        </div>
                    </div>
                </div>
            </div>}
            {IsEditAddress?<div className="ButtonEdit"><Button onClick={handleSubmitAddress} primary>Finish</Button><Button onClick={()=>setIsEditAddress(false)} secondary>Cancel</Button></div>:<div className="ButtonEdit"><Button onClick={()=>setIsEditAddress(true)} primary>Edit Address</Button></div>}
        </div>
    )
}

export default Information
