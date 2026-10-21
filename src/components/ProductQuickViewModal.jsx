import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, Eye, Heart } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: PURE VIDEO QUICK VIEW MODAL
 * ============================================================================
 * Focuses exclusively on the video showcase. Shows NO details forms or 
 * configuration options. Displays the live strand movement of the wig with 
 * playback controls, sound toggle, and an optional quick link to View Details.
 */
export default function ProductQuickViewModal({ 
  product, 
  isOpen, 
  onClose, 
  onOpenDetails,
  onToggleWishlist,
  wishlist = []
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Reset playback and mute state on modal open
  useEffect(() => {
    if (isOpen && product) {
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [isOpen, product]);

  // Autoplay lifecycle
  useEffect(() => {
    const vid = videoRef.current;
    if (!isOpen || !vid) return;

    vid.muted = isMuted;
    vid.defaultMuted = isMuted;
    vid.playsInline = true;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    };
  }, [isOpen, product, isMuted]);

  if (!isOpen || !product) return null;

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (vid) {
      vid.muted = newMuted;
    }
  };

  const hasCustomVideo = !!product.video;
  const webmSource = hasCustomVideo ? null : '/videos/15558864.webm';
  const mp4Source = product.video || '/videos/15558864_1080_1920_30fps.mp4';
  const posterSource = product.image || '/videos/15558864_poster.webp';

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className={`modal-backdrop pure-video-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="pure-video-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label={`${product.name} Video Quick View`}
      >
        {/* Floating Lookbook / Wishlist Button */}
        <button 
          type="button" 
          className="pure-video-wishlist-btn" 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from lookbook` : `Save ${product.name} to lookbook`}
          title={isWishlisted ? "Saved to lookbook" : "Save to lookbook"}
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(28, 22, 20, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: isWishlisted ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            color: isWishlisted ? 'var(--color-gold)' : '#FFFFFF',
            transition: 'all 0.2s ease',
            padding: 0
          }}
        >
          <Heart 
            size={18} 
            fill={isWishlisted ? "var(--color-gold)" : "none"} 
            color={isWishlisted ? "var(--color-gold)" : "#FFFFFF"} 
          />
        </button>

        {/* Floating Close Button */}
        <button 
          type="button" 
          className="pure-video-close-btn" 
          onClick={onClose}
          aria-label="Close video preview"
        >
          <X size={20} strokeWidth={2} />
        </button>

        {/* ── THE PURE VIDEO SHOWCASE (VIDEO ONLY) ── */}
        <div 
          className="pure-video-viewport"
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              togglePlay();
            }
          }}
        >
          <video
            ref={videoRef}
            className="pure-video-player-element"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            poster={posterSource}
            key={`${product.id || 'pure'}-video`}
          >
            {webmSource && <source src={webmSource} type="video/webm" />}
            <source src={mp4Source} type="video/mp4" />
          </video>

          {/* Top Live Strand Movement Badge */}
          <div className="pure-video-badge" aria-hidden="true">
            <span className="qv-live-dot" />
            <span>LIVE STRAND MOVEMENT</span>
          </div>

          {/* Center Play Indicator when paused */}
          {!isPlaying && (
            <div className="pure-video-center-indicator">
              <div className="center-play-circle">
                <Play size={28} fill="currentColor" />
              </div>
            </div>
          )}

          {/* Floating Sound & Play Buttons */}
          <div className="pure-video-floating-controls" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pure-ctrl-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>

            <button
              type="button"
              className="pure-ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Bottom Bar: Pure transition CTA to details if needed, no product metadata */}
          {onOpenDetails && (
            <div className="pure-video-bottom-bar pure-video-bottom-minimal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="pure-video-details-cta"
                onClick={() => {
                  onClose();
                  onOpenDetails(product);
                }}
              >
                <span>View Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
