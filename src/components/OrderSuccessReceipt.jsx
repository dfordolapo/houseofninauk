import React, { useState } from 'react';
import { 
  X, Truck, ShoppingBag, Check, Copy, Printer, 
  ChevronRight, ShieldCheck
} from 'lucide-react';
import HouseOfNinaCrest from './HouseOfNinaCrest';

/**
 * ============================================================================
 * HOUSE OF NINA: LUXURY RECEIPT GENERATOR & THERMAL PRINTER
 * ============================================================================
 * Clean, realistic receipt machine and physical receipt inspired by the brand
 * reference:
 * - Sleek champagne-gold brushed thermal receipt machine head at top
 * - Authentic receipt paper rolling smoothly out from the gold slot
 * - No cluttered room backgrounds or distracting scenery
 * - House of Nina Crest, "Thank You", order particulars, itemized breakdown
 * - "With love, House of Nina" script + 3D antique gold wax seal stamp
 * - Physical serrated zig-zag cut edge at the bottom
 * - Track Order Live, Print/PDF, and Continue Shopping
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
    orderId: "HN2487",
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
      postalCode: "W1J 8AJ"
    },
    items: [
      {
        id: "hn-01",
        name: "HD Lace Body Wave Wig",
        selectedLength: "24\"",
        selectedLace: "Invisible HD Lace",
        selectedDensity: "200% Density",
        quantity: 1,
        price: 280,
        currencySymbol: "£",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80&fm=webp"
      },
      {
        id: "hn-04",
        name: "Silk Preservation Bonnet & Scarf",
        selectedLength: "Champagne Gold",
        selectedLace: "100% Mulberry Silk",
        quantity: 1,
        price: 35,
        currencySymbol: "£",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&q=80&fm=webp"
      }
    ],
    deliveryMethod: "Royal Mail 48 Tracked (Complimentary)",
    paymentMethod: "Stripe Verified Card (•••• 2487)",
    subtotal: 315,
    shippingCost: 0,
    discount: 0,
    total: 315,
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
        
        {/* ── RECEIPT GENERATOR WRAPPER (No background room, just machine & receipt) ── */}
        <div className="receipt-generator-assembly">
          
          {/* 1. Sleek Thermal Receipt Machine Head */}
          <div className="receipt-printer-head">
            <div className="printer-head-housing">
              
              {/* Metallic top bevel & status bar */}
              <div className="printer-head-top-bar">
                <div className="printer-indicator-group">
                  <span className="printer-led-dot ready" />
                  <span className="printer-led-label">PRINT READY</span>
                </div>
                <div className="printer-subtle-model">THERMAL REGISTER • MAYFAIR</div>
              </div>

              {/* The Gleaming Gold Slot Feeder Mouth */}
              <div className="printer-slot-bezel">
                <div className="printer-slot-mouth">
                  {/* Metal serrated cutter teeth inside slot */}
                  <div className="printer-slot-teeth" />
                </div>
              </div>

            </div>
          </div>

          {/* 2. Physical Receipt Paper emerging smoothly from the gold slot */}
          <div className="receipt-paper-roll animate-receipt-slide">
            
            {/* Top feeder shadow at mouth */}
            <div className="receipt-mouth-drop-shadow" aria-hidden="true" />

            {/* Paper Texture Grain */}
            <div className="receipt-paper-surface">
              
              {/* Brand Crest */}
              <div className="receipt-brand-header">
                <HouseOfNinaCrest size={46} color="#A37E3E" showWordmark={true} />
              </div>

              {/* Elegant Script "Thank You" */}
              <h1 className="receipt-thank-you-title">
                Thank You
              </h1>

              {/* For Shopping With Us Tag */}
              <span className="receipt-for-shopping-sub">
                FOR SHOPPING WITH US
              </span>

              {/* Gold Hairline Divider */}
              <div className="receipt-gold-divider-dash" />

              {/* Order Meta: ID & Date */}
              <div className="receipt-order-meta-box">
                <div className="receipt-meta-id-row">
                  <span className="receipt-order-num">Order #{orderData.orderId}</span>
                  <button 
                    type="button" 
                    className="receipt-copy-id-btn"
                    onClick={handleCopyOrderId}
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <>
                        <Check size={11} color="#A37E3E" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="receipt-date-string">{orderData.date}</div>
              </div>

              {/* Gold Hairline Divider */}
              <div className="receipt-gold-divider-dash" />

              {/* Purchased Items Breakdown */}
              <div className="receipt-items-breakdown">
                {orderData.items.map((item, index) => {
                  const specs = [
                    item.selectedLength,
                    item.selectedLace,
                    item.selectedDensity
                  ].filter(Boolean).join(" · ");

                  return (
                    <div key={item.id || item.cartId || index} className="receipt-product-entry">
                      <div className="receipt-product-thumb">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="receipt-product-img" 
                        />
                      </div>

                      <div className="receipt-product-info">
                        <h4 className="receipt-product-name">{item.name}</h4>
                        {specs && <div className="receipt-product-specs">{specs}</div>}
                        <span className="receipt-product-qty">Qty: {item.quantity || 1}</span>
                      </div>

                      <div className="receipt-product-price">
                        {formatMoney(typeof item.price === 'number' ? item.price * (item.quantity || 1) : item.price)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gold Hairline Divider */}
              <div className="receipt-gold-divider-dash" />

              {/* Financial Totals */}
              <div className="receipt-financial-totals">
                <div className="receipt-total-line">
                  <span>Subtotal</span>
                  <span>{formatMoney(orderData.subtotal)}</span>
                </div>

                <div className="receipt-total-line">
                  <span>Shipping</span>
                  <span>{orderData.shippingCost === 0 ? 'Complimentary' : formatMoney(orderData.shippingCost)}</span>
                </div>

                {orderData.discount > 0 && (
                  <div className="receipt-total-line discount">
                    <span>Discount</span>
                    <span>−{formatMoney(orderData.discount)}</span>
                  </div>
                )}

                <div className="receipt-grand-total-line">
                  <span className="grand-total-label">Total</span>
                  <span className="grand-total-figure">{formatMoney(orderData.total)}</span>
                </div>
              </div>

              {/* "With love, House of Nina" & Authentic Antique Gold Wax Seal */}
              <div className="receipt-signoff-row">
                <div className="receipt-signoff-calligraphy">
                  <span className="signoff-with-love-script">With love,</span>
                  <span className="signoff-house-script">House of Nina</span>
                </div>

                {/* 3D Wax Seal Stamp (Antique Gold) */}
                <div className="receipt-wax-seal-badge" title="Official House of Nina Antique Gold Wax Seal">
                  <img 
                    src="/images/wax-seal.webp" 
                    alt="House of Nina Antique Gold Wax Seal" 
                    className="wax-seal-stamp-img" 
                  />
                </div>
              </div>

              {/* Serrated Zig-Zag Cut Edge at Bottom of Paper */}
              <div className="receipt-serrated-zigzag-edge" aria-hidden="true" />

            </div>

          </div>

          {/* 3. Actions Cluster Beneath the Receipt */}
          <div className="receipt-actions-cluster">
            <div className="receipt-buttons-row">
              <button
                type="button"
                className="btn-primary-editorial receipt-action-btn"
                onClick={() => {
                  if (onTrackOrder) onTrackOrder(orderData);
                  else setTrackingModalOpen(true);
                }}
              >
                <Truck size={16} />
                <span>Track Order</span>
              </button>

              <button
                type="button"
                className="btn-secondary-editorial receipt-action-btn"
                onClick={handlePrint}
              >
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                className="btn-secondary-editorial receipt-action-btn"
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
              <p className="receipt-confirmation-email-text">
                An order confirmation receipt has been sent to{' '}
                <strong>{orderData.customer.email}</strong>.
              </p>
            )}
          </div>

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
                <strong>Order Verified</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Your House of Nina hair order is being carefully prepared.
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
                  Tracking details will update once collected by Royal Mail.
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
