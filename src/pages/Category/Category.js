import React from 'react';
import './Category.css';
import { useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import products from '../../utils/productData';

function Category() {
    const { categoryName } = useParams();

    // Human readable title
    const displayCategory = categoryName?.replace(/-/g, ' ');

    // Filter products based on category or tags
    const filteredProducts = products.filter(item =>
        item.category === categoryName ||
        (item.tags && item.tags.includes(categoryName))
    );

    // Placeholder for non-product pages linked in header
    if (['customer-service', 'sell'].includes(categoryName)) {
        return (
            <div className="category">
                <h2 className="category__title">{displayCategory}</h2>
                <div className="category__noResults">
                    <p>Welcome to {displayCategory}. This section is currently under construction.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="category">
            <h2 className="category__title">{displayCategory}</h2>

            {/* Show products if any found */}
            {filteredProducts.length > 0 ? (
                <div className="category__row">
                    {filteredProducts.map(item => (
                        <Product
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))}
                </div>
            ) : (
                <div className="category__noResults">
                    <p>No products found for "{displayCategory}" yet.</p>
                </div>
            )}
        </div>
    );
}

export default Category;
