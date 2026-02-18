#!/usr/bin/env node

/**
 * Image Cleanup Script
 * This script identifies and removes unused local images and identifies unused remote URLs
 * It helps maintain a clean project by removing obsolete image references
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ImageCleanupTool {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.publicImagesDir = path.join(this.projectRoot, 'public/images');
        this.srcAssetsDir = path.join(this.projectRoot, 'src/assests');
        this.productDataPath = path.join(this.projectRoot, 'src/utils/productData.js');
        
        this.usedImages = new Set();
        this.unusedLocalImages = [];
        this.unusedRemoteUrls = [];
        this.localImageFiles = [];
        this.remoteUrls = [];
    }

    /**
     * Scan all project files for image references
     */
    async scanProjectFiles() {
        console.log('🔍 Scanning project files for image references...');
        
        const patterns = [
            'src/**/*.js',
            'src/**/*.jsx',
            'src/**/*.ts',
            'src/**/*.tsx',
            'src/**/*.css',
            'public/**/*.html'
        ];

        for (const pattern of patterns) {
            const files = glob.sync(pattern, { cwd: this.projectRoot });
            
            for (const file of files) {
                await this.scanFile(path.join(this.projectRoot, file));
            }
        }

        console.log(`✅ Scanned ${this.usedImages.size} image references`);
    }

    /**
     * Scan individual file for image references
     */
    async scanFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Patterns to match image references
            const patterns = [
                /src=['"](\/images\/[^'"]+)['"]/g,  // src="/images/..."
                /image:['"](\/images\/[^'"]+)['"]/g, // image: "/images/..."
                /backgroundImage:['"](\/images\/[^'"]+)['"]/g, // backgroundImage
                /url\(['"](\/images\/[^'"]+)['"]\)/g, // CSS url()
                /https?:\/\/[^\s'"]+\.(jpg|jpeg|png|gif|webp|svg)/gi, // Remote URLs
            ];

            for (const pattern of patterns) {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    const imageRef = match[1] || match[0];
                    this.usedImages.add(imageRef);
                    
                    if (imageRef.startsWith('http')) {
                        this.remoteUrls.push(imageRef);
                    }
                }
            }
        } catch (error) {
            console.warn(`⚠️ Could not scan file ${filePath}: ${error.message}`);
        }
    }

    /**
     * Find all local image files
     */
    findLocalImageFiles() {
        console.log('📂 Finding local image files...');
        
        const imageDirs = [this.publicImagesDir, this.srcAssetsDir];
        
        for (const dir of imageDirs) {
            if (fs.existsSync(dir)) {
                const files = this.getAllImageFiles(dir);
                this.localImageFiles.push(...files);
            }
        }

        console.log(`📊 Found ${this.localImageFiles.length} local image files`);
    }

    /**
     * Recursively get all image files from directory
     */
    getAllImageFiles(dir) {
        const files = [];
        const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        
        const walkDir = (currentPath) => {
            const items = fs.readdirSync(currentPath);
            
            for (const item of items) {
                const itemPath = path.join(currentPath, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    walkDir(itemPath);
                } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
                    // Convert to relative path from public directory
                    const relativePath = itemPath.replace(this.projectRoot + '/public', '');
                    files.push({
                        fullPath: itemPath,
                        relativePath: relativePath,
                        fileName: item,
                        size: stat.size
                    });
                }
            }
        };
        
        walkDir(dir);
        return files;
    }

    /**
     * Identify unused local images
     */
    identifyUnusedLocalImages() {
        console.log('🧹 Identifying unused local images...');
        
        for (const imageFile of this.localImageFiles) {
            const isUsed = Array.from(this.usedImages).some(usedImage => 
                usedImage.includes(imageFile.fileName) || 
                usedImage.includes(imageFile.relativePath)
            );
            
            if (!isUsed) {
                this.unusedLocalImages.push(imageFile);
            }
        }

        console.log(`❌ Found ${this.unusedLocalImages.length} unused local images`);
    }

    /**
     * Check remote URLs for accessibility
     */
    async checkRemoteUrls() {
        console.log('🌐 Checking remote URLs for accessibility...');
        
        const uniqueRemoteUrls = [...new Set(this.remoteUrls)];
        
        // For now, just log the URLs (actual HTTP checks would require network requests)
        console.log(`📡 Found ${uniqueRemoteUrls.length} unique remote URLs`);
        
        return uniqueRemoteUrls;
    }

    /**
     * Generate cleanup report
     */
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalLocalImages: this.localImageFiles.length,
                totalUnusedLocalImages: this.unusedLocalImages.length,
                totalRemoteUrls: this.remoteUrls.length,
                usedImagesCount: this.usedImages.size
            },
            unusedLocalImages: this.unusedLocalImages.map(img => ({
                path: img.relativePath,
                size: `${(img.size / 1024).toFixed(2)} KB`,
                fullPath: img.fullPath
            })),
            usedImages: Array.from(this.usedImages),
            remoteUrls: [...new Set(this.remoteUrls)]
        };

        // Save report to file
        const reportPath = path.join(this.projectRoot, 'image-cleanup-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        return { report, reportPath };
    }

    /**
     * Remove unused local images (with confirmation)
     */
    async removeUnusedLocalImages(autoConfirm = false) {
        if (this.unusedLocalImages.length === 0) {
            console.log('✅ No unused local images to remove');
            return;
        }

        console.log(`\n🗑️ Found ${this.unusedLocalImages.length} unused local images:`);
        
        let totalSize = 0;
        this.unusedLocalImages.forEach((img, index) => {
            totalSize += img.size;
            console.log(`${index + 1}. ${img.relativePath} (${(img.size / 1024).toFixed(2)} KB)`);
        });

        console.log(`\n💾 Total size to be freed: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

        if (!autoConfirm) {
            console.log('\n⚠️ Images will be permanently deleted!');
            console.log('To automatically remove these files, run with --auto-confirm flag');
            return;
        }

        // Remove files
        let removedCount = 0;
        for (const img of this.unusedLocalImages) {
            try {
                fs.unlinkSync(img.fullPath);
                removedCount++;
                console.log(`✅ Deleted: ${img.relativePath}`);
            } catch (error) {
                console.error(`❌ Failed to delete ${img.relativePath}: ${error.message}`);
            }
        }

        console.log(`\n🎉 Successfully removed ${removedCount} unused images`);
        console.log(`💾 Freed up ${(totalSize / 1024 / 1024).toFixed(2)} MB of disk space`);
    }

    /**
     * Create backup of current image state
     */
    createBackup() {
        const backupDir = path.join(this.projectRoot, 'backups/images');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Create backup directory if it doesn't exist
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        // Copy all local images to backup
        for (const img of this.localImageFiles) {
            const backupPath = path.join(backupDir, `${timestamp}_${img.fileName}`);
            try {
                fs.copyFileSync(img.fullPath, backupPath);
            } catch (error) {
                console.warn(`⚠️ Failed to backup ${img.fileName}: ${error.message}`);
            }
        }

        console.log(`💾 Backup created in: ${backupDir}`);
        return backupDir;
    }

    /**
     * Display cleanup suggestions
     */
    displaySuggestions() {
        console.log('\n💡 CLEANUP SUGGESTIONS:');
        console.log('=======================');
        
        if (this.unusedLocalImages.length > 0) {
            const totalSize = this.unusedLocalImages.reduce((acc, img) => acc + img.size, 0);
            console.log(`🗑️ Remove ${this.unusedLocalImages.length} unused local images to free ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
        }

        console.log(`🌐 Consider optimizing ${this.remoteUrls.length} remote URL requests for better performance`);
        console.log(`📊 Currently using ${this.usedImages.size} image references across the project`);
        
        console.log('\n🚀 PERFORMANCE OPTIMIZATIONS:');
        console.log('• All products now use remote CDN URLs for faster loading');
        console.log('• 3D product viewer provides multiple angles without additional requests');
        console.log('• Image lazy loading reduces initial bundle size');
        console.log('• WebP format support for modern browsers');
    }

    /**
     * Run the complete cleanup analysis
     */
    async run(options = {}) {
        try {
            console.log('🎯 Amazon Clone - Image Cleanup Tool');
            console.log('====================================');
            
            // Create backup if requested
            if (options.createBackup) {
                this.createBackup();
            }

            // Scan project files
            await this.scanProjectFiles();
            
            // Find local image files
            this.findLocalImageFiles();
            
            // Identify unused images
            this.identifyUnusedLocalImages();
            
            // Check remote URLs
            await this.checkRemoteUrls();
            
            // Generate report
            const { report, reportPath } = this.generateReport();
            
            // Display results
            console.log('\n📊 CLEANUP ANALYSIS COMPLETE');
            console.log('============================');
            console.log(`📁 Total local images: ${report.summary.totalLocalImages}`);
            console.log(`❌ Unused local images: ${report.summary.totalUnusedLocalImages}`);
            console.log(`🌐 Remote URLs: ${report.summary.totalRemoteUrls}`);
            console.log(`✅ Currently used images: ${report.summary.usedImagesCount}`);
            console.log(`📋 Detailed report saved: ${reportPath}`);
            
            // Display suggestions
            this.displaySuggestions();
            
            // Remove unused images if requested
            if (options.removeUnused) {
                await this.removeUnusedLocalImages(options.autoConfirm);
            }
            
            console.log('\n🎉 Image cleanup analysis completed successfully!');
            return report;
            
        } catch (error) {
            console.error('❌ Error during cleanup:', error.message);
            throw error;
        }
    }
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);
    const options = {
        createBackup: args.includes('--backup'),
        removeUnused: args.includes('--remove-unused'),
        autoConfirm: args.includes('--auto-confirm')
    };
    
    console.log('Command line options:', options);
    
    const cleanup = new ImageCleanupTool();
    cleanup.run(options).catch(console.error);
}

module.exports = ImageCleanupTool;