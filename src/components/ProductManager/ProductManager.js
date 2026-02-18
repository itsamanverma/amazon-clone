import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import FirebaseProductImageService from '../../services/firebaseProductImageService';
import './ProductManager.css';

/**
 * Product Manager Dashboard
 * Manages Firebase Storage + Gemini AI integration for product images
 */

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [uploadResults, setUploadResults] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    const firebaseService = new FirebaseProductImageService();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [productsData, statsData] = await Promise.all([
                productService.getAllProducts(),
                productService.getProductStatistics()
            ]);
            
            setProducts(productsData);
            setStatistics(statsData);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadSingleProduct = async (productId) => {
        try {
            setProcessing(true);
            const result = await productService.uploadProductToFirebase(productId);
            
            if (result.success) {
                alert(`✅ Successfully uploaded ${productId} to Firebase Storage`);
                await loadDashboardData(); // Refresh data
            } else {
                alert(`❌ Failed to upload ${productId}: ${result.error}`);
            }
        } catch (error) {
            alert(`❌ Error uploading ${productId}: ${error.message}`);
        } finally {
            setProcessing(false);
        }
    };

    const uploadAllProducts = async () => {
        if (!confirm('Upload all products to Firebase Storage? This may take several minutes.')) {
            return;
        }

        try {
            setProcessing(true);
            const results = await productService.processAllProductsToFirebase();
            setUploadResults(results);
            await loadDashboardData(); // Refresh data
        } catch (error) {
            alert(`❌ Bulk upload failed: ${error.message}`);
        } finally {
            setProcessing(false);
        }
    };

    const generateCustomImages = async (productId) => {
        try {
            setProcessing(true);
            const customImages = await productService.generateCustomImages(productId);
            
            if (customImages) {
                alert(`✅ Generated custom images for ${productId}`);
                await loadDashboardData();
            } else {
                alert(`❌ Failed to generate custom images for ${productId}`);
            }
        } catch (error) {
            alert(`❌ Error generating images: ${error.message}`);
        } finally {
            setProcessing(false);
        }
    };

    const validateProductImages = async (productId) => {
        try {
            const validation = await productService.validateProductImages(productId);
            setSelectedProduct({ ...selectedProduct, validation });
        } catch (error) {
            alert(`❌ Validation failed: ${error.message}`);
        }
    };

    const renderOverview = () => (
        <div className="pm__overview">
            <h2>📊 System Overview</h2>
            {statistics && (
                <div className="pm__stats">
                    <div className="pm__statCard">
                        <h3>{statistics.total}</h3>
                        <p>Total Products</p>
                    </div>
                    <div className="pm__statCard">
                        <h3>{Object.keys(statistics.categories).length}</h3>
                        <p>Categories</p>
                    </div>
                    <div className="pm__statCard">
                        <h3>{statistics.ratings.average.toFixed(1)}★</h3>
                        <p>Average Rating</p>
                    </div>
                    <div className="pm__statCard">
                        <h3>₹{Math.round(statistics.priceRange.average)}</h3>
                        <p>Average Price</p>
                    </div>
                </div>
            )}

            <div className="pm__categoryBreakdown">
                <h3>📂 Category Distribution</h3>
                {statistics && (
                    <div className="pm__categories">
                        {Object.entries(statistics.categories).map(([category, count]) => (
                            <div key={category} className="pm__categoryItem">
                                <span className="pm__categoryName">{category}</span>
                                <span className="pm__categoryCount">{count} products</span>
                                <div className="pm__categoryBar">
                                    <div 
                                        className="pm__categoryBarFill" 
                                        style={{ width: `${(count / statistics.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pm__imageSourceBreakdown">
                <h3>🖼️ Image Sources</h3>
                {statistics && (
                    <div className="pm__imageSources">
                        {Object.entries(statistics.imageSources).map(([source, count]) => (
                            <div key={source} className="pm__imageSource">
                                <span className={`pm__sourceIcon pm__sourceIcon--${source}`}>
                                    {source === 'firebase-storage' ? '🔥' : 
                                     source === 'curated' ? '🎨' : '📷'}
                                </span>
                                <span className="pm__sourceName">{source}</span>
                                <span className="pm__sourceCount">{count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="pm__products">
            <div className="pm__productsHeader">
                <h2>📦 Product Management</h2>
                <div className="pm__bulkActions">
                    <button 
                        className="pm__button pm__button--primary"
                        onClick={uploadAllProducts}
                        disabled={processing}
                    >
                        {processing ? '🔄 Uploading...' : '🔥 Upload All to Firebase'}
                    </button>
                </div>
            </div>

            <div className="pm__productList">
                {products.map((product) => (
                    <div key={product.id} className="pm__productCard">
                        <div className="pm__productImage">
                            <img src={product.image} alt={product.title} />
                            <div className="pm__imageSource">
                                {product.imageSource === 'firebase-storage' ? '🔥' : 
                                 product.imageSource === 'curated' ? '🎨' : '📷'}
                            </div>
                        </div>
                        
                        <div className="pm__productInfo">
                            <h4>{product.title}</h4>
                            <div className="pm__productMeta">
                                <span className="pm__category">{product.category}</span>
                                <span className="pm__price">₹{product.price}</span>
                                <span className="pm__rating">
                                    {Array.from({ length: product.rating }, (_, i) => '⭐').join('')}
                                </span>
                            </div>
                            
                            <div className="pm__imageInfo">
                                <span>📸 {Object.keys(product.imageAngles || {}).length} angles</span>
                                {product.imageMetadata && (
                                    <span className="pm__lastUpdated">
                                        Updated: {new Date(product.imageMetadata.lastUpdated).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="pm__productActions">
                            <button 
                                className="pm__actionButton"
                                onClick={() => uploadSingleProduct(product.id)}
                                disabled={processing}
                                title="Upload to Firebase Storage"
                            >
                                🔥
                            </button>
                            <button 
                                className="pm__actionButton"
                                onClick={() => generateCustomImages(product.id)}
                                disabled={processing}
                                title="Generate AI Images"
                            >
                                🎨
                            </button>
                            <button 
                                className="pm__actionButton"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    validateProductImages(product.id);
                                }}
                                title="View Details"
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="pm__results">
            <h2>📋 Upload Results</h2>
            {uploadResults ? (
                <div className="pm__uploadResults">
                    <div className="pm__resultsSummary">
                        <div className="pm__resultsStats">
                            <div className="pm__resultStat">
                                <h3>{uploadResults.summary.uploaded}</h3>
                                <p>Successful</p>
                            </div>
                            <div className="pm__resultStat">
                                <h3>{uploadResults.summary.errors}</h3>
                                <p>Failed</p>
                            </div>
                            <div className="pm__resultStat">
                                <h3>{uploadResults.summary.total}</h3>
                                <p>Total</p>
                            </div>
                        </div>
                    </div>

                    {uploadResults.failed.length > 0 && (
                        <div className="pm__failedUploads">
                            <h3>❌ Failed Uploads</h3>
                            <div className="pm__failedList">
                                {uploadResults.failed.map((failure, index) => (
                                    <div key={index} className="pm__failedItem">
                                        <strong>{failure.productId}</strong>: {failure.error}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {uploadResults.successful.length > 0 && (
                        <div className="pm__successfulUploads">
                            <h3>✅ Successful Uploads</h3>
                            <div className="pm__successfulList">
                                {uploadResults.successful.map((success, index) => (
                                    <div key={index} className="pm__successfulItem">
                                        <strong>{success.productId}</strong> 
                                        <span className="pm__category">({success.category})</span>
                                        <span className="pm__imageCount">
                                            {Object.keys(success.images).length} images
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="pm__noResults">
                    <p>No upload results yet. Run a bulk upload to see results here.</p>
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="pm__loading">
                <div className="spinner"></div>
                <p>Loading Product Manager...</p>
            </div>
        );
    }

    return (
        <div className="productManager">
            <div className="pm__header">
                <h1>🛠️ Product Manager</h1>
                <p>Firebase Storage + Gemini AI Integration Dashboard</p>
            </div>

            <div className="pm__tabs">
                <button 
                    className={`pm__tab ${activeTab === 'overview' ? 'pm__tab--active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    📊 Overview
                </button>
                <button 
                    className={`pm__tab ${activeTab === 'products' ? 'pm__tab--active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    📦 Products
                </button>
                <button 
                    className={`pm__tab ${activeTab === 'results' ? 'pm__tab--active' : ''}`}
                    onClick={() => setActiveTab('results')}
                >
                    📋 Results
                </button>
            </div>

            <div className="pm__content">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'results' && renderResults()}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="pm__modal" onClick={() => setSelectedProduct(null)}>
                    <div className="pm__modalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="pm__modalHeader">
                            <h3>{selectedProduct.title}</h3>
                            <button className="pm__modalClose" onClick={() => setSelectedProduct(null)}>
                                ✕
                            </button>
                        </div>
                        
                        <div className="pm__modalBody">
                            <div className="pm__productImages">
                                {Object.entries(selectedProduct.imageAngles || {}).map(([angle, url]) => (
                                    <div key={angle} className="pm__angleImage">
                                        <img src={url} alt={`${angle} view`} />
                                        <p>{angle}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {selectedProduct.validation && (
                                <div className="pm__validation">
                                    <h4>🔍 Image Validation</h4>
                                    {Object.entries(selectedProduct.validation.results).map(([angle, result]) => (
                                        <div key={angle} className="pm__validationItem">
                                            <span className={`pm__validationStatus ${result.valid ? 'valid' : 'invalid'}`}>
                                                {result.valid ? '✅' : '❌'}
                                            </span>
                                            <span>{angle}</span>
                                            <span className="pm__validationInfo">{result.contentType || result.error}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {processing && (
                <div className="pm__processingOverlay">
                    <div className="pm__processingModal">
                        <div className="spinner"></div>
                        <p>Processing... Please wait</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;