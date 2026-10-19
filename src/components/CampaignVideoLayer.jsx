import React, { useRef, useEffect } from 'react';

/**
 * ============================================================================
 * HOUSE OF NINA — EDITORIAL CAMPAIGN VIDEO LAYER (LAYER B)
 * ============================================================================
 */
export const DEFAULT_CAMPAIGN_VIDEO_SRC = "/videos/footer-video.mp4";
export const DEFAULT_CAMPAIGN_VIDEO_WEBM = "/videos/footer-video.webm";
export const DEFAULT_CAMPAIGN_POSTER = "/videos/footer-video_poster.webp";

export default function CampaignVideoLayer({
  videoSrc = DEFAULT_CAMPAIGN_VIDEO_SRC,
  webmSrc = DEFAULT_CAMPAIGN_VIDEO_WEBM,
  poster = DEFAULT_CAMPAIGN_POSTER,
  className = "",
  children
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!videoSrc || !vid) return;

    // Force strict WebKit / iOS autoplay attributes
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

    // Fallback on first user interaction for strict Low Power Mode on mobile
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
  }, [videoSrc]);

  return (
    <div 
      className={`campaign-video-stage ${className}`}
      aria-hidden="true"
    >
      {/* Background elements like giant wordmark rendered directly behind the video */}
      {children}

      {videoSrc ? (
        <video
          ref={videoRef}
          className="campaign-video-element"
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
          poster={poster || DEFAULT_CAMPAIGN_POSTER}
          aria-hidden="true"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        /* Neutral warm-beige editorial backdrop with subtle luminous depth */
        <div className="campaign-video-neutral-placeholder">
          <div className="placeholder-luminous-glow" />
        </div>
      )}
    </div>
  );
}
