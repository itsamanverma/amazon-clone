import React from 'react';
import './Checkout.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

const Checkout = () => {
    const [{ basket }] = useStateValue();
    console.log("checkout" + basket);

    return (
        <div className="checkout">
            <div className="checkout__left">
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
                ) : (
                        <div>
                            <h4 className="checkout__title">Your shopping basket with items</h4>
                            {basket.map((item, index) => (
                                <CheckoutProduct key={index}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Checkout;
