import React from 'react';
import './Home.css';
import Product from '../Product/Product';

const Home = () => {
    return (
        <div className="home">
            <img
                src={require("../../assests/amazon-banner6.jpeg")}
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
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image={require('../../assests/pro1.jpg')}
                />
            </div>
        </div>
    )
}

export default Home;
