import products from '../utils/productData';
import FirebaseProductImageService from './firebaseProductImageService';
import ProductImageManager from '../utils/productImageManager';

/**
 * Enhanced Product Service
 * Integrates Firebase Storage, Gemini AI, and 3D Product Viewer
 */

class ProductService {
    constructor() {
        this.cachedProducts = null;
        this.lastCacheUpdate = null;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        
        // Lazy initialization to avoid circular dependencies
        this._firebaseImageService = null;
        this._imageManager = null;
    }
    
    get firebaseImageService() {
        if (!this._firebaseImageService) {
            this._firebaseImageService = new FirebaseProductImageService();
        }
        return this._firebaseImageService;
    }
    
    get imageManager() {
        if (!this._imageManager) {
            this._imageManager = new ProductImageManager();
        }
        return this._imageManager;
    }

    /**
     * Get all products with enhanced images
     */
    async getAllProducts() {
        // Check cache
        if (this.cachedProducts && this.isCacheValid()) {
            return this.cachedProducts;
        }
        
        try {
            // Get base products from productData.js
            const baseProducts = [...products];
            
            // Check if any Firebase Storage images are available
            const hasFirebaseImages = await this.checkFirebaseStorageAvailability();
            
            let enhancedProducts;
            if (hasFirebaseImages) {
                console.log('🔥 Firebase Storage images detected, loading enhanced products...');
                enhancedProducts = await this.enhanceProductsWithFirebaseImages(baseProducts);
            } else {
                console.log('📷 Using curated Unsplash images...');
                // Use curated images directly
                enhancedProducts = baseProducts.map(product => ({
                    ...product,
                    imageSource: 'curated',
                    images: product.images || Object.values(product.imageAngles || {}),
                }));
            }
            
            // Cache the results
            this.cachedProducts = enhancedProducts;
            this.lastCacheUpdate = Date.now();
            
            const sourceType = hasFirebaseImages ? 'Firebase Storage' : 'Unsplash CDN';
            console.log(`✅ Loaded ${enhancedProducts.length} enhanced products from ${sourceType}`);
            return enhancedProducts;
            
        } catch (error) {
            console.error('❌ Error loading products:', error);
            // Fallback to static data
            return products.map(product => ({
                ...product,
                imageSource: 'fallback',
                images: product.images || Object.values(product.imageAngles || {})
            }));
        }
    }

    /**
     * Get product by ID with enhanced images
     */
    async getProductById(id) {
        const allProducts = await this.getAllProducts();
        const product = allProducts.find(p => p.id === id);
        
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        
        return product;
    }

    /**
     * Get products by category
     */
    async getProductsByCategory(category) {
        const allProducts = await this.getAllProducts();
        return allProducts.filter(p => p.category === category);
    }

    /**
     * Get products by tag
     */
    async getProductsByTag(tag) {
        const allProducts = await this.getAllProducts();
        return allProducts.filter(p => p.tags && p.tags.includes(tag));
    }

    /**
     * Search products by title
     */
    async searchProducts(query) {
        const allProducts = await this.getAllProducts();
        const searchTerm = query.toLowerCase();
        
        return allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            (product.category && product.category.toLowerCase().includes(searchTerm)) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    }

