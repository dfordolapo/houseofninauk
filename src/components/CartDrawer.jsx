import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/wigData';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const remainingForFreeShipping = Math.max(0, BRAND_INFO.freeShippingThreshold - subtotal);

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
        aria-label="Shopping Bag"
      >
        {/* Sticky Header */}
        <div className="drawer-sticky-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--color-gold)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: 0, fontWeight: 600 }}>
              Shopping Bag ({cartItems.length})
            </h2>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid var(--color-border-light)' }}>
          {remainingForFreeShipping === 0 ? (
            <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--color-muted-olive)' }}>
              🎉 You have qualified for Free UK Next-Day Delivery!
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-espresso-muted)' }}>
              Add <strong>£{remainingForFreeShipping.toFixed(0)}</strong> more to get Free UK Delivery!
            </p>
          )}
        </div>

        {/* Items List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 0' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-espresso-muted)' }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p style={{ fontSize: '15px', fontWeight: 500 }}>Your bag is currently empty.</p>
              <button 
                type="button" 
                className="btn-primary-editorial" 
                style={{ marginTop: '16px', fontSize: '13px', padding: '10px 20px' }}
                onClick={onClose}
              >
                Explore Wigverse
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item, idx) => (
                <div 
                  key={item.cartId || idx} 
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    padding: '12px', 
                    backgroundColor: 'var(--color-white)', 
                    borderRadius: '12px',
                    border: '1px solid var(--color-border-light)'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '70px', height: '84px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', margin: 0, fontWeight: 600 }}>
                          {item.name}
                        </h3>
                        <button 
                          type="button" 
                          onClick={() => onRemoveItem(item.cartId || idx)}
                          style={{ color: 'var(--color-espresso-muted)', padding: '2px' }}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p style={{ fontSize: '11.5px', color: 'var(--color-espresso-muted)', margin: '4px 0 0 0' }}>
                        {item.selectedLength} • {item.selectedLace}
                      </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--color-espresso-muted)' }}>Qty: {item.quantity || 1}</span>
                      <strong style={{ fontSize: '14px' }}>£{item.price}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {cartItems.length > 0 && (
          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-espresso-muted)' }}>Subtotal</span>
              <strong style={{ fontSize: '18px' }}>£{subtotal}</strong>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-espresso-muted)', marginBottom: '16px' }}>
              Taxes and UK shipping calculated at checkout.
            </p>
            <button 
              type="button" 
              className="btn-primary-editorial" 
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              onClick={() => {
                alert("Thank you for exploring House of Nina! Checkout integration will be connected in the full store build.");
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
