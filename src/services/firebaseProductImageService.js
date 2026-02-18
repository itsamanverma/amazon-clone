import GeminiImageGenerator from '../services/geminiImageGenerator';

/**
 * Product Image Service - Using Unsplash URLs
 * Manages product image URLs without Firebase Storage
 */

class FirebaseProductImageService {
    constructor() {
        // Lazy initialization to avoid circular dependencies
        this._geminiGenerator = null;
    }
    
    get geminiGenerator() {
        if (!this._geminiGenerator) {
            this._geminiGenerator = new GeminiImageGenerator();
        }
        return this._geminiGenerator;
    }

    /**
     * Return product's images (no upload needed - using Unsplash URLs)
     */
    async uploadProductImages(product) {
        const { id, category, imageMetadata } = product;
        
        console.log(`📷 Using Unsplash URLs for ${id} (${category})`);
        
        try {
            // Simply return the existing image URLs (no upload needed)
            const images = product.imageAngles || {};
            
            console.log(`  ✅ Using ${Object.keys(images).length} Unsplash images`);
            
            return {
                success: true,
                images: images,
                source: 'unsplash-cdn'
            };
            
        } catch (error) {
            console.error(`❌ Failed to process images for ${id}:`, error);
            return {
                success: false,
                error: error.message,
                images: product.imageAngles || {} // Fallback to original URLs
            };
        }
    }

    /**
     * Generate new images using Gemini AI for specific product
     */
    async generateCustomImages(product) {
        console.log(`🎨 Generating custom AI images for ${product.id}`);
        
        try {
            const { category, title } = product;
            const angles = this.getAnglesForCategory(category);
            const generatedImages = {};
            
            for (const angle of angles) {
                try {
                    const prompt = this.createAnglePrompt(title, angle, category);
                    
                    // Use Gemini to generate image concepts (returns curated image for now)
                    const imageUrl = await this.geminiGenerator.generateProductImage(prompt);
                    generatedImages[angle] = imageUrl;
                    
                    console.log(`  ✅ Generated ${angle} image`);
                    
                } catch (error) {
                    console.error(`  ❌ Failed to generate ${angle} for ${product.id}:`, error);
                    generatedImages[angle] = this.getFallbackImage(category, angle);
                }
                
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            return generatedImages;
            
        } catch (error) {
            console.error(`❌ Failed to generate images for ${product.id}:`, error);
            return null;
        }
    }

    /**
     * Convert image to WebP format for optimization
     */
    async convertToWebP(imageBlob) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Set canvas size (max 800x800 for optimization)
                const maxSize = 800;
                const scale = Math.min(maxSize / img.width, maxSize / img.height);
                
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                // Draw and compress
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob((webpBlob) => {
                    if (webpBlob) {
                        resolve(webpBlob);
                    } else {
                        reject(new Error('Failed to convert to WebP'));
                    }
                }, 'image/webp', 0.9);
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(imageBlob);
        });
    }

    /**
     * Get recommended angles for product category
     */
    getAnglesForCategory(category) {
        const angleMapping = {
            electronics: ['front', 'side', 'back', 'top', 'detail'],
            mobiles: ['front', 'side', 'back', 'detail'],
            fashion: ['front', 'side', 'back', 'detail'],
            furniture: ['front', 'side', 'top', 'detail'],
            home: ['front', 'side', 'detail'],
            sports: ['front', 'side', 'detail']
        };
        
        return angleMapping[category] || angleMapping.electronics;
    }

    /**
     * Create AI prompt for specific angle
     */
    createAnglePrompt(title, angle, category) {
        const basePrompts = {
            front: `Professional product photography of ${title}, front view, clean white background, studio lighting, high resolution`,
            side: `Side profile view of ${title}, professional photography, design details visible, clean background`,
            back: `Rear view of ${title}, back panel detail, professional studio photography, white background`,
            top: `Top-down view of ${title}, overhead shot, professional lighting, clean minimalist background`,
            detail: `Close-up detail shot of ${title}, macro photography, highlighting premium materials and craftsmanship`
        };
        
        const categoryContext = {
            electronics: 'sleek modern design, premium materials, tech aesthetic',
            mobiles: 'smartphone elegance, screen reflection, premium finish',
            fashion: 'high fashion styling, elegant presentation, lifestyle context',
            furniture: 'modern interior setting, natural lighting, design focus',
            home: 'kitchen or home environment, functional beauty, clean styling',
            sports: 'active lifestyle context, dynamic presentation, performance focus'
        };
        
        const base = basePrompts[angle] || basePrompts.front;
        const context = categoryContext[category] || '';
        
        return `${base}, ${context}. High-quality commercial product photography, 8K resolution, professional lighting.`;
    }

    /**
     * Get fallback image for category and angle
     */
    getFallbackImage(category, angle) {
        const baseUrl = 'https://via.placeholder.com/800x800';
        const colors = {
            front: 'f8f9fa/6c757d',
            side: 'e9ecef/495057',
            back: 'dee2e6/343a40',
            top: 'f8f9fa/6c757d',
            detail: 'e9ecef/495057'
        };
        
        const color = colors[angle] || colors.front;
        const text = encodeURIComponent(`${category.toUpperCase()} ${angle.toUpperCase()}`);
        
        return `${baseUrl}/${color}?text=${text}`;
    }

    /**
     * List product images (returns Unsplash URLs)
     */
    async listProductImages(productId, category, subcategory) {
        console.log(`📷 Product images for ${productId} available via Unsplash URLs`);
        
        // Images are already in productData.js as Unsplash URLs
        // No Firebase Storage needed
        return null;
    }

    /**
     * Delete product images (no-op for Unsplash URLs)
     */
    async deleteProductImages(productId, category, subcategory) {
        console.log(`📷 Product images for ${productId} are Unsplash URLs - no deletion needed`);
        return { success: true, message: 'No Firebase images to delete' };
    }

    /**
     * Process all products (now using Unsplash URLs only)
     */
    async processAllProducts(products) {
        console.log(`🚀 Using Unsplash URLs for ${products.length} products...`);
        
        const results = {
            successful: [],
            failed: [],
            summary: {
                total: products.length,
                uploaded: 0,
                errors: 0,
                categories: {}
            }
        };
        
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            console.log(`📝 Processing ${i + 1}/${products.length}: ${product.title}`);
            
            try {
                // No upload needed - already have Unsplash URLs
                const uploadResult = await this.uploadProductImages(product);
                
                results.successful.push({
                    productId: product.id,
                    category: product.category,
                    source: 'unsplash-cdn',
                    images: uploadResult.images
                });
                results.summary.uploaded++;
                
                // Track category statistics
                const category = product.category || 'uncategorized';
                if (!results.summary.categories[category]) {
                    results.summary.categories[category] = { count: 0, successful: 0 };
                }
                results.summary.categories[category].count++;
                results.summary.categories[category].successful++;
                
            } catch (error) {
                console.error(`❌ Failed to process ${product.id}:`, error);
                results.failed.push({
                    productId: product.id,
                    error: error.message
                });
                results.summary.errors++;
            }
        }
        
        console.log(`✅ Processing complete: ${results.summary.uploaded}/${products.length} products using Unsplash URLs`);
        return results;
    }
}

export default FirebaseProductImageService;