import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, ShoppingBag, X, ArrowRight, Star, Plus } from 'lucide-react';
import { BAG_SUGGESTIONS, FEATURED_PRODUCTS } from '../data/wigData';

export default function AddedToBagModal({ 
  isOpen, 
  onClose, 
  addedProduct, 
  cartItems = [], 
  onAddToCart, 
  onOpenCart 
}) {
  const [addedSuggestions, setAddedSuggestions] = useState({});


  if (!isOpen || !addedProduct) return null;

  // Filter out suggestions that match the currently added product
  const suggestions = BAG_SUGGESTIONS.filter(item => {
    return item.name.toLowerCase() !== addedProduct.name?.toLowerCase();
  }).slice(0, 3);

  const handleAddSuggestion = (sug) => {
    const sugCartId = `${sug.id}-addon`;
    const productToAdd = {
      id: sug.id,
      cartId: sugCartId,
      name: sug.name,
      price: sug.price,
      selectedLength: sug.category === 'Wigs' ? '12"' : 'Standard',
      selectedLace: sug.category === 'Wigs' ? '5x5 HD Closure' : 'Pure Silk',
      selectedDensity: 'Signature Spec',
      image: sug.image,
      quantity: 1
    };

    onAddToCart(productToAdd, { isSilent: true });
    setAddedSuggestions(prev => ({
      ...prev,
      [sug.id]: true
    }));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="added-modal-backdrop animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="added-modal-container animate-scale-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Top Notification Bar */}
        <div className="added-modal-header">
          <div className="added-status-pill">
            <CheckCircle2 size={18} className="added-check-icon" />
            <span className="added-status-text">Added to Your Bag</span>
          </div>
          <button 
            type="button" 
            className="added-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Just Added Summary */}
        <div className="added-product-card">
          <div className="added-product-thumb-wrap">
            <img 
              src={addedProduct.image} 
              alt={addedProduct.name} 
              className="added-product-thumb" 
            />
          </div>
          <div className="added-product-info">
            <h3 className="added-product-name">{addedProduct.name}</h3>
            <div className="added-product-meta">
              {addedProduct.selectedLength && (
                <span className="meta-pill">{addedProduct.selectedLength}</span>
              )}
              {addedProduct.selectedLace && (
                <span className="meta-pill">{addedProduct.selectedLace}</span>
              )}
            </div>
            <div className="added-product-price-row">
              <span className="added-price">£{addedProduct.price}</span>
              <span className="added-qty">Qty: 1</span>
            </div>
          </div>
        </div>

        {/* Suggestions / Cross-Sell Section */}
        <div className="added-suggestions-wrapper">
          <div className="suggestions-header">
            <div>
              <span className="suggestions-subheading">Complete Your Look</span>
              <h4 className="suggestions-heading">Frequently Paired Together</h4>
            </div>
          </div>

          <div className="suggestions-grid">
            {suggestions.map((sug) => {
              const isAdded = !!addedSuggestions[sug.id];

              return (
                <div key={sug.id} className="suggestion-card">
                  <div className="sug-img-wrap">
                    <img src={sug.image} alt={sug.name} className="sug-img" />
                    {sug.badge && (
                      <span className="sug-badge">{sug.badge}</span>
                    )}
                  </div>

                  <div className="sug-details">
                    <div className="sug-rating">
                      <Star size={11} fill="var(--color-gold)" color="var(--color-gold)" />
                      <span>{sug.rating}.0</span>
                    </div>
                    <h5 className="sug-title">{sug.name}</h5>
                    <p className="sug-reason">{sug.reason}</p>
                    
                    <div className="sug-bottom">
                      <span className="sug-price">£{sug.price}</span>
                      <button 
                        type="button" 
                        className={`sug-add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddSuggestion(sug)}
                        disabled={isAdded}
                      >
                        {isAdded ? (
                          <>
                            <Check size={13} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={13} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="added-modal-footer">
          <button 
            type="button" 
            className="btn-continue-shopping"
            onClick={onClose}
          >
            Continue Shopping
          </button>
          
          <button 
            type="button" 
            className="btn-view-bag-checkout"
            onClick={() => {
              onClose();
              if (onOpenCart) onOpenCart();
            }}
          >
            <ShoppingBag size={15} className="btn-checkout-bag-icon" />
            <span className="btn-checkout-single-line">
              View Bag &amp; Checkout ({totalItemCount}) <span className="btn-total-sep">•</span> £{cartTotal}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
