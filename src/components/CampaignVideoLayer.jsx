import React, { useRef, useEffect } from 'react';

/**
 * ============================================================================
 * HOUSE OF NINA — EDITORIAL CAMPAIGN VIDEO LAYER (LAYER B)
 * ============================================================================
 * Configure your campaign looping video asset here.
 * 
 * Instructions:
 * 1. Place your final looping campaign video into the project (e.g. in /public/videos/)
 * 2. Set CAMPAIGN_VIDEO_SRC to your file path below (e.g., "/videos/campaign-hair-loop.mp4")
 *    or pass it via the `videoSrc` prop.
 * 
 * If left empty (""), the component gracefully renders the warm beige editorial
 * canvas with the oversized wordmark remaining 100% visible, crisp, and unbroken.
 */
export const DEFAULT_CAMPAIGN_VIDEO_SRC = "/videos/footer-video.mp4";

export default function CampaignVideoLayer({
  videoSrc = DEFAULT_CAMPAIGN_VIDEO_SRC,
  className = ""
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      const vid = videoRef.current;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.load();
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry on interaction or when loaded
        });
      }
    }
  }, [videoSrc]);

  return (
    <div 
      className={`campaign-video-stage ${className}`}
      aria-hidden="true"
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="campaign-video-element"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          aria-label="House of Nina Hair Movement Campaign"
        >
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
