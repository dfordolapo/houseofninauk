import React from 'react';
import { BRAND_INFO, FOOTER_DATA } from '../data/wigData';

export default function Footer({ onOpenCareGuide }) {
  return (
    <footer className="site-footer" aria-label="Site Footer">

      {/* ── Main Content ── */}
      <div className="footer-inner container">

        <div className="footer-brand-row">
          <a href="#" className="footer-brand-wordmark" aria-label="House of Nina Home">
            House of Nina
          </a>
          <p className="footer-brand-tagline">
            Handcrafted bespoke wigs &amp; luxury silk scarves. Made with love in the United Kingdom.
          </p>
          <span className="footer-heritage-badge">🇬🇧 United Kingdom</span>
        </div>

        <div className="footer-links-grid">
          {FOOTER_DATA.columns.map((col, idx) => (
            <div key={idx} className="footer-link-group">
              <h4 className="footer-col-title">{col.title}</h4>
              <div className="footer-col-links">
                {col.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
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
                ))}
              </div>
            </div>
          ))}

          <div className="footer-link-group">
            <h4 className="footer-col-title">Follow Us</h4>
            <div className="footer-col-links">
              {FOOTER_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {BRAND_INFO.name} Ltd. All rights reserved.
          </p>
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
