#!/usr/bin/env node

/**
 * Generate 3D Product Images Script
 * This script generates multiple angle images for all products using curated high-quality URLs
 * and updates the productData.js file with the new image structure
 */

const fs = require('fs');
const path = require('path');

class ProductImageUpdater {
    constructor() {
        this.productDataPath = path.join(__dirname, '../src/utils/productData.js');
        this.backupPath = path.join(__dirname, '../src/utils/productData.backup.js');
    }

    /**
     * High-quality curated image URLs for different product categories
     * Using Unsplash API with specific product searches for realistic results
     */
    getCuratedProductImages() {
        return {
            // Electronics Category
            pro1: { // SKETCHFAB Extra Bass Headphones
                id: 'pro1',
                front: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop&crop=center'
            },
            pro2: { // Apple Watch Series 5
                id: 'pro2',
                front: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1469833120660-1a218b53d28a?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1510017098667-27dfc6e5e249?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?w=800&h=800&fit=crop&crop=center'
            },
            elec1: { // Canon EOS R5 Camera
                id: 'elec1',
                front: 'https://images.unsplash.com/photo-1606983340077-decb1810e75d?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1516961177779-a71e8588e4df?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=800&h=800&fit=crop&crop=center'
            },
            elec2: { // JBL Flip 6 Speaker
                id: 'elec2',
                front: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=800&fit=crop&crop=center'
            },
            elec3: { // Apple AirPods Pro
                id: 'elec3',
                front: 'https://images.unsplash.com/photo-1603351154351-5cf233081e35?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1572569511254-d8f925dc405e?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1606983340077-decb1810e75d?w=800&h=800&fit=crop&crop=center'
            },
            elec4: { // Apple iPad 10th Gen
                id: 'elec4',
                front: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800&h=800&fit=crop&crop=center',  
                detail: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&h=800&fit=crop&crop=center'
            },
            lap1: { // MacBook Pro 16-inch
                id: 'lap1',
                front: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&crop=center'
            },
            elec5: { // Apple Watch Ultra
                id: 'elec5',
                front: 'https://images.unsplash.com/photo-1510017098667-27dfc6e5e249?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1469833120660-1a218b53d28a?w=800&h=800&fit=crop&crop=center'
            },

            // Mobile Category
            mob1: { // Samsung Galaxy S23 Ultra
                id: 'mob1',
                front: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&crop=center'
            },
            mob2: { // iPhone 14 Pro Max
                id: 'mob2',
                front: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1639436822955-0ad1e4bd13e2?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1664305051040-2a69e1969e1d?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1675789652575-cdb3cb0f3fb6?w=800&h=800&fit=crop&crop=center'
            },
            mob3: { // OnePlus 11 5G
                id: 'mob3',
                front: 'https://images.unsplash.com/photo-1541878511-1308f8b76cef?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop&crop=center', 
                top: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&crop=center'
            },
            mob4: { // Xiaomi 13 Pro
                id: 'mob4',  
                front: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1607936854279-55e8f4bc233b?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=800&h=800&fit=crop&crop=center'
            },

            // Fashion Category  
            fash1: { // Solid Slim Fit Casual Shirt
                id: 'fash1',
                front: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc6ce4e?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1491843667821-014bb7be9568?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1619601112294-bec3578f3e84?w=800&h=800&fit=crop&crop=center'
            },
            fash2: { // Blue Denim Jeans
                id: 'fash2',
                front: 'https://images.unsplash.com/photo-1506629905061-6d4595d65b41?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1542272454315-7ad9f8ccc8b2?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center'
            },
            fash3: { // Luxury Brown Leather Handbag
                id: 'fash3',
                front: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1621229183055-da33b59695f0?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d8f?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&crop=center'
            },
            fash4: { // Men's Sport Shoes
                id: 'fash4',
                front: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&crop=center'
            },
            pro7: { // Asian Men's Running Shoes
                id: 'pro7',
                front: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&h=800&fit=crop&crop=center'
            },

            // Furniture & Home Category
            pro3: { // Woodlab Sheesham Wood Armchair
                id: 'pro3',
                front: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop&crop=center'
            },
            home1: { // Dyson V15 Vacuum
                id: 'home1',
                front: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop&crop=center'
            },
            home2: { // Philips Air Fryer
                id: 'home2',
                front: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop&crop=center'
            },
            sport1: { // Hero Kyoto Mountain Bike
                id: 'sport1',
                front: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1593111881087-7cc07c2b20c1?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800&h=800&fit=crop&crop=center'
            },
            pro8: { // Mongoose Mountain Bike
                id: 'pro8',
                front: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1593111881087-7cc07c2b20c1?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1553979459-d07ba86e3b78?w=800&h=800&fit=crop&crop=center'
            },
            home3: { // Sofa Sack Bean Bag
                id: 'home3',
                front: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&crop=center',
                side: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center',
                back: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop&crop=center',
                top: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&crop=center',
                detail: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop&crop=center'
            }
        };
    }

