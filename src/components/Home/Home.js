import React from 'react';
import './Home.css';
import Product from '../Product/Product';

const Home = () => {
    return (
        <div className="home">
            <img
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
                className="home_image"
            />
            <div className="home__row">
                <Product
                    id="pro1"
                    title="SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls."
                    price={11.96}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/511G0DPMuQL._AC_SY450_.jpg"
                />
                <Product
                    id="pro2"
                    title="Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display."
                    price={90.90}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/71mbZF8PT1L._AC_SX522_.jpg"
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro3"
                    title="Woodlab Furniture Sheesham Wood Armchairs Outdoor Sofa Chairs for Living Room Dining Chiar for Home."
                    price={34.96}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/81wxVhDsO3L._AC_SX569_.jpg"
                />
                <Product
                    id="pro4"
                    title="Hero Kyoto 26T Single Speed Mountain Bike (Black, Ideal For : 12+ Years )."
                    price={400.96}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/91gEELfSWkL._AC_SX425_.jpg"
                />
                <Product
                    id="pro5"
                    title="HEEDERIN Men's Comfortable Mesh Lace up Sport Shoe."
                    price={20.56}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Rv6EJ76eL._AC_UY500_.jpg"
                />
            </div>
            <div className="home__row">
                <Product
                    id="pro6"
                    title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey."
                    price={800.66}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/71pC69I3lzL._AC_SX342_.jpg"
                />
            </div>
        </div>
    )
}

export default Home;
