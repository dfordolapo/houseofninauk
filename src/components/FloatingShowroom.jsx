import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { FLOATING_SHOWROOM_DATA } from '../data/wigData';

/**
 * FloatingShowroom: House of Nina The Floating Showroom
 * Sculptural plinths, arched visual zones, and floating macro texture insets.
 * Features mobile Magnetic Focus scroll animation.
 */
export default function FloatingShowroom({ onOpenCollection }) {
  const cardRefs = useRef([]);
  const [activeCenterIndex, setActiveCenterIndex] = useState(0);

  const handleCollectionClick = (category) => {
    if (onOpenCollection) {
      onOpenCollection(category);
    }
  };

  const wigsData = FLOATING_SHOWROOM_DATA.find((item) => item.id === 'wigs');
  const scarvesData = FLOATING_SHOWROOM_DATA.find((item) => item.id === 'scarves');
  const accessoriesData = FLOATING_SHOWROOM_DATA.find((item) => item.id === 'accessories');

  // Cinematic Magnetic Focus scroll observation for mobile
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const centerY = vh / 2;

          let closestIdx = 0;
          let minDistance = Infinity;

          cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - centerY);

            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });

          setActiveCenterIndex(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="floating-showroom-canvas" role="region" aria-label="The House Collections Floating Showroom">

      {/* ========================================================
          DESKTOP & TABLET: ASYMMETRICAL EDITORIAL SHOWROOM
          ======================================================== */}
      <div className="showroom-desktop-layout">
        
        {/* COLUMN 1: WIGS PLINTH */}
        <div className="showroom-col showroom-col-wigs">
          {wigsData && (
            <article 
              className="showroom-piece-card showroom-piece-wigs"
              onClick={() => handleCollectionClick(wigsData.categoryFilter)}
              role="link"
              tabIndex={0}
              aria-label={`Explore ${wigsData.title} Collection`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCollectionClick(wigsData.categoryFilter);
                }
              }}
            >
              <div className="showroom-arch-stage arch-wigs">
                <img 
                  src={wigsData.image} 
                  alt={wigsData.alt} 
                  className="showroom-arch-img"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Floating Macro Lace Texture Inset */}
                {wigsData.inset && (
                  <div className="showroom-float-inset inset-wigs" aria-hidden="true">
                    <img 
                      src={wigsData.inset.image} 
                      alt={wigsData.inset.alt} 
                      className="showroom-inset-tile"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>

              {/* Caption & Action */}
              <div className="showroom-meta-block">
                <h3 className="showroom-item-title">{wigsData.title}</h3>
                <span className="showroom-item-sub">{wigsData.subtitle}</span>
                <div className="showroom-item-cta">
                  <span className="showroom-circle-arrow">
                    <ArrowRight size={14} />
                  </span>
                  <span className="showroom-cta-label">{wigsData.actionLabel}</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* COLUMN 2: SCARVES (ELEVATED SCULPTURAL CENTERPIECE) */}
        <div className="showroom-col showroom-col-scarves">
          {scarvesData && (
            <article 
              className="showroom-piece-card showroom-piece-scarves"
              onClick={() => handleCollectionClick(scarvesData.categoryFilter)}
              role="link"
              tabIndex={0}
              aria-label={`Explore ${scarvesData.title} Collection`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCollectionClick(scarvesData.categoryFilter);
                }
              }}
            >
              <div className="showroom-arch-stage arch-scarves">
                <img 
                  src={scarvesData.image} 
                  alt={scarvesData.alt} 
                  className="showroom-arch-img"
                  loading="eager"
                  decoding="async"
                />

                {/* Floating Macro Silk Weave Inset */}
                {scarvesData.inset && (
                  <div className="showroom-float-inset inset-scarves" aria-hidden="true">
                    <img 
                      src={scarvesData.inset.image} 
                      alt={scarvesData.inset.alt} 
                      className="showroom-inset-tile"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>

              {/* Caption & Action */}
              <div className="showroom-meta-block">
                <h3 className="showroom-item-title">{scarvesData.title}</h3>
                <span className="showroom-item-sub">{scarvesData.subtitle}</span>
                <div className="showroom-item-cta">
                  <span className="showroom-circle-arrow">
                    <ArrowRight size={14} />
                  </span>
                  <span className="showroom-cta-label">{scarvesData.actionLabel}</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* COLUMN 3: ACCESSORIES (CURATED STILL LIFE) */}
        <div className="showroom-col showroom-col-accessories">
          {accessoriesData && (
            <article 
              className="showroom-piece-card showroom-piece-accessories"
              onClick={() => handleCollectionClick(accessoriesData.categoryFilter)}
              role="link"
              tabIndex={0}
              aria-label={`Explore ${accessoriesData.title} Collection`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCollectionClick(accessoriesData.categoryFilter);
                }
              }}
            >
              <div className="showroom-arch-stage arch-accessories">
                <img 
                  src={accessoriesData.image} 
                  alt={accessoriesData.alt} 
                  className="showroom-arch-img"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Caption & Action */}
              <div className="showroom-meta-block">
                <h3 className="showroom-item-title">{accessoriesData.title}</h3>
                <span className="showroom-item-sub">{accessoriesData.subtitle}</span>
                <div className="showroom-item-cta">
                  <span className="showroom-circle-arrow">
                    <ArrowRight size={14} />
                  </span>
                  <span className="showroom-cta-label">{accessoriesData.actionLabel}</span>
                </div>
              </div>
            </article>
          )}
        </div>

      </div>

      {/* ========================================================
          MOBILE VIEW: MAGNETIC FOCUS SCROLL SHOWROOM
          ======================================================== */}
      <div className="showroom-mobile-layout">
        <div className="showroom-mobile-list">
          {FLOATING_SHOWROOM_DATA.map((item, idx) => {
            const isCenterFocus = activeCenterIndex === idx;

            return (
              <article 
                key={`m-${item.id}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`showroom-m-card showroom-m-${item.id} ${isCenterFocus ? 'is-center-focus' : ''}`}
                onClick={() => handleCollectionClick(item.categoryFilter)}
                role="link"
                tabIndex={0}
                aria-label={`Explore ${item.title} Collection`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCollectionClick(item.categoryFilter);
                  }
                }}
              >
                {/* Expansive Arched Visual Stage */}
                <div className="showroom-m-visual">
                  <div className="showroom-m-arch">
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      className="showroom-m-img"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>

                  {/* Floating Macro Texture Inset */}
                  {item.inset && (
                    <div className="showroom-m-inset" aria-hidden="true">
                      <img 
                        src={item.inset.image} 
                        alt={item.inset.alt} 
                        className="showroom-m-inset-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="showroom-m-body">
                  <div className="showroom-m-text">
                    <h3 className="showroom-m-title">{item.title}</h3>
                    <span className="showroom-m-sub">{item.subtitle}</span>
                  </div>
                  <div className="showroom-m-cta">
                    <span className="showroom-circle-arrow">
                      <ArrowRight size={14} />
                    </span>
                    <span className="showroom-cta-label">{item.actionLabel}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

    </div>
  );
}
