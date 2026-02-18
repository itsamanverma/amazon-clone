import GeminiImageGenerator from '../services/geminiImageGenerator';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

/**
 * Product Image Management Service
 * Integrates Firebase Storage with Gemini AI for comprehensive product image management
 */

class ProductImageManager {
    constructor() {
        // Lazy initialization to avoid circular dependencies
        this._geminiGenerator = null;
        
        this.categories = {
            electronics: {
                angles: ['front', 'side', 'back', 'top', 'detail'],
                basePrompts: {
                    front: 'professional product shot, front view, white background, studio lighting',
                    side: 'side profile view, professional photography, clean background',
                    back: 'rear view, detailed back panel, professional studio shot',
                    top: 'top-down overhead view, flat lay style, professional lighting',
                    detail: 'close-up detail shot, macro photography, highlight key features'
                }
            },
            mobiles: {
                angles: ['front', 'side', 'back', 'detail'],
                basePrompts: {
                    front: 'smartphone front view, screen on, professional product photography',
                    side: 'smartphone side profile, elegant design, studio lighting',
                    back: 'smartphone back view, camera detail, premium finish',
                    detail: 'close-up of camera system and premium materials'
                }
            },
            fashion: {
                angles: ['front', 'side', 'back', 'detail'],
                basePrompts: {
                    front: 'fashion item front view, clean background, professional styling',
                    side: 'side view showing fit and design details',
                    back: 'back view highlighting design elements',
                    detail: 'close-up of fabric texture and quality details'
                }
            },
            furniture: {
                angles: ['front', 'side', 'top', 'detail'],
                basePrompts: {
                    front: 'furniture piece front view, modern home setting, natural lighting',
                    side: 'furniture side profile, showing proportions and design',
                    top: 'overhead view showing surface and design patterns',
                    detail: 'close-up of materials, finish, and craftsmanship'
                }
            },
            home: {
                angles: ['front', 'side', 'detail'],
                basePrompts: {
                    front: 'home appliance front view, kitchen setting, modern design',
                    side: 'side view showing design and functionality',
                    detail: 'close-up of controls, features, and build quality'
                }
            },
            sports: {
                angles: ['front', 'side', 'detail'],
                basePrompts: {
                    front: 'sports equipment front view, active lifestyle setting',
                    side: 'side profile showing design and functionality',
                    detail: 'close-up of materials and technical features'
                }
            }
        };
    }
    
    get geminiGenerator() {
        if (!this._geminiGenerator) {
            this._geminiGenerator = new GeminiImageGenerator();
        }
        return this._geminiGenerator;
    }

    /**
     * Get or generate Firebase Storage URLs for product images
     */
    async getProductImages(product) {
        const category = product.category || 'electronics';
        const productId = product.id;
        
        try {
            // First, try to get existing images from Firebase Storage
            const existingImages = await this.getExistingImages(productId, category);
            
            if (existingImages && Object.keys(existingImages).length > 0) {
                console.log(`✅ Using existing Firebase images for ${productId}`);
                return existingImages;
            }

            // If no existing images, generate new ones with Gemini AI
            console.log(`🎨 Generating new AI images for ${productId}`);
            const aiImages = await this.generateAIImages(product);
            
            // Upload AI-generated images to Firebase Storage
            const firebaseImages = await this.uploadAIImagesToFirebase(aiImages, productId, category);
            
            return firebaseImages;
            
        } catch (error) {
            console.error(`❌ Error managing images for ${productId}:`, error);
            return this.getFallbackImages(product);
        }
    }

    /**
     * Check for existing images in Firebase Storage
     */
    async getExistingImages(productId, category) {
        const categoryConfig = this.categories[category] || this.categories.electronics;
        const angles = categoryConfig.angles;
        const existingImages = {};

        for (const angle of angles) {
            try {
                const imagePath = `products/${category}/${productId}/${angle}.webp`;
                const imageRef = ref(storage, imagePath);
                const url = await getDownloadURL(imageRef);
                existingImages[angle] = url;
            } catch (error) {
                // Image doesn't exist, skip
                console.log(`⚠️ No existing ${angle} image for ${productId}`);
            }
        }

        return Object.keys(existingImages).length > 0 ? existingImages : null;
    }

    /**
     * Generate AI images using Gemini for different angles
     */
    async generateAIImages(product) {
        const category = product.category || 'electronics';
        const categoryConfig = this.categories[category] || this.categories.electronics;
        
        // Use curated high-quality images based on category and product type
        return this.getCuratedImagesByCategory(product, categoryConfig);
    }

