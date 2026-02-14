import React from 'react';
import './Home.css';
import Product from '../Product/Product';
import HomeCard from './HomeCard';
import products from '../../utils/productData';

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const banners = [
        "/images/banner_fashion.png",
        "/images/banner_electronics.png",
        "/images/banner_appliances.png"
    ];

    // Dummy data for Home Cards
    const card1 = [
        { title: "Samsung Galaxy A55", image: "/images/card_smartphone.png", link: "/product/pro4" },
        { title: "iPhone 17 Pro Max", image: "/images/card_iphone.png", link: "/product/pro5" },
        { title: "Samsung Galaxy A35", image: "/images/card_samsung_a35.png", link: "/product/pro4" },
        { title: "Samsung Galaxy M56", image: "/images/card_samsung_m56.png", link: "/product/pro4" }
    ];

    const card2 = [
        { title: "Appliances", image: "/images/banner_appliances.png", link: "/category/home" },
        { title: "Men's Fashion", image: "/images/pro_shoes.png", link: "/category/fashion" },
        { title: "Smartwatches", image: "/images/apple_watch_ultra.png", link: "/product/pro2" },
        { title: "Keyboards", image: "/images/card_keyboard.png", link: "/category/electronics" }
    ];

    const card3 = [
        { title: "Furniture", image: "/images/pro_armchair.png", link: "/product/pro3" },
        { title: "Headphones", image: "/images/pro_headphones.png", link: "/product/pro1" },
        { title: "Kitchen Appliances", image: "/images/banner_appliances.png", link: "/category/home" },
        { title: "Screen Guards", image: "/images/card_iphone.png", link: "/category/mobiles" }
    ];

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

    // Helper to render a Product component
    const renderProduct = (product) => (
        <Product
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            image={product.image}
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
            <div className="home__container">
                <div className="home__slider">
                    {banners.map((img, index) => (
                        <div
                            key={index}
                            className={`home__slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            <img
                                className="home__image"
                                src={img}
                                alt={`Banner ${index + 1}`}
                            />
                        </div>
                    ))}

                    <button className="home__arrow home__arrow--left" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="home__arrow home__arrow--right" onClick={nextSlide}>
                        &#10095;
                    </button>
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
        </div>
    )
}

export default Home;
