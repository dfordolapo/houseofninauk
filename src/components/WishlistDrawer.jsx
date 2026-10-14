import React, { useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2, Tag } from 'lucide-react';

export default function WishlistDrawer({ isOpen, onClose, wishlist = [], onRemoveItem, onAddToCart }) {
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

  const handleAddWishlistItemToBag = (item) => {
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
    }
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
        aria-label="Wishlist Drawer"
      >
        {/* Sticky Header */}
        <div className="drawer-sticky-header">
          <div className="wishlist-header-title-wrap">
            <Heart size={20} fill="var(--color-gold)" color="var(--color-gold)" />
            <h2 className="wishlist-drawer-title">
              Saved Looks ({wishlist.length})
            </h2>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose} 
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="wishlist-drawer-body">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-state">
              <div className="wishlist-empty-icon-wrap">
                <Heart size={44} strokeWidth={1.5} color="var(--color-gold)" />
              </div>
              <h3 className="wishlist-empty-title">Your wishlist is empty</h3>
              <p className="wishlist-empty-desc">
                Tap the heart on any look from our feed or boutique to save your favorites here.
              </p>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((item, idx) => {
                const title = item.name || item.productName || 'Signature Unit';
                const priceFormatted = typeof item.price === 'number' 
                  ? `£${item.price}` 
                  : (item.price || '£245');

                const subtitle = item.selectedLength 
                  ? `${item.selectedLength} • ${item.selectedLace || 'HD Lace'}`
                  : (item.caption ? item.caption.slice(0, 52) + '...' : item.category || 'Luxury Hair');

                return (
                  <article key={item.id || idx} className="wishlist-item-card animate-fade-in">
                    <div className="wishlist-item-thumb-wrap">
                      <img 
                        src={item.image} 
                        alt={title} 
                        className="wishlist-item-thumb" 
                      />
                      {item.category && (
                        <span className="wishlist-item-cat-pill">{item.category}</span>
                      )}
                    </div>

                    <div className="wishlist-item-details">
                      <div className="wishlist-item-info">
                        <div className="wishlist-item-top-row">
                          <h4 className="wishlist-item-title">{title}</h4>
                          <button 
                            type="button" 
                            onClick={() => onRemoveItem(item.id)} 
                            className="wishlist-remove-btn"
                            aria-label={`Remove ${title}`}
                            title="Remove from saved"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="wishlist-item-subtitle">{subtitle}</p>
                      </div>

                      <div className="wishlist-item-action-row">
                        <span className="wishlist-item-price">{priceFormatted}</span>
                        <button 
                          type="button" 
                          className="wishlist-add-bag-btn"
                          onClick={() => handleAddWishlistItemToBag(item)}
                        >
                          <ShoppingBag size={13} />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {wishlist.length > 0 && (
          <div className="wishlist-drawer-footer">
            <button 
              type="button" 
              className="btn-continue-shopping"
              style={{ width: '100%', textAlign: 'center' }}
              onClick={onClose}
            >
              Back to Collections
            </button>
          </div>
        )}
      </div>
    </>
  );
}
