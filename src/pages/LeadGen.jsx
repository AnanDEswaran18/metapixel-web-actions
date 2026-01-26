import React, { useState } from 'react';

const LeadGen = ({ trackEvent }) => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [regData, setRegData] = useState({ username: '', email: '', password: '' });
    const [regStatus, setRegStatus] = useState('idle');

    const handleLead = (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;

        trackEvent('Lead', {
            content_name: 'Newsletter Signup',
            content_category: 'Lead Generation',
            value: 10.00,
            currency: 'USD',
            email: newsletterEmail // hashed usually, but for demo
        });
        alert(`Lead Generated for: ${newsletterEmail}`);
        setNewsletterEmail('');
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setRegStatus('submitting');

        setTimeout(() => {
            trackEvent('CompleteRegistration', {
                content_name: 'User Registration',
                status: 'completed',
                method: 'email',
                value: 0.00,
                currency: 'USD'
            });
            setRegStatus('completed');
            setRegData({ username: '', email: '', password: '' });
        }, 1000);
    };

    return (
        <div className="cards-grid page-lead-gen">
            {/* Newsletter Section */}
            <div className="card card-newsletter">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    📧
                </div>
                <h3>Newsletter Signup</h3>
                <p>Trigger "Lead" event</p>
                <form onSubmit={handleLead} style={{ marginTop: '1rem' }} className="form-newsletter" id="form-newsletter">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                            className="input-newsletter-email"
                            id="input-newsletter-email"
                        />
                    </div>
                    <button type="submit" className="btn btn-warning btn-subscribe-newsletter" style={{ width: '100%' }} id="btn-subscribe-newsletter">
                        Subscribe Now
                    </button>
                </form>
            </div>

            {/* Registration Section */}
            <div className="card card-registration">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                    👤
                </div>
                <h3>Create Account</h3>
                <p>Trigger "CompleteRegistration" event</p>

                {regStatus === 'completed' ? (
                    <div className="message success msg-registration-success">
                        ✨ Registration Complete!
                        <button
                            className="btn btn-secondary btn-register-another"
                            style={{ marginTop: '1rem', width: '100%', fontSize: '0.9rem' }}
                            onClick={() => setRegStatus('idle')}
                        >
                            Register Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleRegistration} className="form-registration" id="form-registration">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={regData.username}
                                onChange={(e) => setRegData({ ...regData, username: e.target.value })}
                                required
                                className="input-reg-username"
                                id="input-reg-username"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={regData.email}
                                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                                required
                                className="input-reg-email"
                                id="input-reg-email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={regData.password}
                                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                                required
                                className="input-reg-password"
                                id="input-reg-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success btn-register"
                            disabled={regStatus === 'submitting'}
                            style={{ width: '100%' }}
                            id="btn-register"
                        >
                            {regStatus === 'submitting' ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LeadGen;
