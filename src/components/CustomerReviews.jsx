import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/wigData';

export default function CustomerReviews() {
  return (
    <section className="section-wrapper" aria-label="Customer Reviews">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Client Voices</span>
          <h2 className="section-heading">The hair has been speaking.</h2>
        </header>

        <div className="reviews-grid">
          {CUSTOMER_REVIEWS.map((review) => (
            <article key={review.id} className="review-card">
              <div>
                <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-dusty-rose)" color="var(--color-dusty-rose)" />
                  ))}
                </div>
                <p className="review-quote">“{review.quote}”</p>
              </div>

              <div className="review-meta-row">
                <div>
                  <h3 className="reviewer-name">{review.author}</h3>
                  <span className="reviewer-city">{review.city} • <span style={{ color: 'var(--color-dusty-rose)' }}>{review.hairPurchased}</span></span>
                </div>
                <span className="reviewer-tag">
                  <CheckCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                  {review.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
