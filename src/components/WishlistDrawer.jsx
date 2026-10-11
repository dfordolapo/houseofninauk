import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveItem }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`wishlist-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`wishlist-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="var(--color-dusty-rose)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: 0, fontWeight: 600 }}>
              Wishlist ({wishlist.length})
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 0' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-espresso-muted)' }}>
              <Heart size={48} strokeWidth={1} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p style={{ fontSize: '15px', fontWeight: 500 }}>Your wishlist is empty.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishlist.map((item, idx) => (
                <div key={item.id || idx} style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'var(--color-white)', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '70px', height: '84px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', margin: 0, fontWeight: 600 }}>{item.name}</h3>
                      <p style={{ fontSize: '11.5px', color: 'var(--color-espresso-muted)', margin: '4px 0 0 0' }}>{item.selectedLength} • {item.selectedLace}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button type="button" onClick={() => onRemoveItem(item.id)} style={{ color: 'var(--color-espresso-muted)', padding: '2px' }} aria-label={`Remove ${item.name}`}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
