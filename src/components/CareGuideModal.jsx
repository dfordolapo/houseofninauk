import React, { useState, useEffect, useRef } from 'react';
import { X, Droplets, Wind, ShieldCheck, Moon, ShoppingBag, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';
import GoldStroke from './GoldStroke';

const ICONS = [Droplets, ShieldCheck, Wind, Moon];

export default function CareGuideModal({ isOpen, onClose, onShopCollections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);
  const timerRef = useRef(null);

  const tips = CARE_GUIDE_DATA.tips;
  const currentTip = tips[activeIndex] || tips[0];
  const CurrentIcon = ICONS[activeIndex % ICONS.length];

  // Fast & lively auto-play (2.2s per slide)
  useEffect(() => {
    if (!isOpen) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tips.length);
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, tips.length]);

  // Reset to first slide upon opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % tips.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
                  animationPlayState: 'running'
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
                      <span className="ps-stroke-label desktop-pro-label">PRO SECRET</span>
                      <span className="ps-stroke-label mobile-pro-label">PRO TIP</span>
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
