import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Building2, Edit3, Lock, Truck, CheckCircle2 } from 'lucide-react';
import OrderSuccessReceipt from './OrderSuccessReceipt';

/**
 * ============================================================================
 * HOUSE OF NINA: STREAMLINED LUXURY CHECKOUT
 * ============================================================================
 * Clean, single-page luxury checkout flow with Express Pay at top,
 * streamlined contact/shipping inputs, interactive Stripe card selector,
 * dynamic cart promo discount sync, and sticky order summary.
 */
export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  checkoutData = {},
  onClearCart,
  onOpenCart 
}) {
  // Confirmation screen view (step 3 receipt)
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    paymentMethod: "card", // card | klarna | bank
    currency: "GBP", // GBP | NGN
    cardName: "Amara Okafor",
    cardNumber: "•••• •••• •••• 4892",
    cardExpiry: "08/28",
    cardCvc: "•••"
  });

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
  const rawDiscount = checkoutData.discountAmount || 0;
  const discount = rawDiscount * rate;

  const standardShippingCost = 0; // Complimentary standard delivery
  const expressShippingCost = isNgn ? 15000 : 8.5; // Royal Mail Special Delivery Guaranteed by 1pm
  const shippingCost = formData.deliveryMethod === 'express' ? expressShippingCost : standardShippingCost;

  const total = Math.max(0, subtotal - discount + shippingCost);

  const formatPrice = (val) => `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handlePlaceOrder = (e, expressMethod = null) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);

    const chosenPayment = expressMethod || formData.paymentMethod;

    setTimeout(() => {
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + 
        ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      let paymentLabel = 'Stripe Verified Card (•••• 4892)';
      if (chosenPayment === 'apple_pay') paymentLabel = 'Apple Pay (Biometric Authorized)';
      if (chosenPayment === 'google_pay') paymentLabel = 'Google Pay (1-Click Authorized)';
      if (chosenPayment === 'klarna') paymentLabel = 'Klarna (Pay in 3)';
      if (chosenPayment === 'bank') paymentLabel = 'Direct Studio Bank Wire';

      let deliveryLabel = 'Royal Mail 48 Tracked (Complimentary)';
      if (formData.deliveryMethod === 'express') deliveryLabel = 'Royal Mail Special Delivery Guaranteed (1pm)';

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
        deliveryMethod: deliveryLabel,
        paymentMethod: paymentLabel,
        subtotal,
        shippingCost,
        discount,
        promoCode: checkoutData.promoCode || null,
        orderNote: checkoutData.orderNote || null,
        total,
        currencySymbol
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      setIsConfirmed(true);

      if (onClearCart) onClearCart();
    }, 700);
  };

  return (
    <div className={`checkout-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className={`checkout-modal-dialog ${isConfirmed ? 'confirmation-view' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Secure Luxury Checkout"
        style={{ maxWidth: isConfirmed ? '680px' : '980px' }}
      >
        {/* Step 3: Order Confirmation Digital Receipt */}
        {isConfirmed ? (
          <OrderSuccessReceipt
            isOpen={true}
            order={confirmedOrder}
            onClose={onClose}
            onContinueShopping={() => {
              onClose();
              setIsConfirmed(false);
            }}
          />
        ) : (
          /* Streamlined Single-Page Luxury Checkout */
          <div className="checkout-content-container">
            {/* Header */}
            <div className="checkout-modal-header">
              <div className="checkout-header-branding" style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <span className="checkout-brand-title" style={{ fontFamily: 'var(--font-brand)', fontSize: '26px', color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap' }}>
                  House of Nina
                </span>
                <span style={{ fontSize: '11px', color: '#8C8074', marginLeft: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  • Secure
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#2E7D32', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <Lock size={12} />
                  <span>Encrypted</span>
                </div>

                <button 
                  type="button" 
                  className="modal-close-btn" 
                  onClick={onClose}
                  aria-label="Close checkout"
                  style={{ width: '32px', height: '32px', flexShrink: 0 }}
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="checkout-grid-layout">
              
              {/* Left Column: Form Details */}
              <form className="checkout-form-column" onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* 1-CLICK EXPRESS CHECKOUT ROW */}
                <div style={{
                  padding: '16px',
                  backgroundColor: '#FAF7F2',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  boxSizing: 'border-box'
                }}>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8C8074', marginBottom: '10px' }}>
                    Express 1-Click Checkout
                  </span>
                  <div className="checkout-row-2">
                    <button
                      type="button"
                      onClick={(e) => handlePlaceOrder(e, 'apple_pay')}
                      disabled={isSubmitting}
                      style={{
                        padding: '11px 16px',
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'opacity 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '15px' }}></span> Pay
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handlePlaceOrder(e, 'google_pay')}
                      disabled={isSubmitting}
                      style={{
                        padding: '11px 16px',
                        backgroundColor: '#FFFFFF',
                        color: '#3C4043',
                        border: '1px solid #DADCE0',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#4285F4' }}>G</span>Pay
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                    <span style={{ fontSize: '10.5px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      or continue below
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                  </div>
                </div>

                {/* Currency Switch Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '8px', boxSizing: 'border-box' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>
                    Billing Currency
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => handleChange('currency', 'GBP')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: formData.currency === 'GBP' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.currency === 'GBP' ? 'var(--color-deep-espresso)' : '#FFFFFF',
                        color: formData.currency === 'GBP' ? '#FFFFFF' : 'var(--color-deep-espresso)',
                        cursor: 'pointer'
                      }}
                    >
                      £ GBP (UK)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('currency', 'NGN')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: formData.currency === 'NGN' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.currency === 'NGN' ? 'var(--color-deep-espresso)' : '#FFFFFF',
                        color: formData.currency === 'NGN' ? '#FFFFFF' : 'var(--color-deep-espresso)',
                        cursor: 'pointer'
                      }}
                    >
                      ₦ NGN (Nigeria)
                    </button>
                  </div>
                </div>

                {/* 1. Contact Information Card */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    1. Contact Details
                  </h3>
                  
                  <div className="checkout-row-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@domain.com"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+44 7776 000000"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address Card */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    2. Shipping Address
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Recipient full name"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                        Street Address &amp; Suite / Apt
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="House number, street name, apartment"
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div className="checkout-row-3">
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          placeholder="City"
                          required
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                          County / State
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          placeholder="Greater London"
                          required
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                          Postcode
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => handleChange('postalCode', e.target.value)}
                          placeholder="W1J 8AJ"
                          required
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Method */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    3. Delivery Speed
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Standard Delivery */}
                    <label 
                      onClick={() => handleChange('deliveryMethod', 'standard')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid',
                        borderColor: formData.deliveryMethod === 'standard' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.deliveryMethod === 'standard' ? '#FAF8F5' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="deliveryMethod"
                          checked={formData.deliveryMethod === 'standard'}
                          onChange={() => {}}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                            Royal Mail 48 Tracked
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                            2 – 4 working days • Insured packaging
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2E7D32' }}>
                        Complimentary
                      </span>
                    </label>

                    {/* Special Delivery */}
                    <label 
                      onClick={() => handleChange('deliveryMethod', 'express')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid',
                        borderColor: formData.deliveryMethod === 'express' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.deliveryMethod === 'express' ? '#FAF8F5' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="deliveryMethod"
                          checked={formData.deliveryMethod === 'express'}
                          onChange={() => {}}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                            Royal Mail Special Delivery (Guaranteed 1pm)
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                            Next business day tracked &amp; signed
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>
                        {formatPrice(expressShippingCost)}
                      </span>
                    </label>
                  </div>
                </div>

                {/* 4. Payment Method */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    4. Payment Selection
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Option 1: Card via Stripe */}
                    <div style={{
                      borderRadius: '10px',
                      border: '1.5px solid',
                      borderColor: formData.paymentMethod === 'card' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                      backgroundColor: formData.paymentMethod === 'card' ? '#FAF8F5' : '#FFFFFF',
                      overflow: 'hidden'
                    }}>
                      <label 
                        onClick={() => handleChange('paymentMethod', 'card')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input 
                            type="radio" 
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'card'}
                            onChange={() => {}}
                          />
                          <div>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                              Credit or Debit Card
                            </strong>
                            <span style={{ fontSize: '11px', color: '#8C8074' }}>
                              Instant authorization via Stripe
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #D0D8E4', color: '#1A1F71' }}>VISA</span>
                          <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #E8DBD0', color: '#EB001B' }}>MC</span>
                          <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #C7DFEE', color: '#006FCF' }}>AMEX</span>
                        </div>
                      </label>

                      {formData.paymentMethod === 'card' && (
                        <div style={{ padding: '12px 14px 16px', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#FFFFFF' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '3px' }}>Cardholder Name</label>
                            <input
                              type="text"
                              value={formData.cardName}
                              onChange={(e) => handleChange('cardName', e.target.value)}
                              placeholder="Name on card"
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '3px' }}>Card Number</label>
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => handleChange('cardNumber', e.target.value)}
                              placeholder="•••• •••• •••• 4892"
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none' }}
                            />
                          </div>

                          <div className="checkout-row-2">
                            <div>
                              <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '3px' }}>Expiry</label>
                              <input
                                type="text"
                                value={formData.cardExpiry}
                                onChange={(e) => handleChange('cardExpiry', e.target.value)}
                                placeholder="MM/YY"
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '3px' }}>CVC</label>
                              <input
                                type="text"
                                value={formData.cardCvc}
                                onChange={(e) => handleChange('cardCvc', e.target.value)}
                                placeholder="•••"
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Option 2: Klarna */}
                    <label 
                      onClick={() => handleChange('paymentMethod', 'klarna')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid',
                        borderColor: formData.paymentMethod === 'klarna' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.paymentMethod === 'klarna' ? '#FAF8F5' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'klarna'}
                          onChange={() => {}}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                            Klarna (Pay in 3)
                          </strong>
                          <span style={{ fontSize: '11px', color: '#8C8074' }}>
                            3 payments of {currencySymbol}{(total / 3).toFixed(2)} • 0% APR interest
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FFB3C7', color: '#0A0A0A' }}>
                        Klarna.
                      </span>
                    </label>

                    {/* Option 3: Direct Bank Wire */}
                    <label 
                      onClick={() => handleChange('paymentMethod', 'bank')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid',
                        borderColor: formData.paymentMethod === 'bank' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                        backgroundColor: formData.paymentMethod === 'bank' ? '#FAF8F5' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={() => {}}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                            Direct Bank Wire
                          </strong>
                          <span style={{ fontSize: '11px', color: '#8C8074' }}>
                            Bank transfer details provided upon order completion
                          </span>
                        </div>
                      </div>
                      <Building2 size={16} color="#8C8074" />
                    </label>
                  </div>
                </div>
              </form>

              {/* Right Column: Order Summary Card (Sticky) */}
              <div className="checkout-summary-column">
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '22px',
                  position: 'sticky',
                  top: '20px',
                  boxShadow: '0 8px 24px rgba(36, 28, 25, 0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: 600,
                      margin: 0,
                      color: 'var(--color-deep-espresso)'
                    }}>
                      Order Summary ({cartItems.length})
                    </h3>
                    {onOpenCart && (
                      <button 
                        type="button" 
                        onClick={() => {
                          onClose();
                          onOpenCart();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '11.5px',
                          color: 'var(--color-gold-dark)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit3 size={12} /> Edit Bag
                      </button>
                    )}
                  </div>

                  {/* Items Scroll List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px', width: '100%', boxSizing: 'border-box' }}>
                    {cartItems.map((item, idx) => (
                      <div key={item.cartId || idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '48px', height: '58px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, backgroundColor: '#FAF7F2' }}
                        />
                        <div style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden' }}>
                          <h4 style={{ fontSize: '12.5px', margin: 0, fontWeight: 600, color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </h4>
                          <span style={{ fontSize: '11px', color: '#8C8074' }}>
                            Qty: {item.quantity || 1} • {item.selectedLength || 'Standard'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                          {formatPrice((item.price * (item.quantity || 1)) * rate)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', borderTop: '1px solid var(--color-border-light)', paddingTop: '14px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50', width: '100%', boxSizing: 'border-box' }}>
                      <span>Subtotal</span>
                      <strong style={{ color: 'var(--color-deep-espresso)' }}>{formatPrice(subtotal)}</strong>
                    </div>

                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#1E7E34', width: '100%', boxSizing: 'border-box' }}>
                        <span>Privilege Discount ({checkoutData.promoCode})</span>
                        <strong>−{formatPrice(discount)}</strong>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50', width: '100%', boxSizing: 'border-box' }}>
                      <span>Delivery</span>
                      <strong style={{ color: shippingCost === 0 ? '#1E7E34' : 'var(--color-deep-espresso)' }}>
                        {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                      </strong>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginTop: '10px',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--color-border)',
                      width: '100%',
                      boxSizing: 'border-box',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)', display: 'block' }}>
                          Total Due
                        </strong>
                        <span style={{ fontSize: '10.5px', color: '#8C8074' }}>
                          Includes UK VAT
                        </span>
                      </div>
                      <strong style={{ fontSize: '22px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                        {formatPrice(total)}
                      </strong>
                    </div>
                  </div>

                  {/* Main Authorize & Place Order CTA */}
                  <button
                    type="button"
                    className="btn-primary-editorial"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || cartItems.length === 0}
                    style={{
                      width: '100%',
                      marginTop: '18px',
                      padding: '14px 18px',
                      justifyContent: 'center',
                      fontSize: '13.5px',
                      fontWeight: 600
                    }}
                  >
                    {isSubmitting ? (
                      <span>Authorizing Secure Order...</span>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>Authorize &amp; Pay {formatPrice(total)}</span>
                      </>
                    )}
                  </button>

                  {/* Trust guarantees */}
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: '#FAF7F2',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#685C50'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#2E7D32" />
                      <span>100% Single-Donor Raw Hair Certified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={13} color="#2E7D32" />
                      <span>Encrypted Stripe Authorization</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={13} color="#2E7D32" />
                      <span>Royal Mail Tracked &amp; Insured Dispatch</span>
                    </div>
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
