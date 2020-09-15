import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import axios from 'axios';



const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();


    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        /* generate the special stripe secret which allows us to change a customer1 */
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                /* stripe expects the total in a currencies subunits */
                url: `/payments/create?total=${getBasketTotal(basket) * 100 }`
            });

            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]);

    console.log(" the client Secret>>>> ", clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault(); //this stop the refresh
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement) 
            }
        }).then(({paymentIntent}) => {
            /* paymentIntent = payment Confirmation */
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        }) 
    }

    const handleChance = event => {
        event.preventDefault(); //this stop the refresh
        /* Listen for changes in the CardElement 
           & dieplay any error as the customer types their card details*/
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChance} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {`${value}`}</h3>
                                    )}

                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                        </form>
                        {/* Error */}
                        {error && <div>{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
