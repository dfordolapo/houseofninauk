import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CampaignVideoLayer, { DEFAULT_CAMPAIGN_VIDEO_SRC } from './CampaignVideoLayer';

// Social Destinations
const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    href: 'https://instagram.com', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    name: 'TikTok', 
    href: 'https://tiktok.com', 
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    )
  },
  { 
    name: 'Pinterest', 
    href: 'https://pinterest.com', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.3 3.7-3.1 4-0.4 0-0.7-0.2-0.8-0.6l-0.7-2.8"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    )
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com', 
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
      </svg>
    )
  },
  { 
    name: 'X', 
    href: 'https://x.com', 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
];

export default function Footer({ onOpenCareGuide }) {
  // Mobile accordion state (all closed by default per specification)
  const [openAccordions, setOpenAccordions] = useState({
    shop: false,
    help: false,
    about: false
  });

  // Newsletter form state
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
      setErrorMessage('');
    }, 600);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="editorial-oversized-footer" aria-label="House of Nina Editorial Footer">

      {/* ===================================================================
          UNIFIED EDITORIAL FOOTER CANVAS (DESKTOP UNIFIED / MOBILE RESPONSIVE)
          =================================================================== */}
      <div className="footer-canvas-unified">

        {/* Layer B (Background Video): On web view, spans full canvas height so top is never cut off */}
        <CampaignVideoLayer 
          videoSrc={DEFAULT_CAMPAIGN_VIDEO_SRC}
          className="footer-campaign-video-unified"
        />

        {/* Layer B (Oversized Wordmark): Positioned behind hair across the lower spread */}
        <div className="editorial-oversized-wordmark-wrap" aria-hidden="true">
          <div className="wordmark-container">
            {/* Desktop Wordmark (Single Line with Slanted 'of') */}
            <div className="wordmark-text desktop-wordmark">
              <span className="wordmark-house">House</span>
              <span className="wordmark-of">of</span>
              <span className="wordmark-nina">Nina</span>
            </div>

            {/* Mobile Wordmark (Two Lines: 'House' / 'of Nina') */}
            <div className="wordmark-text mobile-wordmark">
              <span className="wordmark-line-1">House</span>
              <span className="wordmark-line-2">
                <span className="wordmark-of">of</span>
                <span className="wordmark-nina">Nina</span>
              </span>
            </div>
          </div>
        </div>

        {/* Layer A (Foreground Content): Newsletter & Multi-Column Navigation rendered over canvas */}
        <div className="container footer-content-container">

          {/* Desktop Multi-Column Layout / Mobile Top Newsletter */}
          <div className="footer-main-columns-grid">

            {/* Column 1: Newsletter — "Stay in the loop" */}
            <div className="footer-newsletter-col">
              <div className="newsletter-heading-wrap">
                <h3 className="newsletter-calligraphic-heading">
                  <span className="heading-stay">Stay in the </span>
                  <span className="heading-loop">loop</span>
                </h3>
                <p className="newsletter-supporting-copy">
                  New looks, restocks, exclusive drops and hair inspiration.
                </p>
              </div>

              {/* Clean Newsletter Form */}
              <form 
                onSubmit={handleNewsletterSubmit} 
                className="footer-email-form"
                noValidate
                aria-label="Newsletter Subscription"
              >
                <div className="footer-email-pill">
                  <input
                    id="footer-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formStatus === 'error') setFormStatus('idle');
                    }}
                    placeholder="Your email address"
                    className="footer-email-input"
                    aria-label="Your email address"
                    aria-required="true"
                    aria-invalid={formStatus === 'error'}
                    disabled={formStatus === 'loading'}
                  />
                  <button
                    type="submit"
                    className="footer-email-submit-btn"
                    aria-label="Subscribe"
                    disabled={formStatus === 'loading'}
                  >
                    <ArrowRight size={17} strokeWidth={2} />
                  </button>
                </div>

                {formStatus === 'error' && (
                  <p className="footer-form-feedback error" role="alert">
                    {errorMessage}
                  </p>
                )}
                {formStatus === 'success' && (
                  <p className="footer-form-feedback success" role="status">
                    Thank you. Your place in our private dispatch is reserved.
                  </p>
                )}
              </form>
            </div>

            {/* Column 2: SHOP */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">SHOP</h4>
              <ul className="footer-nav-list">
                <li><a href="#featured-products" className="footer-nav-link">Wigs</a></li>
                <li><a href="#silk-pairing-atelier" className="footer-nav-link">Silk Scarves</a></li>
                <li><a href="#find-your-next-look" className="footer-nav-link">Accessories</a></li>
                <li><a href="#featured-products" className="footer-nav-link">New In</a></li>
                <li><a href="#featured-products" className="footer-nav-link">Sale</a></li>
              </ul>
            </div>

            {/* Column 3: HELP */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">HELP</h4>
              <ul className="footer-nav-list">
                <li><a href="#details" className="footer-nav-link">Track Order</a></li>
                <li><a href="#details" className="footer-nav-link">Shipping</a></li>
                <li><a href="#details" className="footer-nav-link">Returns</a></li>
                <li>
                  <a 
                    href="#wig-care-guide" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      if (onOpenCareGuide) {
                        e.preventDefault();
                        onOpenCareGuide();
                      }
                    }}
                  >
                    Care Guide
                  </a>
                </li>
                <li><a href="#details" className="footer-nav-link">FAQs</a></li>
                <li><a href="#privacy" className="footer-nav-link">Privacy Policy</a></li>
                <li><a href="#terms" className="footer-nav-link">Terms of Service</a></li>
                <li><a href="#cookies" className="footer-nav-link">Cookies</a></li>
              </ul>
            </div>

            {/* Column 4: ABOUT */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">ABOUT</h4>
              <ul className="footer-nav-list">
                <li><a href="#our-story" className="footer-nav-link">Our Story</a></li>
                <li><a href="#hero" className="footer-nav-link">The Wigverse</a></li>
                <li><a href="#our-story" className="footer-nav-link">Sustainability</a></li>
                <li><a href="#contact" className="footer-nav-link">Contact</a></li>
              </ul>
            </div>

            {/* Desktop Social Icons: Placed under the other navigation sections */}
            <div className="footer-desktop-social-row desktop-only">
              <div className="footer-social-icons-row">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon-btn"
                    aria-label={`Follow House of Nina on ${item.name}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* =================================================================
              MOBILE ACCORDION NAVIGATION ROWS (Under Newsletter)
              ================================================================= */}
          <div className="footer-mobile-accordions">

            {/* Mobile Row: SHOP */}
            <div className="mobile-accordion-row">
              <button
                type="button"
                className="mobile-accordion-trigger"
                onClick={() => toggleAccordion('shop')}
                aria-expanded={openAccordions.shop}
              >
                <span className="mobile-accordion-title">SHOP</span>
                <span className="mobile-accordion-icon" aria-hidden="true">
                  {openAccordions.shop ? '−' : '+'}
                </span>
              </button>
              <div className={`mobile-accordion-content ${openAccordions.shop ? 'open' : ''}`}>
                <div className="mobile-accordion-inner">
                  <a href="#featured-products" className="mobile-nav-link">Wigs</a>
                  <a href="#silk-pairing-atelier" className="mobile-nav-link">Silk Scarves</a>
                  <a href="#find-your-next-look" className="mobile-nav-link">Accessories</a>
                  <a href="#featured-products" className="mobile-nav-link">New In</a>
                  <a href="#featured-products" className="mobile-nav-link">Sale</a>
                </div>
              </div>
            </div>

            {/* Mobile Row: HELP */}
            <div className="mobile-accordion-row">
              <button
                type="button"
                className="mobile-accordion-trigger"
                onClick={() => toggleAccordion('help')}
                aria-expanded={openAccordions.help}
              >
                <span className="mobile-accordion-title">HELP</span>
                <span className="mobile-accordion-icon" aria-hidden="true">
                  {openAccordions.help ? '−' : '+'}
                </span>
              </button>
              <div className={`mobile-accordion-content ${openAccordions.help ? 'open' : ''}`}>
                <div className="mobile-accordion-inner">
                  <a href="#details" className="mobile-nav-link">Track Order</a>
                  <a href="#details" className="mobile-nav-link">Shipping</a>
                  <a href="#details" className="mobile-nav-link">Returns</a>
                  <a 
                    href="#wig-care-guide" 
                    className="mobile-nav-link"
                    onClick={(e) => {
                      if (onOpenCareGuide) {
                        e.preventDefault();
                        onOpenCareGuide();
                      }
                    }}
                  >
                    Care Guide
                  </a>
                  <a href="#details" className="mobile-nav-link">FAQs</a>
                  <a href="#privacy" className="mobile-nav-link">Privacy Policy</a>
                  <a href="#terms" className="mobile-nav-link">Terms of Service</a>
                  <a href="#cookies" className="mobile-nav-link">Cookies</a>
                </div>
              </div>
            </div>

            {/* Mobile Row: ABOUT */}
            <div className="mobile-accordion-row">
              <button
                type="button"
                className="mobile-accordion-trigger"
                onClick={() => toggleAccordion('about')}
                aria-expanded={openAccordions.about}
              >
                <span className="mobile-accordion-title">ABOUT</span>
                <span className="mobile-accordion-icon" aria-hidden="true">
                  {openAccordions.about ? '−' : '+'}
                </span>
              </button>
              <div className={`mobile-accordion-content ${openAccordions.about ? 'open' : ''}`}>
                <div className="mobile-accordion-inner">
                  <a href="#our-story" className="mobile-nav-link">Our Story</a>
                  <a href="#hero" className="mobile-nav-link">The Wigverse</a>
                  <a href="#our-story" className="mobile-nav-link">Sustainability</a>
                  <a href="#contact" className="mobile-nav-link">Contact</a>
                </div>
              </div>
            </div>



            {/* Mobile Social Icons Row Under Accordions */}
            <div className="mobile-social-icons-bar">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon-btn"
                  aria-label={`Follow House of Nina on ${item.name}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}
