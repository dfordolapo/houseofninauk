import React, { useState, useEffect } from 'react';
import { HERO_NINE_TILES } from '../data/wigData';

export default function WigverseHero({ onEnterStore }) {
  const [activeImageIndices, setActiveImageIndices] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

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

  // Alternating image crossfade cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndices((prev) => {
        const next = [...prev];
        const randomTiles = [
          Math.floor(Math.random() * 3),
          3 + Math.floor(Math.random() * 3),
          6 + Math.floor(Math.random() * 3)
        ];
        randomTiles.forEach((tileIdx) => {
          const tile = HERO_NINE_TILES[tileIdx];
          if (tile && tile.images.length > 1) {
            next[tileIdx] = (next[tileIdx] + 1) % tile.images.length;
          }
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToEnter = () => {
    if (onEnterStore) {
      onEnterStore();
    }
  };

  return (
    <section className="wigverse-exact-hero" id="hero">
      <div className="container hero-exact-container">

        {/* Headline Composition */}
        <div className="hero-top-typography">

          {/* "Welcome to our" — curved SVG text path, classy serif */}
          <div className="hero-welcome-arch-wrap" aria-hidden="false">
            <svg
              className="hero-welcome-svg"
              viewBox="0 0 700 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Welcome to our"
            >
              <defs>
                <path
                  id="welcomeArc"
                  d="M 30,100 Q 350,10 670,100"
                />
              </defs>
              <text
                className="hero-welcome-text-path"
                textAnchor="middle"
              >
                <textPath href="#welcomeArc" startOffset="50%">
                  Welcome to our
                </textPath>
              </text>
            </svg>
          </div>

          {/* "WIGVERSE" — circled with animated hand-drawn loop on load */}
          <div className="wigverse-circled-wrapper">
            <h1 className="hero-wigverse-display" aria-label="WIGVERSE">
              WIGVERSE
            </h1>
            <svg
              className="wigverse-circle-svg"
              viewBox="0 0 760 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Organic hand-drawn ellipse loop */}
              <path
                className="wigverse-circle-path"
                d="M 68,110 C 60,42 220,18 420,16 C 620,14 728,48 732,106 C 736,162 610,196 380,198 C 170,200 48,168 54,98 C 58,48 200,24 370,22"
                stroke="var(--color-white)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 6-Tile Editorial Grid — unique shapes, edge bleeds */}
        <div className="hero-six-grid">
          {HERO_NINE_TILES.slice(0, 6).map((tile, idx) => {
            const currentImg = tile.images[activeImageIndices[idx] || 0];
            return (
              <div
                key={tile.id}
                className={`six-tile-card six-tile-${idx + 1} bg-${tile.accent}`}
              >
                <div className="six-tile-img-wrap">
                  <img
                    src={currentImg}
                    alt={tile.label}
                    className="six-tile-img"
                    style={{ objectPosition: tile.objectPosition }}
                    loading={idx < 4 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Classy & Simple Editorial Scroll Indicator */}
        <div className="hero-scroll-enter-wrap">
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
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
