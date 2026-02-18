import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../utils/productData';
import Product from '../../components/Product/Product';
import './SearchResults.css';

function SearchResults() {
    const { query } = useParams();

    // Simple search filtering
    const results = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );

    return (
        <div className="searchResults">
            <div className="searchResults__info">
                <p>1-{results.length} of {results.length} results for <span className="searchResults__query">"{query}"</span></p>
            </div>

            {results.length === 0 ? (
                <div className="searchResults__noResults">
                    <p>No products found matching your search.</p>
                </div>
            ) : (
                <div className="searchResults__grid">
                    {results.map(item => (
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
            )}
        </div>
    );
}

export default SearchResults;
