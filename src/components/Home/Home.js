import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <img 
                src={require("../../assests/amazon-banner.jpeg")} 
                alt=""
                className="home_image" 
            />
        </div>
    )
}

export default Home;
