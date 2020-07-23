import React from 'react';
import './Product.css';

const Product = ({ id, title, price, rating, image }) => {
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
                        Array(rating).fill().map((_) => (
                            <p>⭐</p>
                        ))
                    }
                </div>
            </div>
            <img src={image} alt="" />
            <button>Add To Basket</button>
        </div>
    )
}

export default Product
 