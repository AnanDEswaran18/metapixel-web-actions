import React, { useState, useEffect } from 'react';

const TriggerTester = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! Check GTM Variable: Form ID / Form Classes');
    };

    return (
        <div className="trigger-tester-hub">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">🛠️ Trigger Test Hub</h2>
                <p className="text-sm text-slate-500">Test all GTM trigger types from this section</p>
            </div>

            <div className="test-grid">
                {/* 1. Generic Click */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">1. Click - All Elements</h3>
                    <div className="flex flex-col gap-2">
                        <button id="test-btn-primary" className="btn btn-primary w-full py-2">Click ID: test-btn-primary</button>
                        <button id="test-btn-secondary" className="test-class-secondary btn btn-secondary w-full py-2">Click Class: test-class-secondary</button>
                        <div id="test-div-click" className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center cursor-pointer hover:bg-slate-100 text-xs text-slate-800">
                            Clickable Div (ID: test-div-click)
                        </div>
                    </div>
                </div>

                {/* 2. Link Click */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">2. Link Click</h3>
                    <ul className="space-y-4 text-sm mt-4">
                        <li>
                            <a href="https://www.google.com" target="_blank" rel="noreferrer" id="external-link" className="text-brand font-bold hover:underline">
                                🔗 External: Google.com
                            </a>
                        </li>
                        <li>
                            <a href="/services" id="internal-link-services" className="text-brand font-bold hover:underline">
                                🔗 Internal: Services Page
                            </a>
                        </li>
                        <li>
                            <a href="mailto:test@example.com" id="mailto-link-test" className="text-brand font-bold hover:underline">
                                ✉️ Mailto Link
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 3. Form Submission */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">3. Form Submission</h3>
                    <form id="test-form-subscription" className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full border border-slate-700 bg-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                            required
                        />
                        <button type="submit" className="btn btn-success w-full py-2 text-sm">Subscribe (Submit)</button>
                    </form>
                </div>

                {/* 4. Timer Trigger */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">4. Timer</h3>
                    <div className="text-center py-4">
                        <div className="text-3xl font-mono font-bold text-brand">{seconds}s</div>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Time on current page</p>
                    </div>
                </div>

                {/* 5. Page View Reminder */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">5. Page View</h3>
                    <p className="text-xs text-slate-400 mb-4 italic">Fires automatically when you change pages via navigation.</p>
                    <div className="flex gap-2">
                        <a href="/" id="nav-home-footer" className="btn btn-dark flex-1 text-center py-2 text-xs">Home</a>
                        <a href="/engagement" id="nav-engagement-footer" className="btn btn-dark flex-1 text-center py-2 text-xs">Engagement</a>
                    </div>
                </div>

                {/* 6. Scroll & Video Link */}
                <div className="test-card">
                    <h3 className="uppercase text-slate-400 mb-2">6. Scroll & Video</h3>
                    <p className="text-xs text-slate-400 mb-3 italic">These are best tested on the Media page.</p>
                    <a href="/media" id="btn-go-to-media" className="btn btn-warning w-full py-2 text-sm flex items-center justify-center gap-2">
                        🚀 Go to Media & Video Page
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TriggerTester;
