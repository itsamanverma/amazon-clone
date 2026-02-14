import React from 'react';
import './Subtotal.css';
import { NumericFormat } from 'react-number-format';
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import { useNavigate } from 'react-router-dom';


const Subtotal = () => {

    const navigate = useNavigate();
    const [{ basket },] = useStateValue();

    return (
        <div className='subtotal'>
            <NumericFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} item): <strong>{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input
                                type="checkbox"
                            /> this order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button 
                variant="outlined" 
                color="primary" 
                className="subtotal__button"
                onClick={ e => navigate('/payment')}
            >
                Process To Checkout
            </button>
        </div>
    )
}

export default Subtotal;
