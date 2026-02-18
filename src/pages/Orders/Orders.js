import React, { useState } from 'react';
import './Orders.css';
import { Link } from 'react-router-dom';

function Orders() {
    const [activeTab, setActiveTab] = useState('orders');

    const orders = [
        {
            id: '405-5422202-4017914',
            date: '7 February 2026',
            total: '205.00',
            shipTo: 'Aman Verma',
            status: 'Delivered 9 February',
            statusDetail: 'Package was handed to resident',
            items: [
                {
                    title: 'Boldfit Knee Caps for Women for Pain Relief Compression Knee Support for Men Gym Running Jogging Sports Workout Cap Pad Sleeve Braces Band Belt Guard Premium Leg Pain Relief Products - M',
                    image: 'https://m.media-amazon.com/images/I/71K1nZvjU8L._AC_SL1500_.jpg',
                    returnWindow: 'Return or replace items: Eligible till 19 February 2026',
                    link: '/product/pro_knee_cap'
                }
            ]
        },
        {
            id: '405-5079802-9427517',
            date: '7 February 2026',
            total: '4,528.30',
            shipTo: 'Aman Verma',
            status: 'Delivered 9 February',
            statusDetail: 'Package was handed to resident',
            items: [
                {
                    title: 'ATICX Polyester Full Sleeve Compression High Turtle Neck Sports Jersey T Shirt for Men - Quick Dry Fit Gym Workout Top for Running, Swimming, Training, Cycling, Football, Badminton, Cloud Grey, L',
                    image: 'https://m.media-amazon.com/images/I/71X7VzjKhlL._AC_UL1440_.jpg',
                    returnWindow: 'Return or replace items: Eligible till 19 February 2026',
                    link: '/product/pro_jersey'
                },
                {
                    title: 'OnePlus Buds 3 Truly Wireless Bluetooth Earbuds with Upto 49dB Smart ANC, Hi-Res Sound Quality, Sliding Volume Control, 10mins for 7Hours Fast Charging with Upto 44Hrs Playback (Green)',
                    image: 'https://m.media-amazon.com/images/I/61f1YuwcvIL._AC_SL1500_.jpg',
                    returnWindow: 'Replace item: Eligible till 19 February 2026',
                    link: '/product/pro_buds'
                }
            ]
        }
    ];

    const buyAgain = [
        { title: 'Fiama Body Wash Shower Gel', price: '217.00', image: 'https://m.media-amazon.com/images/I/71cQql7uTaL._AC_SL1500_.jpg' },
        { title: 'Nivia Pro Grip Gym Gloves', price: '466.00', image: 'https://m.media-amazon.com/images/I/71wGjqNKgZL._AC_SL1500_.jpg' },
        { title: 'The Unique Gift Studio Customized Passport Cover', price: '266.00', image: 'https://m.media-amazon.com/images/I/71ZuOx4AJXL._AC_SL1500_.jpg' },
        { title: 'Plantify Plant Food Sticks', price: '389.00', image: 'https://m.media-amazon.com/images/I/81J5CqKT7vL._AC_SL1500_.jpg' }
    ];

    return (
        <div className="orders">
            <div className="orders__breadcrumbs">
                <Link to="/account">Your Account</Link> › <span>Your Orders</span>
            </div>

            <div className="orders__header">
                <h1>Your Orders</h1>
                <div className="orders__search">
                    <span className="orders__searchIcon">🔍</span>
                    <input type="text" placeholder="Search all orders" />
                    <button className="orders__searchBtn">Search Orders</button>
                </div>
            </div>

            <div className="orders__tabs">
                <span className={`orders__tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</span>
                <span className={`orders__tab ${activeTab === 'buy_again' ? 'active' : ''}`} onClick={() => setActiveTab('buy_again')}>Buy Again</span>
                <span className={`orders__tab ${activeTab === 'not_shipped' ? 'active' : ''}`} onClick={() => setActiveTab('not_shipped')}>Not Yet Shipped</span>
                <span className={`orders__tab ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled Orders</span>
            </div>

            <div className="orders__filter">
                <span className="orders__filterLabel"><b>{orders.length} orders</b> placed in</span>
                <select className="orders__filterSelect">
                    <option>past 3 months</option>
                    <option>2026</option>
                    <option>2025</option>
                </select>
            </div>

            <div className="orders__layout">
                <div className="orders__main">
                    {orders.map(order => (
                        <div key={order.id} className="order__card">
                            <div className="order__cardHeader">
                                <div className="order__headerGroup">
                                    <span className="order__headerLabel">ORDER PLACED</span>
                                    <span className="order__headerValue">{order.date}</span>
                                </div>
                                <div className="order__headerGroup">
                                    <span className="order__headerLabel">TOTAL</span>
                                    <span className="order__headerValue">₹{order.total}</span>
                                </div>
                                <div className="order__headerGroup">
                                    <span className="order__headerLabel">SHIP TO</span>
                                    <span className="order__headerValue name-link">{order.shipTo} ⌵</span>
                                </div>
                                <div className="order__headerGroup right">
                                    <span className="order__headerLabel">ORDER # {order.id}</span>
                                    <div className="order__headerLinks">
                                        <Link to="#">View order details</Link>
                                        <span className="separator">|</span>
                                        <Link to="#">Invoice ⌵</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="order__cardBody">
                                <h3 className="order__status">{order.status}</h3>
                                <p className="order__statusDetail">{order.statusDetail}</p>

                                <div className="order__content">
                                    <div className="order__items">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="order__item">
                                                <img src={item.image} alt={item.title} className="order__itemImage" />
                                                <div className="order__itemDetails">
                                                    <Link to={item.link} className="order__itemTitle">{item.title}</Link>
                                                    <p className="order__returnWindow">{item.returnWindow}</p>
                                                    <div className="order__itemActions">
                                                        <button className="order__buyAgainBtn">
                                                            <span className="refresh-icon">↻</span> Buy it again
                                                        </button>
                                                        <button className="order__viewItemBtn">View your item</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order__actions">
                                        <button className="order__actionBtn">Track package</button>
                                        <button className="order__actionBtn">Return or replace items</button>
                                        <button className="order__actionBtn">Share gift receipt</button>
                                        <button className="order__actionBtn">Leave seller feedback</button>
                                        <button className="order__actionBtn">Leave delivery feedback</button>
                                        <button className="order__actionBtn">Write a product review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="orders__sidebar">
                    <div className="orders__buyAgainBox">
                        <h3>Buy it again</h3>
                        {buyAgain.map((item, index) => (
                            <div key={index} className="buyAgain__item">
                                <img src={item.image} alt={item.title} />
                                <div className="buyAgain__details">
                                    <Link to="#" className="buyAgain__title">{item.title}</Link>
                                    <span className="buyAgain__price">₹{item.price}</span>
                                    <button className="buyAgain__addToCartBtn">Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
