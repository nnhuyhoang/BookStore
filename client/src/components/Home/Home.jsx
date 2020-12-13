import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import ProductList from "../ProductList/ProductList"
import './style.css';
import {imageList} from "./../../constants/imageList"
import Slider from 'infinite-react-carousel';
import { withRouter } from 'react-router-dom'


const settings =  {
    arrows: false,
    dots: true,   
    autoplay: true,
    autoplaySpeed: 5000
};


const Home =(props)=>{

        console.log("render home");
        const renderImage=()=>{
            return imageList.map((item,index)=>{
                return <div key={index}>
                <img className="carouselImage" src={item} alt=""/>
                </div>
            })
        }
        return (
                <div className="HomeContainer">
                    <Slider {...settings} className="carouselSlider" >
                        {renderImage()}
                    </Slider>
                    <ProductList/>      
                </div>
                
                );
}


export default withRouter(Home);