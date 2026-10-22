import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE RIBBON ORDER SUCCESS WITH RADIANT GOLD CONFETTI
 * ============================================================================
 * - Celebratory shower of 3D tumbling metallic gold confetti & foil ribbons.
 * - Single cohesive satin ribbon band wrapping the cascading glossy dark hair.
 * - Restrained typography: "Order Confirmed", "ORDER NO.", and "EST. ARRIVAL".
 * - Natural -2.8deg organic tilt matching the ribbon wrap seam.
 * - Full-bleed on mobile (100vw × 100dvh) & centered luxury editorial on desktop.
 * - Proper "Continue Shopping" button.
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen = true, 
  onClose, 
  onContinueShopping 
}) {
  const canvasRef = useRef(null);

  if (!isOpen && !order) return null;

  // Real order identifier with clean formatting
  const rawId = order?.orderId || order?.id || "HN-48291";
  const formattedOrderId = rawId.startsWith('HN') && !rawId.includes('-')
    ? rawId.replace('HN', 'HN-')
    : rawId;

  // Dynamic Estimated Arrival date calculation
  const getEstimatedArrival = () => {
    if (order?.estimatedArrival) return order.estimatedArrival;
    try {
      const baseDate = order?.date ? new Date(order.date) : new Date();
      if (isNaN(baseDate.getTime())) {
        return "2–3 Working Days";
      }
      const est = new Date(baseDate);
      est.setDate(est.getDate() + 3);
      return est.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return "2–3 Working Days";
    }
  };
  const estimatedArrival = getEstimatedArrival();

  const handleContinue = () => {
    if (onContinueShopping) onContinueShopping();
    else if (onClose) onClose();
  };

  // ── LUXURY METALLIC GOLD CONFETTI CANVAS EFFECT ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Curated rich 24K and champagne gold metallic palette
    const goldPalette = [
      '#FFDF78', // bright pale gold shimmer
      '#D4AF37', // metallic 24k gold
      '#C5A059', // warm champagne satin
      '#ECCB8F', // specular radiant gold
      '#AA7A28', // deep molten bronze
      '#FFF3C4', // glittering highlight
      '#F0D082'  // fine leaf gold
    ];

    // Abundant luxury gold confetti shower (220 particles: foils, discs, diamond stars)
    const particleCount = 220;
    const particles = Array.from({ length: particleCount }).map(() => {
      const randShape = Math.random();
      const shape = randShape > 0.4 ? 'foil' : randShape > 0.15 ? 'disc' : 'diamond';
      return {
        x: Math.random() * canvas.width,
        // Spread both across the viewport and above it so it explodes into view immediately
        y: Math.random() * canvas.height * 1.6 - canvas.height * 0.7,
        w: Math.random() * 8 + 6,
        h: Math.random() * 16 + 8,
        vx: (Math.random() - 0.5) * 2.8,
        vy: Math.random() * 2.8 + 1.8,
        rotation: Math.random() * 360,
        vRotation: (Math.random() - 0.5) * 8,
        tilt: Math.random() * 360,
        vTilt: Math.random() * 6 + 3,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        opacity: Math.random() * 0.45 + 0.55,
        shape
      };
    });

    const startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.015) * 0.9;
        p.y += p.vy;
        p.rotation += p.vRotation;
        p.tilt += p.vTilt;

        // Loop / recycle particles gracefully for continuous lavish celebration
        if (p.y > canvas.height + 40) {
          const elapsed = (Date.now() - startTime) / 1000;
          if (elapsed < 24) {
            p.y = -35;
            p.x = Math.random() * canvas.width;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        const tiltFactor = Math.sin((p.tilt * Math.PI) / 180);

        if (p.shape === 'foil') {
          // 3D Tumbling Rectangular Gold Foil Ribbon
          ctx.beginPath();
          ctx.rect(-p.w / 2, (-p.h * tiltFactor) / 2, p.w, p.h * Math.abs(tiltFactor));
          ctx.fill();
        } else if (p.shape === 'disc') {
          // Sparkling Circular Gold Disc
          ctx.beginPath();
          ctx.arc(0, 0, (p.w / 2) * Math.abs(tiltFactor), 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Diamond / 4-Point Shimmer Star
          const size = (p.w / 1.5) * Math.abs(tiltFactor);
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.4, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.4, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div 
      className={`ribbon-success-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Order Confirmed: ${formattedOrderId}`}
    >
      {/* ── FULL-SCREEN GOLD CONFETTI CANVAS ── */}
      <canvas 
        ref={canvasRef} 
        className="ribbon-gold-confetti-canvas"
        aria-hidden="true"
      />

      {/* Discreet Close Button */}
      <button
        type="button"
        className="ribbon-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* ── UNIFIED COMPOSITION STAGE (Desktop & Mobile) ── */}
      <div 
        className="ribbon-composition-stage"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ribbon-card-frame">
          <picture>
            <source srcSet="/images/house-of-nina-ribbon-mobile.webp" type="image/webp" />
            <img 
              src="/images/house-of-nina-ribbon-mobile.jpg" 
              alt="House of Nina satin ribbon wrapped around glossy dark hair" 
              className="ribbon-hero-img"
            />
          </picture>

          {/* Unified Ribbon Surface: Order Confirmed + Order No & Est. Arrival */}
          <div className="ribbon-unified-text-surface animate-ribbon-text">
            <h1 className="ribbon-serif-heading">
              Order Confirmed
            </h1>

            {/* 2 Columns with fine vertical divider */}
            <div className="ribbon-columns-container">
              <div className="ribbon-col-entry">
                <span className="ribbon-val-text">{formattedOrderId}</span>
                <span className="ribbon-lbl-text">ORDER NO.</span>
              </div>

              <div className="ribbon-divider-line" aria-hidden="true" />

              <div className="ribbon-col-entry">
                <span className="ribbon-val-text">{estimatedArrival}</span>
                <span className="ribbon-lbl-text">EST. ARRIVAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Proper "Continue Shopping" Luxury Button */}
        <div className="ribbon-action-footer">
          <button
            type="button"
            className="ribbon-continue-btn"
            onClick={handleContinue}
          >
            Continue Shopping
          </button>
        </div>
      </div>

    </div>
  );
}
