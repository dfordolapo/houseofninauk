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
      setPromoError('Invalid discount code. Please check and try again.');
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
                  placeholder="Discount code"
                  style={{
                    flexGrow: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: promoError ? '1px solid #D32F2F' : '1px solid var(--color-border)',
                    fontSize: '11px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                <button
                  type="submit"
                  className="btn-outline-editorial"
                  style={{ padding: '8px 14px', fontSize: '11px', whiteSpace: 'nowrap' }}
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
                  <span>Discount (10%)</span>
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
                  justifyContent: 'center',
                  padding: '3px 7px', 
                  borderRadius: '4px', 
                  border: '1px solid #FFD0DC', 
                  backgroundColor: '#FFB3C7', 
                  fontSize: '10px', 
                  fontWeight: 800, 
                  letterSpacing: '0.02em',
                  color: '#0A0A0A'
                }}>
                  Klarna.
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '3px 8px', 
                  borderRadius: '4px', 
                  border: '1px solid #000000', 
                  backgroundColor: '#000000', 
                  lineHeight: 1
                }}>
                  <svg width="28" height="12" viewBox="13.5 19.5 93 41" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
                    <path d="M31.7358 25.6955C32.8058 24.3572 33.5319 22.5603 33.3404 20.724C31.7741 20.8019 29.8627 21.7573 28.7562 23.0967C27.7626 24.2436 26.8832 26.1158 27.1124 27.8751C28.8707 28.0276 30.6273 26.9962 31.7358 25.6955Z" fill="#FFFFFF"/>
                    <path d="M33.3204 28.2186C30.7671 28.0665 28.5961 29.6678 27.3767 29.6678C26.1567 29.6678 24.2894 28.2952 22.2698 28.3322C19.6412 28.3708 17.2022 29.8571 15.8682 32.2209C13.1246 36.9497 15.1442 43.9642 17.8122 47.8155C19.1079 49.7209 20.6694 51.8189 22.7269 51.7435C24.6709 51.6672 25.4328 50.4847 27.7958 50.4847C30.1571 50.4847 30.8435 51.7435 32.9013 51.7054C35.0353 51.6672 36.3695 49.799 37.6651 47.8918C39.1515 45.7198 39.7599 43.6225 39.7982 43.5073C39.7599 43.4692 35.6832 41.9053 35.6454 37.2158C35.6069 33.2892 38.8461 31.4215 38.9985 31.3057C37.1694 28.6003 34.3113 28.2952 33.3204 28.2186Z" fill="#FFFFFF"/>
                    <path d="M55.5533 22.9046C61.103 22.9046 64.9675 26.7301 64.9675 32.2997C64.9675 37.8892 61.0235 41.7345 55.4142 41.7345H49.2696V51.5062H44.8301V22.9046L55.5533 22.9046ZM49.2695 38.0081H54.3635C58.2288 38.0081 60.4286 35.9271 60.4286 32.3196C60.4286 28.7124 58.2288 26.6509 54.3834 26.6509H49.2695V38.0081Z" fill="#FFFFFF"/>
                    <path d="M66.1274 45.5799C66.1274 41.9326 68.9222 39.6929 73.8778 39.4154L79.5858 39.0786V37.4732C79.5858 35.1541 78.0198 33.7666 75.404 33.7666C72.9258 33.7666 71.3797 34.9556 71.0035 36.8191H66.9601C67.1979 33.0528 70.4086 30.278 75.5623 30.278C80.6165 30.278 83.8471 32.9538 83.8471 37.136V51.5062H79.7441V48.0772H79.6454C78.4365 50.3963 75.8001 51.8629 73.065 51.8629C68.9818 51.8629 66.1274 49.3258 66.1274 45.5799ZM79.5858 43.697V42.0518L74.452 42.3688C71.8951 42.5473 70.4484 43.6771 70.4484 45.461C70.4484 47.2842 71.9547 48.4736 74.254 48.4736C77.2468 48.4736 79.5858 46.4122 79.5858 43.697Z" fill="#FFFFFF"/>
                    <path d="M87.7206 59.177V55.7082C88.0372 55.7874 88.7506 55.7874 89.1077 55.7874C91.0896 55.7874 92.1601 54.9551 92.8139 52.8145C92.8139 52.7747 93.1908 51.5459 93.1908 51.5261L85.6592 30.6546H90.2967L95.5696 47.6214H95.6484L100.921 30.6546H105.44L97.6303 52.5962C95.8472 57.6508 93.7857 59.276 89.4648 59.276C89.1077 59.276 88.0372 59.2363 87.7206 59.177Z" fill="#FFFFFF"/>
                  </svg>
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '3px 8px', 
                  borderRadius: '4px', 
                  border: '1px solid #D8DFE8', 
                  backgroundColor: '#FFFFFF', 
                  lineHeight: 1
                }}>
                  <svg width="29" height="12" viewBox="14 20.5 92 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
                    <path d="M44.1722 36.8948C44.1722 35.8542 44.0842 34.8488 43.917 33.8896H29.9602V39.5832H37.955C37.6239 41.4215 36.5557 43.0445 34.9982 44.0756V47.7716H39.77C42.564 45.1976 44.1722 41.3916 44.1722 36.8948Z" fill="#4285F4"/>
                    <path d="M29.9603 51.34C33.9555 51.34 37.3171 50.031 39.7701 47.7738L34.9983 44.0756C33.6717 44.9688 31.9623 45.4902 29.9603 45.4902C26.1015 45.4902 22.8235 42.8898 21.6531 39.3874H16.7383V43.1956C19.2527 48.1909 24.3678 51.3425 29.9603 51.3422" fill="#34A853"/>
                    <path d="M21.6529 39.3874C21.0355 37.5518 21.0355 35.5646 21.6529 33.729V29.9208H16.7381C15.6991 31.9782 15.1587 34.2512 15.1606 36.556C15.1606 38.943 15.7327 41.198 16.7381 43.1934L21.6529 39.3852V39.3874Z" fill="#FABB05"/>
                    <path d="M29.96 27.6262C32.1424 27.6262 34.096 28.3742 35.636 29.8438V29.846L39.86 25.6264C37.2992 23.2416 33.9552 21.7764 29.9622 21.7764C24.3703 21.7757 19.2553 24.9264 16.7402 29.9208L21.655 33.729C22.8254 30.2266 26.1034 27.6262 29.9622 27.6262" fill="#E94235"/>
                    <path d="M57.5437 26.997V35.9796H63.0833C64.4033 35.9796 65.4945 35.5352 66.3569 34.6486C67.2435 33.7642 67.6879 32.7082 67.6879 31.4872C67.6879 30.2904 67.2435 29.2476 66.3569 28.3588C65.4945 27.4502 64.4033 26.9948 63.0833 26.9948H57.5437V26.997ZM57.5437 39.141V49.5602H54.2349V23.8356H63.0129C65.2415 23.8356 67.1335 24.577 68.6933 26.062C70.2773 27.547 71.0693 29.3554 71.0693 31.4872C71.0693 33.6674 70.2773 35.489 68.6933 36.9476C67.1599 38.4106 65.2635 39.1388 63.0107 39.1388H57.5437V39.141ZM74.4133 44.1724C74.4133 45.0348 74.7785 45.752 75.5111 46.3284C76.2415 46.9004 77.0995 47.1886 78.0807 47.1886C79.4733 47.1886 80.7119 46.6738 81.8031 45.6464C82.8965 44.6146 83.4399 43.4046 83.4399 42.0164C82.4081 41.2024 80.9693 40.7954 79.1235 40.7954C77.7815 40.7954 76.6595 41.121 75.7619 41.7678C74.8621 42.4146 74.4133 43.2132 74.4133 44.1724ZM78.6945 31.3794C81.1409 31.3794 83.0703 32.0328 84.4871 33.3374C85.8995 34.6442 86.6079 36.435 86.6079 38.7098V49.5602H83.4421V47.1182H83.2991C81.9307 49.129 80.1091 50.1366 77.8299 50.1366C75.8895 50.1366 74.2637 49.5602 72.9569 48.4118C71.6501 47.2612 70.9967 45.8246 70.9967 44.0998C70.9967 42.2782 71.6853 40.8306 73.0647 39.7526C74.4441 38.6746 76.2833 38.1356 78.5867 38.1356C80.5491 38.1356 82.1705 38.4942 83.4399 39.2136V38.4568C83.4399 37.3084 82.9845 36.3316 82.0737 35.5308C81.1961 34.7411 80.0531 34.3114 78.8727 34.3274C77.0247 34.3274 75.5639 35.104 74.4837 36.6638L71.5709 34.829C73.1769 32.53 75.5529 31.3794 78.6945 31.3794ZM104.771 31.9558L93.7271 57.3218H90.3105L94.4113 48.447L87.1469 31.9558H90.7439L95.9953 44.6036H96.0657L101.174 31.9536L104.771 31.9558Z" fill="#3C4043"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
