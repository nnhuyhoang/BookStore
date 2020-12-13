import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useParams} from "react-router"
import Product from "./../Product/Product"
import * as BookActions from "./../../actions/books"
import * as CategoryActions from "./../../actions/categories"
import * as DepartmentActions from "./../../actions/departments"
import * as AuthorActions from "./../../actions/authors"
import NotAvailable from "./../Error/NotAvailable"
import {useSelector,useDispatch} from "react-redux"
import _ from "lodash"
import './style.css';
import { withRouter } from 'react-router-dom'
import Filter from "./../Filter/Filter"
const ProductList=(props)=>{

    const [Books,setBooks]=useState([])
    const [Status,setStatus]=useState(true)
    const {departParam,cateParam,nameParam,authorParam}=useParams()

    const books=useSelector(state=>state.books)
    const departments=useSelector(state=>state.departments)

    const dispatchBooks=useDispatch()
    const dispatchDepartments=useDispatch()
    const dispatchCategories=useDispatch()
    const dispatchAuthors=useDispatch()

    const regexStringURL=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '-')

    }

    const renderProduct=()=>{
        console.log("Im in procudct");
        
        return Books.map((book,index)=>{
            return <Link 
                to={{pathname: `/product/${regexStringURL(book.name)}`}}>
                    <Product
                    key={index}
                    book={book}
                />
            </Link>
        })
    }
    async function fetchData(){
        let ret=[];
        if(nameParam){
            const pattern=nameParam.replace("-"," ")
            ret= await dispatchBooks(BookActions.searchBooks(pattern,12))
        }
        else if(cateParam){
            console.log("category fetch");
            
            ret=await dispatchBooks(BookActions.getBooksByCategoryName(departParam,cateParam,12))
        }
        else if(departParam){
            console.log("department fetch");
            if(departParam==="All") ret=await dispatchBooks(BookActions.getBooks(12))
            else{ret=await dispatchBooks(BookActions.getBooksByDepartmentName(departParam,12))}
        }
        else if(authorParam){
            console.log("author's book fetch");
            ret=await dispatchBooks(BookActions.getBooksByAuthorName(authorParam,12))
        }
        else{
            console.log("fetch all");
            
            ret=await dispatchBooks(BookActions.getBooks(12))
            
        }       
        if(ret.status){
            setBooks(ret.data)
        }
        else{
            setStatus(false)
        }
    }
    
    async function getDepartments(){
        await dispatchDepartments(DepartmentActions.getDepartments())
    }

    async function getCategories(){
        await dispatchCategories(CategoryActions.getCategories())
    }

    async function getAuthors(){
        await dispatchAuthors(AuthorActions.getAuthors())
    }

    useEffect(() => {
        console.log(`Im in useEffect ${props.location.pathname}`);
        
        
        if(_.isEmpty(books.currentDepartment) && _.isEmpty(books.currentCategory)){
            console.log("im in condition");
            

            getDepartments()
            getCategories()
            getAuthors()
        }
        fetchData()
        return () => {
            console.log(`cleanup ${props.location.pathname}`);
            
        };
    }, [])

    const loadMoreHandle= async()=>{
        let data={}
        if(books.status===1){
            const pattern=nameParam.replace("-"," ")
            data={name:pattern}
        }
        else if(books.status===2){
            data={departmentName:departParam}
        }
        else if(books.status===3){
            data={departmentName:departParam,categoryName:cateParam}
        }
        else if(books.status===4){
            data={authorName:authorParam}
        }
        const ret=await dispatchBooks(BookActions.loadMoreBooks(data))
        if(ret.status){
            setBooks(ret.data)
        }
    }
    const handleLowHigh=async()=>{
        let data={order:1}
        if(nameParam){
            data={...data,name:nameParam}
        }
        else if(cateParam){
            data={...data,categoryName:cateParam}
        }
        else if(departParam){
            data={...data,departmentName:departParam}
        }
        else if(authorParam){
            data={...data,authorName:authorParam}
        }
        
        const ret=await dispatchBooks(BookActions.sortBook(data))
        if(ret.status){
            setBooks(ret.data)
        }
    }
    const handleHighLow=async ()=>{
        let data={order:-1}
        if(nameParam){
            data={...data,name:nameParam}
        }
        else if(cateParam){
            data={...data,categoryName:books.currentCategory.name}
        }
        else if(departParam){
            data={...data,departmentName:books.currentDepartment.name}
        }
        else if(authorParam){
            data={...data,authorName:authorParam}
        }
        const ret=await dispatchBooks(BookActions.sortBook(data))
        if(ret.status){   
            setBooks(ret.data)
        }
    }

    console.log(nameParam);
    


    console.log(`render ${props.location.pathname}`);
    
    
    
    return(
            
            <div className="Content">
{/*                     <div className="ContentTitle">
                    <h2 className="CategoryTitle">sdfsdf</h2>
                </div> */}
                <div className="ContentBody">
                        <Filter handleHighLow={handleHighLow} handleLowHigh={handleLowHigh}/>
                    
                    
                    <div className="MainContent">

                        <div className="ProductArea">
                            {Status? renderProduct():<NotAvailable/> }
                            
                            
                        </div>
                        <div className="LoadMore">
                            <button className="LoadMoreButton" onClick={loadMoreHandle}>Load More</button>
                        </div>
                    </div>

                </div>
            </div>
            
        );
}

export default withRouter(ProductList)