import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/wigData';

const POPULAR_SEARCHES = ['All Wigs', 'Silk Scarves', 'Glass Bob', 'Bone Straight', 'Body Wave', 'HD Lace'];

export default function SearchModal({ isOpen, onClose, onSelectProduct, onSelectCategory }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' 
    ? [] 
    : FEATURED_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className={`search-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="search-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="Search House of Nina Collection"
      >
        {/* HEADER */}
        <div className="search-modal-header">
          <div className="search-modal-header-left">
            <div className="search-modal-badge-row">
              <span className="search-modal-brand-tag">House of Nina</span>
              <span className="search-modal-brand-sub">• Collection Search</span>
            </div>
            <h2 className="search-modal-title">
              Search Collection
            </h2>
          </div>

          <button 
            type="button" 
            className="search-modal-close-btn" 
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        {/* SEARCH BODY */}
        <div className="search-modal-body">
          {/* SEARCH INPUT */}
          <div className="search-input-wrapper">
            <Search size={16} className="search-input-icon" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search style, length, or texture..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.trim() !== '' && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="search-input-clear-btn"
                aria-label="Clear search"
              >
                <X size={13} strokeWidth={2.2} />
              </button>
            )}
          </div>

          {/* POPULAR SEARCH SUGGESTIONS */}
          {query.trim() === '' && (
            <div className="search-popular-section">
              <div className="search-section-label">
                Popular Searches
              </div>

              <div className="search-chip-group">
                {POPULAR_SEARCHES.map(cat => {
                  const filterValue = cat === 'All Wigs' ? 'All' : cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onSelectCategory) onSelectCategory(filterValue);
                      }}
                      className="search-popular-chip"
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEARCH RESULTS */}
          {query.trim() !== '' && (
            <div className="search-results-section">
              <div className="search-results-meta-header">
                <span className="search-results-count">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'unit found' : 'units found'}
                </span>
                <span className="search-results-hint">
                  Tap unit to view
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="search-empty-state">
                  <p className="search-empty-title">
                    No units matching "{query}"
                  </p>
                  <p className="search-empty-sub">
                    Try searching for "Bob", "Straight", "Body Wave", or "Silk"
                  </p>
                </div>
              ) : (
                <div className="search-results-list">
                  {filteredProducts.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="search-result-card"
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="search-result-thumb" 
                      />

                      <div className="search-result-info">
                        <h4 className="search-result-name">
                          {prod.name}
                        </h4>
                        <div className="search-result-meta-row">
                          <span className="search-result-price">
                            £{prod.price}
                          </span>
                          <span className="search-result-sep">•</span>
                          <span className="search-result-tag">{prod.category}</span>
                          {prod.lengths && (
                            <>
                              <span className="search-result-sep">•</span>
                              <span className="search-result-tag">{prod.lengths[0]}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <ChevronRight size={16} className="search-result-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
