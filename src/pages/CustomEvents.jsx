import React, { useState } from 'react';

const CustomEvents = ({ trackEvent }) => {
    const [customEventData, setCustomEventData] = useState({
        eventName: '',
        eventValue: '',
        eventCurrency: 'USD',
        eventContent: ''
    });

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

    return (
        <div className="event-form page-custom-events form-custom-event-container">
            <h2>🎯 Send Custom Event</h2>
            <form onSubmit={handleCustomEvent} className="form-custom-event" id="form-custom-event">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name *</label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            value={customEventData.eventName}
                            onChange={handleInputChange}
                            placeholder="e.g., CustomConversion"
                            required
                            className="input-custom-event-name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventValue">Event Value</label>
                        <input
                            type="number"
                            id="eventValue"
                            name="eventValue"
                            value={customEventData.eventValue}
                            onChange={handleInputChange}
                            placeholder="99.99"
                            step="0.01"
                            className="input-custom-event-value"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventCurrency">Currency</label>
                        <select
                            id="eventCurrency"
                            name="eventCurrency"
                            value={customEventData.eventCurrency}
                            onChange={handleInputChange}
                            className="select-custom-event-currency"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                            <option value="CAD">CAD</option>
                            <option value="AUD">AUD</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="eventContent">Additional Data (JSON or text)</label>
                    <textarea
                        id="eventContent"
                        name="eventContent"
                        value={customEventData.eventContent}
                        onChange={handleInputChange}
                        placeholder='e.g., Additional event information or {"key": "value"}'
                        className="textarea-custom-event-content"
                    />
                </div>
                <button type="submit" className="btn btn-success btn-send-custom-event" style={{ width: '100%' }} id="btn-send-custom-event">
                    🚀 Send Custom Event
                </button>
            </form>
        </div>
    );
};

export default CustomEvents;
