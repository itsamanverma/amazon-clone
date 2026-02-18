import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiImageGenerator {
    constructor() {
        this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    /**
     * Generate AI image using Gemini prompts + procedural generation
     * @param {string} prompt - Description for the image
     * @param {string} type - Type of image (banner, product, etc.)
     * @param {string} category - Category/theme
     * @returns {Promise<Blob>} - Generated image as blob
     */
    async generateImage(prompt, type = 'banner', category = 'ecommerce') {
        console.log(`🎨 Starting AI image generation for: "${prompt.substring(0, 50)}..."`);
        
        try {
            // For development, create procedural AI banners
            console.log('🖼️ Creating procedural AI banner...');
            return await this.createProceduralBanner(prompt);

        } catch (error) {
            console.error('❌ AI image generation failed:', error.message);
            // Fallback to simple placeholder
            return this.generatePlaceholder(category);
        }
    }

    /**
     * Create procedural AI-style banner using canvas
     */
    async createProceduralBanner(prompt) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set banner dimensions
            canvas.width = 1200;
            canvas.height = 400;

            // Create gradient background based on prompt keywords
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            
            const colors = this.getColorsFromPrompt(prompt);
            gradient.addColorStop(0, colors.start);
            gradient.addColorStop(0.5, colors.middle);
            gradient.addColorStop(1, colors.end);
            
            // Fill background
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add geometric patterns
            this.addGeometricPatterns(ctx, canvas.width, canvas.height, colors);

            // Add subtle texture overlay
            this.addTexture(ctx, canvas.width, canvas.height);

            // Convert to blob
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png', 0.8);
        });
    }

    /**
     * Extract colors from prompt keywords
     */
    getColorsFromPrompt(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('tech') || lowerPrompt.includes('digital') || lowerPrompt.includes('modern')) {
            return {
                start: '#2196F3',
                middle: '#21CBF3',
                end: '#1976D2'
            };
        }
        
        if (lowerPrompt.includes('lifestyle') || lowerPrompt.includes('fashion') || lowerPrompt.includes('home')) {
            return {
                start: '#FF6B6B',
                middle: '#FF8E53',
                end: '#EE5A24'
            };
        }
        
        if (lowerPrompt.includes('deals') || lowerPrompt.includes('sale') || lowerPrompt.includes('discount')) {
            return {
                start: '#FF9F43',
                middle: '#FFC048',
                end: '#F39C12'
            };
        }

        // Default gradient
        return {
            start: '#667EEA',
            middle: '#764BA2',
            end: '#4B79A1'
        };
    }

    /**
     * Add geometric patterns to the banner
     */
    addGeometricPatterns(ctx, width, height, colors) {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffffff';
        
        // Add circles
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 100 + 20;
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add rectangles
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 200 + 50,
                Math.random() * 100 + 30
            );
        }

        ctx.globalAlpha = 1;
    }

    /**
     * Add subtle texture overlay
     */
    addTexture(ctx, width, height) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 10;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // G
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // B
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Generate simple placeholder image
     */
    generatePlaceholder(category = 'banner') {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 1200;
            canvas.height = 400;
            
            // Simple gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(category.toUpperCase(), canvas.width / 2, canvas.height / 2);
            
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png', 0.8);
        });
    }

    /**
     * Enhance prompt with Gemini AI (simplified for development)
     */
    async enhancePromptWithGemini(prompt, type, category) {
        try {
            if (!this.apiKey) {
                console.warn('⚠️ Gemini API key not found, using original prompt');
                return prompt;
            }

            const enhancePrompt = `Enhance this ${type} prompt for e-commerce ${category}: "${prompt}". Make it more detailed and visually appealing for image generation.`;
            
            const result = await this.model.generateContent(enhancePrompt);
            const response = await result.response;
            const enhancedPrompt = response.text();
            
            console.log('✅ Prompt enhanced with Gemini AI');
            return enhancedPrompt;
            
        } catch (error) {
            console.warn('⚠️ Gemini prompt enhancement failed, using original:', error.message);
            return prompt;
        }
    }
}

export default GeminiImageGenerator;