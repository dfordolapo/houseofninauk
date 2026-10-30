import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Heart, Star, MessageCircle, Share2 } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: PRODUCT DETAILS MODAL
 * ============================================================================
 * Displays full product details, specifications, length/lace/density options,
 * quantity counter, and Add to Bag functionality.
 */
export default function ProductDetailsModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onOpenVideo,
  onToggleWishlist,
  onOpenReviews,
  wishlist = []
}) {
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedLace, setSelectedLace] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyProductLink = () => {
    const productId = product?.id || 'product';
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${encodeURIComponent(productId)}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2400);
      }).catch(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2400);
      });
    } else {
      try {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      } catch (e) {}
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  // Setup options and reset on product change / modal open
  useEffect(() => {
    if (product) {
      setSelectedLength(product.options?.lengths?.[0] || '');
      setSelectedLace(product.options?.laceTypes?.[0] || '');
      setIsAdded(false);
      setIsCopied(false);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    const defaultDensity = product.options?.densities?.[0] || '180%';
    onAddToCart({
      ...product,
      selectedLength,
      selectedLace,
      selectedDensity: defaultDensity,
      cartId: `${product.id}-${selectedLength}-${selectedLace}`
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label={`${product.name} details`}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="quickview-layout">
          {/* ── Left Column: Media Showcase (Clean Crisp Image) ── */}
          <div className="quickview-media-wrap">
            {/* Physical Embossed Wax Seal directly on image */}
            <div className="media-wax-seal-stamp" aria-hidden="true">
              <img 
                src="/images/wax-seal-stamp.webp" 
                onError={(e) => {
                  if (!e.currentTarget.dataset.retried) {
                    e.currentTarget.dataset.retried = 'true';
                    e.currentTarget.src = '/images/wax_seal.webp';
                  }
                }}
                alt="" 
                className="media-wax-seal-img"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Floating Lookbook / Wishlist Button */}
            <button 
              type="button" 
              className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleWishlist) onToggleWishlist(product);
              }}
              aria-label={isWishlisted ? `Remove ${product.name} from lookbook` : `Save ${product.name} to lookbook`}
              title={isWishlisted ? "Saved to lookbook" : "Save to lookbook"}
            >
              <Heart 
                size={16} 
                fill={isWishlisted ? "var(--color-gold)" : "none"} 
                color={isWishlisted ? "var(--color-gold)" : "var(--color-deep-espresso)"} 
                strokeWidth={isWishlisted ? 2.2 : 1.8}
              />
            </button>

            {/* Crisp Still Product Image */}
            <div className="quickview-img-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="quickview-img" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
          </div>

          {/* ── Right Column: Product Details & Options ── */}
          <div className="quickview-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              <span className="product-cat-pill">{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => onOpenReviews && onOpenReviews(product)}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '2px 4px'
                  }}
                  title="Read client reviews & write feedback"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-gold)' }}>
                    <Star size={13} fill="var(--color-gold)" color="var(--color-gold)" />
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>
                      {product.rating || '5.0'}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8C8074', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    ({product.reviewsCount || 14})
                  </span>
                </button>

                {/* Top Quick Share / Copy Product Link Button */}
                <button
                  type="button"
                  onClick={handleCopyProductLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: isCopied ? '#F1F8F3' : 'rgba(36, 28, 25, 0.05)',
                    border: '1px solid',
                    borderColor: isCopied ? '#2E7D32' : 'rgba(36, 28, 25, 0.1)',
                    borderRadius: '100px',
                    padding: '3px 9px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isCopied ? '#2E7D32' : 'var(--color-deep-espresso)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title={isCopied ? "Product link copied to clipboard!" : "Share product link"}
                  aria-label="Share product link"
                >
                  {isCopied ? <Check size={12} color="#2E7D32" strokeWidth={2.4} /> : <Share2 size={12} />}
                  <span>{isCopied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '14px', marginTop: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <h2 className="product-title" style={{ fontSize: '18px', margin: 0, fontWeight: 600, color: 'var(--color-deep-espresso)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {product.name}
              </h2>
              <span className="product-price" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                {typeof product.price === 'number' ? `£${product.price}` : product.price}
              </span>
            </div>

            <p className="product-desc" style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#685C50', marginBottom: '18px' }}>
              {product.description}
            </p>

            {/* Length Selector */}
            {product.options?.lengths?.length > 0 && (
              <div className="quickview-selector-group" style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '5px', color: '#685C50' }}>
                  Length: <span style={{ color: 'var(--color-deep-espresso)' }}>{selectedLength}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.options.lengths.map(len => (
                    <button
                      key={len}
                      type="button"
                      className={`option-chip ${selectedLength === len ? 'selected' : ''}`}
                      onClick={() => setSelectedLength(len)}
                      aria-pressed={selectedLength === len}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lace Selector */}
            {product.options?.laceTypes?.length > 0 && (
              <div className="quickview-selector-group" style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '5px', color: '#685C50' }}>
                  Lace Type: <span style={{ color: 'var(--color-deep-espresso)' }}>{selectedLace}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.options.laceTypes.map(lace => (
                    <button
                      key={lace}
                      type="button"
                      className={`option-chip ${selectedLace === lace ? 'selected' : ''}`}
                      onClick={() => setSelectedLace(lace)}
                      aria-pressed={selectedLace === lace}
                    >
                      {lace}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag Button Row */}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <button 
                type="button" 
                className="btn-primary-editorial" 
                style={{ width: '100%', padding: '14px 16px', fontSize: '13px', justifyContent: 'center' }}
                onClick={handleAdd}
              >
                {isAdded ? (
                  <>
                    <Check size={17} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={17} /> Add to Bag
                  </>
                )}
              </button>
            </div>

            {/* Client Reviews Banner Link (Sticky CTA) */}
            <div className="quickview-sticky-reviews-cta">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#685C50' }}>
                <MessageCircle size={14} color="#8C8074" />
                <span>Verified Client Reviews ({product.reviewsCount || 14})</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenReviews && onOpenReviews(product)}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--color-gold-dark)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  padding: '2px 0'
                }}
              >
                Read &amp; Write Review →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
