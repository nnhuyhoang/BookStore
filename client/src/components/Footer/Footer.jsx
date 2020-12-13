import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons"
import {Link} from "react-router-dom"
import "./style.css"
const Footer=()=>{
    return (
        <div className="mainFooter">
            <div className="footerContainer">
                <div className="rowFooter">
                    <div className="colFooter">
                        <h3>BookStore Online</h3>
                        <ul className="listUnstyle">
                            <li>0123456789</li>
                            <li>268 Lý Thường Kiệt</li>
                            <li>Phường 6, Quận 10</li>
                            <li>Thành Phố Hồ Chí Minh</li>
                        </ul>
                    </div>
                    <div className="colFooter">
                        <h3>Payment Method</h3>
                        <ul className="listUnstyle">
                            <li><span>VISA, MasterCard</span></li>
                            <li><span>Momo, Paypal</span></li>
                        </ul>
                    </div>
                    <div className="colFooter">
                        <h3>About Us</h3>
                        <ul className="listUnstyle">
                            <li><a href="https://www.facebook.com/tiki.vn/"><FontAwesomeIcon icon={faFacebook}/><span>/tiki.vn</span></a></li>
                            <li><a href="https://www.instagram.com/tiki.vn/"><FontAwesomeIcon icon={faInstagram}/><span>/tiki.vn</span></a></li>
                            <li><a href="https://www.youtube.com/user/TikiVBlog"><FontAwesomeIcon icon={faYoutube}/><span>/TikiVBlog</span></a></li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="rowCopy">
                    <p className="colCopy">
                        &copy; {new Date().getFullYear()}: bookstore.com 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
