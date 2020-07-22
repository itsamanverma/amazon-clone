import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

function Header() {
    return (
        <nav className="header">
            {/* <Link to="/">
                <MenuIcon className="header__menuIcon" fontSize="large" />
            </Link> */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                className={clsx(classes.menuButton)}
            >
                <MenuIcon />
            </IconButton>
            <Link to="/" >
                <img
                    className="header__logo"
                    src={require(`../../assests/amazon_PNG25.png`)}
                    alt=""
                />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link>
                </Link>
                <Link></Link>
                <Link></Link>
            </div>
        </nav>
    )
}

export default Header;
