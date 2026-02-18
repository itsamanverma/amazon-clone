import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from '../Product/Product';
import HomeCard from './HomeCard';
import ImageSourceController from '../ImageSourceController/ImageSourceController';
import productService from '../../services/productService';
import bannerService from '../../services/bannerService';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [banners, setBanners] = useState([]);
    const [bannersLoading, setBannersLoading] = useState(true);

    // Handle banner image errors
    const handleBannerError = (e, index) => {
        console.warn(`Banner ${index + 1} failed to load, using fallback`);
        e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><defs><linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23grad${index})"/><text x="600" y="180" text-anchor="middle" font-size="32" fill="white" font-family="Arial, sans-serif">🛒 Amazon Clone</text><text x="600" y="220" text-anchor="middle" font-size="18" fill="white" opacity="0.9" font-family="Arial, sans-serif">Discover Amazing Products</text></svg>`;
    };

    // Fallback banners in case AI generation fails completely
    const fallbackBanners = [
        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23grad1)"/><text x="600" y="180" text-anchor="middle" font-size="32" fill="white" font-family="Arial, sans-serif">🛒 Welcome to Amazon Clone</text><text x="600" y="220" text-anchor="middle" font-size="18" fill="white" opacity="0.9" font-family="Arial, sans-serif">Best Deals on Electronics</text></svg>`,
        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23f093fb;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f5576c;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23grad2)"/><text x="600" y="180" text-anchor="middle" font-size="32" fill="white" font-family="Arial, sans-serif">📱 Latest Mobiles</text><text x="600" y="220" text-anchor="middle" font-size="18" fill="white" opacity="0.9" font-family="Arial, sans-serif">Cutting-edge Technology</text></svg>`,
        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234facfe;stop-opacity:1" /><stop offset="100%" style="stop-color:%2300f2fe;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23grad3)"/><text x="600" y="180" text-anchor="middle" font-size="32" fill="white" font-family="Arial, sans-serif">🏠 Home & Kitchen</text><text x="600" y="220" text-anchor="middle" font-size="18" fill="white" opacity="0.9" font-family="Arial, sans-serif">Transform Your Space</text></svg>`
    ];

    // Load dynamic banners on component mount
    useEffect(() => {
        let isMounted = true;
        
        const loadDynamicBanners = async () => {
            try {
                setBannersLoading(true);
                console.log('🤖 Starting Gemini Pro AI banner generation...');
                
                // Set a longer timeout for real AI generation
                const TIMEOUT_MS = 30000; // 30 seconds for AI generation
                
                const bannerPromise = bannerService.generateDynamicBanners();
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('AI banner generation timeout')), TIMEOUT_MS)
                );
                
                const dynamicBanners = await Promise.race([bannerPromise, timeoutPromise]);
                
                if (isMounted) {
                    setBanners(dynamicBanners);
                    console.log('✅ Gemini AI banners loaded successfully:', dynamicBanners.length);
                    console.log('🚀 NO UNSPLASH URLs - All AI generated!');
                }
                
            } catch (err) {
                console.error('❌ Failed to generate AI banners:', err);
                if (isMounted) {
                    // Use SVG fallback banners if AI generation fails
                    setBanners(fallbackBanners);
                    console.log('🔄 Using SVG fallback banners (NO UNSPLASH):', fallbackBanners.length);
                }
            } finally {
                if (isMounted) {
                    setBannersLoading(false);
                }
            }
        };

        loadDynamicBanners();
        
        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    // Load products on component mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const enhancedProducts = await productService.getAllProducts();
                setProducts(enhancedProducts);
                setError(null);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Dummy data for Home Cards - Using verified working images
    const card1 = [
        { title: "Samsung Galaxy A55", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center", link: "/product/pro4" },
        { title: "iPhone 17 Pro Max", image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY327_FMwebp_QL65_.jpg", link: "/product/pro5" },
        { title: "Samsung Galaxy A35", image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&h=300&fit=crop&crop=center", link: "/product/pro4" },
        { title: "Samsung Galaxy M56", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop&crop=center", link: "/product/pro4" }
    ];

    const card2 = [
        { title: "Appliances", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=300&fit=crop&crop=center", link: "/category/home" },
        { title: "Men's Fashion", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=300&h=300&fit=crop&crop=center", link: "/category/fashion" },
        { title: "Smartwatches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center", link: "/product/pro2" },
        { title: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center", link: "/category/electronics" }
    ];

    const card3 = [
        { title: "Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center", link: "/product/pro3" },
        { title: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center", link: "/product/pro1" },
        { title: "Home & Garden", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center", link: "/category/home" },
        { title: "Screen Guards", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center", link: "/category/mobiles" }
    ];

    // Auto-rotation for dynamic banners
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // Helper to render a Product component with 3D image support
    const renderProduct = (product) => (
        <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            image={product.image}
            images={product.images}
            imageAngles={product.imageAngles}
            category={product.category}
            tags={product.tags}
        />
    );

    // Filter products by category
    const electronics = products.filter(p => p.category === "electronics");
    const mobiles = products.filter(p => p.category === "mobiles");
    const fashion = products.filter(p => p.category === "fashion");
    const home = products.filter(p => p.category === "home" || p.category === "furniture");
    const sports = products.filter(p => p.category === "sports");

    return (
        <div className="home">
            {/* Image Source Controller */}
            <ImageSourceController />
            
            {/* Loading State */}
            {loading && (
                <div className="home__loading">
                    <div className="home__loadingSpinner">
                        <div className="spinner"></div>
                        <p>Loading enhanced products with 3D images...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="home__error">
                    <div className="home__errorMessage">
                        <h3>⚠️ {error}</h3>
                        <button onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content - Only show when not loading */}
            {!loading && !error && (
                <>
                    <div className="home__container">
                        <div className="home__slider">
                            {bannersLoading ? (
                                <div className="home__bannerLoading">
                                    <div className="home__bannerLoadingContent">
                                        <div className="spinner"></div>
                                        <p>🤖 Generating AI banners with Gemini Pro...</p>
                                        <small>Creating unique images & uploading to Firebase</small>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {banners.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`home__slide ${index === currentSlide ? 'active' : ''}`}
                                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                        >
                                            <img
                                                className="home__image"
                                                src={img}
                                                alt={`AI Generated Banner ${index + 1}`}
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                decoding="async"
                                                onError={(e) => handleBannerError(e, index)}
                                            />
                                        </div>
                                    ))}

                                    {banners.length > 1 && (
                                        <>
                                            <button className="home__arrow home__arrow--left" onClick={prevSlide}>
                                                &#10094;
                                            </button>
                                            <button className="home__arrow home__arrow--right" onClick={nextSlide}>
                                                &#10095;
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Gateway Cards Grid */}
                        <div className="home__grid">
                            <HomeCard title="Pick up where you left off" items={card1} linkText="See more" link="/category/mobiles" />
                            <HomeCard title="Keep shopping for" items={card2} linkText="View your browsing history" link="/profile" />
                            <HomeCard title="Categories to explore" items={card3} linkText="See more" link="/category/prime" />
                            <HomeCard title="Electronics & Accessories" items={card1} linkText="See all offers" link="/category/electronics" />
                        </div>
                    </div>

            {/* Product Rows */}
            {/* Electronics (Split into rows if many) */}
            <h3 className="home__rowTitle">Best Sellers in Electronics</h3>
            <div className="home__row">
                {electronics.slice(0, 4).map(renderProduct)}
            </div>
            {electronics.length > 4 && (
                <div className="home__row">
                    {electronics.slice(4, 8).map(renderProduct)}
                </div>
            )}

            {/* Mobiles */}
            <h3 className="home__rowTitle">Latest Mobiles</h3>
            <div className="home__row">
                {mobiles.slice(0, 4).map(renderProduct)}
            </div>
            {mobiles.length > 4 && (
                <div className="home__row">
                    {mobiles.slice(4, 8).map(renderProduct)}
                </div>
            )}

            {/* Fashion */}
            <h3 className="home__rowTitle">Fashion & Accessories</h3>
            <div className="home__row">
                {fashion.slice(0, 4).map(renderProduct)}
            </div>
            {fashion.length > 4 && (
                <div className="home__row">
                    {fashion.slice(4, 8).map(renderProduct)}
                </div>
            )}

            {/* Home & Kitchen */}
            <h3 className="home__rowTitle">Home & Kitchen Essentials</h3>
            <div className="home__row">
                {home.slice(0, 4).map(renderProduct)}
            </div>
            {home.length > 4 && (
                <div className="home__row">
                    {home.slice(4, 8).map(renderProduct)}
                </div>
            )}

            {/* Sports filters */}
            {sports.length > 0 && (
                <>
                    <h3 className="home__rowTitle">Sports & Outdoors</h3>
                    <div className="home__row">
                        {sports.map(renderProduct)}
                    </div>
                </>
            )}
                </>
            )}
        </div>
    )
}

export default Home;
