import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WigImageTile from './WigImageTile';
import SlideshowControls from './SlideshowControls';
import { PHOTO_WALL_SETS } from '../data/wigData';

export default function WigImageWall() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const wallRef = useRef(null);

  const totalSets = PHOTO_WALL_SETS.length;
  const currentSet = PHOTO_WALL_SETS[currentSetIndex];

  // Preload upcoming images
  useEffect(() => {
    const nextIdx = (currentSetIndex + 1) % totalSets;
    const nextSet = PHOTO_WALL_SETS[nextIdx];
    nextSet.tiles.forEach(tile => {
      if (tile.image) {
        const img = new Image();
        img.src = tile.image;
      }
    });
  }, [currentSetIndex, totalSets]);

  const handleNext = useCallback(() => {
    setCurrentSetIndex((prev) => (prev + 1) % totalSets);
  }, [totalSets]);

  const handlePrev = useCallback(() => {
    setCurrentSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  // Automatic slideshow cycle every 4.2 seconds unless hovered, manually paused, or reduced-motion is active
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isHovered || isManualPaused) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [handleNext, isHovered, isManualPaused]);

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation when focusing on the wall container
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <section 
      className="photo-wall-section" 
      aria-label="Wigverse Lookbook Photo Wall"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={wallRef}
    >
      <div className="container photo-wall-container">
        {/* Previous Button Control */}
        <div className="wall-controls">
          <button 
            type="button" 
            className="wall-control-btn" 
            onClick={handlePrev}
            aria-label="Previous image lookbook set"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          
          <button 
            type="button" 
            className="wall-control-btn" 
            onClick={handleNext}
            aria-label="Next image lookbook set"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Dense CSS Grid of 12 Photo & Accent Tiles */}
        <div 
          className="photo-wall-grid"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentSet.tiles.map((tile, idx) => {
            // Ripple delay based on tile index (0 to 450ms)
            const rippleDelay = (idx % 6) * 70;
            return (
              <WigImageTile 
                key={tile.id} 
                tile={tile} 
                rippleDelay={rippleDelay}
              />
            );
          })}
        </div>

        {/* Set Switchers & Status Bar */}
        <SlideshowControls 
          sets={PHOTO_WALL_SETS}
          currentSetIndex={currentSetIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSet={(idx) => setCurrentSetIndex(idx)}
          isPaused={isHovered || isManualPaused}
          onTogglePause={() => setIsManualPaused(!isManualPaused)}
        />
      </div>
    </section>
  );
}
