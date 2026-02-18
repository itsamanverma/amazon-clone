#!/usr/bin/env node

/**
 * Firebase Storage Cleanup Script
 * Removes all uploaded images from Firebase Storage before switching to Unsplash URLs
 */

const { initializeApp } = require('firebase/app');
const { getStorage, ref, listAll, deleteObject } = require('firebase/storage');

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Delete all files in a storage path recursively
 */
async function deleteAllInPath(storagePath) {
    try {
        const pathRef = ref(storage, storagePath);
        const result = await listAll(pathRef);
        
        let deletedCount = 0;
        
        // Delete all files in this directory
        if (result.items.length > 0) {
            const deletePromises = result.items.map(async (itemRef) => {
                try {
                    await deleteObject(itemRef);
                    console.log(`   🗑️  Deleted: ${itemRef.fullPath}`);
                    return 1;
                } catch (error) {
                    console.error(`   ❌ Failed to delete: ${itemRef.fullPath}`, error.message);
                    return 0;
                }
            });
            
            const results = await Promise.all(deletePromises);
            deletedCount += results.reduce((sum, count) => sum + count, 0);
        }
        
        // Recursively delete subdirectories
        if (result.prefixes.length > 0) {
            for (const folderRef of result.prefixes) {
                const subCount = await deleteAllInPath(folderRef.fullPath);
                deletedCount += subCount;
            }
        }
        
        return deletedCount;
    } catch (error) {
        console.error(`❌ Error listing/deleting path ${storagePath}:`, error.message);
        return 0;
    }
}

/**
 * List all files in storage (for reporting)
 */
async function listAllFiles(storagePath = '') {
    try {
        const pathRef = ref(storage, storagePath);
        const result = await listAll(pathRef);
        
        let files = [];
        
        // Add all files in this directory
        files = files.concat(result.items.map(item => ({
            path: item.fullPath,
            name: item.name
        })));
        
        // Recursively list subdirectories
        for (const folderRef of result.prefixes) {
            const subFiles = await listAllFiles(folderRef.fullPath);
            files = files.concat(subFiles);
        }
        
        return files;
    } catch (error) {
        console.error(`❌ Error listing files in ${storagePath}:`, error.message);
        return [];
    }
}

/**
 * Main cleanup function
 */
async function cleanupFirebaseStorage() {
    console.log('🧹 Firebase Storage Cleanup Tool');
    console.log('==================================\\n');
    
    try {
        // First, list all existing files
        console.log('📋 Scanning Firebase Storage...');
        const allFiles = await listAllFiles();
        
        if (allFiles.length === 0) {
            console.log('✅ No files found in Firebase Storage. Already clean!');
            return;
        }
        
        console.log(`📊 Found ${allFiles.length} files to delete:\\n`);
        
        // Group files by type for reporting
        const bannerFiles = allFiles.filter(f => f.path.startsWith('banners/'));
        const productFiles = allFiles.filter(f => f.path.startsWith('products/'));
        const otherFiles = allFiles.filter(f => !f.path.startsWith('banners/') && !f.path.startsWith('products/'));
        
        console.log(`📁 Banner images: ${bannerFiles.length}`);
        console.log(`📁 Product images: ${productFiles.length}`);
        console.log(`📁 Other files: ${otherFiles.length}\\n`);
        
        // Ask for confirmation
        console.log('⚠️  This will permanently delete ALL files from Firebase Storage!');
        console.log('💾 Make sure you have backups if needed.\\n');
        
        // For automated cleanup, we'll proceed directly
        // In interactive mode, you could add readline here for confirmation
        
        console.log('🚀 Starting cleanup process...\\n');
        
        let totalDeleted = 0;
        
        // Clean up banners
        if (bannerFiles.length > 0) {
            console.log('🎨 Cleaning up banner images...');
            const bannersDeleted = await deleteAllInPath('banners');
            totalDeleted += bannersDeleted;
            console.log(`   ✅ Deleted ${bannersDeleted} banner files\\n`);
        }
        
        // Clean up products
        if (productFiles.length > 0) {
            console.log('📷 Cleaning up product images...');
            const productsDeleted = await deleteAllInPath('products');
            totalDeleted += productsDeleted;
            console.log(`   ✅ Deleted ${productsDeleted} product files\\n`);
        }
        
        // Clean up other files
        if (otherFiles.length > 0) {
            console.log('📂 Cleaning up other files...');
            for (const file of otherFiles) {
                try {
                    const fileRef = ref(storage, file.path);
                    await deleteObject(fileRef);
                    console.log(`   🗑️  Deleted: ${file.path}`);
                    totalDeleted++;
                } catch (error) {
                    console.error(`   ❌ Failed to delete: ${file.path}`, error.message);
                }
            }
            console.log(`   ✅ Processed ${otherFiles.length} other files\\n`);
        }
        
        // Final verification
        console.log('🔍 Verifying cleanup...');
        const remainingFiles = await listAllFiles();
        
        if (remainingFiles.length === 0) {
            console.log('✅ Firebase Storage cleanup completed successfully!');
            console.log(`🎉 Deleted ${totalDeleted} files total\\n`);
            
            console.log('💡 Next steps:');
            console.log('   1. Your app now uses Unsplash URLs exclusively');
            console.log('   2. No Firebase Storage costs for images');
            console.log('   3. All images load from Unsplash CDN');
        } else {
            console.log(`⚠️  ${remainingFiles.length} files could not be deleted:`);
            remainingFiles.forEach(f => console.log(`     - ${f.path}`));
        }
        
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
        process.exit(1);
    }
}

