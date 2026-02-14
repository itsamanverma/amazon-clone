import React from 'react';
import './CustomerService.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import DevicesIcon from '@mui/icons-material/Devices';

function CustomerService() {
    const topics = [
        { title: "Your Orders", icon: <LocalShippingIcon className="cs__icon" />, desc: "Track packages, edit or cancel orders" },
        { title: "Returns & Refunds", icon: <ReplayIcon className="cs__icon" />, desc: "Return or replace items, print return labels" },
        { title: "Manage Addresses", icon: <LocationOnIcon className="cs__icon" />, desc: "Update your shipping addresses" },
        { title: "Payment Settings", icon: <PaymentIcon className="cs__icon" />, desc: "Manage payment methods and settings" },
        { title: "Account Settings", icon: <PersonIcon className="cs__icon" />, desc: "Change email, password, or login details" },
        { title: "Digital Services", icon: <DevicesIcon className="cs__icon" />, desc: "Troubleshoot device issues, manage content" }
    ];

    return (
        <div className="customerService">
            <div className="cs__hero">
                <h1>Hello. What can we help you with?</h1>
                <div className="cs__searchBar">
                    <input type="text" placeholder="Search our help library" />
                </div>
            </div>

            <div className="cs__container">
                <div className="cs__sectionTitle">Some things you can do here</div>
                <div className="cs__topicsGrid">
                    {topics.map((topic, index) => (
                        <div key={index} className="cs__topicCard">
                            {topic.icon}
                            <div className="cs__topicContent">
                                <h3>{topic.title}</h3>
                                <p>{topic.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cs__browsing">
                    <h2>Browse Help Topics</h2>
                    <div className="cs__browsingGrid">
                        <div className="cs__browseItem">Recommended Topics</div>
                        <div className="cs__browseItem">Shipping & Delivery</div>
                        <div className="cs__browseItem">Amazon Prime</div>
                        <div className="cs__browseItem">Payments & Pricing</div>
                        <div className="cs__browseItem">Returns & Refunds</div>
                        <div className="cs__browseItem">Ordering</div>
                        <div className="cs__browseItem">Security & Privacy</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerService;
