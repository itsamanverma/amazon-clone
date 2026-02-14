import React from 'react';
import './Home.css';
import Product from '../Product/Product';
import HomeCard from './HomeCard';

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const banners = [
        "/images/banner_fashion.png",
        "/images/banner_electronics.png",
        "/images/banner_appliances.png"
    ];

    // Dummy data for Home Cards
    const card1 = [
        { title: "Samsung Galaxy A55", image: "/images/card_smartphone.png" },
        { title: "iPhone 17 Pro Max", image: "/images/card_iphone.png" },
        { title: "Samsung Galaxy A35", image: "/images/card_samsung_a35.png" },
        { title: "Samsung Galaxy M56", image: "/images/card_samsung_m56.png" }
    ];

    const card2 = [
        { title: "Appliances", image: "/images/banner_appliances.png" },
        { title: "Men's Fashion", image: "/images/pro_shoes.png" },
        { title: "Smartwatches", image: "/images/apple_watch_ultra.png" },
        { title: "Keyboards", image: "/images/card_keyboard.png" }
    ];

    const card3 = [
        { title: "Furniture", image: "/images/pro_armchair.png" },
        { title: "Headphones", image: "/images/pro_headphones.png" },
        { title: "Kitchen Appliances", image: "/images/banner_appliances.png" },
        { title: "Screen Guards", image: "/images/card_iphone.png" }
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
                    <HomeCard title="Pick up where you left off" items={card1} linkText="See more" />
                    <HomeCard title="Keep shopping for" items={card2} linkText="View your browsing history" />
                    <HomeCard title="Categories to explore" items={card3} linkText="See more" />
                    <HomeCard title="Electronics & Accessories" items={card1} linkText="See all offers" />
                </div>
            </div>
            <div className="home__row">
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={1196.00}
                    rating={5}
                    image="/images/pro_headphones.png"
                />
                <Product
                    id="pro2"
                    title="Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display."
                    price={20500.00}
                    rating={4}
                    image="/images/apple_watch_ultra.png"
                />
                <Product
                    id="pro3"
                    title="Woodlab Furniture Sheesham Wood Armchairs Outdoor Sofa Chairs for Living Room Dining Chiar for Home."
                    price={3500.00}
                    rating={3}
                    image="/images/pro_armchair.png"
                />
                <Product
                    id="pro4"
                    title="Hero Kyoto 26T Single Speed Mountain Bike (Black, Ideal For : 12+ Years )."
                    price={4999.00}
                    rating={4}
                    image="/images/pro_bike.png"
                />
                <Product
                    id="pro5"
                    title="HEEDERIN Men's Comfortable Mesh Lace up Sport Shoe."
                    price={799.00}
                    rating={4}
                    image="/images/pro_shoes.png"
                />
                <Product
                    id="pro6"
                    title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey."
                    price={189900.00}
                    rating={4}
                    image="/images/pro_macbook.png"
                />
            </div>
        </div>
    )
}

export default Home;