    /**
     * Get products in price range
     */
    async getProductsByPriceRange(minPrice, maxPrice) {
        const allProducts = await this.getAllProducts();
        return allProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    /**
     * Get featured products (best sellers and new releases)
     */
    async getFeaturedProducts() {
        const allProducts = await this.getAllProducts();
        return allProducts.filter(p => 
            p.tags && (p.tags.includes('best-sellers') || p.tags.includes('new-releases'))
        );
    }

    /**
     * Get deal products
     */
    async getDealProducts() {
        const allProducts = await this.getAllProducts();
        return allProducts.filter(p => p.tags && p.tags.includes('deals'));
    }

    /**
     * Check if Firebase Storage has any product images
     */
    async checkFirebaseStorageAvailability() {
        try {
            // Skip Firebase Storage check in development due to CORS issues
            if (process.env.NODE_ENV === 'development') {
                console.log('📝 Skipping Firebase Storage check in development due to CORS restrictions');
                return false;
            }

            // Check if the first few products have Firebase Storage images
            const sampleProducts = products.slice(0, 3);
            
            for (const product of sampleProducts) {
                const firebaseImages = await this.firebaseImageService.listProductImages(
                    product.id, 
                    product.category, 
                    product.imageMetadata?.subcategory
                );
                
                if (firebaseImages && Object.keys(firebaseImages).length > 0) {
                    console.log(`🔥 Found Firebase Storage images for ${product.id}`);
                    return true;
                }
            }
            
            console.log('📷 No Firebase Storage images found, using curated images');
            return false;
            
        } catch (error) {
            console.warn('⚠️ Error checking Firebase Storage availability:', error);
            return false;
        }
    }

    /**
     * Enhance products with Firebase Storage images where available (Firebase Upload Ready)
     * Currently using curated high-quality images - Firebase Storage integration available for upload
     */
    async enhanceProductsWithFirebaseImages(products) {
        const enhanced = [];
        
        for (const product of products) {
            try {
                // Check if Firebase Storage images are available
                const firebaseImages = await this.firebaseImageService.listProductImages(
                    product.id, 
                    product.category, 
                    product.imageMetadata?.subcategory
                );
                
                if (firebaseImages && Object.keys(firebaseImages).length > 0) {
                    // Use Firebase Storage images
                    enhanced.push({
                        ...product,
                        image: firebaseImages.front || product.image,
                        images: Object.values(firebaseImages),
                        imageAngles: firebaseImages,
                        imageSource: 'firebase-storage',
                        imageMetadata: {
                            ...product.imageMetadata,
                            source: 'firebase-storage',
                            firebaseUrl: true
                        }
                    });
                } else {
                    // Use curated images from productData.js
                    enhanced.push({
                        ...product,
                        imageSource: 'curated',
                        firebaseReady: true,
                        images: product.images || Object.values(product.imageAngles || {})
                    });
                }
                
            } catch (error) {
                console.warn(`⚠️ Could not enhance ${product.id}, using default images`);
                enhanced.push({
                    ...product,
                    imageSource: 'default'
                });
            }
        }
        
        return enhanced;
    }

    /**
     * Upload product images to Firebase Storage
     */
    async uploadProductToFirebase(productId) {
        try {
            const product = await this.getProductById(productId);
            const result = await this.firebaseImageService.uploadProductImages(product);
            
            // Invalidate cache to reflect changes
            this.invalidateCache();
            
            return result;
            
        } catch (error) {
            console.error(`Failed to upload ${productId} to Firebase:`, error);
            throw error;
        }
    }

    /**
     * Generate custom images using Gemini AI
     */
    async generateCustomImages(productId) {
        try {
            const product = await this.getProductById(productId);
            const customImages = await this.firebaseImageService.generateCustomImages(product);
            
            if (customImages) {
                // Upload to Firebase Storage
                const updatedProduct = { ...product, imageAngles: customImages };
                await this.firebaseImageService.uploadProductImages(updatedProduct);
                
                // Invalidate cache
                this.invalidateCache();
                
                return customImages;
            }
            
            return null;
            
        } catch (error) {
            console.error(`Failed to generate custom images for ${productId}:`, error);
            throw error;
        }
    }

    /**
     * Process all products for Firebase Storage
     */
    async processAllProductsToFirebase() {
        const allProducts = await this.getAllProducts();
        return this.firebaseImageService.processAllProducts(allProducts);
    }

    /**
     * Get product statistics
     */
    async getProductStatistics() {
        const allProducts = await this.getAllProducts();
        
        const stats = {
            total: allProducts.length,
            categories: {},
            imageSources: {},
            ratings: {
                average: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            },
            priceRange: {
                min: Number.MAX_VALUE,
                max: 0,
                average: 0
            }
        };
        
        let totalPrice = 0;
        let totalRating = 0;
        
        allProducts.forEach(product => {
            // Categories
            const category = product.category || 'uncategorized';
            stats.categories[category] = (stats.categories[category] || 0) + 1;
            
            // Image sources
            const imageSource = product.imageSource || 'unknown';
            stats.imageSources[imageSource] = (stats.imageSources[imageSource] || 0) + 1;
            
            // Ratings
            if (product.rating) {
                stats.ratings.distribution[product.rating]++;
                totalRating += product.rating;
            }
            
            // Price
            if (product.price) {
                stats.priceRange.min = Math.min(stats.priceRange.min, product.price);
                stats.priceRange.max = Math.max(stats.priceRange.max, product.price);
                totalPrice += product.price;
            }
        });
        
        stats.ratings.average = totalRating / allProducts.length;
        stats.priceRange.average = totalPrice / allProducts.length;
        
        return stats;
    }

    /**
     * Get product image metadata
     */
    async getProductImageInfo(productId) {
        const product = await this.getProductById(productId);
        
        return {
            productId: product.id,
            title: product.title,
            category: product.category,
            imageMetadata: product.imageMetadata,
            imageSource: product.imageSource,
            totalImages: Object.keys(product.imageAngles || {}).length,
            angles: Object.keys(product.imageAngles || {}),
            primaryImage: product.image,
            allImages: product.images || []
        };
    }

    /**
     * Validate product image URLs
     */
    async validateProductImages(productId) {
        const product = await this.getProductById(productId);
        const results = {};
        
        if (product.imageAngles) {
            for (const [angle, url] of Object.entries(product.imageAngles)) {
                try {
                    const response = await fetch(url, { method: 'HEAD' });
                    results[angle] = {
                        url,
                        valid: response.ok,
                        status: response.status,
                        contentType: response.headers.get('content-type')
                    };
                } catch (error) {
                    results[angle] = {
                        url,
                        valid: false,
                        error: error.message
                    };
                }
            }
        }
        
        return {
            productId,
            results,
            overallValid: Object.values(results).every(r => r.valid)
        };
    }

    /**
     * Check cache validity
     */
    isCacheValid() {
        return this.lastCacheUpdate && 
               (Date.now() - this.lastCacheUpdate) < this.cacheTimeout;
    }

    /**
     * Invalidate cache
     */
    invalidateCache() {
        this.cachedProducts = null;
        this.lastCacheUpdate = null;
    }

    /**
     * Get cache info
     */
    getCacheInfo() {
        return {
            cached: !!this.cachedProducts,
            lastUpdate: this.lastCacheUpdate,
            isValid: this.isCacheValid(),
            timeout: this.cacheTimeout
        };
    }
}

// Export singleton instance
const productServiceInstance = new ProductService();
export default productServiceInstance;