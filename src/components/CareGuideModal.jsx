import React, { useState, useEffect, useRef } from 'react';
import { X, Droplets, Wind, ShieldCheck, Moon, ShoppingBag, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';

const ICONS = [Droplets, ShieldCheck, Wind, Moon];

export default function CareGuideModal({ isOpen, onClose, onShopCollections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const touchStartRef = useRef(null);
  const lastToggleTimeRef = useRef(0);

  const tips = CARE_GUIDE_DATA.tips;
  const currentTip = tips[activeIndex] || tips[0];
  const CurrentIcon = ICONS[activeIndex % ICONS.length];

  // Auto-play (2.2s per slide) — pauses when video is tapped or clicked
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tips.length);
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, tips.length]);

  // Reset to first slide upon opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % tips.length);
  };

  const togglePause = (e) => {
    if (e && e.target && (e.target.closest('button') || e.target.closest('a'))) {
      return;
    }
    const now = Date.now();
    // 350ms debounce threshold prevents double-firing on mobile touch devices (touchEnd followed by synthetic click)
    if (now - lastToggleTimeRef.current < 350) {
      return;
    }
    lastToggleTimeRef.current = now;
    setIsPaused((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    if (e.target.closest('button') || e.target.closest('a')) {
      touchStartRef.current = null;
      return;
    }
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    touchStartRef.current = null;

    // Detect horizontal swipe (> 40px and predominantly horizontal)
    if (Math.abs(dx) > 40 && dy < 60) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
      return;
    }

    // Tap detected (finger did not swipe)
    if (Math.abs(dx) < 20 && dy < 20) {
      togglePause(e);
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  const handleShopCollections = () => {
    onClose();
    if (onShopCollections) {
      onShopCollections();
    }
  };

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="modal-dialog care-modal-dialog care-modal-cinematic" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Wig Care Guide"
      >
        {/* TOP BAR / CONTROLS OVERLAY */}
        <div className="care-cinematic-header">
          <div className="care-cinematic-badge">
            <span className="care-step-tag">RITUAL {currentTip.step} OF 0{tips.length}</span>
            <span className="care-step-divider">•</span>
            <span className="care-category-tag">{currentTip.category}</span>
          </div>

          <div className="care-header-actions">
            <button 
              type="button" 
              className="modal-close-btn care-cinematic-close" 
              onClick={onClose}
              aria-label="Close Care Guide"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* PROGRESS STEPPER BARS */}
        <div className="care-story-progress-bar" role="tablist" aria-label="Care steps navigation">
          {tips.map((tip, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to ${tip.title}`}
              className={`care-progress-segment ${idx === activeIndex ? 'active' : ''} ${idx < activeIndex ? 'completed' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span 
                key={`${idx}-${activeIndex}`}
                className="care-progress-fill" 
                style={{ 
                  animationDuration: '2.2s',
                  animationPlayState: isPaused ? 'paused' : 'running'
                }} 
              />
            </button>
          ))}
        </div>

        {/* CINEMATIC IMAGE / VIDEO CANVAS (UNDERLAY) */}
        <div 
          className="care-cinematic-stage"
          onClick={togglePause}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          style={{ cursor: 'pointer', touchAction: 'manipulation' }}
          title={isPaused ? "Tap to play" : "Tap to pause"}
        >
          {tips.map((tip, idx) => (
            <div 
              key={idx} 
              className={`care-stage-slide ${idx === activeIndex ? 'active' : ''}`}
              aria-hidden={idx !== activeIndex}
            >
              <img 
                src={tip.image} 
                alt={tip.title}
                className="care-stage-bg-image"
                loading="eager"
                decoding="async"
              />
              {/* Dynamic luxury gradient overlays */}
              <div className="care-stage-scrim-top" />
              <div className="care-stage-scrim-bottom" />
              <div className="care-stage-glow-radial" />
            </div>
          ))}

          {/* PAUSED CONFIRMATION BADGE */}
          {isPaused && (
            <div className="care-paused-watermark" aria-live="polite">
              <Pause size={13} fill="currentColor" />
              <span>Paused • Tap to resume</span>
            </div>
          )}

          {/* ARROW CONTROLS (DESKTOP / MOUSE) */}
          <button 
            type="button" 
            className="care-nav-arrow care-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous care step"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <button 
            type="button" 
            className="care-nav-arrow care-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next care step"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>

          {/* FLOATING TEXT CONTENT PLAYING DIRECTLY ON IMAGE */}
          <div className="care-stage-content-overlay">
            <div className="care-stage-editorial-card">
              <div className="care-stage-icon-pill">
                <CurrentIcon size={15} />
                <span>{currentTip.category}</span>
              </div>

              <h2 className="care-stage-title">
                {currentTip.title}
              </h2>

              <p className="care-stage-desc">
                {currentTip.text}
              </p>

              {/* PRO SECRET: DIRECTION 2 WITH PER-TIP ADMIN DASHBOARD POP OF COLOR */}
              {currentTip.tip && (
                <div className={`pro-secret-variant ps-tip-color-${activeIndex}`}>
                  <div className="ps-stroke-dir2">
                    <div className="ps-stroke-banner">
                      <span className="ps-stroke-label">PRO TIP</span>
                      <span className="ps-stroke-tail" />
                    </div>
                    <p className="ps-stroke-body">{currentTip.tip}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="care-cinematic-footer">
          <div className="care-footer-dots" role="tablist" aria-label="Care rituals">
            {tips.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`care-dot-pill ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="btn-primary-editorial care-footer-shop-btn" 
            onClick={handleShopCollections}
          >
            <ShoppingBag size={15} />
            <span>Explore Collections</span>
          </button>
        </div>
      </div>
    </div>
  );
}
