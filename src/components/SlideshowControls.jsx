import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function SlideshowControls({ 
  sets, 
  currentSetIndex, 
  onPrev, 
  onNext, 
  onSelectSet,
  isPaused,
  onTogglePause
}) {
  return (
    <div className="wall-status-bar">
      {/* Set Category Tabs / Dots */}
      <div className="wall-set-dots" role="tablist" aria-label="Photo Wall Editorial Moods">
        {sets.map((set, idx) => (
          <button
            key={set.id}
            type="button"
            role="tab"
            aria-selected={idx === currentSetIndex}
            className={`set-dot-btn ${idx === currentSetIndex ? 'active' : ''}`}
            onClick={() => onSelectSet(idx)}
          >
            {set.name}
          </button>
        ))}
      </div>

      {/* Auto-cycle status & Pause toggle */}
      <div className="wall-pause-indicator">
        <button 
          type="button" 
          onClick={onTogglePause} 
          className="set-dot-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isPaused ? <Play size={12} /> : <Pause size={12} />}
          <span>{isPaused ? "Paused" : "Live Mood Cycle"}</span>
        </button>
        {!isPaused && <span className="pause-dot" aria-hidden="true" />}
      </div>
    </div>
  );
}
