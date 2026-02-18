#!/bin/bash

# Image optimization script for Amazon Clone project
# This script converts images to WebP format and optimizes them

echo "🖼️  Starting image optimization process..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   macOS: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed (for WebP conversion)
if ! command -v cwebp &> /dev/null; then
    echo "❌ WebP tools are not installed. Please install them first:"
    echo "   Ubuntu/Debian: sudo apt-get install webp"
    echo "   macOS: brew install webp"
    exit 1
fi

# Create optimized directories
mkdir -p public/images/optimized
mkdir -p public/images/webp
mkdir -p src/assets/optimized
mkdir -p src/assets/webp

# Function to optimize and convert images
optimize_images() {
    local source_dir=$1
    local optimized_dir=$2
    local webp_dir=$3
    
    echo "📁 Processing images in: $source_dir"
    
    for img in "$source_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            name="${filename%.*}"
            ext="${filename##*.}"
            
            echo "   🔄 Processing: $filename"
            
            # Optimize original format (reduce file size by ~60%)
            if [[ "${ext,,}" == "png" ]]; then
                # PNG optimization
                convert "$img" -strip -quality 85 -resize '800x800>' "$optimized_dir/$filename"
            else
                # JPEG optimization
                convert "$img" -strip -quality 80 -resize '800x800>' "$optimized_dir/$filename"
            fi
            
            # Convert to WebP (usually 25-35% smaller than optimized JPEG/PNG)
            cwebp -q 80 -resize 800 800 "$img" -o "$webp_dir/$name.webp"
            
            # Get file sizes for comparison
            original_size=$(du -h "$img" | cut -f1)
            optimized_size=$(du -h "$optimized_dir/$filename" | cut -f1)
            webp_size=$(du -h "$webp_dir/$name.webp" | cut -f1)
            
            echo "     📊 Sizes: $original_size → $optimized_size → $webp_size (WebP)"
        fi
    done
}

# Optimize images in public/images
if [ -d "public/images" ]; then
    optimize_images "public/images" "public/images/optimized" "public/images/webp"
fi

# Optimize images in src/assets
if [ -d "src/assests" ]; then
    optimize_images "src/assests" "src/assets/optimized" "src/assets/webp"
fi

echo ""
echo "✅ Image optimization complete!"
echo ""
echo "📈 Performance improvements:"
echo "   • Original images: Full size, slower loading"
echo "   • Optimized images: ~40% smaller, faster loading"
echo "   • WebP images: ~60% smaller, modern browser support"
echo ""
echo "🔧 Next steps:"
echo "1. Update your components to use WebP with fallbacks"
echo "2. Implement lazy loading with the LazyImage component"
echo "3. Consider uploading optimized images to Firebase Storage"
echo ""
echo "💡 Usage in React:"
echo "   <picture>"
echo "     <source srcSet='/images/webp/image.webp' type='image/webp' />"
echo "     <img src='/images/optimized/image.jpg' alt='...' />"
echo "   </picture>"