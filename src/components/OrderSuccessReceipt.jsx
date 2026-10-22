import React, { useState } from 'react';
import { X, Truck, Check } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE RIBBON ORDER-SUCCESS EXPERIENCE
 * ============================================================================
 * High-fashion, editorial, tactile, and restrained order-confirmation experience.
 * Recreated with exact precision from the client reference image:
 * - Full-screen immersive warm champagne satin background.
 * - Organic champagne-beige satin ribbon wrapping around glossy dark hair.
 * - Dynamic HTML typography rendered directly on the upper and lower ribbon folds.
 * - Upper Band: "HOUSE OF NINA", hairline dash, "Order Confirmed".
 * - Lower Band: 3-column particulars (Order No, Delivery, Est. Arrival).
 * - Discreet text link: "Track your order →".
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen = true, 
  onClose, 
  onContinueShopping,
  onTrackOrder 
}) {
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);

  if (!isOpen && !order) return null;

  // Real order identifier with formatting
  const rawId = order?.orderId || order?.id || "HN-48291";
  const formattedOrderId = rawId.startsWith('HN') && !rawId.includes('-')
    ? rawId.replace('HN', 'HN-')
    : rawId;

  // Dynamic Delivery Status from order record
  const getDeliveryStatus = () => {
    if (order?.status) return order.status;
    const method = (order?.deliveryMethod || "").toLowerCase();
    if (method.includes('express') || method.includes('special')) {
      return 'Express Dispatch';
    }
    return 'On its way soon';
  };
  const deliveryStatus = getDeliveryStatus();

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

  return (
    <div 
      className={`ribbon-success-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Order Confirmed: ${formattedOrderId}`}
    >
      {/* Discreet Close Button */}
      <button
        type="button"
        className="ribbon-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      <div 
        className="ribbon-success-stage"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── THE VISUAL COMPOSITION: RIBBON WRAPPED AROUND GLOSSY HAIR ── */}
        <div className="ribbon-composition-frame">
          
          {/* Hair & Satin Ribbon Image Base */}
          <div className="ribbon-image-wrapper">
            <picture>
              <source srcSet="/images/house-of-nina-ribbon-reference-blank.webp" type="image/webp" />
              <img 
                src="/images/house-of-nina-ribbon-reference-blank.jpg" 
                alt="House of Nina champagne satin ribbon wrapped around glossy virgin hair bundle" 
                className="ribbon-bg-image"
              />
            </picture>

            {/* ── TIER 1: UPPER RIBBON FOLD (Brand & Order Confirmed) ── */}
            <div className="ribbon-tier-upper animate-ribbon-text">
              <div className="ribbon-brand-label">
                HOUSE OF NINA
              </div>
              <div className="ribbon-hairline-dash" aria-hidden="true" />
              <h1 className="ribbon-confirmed-heading">
                Order Confirmed
              </h1>
            </div>

            {/* ── TIER 2: LOWER RIBBON FOLD (3 Columns: Order No, Delivery, Est. Arrival) ── */}
            <div className="ribbon-tier-lower animate-ribbon-text">
              <div className="ribbon-columns-grid">
                
                {/* Column 1: Order No. */}
                <div className="ribbon-column">
                  <span className="ribbon-col-val">{formattedOrderId}</span>
                  <span className="ribbon-col-lbl">ORDER NO.</span>
                </div>

                <div className="ribbon-vertical-divider" aria-hidden="true" />

                {/* Column 2: Delivery */}
                <div className="ribbon-column">
                  <span className="ribbon-col-val">{deliveryStatus}</span>
                  <span className="ribbon-col-lbl">DELIVERY</span>
                </div>

                <div className="ribbon-vertical-divider" aria-hidden="true" />

                {/* Column 3: Est. Arrival */}
                <div className="ribbon-column">
                  <span className="ribbon-col-val">{estimatedArrival}</span>
                  <span className="ribbon-col-lbl">EST. ARRIVAL</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ── DISCREET TRACKING ACTION LINK ── */}
        <div className="ribbon-footer-action">
          <button
            type="button"
            className="ribbon-track-text-link"
            onClick={() => {
              if (onTrackOrder) onTrackOrder(order);
              else setTrackingModalOpen(true);
            }}
          >
            Track your order →
          </button>
        </div>

      </div>

      {/* TRACK ORDER MODAL */}
      {trackingModalOpen && (
        <div className="tracking-modal-backdrop" onClick={() => setTrackingModalOpen(false)}>
          <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="#4A3427" />
                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: "'Playfair Display', serif", color: '#241913' }}>
                  Order #{formattedOrderId}
                </h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                style={{ position: 'static', margin: 0, width: '30px', height: '30px' }}
                onClick={() => setTrackingModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="tracking-status-step">
              <span className="tracking-dot active" />
              <div>
                <strong style={{ color: '#241913' }}>Order Confirmed &amp; Authorized</strong>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#685C50' }}>
                  Your House of Nina order has been registered for studio quality inspection.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '16px' }}>
              <span className="tracking-dot active" />
              <div>
                <strong style={{ color: '#241913' }}>Studio Steaming &amp; Packaging</strong>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#685C50' }}>
                  Raw virgin hair bundles selected, aligned, and prepared in signature packaging.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '16px', opacity: 0.6 }}>
              <span className="tracking-dot" />
              <div>
                <strong style={{ color: '#241913' }}>Royal Mail 48 Tracked Dispatch</strong>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#685C50' }}>
                  Tracking reference will activate upon collection from our Mayfair studio.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', marginTop: '22px', height: '44px', justifyContent: 'center' }}
              onClick={() => setTrackingModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
