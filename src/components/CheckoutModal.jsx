import React, { useState } from 'react';
import { 
  X, Check, ArrowRight, CreditCard, Building2, Edit3, Lock, Truck, 
  MapPin, Plus, Home, Briefcase, Gift, ChevronRight, AlertCircle, ArrowLeft
} from 'lucide-react';
import OrderSuccessReceipt from './OrderSuccessReceipt';

const DEFAULT_SAVED_ADDRESSES = [
  {
    id: 'home',
    label: 'Home',
    fullName: 'Amara Okafor',
    address: '14 Mayfair Place, Flat 3B',
    city: 'London',
    state: 'Greater London',
    postalCode: 'W1J 8AJ',
    phone: '+44 7776 759731',
    isDefault: true
  },
  {
    id: 'work',
    label: 'Work',
    fullName: 'Amara Okafor',
    address: "8 St James's Square, Suite 402",
    city: 'London',
    state: 'Greater London',
    postalCode: 'SW1Y 4JU',
    phone: '+44 7776 759731',
    isDefault: false
  },
  {
    id: 'gift',
    label: 'Gift',
    fullName: 'Zainab Okafor',
    address: '22 Victoria Avenue, Flat 2',
    city: 'Manchester',
    state: 'Greater Manchester',
    postalCode: 'M20 2EA',
    phone: '+44 7780 123456',
    isDefault: false
  }
];

/**
 * ============================================================================
 * HOUSE OF NINA: 2-STEP LUXURY CHECKOUT WITH SAVED ADDRESSES & STICKY HEADER
 * ============================================================================
 * Step 1: Delivery & Shipping (Saved Addresses: Home, Work, Gift, + Custom)
 * Step 2: Payment Selection & Review (Stripe Card, Klarna, Direct Bank Wire)
 * Step 3: Digital Order Receipt
 */
