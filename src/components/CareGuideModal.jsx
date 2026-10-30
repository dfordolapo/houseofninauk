import React, { useState, useEffect, useRef } from 'react';
import { X, Droplets, Wind, ShieldCheck, Moon, ShoppingBag, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';

const ICONS = [Droplets, ShieldCheck, Wind, Moon];

export default function CareGuideModal({ isOpen, onClose, onShopCollections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const timerRef = useRef(null);
  const holdTimerRef = useRef(null);
  const pointerStartRef = useRef(null);
  const didHoldRef = useRef(false);

  const tips = CARE_GUIDE_DATA.tips;
  const currentTip = tips[activeIndex] || tips[0];
  const CurrentIcon = ICONS[activeIndex % ICONS.length];

  // Auto-play (2.2s per slide) — paused when user holds or taps to pause
  useEffect(() => {
    if (!isOpen || isPaused || isHolding) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tips.length);
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, isHolding, tips.length]);

  // Reset to first slide upon opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setIsPaused(false);
      setIsHolding(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % tips.length);
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    didHoldRef.current = false;

    // Hold threshold: 180ms pauses auto-play while finger or mouse is held down
    holdTimerRef.current = setTimeout(() => {
      didHoldRef.current = true;
      setIsHolding(true);
    }, 180);
  };

  const handlePointerMove = (e) => {
    if (pointerStartRef.current) {
      const dx = Math.abs(e.clientX - pointerStartRef.current.x);
      const dy = Math.abs(e.clientY - pointerStartRef.current.y);
      if (dx > 12 || dy > 12) {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      }
    }
  };

  const handlePointerUp = (e) => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

    if (didHoldRef.current) {
      didHoldRef.current = false;
      setIsHolding(false);
      pointerStartRef.current = null;
      return;
    }

    if (pointerStartRef.current) {
      const dx = e.clientX - pointerStartRef.current.x;
      const dy = Math.abs(e.clientY - pointerStartRef.current.y);
      const duration = Date.now() - pointerStartRef.current.time;

      // Detect swipe
      if (Math.abs(dx) > 40 && dy < 80) {
        if (dx < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      } else if (Math.abs(dx) < 12 && dy < 12 && duration < 320) {
        // Tap to toggle pause/resume
        if (!e.target.closest('button') && !e.target.closest('a')) {
          setIsPaused((prev) => !prev);
        }
      }
    }
    pointerStartRef.current = null;
  };

  const handlePointerCancel = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    didHoldRef.current = false;
    setIsHolding(false);
    pointerStartRef.current = null;
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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* TOP BAR / CONTROLS OVERLAY */}
        <div className="care-cinematic-header">
          <div className="care-cinematic-badge">
            <span className="care-step-tag">RITUAL {currentTip.step} OF 0{tips.length}</span>
            <span className="care-step-divider">•</span>
            <span className="care-category-tag">{currentTip.category}</span>
          </div>

          <div className="care-header-actions">
            {/* Play/Pause Toggle Button */}
            <button 
              type="button" 
              className="care-playback-toggle" 
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Play care ritual" : "Pause care ritual"}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
              <span className="care-playback-label">{isPaused ? "Play" : "Pause"}</span>
            </button>

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
                key={`${idx}-${activeIndex}-${isPaused || isHolding}`}
                className="care-progress-fill" 
                style={{ 
                  animationDuration: '2.2s',
                  animationPlayState: (isPaused || isHolding) ? 'paused' : 'running'
                }} 
              />
            </button>
          ))}
        </div>

        {/* CINEMATIC IMAGE CANVAS (UNDERLAY) */}
        <div className="care-cinematic-stage">
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

          {/* PAUSED / HOLDING WATERMARK INDICATOR */}
          {(isPaused || isHolding) && (
            <div className="care-paused-watermark animate-fade-in" aria-hidden="true">
              <Pause size={13} fill="currentColor" />
              <span>{isHolding ? "Holding to Inspect" : "Paused"}</span>
            </div>
          )}

          {/* ARROW CONTROLS (DESKTOP / MOUSE) */}
          <button 
            type="button" 
            className="care-nav-arrow care-nav-prev"
            onClick={handlePrev}
            aria-label="Previous care step"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <button 
            type="button" 
            className="care-nav-arrow care-nav-next"
            onClick={handleNext}
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
