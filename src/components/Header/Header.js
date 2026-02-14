import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [{ basket, user }] = useStateValue();
    const [location, setLocation] = useState({ city: 'Select your', pincode: 'address' });
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        // Request location on component mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // improved geocoding using OpenStreetMap Nominatim
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            // Extract City/Locality and Pincode from standard OSM structure
                            const address = data.address;
                            if (address) {
                                const city = address.city || address.town || address.village || address.suburb || address.county || '';
                                const pincode = address.postcode || '';

                                if (city || pincode) {
                                    setLocation({ city, pincode });
                                }
                            }
                        })
                        .catch(err => console.error("Geocoding error:", err));
                },
                (error) => {
                    console.log("Location permission denied or error:", error);
                }
            );
        }
    }, []);

    const handleAuthentication = () => {
        if (user) {
            signOut(auth);
        }
    }

    // Get user's name or email prefix
    const getUserName = () => {
        if (!user) return 'Guest';
        if (user.displayName) return user.displayName;
        return user.email?.split('@')[0];
    };

    return (
        <div className="header-wrapper">
            <nav className="header">
                {/* Mobile Menu Icon */}
                <div className="header__menuIcon">
                    <MenuIcon />
                </div>

                {/* Logo */}
                <Link to="/" className="header__logoLink">
                    <img
                        className="header__logo"
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        alt="Amazon Logo"
                    />
                </Link>

                {/* Location Option - Desktop Only */}
                <div className="header__option header__option--location desktop-only">
                    <div className="header__optionLineOne">
                        <span className="header__locationLabel">Deliver to {getUserName()}</span>
                    </div>
                    <div className="header__optionLineTwo footer__locationText">
                        <LocationOnIcon className="header__locationIcon" />
                        <span>
                            {location.city === 'Select your'
                                ? 'Select your address'
                                : (location.pincode ? `${location.city}, ${location.pincode}` : location.city)}
                        </span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="header__search">
                    <select className="header__searchSelect">
                        <option>All</option>
                        <option>Electronics</option>
                        <option>Computers</option>
                        <option>Smart Home</option>
                        <option>Arts & Crafts</option>
                    </select>
                    <input
                        type="text"
                        className="header__searchInput"
                        placeholder="Search Amazon in"
                    />
                    <div className="header__searchIconContainer">
                        <SearchIcon className="header__searchIcon" />
                    </div>
                </div>

                {/* Header Nav Links */}
                <div className="header__nav">
                    <div className="header__option header__userOption">
                        <Link to={!user ? "/login" : "/profile"} className="header__link">
                            <span className="header__optionLineOne">
                                Hello, {getUserName()}
                            </span>
                            <span className="header__optionLineTwo">Account & Lists</span>
                        </Link>

                        <div className="nav__dropdown">
                            <div className="nav__dropdownArrow"></div>

                            <div className="nav__dropdownContainer">
                                {/* Top Section: Buy Again and Profile Header */}
                                <div className="nav__dropdownTop">
                                    <div className="nav__buyAgain">
                                        <div className="nav__buyAgainHeader">
                                            <h3>Buy it again</h3>
                                            <Link to="/orders">View All & Manage</Link>
                                        </div>
                                        <div className="nav__buyAgainList">
                                            <div className="nav__buyAgainItem">
                                                <img src="/images/pro_headphones.png" alt="Headphones" />
                                                <div className="nav__buyAgainDetails">
                                                    <p>Sony Headphones</p>
                                                    <span className="nav__price">₹990.00</span>
                                                    <button className="nav__addToCartBtn">Add to cart</button>
                                                </div>
                                            </div>
                                            <div className="nav__buyAgainItem">
                                                <img src="/images/pro_shoes.png" alt="Shoes" />
                                                <div className="nav__buyAgainDetails">
                                                    <p>Running Shoes</p>
                                                    <span className="nav__price">₹799.00</span>
                                                    <button className="nav__addToCartBtn">Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="nav__profileHeaderContainer">
                                        <div className="nav__profileHeader">
                                            <div className="nav__profileInfo">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="Profile" className="nav__avatar" />
                                                <div>
                                                    <h3>{getUserName()}</h3>
                                                    <p>Account holder</p>
                                                </div>
                                            </div>
                                            <span
                                                className="nav__manageProfiles"
                                                onClick={() => setShowProfileModal(true)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Manage Profiles ›
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="nav__dropdownColumns">
                                    <div className="nav__col">
                                        <h3>Your Lists</h3>
                                        <Link to="/wishlist">Shopping List</Link>
                                        <Link to="/wishlist">Create a Wish List</Link>
                                        <Link to="/wishlist">Wish from Any Website</Link>
                                        <Link to="/wishlist">Baby Wishlist</Link>
                                        <Link to="/wishlist">Discover Your Style</Link>
                                        <Link to="/wishlist">Explore Showroom</Link>
                                    </div>
                                    <div className="nav__col nav__borderLeft">
                                        <h3>Your Account</h3>
                                        <Link to="/profile">Your Account</Link>
                                        <Link to="/orders">Your Orders</Link>
                                        <Link to="/wishlist">Your Wish List</Link>
                                        <Link to="/profile">Keep shopping for</Link>
                                        <Link to="/profile">Your Recommendations</Link>
                                        <Link to="/category/prime">Your Prime Membership</Link>
                                        <Link to="/profile">Your Prime Video</Link>
                                        <Link to="/profile">Your Subscribe & Save Items</Link>
                                        <Link to="/profile">Memberships & Subscriptions</Link>
                                        <Link to="/profile">Your Seller Account</Link>
                                        <Link to="/profile">Content Library</Link>
                                        <Link to="/profile">Devices</Link>
                                        <Link to="/profile">Register for a free Business Account</Link>
                                        {user ? (
                                            <div onClick={handleAuthentication} className="nav__signOut">Sign Out</div>
                                        ) : (
                                            <Link to="/login" className="nav__signOut">Sign In</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to={!user ? "/login" : "/profile"} className="header__link mobile-only">
                            <PersonOutlineIcon className="header__userIconMobile" />
                        </Link>
                    </div>

                    <Link to="/orders" className="header__link header__link--optional">
                        <div className="header__option">
                            <span className="header__optionLineOne">Returns</span>
                            <span className="header__optionLineTwo">& Orders</span>
                        </div>
                    </Link>

                    <Link to="/" className="header__link header__link--optional">
                        <div className="header__option">
                            <span className="header__optionLineOne">Your</span>
                            <span className="header__optionLineTwo">Prime</span>
                        </div>
                    </Link>

                    <Link to="/checkout" className="header__link">
                        <div className="header__optionBasket">
                            <ShoppingBasketIcon className="header__basketIcon" />
                            <span className="header__optionLineTwo header__basketCount">
                                {basket?.length}
                            </span>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Sub Header (Bottom Links) */}
            {/* Sub Header (Bottom Links) */}
            <div className="header__bottom">
                <Link to="/category/deals" className="header__bottomItem mobile-only">Shop By Category</Link>
                <Link to="/category/deals" className="header__bottomItem">Deals</Link>
                <Link to="/category/sell" className="header__bottomItem">Sell</Link>
                <Link to="/category/best-sellers" className="header__bottomItem desktop-only">Best Sellers</Link>
                <Link to="/category/mobiles" className="header__bottomItem desktop-only">Mobiles</Link>
                <Link to="/category/customer-service" className="header__bottomItem desktop-only">Customer Service</Link>
                <Link to="/category/electronics" className="header__bottomItem desktop-only">Electronics</Link>
                <Link to="/category/prime" className="header__bottomItem desktop-only">Prime</Link>
                <Link to="/category/fashion" className="header__bottomItem desktop-only">Fashion</Link>
                <Link to="/category/new-releases" className="header__bottomItem desktop-only">New Releases</Link>
            </div>

            {/* Mobile Location Bar */}
            <div className="header__mobileLocation mobile-only">
                <LocationOnIcon className="header__mobileLocationIcon" />
                <span>
                    Deliver to {getUserName()} - {location.city === 'Select your'
                        ? 'Select a location'
                        : (location.pincode ? `${location.city}, ${location.pincode}` : location.city)}
                </span>
            </div>

            {/* Profile Selection Modal */}
            {showProfileModal && (
                <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Who is shopping?</h3>
                            <span className="close-modal" onClick={() => setShowProfileModal(false)}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <div className="profile-card-modal">
                                <div className="profile-card-left">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="Profile" className="modal-avatar" />
                                    <div className="profile-card-info">
                                        <div className="profile-name">{getUserName()}</div>
                                        <div className="profile-type">Account holder</div>
                                    </div>
                                </div>
                                <Link to="/profile" className="profile-view-btn" onClick={() => setShowProfileModal(false)}>View</Link>
                            </div>
                            <div className="add-profile">
                                <span className="plus-icon">+</span>
                                <span>Add profile</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
