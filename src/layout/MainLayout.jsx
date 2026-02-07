import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import EventLog from '../components/EventLog';
import TriggerTester from '../components/TriggerTester';
import SeoLoader from '../components/SeoLoader';

const MainLayout = ({ gtmStatus, metaPixelStatus, events, clearEventLog }) => {
    return (
        <div className="app-container">
            <SeoLoader />
            <div className="container">
                <header className="header">
                    <h1>🚀 Meta Pixel & GTM Testing App</h1>
                    <p>Test and monitor Google Tag Manager and Meta Pixel events in real-time</p>

                    <div className="status-badges">
                        <div className={`badge ${gtmStatus ? 'active' : ''}`}>
                            <span className={gtmStatus ? 'badge-dot' : ''}></span>
                            Google Tag Manager: {gtmStatus ? 'Active' : 'Inactive'}
                        </div>
                        <div className={`badge ${metaPixelStatus ? 'active' : ''}`}>
                            <span className={metaPixelStatus ? 'badge-dot' : ''}></span>
                            Meta Pixel: {metaPixelStatus ? 'Active' : 'Inactive'}
                        </div>
                    </div>

                    <Navigation />
                </header>

                <main className="content-area">
                    <Outlet />
                </main>

                <TriggerTester />

                <EventLog events={events} onClear={clearEventLog} />
            </div>
        </div>
    );
};

export default MainLayout;
