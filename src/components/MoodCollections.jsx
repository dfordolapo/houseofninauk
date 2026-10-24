import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MOOD_COLLECTIONS } from '../data/wigData';

export default function MoodCollections({ onSelectMood }) {
  return (
    <section className="section-wrapper" style={{ backgroundColor: 'var(--color-ivory-light)' }} aria-label="One Girl Many Looks">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Editorial Styling Directions</span>
          <h2 className="section-heading">One girl. Many looks.</h2>
        </header>

        <div className="mood-collections-grid">
          {MOOD_COLLECTIONS.map((mood) => (
            <div key={mood.id} className="mood-card">
              <div className="mood-image-wrapper">
                <img 
                  src={mood.image} 
                  alt={mood.title} 
                  className="mood-img" 
                  loading="lazy"
                  decoding="async"
                />
                <span className={`mood-accent-tag ${mood.accentColor}`}>
                  {mood.title}
                </span>
              </div>

              <div className="mood-content">
                <h3 className="mood-title">{mood.title}</h3>
                <p className="mood-subtitle">{mood.subtitle}</p>
                <p className="mood-desc">{mood.description}</p>

                <div className="mood-tags-list">
                  {mood.suggestedStyles.map((style, idx) => (
                    <span key={idx} className="mood-tag-item">
                      {style}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a 
                    href="#featured-products" 
                    className="product-explore-btn"
                    onClick={() => {
                      if (onSelectMood) onSelectMood(mood.title);
                    }}
                  >
                    <span>Explore this mood</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
