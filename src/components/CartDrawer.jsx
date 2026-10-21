import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus, 
  Tag 
} from 'lucide-react';
import { BRAND_INFO } from '../data/wigData';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onRemoveItem, 
  onUpdateQuantity,
  onMoveToWishlist,
  onClearCart, 
  onProceedToCheckout,
  onOpenLegal 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showOrderNote, setShowOrderNote] = useState(false);
  const [orderNote, setOrderNote] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.10) : 0;
  const remainingForFreeShipping = Math.max(0, BRAND_INFO.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / BRAND_INFO.freeShippingThreshold) * 100));
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'HOUSE10' || code === 'NINA10' || code === 'WELCOME10') {
      setPromoApplied(true);
      setPromoError('');
    } else if (code) {
      setPromoError('Invalid privilege code. Try "HOUSE10".');
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoCode('');
    setPromoError('');
  };

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Boutique Shopping Bag"
      >
        {/* STICKY HEADER */}
        <div className="drawer-sticky-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-sand-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-deep-espresso)'
            }}>
              <ShoppingBag size={17} />
            </div>
            <div>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '19px', 
                margin: 0, 
                fontWeight: 600,
                color: 'var(--color-deep-espresso)',
                lineHeight: 1.2
              }}>
                Shopping Bag
              </h2>
              <span style={{ fontSize: '11px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                {cartItems.length} {cartItems.length === 1 ? 'Curated Unit' : 'Curated Units'}
              </span>
            </div>
          </div>

          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* FREE UK DELIVERY TIER PROGRESS (EDITORIAL LUXURY, NO EMOJIS, NO SPARKLES) */}
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--color-border-light)',
          marginTop: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>
              {remainingForFreeShipping === 0 
                ? 'Free Shipping Unlocked' 
                : `Add £${remainingForFreeShipping.toFixed(0)} for Free Shipping`}
            </span>
            <span style={{ fontSize: '11px', color: '#8C8074', fontWeight: 600 }}>
              {freeShippingProgress}%
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '4px',
            borderRadius: '4px',
            backgroundColor: '#EAE3D9',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${freeShippingProgress}%`,
              backgroundColor: remainingForFreeShipping === 0 ? '#2E7D32' : 'var(--color-dusty-rose)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* CART ITEMS BODY */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 0', WebkitOverflowScrolling: 'touch' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '52px 16px', color: 'var(--color-espresso-muted)' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(235, 219, 197, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--color-deep-espresso)'
              }}>
                <ShoppingBag size={28} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                Your bag is empty
              </h3>
              <p style={{ fontSize: '12.5px', color: '#7A6E62', maxWidth: '280px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                Explore our raw single-donor hair units and 100% pure silk styling accessories.
              </p>
              <button 
                type="button" 
                className="btn-primary-editorial" 
                style={{ fontSize: '12.5px', padding: '10px 22px' }}
                onClick={() => {
                  onClose();
                  const featuredSection = document.getElementById('featured-products');
                  if (featuredSection) featuredSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item, idx) => {
                const qty = item.quantity || 1;
                const itemTotal = item.price * qty;

                return (
                  <div 
                    key={item.cartId || idx} 
                    style={{ 
                      display: 'flex', 
                      gap: '12px', 
                      padding: '12px', 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '14px',
                      border: '1px solid var(--color-border-light)',
                      position: 'relative'
                    }}
                  >
                    {/* Portrait Thumbnail */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: '74px', 
                        height: '92px', 
                        objectFit: 'cover', 
                        borderRadius: '10px', 
                        flexShrink: 0,
                        backgroundColor: '#F5EFE6'
                      }}
                    />

                    {/* Details Column */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                          <h3 style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: '14px', 
                            margin: 0, 
                            fontWeight: 600,
                            color: 'var(--color-deep-espresso)',
                            lineHeight: 1.3
                          }}>
                            {item.name}
                          </h3>

                          {/* Quick Remove */}
                          <button 
                            type="button" 
                            onClick={() => onRemoveItem(item.cartId || idx)}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#A09488', 
                              padding: '2px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title={`Remove ${item.name}`}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Specs Tag */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                          {item.selectedLength && (
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F7F3EE', color: '#685C50' }}>
                              {item.selectedLength}
                            </span>
                          )}
                          {item.selectedLace && (
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F7F3EE', color: '#685C50' }}>
                              {item.selectedLace}
                            </span>
                          )}
                          {item.selectedDensity && (
                            <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F7F3EE', color: '#685C50' }}>
                              {item.selectedDensity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Price Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        {/* Tactile Quantity Stepper */}
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#FCFAF7'
                        }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (qty > 1) {
                                if (onUpdateQuantity) onUpdateQuantity(item.cartId || idx, qty - 1);
                              } else {
                                onRemoveItem(item.cartId || idx);
                              }
                            }}
                            style={{
                              width: '26px',
                              height: '26px',
                              border: 'none',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--color-deep-espresso)'
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ 
                            fontSize: '12px', 
                            fontWeight: 600, 
                            padding: '0 8px', 
                            color: 'var(--color-deep-espresso)',
                            userSelect: 'none'
                          }}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (onUpdateQuantity) onUpdateQuantity(item.cartId || idx, qty + 1);
                            }}
                            style={{
                              width: '26px',
                              height: '26px',
                              border: 'none',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--color-deep-espresso)'
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Save to Wishlist & Price */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {onMoveToWishlist && (
                            <button
                              type="button"
                              onClick={() => onMoveToWishlist(item)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontSize: '11px',
                                color: 'var(--color-dusty-rose)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                              title="Move to Saved Looks"
                            >
                              <Heart size={12} />
                              <span>Save</span>
                            </button>
                          )}
                          <strong style={{ fontSize: '14px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                            £{itemTotal}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Order Note Toggle */}
          {cartItems.length > 0 && (
            <div style={{ marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setShowOrderNote(!showOrderNote)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontSize: '11.5px',
                  color: 'var(--color-deep-espresso)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 500
                }}
              >
                {showOrderNote ? '− Hide custom hair instructions' : '+ Add custom hairline / styling note'}
              </button>
              {showOrderNote && (
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Please pluck hairline slightly deeper on left temple, head circumference: 22.5 inches."
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    fontSize: '11.5px',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* FOOTER WITH PRIVILEGE CODE & CHECKOUT CTA */}
        {cartItems.length > 0 && (
          <div style={{ 
            paddingTop: '14px', 
            borderTop: '1px solid var(--color-border)',
            flexShrink: 0
          }}>
            {/* Privilege / Promo Code Form */}
            {!promoApplied ? (
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError('');
                  }}
                  placeholder="Privilege Code (try HOUSE10)"
                  style={{
                    flexGrow: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: promoError ? '1px solid #D32F2F' : '1px solid var(--color-border)',
                    fontSize: '12px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                <button
                  type="submit"
                  className="btn-outline-editorial"
                  style={{ padding: '8px 14px', fontSize: '11.5px', whiteSpace: 'nowrap' }}
                >
                  Apply
                </button>
              </form>
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: '#EBF7EE',
                border: '1px solid #C3E6CB',
                marginBottom: '12px',
                fontSize: '11.5px',
                color: '#1E7E34'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={12} />
                  <span>Code <strong>{promoCode}</strong> applied (10% off)</span>
                </span>
                <button
                  type="button"
                  onClick={handleRemovePromo}
                  style={{ background: 'none', border: 'none', color: '#1E7E34', cursor: 'pointer', padding: 0, fontSize: '11px', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <p style={{ margin: '-8px 0 10px', fontSize: '11px', color: '#D32F2F' }}>
                {promoError}
              </p>
            )}

            {/* Financial Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50' }}>
                <span>Subtotal</span>
                <span>£{subtotal}</span>
              </div>

              {promoApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#1E7E34' }}>
                  <span>Privilege Discount (10%)</span>
                  <span>−£{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50' }}>
                <span>UK Shipping</span>
                <span style={{ color: remainingForFreeShipping === 0 ? '#1E7E34' : 'inherit' }}>
                  {remainingForFreeShipping === 0 ? 'Free' : 'Calculated at checkout'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed var(--color-border-light)' }}>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                    Estimated Total
                  </strong>
                  <span style={{ display: 'block', fontSize: '10.5px', color: '#8C8074' }}>
                    UK VAT &amp; Customs Duties Included
                  </span>
                </div>
                <strong style={{ fontSize: '19px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                  £{finalTotal}
                </strong>
              </div>
            </div>

            {/* PROCEED TO CHECKOUT ACTION */}
            <button 
              type="button" 
              className="btn-primary-editorial" 
              style={{ width: '100%', justifyContent: 'center', padding: '13px 16px', fontSize: '13px' }}
              onClick={() => {
                if (onProceedToCheckout) {
                  onProceedToCheckout({
                    discountAmount,
                    promoCode: promoApplied ? promoCode : null,
                    orderNote
                  });
                }
              }}
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* Accepted Cards & Payment Icons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  border: '1px solid #D8DFE8', 
                  backgroundColor: '#FFFFFF', 
                  fontSize: '10px', 
                  fontWeight: 800, 
                  letterSpacing: '0.04em',
                  color: '#1A1F71'
                }}>
                  VISA
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '3px',
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  border: '1px solid #E8DBD0', 
                  backgroundColor: '#FFFFFF', 
                  fontSize: '10px', 
                  fontWeight: 700,
                  color: '#241C19'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EB001B', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F79E1B', display: 'inline-block', marginLeft: '-5px' }} />
                  <span style={{ marginLeft: '2px' }}>Mastercard</span>
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  border: '1px solid #C7DFEE', 
                  backgroundColor: '#FFFFFF', 
                  fontSize: '10px', 
                  fontWeight: 800, 
                  letterSpacing: '0.04em',
                  color: '#006FCF'
                }}>
                  AMEX
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '3px',
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  border: '1px solid #D0D0D0', 
                  backgroundColor: '#FFFFFF', 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  color: '#111111'
                }}>
                  <span></span>Pay
                </span>
              </div>
              <span style={{ fontSize: '10.5px', color: '#8C8074', letterSpacing: '0.02em' }}>
                Secure Payment • All Major Cards Accepted
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
