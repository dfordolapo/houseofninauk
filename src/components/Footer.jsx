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

      {/* ===================================================================
          LAYER C: DARK ESPRESSO BOTTOM LEGAL & TRUST BAR
          =================================================================== */}
      <div className="footer-layer-c-legal-bar">
        <div className="container footer-legal-bar-container">
          
          {/* Left: Dynamic Copyright */}
          <div className="legal-bar-col copyright-col">
            <p className="legal-copyright-text">
              &copy; {currentYear} House of Nina. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="legal-bar-col links-col">
            <a href="#terms" className="legal-link">Terms</a>
            <span className="legal-dot-separator" aria-hidden="true">&bull;</span>
            <a href="#privacy" className="legal-link">Privacy</a>
            <span className="legal-dot-separator" aria-hidden="true">&bull;</span>
            <a href="#cookies" className="legal-link">Cookies</a>
          </div>

          {/* Right / Centered: Payment Method Badges */}
          <div className="legal-bar-col payments-col">
            <div className="payment-badges-row" aria-label="Supported Payment Methods">
              
              {/* VISA */}
              <span className="payment-badge-pill visa-pill" title="Visa">
                <svg width="38" height="13" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.5 1.5L16.8 19H12L7.3 4.2C7 3.1 6.8 2.7 5.9 2.2C4.5 1.4 2.1 0.7 0 0.2L0.3 1.5C3.8 2.3 7 3.5 8.8 6.5L13.1 19H18.2L29.3 1.5H24.5Z" fill="#F8F4EE"/>
                  <path d="M34.5 13.5C34.5 9.2 28.5 9 28.5 7.1C28.5 6.3 29.3 5.4 31 5.2C32.1 5.1 34.2 5 36.5 6L37.2 2.7C35.7 2.2 33.7 1.8 31.2 1.8C25.5 1.8 21.5 4.8 21.5 9.2C21.5 12.4 24.3 14.2 26.5 15.3C28.7 16.4 29.5 17.1 29.5 18.1C29.5 19.6 27.7 20.2 26 20.2C23.6 20.2 21.3 19.5 19.7 18.7L18.8 22.2C20.6 23 23.3 23.6 26.1 23.6C32.1 23.6 34.5 19.8 34.5 13.5Z" fill="#F8F4EE"/>
                  <path d="M44.7 1.5L40.8 19H45.5L49.4 1.5H44.7Z" fill="#F8F4EE"/>
                  <path d="M58.7 1.5H54.2C52.8 1.5 51.7 1.9 51.1 3.3L43.8 19H48.7L49.7 16.2H55.7L56.3 19H60.6L58.7 1.5ZM51.1 12.5L53.5 5.8C53.5 5.8 54.2 4 54.5 3.2L55.1 6L56.7 12.5H51.1Z" fill="#F8F4EE"/>
                </svg>
              </span>

              {/* Mastercard */}
              <span className="payment-badge-pill mastercard-pill" title="Mastercard">
                <svg width="28" height="18" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="11" r="10" fill="#EB001B"/>
                  <circle cx="24" cy="11" r="10" fill="#F79E1B"/>
                  <path d="M18 3.5C20.2 5.3 21.6 8 21.6 11C21.6 14 20.2 16.7 18 18.5C15.8 16.7 14.4 14 14.4 11C14.4 8 15.8 5.3 18 3.5Z" fill="#FF5F00"/>
                </svg>
              </span>

              {/* Apple Pay */}
              <span className="payment-badge-pill applepay-pill" title="Apple Pay">
                <svg width="34" height="14" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.2 9.8C9.2 7.7 10.4 6.7 10.5 6.6C9.5 5.1 7.9 4.9 7.4 4.8C6 4.7 4.6 5.7 3.9 5.7C3.1 5.7 2 4.8 0.9 4.8C-0.5 4.8 -1.7 5.7 -2.4 6.9C-3.9 9.5 -2.8 13.4 -1.3 15.5C-0.6 16.6 0.2 17.7 1.3 17.6C2.3 17.5 2.8 16.9 4 16.9C5.2 16.9 5.6 17.6 6.8 17.6C8 17.6 8.7 16.6 9.4 15.5C10.2 14.3 10.6 13.2 10.6 13.1C10.5 13 9.2 12.5 9.2 9.8Z" transform="translate(4, 0)" fill="#F8F4EE"/>
                  <path d="M7 3.3C7.6 2.5 8 1.4 7.9 0.3C6.9 0.3 5.7 1 5.1 1.7C4.6 2.4 4.1 3.5 4.3 4.6C5.4 4.7 6.4 4 7 3.3Z" transform="translate(4, 0)" fill="#F8F4EE"/>
                  <text x="21" y="15" fill="#F8F4EE" fontFamily="sans-serif" fontSize="12" fontWeight="600" letterSpacing="-0.3">Pay</text>
                </svg>
              </span>

              {/* Klarna */}
              <span className="payment-badge-pill klarna-pill" title="Klarna">
                <span className="klarna-text">Klarna.</span>
              </span>

              {/* PayPal */}
              <span className="payment-badge-pill paypal-pill" title="PayPal">
                <svg width="42" height="13" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8 1.8H5.6C5.1 1.8 4.7 2.2 4.6 2.7L2.1 18.2C2.1 18.5 2.3 18.8 2.6 18.8H5.8C6.3 18.8 6.7 18.4 6.8 17.9L7.5 13.5C7.6 13 8 12.6 8.5 12.6H10.4C14.2 12.6 16.7 10.7 17.3 7C17.6 5.3 17.2 4 16.2 3.1C15.3 2.2 13.9 1.8 12.8 1.8Z" fill="#0079C1"/>
                  <path d="M15.4 7C14.8 10.7 12.3 12.6 8.5 12.6H6.6C6.1 12.6 5.7 13 5.6 13.5L4.4 20.8C4.3 21.1 4.5 21.4 4.8 21.4H8C8.5 21.4 8.9 21 9 20.5L9.6 16.6C9.7 16.1 10.1 15.7 10.6 15.7H12C15.2 15.7 17.3 14.1 17.9 11C18.2 9.5 17.9 8.3 17.1 7.5C16.5 8 15.8 8.4 15.4 7Z" transform="translate(3, -2)" fill="#00457C"/>
                  <text x="25" y="14" fill="#F8F4EE" fontFamily="sans-serif" fontSize="12" fontWeight="700" fontStyle="italic">PayPal</text>
                </svg>
              </span>

            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
