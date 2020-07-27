import React from 'react';
import './Subtotal.css';
import Button from '@material-ui/core/Button';
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
            <Button variant="outlined" color="primary">
                Buy Now
            </Button>
        </div>
    )
}

export default Subtotal;
