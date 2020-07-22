import React from 'react'
import './Header.css';

function Header() {
    return (
        <nav className="header">
            <img 
                className="header__logo" 
                src={require(`../../assests/amazon_PNG21.png`)} 
                alt="" />
        </nav>
    )
}

export default Header;
