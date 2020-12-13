import React, { useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import jwtDecode from "jwt-decode"
import Home from "./components/Home/Home"
import ProductDetail from "./components/ProductDetail/ProductDetail"
import NotAvailable from "./components/Error/NotAvailable"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import Header from "./components/Header/Header"
import ConfirmMessage from "./components/Message/ConfirmMessage"
import Cart from "./components/Cart/Cart"
import ResultConfirmMessage from "./components/Message/ResultConfirmMessage"
import * as AuthActions from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"
import Profile from "./components/Profile/Profile"
import Management from "./components/Management/Management"
import MapPage from "./components/Map/Map"
import Footer from "./components/Footer/Footer"
import About from "./components/About/About"
import Test from "./components/Test/Test"
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart , faSearch,faHome,faUserCircle,faSignOutAlt,faClipboard,faUser} from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart,faSearch,faHome,faUserCircle,faSignOutAlt,faClipboard,faUser)

function App() {
  const dispatchAuth=useDispatch()
  const checkValidToken=async()=>{
    const token =localStorage.getItem("token")
    if(token){
      const decoded=jwtDecode(token)
      const isAdmin=decoded.isAdmin
      const avatar=decoded.avatar
      const email=decoded.email
      const isVerified=decoded.isVerified
      const name=decoded.name
      const id=decoded.id
      const transData={email,id,token,avatar,isAdmin,isVerified,name}
      if(decoded.exp>new Date().getTime()/1000){
        await dispatchAuth(AuthActions.setCurrentUser(transData))
        setAuthToken(token)
      }
    
    }
  }
  useEffect(() => {
    checkValidToken()
    return () => {
      console.log("clean up App");
      
    }
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/test" exact component={Test}/>
            <Route path="/store" exact  component={Home}/>
            <Route path="/about" exact  component={About}/>
            <Route path="/map" exact  component={MapPage}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/message" exact component={ConfirmMessage}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/store/search/:nameParam" render={(props)=><Home key={props.match.params.nameParam}/>}/>
            <Route path="/verify/:email/:token" render={(props)=><ResultConfirmMessage key={props.match.params.token}/>}/>
            <Route path="/product/:productParam" render={(props)=><ProductDetail key={props.match.params.productParam}/>}/>
            <Route path="/store/author/:authorParam" render={(props)=><Home key={props.match.params.authorParam}/>}/>
            <Route path="/store/:departParam/:cateParam" render={(props)=> <Home  key={props.match.params.cateParam}/>} /* component={Home} *//>
            <Route path="/store/:departParam"render={(props)=> <Home key={props.match.params.departParam}/>}  /* component={Home} */></Route>
            <Route path="/profile/:userParam" render={(props)=><Profile key={props.match.params.userParam}/>}/>
            <Route path="/admin/management/:userParam" render={(props)=><Management key={props.match.params.userParam}/>}/>
            <Route path="/notavailable/" component={NotAvailable}/>
            {/* <Route key="subhome" path="/products/" component={ProductList}/> */}
          </Switch>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
