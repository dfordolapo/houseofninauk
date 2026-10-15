import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/wigData';
import GoldStroke from './GoldStroke';

const WIGS = FEATURED_PRODUCTS.filter(p => p.category === 'Wigs');
const SCARVES = FEATURED_PRODUCTS.filter(p => p.category === 'Scarves');

export default function SilkPairingAtelier({ onQuickView, onAddToCart }) {
  const [selectedWigIndex, setSelectedWigIndex] = useState(0);
  const [selectedScarfIndex, setSelectedScarfIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const activeWig = WIGS[selectedWigIndex] || WIGS[0];
  const activeScarf = SCARVES[selectedScarfIndex] || SCARVES[0];

  const bundleTotal = activeWig.price + activeScarf.price;
  const bundleDiscounted = Math.round(bundleTotal * 0.9); // 10% Pairing Bundle Perk

  const handleBundleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...activeWig,
        id: `${activeWig.id}-paired`,
        name: `${activeWig.name} + ${activeScarf.name} (Signature Pair)`,
        price: bundleDiscounted
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2200);
    }
  };

  return (
    <section id="silk-pairing-atelier" className="section-wrapper pairing-atelier-section" aria-label="Silk &amp; Lace Pairing Studio">
      <div className="container">
        
        {/* Header */}
        <header className="section-header text-center" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="section-heading">
            Pair Your Unit with 100% Pure <GoldStroke>Mulberry Silk</GoldStroke>
          </h2>
          <p className="section-subheading" style={{ maxWidth: '580px', margin: '8px auto 0 auto', color: 'var(--color-espresso-muted)', fontSize: '14.5px', lineHeight: 1.55 }}>
            Preserve your HD lace melt, lock in overnight moisture, and prevent friction frizz. Save 10% when styled together.
          </p>
        </header>

        {/* Studio Interactive Stage */}
        <div className="pairing-stage-card">
          
          {/* Left: Selected Wig Preview & Switcher */}
          <div className="pairing-item-pane">
            <div className="pairing-image-box">
              <img 
                src={activeWig.image} 
                alt={activeWig.name} 
                className="pairing-hero-img" 
              />
              <button 
                type="button" 
                className="pairing-quick-look-btn"
                onClick={() => onQuickView && onQuickView(activeWig)}
                aria-label="Quick view wig"
              >
                <Eye size={14} /> Quick View
              </button>
            </div>

            <h3 className="pairing-title">{activeWig.name}</h3>
            <p className="pairing-desc">{activeWig.description}</p>

            {/* Wig Selector Thumbnails */}
            <div className="pairing-thumb-row">
              {WIGS.map((wig, idx) => (
                <button
                  key={wig.id}
                  type="button"
                  className={`pairing-thumb-btn ${idx === selectedWigIndex ? 'active' : ''}`}
                  onClick={() => setSelectedWigIndex(idx)}
                  aria-label={`Select ${wig.name}`}
                >
                  <img src={wig.image} alt="" />
                  <span>{wig.name.split(' ')[1] || 'Unit'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center Plus Divider */}
          <div className="pairing-plus-divider" aria-hidden="true">
            <span className="pairing-plus-circle">+</span>
          </div>

          {/* Right: Selected Scarf Preview & Switcher */}
          <div className="pairing-item-pane">
            <div className="pairing-image-box">
              <img 
                src={activeScarf.image} 
                alt={activeScarf.name} 
                className="pairing-hero-img" 
              />
              <button 
                type="button" 
                className="pairing-quick-look-btn"
                onClick={() => onQuickView && onQuickView(activeScarf)}
                aria-label="Quick view scarf"
              >
                <Eye size={14} /> Quick View
              </button>
            </div>

            <h3 className="pairing-title">{activeScarf.name}</h3>
            <p className="pairing-desc">{activeScarf.description}</p>

            {/* Scarf Selector Thumbnails */}
            <div className="pairing-thumb-row">
              {SCARVES.map((scarf, idx) => (
                <button
                  key={scarf.id}
                  type="button"
                  className={`pairing-thumb-btn ${idx === selectedScarfIndex ? 'active' : ''}`}
                  onClick={() => setSelectedScarfIndex(idx)}
                  aria-label={`Select ${scarf.name}`}
                >
                  <img src={scarf.image} alt="" />
                  <span>{scarf.name.includes('Edge') ? 'Edge Scarf' : 'Monogram'}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Pairing Summary & Add Bundle Bar */}
        <div className="pairing-checkout-bar">
          <div className="pairing-checkout-info">
            <div className="pairing-benefit-tag">Complete Hairline Protection Ritual</div>
            <div className="pairing-total-row">
              <span className="pairing-total-label">Pair Total:</span>
              <span className="pairing-was-price">£{bundleTotal}</span>
              <span className="pairing-now-price">£{bundleDiscounted}</span>
              <span className="pairing-save-chip">Save 10%</span>
            </div>
          </div>

          <button 
            type="button" 
            className={`pairing-bundle-btn ${isAdded ? 'added' : ''}`}
            onClick={handleBundleAdd}
          >
            {isAdded ? (
              <>
                <Check size={18} strokeWidth={2.5} /> Added to Bag
              </>
            ) : (
              <>
                <Plus size={18} /> Complete Pair to Bag
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
