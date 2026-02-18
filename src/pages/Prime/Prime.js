import React, { useState } from 'react';
import './Prime.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For plan selection

function Prime() {

    // State for selected plan (default: shopping)
    const [selectedPlan, setSelectedPlan] = useState('shopping');

    // Benefit Table Data
    const benefits = [
        {
            name: "Prime Delivery",
            description: "Unlimited FREE delivery, Same-day/1-day delivery",
            shopping: true,
            lite: true,
            prime: true
        },
        {
            name: "Prime Video",
            description: "Watch on (with ads for Lite)",
            shopping: false,
            lite: "Mobile or TV",
            prime: "Mobile, TV, Laptop"
        },
        {
            name: "Number of devices",
            description: "Simultaneous screens",
            shopping: false,
            lite: "1",
            prime: "5 (Including 2 TVs)"
        },
        {
            name: "Video Quality",
            description: "Resolution",
            shopping: false,
            lite: "HD (720p)",
            prime: "4K UHD/HD (2160p)"
        },
        {
            name: "Prime Music",
            description: "100M songs & 15M+ podcasts",
            shopping: false,
            lite: false,
            prime: true
        },
        {
            name: "Prime Shopping",
            description: "Early access to sales, 5% Cashback",
            shopping: true,
            lite: true,
            prime: true
        },
        {
            name: "Prime Reading",
            description: "Free eBooks on Kindle app",
            shopping: false,
            lite: false,
            prime: true
        },
        {
            name: "Prime Gaming",
            description: "Free games on mobile, PC & console",
            shopping: false,
            lite: false,
            prime: true
        }
    ];

    // Plan Options for Selector
    const plans = [
        {
            id: 'shopping',
            title: 'Prime Shopping Edition',
            price: '₹399',
            period: '/year',
            originalPrice: '₹499'
        },
        {
            id: 'lite',
            title: 'Prime Lite',
            price: '₹799',
            period: '/year',
            originalPrice: null
        },
        {
            id: 'prime',
            title: 'Prime',
            price: '₹1,499',
            period: '/year',
            originalPrice: null
        },
        {
            id: 'prime_monthly',
            title: 'Prime',
            price: '₹299',
            period: '/month',
            originalPrice: null
        }
    ];

    const renderCell = (value) => {
        if (value === true) return <CheckIcon className="prime__check" />;
        if (value === false) return <CloseIcon className="prime__cross" />;
        return <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{value}</span>;
    };

    return (
        <div className="prime">
            {/* Hero Section */}
            <div className="prime__hero">
                <div className="prime__heroText">
                    <h1>amazon prime</h1>
                    <h2>One membership, many benefits</h2>
                    <p>Join millions of Prime members today.</p>
                    <button className="prime__heroButton" onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}>
                        See Plans
                    </button>
                    {/* Floating elements styling could go here */}
                </div>
                <img
                    className="prime__heroImage"
                    src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop&crop=center"
                    alt="Prime Box"
                />
            </div>

            {/* Comparison Table */}
            <div className="prime__tableContainer">
                <table className="prime__table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Benefits</th>
                            <th className={selectedPlan === 'shopping' ? "prime__tableCol--highlight" : ""}>
                                <div className="prime__tableHeadTitle">Prime Shopping Edition</div>
                                <div className="prime__tableHeadPrice">₹399 /year</div>
                            </th>
                            <th className={selectedPlan === 'lite' ? "prime__tableCol--highlight" : ""}>
                                <div className="prime__tableHeadTitle">Prime Lite</div>
                                <div className="prime__tableHeadPrice">₹799 /year</div>
                            </th>
                            <th className={selectedPlan === 'prime' || selectedPlan === 'prime_monthly' ? "prime__tableCol--highlight" : ""}>
                                <div className="prime__tableHeadTitle">Prime</div>
                                <div className="prime__tableHeadPrice">₹1,499 /year</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {benefits.map((row, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{row.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{row.description}</div>
                                </td>
                                <td className={selectedPlan === 'shopping' ? "prime__tableCol--highlight" : ""}>
                                    {renderCell(row.shopping)}
                                </td>
                                <td className={selectedPlan === 'lite' ? "prime__tableCol--highlight" : ""}>
                                    {renderCell(row.lite)}
                                </td>
                                <td className={selectedPlan === 'prime' || selectedPlan === 'prime_monthly' ? "prime__tableCol--highlight" : ""}>
                                    {renderCell(row.prime)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Plan Selection Section */}
            <div id="plans" className="prime__planSection">
                <div className="prime__planSelector">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`prime__planCard ${selectedPlan === plan.id ? 'prime__planCard--selected' : ''}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {selectedPlan === plan.id && <CheckCircleIcon className="prime__planSelectedIcon" />}
                            <div className="prime__planTitle">{plan.title}</div>
                            <div className="prime__planPrice">
                                {plan.originalPrice && <span className="prime__planOriginalPrice">{plan.originalPrice}</span>}
                                {plan.price} <span className="prime__planPeriod">{plan.period}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="prime__joinAction">
                    <button className="prime__joinButton">
                        Join {plans.find(p => p.id === selectedPlan)?.title}
                    </button>
                    <p className="prime__terms">
                        By signing up for a Prime membership, you agree to the Amazon Prime Terms and Conditions.
                    </p>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="prime__benefits">
                <h2>Check out what's included with Prime:</h2>
                <div className="prime__benefitsGrid">
                    <div className="prime__benefitCard">
                        <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=200&h=150&fit=crop&crop=center" alt="Delivery" />
                        <h3>Fast, free delivery</h3>
                        <p>Enjoy Same-Day, One-Day, and Two-Day Delivery on millions of items.</p>
                    </div>
                    <div className="prime__benefitCard">
                        <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=150&fit=crop&crop=center" alt="Video" />
                        <h3>Popular movies & shows</h3>
                        <p>New releases. Award-winning Amazon Originals. Watch what you love.</p>
                    </div>
                    <div className="prime__benefitCard">
                        <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=200&h=150&fit=crop&crop=entropy&cs=tinysrgb" alt="Deals" />
                        <h3>Exclusive deals & savings</h3>
                        <p>Enjoy daily deals on thousands of items and access exclusive savings events.</p>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="prime__faq">
                <h2>Frequently Asked Questions</h2>
                <div className="prime__faqList">
                    <details>
                        <summary>What happens if I join a plan and later realize I want other benefits also and want to switch to another plan?</summary>
                        <p>You can easily upgrade your plan. The amount you paid for your current plan will be adjusted on a pro-rata basis towards the new plan.</p>
                    </details>
                    <details>
                        <summary>How do I buy Prime Video ad-free?</summary>
                        <p>Prime Video ad-free experience is available with the relevant annual Prime plans.</p>
                    </details>
                    <details>
                        <summary>How do I cancel my plan?</summary>
                        <p>You can cancel your membership at any time by visiting 'Manage Prime Membership' in your account settings.</p>
                    </details>
                    <details>
                        <summary>How many devices can be used simultaneously on a Prime subscription?</summary>
                        <p>It depends on your plan. Prime Shopping Edition doesn't include video. Prime Lite supports 1 device. Prime supports 5 devices (including 2 TVs).</p>
                    </details>
                </div>
            </div>
        </div>
    );
}

export default Prime;
