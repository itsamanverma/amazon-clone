import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Product.css';
import { useStateValue } from '../../StateProvider';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const Product = ({ id, title, price, rating, image }) => {

    const classes = useStyles();
    const [{ basket }, dispatch] = useStateValue();

    console.log(basket);

    const addToBasket = () => {
        //add item to basket
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            }
        })

    }

    return (
        <div className="product" key={id}>
            <div className="project__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating).fill().map((_, index) => (
                            <p key={index}><span role="img" aria-label="star">🌟</span></p>
                        ))
                    }
                </div>
            </div>
            <img src={image} alt="" />
            {/* <button>Add To Basket</button> */}
            <Button
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                onClick={addToBasket}
                variant="contained"
            >
                Add To Basket
            </Button>
        </div>
    )
}

export default Product;
