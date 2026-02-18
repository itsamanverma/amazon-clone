import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import ProductViewer3D from '../ProductViewer3D/ProductViewer3D';
import './Product.css';
import { useStateValue } from '../../StateProvider';

/**
 * Enhanced Product component with 3D image viewing
 * Now uses ProductViewer3D for better visual experience with multiple angles
 */
const Product = ({ 
    id, 
    title, 
    price, 
    rating, 
    image, 
    images = [], 
    imageAngles = {}, 
    category = 'product',
    tags = [],
    featured = false 
}) => {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        // Validation: Check if item already exists in basket
        const isItemInBasket = basket.some(item => item.id === id);

        if (isItemInBasket) {
            alert("This item is already in your cart!");
            return;
        }

        // Add item to basket
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            }
        });
    };

    // Create product object for 3D viewer
    const productFor3D = {
        id,
        title,
        image,
        images,
        imageAngles,
        category,
        tags
    };

    return (
        <div className={`product ${featured ? 'product--featured' : ''}`}>
            <Link 
                to={`/product/${id}`} 
                style={{ 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1, 
                    width: '100%' 
                }}
            >
                {/* 3D Product Viewer - List Mode */}
                <div className="product__image-container">
                    <ProductViewer3D
                        product={productFor3D}
                        mode="list"
                        size="small"
                        autoRotate={false}
                    />
                </div>
                
                <div className="product__info">
                    <h3 className="product__title">{title}</h3>
                    <p className="product__price">
                        <small>₹</small>
                        <strong>{price?.toLocaleString('en-IN') || 'N/A'}</strong>
                    </p>
                    <div className="product__rating">
                        {Array(Math.max(0, Math.min(5, rating || 0))).fill().map((_, index) => (
                            <span key={index} className="star" role="img" aria-label="star">★</span>
                        ))}
                        {rating && (
                            <span className="product__rating-count">({rating})</span>
                        )}
                    </div>
                </div>
            </Link>
            
            <Button
                color="primary"
                sx={{ margin: 1 }}
                endIcon={<Icon>add_shopping_cart</Icon>}
                onClick={addToBasket}
                variant="contained"
                disabled={!id} // Prevent adding if no valid ID
            >
                Add To Basket
            </Button>
        </div>
    );
};

export default Product;
