import React, { useRef, useEffect } from 'react';

export default function CinematicVideoBanner() {
  const videoRef = useRef(null);

  // Guarantee seamless, continuous autoplay across mobile & desktop browsers
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Strict WebKit / iOS autoplay prerequisites
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.defaultMuted = true;
    vid.muted = true;

    const playVideo = () => {
      if (vid && vid.paused) {
        const p = vid.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    // Immediate attempt
    playVideo();

    // Native media events
    vid.addEventListener('loadedmetadata', playVideo);
    vid.addEventListener('loadeddata', playVideo);
    vid.addEventListener('canplay', playVideo);

    // Viewport intersection trigger
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(vid);
    }

    // Fallback on first user interaction (touch/scroll) for strict Low Power Mode on mobile
    const handleInteraction = () => {
      playVideo();
    };
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { passive: true, once: true });

    return () => {
      vid.removeEventListener('loadedmetadata', playVideo);
      vid.removeEventListener('loadeddata', playVideo);
      vid.removeEventListener('canplay', playVideo);
      if (observer) observer.disconnect();
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <section className="cinematic-video-section" aria-label="Cinematic Silk and Hair Movement">
      <div 
        className="cinematic-video-container"
        onClick={() => {
          const vid = videoRef.current;
          if (vid && vid.paused) {
            vid.muted = true;
            vid.play().catch(() => {});
          }
        }}
      >
        {/* Continuous Autoplay Video Loop (Proven Original Video) */}
        <video
          ref={videoRef}
          className="cinematic-video-player"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          poster="/videos/landing-cinematic-banner_poster.webp"
          aria-hidden="true"
        >
          <source 
            src="/videos/landing-cinematic-banner.webm" 
            type="video/webm" 
          />
          <source 
            src="/videos/landing-cinematic-banner.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Editorial Dark Overlay */}
        <div className="cinematic-video-overlay" />

        {/* Classy Pun: Ivory & Champagne Gold on Frosted Atelier Glass Badge */}
        <div className="cinematic-content-wrapper">
          <div className="cinematic-text-badge">
            <h2 className="cinematic-headline single-line-pun">
              <span className="pun-part-1">Life isn't perfect,</span>
              <span className="pun-space"> </span>
              <span className="pun-part-2">but your hair can be.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
