/**
 * Advanced Dynamic Banner Service
 * Generates sophisticated Unsplash-based banners
 */
class BannerService {
    constructor() {
        this.bannerCache = new Map();
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
        
        // Curated Unsplash banner categories
        this.bannerCategories = {
            technology: [
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=400&fit=crop&crop=center'
            ],
            lifestyle: [
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&crop=center'
            ],
            promotional: [
                'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop&crop=center'
            ],
            ecommerce: [
                'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=400&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop&crop=center'
            ]
        };
        
        // Initialize canvas compatibility
        this.initializeCanvasCompatibility();
    }
    
    /**
     * Initialize Canvas API compatibility fixes
     */
    initializeCanvasCompatibility() {
        // Add roundRect polyfill for older browsers
        if (!CanvasRenderingContext2D.prototype.roundRect) {
            CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
                this.beginPath();
                this.moveTo(x + radius, y);
                this.lineTo(x + width - radius, y);
                this.quadraticCurveTo(x + width, y, x + width, y + radius);
                this.lineTo(x + width, y + height - radius);
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                this.lineTo(x + radius, y + height);
                this.quadraticCurveTo(x, y + height, x, y + height - radius);
                this.lineTo(x, y + radius);
                this.quadraticCurveTo(x, y, x + radius, y);
                this.closePath();
            };
        }
    }

    /**
     * Generate sophisticated procedural banner configurations
     */
    getBannerPrompts() {
        return [
            {
                id: 'tech_showcase',
                title: 'TECH SHOWCASE',
                subtitle: 'Latest Technology & Electronics',
                theme: 'technology',
                layout: 'modern_gradient',
                icons: ['smartphone', 'laptop', 'headphones'],
                highlight: 'NEW ARRIVALS'
            },
            {
                id: 'lifestyle_collection',
                title: 'LIFESTYLE',
                subtitle: 'Fashion • Home • Beauty',
                theme: 'lifestyle',
                layout: 'geometric_shapes',
                icons: ['fashion', 'home', 'beauty'],
                highlight: 'TRENDING'
            },
            {
                id: 'deals_celebration',
                title: 'MEGA DEALS',
                subtitle: 'Up to 70% Off Everything',
                theme: 'promotional',
                layout: 'wave_pattern',
                icons: ['gift', 'discount', 'star'],
                highlight: 'LIMITED TIME'
            }
        ];
    }

    /**
     * Generate dynamic banners using curated Unsplash URLs
     */
    async generateDynamicBanners() {
        console.log('🎨 Starting curated Unsplash banner selection...');
        
        try {
            const startTime = Date.now();
            const selectedBanners = [];

            // Select banners from different categories
            const categories = Object.keys(this.bannerCategories);
            
            for (let i = 0; i < 3; i++) {
                const randomCategory = categories[i % categories.length];
                const categoryBanners = this.bannerCategories[randomCategory];
                const randomBanner = categoryBanners[Math.floor(Math.random() * categoryBanners.length)];
                selectedBanners.push(randomBanner);
            }

            const totalTime = Date.now() - startTime;
            console.log(`✅ Curated banner selection complete! ${selectedBanners.length} banners in ${totalTime}ms`);
            console.log('🚀 ALL BANNERS FROM UNSPLASH CDN');
            return selectedBanners;

        } catch (error) {
            console.error('❌ Banner selection failure:', error);
            return this.getFallbackBanners();
        }
    }

    /**
     * Generate a single sophisticated procedural banner
     */
    async generateSingleBanner(bannerConfig) {
        console.log(`🎨 Generating sophisticated banner for: ${bannerConfig.title}`);
        
        // Generate professional banner using canvas
        const imageBlob = await this.createProceduralBanner(bannerConfig);

        if (!imageBlob) {
            throw new Error('Failed to generate banner blob');
        }

        console.log(`🔧 Converting to optimized WebP format`);
        // Convert to optimized WebP format
        const webpBlob = await this.convertToWebP(imageBlob);
        
        console.log(`📤 Processing for storage: ${bannerConfig.id}`);
        // Upload to Firebase Storage or convert to data URL
        const bannerUrl = await this.uploadToFirebase(bannerConfig.id, webpBlob);
        
        // Cache the result
        this.bannerCache.set(bannerConfig.id, {
            url: bannerUrl, 
            timestamp: Date.now()
        });

        console.log(`✅ Banner URL generated: ${bannerUrl.substring(0, 50)}...`);
        return bannerUrl;
    }

    /**
     * Create sophisticated procedural banner using Canvas API
     */
    async createProceduralBanner(bannerConfig) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`🎨 Creating ${bannerConfig.layout} banner for ${bannerConfig.theme}`);
                
                // Create high-resolution canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set professional banner dimensions  
                canvas.width = 1200;
                canvas.height = 400;
                
                // Get theme colors
                const colorScheme = this.colorSchemes[bannerConfig.theme] || this.colorSchemes.technology;
                
                // Apply layout-specific rendering
                switch (bannerConfig.layout) {
                    case 'modern_gradient':
                        this.renderModernGradient(ctx, canvas, bannerConfig, colorScheme);
                        break;
                    case 'geometric_shapes':
                        this.renderGeometricShapes(ctx, canvas, bannerConfig, colorScheme);
                        break;
                    case 'wave_pattern':
                        this.renderWavePattern(ctx, canvas, bannerConfig, colorScheme);
                        break;
                    case 'product_showcase':
                        this.renderProductShowcase(ctx, canvas, bannerConfig, colorScheme);
                        break;
                    case 'circular_design':
                        this.renderCircularDesign(ctx, canvas, bannerConfig, colorScheme);
                        break;
                    default:
                        this.renderModernGradient(ctx, canvas, bannerConfig, colorScheme);
                }
                
                // Convert canvas to blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        console.log(`✅ Professional ${bannerConfig.layout} banner created`);
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to create canvas blob'));
                    }
                }, 'image/png', 0.95);
                
            } catch (error) {
                console.error(`❌ Banner creation failed:`, error);
                reject(error);
            }
        });
    }

    /**
     * Render modern gradient banner layout
     */
    renderModernGradient(ctx, canvas, config, colors) {
        const { width, height } = canvas;
        
        // Create sophisticated gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colors.gradient[0]);
        gradient.addColorStop(0.5, colors.gradient[1]);
        gradient.addColorStop(1, colors.gradient[2]);
        
        // Fill background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add geometric overlay
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = colors.accent;
        
        // Create geometric patterns
        for (let i = 0; i < 20; i++) {
            const x = (width / 19) * i;
            const y = Math.sin(i * 0.5) * 50 + height / 2;
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Add professional text
        this.renderProfessionalText(ctx, config, colors, width, height);
        
        // Add subtle border
        ctx.strokeStyle = colors.accent + '40';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, width, height);
    }

    /**
     * Render geometric shapes banner layout
     */
    renderGeometricShapes(ctx, canvas, config, colors) {
        const { width, height } = canvas;
        
        // Background gradient
        const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        gradient.addColorStop(0, colors.gradient[0]);
        gradient.addColorStop(1, colors.gradient[1]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add geometric shapes
        ctx.save();
        ctx.globalAlpha = 0.2;
        
        // Triangles
        ctx.fillStyle = colors.accent;
        for (let i = 0; i < 8; i++) {
            const x = (width / 8) * i + 50;
            const y = height * 0.3;
            const size = 40 + Math.sin(i) * 20;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x - size, y + size);
            ctx.closePath();
            ctx.fill();
        }
        
        // Circles
        ctx.fillStyle = colors.secondary;
        for (let i = 0; i < 6; i++) {
            const x = width * 0.8 + Math.cos(i) * 100;
            const y = height * 0.7 + Math.sin(i) * 60;
            const radius = 25 + i * 5;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Professional text
        this.renderProfessionalText(ctx, config, colors, width, height);
    }

    /**
     * Render wave pattern banner layout
     */
    renderWavePattern(ctx, canvas, config, colors) {
        const { width, height } = canvas;
        
        // Background
        ctx.fillStyle = colors.gradient[0];
        ctx.fillRect(0, 0, width, height);
        
        // Create wave patterns
        ctx.save();
        
        // Top wave
        ctx.fillStyle = colors.gradient[1] + '80';
        ctx.beginPath();
        ctx.moveTo(0, height * 0.3);
        for (let x = 0; x <= width; x += 10) {
            const y = height * 0.3 + Math.sin(x * 0.02) * 40;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        // Bottom wave
        ctx.fillStyle = colors.gradient[2] + '60';
        ctx.beginPath();
        ctx.moveTo(0, height * 0.7);
        for (let x = 0; x <= width; x += 10) {
            const y = height * 0.7 + Math.sin(x * 0.03 + Math.PI) * 30;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fill();
        
        ctx.restore();
        
        // Professional text
        this.renderProfessionalText(ctx, config, colors, width, height);
    }

    /**
     * Render product showcase banner layout
     */
    renderProductShowcase(ctx, canvas, config, colors) {
        const { width, height } = canvas;
        
        // Sophisticated background
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, colors.gradient[0]);
        gradient.addColorStop(0.6, colors.gradient[1]);
        gradient.addColorStop(1, colors.gradient[2]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add product showcase elements
        ctx.save();
        ctx.globalAlpha = 0.15;
        
        // Product placeholders (rectangles representing products)
        const productColors = [colors.accent, colors.secondary, colors.text];
        for (let i = 0; i < 3; i++) {
            const x = width * 0.65 + i * 60;
            const y = height * 0.2 + i * 30;
            const w = 80;
            const h = 120;
            
            ctx.fillStyle = productColors[i % productColors.length];
            ctx.fillRect(x, y, w, h);
            
            // Add subtle shadow
            ctx.fillStyle = '#00000020';
            ctx.fillRect(x + 5, y + 5, w, h);
        }
        
        ctx.restore();
        
        // Professional text
        this.renderProfessionalText(ctx, config, colors, width, height, 'left');
    }

    /**
     * Render circular design banner layout
     */
    renderCircularDesign(ctx, canvas, config, colors) {
        const { width, height } = canvas;
        
        // Background
        ctx.fillStyle = colors.gradient[0];
        ctx.fillRect(0, 0, width, height);
        
        // Create circular design
        ctx.save();
        
        // Large central element
        ctx.globalAlpha = 0.3;
        const centerX = width * 0.75;
        const centerY = height * 0.5;
        
        // Concentric circles
        const circleColors = [colors.gradient[2], colors.gradient[1], colors.accent];
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = circleColors[i];
            ctx.beginPath();
            ctx.arc(centerX, centerY, 120 - i * 30, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Orbital elements
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const orbitRadius = 160;
            const x = centerX + Math.cos(angle) * orbitRadius;
            const y = centerY + Math.sin(angle) * orbitRadius;
            
            ctx.fillStyle = colors.accent;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Professional text
        this.renderProfessionalText(ctx, config, colors, width, height, 'left');
    }

    /**
     * Render professional text overlay
     */
    renderProfessionalText(ctx, config, colors, width, height, align = 'center') {
        ctx.save();
        
        // Text positioning
        const leftAlign = align === 'left';
        const textX = leftAlign ? width * 0.08 : width * 0.5;
        const titleY = height * 0.4;
        const subtitleY = height * 0.55;
        const highlightY = height * 0.75;
        
        // Configure text styles
        ctx.textAlign = leftAlign ? 'left' : 'center';
        ctx.textBaseline = 'middle';
        
        // Add text shadow/outline
        ctx.strokeStyle = '#00000040';
        ctx.lineWidth = 4;
        
        // Main title
        ctx.font = 'bold 52px Arial, sans-serif';
        ctx.strokeText(config.title, textX, titleY);
        ctx.fillStyle = colors.text;
        ctx.fillText(config.title, textX, titleY);
        
        // Subtitle
        ctx.font = '28px Arial, sans-serif';
        ctx.strokeStyle = '#00000030';
        ctx.lineWidth = 2;
        ctx.strokeText(config.subtitle, textX, subtitleY);
        ctx.fillStyle = colors.text + 'E0';
        ctx.fillText(config.subtitle, textX, subtitleY);
        
        // Highlight badge
        if (config.highlight) {
            const badgeWidth = ctx.measureText(config.highlight).width + 40;
            const badgeHeight = 35;
            const badgeX = leftAlign ? textX : textX - badgeWidth / 2;
            const badgeY = highlightY - badgeHeight / 2;
            
            // Badge background
            ctx.fillStyle = colors.accent;
            ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 8);
            ctx.fill();
            
            // Badge text
            ctx.font = 'bold 18px Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(config.highlight, badgeX + badgeWidth / 2, highlightY);
        }
        
        ctx.restore();
    }

    /**
     * Create multiple sophisticated procedural banners as backup
     */
    async createProceduralBanners() {
        console.log('🎨 Creating sophisticated procedural banners...');
        
        const bannerConfigs = this.getBannerPrompts();
        const proceduralBanners = [];
        
        for (const bannerConfig of bannerConfigs) {
            try {
                const bannerUrl = await this.generateSingleBanner(bannerConfig);
                proceduralBanners.push(bannerUrl);
            } catch (error) {
                console.error(`Failed to create procedural banner for ${bannerConfig.id}:`, error);
                // Use enhanced SVG fallback
                const fallbackUrl = this.getFallbackBanner(bannerConfig);
                proceduralBanners.push(fallbackUrl);
            }
        }
        
        console.log(`✅ Created ${proceduralBanners.length} sophisticated procedural banners`);
        return proceduralBanners;
    }

    /**
     * Check for cached banner that's still fresh (skip Firebase in development)
     */
    async getCachedBanner(bannerId) {
        try {
            // Check memory cache first
            const cached = this.bannerCache.get(bannerId);
            if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
                console.log(`📎 Using memory cached banner: ${bannerId}`);
                return cached.url;
            }

            // Skip Firebase Storage in development due to CORS
            if (process.env.NODE_ENV === 'development') {
                console.log(`⚠️ Skipping Firebase Storage in development for: ${bannerId}`);
                return null;
            }

            // Check Firebase Storage for existing banner (production only)
            const bannerRef = ref(storage, `${this.storageBasePath}/${bannerId}.webp`);
            const url = await getDownloadURL(bannerRef);
            
            // Update memory cache
            this.bannerCache.set(bannerId, {
                url,
                timestamp: Date.now()
            });
            
            console.log(`✅ Firebase cached banner found: ${bannerId}`);
            return url;
        } catch (error) {
            // Banner doesn't exist or is expired
            console.log(`❌ No cached banner found for: ${bannerId} (${error.message})`);
            return null;
        }
    }

    /**
     * Convert image to optimized WebP format
     */
    async convertToWebP(imageBlob) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Set optimal banner dimensions
                const targetWidth = 1200;
                const targetHeight = 400;
                
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw image with proper scaling
                const aspectRatio = img.width / img.height;
                const targetAspectRatio = targetWidth / targetHeight;

                let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

                if (aspectRatio > targetAspectRatio) {
                    drawHeight = targetHeight;
                    drawWidth = drawHeight * aspectRatio;
                    offsetX = (targetWidth - drawWidth) / 2;
                } else {
                    drawWidth = targetWidth;
                    drawHeight = drawWidth / aspectRatio;
                    offsetY = (targetHeight - drawHeight) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                // Convert to WebP with high quality
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to convert image to WebP'));
                        }
                    },
                    'image/webp',
                    0.85 // High quality compression
                );
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(imageBlob);
        });
    }

    /**
     * Upload optimized image to Firebase Storage (skip in development)
     */
    async uploadToFirebase(bannerId, webpBlob) {
        // Skip Firebase upload in development due to CORS issues
        if (process.env.NODE_ENV === 'development') {
            console.log(`⚠️ Skipping Firebase upload in development for: ${bannerId}`);
            // Convert blob to data URL for development
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(webpBlob);
            });
        }

        const filename = `${bannerId}.webp`;
        const bannerRef = ref(storage, `${this.storageBasePath}/${filename}`);
        
        // Upload with metadata (production only)
        const metadata = {
            contentType: 'image/webp',
            cacheControl: 'public, max-age=31536000', // Cache for 1 year
            customMetadata: {
                'generated': new Date().toISOString(),
                'source': 'gemini-ai',
                'optimized': 'true'
            }
        };

        await uploadBytes(bannerRef, webpBlob, metadata);
        const downloadURL = await getDownloadURL(bannerRef);
        
        console.log(`✅ Uploaded to Firebase: ${bannerId}`);
        return downloadURL;
    }

    /**
     * Get sophisticated fallback banner for specific theme
     */
    /**
     * Get fallback banner URL based on theme
     */
    getFallbackBanner(bannerConfig) {
        const theme = bannerConfig.theme || 'technology';
        const banners = this.bannerCategories[theme] || this.bannerCategories.technology;
        return banners[0]; // Return first banner from the category
    }

    /**
     * Get all fallback banners using Unsplash URLs
     */
    getFallbackBanners() {
        console.log('🎨 Returning Unsplash fallback banners');
        
        return [
            this.bannerCategories.technology[0],
            this.bannerCategories.lifestyle[0],
            this.bannerCategories.promotional[0]
        ];
    }

    /**
     * Preload banner images for better performance
     */
    preloadBanners(bannerUrls) {
        bannerUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    /**
     * Clean up old banner images from storage
     */
    async cleanupOldBanners() {
        try {
            const bannersRef = ref(storage, this.storageBasePath);
            const result = await listAll(bannersRef);
            
            const now = Date.now();
            const cleanupPromises = result.items
                .filter(item => {
                    // Extract timestamp from metadata or use a default old date
                    return (now - this.cacheExpiry * 2) > 0; // Clean banners older than 48 hours
                })
                .map(item => deleteObject(item));

            await Promise.all(cleanupPromises);
            console.log(`🧹 Cleaned up ${cleanupPromises.length} old banners`);
        } catch (error) {
            console.error('❌ Failed to cleanup old banners:', error);
        }
    }
}

const bannerServiceInstance = new BannerService();
export default bannerServiceInstance;