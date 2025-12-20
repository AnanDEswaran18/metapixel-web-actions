import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [events, setEvents] = useState([]);
  const [customEventData, setCustomEventData] = useState({
    eventName: '',
    eventValue: '',
    eventCurrency: 'USD',
    eventContent: ''
  });
  const [gtmStatus, setGtmStatus] = useState(false);
  const [metaPixelStatus, setMetaPixelStatus] = useState(false);

  useEffect(() => {
    // Check if GTM and Meta Pixel are loaded
    const checkTrackers = () => {
      setGtmStatus(!!window.dataLayer);
      setMetaPixelStatus(!!window.fbq);
    };

    checkTrackers();
    const interval = setInterval(checkTrackers, 1000);
    return () => clearInterval(interval);
  }, []);

  const logEvent = (type, eventName, data = {}) => {
    const newEvent = {
      type,
      eventName,
      data,
      timestamp: new Date().toLocaleTimeString()
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 50));
  };

  // Google Tag Manager Events
  const pushToDataLayer = (eventName, eventData = {}) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
      logEvent('gtm', eventName, eventData);
      console.log('GTM Event:', eventName, eventData);
    } else {
      console.error('Google Tag Manager not loaded');
    }
  };

  // Meta Pixel Events
  const trackMetaPixelEvent = (eventName, eventData = {}) => {
    if (window.fbq) {
      window.fbq('track', eventName, eventData);
      logEvent('meta', eventName, eventData);
      console.log('Meta Pixel Event:', eventName, eventData);
    } else {
      console.error('Meta Pixel not loaded');
    }
  };

  // Combined tracking function
  const trackEvent = (eventName, eventData = {}) => {
    pushToDataLayer(eventName, eventData);
    trackMetaPixelEvent(eventName, eventData);
  };

  // E-commerce Events
  const handleViewContent = () => {
    trackEvent('ViewContent', {
      content_name: 'Premium Product',
      content_category: 'Electronics',
      content_ids: ['PROD-001'],
      content_type: 'product',
      value: 99.99,
      currency: 'USD'
    });
  };

  const handleAddToCart = () => {
    trackEvent('AddToCart', {
      content_name: 'Premium Product',
      content_ids: ['PROD-001'],
      content_type: 'product',
      value: 99.99,
      currency: 'USD',
      quantity: 1
    });
  };

  const handleInitiateCheckout = () => {
    trackEvent('InitiateCheckout', {
      content_category: 'Electronics',
      content_ids: ['PROD-001', 'PROD-002'],
      contents: [
        { id: 'PROD-001', quantity: 1 },
        { id: 'PROD-002', quantity: 2 }
      ],
      num_items: 2,
      value: 299.97,
      currency: 'USD'
    });
  };

  const handlePurchase = () => {
    trackEvent('Purchase', {
      content_type: 'product',
      content_ids: ['PROD-001', 'PROD-002'],
      contents: [
        { id: 'PROD-001', quantity: 1, price: 99.99 },
        { id: 'PROD-002', quantity: 2, price: 99.99 }
      ],
      num_items: 2,
      value: 299.97,
      currency: 'USD',
      transaction_id: 'TXN-' + Date.now()
    });
  };

  // Lead Generation Events
  const handleLead = () => {
    trackEvent('Lead', {
      content_name: 'Newsletter Signup',
      content_category: 'Lead Generation',
      value: 10.00,
      currency: 'USD'
    });
  };

  const handleCompleteRegistration = () => {
    trackEvent('CompleteRegistration', {
      content_name: 'User Registration',
      status: 'completed',
      value: 0.00,
      currency: 'USD'
    });
  };

  // Engagement Events
  const handleSearch = () => {
    trackEvent('Search', {
      search_string: 'premium products',
      content_category: 'Electronics'
    });
  };

  const handleContact = () => {
    trackEvent('Contact', {
      content_name: 'Contact Form',
      method: 'email'
    });
  };

  const handleSubscribe = () => {
    trackEvent('Subscribe', {
      content_name: 'Premium Newsletter',
      value: 5.00,
      currency: 'USD',
      predicted_ltv: 100.00
    });
  };

  // Custom Event Handler
  const handleCustomEvent = (e) => {
    e.preventDefault();

    const eventData = {
      value: parseFloat(customEventData.eventValue) || 0,
      currency: customEventData.eventCurrency,
      content: customEventData.eventContent
    };

    trackEvent(customEventData.eventName, eventData);

    // Reset form
    setCustomEventData({
      eventName: '',
      eventValue: '',
      eventCurrency: 'USD',
      eventContent: ''
    });
  };

  const handleInputChange = (e) => {
    setCustomEventData({
      ...customEventData,
      [e.target.name]: e.target.value
    });
  };

  const clearEventLog = () => {
    setEvents([]);
  };

  return (
    <div className="app-container">
      <div className="container">
        {/* Header */}
        <header className="header app-header">
          <h1 className="app-title">🚀 Meta Pixel & GTM Testing App</h1>
          <p className="app-subtitle">Test and monitor Google Tag Manager and Meta Pixel events in real-time</p>

          <div className="status-badges tracker-status-container">
            <div className={`badge status-badge gtm-status-badge ${gtmStatus ? 'active' : ''}`}>
              <span className={gtmStatus ? 'badge-dot status-indicator' : ''}></span>
              Google Tag Manager: {gtmStatus ? 'Active' : 'Inactive'}
            </div>
            <div className={`badge status-badge meta-status-badge ${metaPixelStatus ? 'active' : ''}`}>
              <span className={metaPixelStatus ? 'badge-dot status-indicator' : ''}></span>
              Meta Pixel: {metaPixelStatus ? 'Active' : 'Inactive'}
            </div>
          </div>
        </header>

        {/* E-commerce Events */}
        <div className="cards-grid event-cards-container">
          <div className="card event-card ecommerce-card">
            <div className="card-icon ecommerce-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              🛍️
            </div>
            <h3 className="card-title ecommerce-title">E-commerce Events</h3>
            <p className="card-description ecommerce-description">Test standard e-commerce tracking events for online shopping flow</p>
            <div className="button-group ecommerce-buttons">
              <button className="btn btn-primary btn-view-content event-btn ecommerce-event" onClick={handleViewContent}>
                👁️ View Content
              </button>
              <button className="btn btn-secondary btn-add-to-cart event-btn ecommerce-event" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-success btn-initiate-checkout event-btn ecommerce-event" onClick={handleInitiateCheckout}>
                💳 Initiate Checkout
              </button>
              <button className="btn btn-info btn-purchase event-btn ecommerce-event" onClick={handlePurchase}>
                ✅ Complete Purchase
              </button>
            </div>
          </div>

          <div className="card event-card lead-card">
            <div className="card-icon lead-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              📊
            </div>
            <h3 className="card-title lead-title">Lead Generation</h3>
            <p className="card-description lead-description">Track user registration and lead generation events</p>
            <div className="button-group lead-buttons">
              <button className="btn btn-warning btn-generate-lead event-btn lead-event" onClick={handleLead}>
                📝 Generate Lead
              </button>
              <button className="btn btn-success btn-complete-registration event-btn lead-event" onClick={handleCompleteRegistration}>
                ✨ Complete Registration
              </button>
            </div>
          </div>

          <div className="card event-card engagement-card">
            <div className="card-icon engagement-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              💬
            </div>
            <h3 className="card-title engagement-title">Engagement Events</h3>
            <p className="card-description engagement-description">Monitor user engagement and interaction events</p>
            <div className="button-group engagement-buttons">
              <button className="btn btn-info btn-search event-btn engagement-event" onClick={handleSearch}>
                🔍 Search
              </button>
              <button className="btn btn-primary btn-contact event-btn engagement-event" onClick={handleContact}>
                📧 Contact
              </button>
              <button className="btn btn-secondary btn-subscribe event-btn engagement-event" onClick={handleSubscribe}>
                🔔 Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Custom Event Form */}
        <div className="event-form custom-event-section">
          <h2 className="form-title custom-event-title">🎯 Send Custom Event</h2>
          <form className="custom-event-form" onSubmit={handleCustomEvent}>
            <div className="form-row custom-event-inputs">
              <div className="form-group event-name-group">
                <label className="form-label event-name-label" htmlFor="eventName">Event Name *</label>
                <input
                  className="form-input input-event-name"
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={customEventData.eventName}
                  onChange={handleInputChange}
                  placeholder="e.g., CustomConversion"
                  required
                />
              </div>
              <div className="form-group event-value-group">
                <label className="form-label event-value-label" htmlFor="eventValue">Event Value</label>
                <input
                  className="form-input input-event-value"
                  type="number"
                  id="eventValue"
                  name="eventValue"
                  value={customEventData.eventValue}
                  onChange={handleInputChange}
                  placeholder="99.99"
                  step="0.01"
                />
              </div>
              <div className="form-group event-currency-group">
                <label className="form-label event-currency-label" htmlFor="eventCurrency">Currency</label>
                <select
                  className="form-select select-event-currency"
                  id="eventCurrency"
                  name="eventCurrency"
                  value={customEventData.eventCurrency}
                  onChange={handleInputChange}
                >
                  <option className="currency-option" value="USD">USD</option>
                  <option className="currency-option" value="EUR">EUR</option>
                  <option className="currency-option" value="GBP">GBP</option>
                  <option className="currency-option" value="INR">INR</option>
                  <option className="currency-option" value="CAD">CAD</option>
                  <option className="currency-option" value="AUD">AUD</option>
                </select>
              </div>
            </div>
            <div className="form-group event-content-group">
              <label className="form-label event-content-label" htmlFor="eventContent">Additional Data (JSON or text)</label>
              <textarea
                className="form-textarea textarea-event-content"
                id="eventContent"
                name="eventContent"
                value={customEventData.eventContent}
                onChange={handleInputChange}
                placeholder='e.g., Additional event information or {"key": "value"}'
              />
            </div>
            <button type="submit" className="btn btn-success btn-send-custom-event submit-custom-event" style={{ width: '100%' }}>
              🚀 Send Custom Event
            </button>
          </form>
        </div>

        {/* Event Log */}
        <div className="event-log event-log-section">
          <div className="event-log-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="event-log-title">📋 Event Log</h2>
            <button
              className="btn btn-dark btn-clear-log clear-event-log"
              onClick={clearEventLog}
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            >
              🗑️ Clear Log
            </button>
          </div>

          {events.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              No events tracked yet. Click any button above to start tracking!
            </p>
          ) : (
            events.map((event, index) => (
              <div key={index} className={`event-log-item ${event.type}`}>
                <div className="event-log-header">
                  <span className="event-log-type">
                    {event.type === 'gtm' ? '🏷️ GTM' : '📊 Meta Pixel'} - {event.eventName}
                  </span>
                  <span className="event-log-time">{event.timestamp}</span>
                </div>
                <div className="event-log-data">
                  {JSON.stringify(event.data, null, 2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
