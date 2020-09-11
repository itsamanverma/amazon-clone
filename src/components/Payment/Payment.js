import React from 'react';
import './Payment.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';

const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="payment">
            <div className="payment__container">
                {/* payment section - delivery address  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>ck 65/60 ,3 Badi Piyari </p>
                        <p>Varanasi, Uttar Pradesh 221001</p>
                    </div>
                </div>

                {/* payment section - Reviews Items  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {/* product items */}
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
                </div>

                {/* payment section - Payment method  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stricp for payment details */}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
