import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HOUSE_COLLECTION_CARDS } from '../data/wigData';

const AUTOPLAY_INTERVAL = 2200; // 2.2 seconds per slide (faster smooth progression)

export default function CollectionSlideshow({ onOpenCollection }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  // Automatic slideshow playback
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HOUSE_COLLECTION_CARDS.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, activeSlide]);

  const handleCardClick = (categoryFilter) => {
    if (onOpenCollection) {
      onOpenCollection(categoryFilter);
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveSlide((prev) => (prev + 1) % HOUSE_COLLECTION_CARDS.length);
      } else {
        setActiveSlide((prev) => (prev - 1 + HOUSE_COLLECTION_CARDS.length) % HOUSE_COLLECTION_CARDS.length);
      }
    }

    touchStartXRef.current = null;
    setIsPaused(false);
  };

  return (
    <div 
      className="collections-autoplay-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="collections-autoplay-viewport">
        <div 
          className="collections-autoplay-track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {HOUSE_COLLECTION_CARDS.map((card, idx) => {
            const isActive = activeSlide === idx;

            return (
              <div key={card.id} className="collections-autoplay-slide">
                <article 
                  className={`collection-panoramic-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCardClick(card.categoryFilter)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${card.title} collection`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.categoryFilter);
                    }
                  }}
                >
                  {/* Left Side: High-Fashion Visual Imagery */}
                  <div className="collection-panoramic-media">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="collection-panoramic-img" 
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="collection-panoramic-overlay" />
                    
                    {/* Luxury Floating Badge */}
                    <span className="collection-floating-badge">
                      {card.badge}
                    </span>

                    {/* Item Count Pill */}
                    <span className="collection-count-pill">
                      {card.itemCount}
                    </span>
                  </div>

                  {/* Right Side: Editorial Content & Features */}
                  <div className="collection-panoramic-content">
                    <span className="collection-panoramic-eyecatch">{card.tagline}</span>
                    <h3 className="collection-panoramic-title">{card.title}</h3>
                    <p className="collection-panoramic-desc">{card.description}</p>

                    {/* Key Features */}
                    <ul className="collection-panoramic-specs">
                      {card.highlights.map((h, i) => (
                        <li key={i} className="collection-panoramic-spec-item">
                          <span className="gold-bullet">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Direct Explore CTA */}
                    <div className="collection-panoramic-footer">
                      <span className="collection-explore-link">
                        <span>{card.buttonLabel}</span>
                        <ArrowRight size={15} className="arrow-icon" />
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luxury Animated Slide Progress Indicators (No Chevrons) */}
      <div className="collections-progress-indicators" role="tablist" aria-label="Collection Slides">
        {HOUSE_COLLECTION_CARDS.map((card, idx) => {
          const isActive = activeSlide === idx;

          return (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`collection-progress-bar-tab ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveSlide(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 2400);
              }}
              title={`View ${card.title}`}
            >
              <span className="collection-progress-tab-label">{card.title}</span>
              <div className="collection-progress-track">
                <div 
                  key={isActive ? `active-${activeSlide}` : `inactive-${idx}`}
                  className={`collection-progress-fill ${isActive && !isPaused ? 'filling' : ''} ${isActive && isPaused ? 'paused-full' : ''}`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
