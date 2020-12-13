import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useParams} from "react-router"
import {useSelector,useDispatch} from "react-redux"
import "./style.css"
const Filter=(props)=> {
    const departments=useSelector(state=>state.departments)
    const authors=useSelector(state=>state.authors)
    const regexStringURL=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '_')

    }

    
    console.log("render filter");
    
    const renderFilter=()=>{

        return departments.map((depart,indexD)=>{   
            
            
            return <li key={depart._id}>
                    <Link to={{pathname: `/store/${regexStringURL(depart.name)}`,departmentId: depart._id}}>{depart.name}</Link>
                    {depart.categories.map((cate,index)=>{
                        return <ul key={cate._id}>
                            <li className="SiteCategory" key={index}>
                                <Link to={{
                                    pathname:`/store/${regexStringURL(depart.name)}/${regexStringURL(cate.name)}`,
                                    departmentId: depart._id,categoryId: cate._id}}>{cate.name}</Link>
                            </li>
                        </ul>
                    })}

            </li>
            
        })
    }

    const renderAuthor=()=>{
        return authors.map((author,index)=>{
            return <li className="SiteAuthor" key={index}>
                <Link to={{
                    pathname:`/store/author/${regexStringURL(author.name)}`,
                }}>{author.name}</Link>
            </li>
        })
    }


        return (
            <div className="SideMenu">
                <h3 className="SideMenuTitle">Categories</h3>
                <div className="Filter">
                    <ul>
                        { renderFilter()}
                    </ul>
                </div>
                <h3 className="SideMenuTitle">Price</h3>
                <div className="Filter">
                    <div>
                        <button className="FilterButton" onClick={props.handleLowHigh}>Low to High</button>
                    </div>
                    <div>
                        <button className="FilterButton" onClick={props.handleHighLow}>High to Low</button>
                    </div>
                    
                </div>
                <h3 className="SideMenuTitle">Author</h3>
                <div className="Filter">
                    <ul>
                        {renderAuthor()}
                    </ul>
                    
                </div>
                
            </div>
        )
}

export default Filter
