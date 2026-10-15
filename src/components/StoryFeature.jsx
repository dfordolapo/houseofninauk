import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import GoldStroke from './GoldStroke';

const SPECIMEN_CARDS = [
  {
    id: 'specimen-raw-hair',
    num: '01',
    badge: 'ZERO CRUNCH',
    title: 'Single-Donor Raw Hair',
    subtitle: 'Pure movement, zero drama',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Cuticle Flow', value: '100% Unidirectional' },
      { label: 'Lifespan', value: 'Years, Not Weeks' },
      { label: 'Natural Texture', value: 'Holds Curls & Heat' },
      { label: 'Processing', value: 'Zero Acid Baths' }
    ],
    quote: 'Behaves, shines, and moves in the wind just like your own hair grew out of your scalp.'
  },
  {
    id: 'specimen-swiss-lace',
    num: '02',
    badge: 'THE GHOST MELT',
    title: 'Invisible Swiss HD Lace',
    subtitle: 'Zero lines, pure scalp',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Film Thickness', value: '0.02mm Whisper Thin' },
      { label: 'Knots', value: 'Micro-Bleached & Plucked' },
      { label: 'Complexion', value: 'Flawless on All Skin' },
      { label: 'Camera Test', value: 'Undetectable in 4K' }
    ],
    quote: 'So seamless people will genuinely ask who does your scalp.'
  },
  {
    id: 'specimen-uk-studio',
    num: '03',
    badge: 'READY TO WEAR',
    title: 'UK Studio Customization',
    subtitle: 'Bespoke finishing in London',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Handcrafted In', value: 'United Kingdom Studio' },
      { label: 'Hairline', value: 'Pre-Plucked & Graduated' },
      { label: 'Cap Comfort', value: 'All-Day Breathable Stretch' },
      { label: 'Wear Style', value: 'Glueless or Melted' }
    ],
    quote: 'Pre-plucked and customized strand-by-strand so you look salon-finished straight out of the box.'
  }
];

export default function StoryFeature() {
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const scrollToCard = (index) => {
    if (cardRefs[index]?.current) {
      cardRefs[index].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="our-story" className="section-wrapper story-section" aria-label="Our Story">
      <div className="container story-container">
        <div className="story-editorial-grid">

          {/* ── Left Column: Sticky Editorial Brand Story ── */}
          <div className="story-text-column">
            
            <h2 className="story-main-heading">
              A little more <GoldStroke>about us</GoldStroke>.
            </h2>

            <div className="story-paragraphs">
              <p className="story-p lead">
                No stiff hairlines. No crunchy synthetic surprises. No 45-minute wrestling matches in front of the bathroom mirror.
              </p>
              <p className="story-p">
                We started House of Nina in the UK with one simple standard: hair that moves like your own crown, stays soft for years, and melts on the very first try.
              </p>
              <p className="story-p">
                From single-donor raw tresses to whisper-thin Swiss HD lace, every unit is customized in our UK studio so you can throw it on, shake it out, and immediately look like your most expensive self.
              </p>
            </div>

            {/* Founder Quote Card */}
            <div className="story-quote-card">
              <div className="story-quote-mark" aria-hidden="true">“</div>
              <p className="story-quote-body">
                Your hair is the outfit you never take off — make it a main character moment.
              </p>
              <span className="story-quote-signature">
                — House of Nina Studio, United Kingdom
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="story-cta-row">
              <a 
                href="#featured-products" 
                className="story-primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('featured-products');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore the Collection</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href="#silk-pairing-atelier" 
                className="story-secondary-link"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('silk-pairing-atelier');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover Silk &amp; Lace Pairing →
              </a>
            </div>

          </div>

          {/* ── Right Column: Scroll-Stacking Specimen Cards Track ── */}
          <div className="story-stack-column">
            <div className="story-stack-track">
              {SPECIMEN_CARDS.map((card, idx) => (
                <div
                  key={card.id}
                  ref={cardRefs[idx]}
                  className="story-card-slot"
                  style={{ '--card-order': idx }}
                >
                  <div 
                    className="specimen-card stacking-card"
                    onClick={() => scrollToCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Card ${card.num}: ${card.title}. Click to view.`}
                    onKeyDown={(e) => { if (e.key === 'Enter') scrollToCard(idx); }}
                  >
                    {/* Card Content Top Bar (stays visible when stacked) */}
                    <div className="specimen-card-topbar">
                      <div className="specimen-number-box">
                        <span className="specimen-num-label">NO.</span>
                        <span className="specimen-num-val">{card.num}</span>
                      </div>
                      <span className="specimen-status-badge">{card.badge}</span>
                    </div>

                    {/* Specimen Visual Image */}
                    <div className="specimen-image-container">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="specimen-card-img" 
                        loading="lazy"
                      />
                      <div className="specimen-image-overlay" />
                      <span className="specimen-macro-tag">UK STUDIO SPEC</span>
                    </div>

                    {/* Specimen Information */}
                    <div className="specimen-card-body">
                      <div className="specimen-heading-group">
                        <h3 className="specimen-card-title">{card.title}</h3>
                        <span className="specimen-card-sub">{card.subtitle}</span>
                      </div>

                      {/* Metric Specs Grid */}
                      <div className="specimen-metrics-grid">
                        {card.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="specimen-metric-chip">
                            <span className="specimen-metric-label">{m.label}</span>
                            <span className="specimen-metric-value">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <p className="specimen-card-quote">
                        "{card.quote}"
                      </p>
                    </div>

                    {/* 24k Gold Hairline Border Frame */}
                    <div className="specimen-gold-border" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
