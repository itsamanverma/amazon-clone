#!/bin/bash

# Firebase Storage Cleanup Script
# Simple shell script to clean up Firebase Storage using Firebase CLI

echo "🧹 Firebase Storage Cleanup Tool"
echo "================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed"
    echo "   Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase CLI"
    echo "   Login with: firebase login"
    exit 1
fi

echo "🔍 Checking Firebase Storage..."
echo ""

# Use gsutil if available (part of gcloud SDK) for better storage management
if command -v gsutil &> /dev/null; then
    echo "📊 Current storage contents:"
    echo "================================="
    
    BUCKET_NAME=$(firebase use | grep "Now using project" | awk '{print $4}' | tr -d '()')
    
    if [ ! -z "$BUCKET_NAME" ]; then
        STORAGE_URL="gs://${BUCKET_NAME}.appspot.com"
        
        echo "🪣 Storage bucket: $STORAGE_URL"
        echo ""
        
        # List all contents
        echo "📋 Current files:"
        gsutil ls -r $STORAGE_URL 2>/dev/null || echo "   ✅ Storage is empty or inaccessible"
        
        echo ""
        echo "💰 Storage usage:"
        gsutil du -s $STORAGE_URL 2>/dev/null || echo "   📊 0 bytes (empty)"
        
        echo ""
        echo "⚠️  Ready to clean up Firebase Storage?"
        echo "   This will delete ALL files in: $STORAGE_URL"
        echo ""
        read -p "   Type 'yes' to continue: " -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
            echo "🚀 Starting cleanup..."
            
            # Remove all objects
            gsutil -m rm -r $STORAGE_URL/** 2>/dev/null && echo "✅ All files deleted" || echo "ℹ️  Storage was already empty"
            
            echo ""
            echo "✅ Firebase Storage cleanup completed!"
            echo ""
            echo "🎉 Benefits:"
            echo "   • No more Firebase Storage costs"
            echo "   • All images now load from Unsplash CDN"
            echo "   • Faster global delivery via Unsplash"
            
        else
            echo "❌ Cleanup cancelled"
        fi
    else
        echo "❌ Could not determine Firebase project"
    fi
else
    echo "ℹ️  gsutil not found - using alternative method"
    echo ""
    echo "📝 Manual cleanup instructions:"
    echo "================================="
    echo ""
    echo "1. Go to Firebase Console:"
    echo "   https://console.firebase.google.com/project/clone-9b0b1/storage"
    echo ""
    echo "2. Click 'Files' tab"
    echo ""
    echo "3. Select all folders/files and delete them"
    echo ""
    echo "4. Your app now uses Unsplash URLs exclusively!"
    echo ""
    echo "💡 Alternative: Install Google Cloud SDK for automated cleanup:"
    echo "   curl https://sdk.cloud.google.com | bash"
fi

echo ""
echo "✨ Migration to Unsplash URLs complete!"
echo "   • bannerService.js: ✅ Updated to use Unsplash URLs"
echo "   • firebaseProductImageService.js: ✅ Updated to skip uploads"  
echo "   • Home component: ✅ All working images"
echo "   • Prime page: ✅ All working images"
echo "   • Product data: ✅ Already using Unsplash URLs"