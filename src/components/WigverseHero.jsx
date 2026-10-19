import React, { useState, useEffect } from 'react';

export default function WigverseHero({ onEnterStore }) {
  const [showScrollEnter, setShowScrollEnter] = useState(false);

  // Scroll-Enter Sequencing: appears smoothly after circle finishes drawing (0.65s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollEnter(true);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  // Fast scroll trigger: when user scrolls down while on the hero, trigger fast switch to store
  useEffect(() => {
    let triggered = false;

    const handleWheel = (e) => {
      if (triggered) return;
      if (e.deltaY > 18) {
        triggered = true;
        if (onEnterStore) onEnterStore();
      }
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const startY = touch.clientY;

      const handleTouchMove = (moveEvt) => {
        if (triggered) return;
        const currentY = moveEvt.touches[0].clientY;
        if (startY - currentY > 24) {
          triggered = true;
          window.removeEventListener('touchmove', handleTouchMove);
          if (onEnterStore) onEnterStore();
        }
      };

      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    };

    const handleKeyDown = (e) => {
      if (triggered) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        triggered = true;
        if (onEnterStore) onEnterStore();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnterStore]);

  const handleScrollToEnter = () => {
    if (onEnterStore) {
      onEnterStore();
    }
  };

  return (
    <section className="wigverse-exact-hero" id="hero">
      {/* =========================================================================
          DESKTOP / WEB HERO:
          - Starts at the very top of the screen (full viewport width & height)
          - Full-width walk-in luxury closet image
          - "Welcome to our HOUSE" on ONE single line in the same font
          - Circled loop around HOUSE, NO fireworks
          - "scroll to enter" placed close directly beneath the welcome line
          ========================================================================= */}
      <div className="hero-web-layout desktop-only">
        {/* Full-width background image covering from very top */}
        <div className="hero-web-bg-wrap" onClick={handleScrollToEnter} role="button" tabIndex={0} aria-label="Enter House of Nina">
          <img
            src="/images/hero_desktop.webp"
            alt="House of Nina - Welcome to our House Luxury Walk-in Closet"
            className="hero-web-bg-img"
            loading="eager"
          />
          <div className="hero-web-scrim" aria-hidden="true" />
        </div>

        {/* Center-aligned headline on ONE line + scroll to enter */}
        <div className="hero-web-content">
          <h1 className="hero-web-single-headline" aria-label="Welcome to our HOUSE">
            <span className="hero-web-welcome-text">Welcome to our</span>
            <span className="wigverse-circled-wrapper web-circled-wrapper">
              <span className="hero-wigverse-display web-house-display">HOUSE</span>
              <svg
                className="wigverse-circle-svg web-circle-svg"
                viewBox="0 0 540 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  className="wigverse-circle-path"
                  d="M 40,105 C 32,38 150,14 270,12 C 390,10 498,38 502,102 C 506,166 400,200 270,198 C 120,196 26,166 30,98 C 34,44 140,20 250,18"
                  stroke="var(--color-deep-espresso)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          {/* Scroll to enter placed close directly beneath the welcome */}
          <div className={`hero-scroll-enter-wrap web-scroll-wrap ${showScrollEnter ? 'revealed' : 'hidden'}`}>
            <button
              type="button"
              className="classy-scroll-indicator"
              onClick={handleScrollToEnter}
              aria-label="Scroll to enter the store"
            >
              <span className="classy-scroll-label">scroll to enter</span>
              <div className="classy-scroll-line-wrap">
                <span className="classy-scroll-line"></span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="classy-scroll-chevron">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE HERO (Preserved as is):
          - Arched "Welcome to our"
          - Circled "HOUSE"
          - Portrait showcase framed image card
          - Scroll indicator
          ========================================================================= */}
      <div className="hero-mobile-layout mobile-only">
        <div className="container hero-exact-container">
          {/* Mobile Headline Composition */}
          <div className="hero-top-typography">
            <div className="hero-mobile-welcome-line">
              Welcome to our
            </div>

            <div className="wigverse-circled-wrapper">
              <h1 className="hero-wigverse-display" aria-label="HOUSE">
                HOUSE
              </h1>
              <svg
                className="wigverse-circle-svg"
                viewBox="0 0 540 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  className="wigverse-circle-path"
                  d="M 40,105 C 32,38 150,14 270,12 C 390,10 498,38 502,102 C 506,166 400,200 270,198 C 120,196 26,166 30,98 C 34,44 140,20 250,18"
                  stroke="var(--color-deep-espresso)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Mobile Centerpiece Showcase Image */}
          <div
            className="hero-house-showcase"
            onClick={handleScrollToEnter}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollToEnter();
              }
            }}
            aria-label="Welcome to our House - Click to enter store"
          >
            <div className="hero-house-img-wrap">
              <img
                src="/images/welcome-house.webp"
                alt="House of Nina - Welcome to our House Luxury Atelier"
                className="hero-house-img"
                loading="eager"
              />
              <div className="hero-house-ambient-glow" aria-hidden="true" />
            </div>
          </div>

          {/* Mobile Scroll Indicator */}
          <div className={`hero-scroll-enter-wrap ${showScrollEnter ? 'revealed' : 'hidden'}`}>
            <button
              type="button"
              className="classy-scroll-indicator"
              onClick={handleScrollToEnter}
              aria-label="Scroll to enter the store"
            >
              <span className="classy-scroll-label">scroll to enter</span>
              <div className="classy-scroll-line-wrap">
                <span className="classy-scroll-line"></span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="classy-scroll-chevron">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
