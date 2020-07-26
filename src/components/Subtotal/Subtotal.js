import React from 'react';
import './Subtotal.css';
import Button from '@material-ui/core/Button';
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Subtotal = () => {

    const [{ basket }, dispatch] = useStateValue();

    const getBasketTotal = (basket) => {

    }

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
                            {/* <FormControlLabel
                                control={<Checkbox icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} name="checked" />}
                                label="This Order Contains a gift"
                                className="subtotal__checkbox"
                            /> */}
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
