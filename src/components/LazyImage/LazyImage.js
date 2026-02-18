import React, { useState, useRef, useEffect } from 'react';
import './LazyImage.css';

/**
 * Optimized lazy loading image component with Firebase Storage integration
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  placeholder = '/images/placeholder.png',
  width,
  height,
  optimizeOptions = {}
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Get optimized image URL
  const getOptimizedUrl = (originalSrc) => {
    // For Firebase Storage URLs, we can add query parameters
    if (originalSrc?.includes('firebasestorage.app')) {
      const url = new URL(originalSrc);
      
      if (optimizeOptions.width) {
        url.searchParams.set('w', optimizeOptions.width);
      }
      if (optimizeOptions.height) {
        url.searchParams.set('h', optimizeOptions.height);
      }
      if (optimizeOptions.quality) {
        url.searchParams.set('q', optimizeOptions.quality);
      }
      
      return url.toString();
    }
    
    return originalSrc;
  };

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const optimizedSrc = getOptimizedUrl(src);
              setImageSrc(optimizedSrc);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          rootMargin: '50px' // Start loading 50px before the image enters viewport
        }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src, placeholder, optimizeOptions]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
    setImageSrc(placeholder); // Fallback to placeholder on error
  };

  return (
    <div className={`lazy-image-container ${className}`}>
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`lazy-image ${loaded ? 'loaded' : 'loading'} ${error ? 'error' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy" // Native lazy loading as fallback
        decoding="async"
      />
      
      {!loaded && imageSrc !== placeholder && (
        <div className="lazy-image-loader">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;