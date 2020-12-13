import React from 'react'
import "./style.css"
import { Link, withRouter } from 'react-router-dom';
const SearchItem=(props)=>{
    
    return (

            <li className="SearchItemWrapper" onClick={props.click}>
                <div className="ItemImageWrapper">
                    <img src={props.image} alt="" />
                </div>
                <div className="ItemDetailWrapper">
                    <p>{props.name}</p>
                    <p>${props.price}</p>
                </div>
            </li>
    )
}

export default withRouter(SearchItem)
