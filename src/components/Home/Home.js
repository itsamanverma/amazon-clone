import React from 'react';
import './Home.css';
import Product from '../Product/Product';

const Home = () => {
    return (
        <div className="home">
            <img
                src={require("../../assests/amazon-banner.png")}
                alt=""
                className="home_image"
            />
            <div className="home__row">
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
                <Product
                    id="pro2"
                    title="Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display."
                    price={50.96}
                    rating={4}
                    image={require('../../assests/pro8.jpg')}
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro3"
                    title="Woodlab Furniture Sheesham Wood Armchairs Outdoor Sofa Chairs for Living Room Dining Chiar for Home."
                    price={14.96}
                    rating={3}
                    image={require('../../assests/pro3.jpg')}
                />
                <Product
                    id="pro4"
                    title="Hero Kyoto 26T Single Speed Mountain Bike (Black, Ideal For : 12+ Years )."
                    price={40.96}
                    rating={4}
                    image={require('../../assests/pro4.jpg')}
                />
                <Product
                    id="pro5"
                    title="HEEDERIN Men's Comfortable Mesh Lace up Sport Shoe."
                    price={20.56}
                    rating={4}
                    image={require('../../assests/pro5.jpg')}
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro6"
                    title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey."
                    price={800.66}
                    rating={4}
                    image={require('../../assests/pro6.jpg')}
                />
            </div>
        </div>
    )
}

export default Home;
