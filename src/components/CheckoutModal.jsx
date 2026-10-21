import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Building2, Banknote, Edit3 } from 'lucide-react';
import OrderSuccessReceipt from './OrderSuccessReceipt';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onClearCart,
  onOpenCart 
}) {
  // Steps: 1: Delivery, 2: Payment, 3: Confirmation
  const [activeStep, setActiveStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    email: "amara.okafor@luxurymail.co.uk",
    phone: "+44 7776 759731",
    countryCode: "+44",
    fullName: "Amara Okafor",
    address: "14 Mayfair Place, Flat 3B",
    city: "London",
    state: "Greater London",
    postalCode: "W1J 8AJ",
    deliveryMethod: "standard", // standard | express
    paymentMethod: "card", // card | bank | cod
    currency: "GBP" // GBP | NGN
  });

  // Confirmed Order Record
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Currency multiplier / symbol
  const isNgn = formData.currency === "NGN";
  const currencySymbol = isNgn ? "₦" : "£";
  const rate = isNgn ? 1800 : 1;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 200;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  const subtotal = rawSubtotal * rate;
  const standardShippingCost = isNgn ? 2500 : (subtotal > 200 ? 0 : 15);
  const expressShippingCost = isNgn ? 5000 : 30;
  const shippingCost = formData.deliveryMethod === 'express' ? expressShippingCost : standardShippingCost;
  const total = subtotal + shippingCost;

  const formatPrice = (val) => `${currencySymbol}${val.toLocaleString()}`;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate realistic order record
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + 
        ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      const newOrder = {
        orderId: `HN${randomOrderNum}`,
        date: dateStr,
        customer: {
          fullName: formData.fullName || "Valued Client",
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        },
        items: cartItems.map(item => ({
          ...item,
          price: (typeof item.price === 'number' ? item.price : 200) * rate,
          currencySymbol
        })),
        deliveryMethod: formData.deliveryMethod === 'express' ? 'Express Delivery' : 'Standard Delivery',
        paymentMethod: formData.paymentMethod === 'klarna' 
          ? 'Klarna (Pay in 3)' 
          : formData.paymentMethod === 'stripe' || formData.paymentMethod === 'card' 
            ? 'Stripe (Card / Apple Pay)' 
            : 'Bank Transfer (Direct Wire)',
        subtotal,
        shippingCost,
        discount: 0,
        total,
        currencySymbol
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      setActiveStep(3); // Switch to Confirmation Digital Receipt

      if (onClearCart) onClearCart();
    }, 800);
  };

  return (
    <div className={`checkout-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className={`checkout-modal-dialog ${activeStep === 3 ? 'confirmation-view' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        {/* Step 3: Order Confirmation Digital Receipt */}
        {activeStep === 3 ? (
          <OrderSuccessReceipt
            isOpen={true}
            order={confirmedOrder}
            onClose={onClose}
            onContinueShopping={() => {
              onClose();
              setActiveStep(1);
            }}
          />
        ) : (
          /* Step 1 & 2: Checkout Form & Summary */
          <div className="checkout-content-container">
            {/* Header */}
            <div className="checkout-modal-header">
              <div className="checkout-header-branding">
                <span className="checkout-brand-title">House of Nina</span>
              </div>

              {/* Step indicator */}
              <div className="checkout-step-progress">
                <div className={`step-node ${activeStep >= 1 ? 'active' : ''}`}>
                  <span className="step-circle">1</span>
                  <span className="step-label">Delivery</span>
                </div>
                <div className={`step-connector ${activeStep >= 2 ? 'active' : ''}`} />
                <div className={`step-node ${activeStep >= 2 ? 'active' : ''}`}>
                  <span className="step-circle">2</span>
                  <span className="step-label">Payment</span>
                </div>
                <div className="step-connector" />
                <div className="step-node">
                  <span className="step-circle">3</span>
                  <span className="step-label">Confirmation</span>
                </div>
              </div>

              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose}
                aria-label="Close checkout"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="checkout-grid-layout">
              {/* Left Column: Form Details */}
              <form className="checkout-form-column" onSubmit={handlePlaceOrder}>
                <h1 className="checkout-main-title">Checkout</h1>

                {/* Currency switch pill */}
                <div className="checkout-currency-pill-wrap">
                  <span className="currency-label">Display Currency:</span>
                  <div className="currency-pill-group">
                    <button
                      type="button"
                      className={`curr-btn ${formData.currency === 'GBP' ? 'active' : ''}`}
                      onClick={() => handleChange('currency', 'GBP')}
                    >
                      £ GBP (UK)
                    </button>
                    <button
                      type="button"
                      className={`curr-btn ${formData.currency === 'NGN' ? 'active' : ''}`}
                      onClick={() => handleChange('currency', 'NGN')}
                    >
                      ₦ NGN (Nigeria)
                    </button>
                  </div>
                </div>

                {/* 1. Contact Information */}
                <div className="checkout-form-card">
                  <h3 className="checkout-section-subtitle">Contact Information</h3>
                  
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="chk-email">Email</label>
                      <input
                        id="chk-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@domain.com"
                        required
                        className="checkout-input"
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="chk-phone">Phone number</label>
                      <div className="phone-input-wrap">
                        <span className="country-flag-badge">
                          {isNgn ? '🇳🇬 +234' : '🇬🇧 +44'}
                        </span>
                        <input
                          id="chk-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="Phone number"
                          required
                          className="checkout-input phone-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="checkout-form-card">
                  <h3 className="checkout-section-subtitle">Shipping Address</h3>

                  <div className="form-group">
                    <label htmlFor="chk-name">Full name</label>
                    <input
                      id="chk-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="First and last name"
                      required
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="chk-addr">Address</label>
                    <input
                      id="chk-addr"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Street address, apartment, suite"
                      required
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="chk-city">City</label>
                      <input
                        id="chk-city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="City"
                        required
                        className="checkout-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="chk-state">State / County</label>
                      <input
                        id="chk-state"
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        placeholder="State"
                        required
                        className="checkout-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="chk-zip">Postal code (optional)</label>
                    <input
                      id="chk-zip"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      placeholder="Postal code"
                      className="checkout-input"
                    />
                  </div>
                </div>

                {/* 3. Delivery Method */}
                <div className="checkout-form-card">
                  <h3 className="checkout-section-subtitle">Delivery Method</h3>

                  <label 
                    className={`delivery-option-tile ${formData.deliveryMethod === 'standard' ? 'selected' : ''}`}
                    onClick={() => handleChange('deliveryMethod', 'standard')}
                  >
                    <input 
                      type="radio" 
                      name="delivery" 
                      checked={formData.deliveryMethod === 'standard'} 
                      onChange={() => {}} 
                    />
                    <div className="delivery-tile-info">
                      <strong>Standard Delivery</strong>
                      <span>2 – 4 working days</span>
                    </div>
                    <span className="delivery-tile-price">
                      {standardShippingCost === 0 ? "Free" : formatPrice(standardShippingCost)}
                    </span>
                  </label>

                  <label 
                    className={`delivery-option-tile ${formData.deliveryMethod === 'express' ? 'selected' : ''}`}
                    onClick={() => handleChange('deliveryMethod', 'express')}
                  >
                    <input 
                      type="radio" 
                      name="delivery" 
                      checked={formData.deliveryMethod === 'express'} 
                      onChange={() => {}} 
                    />
                    <div className="delivery-tile-info">
                      <strong>Express Delivery</strong>
                      <span>1 – 2 working days</span>
                    </div>
                    <span className="delivery-tile-price">{formatPrice(expressShippingCost)}</span>
                  </label>
                </div>

                {/* 4. Payment Method */}
                <div className="checkout-form-card">
                  <h3 className="checkout-section-subtitle">Payment Method</h3>

                  {/* Option 1: Stripe (Card & Digital Wallets) */}
                  <label 
                    className={`payment-option-tile ${formData.paymentMethod === 'stripe' || formData.paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => handleChange('paymentMethod', 'stripe')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'stripe' || formData.paymentMethod === 'card'} 
                        onChange={() => {}} 
                      />
                      <div className="payment-tile-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CreditCard size={18} className="payment-icon" />
                          <strong>Cards &amp; Digital Wallets</strong>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
                          Powered by Stripe • Instant &amp; Secure
                        </span>
                      </div>
                    </div>
                    <div className="payment-brand-logos">
                      <span className="pay-chip visa">VISA</span>
                      <span className="pay-chip mc">MC</span>
                      <span className="pay-chip amex">AMEX</span>
                      <span className="pay-chip stripe">Stripe</span>
                    </div>
                  </label>

                  {/* Option 2: Klarna (Pay in 3) */}
                  <label 
                    className={`payment-option-tile ${formData.paymentMethod === 'klarna' ? 'selected' : ''}`}
                    onClick={() => handleChange('paymentMethod', 'klarna')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'klarna'} 
                        onChange={() => {}} 
                      />
                      <div className="payment-tile-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="pay-chip klarna-badge">Klarna.</span>
                          <strong>Pay in 3 or Pay in 30 Days</strong>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
                          3 payments of {currencySymbol}{(total / 3).toFixed(2)} • 0% APR interest
                        </span>
                      </div>
                    </div>
                    <div className="payment-brand-logos">
                      <span className="pay-chip klarna">Klarna</span>
                    </div>
                  </label>

                  {/* Option 3: Bank Transfer */}
                  <label 
                    className={`payment-option-tile ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}
                    onClick={() => handleChange('paymentMethod', 'bank')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'bank'} 
                        onChange={() => {}} 
                      />
                      <div className="payment-tile-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Building2 size={18} className="payment-icon" />
                          <strong>Bank Transfer</strong>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
                          Atelier invoice &amp; direct account transfer
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </form>

              {/* Right Column: Order Summary Card */}
              <div className="checkout-summary-column">
                <div className="checkout-summary-card">
                  <div className="summary-header-row">
                    <h3 className="summary-title">Order Summary</h3>
                    {onOpenCart && (
                      <button 
                        type="button" 
                        className="summary-edit-btn"
                        onClick={() => {
                          onClose();
                          onOpenCart();
                        }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="summary-items-list">
                    {cartItems.map((item, idx) => (
                      <div key={item.cartId || idx} className="summary-item-tile">
                        <img src={item.image} alt={item.name} className="summary-item-img" />
                        <div className="summary-item-info">
                          <h4 className="summary-item-title">{item.name}</h4>
                          <span className="summary-item-spec">
                            {[item.selectedLength, item.selectedLace].filter(Boolean).join(" · ")}
                          </span>
                          <span className="summary-item-qty">Qty: {item.quantity || 1}</span>
                        </div>
                        <span className="summary-item-price">
                          {formatPrice((typeof item.price === 'number' ? item.price : 200) * rate * (item.quantity || 1))}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="summary-calc-rows">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <strong>{formatPrice(subtotal)}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <strong>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</strong>
                    </div>
                    <div className="summary-row total-row">
                      <span>Total</span>
                      <strong className="summary-total-amt">{formatPrice(total)}</strong>
                    </div>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    type="button"
                    className="btn-primary-editorial btn-place-order"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    <span>{isSubmitting ? "Generating Receipt..." : "Place Order"}</span>
                    <ArrowRight size={17} />
                  </button>

                  <div className="checkout-security-guarantee">
                    <ShieldCheck size={16} /> 256-Bit Studio Encrypted Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
