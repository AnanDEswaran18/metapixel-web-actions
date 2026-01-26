import React from 'react';

const EventLog = ({ events, onClear }) => {
    return (
        <div className="event-log">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>📋 Event Log</h2>
                <button
                    className="btn btn-dark"
                    onClick={onClear}
                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                    🗑️ Clear Log
                </button>
            </div>

            {events.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                    No events tracked yet. Interact with the buttons to start tracking!
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
    );
};

export default EventLog;
