import ProductImageManager from '../utils/productImageManager';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Migration Script: Gemini AI + Firebase Storage Integration
 * Replaces all Unsplash URLs with category-organized Firebase Storage + Gemini AI images
 */

class ProductDataMigration {
    constructor() {
        this.imageManager = new ProductImageManager();
        this.productDataPath = join(__dirname, '../utils/productData.js');
        this.backupPath = join(__dirname, '../utils/productData.backup.js');
    }

    async migrate() {
        try {
            console.log('🔄 Starting Firebase Storage + Gemini AI migration...');
            
            // Read current productData.js
            const currentData = await this.readCurrentProductData();
            
            // Create backup
            await this.createBackup(currentData);
            
            // Process all products with the new image manager
            const processedProducts = await this.imageManager.processProductsByCategory(currentData);
            
            // Generate new productData.js content
            const newContent = this.generateNewProductDataFile(processedProducts);
            
            // Write updated file
            await this.writeUpdatedProductData(newContent);
            
            // Generate migration report
            await this.generateMigrationReport(currentData, processedProducts);
            
            console.log('✅ Migration completed successfully!');
            
        } catch (error) {
            console.error('❌ Migration failed:', error);
            throw error;
        }
    }

    async readCurrentProductData() {
        try {
            const content = await readFile(this.productDataPath, 'utf-8');
            
            // Extract products array from the file
            const productsMatch = content.match(/const products = (\[[\s\S]*?\]);/);
            if (!productsMatch) {
                throw new Error('Could not find products array in productData.js');
            }
            
            // Use eval to parse the array (be careful in production)
            const productsString = productsMatch[1];
            const products = eval(productsString);
            
            console.log(`📖 Read ${products.length} products from productData.js`);
            return products;
            
        } catch (error) {
            console.error('Error reading productData.js:', error);
            throw error;
        }
    }

    async createBackup(products) {
        try {
            const backupContent = `// Backup created on ${new Date().toISOString()}
// Original productData.js before Firebase Storage + Gemini AI migration

const products = ${JSON.stringify(products, null, 2)};

export default products;
`;
            
            await writeFile(this.backupPath, backupContent, 'utf-8');
            console.log('💾 Backup created at productData.backup.js');
            
        } catch (error) {
            console.error('Error creating backup:', error);
            throw error;
        }
    }

    generateNewProductDataFile(products) {
        const header = `// productData.js
// Updated with Firebase Storage + Gemini AI integration
// Generated on ${new Date().toISOString()}

`;

        const productsCode = `const products = ${JSON.stringify(products, null, 2)};`;

        const footer = `

export default products;

// Migration Info:
// - Integrated Firebase Storage for image management
// - Category-organized product images (electronics, mobiles, fashion, furniture, home, sports)
// - High-quality curated images with multiple angles
// - Gemini AI ready for custom image generation
// - Comprehensive fallback system for error handling
// - Metadata tracking for image sources and updates
`;

        return header + productsCode + footer;
    }

    async writeUpdatedProductData(content) {
        try {
            await writeFile(this.productDataPath, content, 'utf-8');
            console.log('📝 Updated productData.js written successfully');
            
        } catch (error) {
            console.error('Error writing updated productData.js:', error);
            throw error;
        }
    }

    async generateMigrationReport(originalProducts, processedProducts) {
        const reportPath = join(__dirname, '../utils/migration-report.json');
        
        const report = {
            migrationDate: new Date().toISOString(),
            summary: {
                totalProducts: originalProducts.length,
                processedProducts: processedProducts.length,
                categoriesProcessed: [...new Set(processedProducts.map(p => p.category))],
                imageAnglesAdded: processedProducts.filter(p => p.imageAngles && Object.keys(p.imageAngles).length > 1).length
            },
            categories: this.analyzeCategories(processedProducts),
            changes: this.analyzeChanges(originalProducts, processedProducts),
            imageQuality: this.analyzeImageQuality(processedProducts)
        };

        await writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
        
        // Console report
        console.log('\n📊 MIGRATION REPORT');
        console.log('==================');
        console.log(`✅ Total products processed: ${report.summary.totalProducts}`);
        console.log(`📂 Categories: ${report.summary.categoriesProcessed.join(', ')}`);
        console.log(`🖼️ Products with multiple angles: ${report.summary.imageAnglesAdded}`);
        console.log(`📄 Full report saved to: migration-report.json`);
        
        return report;
    }

    analyzeCategories(products) {
        const categoryAnalysis = {};
        
        products.forEach(product => {
            const category = product.category || 'uncategorized';
            if (!categoryAnalysis[category]) {
                categoryAnalysis[category] = {
                    count: 0,
                    averageAngles: 0,
                    products: []
                };
            }
            
            categoryAnalysis[category].count++;
            categoryAnalysis[category].averageAngles += Object.keys(product.imageAngles || {}).length;
            categoryAnalysis[category].products.push({
                id: product.id,
                title: product.title,
                angles: Object.keys(product.imageAngles || {})
            });
        });

        // Calculate averages
        Object.keys(categoryAnalysis).forEach(category => {
            const analysis = categoryAnalysis[category];
            analysis.averageAngles = Math.round(analysis.averageAngles / analysis.count);
        });

        return categoryAnalysis;
    }

    analyzeChanges(original, processed) {
        const changes = {
            imageSourceChanged: 0,
            multipleAnglesAdded: 0,
            metadataAdded: 0,
            fallbacksUsed: 0
        };

        processed.forEach((product, index) => {
            const originalProduct = original[index];
            
            // Check if image source changed
            if (originalProduct && originalProduct.image !== product.image) {
                changes.imageSourceChanged++;
            }
            
            // Check for multiple angles
            if (product.imageAngles && Object.keys(product.imageAngles).length > 1) {
                changes.multipleAnglesAdded++;
            }
            
            // Check for metadata
            if (product.imageMetadata) {
                changes.metadataAdded++;
            }
            
            // Check for fallbacks (placeholder images)
            if (product.image && product.image.includes('placeholder')) {
                changes.fallbacksUsed++;
            }
        });

        return changes;
    }

    analyzeImageQuality(products) {
        const quality = {
            highResolution: 0,
            multipleAngles: 0,
            consistentSizing: 0,
            webpOptimized: 0
        };

        products.forEach(product => {
            // Check for high resolution (800x800 from our curated images)
            if (product.image && product.image.includes('800x800')) {
                quality.highResolution++;
            }
            
            // Check for multiple angles
            if (product.imageAngles && Object.keys(product.imageAngles).length >= 3) {
                quality.multipleAngles++;
            }
            
            // Check for consistent sizing
            if (product.imageAngles) {
                const urls = Object.values(product.imageAngles);
                const hasSizing = urls.every(url => url.includes('800x800') || url.includes('w=800'));
                if (hasSizing) {
                    quality.consistentSizing++;
                }
            }
            
            // Check for WebP optimization (our URLs support it)
            if (product.image && (product.image.includes('unsplash.com') || product.image.includes('firebasestorage'))) {
                quality.webpOptimized++;
            }
        });

        return quality;
    }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const migration = new ProductDataMigration();
    migration.migrate().catch(console.error);
}

export default ProductDataMigration;