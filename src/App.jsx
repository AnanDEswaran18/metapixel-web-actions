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

  const clearEventLog = () => {
    setEvents([]);
  };

  return (
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
  );
}

export default App;