export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  checkoutData = {},
  onClearCart,
  onOpenCart 
}) {
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Delivery, 2: Payment
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState('');

  // Saved addresses state with localStorage persistence
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem('house_of_nina_saved_addresses');
      return stored ? JSON.parse(stored) : DEFAULT_SAVED_ADDRESSES;
    } catch {
      return DEFAULT_SAVED_ADDRESSES;
    }
  });

  const [selectedAddressId, setSelectedAddressId] = useState('home');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [saveAsLabel, setSaveAsLabel] = useState('Home');
  const [showSaveAddressPrompt, setShowSaveAddressPrompt] = useState(false);

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

  const standardInputStyle = {
    width: '100%',
    height: '42px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    color: 'var(--color-deep-espresso)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };

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
    if (stepError) setStepError('');
  };

  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setIsEditingAddress(false);
    setShowSaveAddressPrompt(false);
    setFormData(prev => ({
      ...prev,
      fullName: addr.fullName,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      phone: addr.phone || prev.phone
    }));
    if (stepError) setStepError('');
  };

  const handleSelectNewAddress = () => {
    setSelectedAddressId('new');
    setIsEditingAddress(true);
    setShowSaveAddressPrompt(true);
    setFormData(prev => ({
      ...prev,
      fullName: '',
      address: '',
      city: '',
      state: '',
      postalCode: ''
    }));
    if (stepError) setStepError('');
  };

  const handleSaveAddressToBook = () => {
    if (!formData.address || !formData.city || !formData.postalCode) return;
    const newId = `addr_${Date.now()}`;
    const newEntry = {
      id: newId,
      label: saveAsLabel || 'Other',
      fullName: formData.fullName || 'Client',
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      phone: formData.phone
    };
    const updated = [...savedAddresses, newEntry];
    setSavedAddresses(updated);
    setSelectedAddressId(newId);
    setShowSaveAddressPrompt(false);
    setIsEditingAddress(false);
    try {
      localStorage.setItem('house_of_nina_saved_addresses', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedToPayment = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setStepError('Please enter a valid email address.');
      return;
    }
    if (!formData.fullName?.trim() || !formData.address?.trim() || !formData.city?.trim() || !formData.postalCode?.trim()) {
      setStepError('Please complete your recipient name and delivery address.');
      return;
    }
    setStepError('');
    setCheckoutStep(2);
  };

  const handlePlaceOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);

    const chosenPayment = formData.paymentMethod;

    setTimeout(() => {
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + 
        ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      let paymentLabel = 'Stripe Verified Card (•••• 4892)';
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

  // Get active address label helper
  const activeSaved = savedAddresses.find(a => a.id === selectedAddressId);
  const currentAddressTag = activeSaved ? activeSaved.label : (selectedAddressId === 'new' ? 'New Address' : 'Custom');

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
          <>
            {/* STICKY TOP HEADER PINNED WITH CLOSE BUTTON & ICON STEP PROGRESS */}
            <div className="checkout-modal-header">
              <div className="checkout-header-branding" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: '1 1 0' }}>
                <span className="checkout-brand-title">
                  House of Nina
                </span>
              </div>

              {/* Luxury Compact Icon Step Indicator (Never Spills or Overflows) */}
              <div className="checkout-step-icons" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => setCheckoutStep(1)} 
                  className={`checkout-step-icon-btn ${checkoutStep === 1 ? 'active' : 'completed'}`}
                  title="Step 1: Delivery Details"
                  aria-label="Step 1: Delivery Details"
                >
                  {checkoutStep > 1 ? <Check size={13} strokeWidth={2.5} /> : <Truck size={14} />}
                  <span className="step-icon-label">Delivery</span>
                </button>

                <div className="checkout-step-icon-line" />

                <button 
                  type="button" 
                  onClick={handleProceedToPayment} 
                  className={`checkout-step-icon-btn ${checkoutStep === 2 ? 'active' : ''}`}
                  title="Step 2: Payment & Review"
                  aria-label="Step 2: Payment & Review"
                >
                  <CreditCard size={14} />
                  <span className="step-icon-label">Payment</span>
                </button>
              </div>

              {/* Close Button Pinned at Top Right — Perfectly Centered in its flex column and Never Cut Off */}
              <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button 
                  type="button" 
                  className="checkout-close-btn" 
                  onClick={onClose}
                  aria-label="Close checkout"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* SCROLLABLE CHECKOUT BODY */}
            <div className="checkout-content-container">
              <div className="checkout-grid-layout">
                
                {/* Left Column: Form Details based on Step */}
                <div className="checkout-form-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {stepError && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      backgroundColor: '#FDF2F2',
                      border: '1px solid #F8B4B4',
                      borderRadius: '10px',
                      color: '#9B1C1C',
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      <AlertCircle size={16} flexShrink={0} />
                      <span>{stepError}</span>
                    </div>
                  )}

                  {/* ══════════════════════════════════════════════════════════
                      STEP 1: DELIVERY & ADDRESS MANAGEMENT
                      ══════════════════════════════════════════════════════════ */}
                  {checkoutStep === 1 && (
                    <>
                      {/* 1. Contact Information Card */}
                      <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                        <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          1. Contact Information
                        </h3>
                        
                        <div className="checkout-row-2">
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="you@domain.com"
                              required
                              style={standardInputStyle}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              Phone Number (Delivery SMS)
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder="+44 7776 000000"
                              required
                              style={standardInputStyle}
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. Saved Addresses & Shipping Selection */}
                      <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '6px' }}>
                          <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            2. Delivery Address
                          </h3>
                          <span style={{ fontSize: '11px', color: '#8C8074' }}>
                            Saved Client Book
                          </span>
                        </div>

                        {/* Saved Address Chips */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {savedAddresses.map((addr) => {
                            const isSelected = selectedAddressId === addr.id;
                            let IconComponent = Home;
                            if (addr.label.toLowerCase().includes('work')) IconComponent = Briefcase;
                            if (addr.label.toLowerCase().includes('gift')) IconComponent = Gift;

                            return (
                              <button
                                key={addr.id}
                                type="button"
                                onClick={() => handleSelectSavedAddress(addr)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  fontSize: '11.5px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  border: '1.5px solid',
                                  borderColor: isSelected ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                                  backgroundColor: isSelected ? 'var(--color-deep-espresso)' : '#FAF8F5',
                                  color: isSelected ? '#FFFFFF' : 'var(--color-deep-espresso)',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <IconComponent size={12} />
                                <span>{addr.label}</span>
                                {isSelected && <Check size={11} />}
                              </button>
                            );
                          })}

                          <button
                            type="button"
                            onClick={handleSelectNewAddress}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: '1.5px dashed',
                              borderColor: selectedAddressId === 'new' ? 'var(--color-gold-dark)' : 'var(--color-border)',
                              backgroundColor: selectedAddressId === 'new' ? '#FAF5EB' : '#FFFFFF',
                              color: selectedAddressId === 'new' ? 'var(--color-gold-dark)' : '#685C50'
                            }}
                          >
                            <Plus size={12} />
                            <span>Add Address</span>
                          </button>
                        </div>

                        {/* Selected Address Display Card when NOT in manual edit mode */}
                        {!isEditingAddress && activeSaved && (
                          <div style={{
                            padding: '14px',
                            backgroundColor: '#FAF8F5',
                            borderRadius: '10px',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '10px'
                          }}>
                            <div>
                              <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>
                                {formData.fullName} • {activeSaved.label}
                              </strong>
                              <span style={{ fontSize: '12px', color: '#685C50', display: 'block' }}>
                                {formData.address}, {formData.city}, {formData.state} {formData.postalCode}
                              </span>
                              <span style={{ fontSize: '11.5px', color: '#8C8074', display: 'block', marginTop: '2px' }}>
                                Tel: {formData.phone}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsEditingAddress(true)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-gold-dark)',
                                fontSize: '11.5px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '4px 6px',
                                textDecoration: 'underline'
                              }}
                            >
                              Edit Address
                            </button>
                          </div>
                        )}

                        {/* Full Address Inputs (Shown if editing or new) */}
                        {(isEditingAddress || selectedAddressId === 'new') && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                Recipient Full Name
                              </label>
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="Recipient full name"
                                required
                                style={standardInputStyle}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                Street Address &amp; Suite / Apt
                              </label>
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="House number, street name, apartment"
                                required
                                style={standardInputStyle}
                              />
                            </div>

                            <div className="checkout-row-3">
                              <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                  City
                                </label>
                                <input
                                  type="text"
                                  value={formData.city}
                                  onChange={(e) => handleChange('city', e.target.value)}
                                  placeholder="City"
                                  required
                                  style={standardInputStyle}
                                />
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                  County / State
                                </label>
                                <input
                                  type="text"
                                  value={formData.state}
                                  onChange={(e) => handleChange('state', e.target.value)}
                                  placeholder="Greater London"
                                  required
                                  style={standardInputStyle}
                                />
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                  Postcode
                                </label>
                                <input
                                  type="text"
                                  value={formData.postalCode}
                                  onChange={(e) => handleChange('postalCode', e.target.value)}
                                  placeholder="W1J 8AJ"
                                  required
                                  style={standardInputStyle}
                                />
                              </div>
                            </div>

                            {/* Save to Client Book Prompt */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 12px',
                              backgroundColor: '#FAF8F5',
                              borderRadius: '8px',
                              border: '1px solid var(--color-border)',
                              flexWrap: 'wrap',
                              gap: '8px',
                              marginTop: '4px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11.5px', color: 'var(--color-deep-espresso)', fontWeight: 600 }}>
                                  Save to Book as:
                                </span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  {['Home', 'Work', 'Gift', 'Other'].map(lbl => (
                                    <button
                                      key={lbl}
                                      type="button"
                                      onClick={() => setSaveAsLabel(lbl)}
                                      style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        border: '1px solid',
                                        borderColor: saveAsLabel === lbl ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                                        backgroundColor: saveAsLabel === lbl ? 'var(--color-deep-espresso)' : '#FFFFFF',
                                        color: saveAsLabel === lbl ? '#FFFFFF' : '#685C50',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {lbl}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={handleSaveAddressToBook}
                                style={{
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  backgroundColor: 'var(--color-gold-dark)',
                                  color: '#FFFFFF',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                Save Address
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Delivery Method */}
                      <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
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
                              cursor: 'pointer',
                              boxSizing: 'border-box',
                              width: '100%',
                              minHeight: '58px',
                              gap: '12px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input 
                                type="radio" 
                                name="deliveryMethod"
                                checked={formData.deliveryMethod === 'standard'}
                                onChange={() => {}}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div style={{ minWidth: 0 }}>
                                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                  Royal Mail 48 Tracked
                                </strong>
                                <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                                  2 – 4 working days • Insured packaging
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2E7D32', flexShrink: 0 }}>
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
                              cursor: 'pointer',
                              boxSizing: 'border-box',
                              width: '100%',
                              minHeight: '58px',
                              gap: '12px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input 
                                type="radio" 
                                name="deliveryMethod"
                                checked={formData.deliveryMethod === 'express'}
                                onChange={() => {}}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div style={{ minWidth: 0 }}>
                                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                  Royal Mail Special Delivery (Guaranteed 1pm)
                                </strong>
                                <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                                  Next business day tracked &amp; signed
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                              {formatPrice(expressShippingCost)}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Continue to Payment Button */}
                      <button
                        type="button"
                        onClick={handleProceedToPayment}
                        className="btn-primary-editorial"
                        style={{
                          width: '100%',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '0 18px',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight size={16} />
                      </button>
                    </>
                  )}

                  {/* ══════════════════════════════════════════════════════════
                      STEP 2: PAYMENT METHOD & AUTHORIZATION
                      ══════════════════════════════════════════════════════════ */}
                  {checkoutStep === 2 && (
                    <>
                      {/* Active Delivery Summary Banner */}
                      <div style={{
                        padding: '12px 16px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{ minWidth: 0, overflow: 'hidden' }}>
                          <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Delivering To ({currentAddressTag})
                          </span>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {formData.fullName} • {formData.address}, {formData.city} {formData.postalCode}
                          </strong>
                          <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 500 }}>
                            {formData.deliveryMethod === 'express' ? 'Royal Mail Special Delivery (1pm)' : 'Royal Mail 48 Tracked (Complimentary)'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-gold-dark)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            flexShrink: 0
                          }}
                        >
                          Change
                        </button>
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

                      {/* Payment Options Selection */}
                      <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                        <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Payment Selection
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
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                                <input 
                                  type="radio" 
                                  name="paymentMethod"
                                  checked={formData.paymentMethod === 'card'}
                                  onChange={() => {}}
                                  style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
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

                              <div style={{ display: 'flex', gap: '4px', flexShrink: 0, alignItems: 'center' }}>
                                <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #D0D8E4', color: '#1A1F71' }}>VISA</span>
                                <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #E8DBD0', color: '#EB001B' }}>MC</span>
                                <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #C7DFEE', color: '#006FCF' }}>AMEX</span>
                              </div>
                            </label>

                            {formData.paymentMethod === 'card' && (
                              <div style={{ padding: '14px', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#FFFFFF' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Cardholder Name</label>
                                  <input
                                    type="text"
                                    value={formData.cardName}
                                    onChange={(e) => handleChange('cardName', e.target.value)}
                                    placeholder="Name on card"
                                    style={standardInputStyle}
                                  />
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Card Number</label>
                                  <input
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                                    placeholder="•••• •••• •••• 4892"
                                    style={standardInputStyle}
                                  />
                                </div>

                                <div className="checkout-row-2">
                                  <div>
                                    <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Expiry</label>
                                    <input
                                      type="text"
                                      value={formData.cardExpiry}
                                      onChange={(e) => handleChange('cardExpiry', e.target.value)}
                                      placeholder="MM/YY"
                                      style={standardInputStyle}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>CVC</label>
                                    <input
                                      type="text"
                                      value={formData.cardCvc}
                                      onChange={(e) => handleChange('cardCvc', e.target.value)}
                                      placeholder="•••"
                                      style={standardInputStyle}
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
                              cursor: 'pointer',
                              gap: '12px',
                              minHeight: '56px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input 
                                type="radio" 
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'klarna'}
                                onChange={() => {}}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
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
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FFB3C7', color: '#0A0A0A', flexShrink: 0 }}>
                              Klarna.
                            </span>
                          </label>

                          {/* Option 3: Direct Bank Wire with Live Banking Credentials */}
                          <div style={{
                            borderRadius: '10px',
                            border: '1.5px solid',
                            borderColor: formData.paymentMethod === 'bank' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                            backgroundColor: formData.paymentMethod === 'bank' ? '#FAF8F5' : '#FFFFFF',
                            overflow: 'hidden'
                          }}>
                            <label 
                              onClick={() => handleChange('paymentMethod', 'bank')}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                                <input 
                                  type="radio" 
                                  name="paymentMethod"
                                  checked={formData.paymentMethod === 'bank'}
                                  onChange={() => {}}
                                  style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                                />
                                <div>
                                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                    Direct Bank Wire
                                  </strong>
                                  <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                    Offline UK business bank transfer
                                  </span>
                                </div>
                              </div>
                              <Building2 size={16} color="#8C8074" style={{ flexShrink: 0 }} />
                            </label>

                            {formData.paymentMethod === 'bank' && (
                              <div style={{
                                padding: '14px',
                                borderTop: '1px solid var(--color-border-light)',
                                backgroundColor: '#FAF7F2',
                                fontSize: '12px',
                                color: '#685C50'
                              }}>
                                <span style={{ display: 'block', fontWeight: 700, color: 'var(--color-deep-espresso)', marginBottom: '8px' }}>
                                  House of Nina UK Business Bank Details:
                                </span>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                                  <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bank</span>
                                    <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)' }}>Barclays UK</strong>
                                  </div>
                                  <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sort Code</span>
                                    <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)', letterSpacing: '0.05em' }}>20-04-15</strong>
                                  </div>
                                  <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Account No.</span>
                                    <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)', letterSpacing: '0.05em' }}>83920194</strong>
                                  </div>
                                  <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Beneficiary</span>
                                    <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)' }}>House of Nina UK Ltd</strong>
                                  </div>
                                </div>
                                <span style={{ display: 'block', fontSize: '10.5px', color: '#8C8074', marginTop: '8px', fontStyle: 'italic' }}>
                                  *Use your order reference upon placement. Hair is dispatched upon transfer receipt.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Step 2 Action Buttons */}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          style={{
                            height: '48px',
                            padding: '0 18px',
                            backgroundColor: '#FFFFFF',
                            color: 'var(--color-deep-espresso)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            flexShrink: 0
                          }}
                        >
                          <ArrowLeft size={15} />
                          <span>Back to Delivery</span>
                        </button>

                        <button
                          type="button"
                          className="btn-primary-editorial"
                          onClick={handlePlaceOrder}
                          disabled={isSubmitting || cartItems.length === 0}
                          style={{
                            flex: 1,
                            height: '48px',
                            padding: '0 18px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
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
                      </div>
                    </>
                  )}

                </div>

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
                          <span>Discount ({checkoutData.promoCode})</span>
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

                    {/* Contextual Step CTA on Right Column */}
                    {checkoutStep === 1 ? (
                      <button
                        type="button"
                        className="btn-primary-editorial"
                        onClick={handleProceedToPayment}
                        style={{
                          width: '100%',
                          height: '48px',
                          marginTop: '18px',
                          padding: '0 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontSize: '13.5px',
                          fontWeight: 600
                        }}
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-primary-editorial"
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting || cartItems.length === 0}
                        style={{
                          width: '100%',
                          height: '48px',
                          marginTop: '18px',
                          padding: '0 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
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
                    )}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
