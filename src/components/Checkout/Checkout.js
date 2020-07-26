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
                        <h2>Your Shopping Basket is Empty</h2>
                        <p>you have no items in your basket,so shop the items</p>
                    </div>
                ) : (
                        <div>
                            <h2 className="checkout__title">Shopping Cart</h2>
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
            {basket.length > 0 && (
                <div className="checkout__right">
                    <h2>SubTotal</h2>
                </div>
            )}
        </div>
    );
}

export default Checkout;
