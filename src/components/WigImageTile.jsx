import React, { useState, useEffect } from 'react';

export default function WigImageTile({ tile, isRippling, rippleDelay }) {
  const [currentSrc, setCurrentSrc] = useState(tile.image);
  const [prevSrc, setPrevSrc] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // When tile image changes, handle smooth image swap with ripple delay
  useEffect(() => {
    if (tile.image && tile.image !== currentSrc) {
      const timer = setTimeout(() => {
        setPrevSrc(currentSrc);
        setCurrentSrc(tile.image);
        setIsTransitioning(true);
        
        const resetTimer = setTimeout(() => {
          setIsTransitioning(false);
          setPrevSrc(null);
        }, 850);
        return () => clearTimeout(resetTimer);
      }, rippleDelay);

      return () => clearTimeout(timer);
    }
  }, [tile.image, rippleDelay]);

  // Determine span class names
  const colSpanClass = `tile-col-span-${tile.colSpan || 1}`;
  const rowSpanClass = `tile-row-span-${tile.rowSpan || 1}`;

  // If this is a flat accent tile (blush, sand, olive)
  if (tile.isAccentTile) {
    return (
      <div className={`wall-tile accent-tile bg-${tile.bgTone || 'sand'} ${colSpanClass} ${rowSpanClass}`}>
        <span className="accent-tile-sparkle" aria-hidden="true">✦</span>
        <span className="accent-tile-text">{tile.accentText}</span>
      </div>
    );
  }

  return (
    <div 
      className={`wall-tile ${colSpanClass} ${rowSpanClass} ${isTransitioning ? 'rippling' : ''}`}
      style={{ transitionDelay: `${rippleDelay}ms` }}
    >
      <div className="tile-image-wrapper">
        <img
          src={currentSrc}
          alt={tile.title || "House of Nina Luxury Wig"}
          className="tile-img"
          loading="eager"
          style={{
            objectPosition: tile.objectPosition || 'center center'
          }}
        />
      </div>
    </div>
  );
}
