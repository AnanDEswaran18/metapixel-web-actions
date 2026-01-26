<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './App.css';

import MainLayout from './layout/MainLayout';
import Ecommerce from './pages/Ecommerce';
import Services from './pages/Services';
import LeadGen from './pages/LeadGen';
import Engagement from './pages/Engagement';
import MediaContent from './pages/MediaContent';
import Utilities from './pages/Utilities';
import CustomEvents from './pages/CustomEvents';

function App() {
  const [events, setEvents] = useState([]);
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
=======
import { useState } from 'react';
import './index.css';

function App() {
  const [events, setEvents] = useState([]);

  const handleButtonClick = (buttonName) => {
    const newEvent = {
      buttonName,
>>>>>>> origin/main
      timestamp: new Date().toLocaleTimeString()
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 50));
  };

<<<<<<< HEAD
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

=======
>>>>>>> origin/main
  const clearEventLog = () => {
    setEvents([]);
  };

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MainLayout
            gtmStatus={gtmStatus}
            metaPixelStatus={metaPixelStatus}
            events={events}
            clearEventLog={clearEventLog}
          />
        }>
          <Route index element={<Ecommerce trackEvent={trackEvent} />} />
          <Route path="services" element={<Services trackEvent={trackEvent} />} />
          <Route path="lead-gen" element={<LeadGen trackEvent={trackEvent} />} />
          <Route path="engagement" element={<Engagement trackEvent={trackEvent} />} />
          <Route path="media" element={<MediaContent trackEvent={trackEvent} />} />
          <Route path="utilities" element={<Utilities trackEvent={trackEvent} />} />
          <Route path="custom" element={<CustomEvents trackEvent={trackEvent} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
=======
    <div className="app-container main-app-wrapper">
      <div className="container main-container page-wrapper">
        {/* Header */}
        <header className="header app-header main-header page-header">
          <h1 className="app-title main-title header-title page-title">🚀 Meta Pixel & GTM Testing App</h1>
          <p className="app-subtitle main-subtitle header-subtitle page-description">All events tracked automatically via HTML scripts - Zero code in components!</p>
        </header>

        {/* E-commerce Events */}
        <div className="cards-grid event-cards-container events-section main-cards-grid">
          <div className="card event-card ecommerce-card card-ecommerce section-card">
            <div className="card-icon ecommerce-icon icon-wrapper ecommerce-icon-wrapper" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              🛍️
            </div>
            <h3 className="card-title ecommerce-title section-title card-heading">E-commerce Events</h3>
            <p className="card-description ecommerce-description section-description card-text">Test standard e-commerce tracking events for online shopping flow</p>
            <div className="button-group ecommerce-buttons action-buttons card-buttons">
              <button className="btn btn-primary btn-view-content event-btn ecommerce-event action-view-content ecommerce-action" onClick={() => handleButtonClick('View Content')}>
                👁️ View Content
              </button>
              <button className="btn btn-secondary btn-add-to-cart event-btn ecommerce-event action-add-to-cart ecommerce-action" onClick={() => handleButtonClick('Add to Cart')}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-success btn-initiate-checkout event-btn ecommerce-event action-checkout ecommerce-action" onClick={() => handleButtonClick('Initiate Checkout')}>
                💳 Initiate Checkout
              </button>
              <button className="btn btn-info btn-purchase event-btn ecommerce-event action-purchase ecommerce-action" onClick={() => handleButtonClick('Complete Purchase')}>
                ✅ Complete Purchase
              </button>
            </div>
          </div>

          <div className="card event-card lead-card card-lead section-card">
            <div className="card-icon lead-icon icon-wrapper lead-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              📊
            </div>
            <h3 className="card-title lead-title section-title card-heading">Lead Generation</h3>
            <p className="card-description lead-description section-description card-text">Track user registration and lead generation events</p>
            <div className="button-group lead-buttons action-buttons card-buttons">
              <button className="btn btn-warning btn-generate-lead event-btn lead-event action-generate-lead lead-action" onClick={() => handleButtonClick('Generate Lead')}>
                📝 Generate Lead
              </button>
              <button className="btn btn-success btn-complete-registration event-btn lead-event action-complete-registration lead-action" onClick={() => handleButtonClick('Complete Registration')}>
                ✨ Complete Registration
              </button>
            </div>
          </div>

          <div className="card event-card engagement-card card-engagement section-card">
            <div className="card-icon engagement-icon icon-wrapper engagement-icon-wrapper" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              💬
            </div>
            <h3 className="card-title engagement-title section-title card-heading">Engagement Events</h3>
            <p className="card-description engagement-description section-description card-text">Monitor user engagement and interaction events</p>
            <div className="button-group engagement-buttons action-buttons card-buttons">
              <button className="btn btn-info btn-search event-btn engagement-event action-search engagement-action" onClick={() => handleButtonClick('Search')}>
                🔍 Search
              </button>
              <button className="btn btn-primary btn-contact event-btn engagement-event action-contact engagement-action" onClick={() => handleButtonClick('Contact')}>
                📧 Contact
              </button>
              <button className="btn btn-secondary btn-subscribe event-btn engagement-event action-subscribe engagement-action" onClick={() => handleButtonClick('Subscribe')}>
                🔔 Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div className="event-log event-log-section log-container activity-log">
          <div className="event-log-header-container log-header-wrapper header-with-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="event-log-title log-title section-title">📋 Button Click Log</h2>
            <button
              className="btn btn-dark btn-clear-log clear-event-log action-clear-log clear-btn"
              onClick={clearEventLog}
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            >
              🗑️ Clear Log
            </button>
          </div>

          <p className="event-log-info tracking-info info-banner" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '1rem', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', marginBottom: '1rem' }}>
            ✨ Events are tracked automatically by HTML scripts. Check browser console for tracking logs!
          </p>

          {events.length === 0 ? (
            <p className="event-log-empty empty-state no-events-message" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              No buttons clicked yet. Click any button above to see it logged here!
            </p>
          ) : (
            events.map((event, index) => (
              <div key={index} className="event-log-item click log-entry event-entry activity-item">
                <div className="event-log-header log-item-header event-details">
                  <span className="event-log-type log-event-type event-name action-label">
                    🖱️ Button Clicked: {event.buttonName}
                  </span>
                  <span className="event-log-time log-timestamp event-time timestamp">{event.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
>>>>>>> origin/main
  );
}

export default App;
