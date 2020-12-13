import React,{useState} from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./style.css"

const BottomHeader=()=> {
    return (
        <div className="BottomHeader">
                <ul className="Menu">
                    <li className="MenuItem"><Link to="/"><FontAwesomeIcon icon="home"/></Link></li>
                    <li className="MenuItem">
                        <Link to="/about" className="MenuItemElement">About&nbsp;<i className="fas fa-caret-down"></i></Link>
                    </li>
                    <li className="MenuItem"><Link to="/categories">Contact</Link></li>
                    <li className="MenuItem"><Link to="/map">Map</Link></li>
                    <li className="MenuItem"><Link to="/blog">Blog</Link></li>
                    
                </ul>
            </div>
    )
}

export default BottomHeader