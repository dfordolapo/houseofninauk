import React from 'react';
import { HOUSE_COLLECTIONS_CONFIG } from '../data/wigData';
import GoldStroke from './GoldStroke';
import FloatingShowroom from './FloatingShowroom';

/**
 * FeaturedProducts: The House Collections
 * Standardized section header matching the rest of the site (section-heading, GoldStroke, single line sub)
 * Renders "The Floating Showroom" curated environment.
 */
export default function FeaturedProducts({ onOpenCollection }) {
  return (
    <section 
      id="featured-products" 
      className="section-wrapper collections-showcase-section floating-showroom-section" 
      aria-label="The House Collections Showcase"
    >
      <div className="container">
        
        {/* Editorial Section Header: Matched to the rest of the site */}
        <header className="collection-showcase-header-centered">
          <h2 className="section-heading">
            {HOUSE_COLLECTIONS_CONFIG.titlePrefix}
            <GoldStroke>{HOUSE_COLLECTIONS_CONFIG.titleGold}</GoldStroke>
          </h2>
          <p className="collection-showcase-sub">
            {HOUSE_COLLECTIONS_CONFIG.subtitle}
          </p>
        </header>

        {/* The Floating Showroom Exhibition */}
        <FloatingShowroom onOpenCollection={onOpenCollection} />

      </div>
    </section>
  );
}
