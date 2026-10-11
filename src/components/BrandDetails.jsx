import React from 'react';
import { BRAND_DETAILS } from '../data/wigData';

export default function BrandDetails() {
  return (
    <section id="details" className="section-wrapper" aria-label="The House of Nina Difference">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Standards of Excellence</span>
          <h2 className="section-heading">Good hair starts with the details.</h2>
        </header>

        <div className="brand-details-grid">
          {BRAND_DETAILS.map((detail) => (
            <div key={detail.id} className="detail-card">
              <span className="detail-step-number">{detail.step}</span>
              <h3 className="detail-title">{detail.title}</h3>
              <p className="detail-description">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
