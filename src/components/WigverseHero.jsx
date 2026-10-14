import React, { useState, useEffect, useRef } from 'react';
import { HERO_NINE_TILES } from '../data/wigData';

/* Realistic Golden Sparkler Pyrotechnics Canvas Component - Fast, Snappy & Vibrant */
function SparklerFireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 560;
    const height = rect.height || 200;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles = [];

    // Rapid, high-velocity pyrotechnic sparkler burst with fast sparkle burn
    const spawnBurst = (originX, originY, count, minAngle, maxAngle, baseSpeed, options = {}) => {
      const { gravityMult = 1, speedSpread = 0.75 } = options;
      for (let i = 0; i < count; i++) {
        const angle = minAngle + Math.random() * (maxAngle - minAngle);
        const speed = baseSpeed * (0.65 + Math.random() * speedSpread);
        // Fast snappy decay: particles live ~16-24 frames for instant crackling burst
        const decay = 0.045 + Math.random() * 0.030;
        const size = 1.0 + Math.random() * 2.2;

        // Luxury golden color gradient
        const roll = Math.random();
        let colorPrefix, glowColor;
        if (roll < 0.40) {
          colorPrefix = 'rgba(255, 255, 245, ';
          glowColor = 'rgba(255, 245, 205, 0.98)';
        } else if (roll < 0.78) {
          colorPrefix = 'rgba(245, 208, 115, ';
          glowColor = 'rgba(222, 180, 65, 0.90)';
        } else {
          colorPrefix = 'rgba(215, 172, 85, ';
          glowColor = 'rgba(190, 142, 50, 0.82)';
        }

        particles.push({
          x: originX,
          y: originY,
          prevX: originX,
          prevY: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: (0.16 + Math.random() * 0.10) * gravityMult,
          friction: 0.905 + Math.random() * 0.015, // Snappy air drag
          alpha: 1.0,
          decay: decay,
          size: size,
          colorPrefix: colorPrefix,
          glowColor: glowColor,
          flicker: Math.random() * 20
        });
      }
    };

    // Ultra-Fast Staggered Wave Sequence (compressed into ~150ms total)
    const timers = [];

    // Wave 1 (t = 0ms): Left apex explosive snap
    spawnBurst(width * 0.12, height * 0.52, 60, Math.PI * 0.40, Math.PI * 1.60, 15.5);

    // Wave 2 (t = 30ms): Right apex explosive snap
    timers.push(setTimeout(() => {
      spawnBurst(width * 0.88, height * 0.52, 60, -Math.PI * 0.60, Math.PI * 0.60, 15.5);
    }, 30));

    // Wave 3 (t = 65ms): Diagonal flank bursts along lower curves
    timers.push(setTimeout(() => {
      spawnBurst(width * 0.26, height * 0.68, 45, Math.PI * 0.20, Math.PI * 1.10, 13.5);
      spawnBurst(width * 0.74, height * 0.68, 45, -Math.PI * 0.10, Math.PI * 0.80, 13.5);
    }, 65));

    // Wave 4 (t = 105ms): Grand radiant center-bottom fountain pop
    timers.push(setTimeout(() => {
      spawnBurst(width * 0.50, height * 0.80, 60, Math.PI * 0.08, Math.PI * 0.92, 13.0, { gravityMult: 1.2 });
    }, 105));

    // Wave 5 (t = 150ms): Fast celebratory crackle flourish
    timers.push(setTimeout(() => {
      spawnBurst(width * 0.16, height * 0.48, 40, Math.PI * 0.48, Math.PI * 1.52, 12.0);
      spawnBurst(width * 0.84, height * 0.48, 40, -Math.PI * 0.52, Math.PI * 0.48, 12.0);
    }, 150));

    let animationId;
    let isCancelled = false;

    const render = () => {
      if (isCancelled) return;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.prevX = p.x;
        p.prevY = p.y;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.friction;
        p.vy = p.vy * p.friction + p.gravity;

        p.alpha -= p.decay;
        p.flicker += 0.55;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Rapid crackling sparkler twinkle
        const sparkle = 0.70 + 0.30 * Math.sin(p.flicker * 4.5);
        const currentAlpha = Math.max(0, p.alpha * sparkle);

        ctx.shadowBlur = 8;
        ctx.shadowColor = p.glowColor;

        // Trailing spark streak
        ctx.beginPath();
        ctx.strokeStyle = `${p.colorPrefix}${currentAlpha})`;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // White-hot core dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentAlpha * 1.35)})`;
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';

      if (particles.length > 0) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      timers.forEach(t => clearTimeout(t));
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-fireworks-canvas" aria-hidden="true" />;
}

export default function WigverseHero({ onEnterStore }) {
  const [activeImageIndices, setActiveImageIndices] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showScrollEnter, setShowScrollEnter] = useState(false);

  // Fireworks & Scroll-Enter Sequencing:
  // 1. Circle draws briskly (0.04s - 0.68s)
  // 2. Fireworks detonate IMMEDIATELY the instant circle finishes drawing
  // 3. Scroll to enter appears smoothly right after the sparkling burst
  useEffect(() => {
    const fireworkTimer = setTimeout(() => {
      setShowFireworks(true);
    }, 680);

    return () => {
      clearTimeout(fireworkTimer);
    };
  }, []);

  useEffect(() => {
    if (showFireworks) {
      const scrollTimer = setTimeout(() => {
        setShowScrollEnter(true);
      }, 520);
      return () => clearTimeout(scrollTimer);
    }
  }, [showFireworks]);

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
                stroke="var(--color-deep-espresso)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                onAnimationEnd={() => setShowFireworks(true)}
              />
            </svg>

            {/* Realistic Golden Sparkler Celebration Burst directly surrounding the circled WIGVERSE */}
            {showFireworks && <SparklerFireworksCanvas />}
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

        {/* Classy & Simple Editorial Scroll Indicator (appears after fireworks) */}
        <div className={`hero-scroll-enter-wrap ${showScrollEnter ? 'revealed' : 'hidden'}`}>
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
