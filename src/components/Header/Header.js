import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase';

const Header = () => {
    const [{ basket, user }] = useStateValue();
    console.log(basket);

    const login = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <nav className="header">
            <Link to="/">
                <MenuIcon className="header__menuIcon" fontSize="large" />
            </Link>
            <Link to="/" >
                <img
                    className="header__logo"
                    src={require(`../../assests/amazon_PNG25.png`)}
                    alt=""
                />
            </Link>
            <div className="header__search mobile_header__search">
                <input type="text" className="header__searchInput" placeholder="What are you looking for?" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"} className="header__link mobile_header__link">
                    <div onClick={login} className="header__option">
                        <div className="header__optionLineOne">Hello, {user?.email}</div>
                        <div className="header__optionLineTwo">{user ? 'Sign out' : 'Sign up'}</div>
                    </div>
                </Link>
                <Link to="/" className="header__link mobile_header__link">
                    <div className="header__option">
                        <div className="header__optionLineOne">Returns</div>
                        <div className="header__optionLineTwo">& Orders</div>
                    </div>
                </Link>
                <Link to="/" className="header__link mobile_header__link">
                    <div className="header__option">
                        <div className="header__optionLineOne">Your</div>
                        <div className="header__optionLineTwo">Prime</div>
                    </div>
                </Link>
                <Link to="/checkout" className="header__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <div className="header__optionLineTwo header__optionBasketCount">{basket?.length}</div>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header;
