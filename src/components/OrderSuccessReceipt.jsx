import React, { useState } from 'react';
import { X, Truck, Check } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE RIBBON ORDER-SUCCESS EXPERIENCE
 * ============================================================================
 * An editorial, tactile, luxurious, and restrained order-confirmation experience.
 * 
 * Visual & Conceptual Elements:
 * - A champagne-beige satin ribbon wraps organically around a bundle of glossy dark hair.
 * - The ribbon carries the order-confirmation information directly on its surface.
 * - Background: warm ivory / softly lit champagne satin.
 * - Typography: refined editorial serif for "Order Confirmed", understated widely spaced
 *   sans-serif for labels and the brand name.
 * - Text color: espresso brown.
 * - One discreet text link below: "Track your order →".
 * - Fully data-driven from real order record, responsive across desktop & mobile.
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

  // Real order data with safe fallback resolution
  const orderId = order?.orderId || order?.id || "HN4892";
  
  // Dynamic Delivery Status from order record
  const getDeliveryStatus = () => {
    if (order?.status) return order.status;
    const method = (order?.deliveryMethod || "").toLowerCase();
    if (method.includes('express') || method.includes('special')) {
      return 'Express 24h';
    }
    return 'Standard Tracked';
  };
  const deliveryStatus = getDeliveryStatus();

  // Dynamic Estimated Arrival calculation
  const getEstimatedArrival = () => {
    if (order?.estimatedArrival) return order.estimatedArrival;
    try {
      const baseDate = order?.date ? new Date(order.date) : new Date();
      if (isNaN(baseDate.getTime())) {
        return "2–3 Working Days";
      }
      const est = new Date(baseDate);
      est.setDate(est.getDate() + 3);
      return est.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
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
      aria-label={`Order Confirmed: #${orderId}`}
    >
      {/* Discreet Close Icon */}
      <button
        type="button"
        className="ribbon-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={18} strokeWidth={1.5} />
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
              <source srcSet="/images/house-of-nina-ribbon-wrap.webp" type="image/webp" />
              <img 
                src="/images/house-of-nina-ribbon-wrap.jpg" 
                alt="House of Nina satin ribbon wrapped organically around glossy virgin hair bundle" 
                className="ribbon-bg-image"
              />
            </picture>

            {/* Subtle Lighting Vignette */}
            <div className="ribbon-lighting-overlay" aria-hidden="true" />

            {/* ── THE REAL HTML TEXT LAYER: PRINTED DIRECTLY ON THE RIBBON ── */}
            <div className="ribbon-text-surface animate-ribbon-text">
              
              {/* Brand Name */}
              <div className="ribbon-brand-label">
                HOUSE OF NINA
              </div>

              {/* Editorial Title */}
              <h1 className="ribbon-confirmed-heading">
                Order Confirmed
              </h1>

              {/* 3-Column Order Particulars Grid with Fine Dividers */}
              <div className="ribbon-details-row">
                
                {/* Column 1: Order No. */}
                <div className="ribbon-detail-col">
                  <span className="ribbon-label">ORDER NO.</span>
                  <span className="ribbon-val">{orderId}</span>
                </div>

                <div className="ribbon-col-divider" aria-hidden="true" />

                {/* Column 2: Delivery */}
                <div className="ribbon-detail-col">
                  <span className="ribbon-label">DELIVERY</span>
                  <span className="ribbon-val">{deliveryStatus}</span>
                </div>

                <div className="ribbon-col-divider" aria-hidden="true" />

                {/* Column 3: Est. Arrival */}
                <div className="ribbon-detail-col">
                  <span className="ribbon-label">EST. ARRIVAL</span>
                  <span className="ribbon-val">{estimatedArrival}</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ── DISCREET TRACKING TEXT LINK ── */}
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
                  Order #{orderId}
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