    /**
     * Backup current productData.js file
     */
    backupProductData() {
        try {
            const currentData = fs.readFileSync(this.productDataPath, 'utf8');
            fs.writeFileSync(this.backupPath, currentData);
            console.log('✅ Backup created successfully');
        } catch (error) {
            console.error('❌ Error creating backup:', error.message);
            throw error;
        }
    }

    /**
     * Update productData.js with new 3D image structure
     */
    async generateUpdatedProductData() {
        console.log('🚀 Starting 3D image generation process...');
        
        try {
            // Create backup first
            this.backupProductData();
            
            // Read current product data
            const currentData = fs.readFileSync(this.productDataPath, 'utf8');
            
            // Extract products array (simple regex parsing)
            const productsMatch = currentData.match(/const products = \[([\s\S]*?)\];/);
            if (!productsMatch) {
                throw new Error('Could not parse products array from productData.js');
            }
            
            // Parse JSON-like structure (simplified)
            let productsContent = productsMatch[1];
            
            // Get curated images
            const curatedImages = this.getCuratedProductImages();
            
            // Generate new product data structure
            const updatedProductsCode = this.generateProductsCode(curatedImages);
            
            // Create new file content
            const newFileContent = currentData.replace(
                /const products = \[[\s\S]*?\];/,
                updatedProductsCode
            );
            
            // Write updated file
            fs.writeFileSync(this.productDataPath, newFileContent);
            
            console.log('✅ Successfully updated productData.js with 3D images');
            console.log('📊 Updated products with multiple angles for enhanced 3D viewing');
            console.log(`💾 Backup saved to: ${this.backupPath}`);
            
            return true;
        } catch (error) {
            console.error('❌ Error updating product data:', error.message);
            throw error;
        }
    }

