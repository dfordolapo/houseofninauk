import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import GoldStroke from './GoldStroke';

const SPECIMEN_CARDS = [
  {
    id: 'specimen-love-of-hair',
    num: '01',
    badge: 'BORN FROM LOVE',
    tag: 'THE ORIGIN',
    title: 'Born From a Love of Hair',
    subtitle: 'Created for Every Woman',
    image: '/images/about-us.png',
    imagePosition: 'center 31%',
    metrics: [
      { label: 'Origin', value: 'Personal Passion' },
      { label: 'Purpose', value: 'Confidence & Joy' },
      { label: 'Movement', value: 'Like Your Own Crown' },
      { label: 'Community', value: 'Compliments Shared' }
    ],
    quote: 'Long before becoming a brand, sourcing hair was something we loved doing for ourselves. The compliments and interest soon made us realise this passion could become something more.'
  },
  {
    id: 'specimen-fits-your-life',
    num: '02',
    badge: 'ACCESSIBLE LUXURY',
    tag: 'COLLECTIONS',
    title: 'Hair That Fits Your Life',
    subtitle: 'Human Hair & Replica Fibre',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Our Belief', value: 'No Budget Pressure' },
      { label: 'Human Hair', value: 'Raw Single-Donor' },
      { label: 'Innovation', value: 'Raw Replica Fibre' },
      { label: 'Versatility', value: 'Everyday to Glamour' }
    ],
    quote: 'Every woman deserves to look and feel beautiful without breaking the bank. Our collections bring together human hair and raw replica fibre, offering different ways to express your individuality.'
  },
  {
    id: 'specimen-welcome-house',
    num: '03',
    badge: 'MORE THAN HAIR',
    tag: 'THE EXPERIENCE',
    title: 'Welcome to Our House',
    subtitle: 'Wear Your Crown. With Confidence.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'The Experience', value: 'Thoughtful & Special' },
      { label: 'Dispatch', value: 'Little Details Matter' },
      { label: 'The Community', value: 'Every Version Celebrated' },
      { label: 'The Promise', value: 'Wear Your Crown' }
    ],
    quote: 'We believe the experience matters just as much as the product. We are building a house where beauty, individuality, and confidence come together with genuine passion.'
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
                We started House of Nina with one simple standard: hair that moves like your own crown, stays soft for years, and melts on the very first&nbsp;try.
              </p>
              <p className="story-p">
                At House of Nina, our story began with a genuine love for beautiful hair. Long before becoming a brand, sourcing hair was something we loved doing for ourselves, discovering styles and finding pieces that made us feel confident.
              </p>
              <p className="story-p">
                Whether exploring our virgin human hair or our signature Raw Hair Replica Fibre Collection, every piece is designed to help you express your individuality with effortless confidence, without breaking the bank.
              </p>
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
                    {/* Card Content Top Bar: Clean 'NO. 01' (stays visible when stacked) */}
                    <div className="specimen-card-topbar">
                      <div className="specimen-number-box">
                        <span className="specimen-num-label">NO.</span>
                        <span className="specimen-num-val">{card.num}</span>
                      </div>
                    </div>

                    {/* Specimen Visual Image */}
                    <div className="specimen-image-container">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="specimen-card-img" 
                        style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                        loading="lazy"
                      />
                      <div className="specimen-image-overlay" />
                      <span className="specimen-macro-tag">{card.tag || 'UK STUDIO SPEC'}</span>
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
