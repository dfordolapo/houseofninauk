import React, { useEffect, useRef, useState } from 'react';

/**
 * GoldStroke
 * An editorial calligraphic gold brush stroke that appears dynamically
 * underneath highlighted words when the heading enters the viewport.
 */
export default function GoldStroke({ children, className = '', delay = 250 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={containerRef} className={`editorial-gold-highlight ${className}`}>
      <span className="gold-highlight-text">{children}</span>
      <svg 
        className={`editorial-gold-svg ${isVisible ? 'stroke-visible' : ''}`}
        viewBox="0 0 240 18" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="editorialGoldStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#E5C781" stopOpacity="1" />
            <stop offset="70%" stopColor="#C5A059" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B38B3E" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path
          d="M 4 12 Q 62 4, 122 10 T 236 7"
          fill="none"
          stroke="url(#editorialGoldStrokeGradient)"
          strokeWidth="3.6"
          strokeLinecap="round"
          className="editorial-gold-path"
        />
      </svg>
    </span>
  );
}
