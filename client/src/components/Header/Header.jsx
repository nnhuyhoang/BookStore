import React from 'react'
import './style.css';
import TopHeader from "./TopHeader/TopHeader"
import MainHeader from "./MainHeader/MainHeader"
import BottomHeader from "./BottomHeader/BottomHeader"
const Header=()=> {
    return (
        <div className="Header">
            <TopHeader />
            <MainHeader />
            <BottomHeader />
        </div>
    )
}

export default Header
