#!/usr/bin/env node

/**
 * Script to migrate local images to Firebase Storage
 * Usage: node scripts/migrate-to-firebase.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'clone-9b0b1.firebasestorage.app'
});

const bucket = admin.storage().bucket();

// Directory mappings
const imageDirectories = [
  { local: './src/assests', remote: 'assets' },
  { local: './public/images', remote: 'products' }
];

async function uploadImage(localPath, remotePath) {
  try {
    console.log(`Uploading ${localPath} to ${remotePath}`);
    
    await bucket.upload(localPath, {
      destination: remotePath,
      metadata: {
        cacheControl: 'public, max-age=31536000', // 1 year
      }
    });

    // Get public URL
    const file = bucket.file(remotePath);
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/clone-9b0b1.firebasestorage.app/${remotePath}`;
    console.log(`✅ Uploaded: ${publicUrl}`);
    
    return publicUrl;
  } catch (error) {
    console.error(`❌ Upload failed for ${localPath}:`, error);
    return null;
  }
}

async function migrateImages() {
  const urlMappings = {};
  
  for (const dir of imageDirectories) {
    if (!fs.existsSync(dir.local)) {
      console.log(`Directory ${dir.local} does not exist, skipping...`);
      continue;
    }

    const files = fs.readdirSync(dir.local);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const localPath = path.join(dir.local, file);
        const remotePath = `${dir.remote}/${file}`;
        
        const publicUrl = await uploadImage(localPath, remotePath);
        if (publicUrl) {
          // Create mapping for updating code
          const oldPath = `/images/${file}`;
          urlMappings[oldPath] = publicUrl;
        }
      }
    }
  }

  // Save URL mappings for code updates
  fs.writeFileSync(
    './url-mappings.json', 
    JSON.stringify(urlMappings, null, 2)
  );
  
  console.log('🎉 Migration complete! Check url-mappings.json for path updates.');
}

migrateImages().catch(console.error);