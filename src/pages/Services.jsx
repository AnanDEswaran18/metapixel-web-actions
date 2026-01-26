import React, { useState } from 'react';

const Services = ({ trackEvent }) => {
    const [applicationStatus, setApplicationStatus] = useState('idle');

    const handleSchedule = () => {
        trackEvent('Schedule', {
            content_category: 'Consultation',
            content_name: 'Free Strategy Session',
            status: 'scheduled',
            value: 0.00,
            currency: 'USD'
        });
        alert('Meeting Scheduled! (Event Fired)');
    };

    const handleFindLocation = () => {
        trackEvent('FindLocation', {
            city: 'San Francisco',
            region: 'CA',
            postal_code: '94103',
            location_id: 'SF-HQ-01'
        });
        alert('Location Found! (Event Fired)');
    };

    const handleStartTrial = () => {
        trackEvent('StartTrial', {
            content_name: 'Pro Plan Trial',
            period: '14_days',
            value: 0.00,
            currency: 'USD',
            predicted_ltv: 299.00
        });
        alert('Trial Started! (Event Fired)');
    };

    const handleDonate = () => {
        trackEvent('Donate', {
            organization: 'Tech For Good',
            category: 'Education',
            value: 50.00,
            currency: 'USD'
        });
        alert('Donation Received! (Event Fired)');
    };

    const handleSubmitApplication = (e) => {
        e.preventDefault();
        setApplicationStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            trackEvent('SubmitApplication', {
                application_id: 'APP-' + Date.now(),
                job_title: 'Senior Developer',
                category: 'Careers'
            });
            setApplicationStatus('submitted');
        }, 1000);
    };

    return (
        <div className="cards-grid page-services">
            <div className="card card-service-actions">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                    🏢
                </div>
                <h3>Service Actions</h3>
                <p>Test location and scheduling related events</p>
                <div className="button-group">
                    <button className="btn btn-primary btn-schedule-appointment" onClick={handleSchedule} id="btn-schedule">
                        📅 Schedule Appointment
                    </button>
                    <button className="btn btn-info btn-find-location" onClick={handleFindLocation} id="btn-find-location">
                        📍 Find Location
                    </button>
                </div>
            </div>

            <div className="card card-commitments">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' }}>
                    🤝
                </div>
                <h3>Commitments</h3>
                <p>Test high-intent conversion actions</p>
                <div className="button-group">
                    <button className="btn btn-warning btn-start-trial" onClick={handleStartTrial} id="btn-start-trial">
                        🚀 Start Free Trial
                    </button>
                    <button className="btn btn-success btn-donate" onClick={handleDonate} id="btn-donate">
                        ❤️ Donate $50
                    </button>
                </div>
            </div>

            <div className="card job-application card-job-application">
                <h3>📝 Job Application</h3>
                <p>Test SubmitApplication event with a form submission</p>

                {applicationStatus === 'submitted' ? (
                    <div className="message success msg-application-success">
                        ✅ Application Submitted Successfully!
                        <button
                            className="btn btn-secondary btn-reset-application"
                            style={{ marginTop: '1rem', width: '100%', fontSize: '0.9rem' }}
                            onClick={() => setApplicationStatus('idle')}
                        >
                            Reset Form
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitApplication} className="form-job-application" id="form-job-application">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" required className="input-applicant-name" />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <select className="select-position">
                                <option>Senior Developer</option>
                                <option>Product Manager</option>
                                <option>Designer</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-submit-application"
                            disabled={applicationStatus === 'submitting'}
                            style={{ width: '100%' }}
                            id="btn-submit-application"
                        >
                            {applicationStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Services;
