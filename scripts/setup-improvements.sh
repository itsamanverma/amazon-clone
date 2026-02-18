#!/bin/bash
# Amazon Clone Performance Optimization Setup Script
# Run this script to begin immediate performance improvements

echo "🚀 Starting Amazon Clone Performance Optimization..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Install performance analysis tools
echo -e "${BLUE}📊 Installing bundle analyzer and performance tools...${NC}"
npm install --save-dev webpack-bundle-analyzer lighthouse-ci web-vitals @axe-core/react

# 2. Add performance scripts to package.json
echo -e "${BLUE}📝 Adding performance scripts to package.json...${NC}"
npm pkg set scripts.analyze="npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
npm pkg set scripts.lighthouse="npx lighthouse-ci autorun"
npm pkg set scripts.performance="npm run analyze && npm run lighthouse"
npm pkg set scripts.test:a11y="npx axe-cli http://localhost:3000"

# 3. Install state management improvements
echo -e "${BLUE}🔧 Installing better state management...${NC}"
npm install @tanstack/react-query zustand

# 4. Install UI/UX improvement packages
echo -e "${BLUE}🎨 Installing UI/UX improvement packages...${NC}"
npm install react-intersection-observer react-spring framer-motion

# 5. Install image optimization tools
echo -e "${BLUE}🖼️ Installing image optimization tools...${NC}"
npm install --save-dev imagemin imagemin-webp sharp

# 6. Create improved directory structure
echo -e "${BLUE}📁 Creating improved directory structure...${NC}"
mkdir -p src/hooks
mkdir -p src/stores  
mkdir -p src/components/ui
mkdir -p src/components/features
mkdir -p src/components/layouts
mkdir -p src/utils/performance

# 7. Create initial performance tracking file
echo -e "${BLUE}📈 Creating performance tracking...${NC}"
cat > src/utils/performance/vitals.js << 'EOF'
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log('Performance Metric:', metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
EOF

# 8. Create initial bundle size tracker
echo -e "${BLUE}📊 Creating bundle size tracker...${NC}"
cat > scripts/track-bundle-size.js << 'EOF'
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build/static/js');
const files = fs.readdirSync(buildDir);
const jsFiles = files.filter(file => file.endsWith('.js') && !file.endsWith('.map'));

let totalSize = 0;
const fileSizes = {};

jsFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  fileSizes[file] = `${sizeInMB}MB`;
  totalSize += stats.size;
});

console.log('📦 Bundle Size Analysis:');
console.log('========================');
Object.entries(fileSizes).forEach(([file, size]) => {
  console.log(`${file}: ${size}`);
});
console.log(`\nTotal Bundle Size: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);

// Alert if bundle is too large
if (totalSize > 2.5 * 1024 * 1024) {
  console.log('\n⚠️  WARNING: Bundle size exceeds 2.5MB recommendation!');
  console.log('Consider implementing code splitting and tree shaking.');
} else if (totalSize < 1 * 1024 * 1024) {
  console.log('\n✅ EXCELLENT: Bundle size is under 1MB!');
} else {
  console.log('\n👍 GOOD: Bundle size is reasonable but can be optimized.');
}
EOF

# 9. Update package.json with bundle tracking
npm pkg set scripts.bundle-size="node scripts/track-bundle-size.js"

# 10. Create .lighthouserc.js configuration
echo -e "${BLUE}💡 Creating Lighthouse configuration...${NC}"
cat > .lighthouserc.js << 'EOF'
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.7}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.8}],
        'categories:seo': ['warn', {minScore: 0.8}],
      },
    },
  },
};
EOF

# 11. Run initial analysis
echo -e "${YELLOW}🔍 Running initial bundle analysis...${NC}"
if [ -d "build" ]; then
  node scripts/track-bundle-size.js
else
  echo "Building project first..."
  npm run build
  node scripts/track-bundle-size.js
fi

echo ""
echo -e "${GREEN}✅ Performance optimization setup complete!${NC}"
echo ""
echo -e "${YELLOW}📚 Next Steps:${NC}"
echo "1. Run 'npm run analyze' to see detailed bundle breakdown"
echo "2. Run 'npm run performance' for full performance audit"  
echo "3. Follow the implementation guide in improvement.md"
echo "4. Start with bundle size optimization (biggest impact)"
echo ""
echo -e "${GREEN}🚀 Your Amazon Clone is ready for performance improvements!${NC}"