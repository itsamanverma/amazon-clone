import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import './Product.css';
import { useStateValue } from '../../StateProvider';

const Product = ({ id, title, price, rating, image, featured = false }) => {

    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        // Validation: Check if item already exists in basket
        const isItemInBasket = basket.some(item => item.id === id);

        if (isItemInBasket) {
            alert("This item is already in your cart!");
            return;
        }

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
        <div className={`product ${featured ? 'product--featured' : ''}`}>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                <img src={image} alt={title} />
                <div className="product__info">
                    <h3 className="product__title">{title}</h3>
                    <p className="product__price">
                        <small>₹</small>
                        <strong>{price}</strong>
                    </p>
                    <div className="product__rating">
                        {Array(rating).fill().map((_, index) => (
                            <span key={index} className="star" role="img" aria-label="star">★</span>
                        ))}
                    </div>
                </div>
            </Link>
            <Button
                color="primary"
                sx={{ margin: 1 }}
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
