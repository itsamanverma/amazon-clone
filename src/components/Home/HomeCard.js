import React from 'react';
import './HomeCard.css';

import { Link } from 'react-router-dom';

function HomeCard({ id, title, items, linkText, link }) {
    // Handle broken images with fallback
    const handleImageError = (e, fallbackTitle) => {
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.background = '#f0f0f0';
        e.target.nextElementSibling.style.display = 'flex';
        e.target.nextElementSibling.style.alignItems = 'center';
        e.target.nextElementSibling.style.justifyContent = 'center';
        e.target.nextElementSibling.style.minHeight = '120px';
        e.target.nextElementSibling.style.color = '#888';
        e.target.nextElementSibling.innerHTML = `📷 ${fallbackTitle}`;
    };

    return (
        <div className="homeCard">
            <h2 className="homeCard__title">{title}</h2>
            <div className="homeCard__grid">
                {items.map((item, index) => (
                    <Link to={item.link || link || '#'} key={index} className="homeCard__itemLink">
                        <div className="homeCard__item">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="homeCard__image"
                                onError={(e) => handleImageError(e, item.title)}
                                loading="lazy"
                            />
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
