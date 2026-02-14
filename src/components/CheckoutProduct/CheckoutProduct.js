import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './CheckoutProduct.css';
import { useStateValue } from '../../StateProvider';



const CheckoutProduct = ({ id, title, price, rating, image }) => {

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
                    sx={{ margin: 1 }}
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
