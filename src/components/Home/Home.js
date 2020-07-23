import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <img
                src={require("../../assests/amazon-banner6.jpeg")}
                alt=""
                className="home_image"
            />
        </div>
    )
}

export default Home;
