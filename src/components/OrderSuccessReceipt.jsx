import React, { useState } from 'react';
import { X, Truck, ShoppingBag, CheckCircle, Copy, Check } from 'lucide-react';
import HouseOfNinaCrest from './HouseOfNinaCrest';

/**
 * ============================================================================
 * HOUSE OF NINA: ORDER SUCCESS SCREEN | DIGITAL LUXURY RECEIPT ON TABLE
 * ============================================================================
 * An actual beige and champagne-gold receipt printer machine sitting on a 
 * polished marble table, with the live dynamic House of Nina receipt emerging 
 * from the machine's gold slot hole in 3D perspective down onto the table.
 * 
 * Strictly "House of Nina" luxury hair brand — no atelier messaging.
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen, 
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
        price: 285000,
        currencySymbol: "₦",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80&fm=webp"
      },
      {
        id: "hn-04",
        name: "Silk Preservation Bonnet & Scarf",
        selectedLength: "Champagne Gold",
        selectedLace: "100% Mulberry Silk",
        quantity: 1,
        price: 25000,
        currencySymbol: "₦",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=300&q=80&fm=webp"
      }
    ],
    deliveryMethod: "Standard Delivery (2 - 4 working days)",
    paymentMethod: "Card (Verified)",
    subtotal: 310000,
    shippingCost: 0,
    discount: 0,
    total: 310000,
    currencySymbol: "₦"
  };

  const curr = orderData.currencySymbol || "£";
  const formatMoney = (val) => {
    if (typeof val !== 'number') return `${curr}${val}`;
    return `${curr}${val.toLocaleString()}`;
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText?.(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`receipt-screen-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      
      {/* Close Button */}
      <button
        type="button"
        className="receipt-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={20} strokeWidth={2} />
      </button>

      <div 
        className="receipt-stage-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Order Confirmation Receipt ${orderData.orderId}`}
      >
        
        {/* ── THE LUXURY TABLE SCENE: RECEIPT MACHINE SITTING ON THE TABLE ── */}
        <div className="table-printer-scene-wrapper">
          
          {/* Photorealistic Tabletop Scene with House of Nina Printer */}
          <div className="table-scene-container">
            <img 
              src="/images/house-of-nina-table-printer.webp" 
              alt="House of Nina Receipt Machine on Marble Table" 
              className="table-scene-image" 
            />

            {/* Slot Feeder Anchor: Anchored directly over the machine's gold slot opening */}
            <div className="printer-slot-feeder-anchor">
              
              {/* Dynamic Physical Receipt Paper emerging in 3D */}
              <div className="table-receipt-paper animate-receipt-slide">
                
                {/* Deep Slot Shadow at mouth where paper emerges */}
                <div className="receipt-mouth-shadow" aria-hidden="true" />
                
                {/* Paper roll specular curve highlight */}
                <div className="receipt-curve-specular" aria-hidden="true" />
                
                {/* Textured paper grain */}
                <div className="receipt-texture-grain" aria-hidden="true" />

                {/* 1. Logo at Top: House of Nina Royal Crest & Wordmark */}
                <div className="receipt-crest-header">
                  <HouseOfNinaCrest size={44} color="#A37E3E" showWordmark={true} />
                </div>

                {/* 2. "Thank You" in Elegant Script */}
                <div className="receipt-thank-you-script">
                  Thank You
                </div>

                {/* 3. "FOR SHOPPING WITH US" */}
                <div className="receipt-for-shopping-tag">
                  FOR SHOPPING WITH US
                </div>

                {/* Delicate Divider */}
                <div className="receipt-gold-divider" />

                {/* 4. Order Number & Order Date */}
                <div className="receipt-meta-container">
                  <div className="receipt-order-id-row">
                    <span className="order-id-text">Order #{orderData.orderId}</span>
                    <button 
                      type="button" 
                      className="copy-order-btn"
                      onClick={handleCopyOrderId}
                      title="Copy Order ID"
                    >
                      {copied ? <Check size={11} className="text-gold" /> : <Copy size={11} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="order-date-text">
                    {orderData.date}
                  </div>
                </div>

                {/* Delicate Divider */}
                <div className="receipt-gold-divider" />

                {/* 5. Purchased Items List */}
                <div className="receipt-items-container">
                  {orderData.items.map((item, index) => {
                    const specs = [
                      item.selectedLength,
                      item.selectedLace,
                      item.selectedDensity
                    ].filter(Boolean).join(" · ");

                    return (
                      <div key={item.id || item.cartId || index} className="receipt-product-row">
                        <div className="product-thumbnail-box">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="product-thumbnail-img" 
                          />
                        </div>

                        <div className="product-details-col">
                          <h4 className="product-name-title">{item.name}</h4>
                          {specs && <div className="product-specs-text">{specs}</div>}
                          <div className="product-qty-text">Qty: {item.quantity || 1}</div>
                        </div>

                        <div className="product-price-col">
                          {formatMoney(typeof item.price === 'number' ? item.price * (item.quantity || 1) : item.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delicate Divider */}
                <div className="receipt-gold-divider" />

                {/* 6. Subtotal, Shipping, and Final Total */}
                <div className="receipt-totals-container">
                  <div className="totals-line-row">
                    <span>Subtotal</span>
                    <span>{formatMoney(orderData.subtotal)}</span>
                  </div>

                  <div className="totals-line-row">
                    <span>Shipping</span>
                    <span>{orderData.shippingCost === 0 ? 'Free' : formatMoney(orderData.shippingCost)}</span>
                  </div>

                  {orderData.discount > 0 && (
                    <div className="totals-line-row discount-line">
                      <span>Discount</span>
                      <span>-{formatMoney(orderData.discount)}</span>
                    </div>
                  )}

                  <div className="totals-final-row">
                    <span className="total-label-text">Total</span>
                    <span className="total-amount-text">{formatMoney(orderData.total)}</span>
                  </div>
                </div>

                {/* 7. "With love, House of Nina" & Realistic Champagne-Gold Wax Seal */}
                <div className="receipt-signoff-container">
                  <div className="receipt-signoff-script">
                    <span className="with-love-script">With love,</span>
                    <span className="house-of-nina-script">House of Nina</span>
                  </div>

                  {/* Realistic Physical Champagne-Gold Wax Seal */}
                  <div className="physical-gold-wax-seal" title="Authentic House of Nina Wax Seal">
                    <img 
                      src="/images/wax-seal.webp" 
                      alt="House of Nina Antique Gold Wax Seal" 
                      className="wax-seal-graphic-img" 
                    />
                  </div>
                </div>

                {/* 8. Perforated / Serrated Lower Cut Edge */}
                <div className="receipt-serrated-edge-cut" aria-hidden="true" />
              </div>

              {/* Physical Gold Bezel Lip: sits right over the paper emergence line */}
              <div className="printer-gold-lip-overlay" aria-hidden="true">
                <img 
                  src="/images/printer-gold-lip.webp" 
                  alt="" 
                  className="gold-lip-overlay-img" 
                />
              </div>

            </div>
          </div>
        </div>

        {/* ── ACTIONS BENEATH THE RECEIPT (ON THE TABLE) ── */}
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
              <Truck size={17} />
              <span>Track Order</span>
            </button>

            <button
              type="button"
              className="btn-secondary-editorial receipt-action-btn"
              onClick={() => {
                if (onContinueShopping) onContinueShopping();
                else onClose();
              }}
            >
              <ShoppingBag size={17} />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Concise note about confirmation email */}
          {orderData.customer?.email && (
            <p className="receipt-email-note">
              An order confirmation receipt has been sent to{' '}
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
                <CheckCircle size={20} className="text-gold" />
                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: "'Playfair Display', serif" }}>
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
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-espresso-muted)' }}>
                  Your House of Nina hair order is being carefully prepared.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '14px', opacity: 0.6 }}>
              <span className="tracking-dot" />
              <div>
                <strong>Courier Dispatch</strong>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-espresso-muted)' }}>
                  Tracking details will update once collected by the courier.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
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
