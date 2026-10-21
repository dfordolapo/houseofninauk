import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CampaignVideoLayer, { DEFAULT_CAMPAIGN_VIDEO_SRC } from './CampaignVideoLayer';

// Social Destinations (Instagram, WhatsApp, TikTok, Email)
const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/house_of_nina_uk/', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    name: 'WhatsApp', 
    href: 'https://wa.me/447776759731', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a0.5 0.5 0 0 0 1 0V9a0.5 0.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a0.5 0.5 0 0 0 0-1h-1a0.5 0.5 0 0 0 0 1" />
      </svg>
    )
  },
  { 
    name: 'TikTok', 
    href: 'https://www.tiktok.com/@houseofninaofficial', 
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    )
  },
  { 
    name: 'Email', 
    href: 'mailto:houseofnina2026@gmail.com', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    )
  }
];

export default function Footer({ 
  onOpenCareGuide, 
  onOpenLegal,
  onOpenTrackOrder,
  onOpenFaq,
  onFilterCategory 
}) {
  // Mobile accordion state (strictly mutually exclusive: at most one open at once)
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
    setOpenAccordions(prev => {
      const isCurrentlyOpen = prev[key];
      return {
        shop: false,
        help: false,
        about: false,
        [key]: !isCurrentlyOpen
      };
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <footer className="editorial-oversized-footer" aria-label="House of Nina Editorial Footer">

      {/* ===================================================================
          UNIFIED EDITORIAL FOOTER CANVAS (DESKTOP UNIFIED / MOBILE RESPONSIVE)
          =================================================================== */}
      <div className="footer-canvas-unified">

        {/* Layer B (Background Video with giant wordmark directly behind it) */}
        <CampaignVideoLayer 
          videoSrc={DEFAULT_CAMPAIGN_VIDEO_SRC}
          className="footer-campaign-video-unified"
        >
          {/* Giant Oversized Wordmark: Single line on both web and mobile, directly behind the video */}
          <div className="editorial-oversized-wordmark-wrap" aria-hidden="true">
            <div className="wordmark-container">
              <div className="wordmark-text single-line-wordmark">
                <span className="wordmark-house">House</span>
                <span className="wordmark-of">of</span>
                <span className="wordmark-nina">Nina</span>
              </div>
            </div>
          </div>
        </CampaignVideoLayer>

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

            {/* Column 2: SHOP (DESKTOP) */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">SHOP</h4>
              <ul className="footer-nav-list">
                <li>
                  <a 
                    href="#featured-products" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onFilterCategory) onFilterCategory('All');
                      scrollToSection('featured-products');
                    }}
                  >
                    Wigs
                  </a>
                </li>
                <li>
                  <a 
                    href="#silk-pairing-studio" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('silk-pairing-studio');
                    }}
                  >
                    Silk Scarves
                  </a>
                </li>
                <li>
                  <a 
                    href="#find-your-next-look" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('find-your-next-look');
                    }}
                  >
                    Accessories
                  </a>
                </li>
                <li>
                  <a 
                    href="#featured-products" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onFilterCategory) onFilterCategory('New');
                      scrollToSection('featured-products');
                    }}
                  >
                    New In
                  </a>
                </li>
                <li>
                  <a 
                    href="#featured-products" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onFilterCategory) onFilterCategory('Sale');
                      scrollToSection('featured-products');
                    }}
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: HELP (DESKTOP) */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">HELP</h4>
              <ul className="footer-nav-list">
                <li>
                  <a 
                    href="#track-order" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenTrackOrder) onOpenTrackOrder();
                    }}
                  >
                    Track Order
                  </a>
                </li>
                <li>
                  <a 
                    href="#shipping-returns" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      if (onOpenLegal) {
                        e.preventDefault();
                        onOpenLegal('shipping');
                      }
                    }}
                  >
                    Shipping &amp; Returns
                  </a>
                </li>
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
                <li>
                  <a 
                    href="#faqs" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenFaq) onOpenFaq();
                    }}
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a 
                    href="#privacy-cookies" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      if (onOpenLegal) {
                        e.preventDefault();
                        onOpenLegal('privacy');
                      }
                    }}
                  >
                    Privacy &amp; Cookies
                  </a>
                </li>
                <li>
                  <a 
                    href="#terms" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      if (onOpenLegal) {
                        e.preventDefault();
                        onOpenLegal('terms');
                      }
                    }}
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: ABOUT (DESKTOP) — The Wigverse REMOVED */}
            <div className="footer-nav-col desktop-only">
              <h4 className="footer-nav-heading">ABOUT</h4>
              <ul className="footer-nav-list">
                <li>
                  <a 
                    href="#our-story" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('our-story');
                    }}
                  >
                    Our Story
                  </a>
                </li>

                <li>
                  <a 
                    href="#contact" 
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Desktop Social Icons: Center-aligned across full footer width */}
            <div id="contact" className="footer-desktop-social-row desktop-only">
              <div className="footer-social-icons-row">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="footer-social-icon-btn"
                    aria-label={item.name === 'Email' ? 'Email House of Nina' : item.name === 'WhatsApp' ? 'Chat with House of Nina on WhatsApp' : `Follow House of Nina on ${item.name}`}
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
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onFilterCategory) onFilterCategory('All');
                      scrollToSection('featured-products');
                    }}
                  >
                    <span className="mobile-nav-link-text">Wigs</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => scrollToSection('silk-pairing-studio')}
                  >
                    <span className="mobile-nav-link-text">Silk Scarves</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => scrollToSection('find-your-next-look')}
                  >
                    <span className="mobile-nav-link-text">Accessories</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onFilterCategory) onFilterCategory('New');
                      scrollToSection('featured-products');
                    }}
                  >
                    <span className="mobile-nav-link-text">New In</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onFilterCategory) onFilterCategory('Sale');
                      scrollToSection('featured-products');
                    }}
                  >
                    <span className="mobile-nav-link-text">Sale</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
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
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenTrackOrder) onOpenTrackOrder();
                    }}
                  >
                    <span className="mobile-nav-link-text">Track Order</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenLegal) onOpenLegal('shipping');
                    }}
                  >
                    <span className="mobile-nav-link-text">Shipping &amp; Returns</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenCareGuide) onOpenCareGuide();
                    }}
                  >
                    <span className="mobile-nav-link-text">Care Guide</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenFaq) onOpenFaq();
                    }}
                  >
                    <span className="mobile-nav-link-text">FAQs</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenLegal) onOpenLegal('privacy');
                    }}
                  >
                    <span className="mobile-nav-link-text">Privacy &amp; Cookies</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => {
                      if (onOpenLegal) onOpenLegal('terms');
                    }}
                  >
                    <span className="mobile-nav-link-text">Terms of Service</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Row: ABOUT — The Wigverse REMOVED */}
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
                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => scrollToSection('our-story')}
                  >
                    <span className="mobile-nav-link-text">Our Story</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>

                  <button 
                    type="button"
                    className="mobile-nav-link"
                    onClick={() => scrollToSection('contact-mobile')}
                  >
                    <span className="mobile-nav-link-text">Contact</span>
                    <span className="mobile-nav-link-arrow">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Social Icons Row Under Accordions */}
            <div id="contact-mobile" className="mobile-social-icons-bar">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="mobile-social-icon-btn"
                  aria-label={item.name === 'Email' ? 'Email House of Nina' : item.name === 'WhatsApp' ? 'Chat with House of Nina on WhatsApp' : `Follow House of Nina on ${item.name}`}
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
