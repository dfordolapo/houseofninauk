import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Menu, Heart } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../data/wigData';

export default function Header({ 
  onOpenMobileMenu, 
  onOpenCart, 
  cartCount, 
  onOpenSearch, 
  onReturnToHero, 
  onOpenWishlist, 
  wishlistCount = 0,
  onSelectNavLink,
  navLinks = NAV_LINKS,
  isCollectionsActive = false
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamically synchronize the actual header height to CSS variable for pixel-perfect edge-to-edge alignment
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerWrapperRef.current) {
        const height = headerWrapperRef.current.offsetHeight;
        document.documentElement.style.setProperty('--site-header-height', `${height}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isCollectionsActive]);

  const handleLogoClick = (e) => {
    if (onReturnToHero) {
      e.preventDefault();
      onReturnToHero();
    }
  };

  return (
    <div className="header-sticky-wrapper" ref={headerWrapperRef}>
      {/* Top Banner - hidden on collections page to let top nav bar sit flush at very top */}
      {!isCollectionsActive && (
        <div className="top-bar">
          <span>{BRAND_INFO.announcement}</span>
        </div>
      )}

      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-outer-container">
          <div className="nav-pill-wrapper">
            {/* Brand Wordmark: Pinyon Script */}
            <a 
              href="#" 
              className="brand-wordmark" 
              onClick={handleLogoClick}
              aria-label="House of Nina Home"
            >
              House of Nina
            </a>

            {/* Desktop Center Links */}
            <nav className="nav-links desktop-only" aria-label="Primary Navigation">
              {navLinks.map((link) => {
                const isItemActive = isCollectionsActive && (link.id === 'wigs-scarves' || link.label === 'Collections');

                return (
                  <a 
                    key={link.id} 
                    href={link.href} 
                    className={`nav-link ${isItemActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSelectNavLink) {
                        onSelectNavLink(link.href);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Actions: Search, User, Bag, Mobile Menu */}
            <div className="nav-actions">
              <button 
                type="button" 
                className="icon-btn" 
                onClick={onOpenSearch} 
                aria-label="Search collection"
                title="Search"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>

              <button 
                type="button" 
                className="icon-btn wishlist-btn" 
                aria-label={`Wishlist with ${wishlistCount} saved looks`}
                title="Wishlist"
                onClick={() => onOpenWishlist()}
              >
                <Heart 
                  size={19} 
                  strokeWidth={1.8} 
                  fill={wishlistCount > 0 ? "var(--color-gold)" : "none"} 
                  color={wishlistCount > 0 ? "var(--color-gold)" : "currentColor"} 
                />
                {wishlistCount > 0 && (
                  <span key={`wishlist-${wishlistCount}`} className="bag-badge wishlist-badge animate-badge-pop">{wishlistCount}</span>
                )}
              </button>

              <button 
                type="button" 
                className="icon-btn bag-btn" 
                onClick={onOpenCart} 
                aria-label={`Shopping Bag with ${cartCount} items`}
                title="Shopping Bag"
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span key={`cart-${cartCount}`} className="bag-badge animate-badge-pop">{cartCount}</span>
                )}
              </button>

              {/* Mobile Hamburger Button with Gold Background and White Icon */}
              <button 
                type="button" 
                className="mobile-menu-circle-btn mobile-only" 
                onClick={onOpenMobileMenu}
                aria-label="Open Navigation Menu"
              >
                <Menu size={18} color="#FFFFFF" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
