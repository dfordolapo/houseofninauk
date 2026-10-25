import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTION_REELS_DATA } from '../data/wigData';

/**
 * ThreeReelsShowcase
 * Three vertical moving reels layout: Wigs (Up), Scarves (Down), Accessories (Up)
 * Kept safe for quick reinstatement or A/B testing.
 */
export default function ThreeReelsShowcase({ onOpenCollection }) {
  const handleReelClick = (categoryFilter) => {
    if (onOpenCollection) {
      onOpenCollection(categoryFilter);
    }
  };

  return (
    <div 
      className="collection-reels-stage" 
      role="region" 
      aria-label="The Three House Collections Vertical Reels"
    >
      <div className="collection-reels-grid">
        {COLLECTION_REELS_DATA.map((reel) => {
          const duplicatedImages = [...reel.images, ...reel.images];

          return (
            <article
              key={reel.id}
              className={`collection-reel-column collection-reel-${reel.direction} collection-reel-${reel.id}`}
              onClick={() => handleReelClick(reel.categoryFilter)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleReelClick(reel.categoryFilter);
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`Explore ${reel.title} Collection (${reel.countLabel})`}
            >
              {/* Subtle top & bottom edge gradients */}
              <div className="reel-vignette-edge reel-vignette-top" aria-hidden="true" />
              <div className="reel-vignette-edge reel-vignette-bottom" aria-hidden="true" />

              {/* Vertically animated continuous track */}
              <div 
                className={`reel-vertical-track track-${reel.direction} track-${reel.speedClass}`}
                aria-hidden="true"
              >
                {duplicatedImages.map((img, idx) => (
                  <div key={`${reel.id}-${idx}`} className="reel-item-tile">
                    <img
                      src={img.src}
                      alt=""
                      className="reel-item-img"
                      loading={idx > 2 ? "lazy" : "eager"}
                      decoding="async"
                    />
                    <div className="reel-item-scrim" />
                  </div>
                ))}
              </div>

              {/* Fixed luxury editorial collection label & explore indicator */}
              <div className="reel-label-anchor">
                <div className="reel-label-badge">
                  <span className="reel-label-name">{reel.title}</span>
                  <span className="reel-label-sub">{reel.countLabel}</span>
                  <span className="reel-label-cta">
                    <span>Explore</span>
                    <ArrowRight size={13} className="reel-cta-arrow" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
