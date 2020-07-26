import React from 'react'

function CheckoutProduct({ id, title, price, rating, image }) {
    return (
        <div className="checkoutProduct">
            <img src={image} alt="" />
        </div>
    )
}

export default CheckoutProduct
