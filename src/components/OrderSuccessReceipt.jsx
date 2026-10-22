import React, { useState } from 'react';
import { 
  X, Truck, ShoppingBag, Check, Copy, Printer, 
  ShieldCheck, Sparkles, Package, Clock, MapPin, CreditCard, ChevronRight
} from 'lucide-react';
import HouseOfNinaCrest from './HouseOfNinaCrest';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE ORDER CONFIRMATION & LUXURY PHYSICAL DOSSIER
 * ============================================================================
 * Photorealistic luxury certificate of purchase and physical receipt.
 * Features:
 * - 300gsm deckled heavy ivory archival paper styling with dual gold-foil border
 * - Raised House of Nina Royal Crest in antique gold (#C5A059)
 * - Security verification badge & one-click reference copy
 * - Live 4-stage studio preparation timeline
 * - Itemized luxury hair breakdown with real product imagery
 * - Financial statement with complimentary packaging recognition
 * - Authentic 3D embossed antique gold wax seal stamp
 * - Action toolbar: Live Tracking, Print / PDF Invoice, Return to Boutique
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen = true, 
  onClose, 
  onContinueShopping,
  onTrackOrder 
}) {
  const [copied, setCopied] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);

  if (!isOpen && !order) return null;

  // Realistic dynamic order structure for House of Nina luxury hair
  const orderData = order || {
    orderId: "HN4892",
    date: new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }) + ', ' + new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    customer: {
      fullName: "Amara Okafor",
      email: "amara.okafor@luxurymail.co.uk",
      phone: "+44 7776 759731",
      address: "14 Mayfair Place, Flat 3B",
      city: "London",
      state: "Greater London",
      postalCode: "W1J 8AJ"
    },
    items: [
      {
        id: "hn-01",
        name: "Raw Virgin Straight Hair Bundle",
        selectedLength: "26\"",
        selectedLace: "Invisible HD Lace",
        selectedDensity: "200% Density",
        quantity: 1,
        price: 240,
        currencySymbol: "£",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80&fm=webp"
      }
    ],
    deliveryMethod: "Royal Mail 48 Tracked (Complimentary)",
    paymentMethod: "Stripe Verified Card (•••• 4892)",
    subtotal: 240,
    shippingCost: 0,
    discount: 0,
    total: 240,
    currencySymbol: "£"
  };

  const curr = orderData.currencySymbol || "£";
  const formatMoney = (val) => {
    if (typeof val !== 'number') return `${curr}${val}`;
    return `${curr}${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText?.(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`receipt-screen-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      
      {/* Floating Close Button */}
      <button
        type="button"
        className="receipt-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={20} strokeWidth={2.2} />
      </button>

      <div 
        className="receipt-stage-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Order Confirmation Receipt ${orderData.orderId}`}
      >
        
        {/* ── THE LUXURY PHYSICAL PARCHMENT DOSSIER ── */}
        <div className="luxury-receipt-dossier animate-receipt-slide">
          
          {/* Dual Inset Gold Hairline Foil Frame */}
          <div className="receipt-gold-frame-border" aria-hidden="true" />
          
          {/* Header Status & Royal Crest */}
          <div className="receipt-header-section">
            <div className="receipt-verified-badge">
              <ShieldCheck size={13} color="#2E7D32" />
              <span>OFFICIAL ORDER CONFIRMATION</span>
            </div>

            <div className="receipt-crest-wrapper">
              <HouseOfNinaCrest size={48} color="#A37E3E" showWordmark={true} />
            </div>

            <span className="receipt-mayfair-subtitle">
              MAYFAIR, LONDON • 100% RAW VIRGIN HAIR
            </span>

            <h1 className="receipt-calligraphy-title">
              Thank You for Your Order
            </h1>

            <p className="receipt-curated-tagline">
              Your bespoke hair collection has been officially confirmed and registered for studio preparation.
            </p>
          </div>

          {/* Security Reference & Live Status Banner */}
          <div className="receipt-security-strip">
            <div className="security-strip-left">
              <div className="pulse-dot-container">
                <span className="pulse-dot-ping" />
                <span className="pulse-dot-core" />
              </div>
              <div className="order-id-group">
                <span className="order-id-label">ORDER REF:</span>
                <span className="order-id-number">{orderData.orderId}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="copy-reference-pill"
              onClick={handleCopyOrderId}
              title="Copy Order Reference"
            >
              {copied ? (
                <>
                  <Check size={12} color="#A37E3E" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy Reference</span>
                </>
              )}
            </button>
          </div>

          {/* Live Studio Preparation Timeline */}
          <div className="receipt-timeline-card">
            <div className="timeline-header-row">
              <span className="timeline-title">STUDIO PREPARATION STATUS</span>
              <span className="timeline-step-badge">STAGE 1 OF 4</span>
            </div>

            <div className="timeline-progress-track">
              {/* Step 1: Payment Verified */}
              <div className="timeline-step completed">
                <div className="step-marker">
                  <Check size={12} strokeWidth={2.8} />
                </div>
                <div className="step-info">
                  <strong>Authorized</strong>
                  <span>Payment verified</span>
                </div>
              </div>

              <div className="step-connector active" />

              {/* Step 2: Quality Inspection */}
              <div className="timeline-step in-progress">
                <div className="step-marker">
                  <Sparkles size={12} />
                </div>
                <div className="step-info">
                  <strong>Studio Inspection</strong>
                  <span>Hair steamed &amp; matched</span>
                </div>
              </div>

              <div className="step-connector" />

              {/* Step 3: Luxury Packaging */}
              <div className="timeline-step pending">
                <div className="step-marker">
                  <Package size={12} />
                </div>
                <div className="step-info">
                  <strong>Signature Box</strong>
                  <span>Satin preservation bag</span>
                </div>
              </div>

              <div className="step-connector" />

              {/* Step 4: Tracked Dispatch */}
              <div className="timeline-step pending">
                <div className="step-marker">
                  <Truck size={12} />
                </div>
                <div className="step-info">
                  <strong>Dispatch</strong>
                  <span>Royal Mail tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Order Particulars Grid (4 Micro-Cards) */}
          <div className="receipt-particulars-grid">
            <div className="particular-card">
              <span className="particular-label">DATE &amp; TIME</span>
              <strong className="particular-value">{orderData.date}</strong>
            </div>

            <div className="particular-card">
              <span className="particular-label">PAYMENT METHOD</span>
              <strong className="particular-value">{orderData.paymentMethod}</strong>
            </div>

            <div className="particular-card">
              <span className="particular-label">DELIVERY SPEED</span>
              <strong className="particular-value">{orderData.deliveryMethod}</strong>
            </div>

            <div className="particular-card">
              <span className="particular-label">DELIVERING TO</span>
              <strong className="particular-value">
                {orderData.customer?.fullName || "Valued Client"}
              </strong>
              <span className="particular-subtext">
                {orderData.customer?.address}, {orderData.customer?.city} {orderData.customer?.postalCode}
              </span>
            </div>
          </div>

          {/* Itemized Purchased Items */}
          <div className="receipt-items-section">
            <div className="items-section-header">
              <span>PURCHASED PIECES ({orderData.items?.length || 0})</span>
              <span>AMOUNT</span>
            </div>

            <div className="receipt-products-list">
              {orderData.items.map((item, index) => {
                const specs = [
                  item.selectedLength,
                  item.selectedLace,
                  item.selectedDensity
                ].filter(Boolean).join(" · ");

                return (
                  <div key={item.id || item.cartId || index} className="receipt-product-card">
                    <div className="product-card-thumb">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="product-card-img" 
                      />
                    </div>

                    <div className="product-card-body">
                      <h4 className="product-card-title">{item.name}</h4>
                      {specs && <div className="product-card-specs">{specs}</div>}
                      <span className="product-card-qty">Quantity: {item.quantity || 1}</span>
                    </div>

                    <div className="product-card-price">
                      {formatMoney(typeof item.price === 'number' ? item.price * (item.quantity || 1) : item.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="receipt-breakdown-card">
            <div className="breakdown-line">
              <span>Subtotal</span>
              <span>{formatMoney(orderData.subtotal)}</span>
            </div>

            <div className="breakdown-line">
              <span>Complimentary Luxury Velvet Box &amp; Preservation Bonnet</span>
              <span className="text-emerald">Included</span>
            </div>

            <div className="breakdown-line">
              <span>Delivery Fee</span>
              <span>{orderData.shippingCost === 0 ? 'Complimentary' : formatMoney(orderData.shippingCost)}</span>
            </div>

            {orderData.discount > 0 && (
              <div className="breakdown-line discount">
                <span>Discount Applied {orderData.promoCode ? `(${orderData.promoCode})` : ''}</span>
                <span>−{formatMoney(orderData.discount)}</span>
              </div>
            )}

            <div className="breakdown-total-line">
              <div>
                <span className="total-title">Total Authorized</span>
                <span className="total-subtitle">Includes UK VAT</span>
              </div>
              <span className="total-figure">{formatMoney(orderData.total)}</span>
            </div>
          </div>

          {/* Authentic Gold Wax Seal & London Calligraphy Signoff */}
          <div className="receipt-wax-signoff-section">
            <div className="signoff-left-calligraphy">
              <span className="signoff-with-love">With gratitude &amp; care,</span>
              <span className="signoff-brand-signature">House of Nina</span>
              <span className="signoff-location">Mayfair, London UK</span>
            </div>

            <div className="signoff-right-wax-seal" title="Authentic House of Nina Antique Gold Wax Seal">
              <img 
                src="/images/wax-seal.webp" 
                alt="House of Nina Antique Gold Wax Seal" 
                className="wax-seal-img" 
              />
            </div>
          </div>

        </div>

        {/* ── ACTION BUTTONS CLUSTER (OUTSIDE THE PARCHMENT) ── */}
        <div className="receipt-actions-toolbar">
          <div className="actions-button-row">
            <button
              type="button"
              className="btn-primary-editorial action-btn-pill"
              onClick={() => {
                if (onTrackOrder) onTrackOrder(orderData);
                else setTrackingModalOpen(true);
              }}
            >
              <Truck size={16} />
              <span>Track Order Live</span>
            </button>

            <button
              type="button"
              className="btn-secondary-editorial action-btn-pill"
              onClick={handlePrint}
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              className="btn-secondary-editorial action-btn-pill"
              onClick={() => {
                if (onContinueShopping) onContinueShopping();
                else onClose();
              }}
            >
              <ShoppingBag size={16} />
              <span>Continue Shopping</span>
            </button>
          </div>

          {orderData.customer?.email && (
            <p className="receipt-email-confirmation-note">
              A formal confirmation receipt and courier tracking link have been dispatched to{' '}
              <strong>{orderData.customer.email}</strong>.
            </p>
          )}
        </div>

      </div>

      {/* TRACK ORDER MODAL */}
      {trackingModalOpen && (
        <div className="tracking-modal-backdrop" onClick={() => setTrackingModalOpen(false)}>
          <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} color="#A37E3E" />
                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: "'Playfair Display', serif", color: 'var(--color-deep-espresso)' }}>
                  Tracking Order #{orderData.orderId}
                </h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                style={{ position: 'static', margin: 0, width: '32px', height: '32px' }}
                onClick={() => setTrackingModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="tracking-status-step">
              <span className="tracking-dot active" />
              <div>
                <strong>Order Verified &amp; Authorized</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Your House of Nina hair order is verified and entered the studio preparation queue.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '14px' }}>
              <span className="tracking-dot active" />
              <div>
                <strong>Studio Inspection &amp; Conditioning</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Raw virgin hair bundles selected, aligned, and steamed with organic oils.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '14px', opacity: 0.6 }}>
              <span className="tracking-dot" />
              <div>
                <strong>Royal Mail 48 Tracked Dispatch</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Tracking code will be activated as soon as collected by Royal Mail.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', marginTop: '20px', height: '46px', justifyContent: 'center' }}
              onClick={() => setTrackingModalOpen(false)}
            >
              Close Tracking Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
