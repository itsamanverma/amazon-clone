import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import products from '../utils/productData';

/**
 * Firebase Storage Upload Service
 * Uploads product images from Unsplash URLs to Firebase Storage
 */

class FirebaseUploader {
    constructor() {
        this.uploadedCount = 0;
        this.failedCount = 0;
        this.results = [];
    }

    /**
     * Convert image URL to blob
     */
    async urlToBlob(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return response.blob();
    }

    /**
     * Upload a single product's images to Firebase Storage
     */
    async uploadProductImages(product) {
        const { id, category, imageAngles, imageMetadata } = product;
        const subcategory = imageMetadata?.subcategory || 'default';
        
        console.log(`🔄 Uploading ${id} (${category}/${subcategory})`);
        
        const uploadedImages = {};
        const errors = [];
        
        try {
            for (const [angle, imageUrl] of Object.entries(imageAngles || {})) {
                try {
                    console.log(`  📥 Fetching ${angle} image...`);
                    
                    // Fetch image from Unsplash
                    const imageBlob = await this.urlToBlob(imageUrl);
                    
                    // Create Firebase Storage path
                    const storagePath = `products/${category}/${subcategory}/${id}/${angle}.webp`;
                    const imageRef = ref(storage, storagePath);
                    
                    // Upload to Firebase Storage
                    const snapshot = await uploadBytes(imageRef, imageBlob, {
                        contentType: 'image/webp',
                        customMetadata: {
                            productId: id,
                            category: category,
                            subcategory: subcategory,
                            angle: angle,
                            originalUrl: imageUrl,
                            uploadedAt: new Date().toISOString(),
                            source: 'migrated-from-unsplash'
                        }
                    });
                    
                    // Get Firebase Storage URL
                    const firebaseUrl = await getDownloadURL(snapshot.ref);
                    uploadedImages[angle] = firebaseUrl;
                    
                    console.log(`  ✅ Uploaded ${angle} to Firebase Storage`);
                    
                } catch (error) {
                    console.error(`  ❌ Failed to upload ${angle}:`, error.message);
                    errors.push(`${angle}: ${error.message}`);
                    uploadedImages[angle] = imageUrl; // Keep original as fallback
                }
                
                // Rate limiting to avoid overwhelming Unsplash/Firebase
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            const result = {
                productId: id,
                category,
                subcategory,
                success: errors.length === 0,
                uploadedImages,
                errors: errors.length > 0 ? errors : null,
                firebaseStoragePath: `products/${category}/${subcategory}/${id}/`
            };
            
            if (result.success) {
                this.uploadedCount++;
                console.log(`  🎉 Successfully uploaded all images for ${id}`);
            } else {
                this.failedCount++;
                console.log(`  ⚠️ Partial upload for ${id}: ${errors.length} errors`);
            }
            
            this.results.push(result);
            return result;
            
        } catch (error) {
            console.error(`❌ Complete failure for ${id}:`, error);
            this.failedCount++;
            
            const failureResult = {
                productId: id,
                success: false,
                errors: [error.message],
                uploadedImages: imageAngles // Fallback to original URLs
            };
            
            this.results.push(failureResult);
            return failureResult;
        }
    }

    /**
     * Upload all products to Firebase Storage
     */
    async uploadAllProducts() {
        console.log('🚀 Starting Firebase Storage upload for all products...');
        console.log(`📦 Total products to upload: ${products.length}`);
        
        const startTime = Date.now();
        
        // Process products in parallel (but with rate limiting)
        const uploadPromises = products.map((product, index) => 
            new Promise(resolve => {
                // Stagger the uploads to avoid rate limiting
                setTimeout(async () => {
                    try {
                        const result = await this.uploadProductImages(product);
                        resolve(result);
                    } catch (error) {
                        console.error(`Failed to upload product ${product.id}:`, error);
                        resolve({
                            productId: product.id,
                            success: false,
                            errors: [error.message]
                        });
                    }
                }, index * 1000) // 1 second delay between each product
            })
        );
        
        await Promise.all(uploadPromises);
        
        const endTime = Date.now();
        const duration = Math.round((endTime - startTime) / 1000);
        
        // Generate report
        console.log('\n📊 FIREBASE UPLOAD REPORT');
        console.log('========================');
        console.log(`⏱️ Total time: ${duration} seconds`);
        console.log(`✅ Successful uploads: ${this.uploadedCount}`);
        console.log(`❌ Failed uploads: ${this.failedCount}`);
        console.log(`📈 Success rate: ${Math.round((this.uploadedCount / products.length) * 100)}%`);
        
        // Categories breakdown
        const categoryStats = {};
        this.results.forEach(result => {
            const category = result.category || 'unknown';
            if (!categoryStats[category]) {
                categoryStats[category] = { total: 0, successful: 0 };
            }
            categoryStats[category].total++;
            if (result.success) {
                categoryStats[category].successful++;
            }
        });
        
        console.log('\n📂 By Category:');
        Object.entries(categoryStats).forEach(([category, stats]) => {
            console.log(`  ${category}: ${stats.successful}/${stats.total} successful`);
        });
        
        // Show failed uploads
        const failed = this.results.filter(r => !r.success);
        if (failed.length > 0) {
            console.log('\n❌ Failed Uploads:');
            failed.forEach(result => {
                console.log(`  ${result.productId}: ${result.errors?.join(', ')}`);
            });
        }
        
        return {
            total: products.length,
            successful: this.uploadedCount,
            failed: this.failedCount,
            duration,
            results: this.results,
            categoryStats
        };
    }

    /**
     * Generate updated productData.js with Firebase Storage URLs
     */
    generateUpdatedProductData() {
        const updatedProducts = products.map(product => {
            const result = this.results.find(r => r.productId === product.id);
            
            if (result && result.success && result.uploadedImages) {
                return {
                    ...product,
                    // Update main image to Firebase Storage URL
                    image: result.uploadedImages.front || product.image,
                    // Update images array with Firebase Storage URLs
                    images: Object.values(result.uploadedImages),
                    // Update imageAngles with Firebase Storage URLs
                    imageAngles: result.uploadedImages,
                    // Update metadata
                    imageMetadata: {
                        ...product.imageMetadata,
                        source: 'firebase-storage',
                        uploadedAt: new Date().toISOString(),
                        firebaseStoragePath: result.firebaseStoragePath
                    }
                };
            }
            
            return product; // Keep original if upload failed
        });
        
        return updatedProducts;
    }
}

// Usage functions
export const uploadAllToFirebase = async () => {
    const uploader = new FirebaseUploader();
    return uploader.uploadAllProducts();
};

export const uploadSingleProduct = async (productId) => {
    const uploader = new FirebaseUploader();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        throw new Error(`Product ${productId} not found`);
    }
    
    return uploader.uploadProductImages(product);
};

export default FirebaseUploader;