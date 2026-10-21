import React from 'react';

/**
 * House of Nina Official Royal Monogram & Crest
 * Features:
 * - 5-spire Royal Crown with jewel accents
 * - Intertwined serif 'H' and 'N' monogram
 * - Spaced "HOUSE OF NINA" serif wordmark
 */
export default function HouseOfNinaCrest({ 
  className = "", 
  size = 54, 
  color = "#B89047", 
  showWordmark = true 
}) {
  return (
    <div className={`hn-crest-container ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg 
        width={size} 
        height={size * 0.9} 
        viewBox="0 0 100 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Royal Crown (5 Spires with Jewels) ── */}
        <g stroke={color} fill={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Crown Base Band */}
          <path d="M28 22 C38 20.5, 62 20.5, 72 22 L71 24 C61 22.8, 39 22.8, 29 24 Z" />
          {/* Pearls on Base */}
          <circle cx="34" cy="22.5" r="1" fill="#FFFFFF" stroke="none" />
          <circle cx="42" cy="22.2" r="1" fill="#FFFFFF" stroke="none" />
          <circle cx="50" cy="22.0" r="1.1" fill="#FFFFFF" stroke="none" />
          <circle cx="58" cy="22.2" r="1" fill="#FFFFFF" stroke="none" />
          <circle cx="66" cy="22.5" r="1" fill="#FFFFFF" stroke="none" />

          {/* Crown Spire Peaks & Arches */}
          <path 
            d="M28 21.5 L30 11 L38 18 L50 7 L62 18 L70 11 L72 21.5 Z" 
            fill="none" 
            strokeWidth="1.6" 
          />
          {/* Jewels atop each spire */}
          <circle cx="30" cy="10" r="1.8" />
          <circle cx="38" cy="17.5" r="1.4" />
          <circle cx="50" cy="6" r="2.2" />
          <circle cx="62" cy="17.5" r="1.4" />
          <circle cx="70" cy="10" r="1.8" />
          {/* Crown interior arches */}
          <path d="M38 18 Q50 14 62 18" fill="none" strokeWidth="1.2" />
        </g>

        {/* ── Intertwined "HN" Monogram ── */}
        <g fill={color} stroke={color} strokeLinejoin="round">
          {/* Left Vertical of H with serifs */}
          <path d="M30 38 L30 40 L35 40 L35 74 L30 74 L30 76 L44 76 L44 74 L39 74 L39 59 L54 59 L54 74 L49 74 L49 76 L62 76 L62 74 L57 74 L57 40 L62 40 L62 38 L49 38 L49 40 L54 40 L54 55 L39 55 L39 40 L44 40 L44 38 Z" strokeWidth="0.5" />
          
          {/* Diagonal & Right Vertical of N intertwining with H */}
          {/* Top serif of N */}
          <path d="M53 40 L69 70 L70 70 L70 40 L65 40 L65 38 L78 38 L78 40 L74 40 L74 74 L78 74 L78 76 L65 76 L50 48 L49 48 L49 54 L46 54 L46 50 L53 38 Z" strokeWidth="0.5" />
        </g>
      </svg>

      {showWordmark && (
        <span 
          style={{ 
            fontFamily: "'Playfair Display', Georgia, serif", 
            fontSize: '11px', 
            fontWeight: 700, 
            letterSpacing: '0.22em', 
            textTransform: 'uppercase', 
            color: color,
            marginTop: '6px',
            lineHeight: 1
          }}
        >
          HOUSE OF NINA
        </span>
      )}
    </div>
  );
}
