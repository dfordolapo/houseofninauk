import React from 'react';
import { ArrowRight } from 'lucide-react';
import { STORY_DATA } from '../data/wigData';

export default function StoryFeature() {
  return (
    <section id="our-story" className="section-wrapper" aria-label="Our Story">
      <div className="container-editorial">
        <div className="story-feature-card">
          <div className="story-image-wrap">
            <img 
              src={STORY_DATA.image} 
              alt="House of Nina Founder and Hair Studio Craft" 
              className="story-img"
              loading="lazy"
            />
          </div>

          <div className="story-content-wrap">
            <span className="story-badge">{STORY_DATA.badge}</span>
            <h2 className="story-heading">{STORY_DATA.heading}</h2>

            <div className="story-paragraphs">
              {STORY_DATA.content.map((p, idx) => (
                <p key={idx} className="story-p">{p}</p>
              ))}
            </div>

            <div className="story-quote-box">
              <p className="story-quote-text">{STORY_DATA.quote}</p>
              <span className="story-quote-author">— {STORY_DATA.author}</span>
            </div>

            <div style={{ marginTop: '24px' }}>
              <a 
                href="#style-categories" 
                className="product-explore-btn"
                style={{ fontSize: '14px' }}
              >
                <span>Discover the collections</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
