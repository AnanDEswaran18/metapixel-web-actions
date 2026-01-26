import React, { useState } from 'react';

const MediaContent = ({ trackEvent }) => {
    const [videoStatus, setVideoStatus] = useState('stopped');
    const [progress, setProgress] = useState(0);

    const handleVideoAction = (action) => {
        let eventName = '';
        let status = videoStatus;

        switch (action) {
            case 'play':
                eventName = 'VideoPlay';
                status = 'playing';
                break;
            case 'pause':
                eventName = 'VideoPause';
                status = 'paused';
                break;
            case 'complete':
                eventName = 'VideoComplete';
                status = 'completed';
                setProgress(100);
                break;
            default:
                break;
        }

        setVideoStatus(status);
        trackEvent(eventName, {
            video_title: 'Product Demo 2024',
            video_id: 'VID-2024-001',
            video_provider: 'YouTube',
            duration: 120,
            current_time: action === 'complete' ? 120 : progress
        });
    };

    const handleScrollMilestone = (percentage) => {
        trackEvent('ScrollDepth', {
            scroll_percentage: percentage,
            page_path: '/media-content',
            page_title: 'Media & Content Demo'
        });
        alert(`Scrolled to ${percentage}%`);
    };

    const handleShare = (method) => {
        trackEvent('Share', {
            content_category: 'Article',
            content_id: 'ART-001',
            method: method,
            content_type: 'article'
        });
        alert(`Shared via ${method}`);
    };

    return (
        <div className="cards-grid page-media-content">
            {/* Video Player Simulation */}
            <div className="card card-video-player">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)' }}>
                    🎬
                </div>
                <h3>Video Interaction</h3>
                <p>Simulate video player events</p>

                <div className="video-player-mock" style={{
                    background: '#000', height: '150px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                    color: 'white', position: 'relative', overflow: 'hidden'
                }}>
                    {videoStatus === 'playing' ? '▶️ Playing...' :
                        videoStatus === 'paused' ? '⏸️ Paused' :
                            videoStatus === 'completed' ? '✅ Finished' : 'Stopped'}

                    <div className="video-progress-bar" style={{
                        position: 'absolute', bottom: 0, left: 0, height: '4px',
                        background: 'red', width: `${progress}%`, transition: 'width 0.3s'
                    }} />
                </div>

                <div className="button-group video-controls" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-video-play" onClick={() => handleVideoAction('play')} id="btn-video-play">
                        ▶ Play
                    </button>
                    <button className="btn btn-secondary btn-video-pause" onClick={() => handleVideoAction('pause')} id="btn-video-pause">
                        ⏸ Pause
                    </button>
                    <button className="btn btn-success btn-video-complete" onClick={() => handleVideoAction('complete')} id="btn-video-complete">
                        ✅ Complete
                    </button>
                </div>
            </div>

            {/* Article & Scroll */}
            <div className="card card-article">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    📰
                </div>
                <h3>Article Engagement</h3>
                <p>Simulate reading and scrolling</p>

                <div className="button-group article-actions">
                    <button className="btn btn-info btn-read-article" onClick={() => trackEvent('ViewContent', { content_name: 'Top 10 Trends', content_type: 'article' })} id="btn-read-article">
                        👁️ Read Article
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }} className="scroll-controls">
                        <button className="btn btn-dark btn-scroll-25" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => handleScrollMilestone(25)} id="btn-scroll-25">
                            25% Scroll
                        </button>
                        <button className="btn btn-dark btn-scroll-50" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => handleScrollMilestone(50)} id="btn-scroll-50">
                            50% Scroll
                        </button>
                        <button className="btn btn-dark btn-scroll-90" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => handleScrollMilestone(90)} id="btn-scroll-90">
                            90% Scroll
                        </button>
                    </div>
                </div>
            </div>

            {/* Social Sharing */}
            <div className="card card-social-share">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    📤
                </div>
                <h3>Social Sharing</h3>
                <p>Trigger "Share" event</p>
                <div className="button-group share-buttons">
                    <button className="btn btn-share-facebook" style={{ background: '#1877F2' }} onClick={() => handleShare('facebook')} id="btn-share-facebook">
                        Share on Facebook
                    </button>
                    <button className="btn btn-share-twitter" style={{ background: '#1DA1F2' }} onClick={() => handleShare('twitter')} id="btn-share-twitter">
                        Share on Twitter
                    </button>
                    <button className="btn btn-share-linkedin" style={{ background: '#0e76a8' }} onClick={() => handleShare('linkedin')} id="btn-share-linkedin">
                        Share on LinkedIn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediaContent;
