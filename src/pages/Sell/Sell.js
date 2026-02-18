import React from 'react';
import './Sell.css';

function Sell() {
    return (
        <div className="sell">
            <div className="sell__hero">
                <div className="sell__heroContent">
                    <h1>From home-grown to well-known with <span>Amazon.in</span></h1>
                    <p>
                        Connect with millions of customers from 18,000+ pincodes across India.
                    </p>
                    <button className="sell__ctaButton">Start Selling</button>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
                    alt="Amazon Seller"
                    className="sell__heroImage"
                />
            </div>

            <div className="sell__feeDrop">
                <div className="sell__feeDropHeader">
                    <span role="img" aria-label="sparkle">✨</span> Fee drop highlights
                </div>
                <div className="sell__stats">
                    <div className="sell__statItem">
                        <span className="sell__statNumber">0%</span>
                        <span className="sell__statLabel">Referral fees on products under ₹300</span>
                    </div>
                    <div className="sell__statItem">
                        <span className="sell__statNumber">₹65</span>
                        <span className="sell__statLabel">National shipping rates now, from ₹77</span>
                    </div>
                    <div className="sell__statItem">
                        <span className="sell__statNumber">Up to 90%</span>
                        <span className="sell__statLabel">Savings in selling fees on the sale of second unit</span>
                    </div>
                </div>
            </div>

            <div className="sell__benefits">
                <h2>Why Sell on Amazon?</h2>
                <div className="sell__benefitsGrid">
                    <div className="sell__benefitCard">
                        <h3>Secure Payments</h3>
                        <p>Funds are deposited directly to your bank account every 7 days, even for Pay on Delivery orders.</p>
                    </div>
                    <div className="sell__benefitCard">
                        <h3>Stress-Free Shipping</h3>
                        <p>We take care of shipping and delivery through Easy Ship and FBA (Fulfillment by Amazon).</p>
                    </div>
                    <div className="sell__benefitCard">
                        <h3>Professional Support</h3>
                        <p>Get help at every step with our seller support and service provider network.</p>
                    </div>
                </div>
            </div>

            <div className="sell__steps">
                <h2>How to Start Selling</h2>
                <div className="sell__stepsContainer">
                    <div className="sell__step">
                        <div className="sell__stepNumber">1</div>
                        <h3>Register Account</h3>
                        <p>Sign up with your GST/PAN and bank account details.</p>
                    </div>
                    <div className="sell__step">
                        <div className="sell__stepNumber">2</div>
                        <h3>Upload Products</h3>
                        <p>List your products using our easy tools or bulk upload.</p>
                    </div>
                    <div className="sell__step">
                        <div className="sell__stepNumber">3</div>
                        <h3>You Sell, We Deliver</h3>
                        <p>Customers buy your products, and we handle the delivery.</p>
                    </div>
                    <div className="sell__step">
                        <div className="sell__stepNumber">4</div>
                        <h3>Get Paid</h3>
                        <p>Receive payments directly in your bank account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sell;
