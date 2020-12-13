import React, { useState,useEffect,useRef } from 'react'
import { Link, withRouter,Redirect } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import * as BookActions from "./../../actions/books"
import * as CartActions from "./../../actions/cart"
import * as ReviewActions from "./../../actions/reviews"
import _ from "lodash"
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import QuantityDialog from "./../QuantityDialog/QuantityDialog"
import useQuantityDialog from "./../QuantityDialog/useQuantityDialog"
import QuantityControl from "./../QuantityControl/QuantityControl"
import CheckOutDialog from "./../CheckOutDialog/CheckOutDialog"
import useCheckOutDialog from "./../CheckOutDialog/useCheckOutDialog"
import CommentList from "./../Comment/CommentList"
import BarChart from "./../Chart/BarChart"
import LeaveReview from "./../../HOC/LeaveReview"
import { Rating,Button, Comment, Form, Header,Message,Icon } from 'semantic-ui-react'
import '@brainhubeu/react-carousel/lib/style.css';
import "./style.css"
const ProductDetail=(props)=>{

    const [Book,setBook]=useState({})
    const [Similar,setSimilar]=useState([])
    const [Quantity,setQuantity]=useState(1)
    const auth=useSelector(state=>state.auth)
    const cart=useSelector(state=>state.cart)
    const reviews=useSelector(state=>state.reviews)
    const dispatchCart=useDispatch()
    const dispatchReview=useDispatch()
    const {isShowingQuantity,toggleQuantity}=useQuantityDialog()
    const {isShowingCheckOut,toggleCheckOut}=useCheckOutDialog()
    const regexStringURL=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '_')

    }
    const regexStringURLSimilar=(str)=>{
        /* return str.replace(/(?!\w|\s)./g, '') */
        return str.replace(/\s+/g, '-')

    }
    const regexNumber=(str)=>{
        const regNumber=/^\d+$/
        return regNumber.test(str)
    }

    const fetchData=async ()=>{

        const ret=await BookActions.getBookByName(props.match.params.productParam)
        if(ret.status){

            await setBook(ret.data)
            const ret2=await BookActions.getSimilarBooks(ret.data.category._id)

            setSimilar(ret2.data)
            await dispatchReview(ReviewActions.getReviewsByBookId(ret.data._id))

        }
    }

    const increaseQuantity=()=>{
        if(Quantity<Book.maximumCanBuy){
            setQuantity(Quantity+1)
        }
    }

    const decreaseQuantity=()=>{
        if(Quantity>1){
            setQuantity(Quantity-1)
        }
    }

    const handleQuantity=(e)=>{
        e.preventDefault()
        const num=regexNumber(e.target.value)
        if(num){
            let value=parseInt(e.target.value,10)
            if(value>Book.maximumCanBuy){
                value=Book.maximumCanBuy
            }
            else if(value<1){
                value=1
            }
            setQuantity(value)
        }
    }

    const handleGoCart=()=>{
        props.history.push({pathname: `/cart/`})
    }


    const renderCarousel=()=>{
        return <Carousel
            arrows 
            slidesPerPage={6}
            infinite
            className="SimilarProductsWrapper"  
            >
            {Similar.map((ele,index)=>{
                return <Link to={{pathname:`/product/${regexStringURLSimilar(ele.name)}`}} key={ele._id}>
                        <div className="SimilarProduct" >
                            <div className="SimilarProductImage">
                                <img src={ele.image} alt=""/>
                            </div>
                            <div className="SimilarProductDetails">
                                <h5 className="ProductTitle">{ele.name}</h5>
                                <p className="ProductPrice">${ele.price}</p>
                            </div>
                        </div> 
                </Link>
            })}

        </Carousel>
    }

    const renderNavigation=()=>{   
        return <small>
            <Link to={{pathname: `/store`}}>Home</Link> > 
            <Link to={{pathname: `/store/${regexStringURL(Book.department.name)}`}}>{Book.department.name}</Link> > 
            <Link to={{pathname: `/store/${regexStringURL(Book.department.name)}/${regexStringURL(Book.category.name)}`}}>{Book.category.name}</Link>
        </small>
    }


    const addCart=async ()=>{
        const checkQuantity=cart.productList.filter(prod=>prod.book.id===Book._id).reduce((check,current)=>check+current.quantity,0)
        if(checkQuantity+Quantity>Book.maximumCanBuy){
            toggleQuantity()
        }
        else{
            
            let data={}
            const book={
                id: Book._id,
            }
            if(auth.isAuthenticated){
                
                const userId=auth.profile.id
                data={userId:userId,book:book,quantity: Quantity}
                const retUser=await dispatchCart(CartActions.addCartUser(data))
                if(retUser.status){
                    toggleCheckOut()
                }
            }
            else{
                data={book:book,quantity: Quantity}
                const retGuest=await dispatchCart(CartActions.addCartGuest(data))
                if(retGuest.status){
                    toggleCheckOut()
                }
            }
        }
        
        
    }

    useEffect(() => {
        console.log("Im in effect product detail");
        
        fetchData()
        return () => {
            console.log(`cleanup ${props.match.params.productParam}`);
            
        };
    }, [])
    console.log("render product detail");
    console.log(Book);
    
    return (
        <div className="Content">
            <div className="ProductDetailsWrapper">
                <div className="ProductDetailsImage">
                    <div className="ProductDetailsImageWrapper">
                        <img src={Book.image} alt="" />
                    </div>
                    
                </div>
                <div className="ProductDetails">
                    <div className="BreadCrumb">
                        {!_.isEmpty(Book)?renderNavigation():null}
                    </div>
                    <p className="ProductTitle">{Book.name}</p>
                    <p className="ProductPrice">${Book.price} {Book.quantity>0?
                        null:
                        <span style={{color: "red"}}>(Sold Out)</span>}</p>
                    <div className="ProductDescription">
                        <h3>Product Description</h3>
                        <p>{Book.description}</p>
                    </div>
                    {Book.quantity>0?
                    <div className="ActionButtonWrapper">
                    <div className="QuantityBoundary">
                        <span>Maximum can buy: {Book.maximumCanBuy}</span>
                    </div>

                        
                    <div className="ActionButtonWrapperCart">
                        <div className="ActionButtonWrapperQuantity">
                            <span style={{fontSize: 26, fontWeight: "bold"}}>Quantity: </span> 
                                <QuantityControl 
                                productQuantity={Quantity}
                                changeQuantity={handleQuantity} 
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                name={Book.name}/>
                            </div>
                        <button onClick={addCart}><i className="fas fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                        
                    </div>
                </div>:null}
                </div>
            </div>
            
            <div className="SimilarProducts">
                <h3>Similar Products</h3>
                {!_.isEmpty(Similar)?renderCarousel():null}
            </div>

            <div className="ProductReviews">
                <div className="ProductReviewsContent">
                    <div className="CustomerReview">
                        <div className="CustomerRating">   
                            <Header as='h3'>
                                Customer Ratings
                            </Header>
                            <div className="RateCount">
                                
                                <Rating key={Book._id} icon='star' maxRating={5} defaultRating={Math.round(Book.rate)} size='massive'disabled/>    
                            </div>
                            <p>{reviews.rateCount} customers ratings:</p>
                            <div className="RateBar">
                                <BarChart/>
                            </div>
                        </div>
                        <div className="CustomerComment">
                            <CommentList/>
                        </div>
                    </div>
                    {!_.isEmpty(Book)?<LeaveReview bookId={Book._id}/>:null}
                </div>
            </div>
            <QuantityDialog
                isShowing={isShowingQuantity}
                hide={toggleQuantity}
                quantity={cart.productList.filter(prod=>prod.book.id===Book._id).reduce((check,current)=>check+current.quantity,0)}
                maximum={Book.maximumCanBuy}/>
            <CheckOutDialog
                isShowing={isShowingCheckOut}
                hide={toggleCheckOut}
                goCart={handleGoCart}/>
        </div>
    )
}

export default withRouter(ProductDetail)