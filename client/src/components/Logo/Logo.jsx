import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react'
const Logo = props => {
    return (
        <Link to="/">
            <div className="Logo" {...props}>
                {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' /> */}
                <span>BookStore Online</span>
            </div>
        </Link>
        
    );
}

export default Logo;