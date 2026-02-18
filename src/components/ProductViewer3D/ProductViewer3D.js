import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './ProductViewer3D.css';

const ProductViewer3D = ({
    product,
    currentAngle = 'front',
    onAngleChange,
    mode = 'list', // 'list' or 'detail'
    autoRotate = false,
    size = 'medium' // small, medium, large
}) => {
    const [activeAngle, setActiveAngle] = useState(currentAngle);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentImageSrc, setCurrentImageSrc] = useState('');
    const [fallbackAttempts, setFallbackAttempts] = useState(0);

    const angles = useMemo(() => mode === 'detail' ? [
        { key: 'front', label: 'Front' },
        { key: 'side', label: 'Side' },
        { key: 'back', label: 'Back' },
        { key: 'top', label: 'Top' },
        { key: 'detail', label: 'Detail' }
    ] : [
        { key: 'front', label: 'Front View' }
    ], [mode]);

    const getCurrentImageUrl = useCallback(() => {
        // Primary: Try imageAngles for specific angle
        if (product.imageAngles && product.imageAngles[activeAngle]) {
            return product.imageAngles[activeAngle];
        }
        
        // Secondary: Try images array
        if (product.images && product.images.length > 0) {
            const angleIndex = angles.findIndex(angle => angle.key === activeAngle);
            if (angleIndex >= 0 && angleIndex < product.images.length) {
                return product.images[angleIndex];
            }
            return product.images[0]; // First image as fallback
        }
        
        // Tertiary: Try main image
        if (product.image) {
            return product.image;
        }
        
        // Final fallback: Placeholder
        return `https://via.placeholder.com/600x600/f0f0f0/999999?text=${encodeURIComponent(product.title?.substring(0, 20) || 'Product')}`;
    }, [product, activeAngle, angles]);

    // Update image source when angle changes
    useEffect(() => {
        setCurrentImageSrc(getCurrentImageUrl());
        setImageLoaded(false);
        setImageError(false);
        setFallbackAttempts(0);
    }, [activeAngle, product, fallbackAttempts, getCurrentImageUrl]);

    // Auto-rotation functionality
    useEffect(() => {
        let intervalId;
        if (autoRotate && angles.length > 0) {
            intervalId = setInterval(() => {
                setActiveAngle(prevAngle => {
                    const currentIndex = angles.findIndex(angle => angle.key === prevAngle);
                    const nextIndex = (currentIndex + 1) % angles.length;
                    return angles[nextIndex].key;
                });
            }, 2000); // Rotate every 2 seconds
        }
        return () => intervalId && clearInterval(intervalId);
    }, [autoRotate, angles]);

    const handleAngleChange = (angle) => {
        setActiveAngle(angle);
        setImageLoaded(false);
        setImageError(false);
        if (onAngleChange) {
            onAngleChange(angle);
        }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };

    const handleImageError = () => {
        console.warn(`Image failed to load: ${currentImageSrc}`);
        
        // Try fallback images in order
        const fallbackUrls = [
            product.image, // Main product image
            product.images?.[0], // First image in array
            `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop`, // Generic tech image
            `https://via.placeholder.com/600x600/f8f9fa/6c757d?text=${encodeURIComponent(product.title?.substring(0, 15) || 'Product')}`
        ].filter(Boolean); // Remove null/undefined values

        if (fallbackAttempts < fallbackUrls.length - 1) {
            const nextFallback = fallbackUrls[fallbackAttempts + 1];
            if (nextFallback && nextFallback !== currentImageSrc) {
                setFallbackAttempts(prev => prev + 1);
                setCurrentImageSrc(nextFallback);
                setImageLoaded(false);
                setImageError(false);
                return; // Don't show error yet, try next fallback
            }
        }
        
        // All fallbacks failed
        setImageError(true);
        setImageLoaded(true);
    };

    const getImageAlt = () => {
        const angleName = angles.find(angle => angle.key === activeAngle)?.label || 'Product view';
        return `${product.title} - ${angleName}`;
    };

    const sizeClasses = {
        small: 'viewer-small',
        medium: 'viewer-medium',
        large: 'viewer-large'
    };

    return (
        <div className={`product-viewer-3d ${sizeClasses[size]} mode-${mode}`}>
            {mode === 'detail' ? (
                // Detail Page Layout - Thumbnails on left, main image on right
                <div className="viewer-container detail-layout">
                    {/* Thumbnail Column */}
                    <div className="thumbnail-column">
                        {angles.map((angle) => (
                            <div
                                key={angle.key}
                                className={`thumbnail-item ${activeAngle === angle.key ? 'active' : ''}`}
                                onClick={() => handleAngleChange(angle.key)}
                                onMouseEnter={() => handleAngleChange(angle.key)}
                            >
                                <img
                                    src={product.imageAngles?.[angle.key] || product.image}
                                    alt={`${product.title} ${angle.label}`}
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => {
                                        // Try fallback for thumbnail
                                        const fallbacks = [
                                            product.image,
                                            `https://via.placeholder.com/120x120/e9ecef/495057?text=${angle.label}`
                                        ];
                                        
                                        const currentSrc = e.target.src;
                                        const nextFallback = fallbacks.find(url => url && url !== currentSrc);
                                        
                                        if (nextFallback) {
                                            e.target.src = nextFallback;
                                        } else {
                                            e.target.style.display = 'none';
                                            // Show placeholder div
                                            const placeholder = e.target.parentNode.querySelector('.thumb-placeholder') ||
                                                              document.createElement('div');
                                            placeholder.className = 'thumb-placeholder';
                                            placeholder.textContent = angle.label;
                                            placeholder.style.cssText = `
                                                position: absolute;
                                                inset: 0;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                background: #f8f9fa;
                                                color: #6c757d;
                                                font-size: 10px;
                                                font-weight: 600;
                                                border-radius: 8px;
                                            `;
                                            e.target.parentNode.appendChild(placeholder);
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image Display */}
                    <div className="main-image-container">
                        {!imageLoaded && (
                            <div className="image-loading">
                                <div className="loading-spinner"></div>
                                <span>Loading {activeAngle} view...</span>
                            </div>
                        )}

                        <img
                            src={currentImageSrc}
                            alt={getImageAlt()}
                            className={`product-image ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
                            style={{ objectFit: 'contain' }}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />

                        {imageError && (
                            <img
                                src="https://via.placeholder.com/600x600/f8f9fa/6c757d?text=⚠️+Image+Not+Available"
                                alt="Product unavailable"
                                className="placeholder-image"
                                style={{ objectFit: 'contain' }}
                            />
                        )}

                        {/* Angle Indicator for Detail */}
                        <div className="angle-indicator detail-indicator">
                            <span className="angle-name">
                                {angles.find(angle => angle.key === activeAngle)?.label} View
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                // List Page Layout - Simple image with hover effects
                <div className="viewer-container list-layout">
                    <div className="image-container">
                        {!imageLoaded && (
                            <div className="image-loading">
                                <div className="loading-spinner"></div>
                            </div>
                        )}

                        <img
                            src={currentImageSrc}
                            alt={getImageAlt()}
                            className={`product-image ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
                            style={{ objectFit: 'contain' }}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />

                        {imageError && (
                            <img
                                src="https://via.placeholder.com/400x400/f8f9fa/6c757d?text=⚠️+Item+Not+Available"
                                alt="Product unavailable"
                                className="placeholder-image"
                                style={{ objectFit: 'contain' }}
                            />
                        )}

                        {/* Product badges for list view */}
                        <div className="product-info-overlay">
                            <div className="product-badge">
                                {product.tags?.includes('new-releases') && <span className="badge new">NEW</span>}
                                {product.tags?.includes('best-sellers') && <span className="badge bestseller">HOT</span>}
                                {product.tags?.includes('deals') && <span className="badge deal">DEAL</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductViewer3D;