import React, { useEffect } from 'react';
import { X, Search, ShoppingBag } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../data/wigData';

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  onOpenCart, 
  cartCount, 
  onOpenSearch, 
  onSelectNavLink, 
  onOpenLegal,
  navLinks = NAV_LINKS 
}) {
  const [activeLinkId, setActiveLinkId] = React.useState('shop');


  const handleLinkClick = (link) => {
    setActiveLinkId(link.id);
    if (onSelectNavLink) {
      onSelectNavLink(link.href);
    }
    setTimeout(() => {
      onClose();
    }, 140);
  };

  return (
    <>
      <div 
        className={`mobile-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        role="dialog" 
        aria-modal="true" 
        aria-label="Navigation Menu"
      >
        <div>
          <div className="mobile-drawer-header">
            <a href="#" className="brand-wordmark" onClick={onClose}>
              House of Nina
            </a>
            <button 
              type="button" 
              className="icon-btn" 
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          <nav>
            <ul className="mobile-nav-links">
              {navLinks.map((link) => {
                const isActive = activeLinkId === link.id;
                return (
                  <li key={link.id} className="mobile-nav-item">
                    <a 
                      href={link.href} 
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link);
                      }}
                    >
                      <span className="mobile-nav-link-text">{link.label}</span>
                      <span className="mobile-nav-link-arrow">›</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mobile-drawer-footer">
          <button 
            type="button" 
            className="btn-primary-editorial" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '13px' }}
            onClick={() => { onClose(); onOpenSearch(); }}
          >
            <Search size={16} /> Search Catalog
          </button>
          <div className="mobile-drawer-legal-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', fontSize: '11px', color: '#8C8074' }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenLegal) onOpenLegal('privacy');
              }}
              style={{ background: 'none', border: 'none', padding: 0, color: '#5C5146', textDecoration: 'none', cursor: 'pointer', font: 'inherit', fontSize: '11px' }}
            >
              Privacy &amp; Cookies
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenLegal) onOpenLegal('terms');
              }}
              style={{ background: 'none', border: 'none', padding: 0, color: '#5C5146', textDecoration: 'none', cursor: 'pointer', font: 'inherit', fontSize: '11px' }}
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
