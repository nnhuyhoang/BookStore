
import api from "./../api/index"
import jwtDecode from "jwt-decode"
import setAuthToken from "./../utils/setAuthToken"
import axios from "axios"
import _ from "lodash"
export const login=(credentials)=>(dispatch)=>{
    console.log("im in login");
    
    return api.post("/api/users/login",credentials)
        .then(user=>{
            const {token}=user.data
            localStorage.setItem("token",user.data.token)

            const decoded=jwtDecode(token)
            const isAdmin=decoded.isAdmin
            const avatar=decoded.avatar
            const email=decoded.email
            const isVerified=decoded.isVerified
            const name=decoded.name
            const id=decoded.id
            
            const transData={email,id,token,avatar,isAdmin,isVerified,name}
            dispatch(setCurrentUser(transData))

            setAuthToken(token)
            return Promise.resolve({status: true,data:transData,message: "Dang nhap thanh cong"})
        })
        .catch((err)=>{return {status: false,message: "You have entered wrong Email or Password"}})
}

export const signup=(data)=>{
    console.log(data);
    
    return api.post("/api/users/",data)
        .then(user=>{
            return Promise.resolve({status: true,message: "Register Sucessfully"})
        })
        .catch(err=>{
            
            return {status: false,message:err.response.data.message}
        })
}

export const logout=()=>(dispatch)=>{
    console.log("Im in logout");
    
    localStorage.removeItem("token");
    dispatch(setCurrentUser({}))
    setAuthToken()
}

export const confirmSignup=(token)=>{
    return api.get(`/api/tokens/verify/${token}`)
        .then(user=>{ 
            return Promise.resolve({status: true,data:user.data,message: "Verify Sucessfully"})
        })
        .catch(err=>{
            console.log(err);
            
            return {status: false,message:err.response.data.message}
        })
}

export const resendToken=(email)=>{
    console.log(email);
    
    return api.post("/api/tokens/resend",{email})
        .then(ret=>{
            return Promise.resolve({status: true,data:ret.data})
            
        })
        .catch(err=>{
            console.log(err);
            
            return {status: false,message:err.response.data.message}
        })
}


export const updateProfile=(data,Image)=>async (dispatch)=>{
    try {
        console.log(Image.type);
        
        if(Image){
            const identity={userId: data.userId,type:Image.type}
            const uploadConfig= await api.post(`api/images/upload/`,identity)
            await axios.put(uploadConfig.data.url,Image,{
                headers:{
                    'Content-Type': Image.type
                }
            })
            data.avatar=uploadConfig.data.key
        }
        const user=await api.put("/api/users",data)
    
        const {token}=user.data
        localStorage.setItem("token",user.data.token)
    
        const decoded=jwtDecode(token)
        const isAdmin=decoded.isAdmin
        const avatar=decoded.avatar
        const email=decoded.email
        const isVerified=decoded.isVerified
        const name=decoded.name
        const id=decoded.id
        
        const transData={email,id,token,avatar,isAdmin,isVerified,name}
        dispatch(setCurrentUser(transData))
    
        setAuthToken(token)
        return Promise.resolve({status: true,data:transData,message: "Dang nhap thanh cong"})
    } catch (err) {
        return {status: false,message:err}
    }
}

export const setCurrentUser=(data)=>{
    return{
      type: "SET_CURRENT_USER",
      payload: data
    }
  }