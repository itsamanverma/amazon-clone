import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider';

const Subtotal = () => {

    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className='subtotal'>
            <CurrencyFormat
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
                value={0}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button variant="outlined" color="primary" className="subtotal__button">
                Buy Now
            </button>
        </div>
    )
}

export default Subtotal;
