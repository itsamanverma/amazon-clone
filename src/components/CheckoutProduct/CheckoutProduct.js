import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './CheckoutProduct.css';
import { useStateValue } from '../../StateProvider';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const CheckoutProduct = ({ id, title, price, rating, image }) => {

    const classes = useStyles();

    const [{ basket }, dispatch] = useStateValue();
    // console.log("checkoutProduct" + id, title, price, rating, image);

    console.log(basket);

    const removeItem = () => {
        //remove the item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    };

    return (
        <div className="checkoutProduct" key={id}>
            <img className="checkoutProduct__image" src={image} alt="" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {
                        Array(rating).fill().map((_, index) => (
                            <p key={index}><span role="img" aria-label="star">🌟</span></p>
                        ))
                    }
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={removeItem}
                >
                    Remove Item
                </Button>
            </div>
        </div>
    )
}

export default CheckoutProduct;
