import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Share2, 
  Check, 
  ArrowRight,
  MessageCircle,
  ExternalLink 
} from 'lucide-react';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlist = [], 
  onRemoveItem, 
  onAddToCart,
  onMoveAllToBag 
}) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState({});

  const handleAddSingleToBag = (item) => {
    if (onAddToCart) {
      const priceNum = typeof item.price === 'number' 
        ? item.price 
        : parseInt(String(item.price).replace(/[^\d]/g, ''), 10) || 245;

      const productToAdd = {
        id: item.id,
        cartId: `${item.id}-wl-${Date.now()}`,
        name: item.name || item.productName || 'House of Nina Unit',
        price: priceNum,
        selectedLength: item.selectedLength || (item.category === 'Wigs' ? '12"' : 'Standard'),
        selectedLace: item.selectedLace || (item.category === 'Wigs' ? '13x4 HD Lace' : 'Pure Silk'),
        selectedDensity: item.selectedDensity || '180%',
        image: item.image,
        quantity: 1
      };

      onAddToCart(productToAdd);

      // Remove from wishlist when moved to cart
      if (onRemoveItem) {
        onRemoveItem(item.id);
      }

      // Temporary visual confirmation badge
      setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
      }, 1800);
    }
  };

  const handleShareLookbook = () => {
    const text = `Look at my saved House of Nina luxury hair wishlist (${wishlist.length} looks): https://houseofnina.co.uk`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2200);
    }
  };

  const handleShareWhatsApp = () => {
    const itemsList = wishlist.map((item, i) => `${i + 1}. ${item.name || item.productName}`).join('\n');
    const msg = encodeURIComponent(`Hi! Here are the House of Nina pieces I saved in my personal lookbook:\n\n${itemsList}\n\nhttps://houseofnina.co.uk`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

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
        aria-label="House of Nina Saved Looks Lookbook"
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
              color: 'var(--color-dusty-rose)'
            }}>
              <Heart size={16} fill="var(--color-dusty-rose)" />
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
                Saved Looks
              </h2>
              <span style={{ fontSize: '11px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                {wishlist.length} {wishlist.length === 1 ? 'Curated Look' : 'Curated Looks'}
              </span>
            </div>
          </div>

          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose} 
            aria-label="Close wishlist"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* LOOKBOOK QUICK ACTION BAR (WHEN ITEMS EXIST) */}
        {wishlist.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--color-border-light)',
            marginTop: '12px',
            gap: '8px'
          }}>
            <button
              type="button"
              onClick={handleShareLookbook}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-deep-espresso)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 6px'
              }}
              title="Copy shareable lookbook link"
            >
              {copiedShare ? (
                <>
                  <Check size={13} color="#2E7D32" />
                  <span style={{ color: '#2E7D32' }}>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Share Lookbook</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                color: '#1E7E34',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 6px'
              }}
              title="Send to stylist or friend via WhatsApp"
            >
              <MessageCircle size={13} />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        )}

        {/* ITEMS LIST BODY */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 0', WebkitOverflowScrolling: 'touch' }}>
          {wishlist.length === 0 ? (
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
                color: 'var(--color-dusty-rose)'
              }}>
                <Heart size={28} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                Your lookbook is waiting
              </h3>
              <p style={{ fontSize: '12.5px', color: '#7A6E62', maxWidth: '280px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                Tap the heart on any unit or silk piece to curate your personal lookbook.
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
                Browse Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {wishlist.map((item, idx) => {
                const title = item.name || item.productName || 'Signature Unit';
                const priceFormatted = typeof item.price === 'number' 
                  ? `£${item.price}` 
                  : (item.price || '£245');

                const subtitle = item.selectedLength 
                  ? `${item.selectedLength} • ${item.selectedLace || 'HD Lace'}`
                  : (item.caption ? item.caption.slice(0, 48) + '...' : item.category || 'Raw Hair');

                const isAdded = addedItemIds[item.id];

                return (
                  <article 
                    key={item.id || idx} 
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
                    <div style={{ position: 'relative', width: '74px', height: '92px', flexShrink: 0 }}>
                      <img 
                        src={item.image} 
                        alt={title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          borderRadius: '10px',
                          backgroundColor: '#F5EFE6'
                        }}
                      />
                      {item.category && (
                        <span style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          fontSize: '9px',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(26, 20, 18, 0.75)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          letterSpacing: '0.04em'
                        }}>
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Details Column */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                          <h4 style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: '14px', 
                            margin: 0, 
                            fontWeight: 600,
                            color: 'var(--color-deep-espresso)',
                            lineHeight: 1.3
                          }}>
                            {title}
                          </h4>

                          <button 
                            type="button" 
                            onClick={() => onRemoveItem(item.id)} 
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#A09488', 
                              padding: '2px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            aria-label={`Remove ${title} from saved`}
                            title="Remove from saved"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p style={{ fontSize: '11.5px', color: '#7A6E62', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                          {subtitle}
                        </p>
                      </div>

                      {/* Price & Add to Bag Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: 700, 
                          color: 'var(--color-deep-espresso)',
                          fontFamily: 'var(--font-display)'
                        }}>
                          {priceFormatted}
                        </span>

                        <button 
                          type="button" 
                          onClick={() => handleAddSingleToBag(item)}
                          className={isAdded ? 'btn-outline-editorial' : 'btn-primary-editorial'}
                          style={{ 
                            padding: '6px 12px', 
                            fontSize: '11.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: isAdded ? '#EBF7EE' : undefined,
                            borderColor: isAdded ? '#C3E6CB' : undefined,
                            color: isAdded ? '#1E7E34' : undefined
                          }}
                        >
                          {isAdded ? (
                            <>
                              <Check size={12} />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={12} />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        {wishlist.length > 0 && (
          <div style={{
            paddingTop: '14px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0
          }}>
            {onMoveAllToBag && (
              <button
                type="button"
                className="btn-primary-editorial"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 16px', fontSize: '12.5px' }}
                onClick={() => {
                  wishlist.forEach(item => handleAddSingleToBag(item));
                  if (onMoveAllToBag) onMoveAllToBag();
                }}
              >
                <ShoppingBag size={14} />
                <span>Move All to Shopping Bag</span>
              </button>
            )}

            <button 
              type="button" 
              className="btn-outline-editorial"
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                padding: '11px 16px', 
                fontSize: '12px',
                color: 'var(--color-deep-espresso)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '30px',
                cursor: 'pointer'
              }}
              onClick={onClose}
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </>
  );
}
