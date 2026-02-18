import React, { useState, useEffect } from 'react';
import { uploadAllToFirebase } from '../../scripts/uploadToFirebase';
import productService from '../../services/productService';
import './ImageSourceController.css';

const ImageSourceController = () => {
    const [currentSource, setCurrentSource] = useState('checking');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadResults, setUploadResults] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        checkImageSource();
    }, []);

    const checkImageSource = async () => {
        try {
            const products = await productService.getAllProducts();
            if (products.length > 0) {
                const firstProduct = products[0];
                if (firstProduct.image.includes('firebasestorage')) {
                    setCurrentSource('firebase');
                } else if (firstProduct.image.includes('unsplash')) {
                    setCurrentSource('unsplash');
                } else {
                    setCurrentSource('unknown');
                }
            }
        } catch (error) {
            console.error('Error checking image source:', error);
            setCurrentSource('error');
        }
    };

    const handleUploadToFirebase = async () => {
        if (uploading) return;
        
        setUploading(true);
        setUploadProgress('Starting Firebase Storage upload...');
        
        try {
            const results = await uploadAllToFirebase();
            setUploadResults(results);
            
            if (results.successful > 0) {
                setUploadProgress(`Successfully uploaded ${results.successful}/${results.total} products! Switching to Firebase Storage...`);
                setCurrentSource('firebase');
                
                // Clear cache and reload to use Firebase Storage URLs
                productService.invalidateCache();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setUploadProgress(`Upload failed: No products were successfully uploaded.`);
            }
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadProgress(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const getSourceDisplay = () => {
        switch (currentSource) {
            case 'firebase':
                return { icon: '🔥', text: 'Firebase Storage', class: 'firebase' };
            case 'unsplash':
                return { icon: '📷', text: 'Unsplash CDN', class: 'unsplash' };
            case 'checking':
                return { icon: '🔄', text: 'Checking...', class: 'checking' };
            default:
                return { icon: '❓', text: 'Unknown', class: 'unknown' };
        }
    };

    const source = getSourceDisplay();

    return (
        <>
            {/* Toggle Button */}
            <div className="isc-toggle" onClick={() => setIsVisible(!isVisible)}>
                🛠️ Image Manager
            </div>

            {/* Control Panel */}
            {isVisible && (
                <div className="isc-panel">
                    <div className="isc-header">
                        <h3>🖼️ Image Source Manager</h3>
                        <button className="isc-close" onClick={() => setIsVisible(false)}>
                            ✕
                        </button>
                    </div>
                    
                    <div className="isc-content">
                        {/* Current Status */}
                        <div className="isc-status">
                            <div className="isc-current-source">
                                <strong>Current Image Source: </strong>
                                <span className={`isc-source isc-source--${source.class}`}>
                                    {source.icon} {source.text}
                                </span>
                            </div>
                            
                            {currentSource === 'unsplash' && (
                                <div className="isc-info isc-info--warning">
                                    <p>⚠️ Using external Unsplash URLs. Upload to Firebase Storage for better control, performance, and reliability.</p>
                                </div>
                            )}
                            
                            {currentSource === 'firebase' && (
                                <div className="isc-info isc-info--success">
                                    <p>✅ Using Firebase Storage URLs. Images are optimized and hosted on your Firebase project with full control.</p>
                                </div>
                            )}

                            {currentSource === 'checking' && (
                                <div className="isc-info">
                                    <p>🔄 Checking current image source...</p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="isc-actions">
                            {currentSource === 'unsplash' && (
                                <button 
                                    className="isc-button isc-button--primary"
                                    onClick={handleUploadToFirebase}
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <>
                                            <div className="isc-spinner"></div>
                                            Uploading to Firebase...
                                        </>
                                    ) : (
                                        '🚀 Migrate to Firebase Storage'
                                    )}
                                </button>
                            )}
                            
                            {currentSource === 'firebase' && (
                                <div className="isc-firebase-active">
                                    <div className="isc-check-icon">✅</div>
                                    <p>All images are now stored in Firebase Storage</p>
                                    <button 
                                        className="isc-button isc-button--secondary"
                                        onClick={checkImageSource}
                                    >
                                        🔄 Refresh Status
                                    </button>
                                </div>
                            )}
                            
                            {currentSource === 'unsplash' && (
                                <div className="isc-migration-info">
                                    <h4>Migration Benefits:</h4>
                                    <ul>
                                        <li>🔒 Full control over your images</li>
                                        <li>⚡ Better performance with CDN</li>
                                        <li>🛡️ No external dependencies</li>
                                        <li>💾 Organized storage structure</li>
                                        <li>🔧 WebP optimization</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Progress Display */}
                        {uploadProgress && (
                            <div className={`isc-progress ${uploading ? 'isc-progress--active' : 'isc-progress--complete'}`}>
                                <div className="isc-progress-text">
                                    {uploadProgress}
                                </div>
                                {uploading && <div className="isc-progress-bar"></div>}
                            </div>
                        )}

                        {/* Results */}
                        {uploadResults && (
                            <div className="isc-results">
                                <h4>📊 Migration Report:</h4>
                                <div className="isc-stats">
                                    <div className="isc-stat">
                                        <span className="isc-stat-number">{uploadResults.successful}</span>
                                        <span className="isc-stat-label">Successful</span>
                                    </div>
                                    <div className="isc-stat">
                                        <span className="isc-stat-number">{uploadResults.failed}</span>
                                        <span className="isc-stat-label">Failed</span>
                                    </div>
                                    <div className="isc-stat">
                                        <span className="isc-stat-number">{uploadResults.duration}s</span>
                                        <span className="isc-stat-label">Duration</span>
                                    </div>
                                </div>
                                
                                {uploadResults.successful > 0 && (
                                    <div className="isc-success">
                                        🎉 Migration completed! Page will refresh to show Firebase Storage URLs.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageSourceController;