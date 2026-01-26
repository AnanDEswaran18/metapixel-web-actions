import React, { useState } from 'react';

const MediaContent = ({ trackEvent }) => {
    // MediaContent enhanced for generic GTM Trigger Testing

    return (
        <div className="space-y-12 pb-24">
            {/* Header info */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-2">🎬 Media & Scroll Testing</h2>
                <p className="opacity-90">Use this page to test "Scroll Depth" and "YouTube Video" triggers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Real YouTube Video for Testing */}
                <div className="card bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600 text-xl">🎥</div>
                        <h3 className="text-xl font-bold">YouTube Video Trigger</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">Test Start, Pause, Progress (10%, 25%, 50%, 75%, 90%), and Completion.</p>

                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/IetmepO6oWE?enablejsapi=1"
                            title="Test Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest">GTM should detect this video automatically if the trigger is active</p>
                </div>

                {/* 2. Scroll Depth Helper */}
                <div className="card bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 text-xl">📜</div>
                        <h3 className="text-xl font-bold">Scroll Depth Multi-threshold</h3>
                    </div>
                    <p className="text-sm text-slate-500">Scroll down to see the thresholds below. GTM will fire at 25%, 50%, 75%, 90%, and 100%.</p>

                    <div className="mt-8 space-y-4">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand transition-all duration-300" style={{ width: '0%' }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>90%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dummy content sections to make the page long for scrolling */}
            <div className="space-y-24 mt-12">
                {[25, 50, 75, 90, 100].map(threshold => (
                    <section key={threshold} className="py-24 border-t border-slate-100 text-center relative">
                        <div className="absolute top-0 right-0 p-4 font-mono text-slate-200 text-6xl font-bold select-none">
                            {threshold}%
                        </div>
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h4 className="text-2xl font-bold text-slate-800">Section reached at {threshold}% scroll</h4>
                            <p className="text-slate-500 leading-relaxed text-lg">
                                This section is placed specifically to test the {threshold}% vertical scroll depth trigger in GTM.
                                When the top of this area hits the bottom of your viewport, the trigger should fire.
                            </p>
                            <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                <button id={`btn-scroll-${threshold}`} className="btn btn-primary px-8">Generic Button @ {threshold}%</button>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <div className="text-center py-24 bg-slate-800 text-white rounded-3xl">
                <h3 className="text-4xl font-black mb-4">🏆 Page Bottom Reached!</h3>
                <p className="text-slate-400">GTM 100% trigger should have fired by now.</p>
                <div className="mt-8">
                    <a href="/" id="btn-media-back-home" className="btn btn-info px-12 py-3 rounded-full font-bold">Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default MediaContent;
