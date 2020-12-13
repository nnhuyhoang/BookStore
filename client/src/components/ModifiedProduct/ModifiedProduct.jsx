import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Product from "./../Product/Product"
import NotAvailable from "./../Error/NotAvailable"
import * as BookActions from "./../../actions/books"
import "./style.css"
import {useSelector,useDispatch} from "react-redux"
import _ from "lodash"
import { Button } from 'semantic-ui-react'
const ModifiedProduct=()=>{
    const [Search, setSearch] = useState("")
    const [Products,setProducts]=useState([])
    const [State, setState] = useState(0)
    const dispatchBook=useDispatch()
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const onKeyDownHandler=async (e)=>{
        if(e.keyCode===13){
            const ret=await BookActions.adminSearchBooks(Search)
            if(ret.status){
                setProducts(ret.data)
                setState(1)
            }
            else{
                setState(2)
            }
        }
    }
    const handleClick=async()=>{
        const ret=await BookActions.adminSearchBooks(Search)
        if(ret.status){
            setProducts(ret.data)
            setState(1)
        }
        else{
            setState(2)
        }
    }
    
    const handleDelete=(book)=>{
        const index=_.findIndex(Products,function(o){return o._id===book._id})
        let newProducts=[...Products]
        newProducts.splice(index,1)
        
        setProducts(newProducts)
    }


    const renderProduct=()=>{
        return Products.map((ele,index)=>{
            return <Product
                key={index}
                book={ele}
                isEdit={true}
                handleDelete={()=>handleDelete(ele)}
            />
        })
    }

    const handleRender=()=>{
        if(State===1){
            return renderProduct()
        }
        else if(State===2){
            return <NotAvailable/>
        }
        else{
            return null
        }
    }
    console.log(Products);
    
    
    return (
        <div className="modifiedContainer">
            <div className="modifiedSearchOption">
                <input 
                    className="inputText" 
                    value={Search}  
                    type="text" 
                    placeholder="Search Book" 
                    onChange={handleSearch}
                    onKeyDown={onKeyDownHandler}/>
                <button>
                    <FontAwesomeIcon  icon="search" onClick={handleClick}/>
                </button>
            </div>
            <div className="modifiedProductArea">
                {handleRender()}
            </div>
        </div>
    )
}


export default ModifiedProduct
