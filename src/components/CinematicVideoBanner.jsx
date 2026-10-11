import React, { useRef, useEffect } from 'react';

export default function CinematicVideoBanner() {
  const videoRef = useRef(null);

  // Guarantee seamless autoplay across mobile & desktop browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  return (
    <section className="cinematic-video-section" aria-label="Cinematic Silk and Hair Movement">
      <div className="cinematic-video-container">
        {/* Continuous Autoplay Video Loop */}
        <video
          ref={videoRef}
          className="cinematic-video-player"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
        >
          <source 
            src="/videos/15558864_1080_1920_30fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Editorial Dark Overlay */}
        <div className="cinematic-video-overlay" />

        {/* Classy Pun: One line on web, two equal lines on mobile */}
        <div className="cinematic-content-wrapper">
          <h2 className="cinematic-headline single-line-pun">
            <span className="pun-part-1">Life isn't perfect,</span>{' '}
            <span className="pun-part-2">but your hair can be.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
