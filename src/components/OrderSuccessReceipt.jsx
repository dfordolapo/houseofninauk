import React, { useEffect, useRef, useState } from 'react';
import { 
  X, 
  FileText, 
  Check, 
  Copy, 
  Printer, 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar,
  ArrowRight
} from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE RIBBON ORDER SUCCESS FLOATING MODAL
 * ============================================================================
 * - Celebratory shower of 3D tumbling metallic gold confetti & foil ribbons.
 * - Single cohesive satin ribbon band wrapping the cascading glossy dark hair.
 * - Restrained typography: "Order Confirmed", "ORDER NO.", and "EST. ARRIVAL"
 *   sitting directly on the ribbon seam with organic -2.8deg tilt.
 * - Authentic luxury floating modal dialog with backdrop blur on desktop & mobile.
 * - Actions: "Continue Shopping" and "View Order Details".
 * - Order Details breakdown: No sparkles, no atelier references. Clean editorial.
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen = true, 
  onClose, 
  onContinueShopping 
}) {
  const canvasRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

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

  // Order date string
  const orderDate = order?.date || new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  // Items fallback
  const items = order?.items && order.items.length > 0
    ? order.items
    : [
        {
          id: 'hn-bespoke-01',
          name: 'The Sovereign HD Lace Frontal Wig',
          selectedLength: '24"',
          selectedLace: '13x6 HD Invisible Lace',
          selectedDensity: '200% Density',
          quantity: 1,
          price: 495,
          image: '/images/house-of-nina-ribbon-mobile.webp'
        }
      ];

  const currencySymbol = order?.currencySymbol || '£';
  const subtotal = typeof order?.subtotal === 'number' 
    ? order.subtotal.toFixed(2) 
    : (order?.subtotal || '495.00');
  const shippingCost = typeof order?.shippingCost === 'number' && order.shippingCost > 0
    ? `${currencySymbol}${order.shippingCost.toFixed(2)}`
    : 'Complimentary';
  const discount = order?.discount 
    ? `- ${currencySymbol}${typeof order.discount === 'number' ? order.discount.toFixed(2) : order.discount}` 
    : null;
  const total = typeof order?.total === 'number'
    ? order.total.toFixed(2)
    : (order?.total || subtotal);

  const deliveryMethod = order?.deliveryMethod || 'Royal Mail 48 Tracked (Complimentary)';
  const paymentMethod = order?.paymentMethod || 'Stripe Verified Card (•••• 4892)';
  const customerName = order?.customer?.fullName || 'Valued Client';
  const customerEmail = order?.customer?.email || 'client@houseofnina.co.uk';
  const customerAddress = order?.customer?.address
    ? [order.customer.address, order.customer.city, order.customer.state, order.customer.postalCode].filter(Boolean).join(', ')
    : '42 Mayfair Square, Mayfair, London W1K 5JH';

  const handleContinue = () => {
    if (onContinueShopping) onContinueShopping();
    else if (onClose) onClose();
  };

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedOrderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ── LUXURY METALLIC GOLD CONFETTI CANVAS EFFECT ──
  useEffect(() => {
    if (!isOpen) return;
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

    // Abundant luxury gold confetti shower (250 metallic gold foils and spangles)
    const particleCount = 250;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      // Distribute both in view and above viewport so it's instantly showering everywhere
      y: Math.random() * canvas.height * 1.6 - canvas.height * 0.6,
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
      shape: Math.random() > 0.35 ? 'foil' : 'disc'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.015) * 0.9;
        p.y += p.vy;
        p.rotation += p.vRotation;
        p.tilt += p.vTilt;

        // Continuous celebratory shower while modal is open
        if (p.y > canvas.height + 40) {
          p.y = -35;
          p.x = Math.random() * canvas.width;
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
        } else {
          // Sparkling Circular Gold Disc
          ctx.beginPath();
          ctx.arc(0, 0, (p.w / 2) * Math.abs(tiltFactor), 0, Math.PI * 2);
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
  }, [isOpen]);

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

      {/* ── FLOATING LUXURY MODAL DIALOG (9:16 PROPORTION) ── */}
      <div 
        className="ribbon-modal-window"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="ribbon-modal-close-btn"
          onClick={onClose}
          aria-label="Close order confirmation modal"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* 9:16 Visual Background */}
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

        {/* Modal Action Footer directly within modal: View Order Details first, Continue Shopping second */}
        <div className="ribbon-modal-footer">
          <button
            type="button"
            className="ribbon-details-btn"
            onClick={() => setShowDetails(true)}
          >
            <FileText size={14} strokeWidth={1.8} />
            <span>View Order Details</span>
          </button>

          <button
            type="button"
            className="ribbon-continue-btn"
            onClick={handleContinue}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LUXURY ORDER DETAILS OVERLAY & MODAL SHEET (NO SPARKLES, NO ATELIER)
          ══════════════════════════════════════════════════════════════════════ */}
      {showDetails && (
        <div 
          className="order-details-overlay open"
          onClick={() => setShowDetails(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Order Details for ${formattedOrderId}`}
        >
          <div 
            className="order-details-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* STICKY LUXURY HEADER */}
            <div className="order-details-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="order-details-status-pill">
                    <Check size={11} strokeWidth={2.5} />
                    <span>Payment Confirmed • Processing</span>
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '22px',
                  margin: '4px 0 2px',
                  color: '#24170F',
                  fontWeight: 600
                }}>
                  Order Details
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#5A4335', fontWeight: 600 }}>
                    {formattedOrderId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyOrderId}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedOrderId ? '#2E7D32' : '#8A7667',
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                    title="Copy Order Reference"
                  >
                    {copiedOrderId ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedOrderId ? 'Copied' : 'Copy'}</span>
                  </button>
                  <span style={{ fontSize: '12px', color: '#8A7667' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#8A7667' }}>{orderDate}</span>
                </div>
              </div>

              <button
                type="button"
                className="order-details-close-btn"
                onClick={() => setShowDetails(false)}
                aria-label="Close Order Details"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* SCROLLABLE CONTENT BODY */}
            <div className="order-details-body">
              {/* BLOCK 1: ITEMS IN PARCEL */}
              <div className="order-details-card-block">
                <div className="order-details-block-title">
                  <Package size={13} />
                  <span>Items in Your Parcel ({items.length})</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {items.map((item, idx) => {
                    const itemName = item.name || item.productName || 'Signature Unit';
                    const specs = [
                      item.selectedLength,
                      item.selectedLace,
                      item.selectedDensity
                    ].filter(Boolean).join(' • ');

                    const priceFormatted = typeof item.price === 'number'
                      ? `${currencySymbol}${item.price}`
                      : (item.price || `${currencySymbol}495`);

                    return (
                      <div key={item.id || idx} className="order-details-item-row">
                        <img 
                          src={item.image || '/images/house-of-nina-ribbon-mobile.webp'} 
                          alt={itemName}
                          className="order-details-item-img" 
                        />
                        <div className="order-details-item-info">
                          <h3 className="order-details-item-name">{itemName}</h3>
                          {specs && (
                            <p className="order-details-item-meta">{specs}</p>
                          )}
                          <div className="order-details-item-price-row">
                            <span style={{ color: '#8A7667' }}>Qty: {item.quantity || 1}</span>
                            <span style={{ fontWeight: 700, color: '#24170F' }}>{priceFormatted}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BLOCK 2: DELIVERY & ARRIVAL */}
              <div className="order-details-card-block">
                <div className="order-details-block-title">
                  <MapPin size={13} />
                  <span>Delivery & Arrival</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7667', fontWeight: 600 }}>
                      Recipient & Destination
                    </span>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', fontWeight: 600, color: '#24170F' }}>
                      {customerName}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#5A483C', lineHeight: 1.4 }}>
                      {customerAddress}
                    </p>
                    {customerEmail && (
                      <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#8A7667' }}>
                        {customerEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7667', fontWeight: 600 }}>
                      Dispatch Method & ETA
                    </span>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', fontWeight: 600, color: '#24170F' }}>
                      {deliveryMethod}
                    </p>
                    <div style={{ 
                      marginTop: '6px', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px',
                      background: 'rgba(212, 175, 55, 0.12)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(212, 175, 55, 0.28)'
                    }}>
                      <Calendar size={12} color="#947120" />
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#684E13' }}>
                        Est. Arrival: {estimatedArrival}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 3: PAYMENT & PRICE BREAKDOWN */}
              <div className="order-details-card-block">
                <div className="order-details-block-title">
                  <CreditCard size={13} />
                  <span>Payment & Financial Summary</span>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7667', fontWeight: 600 }}>
                    Payment Method
                  </span>
                  <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#24170F', fontWeight: 600 }}>
                    {paymentMethod}
                  </p>
                </div>

                <div className="order-details-summary-row">
                  <span>Subtotal</span>
                  <span>{currencySymbol}{subtotal}</span>
                </div>

                <div className="order-details-summary-row">
                  <span>Shipping & Handling</span>
                  <span style={{ color: '#2E7D32', fontWeight: 600 }}>{shippingCost}</span>
                </div>

                {discount && (
                  <div className="order-details-summary-row">
                    <span>Privilege Promo Discount</span>
                    <span style={{ color: '#C2410C', fontWeight: 600 }}>{discount}</span>
                  </div>
                )}

                <div className="order-details-summary-row order-details-summary-total">
                  <span>Total Paid</span>
                  <span>{currencySymbol}{total}</span>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER ACTIONS */}
            <div className="order-details-footer">
              <button
                type="button"
                className="order-details-print-btn"
                onClick={handlePrint}
              >
                <Printer size={14} />
                <span>Print Receipt</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="order-details-secondary-btn"
                  onClick={() => setShowDetails(false)}
                >
                  Back to Confirmation
                </button>

                <button
                  type="button"
                  className="order-details-primary-btn"
                  onClick={handleContinue}
                >
                  <span>Continue Shopping</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
