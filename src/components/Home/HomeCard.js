import React from 'react';
import './HomeCard.css';

import { Link } from 'react-router-dom';

function HomeCard({ id, title, items, linkText, link }) {
    return (
        <div className="homeCard">
            <h2 className="homeCard__title">{title}</h2>
            <div className="homeCard__grid">
                {items.map((item, index) => (
                    <Link to={item.link || link || '#'} key={index} className="homeCard__itemLink">
                        <div className="homeCard__item">
                            <img src={item.image} alt={item.title} className="homeCard__image" />
                            <p className="homeCard__label">{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to={link || '#'} className="homeCard__link">{linkText}</Link>
        </div>
    );
}

export default HomeCard;
