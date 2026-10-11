import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedLace, setSelectedLace] = useState('');
  const [selectedDensity, setSelectedDensity] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedLength(product.options?.lengths?.[0] || '');
      setSelectedLace(product.options?.laceTypes?.[0] || '');
      setSelectedDensity(product.options?.densities?.[0] || '');
      setIsAdded(false);
    }
  }, [product]);

  // Lock body scroll when modal is open
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

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedLength,
      selectedLace,
      selectedDensity,
      cartId: `${product.id}-${selectedLength}-${selectedLace}-${selectedDensity}`
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label={product.name}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product quick view"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="quickview-layout">
          <div className="quickview-image-wrap">
            <img 
              src={product.image} 
              alt={product.name} 
              className="quickview-img" 
            />
          </div>

          <div className="quickview-body">
            <span className="product-cat-pill">{product.category}</span>
            <h2 className="product-title" style={{ fontSize: '24px', marginBottom: '8px' }}>
              {product.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="product-price" style={{ fontSize: '24px' }}>£{product.price}</span>
              {product.tag && <span className="product-tag-badge" style={{ position: 'static' }}>{product.tag}</span>}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--color-espresso-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Length selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Length: <strong style={{ color: 'var(--color-dusty-rose)' }}>{selectedLength}</strong>
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.options?.lengths?.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSelectedLength(len)}
                    className="option-chip"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      backgroundColor: selectedLength === len ? 'var(--color-deep-espresso)' : 'var(--color-ivory)',
                      color: selectedLength === len ? 'var(--color-ivory)' : 'var(--color-deep-espresso)',
                      fontWeight: selectedLength === len ? 600 : 400,
                      borderColor: selectedLength === len ? 'var(--color-deep-espresso)' : 'var(--color-border)'
                    }}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Lace Type selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Lace Construction:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.options?.laceTypes?.map((lace) => (
                  <button
                    key={lace}
                    type="button"
                    onClick={() => setSelectedLace(lace)}
                    className="option-chip"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      backgroundColor: selectedLace === lace ? 'var(--color-deep-espresso)' : 'var(--color-ivory)',
                      color: selectedLace === lace ? 'var(--color-ivory)' : 'var(--color-deep-espresso)',
                      fontWeight: selectedLace === lace ? 600 : 400,
                      borderColor: selectedLace === lace ? 'var(--color-deep-espresso)' : 'var(--color-border)'
                    }}
                  >
                    {lace}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality assurance note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-muted-olive)', margin: '12px 0 24px 0' }}>
              <ShieldCheck size={16} /> Pre-plucked hairline & bleached micro-knots included
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '10px' }}
              onClick={handleAdd}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={18} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Bag — £{product.price}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
