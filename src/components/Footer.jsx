import React from 'react';
import { BRAND_INFO, FOOTER_DATA } from '../data/wigData';

export default function Footer({ onOpenCareGuide }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <a href="#" className="footer-brand-wordmark" aria-label="House of Nina Home">
              House of Nina
            </a>
            <p className="footer-brand-tagline">
              Handcrafted bespoke wigs and luxury silk hair scarves. Tailored with care in the United Kingdom.
            </p>
            <div className="footer-heritage-badge">
              <span>🇬🇧 United Kingdom</span>
            </div>
          </div>

          {/* Grouped Columns */}
          {FOOTER_DATA.columns.map((col, idx) => (
            <div key={idx} className="footer-col">
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-links-list">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href} 
                      className="footer-link"
                      onClick={(e) => {
                        if (link.label === 'Wig Care Guide' && onOpenCareGuide) {
                          e.preventDefault();
                          onOpenCareGuide();
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Socials, Copyright & Payment Badges */}
        <div className="footer-bottom-bar">
          <div>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} {BRAND_INFO.name} Ltd. All rights reserved.
            </p>
          </div>

          <div className="footer-social-links">
            {FOOTER_DATA.socials.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="footer-social-btn"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="footer-payment-badges">
            {FOOTER_DATA.payments.map((p) => (
              <span key={p} className="payment-chip">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
