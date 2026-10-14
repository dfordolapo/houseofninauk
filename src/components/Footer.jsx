import React from 'react';
import { BRAND_INFO, FOOTER_DATA } from '../data/wigData';

export default function Footer({ onOpenCareGuide }) {
  return (
    <footer className="site-footer" aria-label="Site Footer">

      {/* ── Architectural Haute-Couture Scalloped Crown Crest (Unique Luxury Footer Silhouette) ── */}
      <div className="footer-sculpted-crest" aria-hidden="true">
        <svg
          viewBox="0 0 1440 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="footer-crest-svg"
        >
          <defs>
            <linearGradient id="footerGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-gold-light)" stopOpacity="0.4" />
              <stop offset="25%" stopColor="var(--color-gold)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFF2D6" stopOpacity="1" />
              <stop offset="75%" stopColor="var(--color-gold)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--color-gold-light)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="footerGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="-3" stdDeviation="6" floodColor="rgba(197, 160, 89, 0.4)" />
            </filter>
          </defs>

          {/* Deep espresso silhouette body filling down into footer */}
          <path
            d="M 0,110 L 0,68 C 220,68 340,88 520,78 C 620,70 668,16 720,16 C 772,16 820,70 920,78 C 1100,88 1220,68 1440,68 L 1440,110 Z"
            fill="var(--color-deep-espresso)"
          />

          {/* Couture 24k Gold Hairline Contour Ribbon */}
          <path
            d="M 0,68 C 220,68 340,88 520,78 C 620,70 668,16 720,16 C 772,16 820,70 920,78 C 1100,88 1220,68 1440,68"
            stroke="url(#footerGoldGrad)"
            strokeWidth="1.8"
            filter="url(#footerGlow)"
          />

          {/* Atelier Shoulder Gem Accents */}
          <circle cx="520" cy="78" r="2.5" fill="var(--color-gold)" opacity="0.85" />
          <circle cx="520" cy="78" r="5.5" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
          <circle cx="920" cy="78" r="2.5" fill="var(--color-gold)" opacity="0.85" />
          <circle cx="920" cy="78" r="5.5" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />

          {/* Royal Apex Atelier Seal Medallion */}
          <g transform="translate(720, 16)">
            <circle cx="0" cy="0" r="14" stroke="url(#footerGoldGrad)" strokeWidth="1" fill="var(--color-deep-espresso)" />
            <path d="M 0,-7 L 7,0 L 0,7 L -7,0 Z" fill="var(--color-gold)" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

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