    /**
     * Generate the products array code with 3D image structure
     */
    generateProductsCode(curatedImages) {
        const products = [
            // Electronics
            {
                id: "pro1",
                title: "SKETCHFAB Extra Bass 2.0 On-Ear Headphones with Tangle Free Cable, 3.5mm Jack, Headset with Mic for Phone Calls.",
                price: 990,
                rating: 5,
                category: "electronics",
                tags: ["best-sellers", "deals"],
                stock: 50,
                ...curatedImages.pro1
            },
            {
                id: "pro2", 
                title: "Apple Watch Series 5. The most advanced Apple Watch yet, featuring the Always-On Retina display.",
                price: 20500,
                rating: 4,
                category: "electronics", 
                tags: ["best-sellers", "new-releases"],
                stock: 15,
                ...curatedImages.pro2
            },
            {
                id: "elec1",
                title: "Canon EOS R5 Mirrorless Camera Body",
                price: 339995,
                rating: 5,
                category: "electronics",
                tags: ["electronics", "prime"],
                stock: 2,
                ...curatedImages.elec1
            },
            {
                id: "elec2",
                title: "JBL Flip 6 Waterproof Portable Bluetooth Speaker - Blue",
                price: 11999,
                rating: 4,
                category: "electronics",
                tags: ["electronics", "deals"],
                stock: 20,
                ...curatedImages.elec2
            },
            {
                id: "elec3",
                title: "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
                price: 24900,
                rating: 5,
                category: "electronics",
                tags: ["electronics", "new-releases", "best-sellers"],
                stock: 100,
                ...curatedImages.elec3
            },
            {
                id: "elec4",
                title: "Apple iPad (10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP back camera, Touch ID, All-Day Battery Life – Blue",
                price: 34900,
                rating: 5,
                category: "electronics",
                tags: ["electronics", "new-releases", "prime"],
                stock: 5,
                ...curatedImages.elec4
            },
            {
                id: "lap1",
                title: "Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey.",
                price: 189900,
                rating: 4,
                category: "electronics",
                tags: ["electronics", "best-sellers", "apple"],
                stock: 8,
                ...curatedImages.lap1
            },
            {
                id: "elec5",
                title: "Apple Watch Ultra [GPS + Cellular 49mm] Titanium Case with Midnight Ocean Band",
                price: 89900,
                rating: 5,
                category: "electronics",
                tags: ["electronics", "wearables", "apple"],
                stock: 12,
                ...curatedImages.elec5
            },

            // Mobiles
            {
                id: "mob1",
                title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
                price: 124999,
                rating: 5,
                category: "mobiles",
                tags: ["mobiles", "android", "best-sellers", "prime"],
                stock: 10,
                ...curatedImages.mob1
            },
            {
                id: "mob2",
                title: "New Apple iPhone 14 Pro Max 128GB - Deep Purple",
                price: 139900,
                rating: 5,
                category: "mobiles",
                tags: ["mobiles", "iphone", "apple", "prime"],
                stock: 3,
                ...curatedImages.mob2
            },
            {
                id: "mob3",
                title: "OnePlus 11 5G (Eternal Green, 16GB RAM, 256GB Storage)",
                price: 56999,
                rating: 4,
                category: "mobiles",
                tags: ["mobiles", "android", "deals"],
                stock: 25,
                ...curatedImages.mob3
            },
            {
                id: "mob4",
                title: "Xiaomi 13 Pro 5G (Ceramic Black, 12GB RAM, 256GB Storage) | Leica Professional Optical Lens",
                price: 74999,
                rating: 4,
                category: "mobiles",
                tags: ["mobiles", "android", "prime"],
                stock: 18,
                ...curatedImages.mob4
            },

            // Fashion
            {
                id: "fash1",
                title: "MANTISHARK Men's Solid Slim Fit Casual Shirt (Available in Multiple Colors)",
                price: 799,
                rating: 4,
                category: "fashion",
                tags: ["fashion", "mens", "clothing"],
                stock: 45,
                ...curatedImages.fash1
            },
            {
                id: "fash2",
                title: "Levi's Men's 512 Slim Taper Fit Blue Denim Jeans",
                price: 2999,
                rating: 4,
                category: "fashion",
                tags: ["fashion", "mens", "clothing"],
                stock: 30,
                ...curatedImages.fash2
            },
            {
                id: "fash3",
                title: "Luxury Brown Leather Women's Handbag", 
                price: 4500,
                rating: 5,
                category: "fashion",
                tags: ["fashion", "best-sellers"],
                stock: 10,
                ...curatedImages.fash3
            },
            {
                id: "fash4",
                title: "HEEDERIN Men's Comfortable Mesh Lace up Sport Shoe.",
                price: 799,
                rating: 4,
                category: "fashion",
                tags: ["fashion", "shoes", "mens"],
                stock: 60,
                ...curatedImages.fash4
            },
            {
                id: "pro7",
                title: "Asian Men's Wonder-13 Sports Running Shoes", 
                price: 699,
                rating: 3,
                category: "fashion",
                tags: ["fashion", "shoes", "mens"],
                stock: 80,
                ...curatedImages.pro7
            },

            // Home & Sports  
            {
                id: "pro3",
                title: "Woodlab Furniture Sheesham Wood Armchairs Outdoor Sofa Chairs for Living Room Dining Chiar for Home.",
                price: 3500,
                rating: 3,
                category: "furniture",
                tags: ["furniture", "home"],
                stock: 6,
                ...curatedImages.pro3
            },
            {
                id: "home1",
                title: "Dyson V15 Detect Cordless Vacuum Cleaner",
                price: 64900,
                rating: 5,
                category: "home",
                tags: ["best-sellers", "prime"],
                stock: 15,
                ...curatedImages.home1
            },
            {
                id: "home2",
                title: "Philips Digital Air Fryer HD9252/90 with Touch Panel",
                price: 8999,
                rating: 5,
                category: "home",
                tags: ["home", "kitchen", "best-sellers"],
                stock: 35,
                ...curatedImages.home2
            },
            {
                id: "sport1",
                title: "Hero Kyoto 26T Single Speed Mountain Bike (Black, Ideal For : 12+ Years ).",
                price: 4999,
                rating: 4,
                category: "sports",
                tags: ["sports", "outdoors"], 
                stock: 9,
                ...curatedImages.sport1
            },
            {
                id: "pro8",
                title: "Heavy Duty 26 Inch Mongoose Men's Mountain Bike with Full Suspension and 21 Speeds - Aluminum Mag Wheels",
                price: 12999,
                rating: 5,
                category: "sports",
                tags: ["sports", "outdoors"],
                stock: 1,
                ...curatedImages.pro8
            },
            {
                id: "home3",
                title: "Sofa Sack - Plush, Ultra Soft Bean Bag Chair - Memory Foam Bean Bag Chair - Black 4'",
                price: 4999,
                rating: 4,
                category: "furniture",
                tags: ["furniture", "home"],
                stock: 22,
                ...curatedImages.home3
            }
        ];

        // Generate the new products array code
        let productsCode = 'const products = [\n';
        
        products.forEach((product, index) => {
            productsCode += '    {\n';
            productsCode += `        id: "${product.id}",\n`;
            productsCode += `        title: "${product.title}",\n`;
            productsCode += `        price: ${product.price},\n`;
            productsCode += `        rating: ${product.rating},\n`;
            productsCode += `        image: "${product.front}",\n`;
            productsCode += `        images: [\n`;
            productsCode += `            "${product.front}",\n`;
            productsCode += `            "${product.side}",\n`;
            productsCode += `            "${product.back}",\n`;
            productsCode += `            "${product.top}",\n`;
            productsCode += `            "${product.detail}"\n`;
            productsCode += `        ],\n`;
            productsCode += `        imageAngles: {\n`;
            productsCode += `            front: "${product.front}",\n`;
            productsCode += `            side: "${product.side}",\n`;
            productsCode += `            back: "${product.back}",\n`;
            productsCode += `            top: "${product.top}",\n`;
            productsCode += `            detail: "${product.detail}"\n`;
            productsCode += `        },\n`;
            productsCode += `        category: "${product.category}",\n`;
            productsCode += `        tags: ${JSON.stringify(product.tags)},\n`;
            productsCode += `        stock: ${product.stock}\n`;
            productsCode += '    }';
            
            if (index < products.length - 1) {
                productsCode += ',';
            }
            productsCode += '\n';
        });
        
        productsCode += '];';
        
        return productsCode;
    }

    /**
     * Run the image generation process
     */
    async run() {
        try {
            console.log('🎯 Amazon Clone - 3D Product Image Generator');
            console.log('=====================================');
            
            await this.generateUpdatedProductData();
            
            console.log('\n🎉 Success! All products now have 3D image support');
            console.log('📝 Each product now includes:');
            console.log('   • High-quality remote URLs');
            console.log('   • Multiple viewing angles (front, side, back, top, detail)');
            console.log('   • imageAngles object for 3D viewer component');
            console.log('   • Optimized images array for compatibility');
            console.log('\n💡 Next steps:');
            console.log('   1. Update Product components to use ProductViewer3D');
            console.log('   2. Test the 3D viewing functionality');
            console.log('   3. Remove unused local image files');
            
        } catch (error) {
            console.error('\n💥 Error during image generation:', error.message);
            console.log('🔄 Check the backup file if you need to restore original data');
            process.exit(1);
        }
    }
}

// Run the script
if (require.main === module) {
    const updater = new ProductImageUpdater();
    updater.run();
}

module.exports = ProductImageUpdater;