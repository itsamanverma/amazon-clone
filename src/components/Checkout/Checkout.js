import React from 'react';
import './Checkout.css';
import { useStateValue } from '../../StateProvider';

const Checkout = () => {
    const [{ basket }] = useStateValue();
    console.log(basket);

    return (
        <div className="checkout">
            <img
                className="checkout__ad"
                src={require('../../assests/checkout.jpg')}
                alt=""
            />
            {basket?.length === 0 ? (
                <div className="checkout__empty">
                    <h4>Your Shopping Basket is Empty</h4>
                    <p>you have no items in your basket,so shop the items</p>
                </div>
            ):(
                <div className="checkout__basket">
                    <h3>Your shopping basket with items</h3>
                </div>
            )}
        </div>
    )
}

export default Checkout;
