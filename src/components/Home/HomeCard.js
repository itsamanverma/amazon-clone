import React from 'react';
import './HomeCard.css';

function HomeCard({ title, items, linkText }) {
    return (
        <div className="homeCard">
            <h2 className="homeCard__title">{title}</h2>
            <div className="homeCard__grid">
                {items.map((item, index) => (
                    <div key={index} className="homeCard__item">
                        <img src={item.image} alt={item.title} className="homeCard__image" />
                        <p className="homeCard__label">{item.title}</p>
                    </div>
                ))}
            </div>
            <p className="homeCard__link">{linkText}</p>
        </div>
    );
}

export default HomeCard;
