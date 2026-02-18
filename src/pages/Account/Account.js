import React from 'react';
import './Account.css';
import { Link } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'; // Box/Orders
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'; // Amazon Pay
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'; // Business/Store
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined'; // Primeish

function Account() {
    return (
        <div className="account">
            <h1 className="account__title">Your Account</h1>

            <div className="account__topLinks">
                <Link to="/orders" className="account__card">
                    <div className="account__cardIcon">
                        <Inventory2OutlinedIcon fontSize="large" style={{ color: '#E47911' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Your Orders</h3>
                        <p>Track, return, or buy things again</p>
                    </div>
                </Link>

                <Link to="/profile" className="account__card">
                    <div className="account__cardIcon">
                        <LockOutlinedIcon fontSize="large" style={{ color: '#9faab1' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Login & security</h3>
                        <p>Edit login, name, and mobile number</p>
                    </div>
                </Link>

                <Link to="/category/prime" className="account__card">
                    <div className="account__cardIcon">
                        <AllInboxOutlinedIcon fontSize="large" style={{ color: '#00A8E1' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Prime</h3>
                        <p>View benefits and payment settings</p>
                    </div>
                </Link>

                <Link to="/profile" className="account__card">
                    <div className="account__cardIcon">
                        <LocationOnOutlinedIcon fontSize="large" style={{ color: '#F19D38' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Your Addresses</h3>
                        <p>Edit addresses for orders and gifts</p>
                    </div>
                </Link>

                <Link to="/category/business" className="account__card">
                    <div className="account__cardIcon">
                        <StorefrontOutlinedIcon fontSize="large" style={{ color: '#007185' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Your business account</h3>
                        <p>Sign up for free to save up to 18% with GST Invoice and bulk discounts and purchase on credit.</p>
                    </div>
                </Link>

                <Link to="/payment" className="account__card">
                    <div className="account__cardIcon">
                        <PaymentOutlinedIcon fontSize="large" style={{ color: '#9faab1' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Payment options</h3>
                        <p>Edit or add payment methods</p>
                    </div>
                </Link>

                <Link to="/payment" className="account__card">
                    <div className="account__cardIcon">
                        <AccountBalanceWalletOutlinedIcon fontSize="large" style={{ color: '#E47911' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Amazon Pay balance</h3>
                        <p>Add money to your balance</p>
                    </div>
                </Link>

                <Link to="/category/customer-service" className="account__card">
                    <div className="account__cardIcon">
                        <HeadsetMicOutlinedIcon fontSize="large" style={{ color: '#F3A847' }} />
                    </div>
                    <div className="account__cardContent">
                        <h3>Contact Us</h3>
                        <p>Contact our customer service via phone or chat</p>
                    </div>
                </Link>
            </div>

            <hr className="account__divider" />

            <div className="account__bottomGrid">
                <div className="account__listGroup">
                    <h3>Digital content and devices</h3>
                    <ul>
                        <li><Link to="/">Apps and more</Link></li>
                        <li><Link to="/">Content Library</Link></li>
                        <li><Link to="/">Devices</Link></li>
                        <li><Link to="/">Digital gifts you've received</Link></li>
                        <li><Link to="/">Digital and device forum</Link></li>
                    </ul>
                </div>

                <div className="account__listGroup">
                    <h3>Email alerts, messages, and ads</h3>
                    <ul>
                        <li><Link to="/">Advertising preferences</Link></li>
                        <li><Link to="/">Communication preferences</Link></li>
                        <li><Link to="/">SMS alert preferences</Link></li>
                        <li><Link to="/">Message Centre</Link></li>
                        <li><Link to="/">Alexa shopping notifications</Link></li>
                    </ul>
                </div>

                <div className="account__listGroup">
                    <h3>More ways to pay</h3>
                    <ul>
                        <li><Link to="/payment">Default Purchase Settings</Link></li>
                        <li><Link to="/payment">Amazon Pay</Link></li>
                        <li><Link to="/">Coupons</Link></li>
                    </ul>
                </div>

                <div className="account__listGroup">
                    <h3>Ordering and shopping preferences</h3>
                    <ul>
                        <li><Link to="/">Leave packaging feedback</Link></li>
                        <li><Link to="/">Lists</Link></li>
                        <li><Link to="/">Manage your profiles</Link></li>
                        <li><Link to="/">Language settings</Link></li>
                    </ul>
                </div>

                <div className="account__listGroup">
                    <h3>Other accounts</h3>
                    <ul>
                        <li><Link to="/">Account Linking</Link></li>
                        <li><Link to="/">Seller account</Link></li>
                        <li><Link to="/">Amazon Web Services</Link></li>
                        <li><Link to="/">Login with Amazon</Link></li>
                    </ul>
                </div>

                <div className="account__listGroup">
                    <h3>Shopping programs and rentals</h3>
                    <ul>
                        <li><Link to="/">Manage Your Amazon Family</Link></li>
                        <li><Link to="/">Subscribe & Save</Link></li>
                        <li><Link to="/">Shop the Kids' Store by age</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Account;