/**
 * Storage usage analysis
 */
async function analyzeStorageUsage() {
    console.log('📊 Firebase Storage Usage Analysis');
    console.log('===================================\\n');
    
    try {
        const allFiles = await listAllFiles();
        
        if (allFiles.length === 0) {
            console.log('✅ Storage is empty - no usage detected');
            return;
        }
        
        // Analyze by type
        const analysis = {
            banners: allFiles.filter(f => f.path.startsWith('banners/')),
            products: allFiles.filter(f => f.path.startsWith('products/')),
            others: allFiles.filter(f => !f.path.startsWith('banners/') && !f.path.startsWith('products/'))
        };
        
        console.log(`📁 Total files: ${allFiles.length}`);
        console.log(`🎨 Banner files: ${analysis.banners.length}`);
        console.log(`📷 Product files: ${analysis.products.length}`);
        console.log(`📂 Other files: ${analysis.others.length}\\n`);
        
        if (analysis.products.length > 0) {
            console.log('📷 Product Image Breakdown:');
            const productCategories = {};
            analysis.products.forEach(f => {
                const pathParts = f.path.split('/');
                const category = pathParts[1] || 'unknown';
                productCategories[category] = (productCategories[category] || 0) + 1;
            });
            
            Object.entries(productCategories).forEach(([category, count]) => {
                console.log(`   📦 ${category}: ${count} images`);
            });
            console.log('');
        }
        
        console.log('💰 Cost Impact:');
        console.log(`   📊 Storage: ~${(allFiles.length * 0.5).toFixed(1)}MB estimated`);
        console.log('   💸 Monthly cost: $0.001 - $0.01 (very low)');
        console.log('   🎯 Cleanup will reduce to: $0');
        
    } catch (error) {
        console.error('❌ Analysis failed:', error.message);
    }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--analyze') || args.includes('-a')) {
    analyzeStorageUsage();
} else if (args.includes('--help') || args.includes('-h')) {
    console.log('🧹 Firebase Storage Cleanup Tool\\n');
    console.log('Usage:');
    console.log('  node cleanup-firebase-storage.js          # Full cleanup');
    console.log('  node cleanup-firebase-storage.js --analyze    # Analyze usage');
    console.log('  node cleanup-firebase-storage.js --help       # Show this help\\n');
} else {
    cleanupFirebaseStorage();
}