import React, { useState } from 'react';

const Ecommerce = ({ trackEvent }) => {
    // Simulate active product for detailing
    const [activeProduct, setActiveProduct] = useState(null);

    const products = [
        { id: 'P001', name: 'Premium Headphones', price: 199.99, image: '🎧' },
        { id: 'P002', name: 'Smart Watch', price: 299.99, image: '⌚' },
        { id: 'P003', name: 'Wireless Keyboard', price: 99.99, image: '⌨️' }
    ];

    const handleProductClick = (product) => {
        setActiveProduct(product);
        trackEvent('ViewContent', {
            content_name: product.name,
            content_category: 'Electronics',
            content_ids: [product.id],
            content_type: 'product',
            value: product.price,
            currency: 'USD'
        });
    };

    const handleCustomizeProduct = (color) => {
        if (!activeProduct) return;
        trackEvent('CustomizeProduct', {
            content_name: activeProduct.name,
            content_ids: [activeProduct.id],
            customization_id: `color_${color}`,
            variant: color
        });
        alert(`Selected Color: ${color}`);
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation(); // Prevent opening modal if clicking add button directly
        trackEvent('AddToCart', {
            content_name: product.name,
            content_ids: [product.id],
            content_type: 'product',
            value: product.price,
            currency: 'USD',
            quantity: 1
        });
    };

    const handleAddToWishlist = (product, e) => {
        e.stopPropagation();
        trackEvent('AddToWishlist', {
            content_name: product.name,
            content_ids: [product.id],
            content_category: 'Electronics',
            value: product.price,
            currency: 'USD'
        });
    };

    const handleInitiateCheckout = () => {
        trackEvent('InitiateCheckout', {
            num_items: 3,
            value: 599.97,
            currency: 'USD',
            content_ids: ['P001', 'P002', 'P003']
        });
    };

    const handleAddPaymentInfo = () => {
        trackEvent('AddPaymentInfo', {
            content_category: 'Electronics',
            content_ids: ['P001'],
            payment_type: 'credit_card',
            value: 599.97,
            currency: 'USD'
        });
    };

    const handlePurchase = () => {
        trackEvent('Purchase', {
            content_type: 'product',
            content_ids: ['P001', 'P002', 'P003'],
            num_items: 3,
            value: 599.97,
            currency: 'USD',
            transaction_id: 'TXN-' + Date.now()
        });
    };

    return (
        <div className="ecommerce-container page-ecommerce">
            {/* Product Grid */}
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Featured Products</h2>
            <div className="cards-grid product-grid">
                {products.map(product => (
                    <div
                        key={product.id}
                        className={`card product-card card-product-${product.id}`}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleProductClick(product)}
                        id={`product-card-${product.id}`}
                    >
                        <div className="card-icon" style={{ margin: '0 auto 1rem', fontSize: '3rem', height: '100px', width: '100px', background: 'var(--bg-hover)' }}>
                            {product.image}
                        </div>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price" style={{ color: '#43e97b', fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</p>

                        <div className="button-group" style={{ marginTop: '1rem' }}>
                            <button className={`btn btn-primary btn-add-to-cart btn-add-to-cart-${product.id}`} onClick={(e) => handleAddToCart(product, e)} id={`add-to-cart-${product.id}`}>
                                🛒 Add to Cart
                            </button>
                            <button className={`btn btn-secondary btn-wishlist btn-wishlist-${product.id}`} onClick={(e) => handleAddToWishlist(product, e)} id={`wishlist-${product.id}`}>
                                ❤️ Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Flow Simulation */}
            <div className="card checkout-flow-card" style={{ marginTop: '2rem', borderTop: '4px solid #43e97b' }}>
                <h3>🛍️ Checkout Simulation</h3>
                <p>Test the full checkout funnel</p>
                <div className="button-group checkout-actions" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <button className="btn btn-info btn-initiate-checkout" onClick={handleInitiateCheckout} id="btn-initiate-checkout">
                        1. Initiate Checkout
                    </button>
                    <button className="btn btn-warning btn-add-payment-info" onClick={handleAddPaymentInfo} id="btn-add-payment-info">
                        2. Add Payment Info
                    </button>
                    <button className="btn btn-success btn-purchase" onClick={handlePurchase} id="btn-purchase">
                        3. Complete Purchase
                    </button>
                </div>
            </div>

            {/* Product Detail Modal (Visual Only) */}
            {activeProduct && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="card modal-content" style={{ maxWidth: '500px', width: '90%', position: 'relative' }}>
                        <button
                            className="btn-close-modal"
                            onClick={(e) => { e.stopPropagation(); setActiveProduct(null); }}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            ✕
                        </button>
                        <div className="card-icon" style={{ margin: '0 auto 1rem', fontSize: '4rem' }}>{activeProduct.image}</div>
                        <h2 className="modal-product-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{activeProduct.name}</h2>
                        <p className="modal-product-price" style={{ textAlign: 'center', color: '#43e97b', fontSize: '1.5rem', marginBottom: '1.5rem' }}>${activeProduct.price}</p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Customize Color:</label>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                {['Black', 'Silver', 'Gold'].map(color => (
                                    <button
                                        key={color}
                                        className={`btn btn-dark btn-color-option btn-color-${color.toLowerCase()}`}
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                        onClick={() => handleCustomizeProduct(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-primary btn-modal-add-to-cart" style={{ width: '100%' }} onClick={(e) => handleAddToCart(activeProduct, e)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ecommerce;
