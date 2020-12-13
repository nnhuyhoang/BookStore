import React from 'react'
import './style.css';
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import * as AuthActions from "./../../../actions/auth"
import * as AddressActions from "./../../../actions/address"
import * as CartActions from "./../../../actions/cart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TopHeader=()=> {


    const auth=useSelector(state=>state.auth)
    const dispatchAuth=useDispatch()
    const dispatchAddress=useDispatch()
    const dispatchCart=useDispatch()

    const logout=async()=>{
        await dispatchAuth(AuthActions.logout())
        await dispatchCart(CartActions.deleteCart())
        await dispatchAddress(AddressActions.deleteAddress())
    }
    return (
        <div className="TopHeader">
            <div>
                <ul className="TopMenu">
                    <li className="MenuItem">
                        <FontAwesomeIcon icon ="user-circle"/>
                        <Link to="/account">{auth.profile.email}</Link>
                            {!auth.isAuthenticated?
                            <ul className="Dropdown Account">
                                <li><Link to="/signup"><FontAwesomeIcon icon="user"/>&nbsp;&nbsp;<span>Register</span></Link></li>
                                <li><Link to="/login"><FontAwesomeIcon icon="user"/>&nbsp;&nbsp;<span>Login</span></Link></li>
                            </ul>:
                            <ul className="Dropdown Account">
                                {auth.profile.isAdmin?<li><Link to={`/admin/management/${auth.profile.id}`}><FontAwesomeIcon icon="clipboard"/>&nbsp;&nbsp;<span>Management</span></Link></li>:<li><Link to={`/profile/${auth.profile.id}`}><FontAwesomeIcon icon="clipboard"/>&nbsp;&nbsp;<span>Profile</span></Link></li>}
                                <li><Link to="" onClick={logout}><FontAwesomeIcon icon="sign-out-alt"/>&nbsp;&nbsp;<span>Logout</span></Link></li>
                            </ul>}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TopHeader