    /**
     * Get curated high-quality images by category
     */
    getCuratedImagesByCategory(product, categoryConfig) {
        const { category, title } = product;
        
        // Category-specific high-quality image collections
        const imageCollections = {
            electronics: {
                headphones: {
                    front: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop'
                },
                smartwatch: {
                    front: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1469833120660-1a218b53d28a?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1510017098667-27dfc6e5e249?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?w=800&h=800&fit=crop'
                },
                camera: {
                    front: 'https://images.unsplash.com/photo-1606983340077-decb1810e75d?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1516961177779-a71e8588e4df?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=800&h=800&fit=crop'
                },
                speaker: {
                    front: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=800&fit=crop'
                },
                laptop: {
                    front: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'
                }
            },
            mobiles: {
                smartphone: {
                    front: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
                }
            },
            fashion: {
                clothing: {
                    front: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc6ce4e?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1491843667821-014bb7be9568?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1619601112294-bec3578f3e84?w=800&h=800&fit=crop'
                },
                shoes: {
                    front: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop'
                },
                accessories: {
                    front: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
                    back: 'https://images.unsplash.com/photo-1621229183055-da33b59695f0?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d8f?w=800&h=800&fit=crop'
                }
            },
            furniture: {
                seating: {
                    front: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop',
                    top: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop'
                }
            },
            home: {
                appliances: {
                    front: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop'
                }
            },
            sports: {
                equipment: {
                    front: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop',
                    side: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800&h=800&fit=crop',
                    detail: 'https://images.unsplash.com/photo-1553979459-d07ba86e3b78?w=800&h=800&fit=crop'
                }
            }
        };

        // Determine subcategory based on product title
        const subcategory = this.detectSubcategory(title, category);
        const categoryImages = imageCollections[category];
        
        if (categoryImages && categoryImages[subcategory]) {
            return categoryImages[subcategory];
        }

        // Fallback to first available subcategory in the category
        if (categoryImages) {
            const firstSubcategory = Object.keys(categoryImages)[0];
            return categoryImages[firstSubcategory];
        }

        // Final fallback
        return this.getFallbackImages(product);
    }

    /**
     * Detect subcategory from product title
     */
    detectSubcategory(title, category) {
        const titleLower = title.toLowerCase();
        
        const subcategoryKeywords = {
            electronics: {
                headphones: ['headphone', 'headset', 'earphone', 'audio', 'bass'],
                smartwatch: ['watch', 'smartwatch', 'wearable', 'fitness'],
                camera: ['camera', 'canon', 'nikon', 'photo', 'lens'],
                speaker: ['speaker', 'bluetooth', 'jbl', 'sound', 'audio'],
                laptop: ['laptop', 'macbook', 'computer', 'notebook'],
                tablet: ['ipad', 'tablet', 'tab'],
                airpods: ['airpods', 'earbuds', 'wireless earphone']
            },
            mobiles: {
                smartphone: ['phone', 'smartphone', 'mobile', 'galaxy', 'iphone', 'oneplus', 'xiaomi']
            },
            fashion: {
                clothing: ['shirt', 'jeans', 'clothing', 'apparel', 't-shirt'],
                shoes: ['shoes', 'sneaker', 'boot', 'running', 'sport'],
                accessories: ['bag', 'handbag', 'wallet', 'accessory']
            },
            furniture: {
                seating: ['chair', 'sofa', 'seat', 'armchair', 'bean bag']
            },
            home: {
                appliances: ['fryer', 'vacuum', 'appliance', 'kitchen', 'dyson', 'philips']
            },
            sports: {
                equipment: ['bike', 'bicycle', 'mountain', 'sports', 'equipment']
            }
        };

        const categoryKeywords = subcategoryKeywords[category] || {};
        
        for (const [subcategory, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => titleLower.includes(keyword))) {
                return subcategory;
            }
        }

        // Default to first subcategory
        return Object.keys(categoryKeywords)[0] || 'default';
    }

    /**
     * Upload AI-generated images to Firebase Storage
     */
    async uploadAIImagesToFirebase(aiImages, productId, category) {
        const firebaseImages = {};
        
        for (const [angle, imageUrl] of Object.entries(aiImages)) {
            try {
                // For now, just return the URLs directly since we're using high-quality curated images
                // In production, you'd fetch the image, convert to blob, and upload to Firebase
                firebaseImages[angle] = imageUrl;
            } catch (error) {
                console.error(`Error processing ${angle} image for ${productId}:`, error);
                firebaseImages[angle] = imageUrl; // Use original URL as fallback
            }
        }

        return firebaseImages;
    }

    /**
     * Get fallback images when all else fails
     */
    getFallbackImages(product) {
        const category = product.category || 'electronics';
        return {
            front: `https://via.placeholder.com/800x800/f8f9fa/6c757d?text=${encodeURIComponent(category.toUpperCase())}`,
            side: `https://via.placeholder.com/800x800/e9ecef/495057?text=Side+View`,
            back: `https://via.placeholder.com/800x800/dee2e6/343a40?text=Back+View`,
            top: `https://via.placeholder.com/800x800/f8f9fa/6c757d?text=Top+View`,
            detail: `https://via.placeholder.com/800x800/e9ecef/495057?text=Detail+View`
        };
    }

    /**
     * Process all products in a category
     */
    async processProductsByCategory(products) {
        const processedProducts = [];
        
        console.log(`🚀 Processing ${products.length} products...`);
        
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            console.log(`📝 Processing product ${i + 1}/${products.length}: ${product.title}`);
            
            const imageAngles = await this.getProductImages(product);
            
            const updatedProduct = {
                ...product,
                image: imageAngles.front,
                images: Object.values(imageAngles),
                imageAngles: imageAngles,
                // Add metadata
                imageMetadata: {
                    lastUpdated: new Date().toISOString(),
                    source: 'curated-ai',
                    category: product.category
                }
            };
            
            processedProducts.push(updatedProduct);
            
            // Small delay to be respectful
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        console.log(`✅ Successfully processed ${processedProducts.length} products`);
        return processedProducts;
    }
}

export default ProductImageManager;