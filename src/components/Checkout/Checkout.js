import React from 'react';
import './Checkout.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import Subtotal from '../Subtotal/Subtotal';

const Checkout = () => {
    const [{ basket, user }] = useStateValue();
    console.log("checkout" + basket);

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                {basket?.length === 0 ? (
                    <div className="checkout__empty">
                        <h2>Your Shopping Basket is Empty</h2>
                        <p>you have no items in your basket,so shop the items</p>
                    </div>
                ) : (
                        <div>
                            <h3 className="checkout__header">Hello, {!user ? 'Guest' : user.email}</h3>
                            <h2 className="checkout__title">Your Shopping Basket</h2>
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
                    <Subtotal />
                </div>
            )}
        </div>  
    );
}

export default Checkout;
