import React from 'react';
import { BRAND_INFO, FOOTER_DATA } from '../data/wigData';
import { Instagram, Youtube } from 'lucide-react';

const FOOTER_HAIR_IMAGES = [
  '/images/hero/hero_1.jpg',
  '/images/hero/hero_3.jpg',
  '/images/hero/hero_5.jpg',
  '/images/hero/hero_7.jpg',
  '/images/hero/hero_9.jpg',
];

export default function Footer({ onOpenCareGuide }) {
  return (
    <footer className="site-footer" aria-label="Site Footer">

      {/* ── Hair Image Strip ── */}
      <div className="footer-image-strip" aria-hidden="true">
        {FOOTER_HAIR_IMAGES.map((src, i) => (
          <div key={i} className="footer-strip-tile">
            <img src={src} alt="" className="footer-strip-img" loading="lazy" />
            <div className="footer-strip-overlay" />
          </div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="footer-inner container">

        {/* Brand + tagline */}
        <div className="footer-brand-row">
          <a href="#" className="footer-brand-wordmark" aria-label="House of Nina Home">
            House of Nina
          </a>
          <p className="footer-brand-tagline">
            Handcrafted bespoke wigs &amp; luxury silk scarves. Made with love in the United Kingdom.
          </p>
          <span className="footer-heritage-badge">🇬🇧 United Kingdom</span>
        </div>

        {/* Link columns — compact horizontal grid */}
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

          {/* Social column */}
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

        {/* Bottom bar */}
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
