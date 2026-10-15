import React, { useEffect, useRef, useState, useId } from 'react';

/**
 * GoldStroke
 * An editorial calligraphic gold brush stroke that dynamically sketches
 * underneath highlighted words with rich thickness, multi-layered luster,
 * and fluid velocity when entering the viewport.
 */
export default function GoldStroke({ children, className = '', delay = 200 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const rawId = useId();
  const gradientId = `goldGrad_${rawId.replace(/:/g, '_')}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={containerRef} className={`editorial-gold-highlight ${className}`}>
      <span className="gold-highlight-text">{children}</span>
      <svg 
        className={`editorial-gold-svg ${isVisible ? 'stroke-visible' : ''}`}
        viewBox="0 0 260 26" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E7A32" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#C5A059" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F5E4B2" stopOpacity="1" />
            <stop offset="75%" stopColor="#C5A059" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8C6524" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Primary bold dynamic calligraphic brush swoop (Thick, confident stroke) */}
        <path
          d="M 4 14 C 60 4, 130 18, 195 8 C 222 4, 246 11, 256 6"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="editorial-gold-path primary-stroke"
        />

        {/* Secondary textured artisan accent stroke (Trailing metallic flourish) */}
        <path
          d="M 22 21 C 82 14, 155 22, 238 13"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="editorial-gold-path secondary-stroke"
        />
      </svg>
    </span>
  );
}
