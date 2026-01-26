import React, { useState } from 'react';

const Engagement = ({ trackEvent }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [contactForm, setContactForm] = useState({ name: '', message: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        trackEvent('Search', {
            search_string: searchQuery,
            content_category: 'Site Search'
        });
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery('');
    };

    const handleContact = (e) => {
        e.preventDefault();
        trackEvent('Contact', {
            content_name: 'Contact Form',
            method: 'website_form',
            message_length: contactForm.message.length
        });
        alert('Message Sent!');
        setContactForm({ name: '', message: '' });
    };

    const handleSubscribe = () => {
        trackEvent('Subscribe', {
            content_name: 'Weekly Digest',
            value: 0.00,
            currency: 'USD',
            predicted_ltv: 50.00
        });
        alert('Subscribed to Digest!');
    };

    return (
        <div className="cards-grid page-engagement">
            {/* Search Section */}
            <div className="card card-site-search">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                    🔍
                </div>
                <h3>Site Search</h3>
                <p>Trigger "Search" event</p>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }} className="form-search" id="form-search">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        className="input-search-bar"
                        id="input-search-bar"
                    />
                    <button type="submit" className="btn btn-info btn-search-go" style={{ padding: '0.75rem' }} id="btn-search-go">
                        Go
                    </button>
                </form>
            </div>

            {/* Contact Section */}
            <div className="card card-contact-us">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    📧
                </div>
                <h3>Contact Us</h3>
                <p>Trigger "Contact" event</p>
                <form onSubmit={handleContact} style={{ marginTop: '1rem' }} className="form-contact" id="form-contact">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                            className="input-contact-name"
                            id="input-contact-name"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="How can we help?"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                            rows={3}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                            className="textarea-contact-message"
                            id="textarea-contact-message"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-send-message" style={{ width: '100%' }} id="btn-send-message">
                        Send Message
                    </button>
                </form>
            </div>

            {/* Subscription Card */}
            <div className="card card-premium-sub" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                    🔔
                </div>
                <h3>Subscribe</h3>
                <p>Paid Subscription / High Value Action</p>
                <button className="btn btn-secondary btn-subscribe-premium" onClick={handleSubscribe} style={{ width: '100%' }} id="btn-subscribe-premium">
                    Subscribe to Premium
                </button>
            </div>
        </div>
    );
};

export default Engagement;
