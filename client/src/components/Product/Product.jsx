import React from 'react';
import "./style.css"
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import UpdateModal from "./../UpdateModal/UpdateModal"
import DeleteModal from "./../DeleteModal/DeleteModal"
const Product = props => {


    return (
            <div className="Product">
                <div className="ProductImage">
                    <img alt="" src={props.book.image} />
                </div>
                <div className="ProductDetailsDescription">
                    <div className="ProductNameLabel"><p>{props.book.name}</p></div>
                    <div><p>${props.book.price}</p></div>
                </div>
                {props.isEdit?<div className="ButtonEditAdmin">
                    <UpdateModal book={props.book}/>
                    <DeleteModal handleDelete={()=>props.handleDelete()} book={props.book}/></div>:null}
            </div>
    );
}

export default withRouter(Product);