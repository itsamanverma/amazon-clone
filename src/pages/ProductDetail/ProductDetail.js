import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import products from '../../utils/productData';
import { useStateValue } from '../../StateProvider';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [{ basket }, dispatch] = useStateValue();
    const [mainImage, setMainImage] = useState('');
    const [selectedThumbnail, setSelectedThumbnail] = useState(0);

    useEffect(() => {
        const found = products.find(p => p.id === productId);
        if (found) {
            setProduct(found);
            setMainImage(found.image);
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }, [productId]);

    const addToBasket = () => {
        // Validation: Check if item already exists in basket
        const isItemInBasket = basket.some(item => item.id === product.id);

        if (isItemInBasket) {
            alert("This item is already in your cart!");
            return;
        }

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                rating: product.rating,
            },
        });
    };

    if (!product) return <div className="productDetail__loading">Loading...</div>;

    // Use product.images if available, otherwise fallback to repeating main image
    const images = product.images && product.images.length > 0
        ? product.images
        : [product.image, product.image, product.image, product.image];

    const features = [
        "Experience premium quality with exceptional durability.",
        "Designed for high performance and everyday utility.",
        "Verified by Amazon for quality assurance.",
        "Includes standard manufacturer warranty.",
        "Available in multiple configurations."
    ];

    return (
        <div className="productDetail">
            <div className="productDetail__container">
                {/* Left Column: Gallery */}
                <div className="productDetail__gallery">
                    <div className="productDetail__thumbnails">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`productDetail__thumbnail ${selectedThumbnail === index ? 'selected' : ''}`}
                                onMouseEnter={() => {
                                    setMainImage(img);
                                    setSelectedThumbnail(index);
                                }}
                            >
                                <img src={img} alt="" />
                            </div>
                        ))}
                        {/* Mock Video Thumbnail */}
                        <div className="productDetail__thumbnail video">
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555' }}>VIDEO</span>
                        </div>
                    </div>
                    <div className="productDetail__mainImageContainer">
                        <img src={mainImage} alt={product.title} className="productDetail__mainImage" />
                    </div>
                </div>

                {/* Middle Column: Info */}
                <div className="productDetail__info">
                    <div className="productDetail__breadcrumb">{product.category} › {product.tags?.[0]}</div>

                    <h1 className="productDetail__title">{product.title}</h1>

                    <div className="productDetail__rating">
                        <span className="productDetail__stars">
                            {Array(product.rating).fill().map((_, i) => (
                                <StarIcon key={i} className="star-icon" />
                            ))}
                        </span>
                        <span className="productDetail__reviewCount">4.5 (1,280 ratings)</span>
                    </div>

                    <div className="productDetail__divider"></div>

                    <div className="productDetail__priceBlock">
                        <div className="productDetail__dealBadge">Deal of the Day</div>
                        <div className="productDetail__priceRow">
                            <span className="productDetail__currency">₹</span>
                            <span className="productDetail__priceValue">{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="productDetail__mrp">
                            M.R.P.: <span>₹{(product.price * 1.2).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="productDetail__taxes">Inclusive of all taxes</div>
                    </div>

                    <div className="productDetail__divider"></div>

                    <div className="productDetail__offers">
                        <div className="productDetail__offerHeader">Offers</div>
                        <div className="productDetail__offerCard">
                            <strong>Bank Offer</strong>
                            <p>Upto ₹1,500.00 discount on select Credit Cards</p>
                        </div>
                    </div>

                    <div className="productDetail__divider"></div>

                    <div className="productDetail__about">
                        <h3>About this item</h3>
                        <ul className="productDetail__features">
                            {features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Buy Box */}
                <div className="productDetail__buyBox">
                    <div className="productDetail__priceRow">
                        <span className="productDetail__currency">₹</span>
                        <span className="productDetail__priceValue">{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="productDetail__delivery">
                        FREE delivery <strong>Tomorrow, 8 AM - 12 PM</strong>.
                    </div>
                    <div className="productDetail__location">
                        <LocationOnIcon style={{ fontSize: 16 }} /> Deliver to User - Pincode
                    </div>
                    <h3 className="productDetail__stockStatus">In stock</h3>

                    <button className="productDetail__addToCartBtn" onClick={addToBasket}>Add to Cart</button>
                    <button className="productDetail__buyNowBtn">Buy Now</button>

                    <div className="productDetail__secure">
                        <LockIcon style={{ fontSize: 14 }} /> Secure transaction
                    </div>

                    <div className="productDetail__seller">
                        Sold by <strong>Appario Retail Private Ltd</strong> and Fulfilled by Amazon.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
