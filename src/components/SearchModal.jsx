import React, { useState, useEffect } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/wigData';

const POPULAR_SEARCHES = ['Wigs', 'Scarves', 'Bob', 'Bone Straight', 'Body Wave', 'Silk'];

export default function SearchModal({ isOpen, onClose, onSelectProduct, onSelectCategory }) {
  const [query, setQuery] = useState('');

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

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' 
    ? [] 
    : FEATURED_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="Search House of Nina"
        style={{ maxWidth: '640px', padding: '32px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close search"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <span className="section-label">Explore House of Nina</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, margin: '4px 0 16px 0' }}>
            Search wigs & silk scarves
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-espresso-muted)' }} />
            <input
              type="text"
              className="newsletter-input"
              style={{ width: '100%', paddingLeft: '44px' }}
              placeholder="Try 'Bob', 'Bone straight', 'Silk scarf'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Quick Style Category Suggestions */}
        {query.trim() === '' && (
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-espresso-muted)', marginBottom: '10px' }}>
              Popular Searches
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {POPULAR_SEARCHES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onSelectCategory) onSelectCategory(cat);
                  }}
                  className="option-chip"
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() !== '' && (
          <div>
            <p style={{ fontSize: '12px', color: 'var(--color-espresso-muted)', marginBottom: '12px' }}>
              Found {filteredProducts.length} result(s)
            </p>
            {filteredProducts.length === 0 ? (
              <p style={{ fontSize: '14px', color: 'var(--color-espresso-muted)', textAlign: 'center', padding: '24px 0' }}>
                No styles found matching "{query}". Try another texture or keyword.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(prod);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-white)',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-light)'
                    }}
                  >
                    <img src={prod.image} alt={prod.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', margin: 0, fontWeight: 600 }}>{prod.name}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--color-dusty-rose)' }}>{prod.category} • £{prod.price}</span>
                    </div>
                    <ArrowRight size={16} color="var(--color-espresso-muted)" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
