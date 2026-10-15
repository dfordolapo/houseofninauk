import React, { useRef, useEffect } from 'react';

export default function CinematicVideoBanner() {
  const videoRef = useRef(null);

  // Guarantee seamless, continuous autoplay across mobile & desktop browsers
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Force HTML attributes for strict mobile WebKit/iOS requirements
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

    // Event listeners on media state
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
      <div className="cinematic-video-container">
        {/* Continuous Autoplay Video Loop (Transparent 1x1 poster prevents any thumbnail or play icon) */}
        <video
          ref={videoRef}
          className="cinematic-video-player"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          aria-hidden="true"
        >
          <source 
            src="/videos/15558864_1080_1920_30fps.mp4" 
            type="video/mp4" 
          />
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
