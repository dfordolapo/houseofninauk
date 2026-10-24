import React, { useState } from 'react';
import { Eye, Plus, ArrowRight, Heart, ShoppingBag, Check, MessageCircle } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/wigData';
import GoldStroke from './GoldStroke';

export default function FeaturedProducts({ 
  onQuickView, 
  onOpenDetails, 
  onAddToCart, 
  activeFilter, 
  onClearFilter,
  onToggleWishlist,
  wishlist = [],
  onOpenReviews
}) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter || 'All');
  const [addedId, setAddedId] = useState(null);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      const defaultLength = product.options?.lengths?.[0] || '';
      const defaultLace = product.options?.laceTypes?.[0] || '';
      const defaultDensity = product.options?.densities?.[0] || '';
      onAddToCart({
        ...product,
        selectedLength: defaultLength,
        selectedLace: defaultLace,
        selectedDensity: defaultDensity,
        cartId: `${product.id}-${defaultLength}-${defaultLace}-${defaultDensity}`
      });
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1400);
    }
  };

  const filteredProducts = selectedFilter === 'All' 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || p.name.toLowerCase().includes(selectedFilter.toLowerCase()));

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : FEATURED_PRODUCTS;

  const handleOpenDetails = (product) => {
    if (onOpenDetails) {
      onOpenDetails(product);
    } else if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <section id="featured-products" className="section-wrapper" aria-label="Featured Wigs Collection">
      <div className="container">
        <header className="section-header">
          <h2 className="section-heading">Handcrafted Wigs &amp; <GoldStroke>Silk Scarves</GoldStroke></h2>
          {selectedFilter !== 'All' && (
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-espresso-muted)' }}>
                Filtering by: <strong>{selectedFilter}</strong>
              </span>{' '}
              <button 
                type="button" 
                onClick={() => { setSelectedFilter('All'); if (onClearFilter) onClearFilter(); }}
                style={{ fontSize: '12px', textDecoration: 'underline', color: 'var(--color-dusty-rose)', marginLeft: '8px' }}
              >
                Show All
              </button>
            </div>
          )}
        </header>

        {/* 4-Column Product Grid */}
        <div className="products-grid">
          {displayProducts.map((product) => {
            const isWishlisted = wishlist.some(item => item.id === product.id);

            return (
              <article key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-img" 
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Tag Badge */}
                  {product.tag && (
                    <span className="product-tag-badge">{product.tag}</span>
                  )}

                  {/* Floating Action Buttons Stack: Heart on Top, Quick Add to Bag Below */}
                  <div className="product-card-actions">
                    <button 
                      type="button" 
                      className={`product-action-circle-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(product);
                      }}
                      aria-label={isWishlisted ? `Remove ${product.name} from lookbook` : `Save ${product.name} to lookbook`}
                      title={isWishlisted ? "Saved to lookbook" : "Save to lookbook"}
                    >
                      <Heart 
                        size={15} 
                        fill={isWishlisted ? "var(--color-gold)" : "none"} 
                        color={isWishlisted ? "var(--color-gold)" : "var(--color-deep-espresso)"} 
                        strokeWidth={isWishlisted ? 2.2 : 1.8}
                      />
                    </button>

                    {/* Comment / Client Reviews Icon Button */}
                    <button 
                      type="button" 
                      className="product-action-circle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenReviews) onOpenReviews(product);
                        else if (onOpenDetails) onOpenDetails(product);
                      }}
                      aria-label={`View client reviews & comments for ${product.name}`}
                      title="Client Reviews & Comments"
                    >
                      <MessageCircle size={15} strokeWidth={1.8} />
                    </button>

                    <button 
                      type="button" 
                      className={`product-action-circle-btn ${addedId === product.id ? 'added' : ''}`}
                      onClick={(e) => handleQuickAdd(product, e)}
                      aria-label={`Quick add ${product.name} to bag`}
                      title="Quick Add to Bag"
                    >
                      {addedId === product.id ? (
                        <Check size={15} strokeWidth={2.4} color="#2E7D32" />
                      ) : (
                        <ShoppingBag size={15} strokeWidth={1.8} />
                      )}
                    </button>
                  </div>

                  {/* Quick Action Overlay: Pure Video Preview */}
                  <div className="product-quick-action">
                    <button 
                      type="button" 
                      className="btn-quick-view"
                      onClick={() => onQuickView(product)}
                      aria-label={`Watch video preview of ${product.name}`}
                    >
                      <Eye size={15} /> Quick View
                    </button>
                  </div>
                </div>

              <div className="product-details">
                <span className="product-cat-pill">{product.category}</span>
                <h3 
                  className="product-title" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenDetails(product)}
                >
                  {product.name}
                </h3>

                {/* Options previews (Lengths & Lace) */}
                <div className="product-options-row">
                  {product.options.lengths.slice(0, 3).map((len) => (
                    <span key={len} className="option-chip">{len}</span>
                  ))}
                  <span className="option-chip">{product.options.laceTypes[0]?.split(' ')[0] || 'HD'} Lace</span>
                </div>

                <div className="product-bottom-row">
                  <span className="product-price">£{product.price}</span>
                  <button 
                    type="button" 
                    className="product-explore-btn"
                    onClick={() => handleOpenDetails(product)}
                    aria-label={`View full details for ${product.name}`}
                  >
                    <span>Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          )})}
        </div>

        {/* Shop All Wigs Link */}
        <div className="center-action-wrapper">
          <button 
            type="button" 
            className="btn-primary-editorial"
            onClick={() => {
              setSelectedFilter('All');
              alert("You are viewing the complete House of Nina collection! Select any unit for options.");
            }}
          >
            <span>Shop all wigs</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
