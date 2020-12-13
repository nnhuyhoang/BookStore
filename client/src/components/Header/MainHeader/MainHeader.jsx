import React,{useState,useEffect} from 'react'
import {Link,withRouter} from "react-router-dom"
import Logo from './../../Logo/Logo'
import {useSelector,useDispatch} from "react-redux"
import * as BookActions from "./../../../actions/books"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from "lodash"
import SearchItem from "./../../SearchItem/SearchItem"
import "./style.css"
const MainHeader=(props)=> {
    const [Search,setSearch]=useState("")
    const [SearchList,setSearchList]=useState([])
    const cart=useSelector(state=>state.cart)
    const dispatchBook=useDispatch()
    const handleSearch=async (e)=>{
        setSearch(e.target.value)
        const ret=await dispatchBook(BookActions.searchBooks(e.target.value,10))
        if(ret.status){
            setSearchList(ret.data)
        }
        
    }
    const regexStringURL=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '-')

    }

    const handleLink=(name)=>{
        setSearch("")
        setSearchList([])
        props.history.push(`/product/${regexStringURL(name)}`)
    }
    const renderSearchItem=()=>{
        return SearchList.map((item,index)=>{
            return <SearchItem
                key={index}
                image={item.image}
                price={item.price}
                name={item.name}
                click={()=>handleLink(item.name)}
            />
        })
    }

    const onKeyDownHandler=async (e)=>{
        if(e.keyCode===13){
            await dispatchBook(BookActions.searchBooks(Search,20))
            setSearch("")
            setSearchList([])
            props.history.push(`/store/search/${regexStringURL(Search)}`)
        }
    }
    const handleClick=async ()=>{
        await dispatchBook(BookActions.searchBooks(Search,20))
        setSearch("")
        setSearchList([])
        props.history.push(`/store/search/${regexStringURL(Search)}`)
    }
    console.log("render MainHeader");
    return (
        <div className="MainHeader">
            <Logo />
            <div>
                <div className="SearchOption">
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
                    {!_.isEmpty(Search)?
                    <ul className="DropdownItem">
                        {!_.isEmpty(SearchList)?
                            renderSearchItem():
                            <li>Not Item Found ...</li>}
                    </ul>:null}
                    
                </div>
            </div>
            <div>
                <Link to="/cart"><FontAwesomeIcon icon="shopping-cart"/>({cart.productList.length!==0?cart.productList.reduce((fin,current)=>fin+current.quantity,0):0})</Link>
                
            </div>
        </div>
    )
}


export default withRouter(MainHeader)