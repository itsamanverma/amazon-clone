/**
 * Image utility functions for Unsplash URLs
 * No Firebase Storage needed - all images use Unsplash CDN
 */

// Generate optimized Unsplash URL with specific dimensions
export const getOptimizedUnsplashUrl = (baseUrl, width = 800, height = 800, options = {}) => {
  try {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    
    // Set dimensions
    params.set('w', width);
    params.set('h', height);
    
    // Set crop mode (default to crop with center focus)
    params.set('fit', options.fit || 'crop');
    params.set('crop', options.crop || 'center');
    
    // Quality and format
    if (options.quality) params.set('q', options.quality);
    if (options.format) params.set('fm', options.format);
    
    url.search = params.toString();
    
    return {
      success: true,
      url: url.toString(),
      width,
      height,
      source: 'unsplash-cdn'
    };
  } catch (error) {
    console.error('❌ Failed to optimize Unsplash URL:', error);
    return {
      success: false,
      url: baseUrl, // Return original URL as fallback
      error: error.message
    };
  }
};

// Generate multiple image sizes for responsive images
export const generateResponsiveImageSet = (baseUrl, sizes = [300, 600, 800, 1200]) => {
  return sizes.map(size => ({
    url: getOptimizedUnsplashUrl(baseUrl, size, size).url,
    width: size,
    height: size,
    descriptor: `${size}w`
  }));
};

// Validate if URL is from Unsplash
export const isUnsplashUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('unsplash.com');
  } catch {
    return false;
  }
};

// Create srcSet string for responsive images
export const createSrcSet = (baseUrl, sizes) => {
  const imageSet = generateResponsiveImageSet(baseUrl, sizes);
  return imageSet.map(img => `${img.url} ${img.descriptor}`).join(', ');
};

// Image preloading utility
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (urls) => {
  try {
    const promises = urls.map(url => preloadImage(url));
    const images = await Promise.all(promises);
    console.log(`✅ Preloaded ${images.length} images`);
    return images;
  } catch (error) {
    console.error('❌ Failed to preload images:', error);
    return [];
  }
};

// No upload function needed - using Unsplash URLs directly
export const migrateFromFirebaseToUnsplash = () => {
  console.log('📷 Migration complete - now using Unsplash CDN exclusively');
  console.log('✅ Benefits:');
  console.log('   • No Firebase Storage costs');
  console.log('   • Global CDN delivery');
  console.log('   • Professional quality images');
  console.log('   • Automatic optimization');
  
  return {
    success: true,
    source: 'unsplash-cdn',
    message: 'All images now served from Unsplash CDN'
  };
};

// Unified image utilities (Unsplash-focused)
const imageUtilities = {
  getOptimizedUnsplashUrl,
  generateResponsiveImageSet,
  isUnsplashUrl,
  createSrcSet,
  preloadImage,
  preloadImages,
  migrateFromFirebaseToUnsplash
};

export default imageUtilities;