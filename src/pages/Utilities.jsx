import React from 'react';

const Utilities = ({ trackEvent }) => {
    const handleDownload = (filename, type) => {
        trackEvent('FileDownload', { // GA4 standard event: file_download
            file_name: filename,
            file_extension: type,
            link_url: `https://example.com/downloads/${filename}`,
            link_text: `Download ${type.toUpperCase()}`
        });
        alert(`Downloading ${filename}...`);
    };

    const handleLogin = () => {
        // GA4 'login', Meta usually custom or 'Subscribe'
        trackEvent('login', {
            method: 'email',
            user_type: 'customer'
        });
        alert('User Logged In');
    };

    const handleError = () => {
        // GA4 usually tracks exception automatically, but explicit 'exception' is good
        trackEvent('exception', {
            description: 'Payment Gateway Timeout',
            fatal: false
        });
        alert('Simulated Error Event Fired');
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText('Simulated Coupon: SAVE20');
        trackEvent('select_content', {
            content_type: 'coupon',
            item_id: 'SAVE20'
        });
        alert('Coupon Copied! (select_content fired)');
    };

    return (
        <div className="cards-grid page-utilities">
            {/* File Downloads */}
            <div className="card card-downloads">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                    📂
                </div>
                <h3>File Downloads</h3>
                <p>Trigger "file_download" events</p>
                <div className="button-group download-buttons">
                    <button className="btn btn-primary btn-download-pdf" onClick={() => handleDownload('whitepaper_2024.pdf', 'pdf')} id="btn-download-pdf">
                        📄 Download Whitepaper (PDF)
                    </button>
                    <button className="btn btn-secondary btn-download-exe" onClick={() => handleDownload('installer_v2.exe', 'exe')} id="btn-download-exe">
                        💾 Download Installer (EXE)
                    </button>
                    <button className="btn btn-info btn-download-csv" onClick={() => handleDownload('data_export.csv', 'csv')} id="btn-download-csv">
                        📊 Download Data (CSV)
                    </button>
                </div>
            </div>

            {/* User Actions */}
            <div className="card card-user-actions">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #FDC830 0%, #F37335 100%)' }}>
                    🔐
                </div>
                <h3>User Account</h3>
                <p>Trigger login and status events</p>
                <div className="button-group account-actions">
                    <button className="btn btn-success btn-login" onClick={handleLogin} id="btn-login">
                        🔓 Simulate Login
                    </button>
                    <button className="btn btn-dark btn-signup-google" onClick={() => trackEvent('sign_up', { method: 'google' })} id="btn-signup-google">
                        📝 Simulate Sign Up (Google)
                    </button>
                    <button className="btn btn-warning btn-copy-coupon" onClick={handleCopyCode} id="btn-copy-coupon">
                        ✂️ Copy Coupon Code
                    </button>
                </div>
            </div>

            {/* System Events */}
            <div className="card card-system-errors">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)' }}>
                    ⚠️
                </div>
                <h3>System & Errors</h3>
                <p>Trigger technical events</p>
                <div className="button-group error-actions">
                    <button className="btn btn-error btn-trigger-error" style={{ background: '#ef473a' }} onClick={handleError} id="btn-trigger-error">
                        ❌ Trigger Error Event
                    </button>
                    <button className="btn btn-dark btn-trigger-performance" onClick={() => trackEvent('timing_complete', { name: 'load_time', value: 1200, event_category: 'performance' })} id="btn-trigger-performance">
                        ⏱️ Trigger Load Time Performance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Utilities;
