import React, { useState, useEffect, useRef } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Check, 
  Grid3X3, 
  LayoutGrid, 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  ShoppingBag, 
  Eye, 
  Star, 
  RotateCcw,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/wigData';

/**
 * Filter configuration with applicable choices for House of Nina catalogue
 */
const FILTER_CONFIG = {
  texture: {
    label: 'Texture',
    options: [
      { id: 'all', label: 'All Textures' },
      { id: 'straight', label: 'Bone Straight & Blunt Bobs' },
      { id: 'wave', label: 'Soft Body Wave' }
    ]
  },
  length: {
    label: 'Length',
    options: [
      { id: 'all', label: 'All Lengths' },
      { id: 'short', label: '10" – 14" (Classic Bobs)' },
      { id: 'mid', label: '20" – 24" (Mid-Back Length)' },
      { id: 'long', label: '26" – 28" (Waist Length)' },
      { id: 'wrap', label: 'Silk Scarf & Edge Wraps' }
    ]
  },
  colour: {
    label: 'Colour',
    options: [
      { id: 'all', label: 'All Colours' },
      { id: 'natural-black', label: '1B Natural Black' },
      { id: 'dark-espresso', label: '2 Dark Espresso' },
      { id: 'printed-silk', label: 'Artisan Printed Silks' }
    ]
  },
  capSize: {
    label: 'Cap Size',
    options: [
      { id: 'all', label: 'All Cap Sizes' },
      { id: 'small', label: 'Small (21.5")' },
      { id: 'medium', label: 'Medium (22.5" Standard)' },
      { id: 'large', label: 'Large (23.5")' }
    ]
  },
  price: {
    label: 'Price',
    options: [
      { id: 'all', label: 'All Prices' },
      { id: 'under-50', label: 'Under £50' },
      { id: '50-250', label: '£50 – £250' },
      { id: '250-350', label: '£250 – £350' },
      { id: 'over-350', label: '£350+' }
    ]
  }
};

/**
 * Exactly the 4 approved collections requested
 */
const COLLECTIONS_TABS = [
  { id: 'all', label: 'All Pieces', filterValue: 'All' },
  { id: 'wigs', label: 'Wigs & Units', filterValue: 'Wigs' },
  { id: 'scarves', label: 'Scarves', filterValue: 'Scarves' },
  { id: 'accessories', label: 'Accessories', filterValue: 'Accessories' }
];

const COLLECTION_HERO_CONTENT = {
  All: {
    breadcrumb: 'Collections',
    heading: 'All Products',
    sub: 'Explore our signature crown units and lustrous silks, made to elevate everyday elegance.'
  },
  Wigs: {
    breadcrumb: 'Wigs & Units',
    heading: 'Wigs & Units',
    sub: 'Handcrafted virgin hair crowns engineered with undetectable HD lace, raw natural textures, and effortless movement.'
  },
  Scarves: {
    breadcrumb: 'Scarves',
    heading: 'Silk Scarves',
    sub: 'Pure 100% Mulberry silk squares designed to preserve crown edges, lock in hydration, and add sculptural allure.'
  },
  Accessories: {
    breadcrumb: 'Accessories',
    heading: 'Curated Accessories',
    sub: 'Refined velvet grips, couture boundary bands, and gold styling essentials crafted for seamless crown wear.'
  }
};

const SORT_LABELS = {
  featured: 'Featured',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  rating: 'Highest Rated'
};

export default function CollectionsCatalogView({
  initialCategory = 'All',
  onBackToHome,
  onOpenDetails,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onOpenReviews,
  onOpenCart,
  cartCount = 0,
  onOpenSearch
}) {
  // Normalize initial category to one of the 4 tabs
  const getNormalizedCategory = (val) => {
    if (!val || val === 'All' || val === 'all') return 'All';
    if (val.toLowerCase().includes('wig') || val === 'col-wigs') return 'Wigs';
    if (val.toLowerCase().includes('scarf') || val === 'col-scarves') return 'Scarves';
    if (val.toLowerCase().includes('access') || val === 'col-accessories') return 'Accessories';
    return 'All';
  };

  const [activeTab, setActiveTab] = useState(getNormalizedCategory(initialCategory));
  const [sortBy, setSortBy] = useState('featured');
  const [gridMode, setGridMode] = useState('standard'); // 'standard' | 'editorial'
  const [addedId, setAddedId] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null); // Mobile tap card focus

  // Active filter state
  const [selectedTexture, setSelectedTexture] = useState('all');
  const [selectedLength, setSelectedLength] = useState('all');
  const [selectedColour, setSelectedColour] = useState('all');
  const [selectedCapSize, setSelectedCapSize] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  // Interactive dropdown and mobile drawer state
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(null);
  const dropdownContainerRef = useRef(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveTab(getNormalizedCategory(initialCategory));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [initialCategory]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // When switching collection tabs, handle obsolete filters appropriately
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setOpenDropdown(null);
    if (newTab === 'Scarves' || newTab === 'Accessories') {
      setSelectedTexture('all');
      setSelectedCapSize('all');
    }
    if (newTab === 'Accessories') {
      setSelectedLength('all');
      setSelectedColour('all');
    }
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      const defaultLength = product.options?.lengths?.[0] || '';
      const defaultLace = product.options?.laceTypes?.[0] || '';
      const defaultDensity = product.options?.densities?.[0] || '';
      onAddToCart({
        ...product,
        selectedLength: defaultLength,
        selectedLace: defaultLace,
        selectedDensity: defaultDensity,
        cartId: `${product.id}-${defaultLength}-${defaultLace}-${defaultDensity}`
      });
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1400);
    }
  };

  // Determine which filters are applicable for the active collection
  const getApplicableFilterKeys = () => {
    if (activeTab === 'Scarves') {
      return ['length', 'price'];
    }
    if (activeTab === 'Accessories') {
      return ['price'];
    }
    // 'All' and 'Wigs'
    return ['texture', 'length', 'colour', 'capSize', 'price'];
  };

  const applicableKeys = getApplicableFilterKeys();

  // Count active filters
  const activeFiltersCount = [
    applicableKeys.includes('texture') && selectedTexture !== 'all',
    applicableKeys.includes('length') && selectedLength !== 'all',
    applicableKeys.includes('colour') && selectedColour !== 'all',
    applicableKeys.includes('capSize') && selectedCapSize !== 'all',
    applicableKeys.includes('price') && selectedPrice !== 'all'
  ].filter(Boolean).length;

  const handleClearAllFilters = () => {
    setSelectedTexture('all');
    setSelectedLength('all');
    setSelectedColour('all');
    setSelectedCapSize('all');
    setSelectedPrice('all');
    setOpenDropdown(null);
  };

  // Filter products by collection and active filter parameters
  const filteredProducts = FEATURED_PRODUCTS.filter(p => {
    // 1. Collection Tab Filter
    if (activeTab === 'Wigs' && p.category !== 'Wigs') {
      return false;
    }
    if (activeTab === 'Scarves' && p.category !== 'Scarves') {
      return false;
    }
    if (activeTab === 'Accessories' && p.category !== 'Accessories') {
      return false;
    }

    // 2. Texture Filter (Applicable to Wigs / All)
    if (applicableKeys.includes('texture') && selectedTexture !== 'all') {
      const name = p.name.toLowerCase();
      const desc = (p.description || '').toLowerCase();
      if (selectedTexture === 'straight') {
        const isStraight = name.includes('straight') || name.includes('bob') || desc.includes('straight') || desc.includes('bob');
        if (!isStraight) return false;
      } else if (selectedTexture === 'wave') {
        const isWave = name.includes('wave') || desc.includes('wave');
        if (!isWave) return false;
      }
    }

    // 3. Length Filter
    if (applicableKeys.includes('length') && selectedLength !== 'all') {
      const lengths = p.options?.lengths || [];
      if (selectedLength === 'short') {
        const hasShort = lengths.some(l => l.includes('10"') || l.includes('12"') || l.includes('14"'));
        if (!hasShort) return false;
      } else if (selectedLength === 'mid') {
        const hasMid = lengths.some(l => l.includes('20"') || l.includes('24"'));
        if (!hasMid) return false;
      } else if (selectedLength === 'long') {
        const hasLong = lengths.some(l => l.includes('26"') || l.includes('28"'));
        if (!hasLong) return false;
      } else if (selectedLength === 'wrap') {
        const isWrap = p.category === 'Scarves' || lengths.some(l => l.includes('Square') || l.includes('Standard'));
        if (!isWrap) return false;
      }
    }

    // 4. Colour Filter
    if (applicableKeys.includes('colour') && selectedColour !== 'all') {
      if (selectedColour === 'natural-black' && p.category !== 'Wigs') return false;
      if (selectedColour === 'printed-silk' && p.category !== 'Scarves') return false;
    }

    // 5. Cap Size Filter
    if (applicableKeys.includes('capSize') && selectedCapSize !== 'all') {
      if (p.category !== 'Wigs') return false;
    }

    // 6. Price Filter
    if (applicableKeys.includes('price') && selectedPrice !== 'all') {
      if (selectedPrice === 'under-50' && p.price >= 50) return false;
      if (selectedPrice === '50-250' && (p.price < 50 || p.price > 250)) return false;
      if (selectedPrice === '250-350' && (p.price < 250 || p.price > 350)) return false;
      if (selectedPrice === 'over-350' && p.price <= 350) return false;
    }

    return true;
  });

  // Sort products
  const displayProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    return 0; // 'featured' keep curated order
  });

  const getFilterCurrentLabel = (key) => {
    if (key === 'texture') {
      return FILTER_CONFIG.texture.options.find(o => o.id === selectedTexture)?.label || 'Texture';
    }
    if (key === 'length') {
      return FILTER_CONFIG.length.options.find(o => o.id === selectedLength)?.label || 'Length';
    }
    if (key === 'colour') {
      return FILTER_CONFIG.colour.options.find(o => o.id === selectedColour)?.label || 'Colour';
    }
    if (key === 'capSize') {
      return FILTER_CONFIG.capSize.options.find(o => o.id === selectedCapSize)?.label || 'Cap Size';
    }
    if (key === 'price') {
      return FILTER_CONFIG.price.options.find(o => o.id === selectedPrice)?.label || 'Price';
    }
    return '';
  };

  const getFilterCurrentValue = (key) => {
    if (key === 'texture') return selectedTexture;
    if (key === 'length') return selectedLength;
    if (key === 'colour') return selectedColour;
    if (key === 'capSize') return selectedCapSize;
    if (key === 'price') return selectedPrice;
    return 'all';
  };

  const setFilterValue = (key, val) => {
    if (key === 'texture') setSelectedTexture(val);
    if (key === 'length') setSelectedLength(val);
    if (key === 'colour') setSelectedColour(val);
    if (key === 'capSize') setSelectedCapSize(val);
    if (key === 'price') setSelectedPrice(val);
    setOpenDropdown(null);
  };

  return (
    <div className="collections-catalog-page fade-in-from-top">
      
      {/* ── DESKTOP EDITORIAL HERO (HIDDEN ON MOBILE) ── */}
      <section 
        className="collections-editorial-hero-banner desktop-only"
        aria-label="Collections Editorial Banner"
      >
        <div className="hero-banner-inner">
          <img 
            src="/images/collections-hero-banner.webp" 
            alt="House of Nina signature hair crowns, lustrous Mulberry silks, and sculptural gold styling accessories"
            className="hero-banner-img"
            loading="eager"
            decoding="async"
          />
          <div className="hero-banner-gradient-mask" aria-hidden="true" />
          
          <div className="hero-banner-content">
            {/* Editorial Breadcrumbs (Matches Reference Mockup) */}
            <nav className="hero-banner-breadcrumbs" aria-label="Breadcrumbs">
              <button 
                type="button" 
                className="hero-breadcrumb-link" 
                onClick={onBackToHome}
              >
                Home
              </button>
              <span className="hero-breadcrumb-sep" aria-hidden="true">›</span>
              {activeTab === 'All' ? (
                <span className="hero-breadcrumb-current">Collections</span>
              ) : (
                <>
                  <button 
                    type="button" 
                    className="hero-breadcrumb-link" 
                    onClick={() => handleTabChange('All')}
                  >
                    Collections
                  </button>
                  <span className="hero-breadcrumb-sep" aria-hidden="true">›</span>
                  <span className="hero-breadcrumb-current">
                    {(COLLECTION_HERO_CONTENT[activeTab] || COLLECTION_HERO_CONTENT.All).breadcrumb}
                  </span>
                </>
              )}
            </nav>

            <h1 key={`hero-h1-${activeTab}`} className="hero-banner-heading hero-heading-fade">
              {(COLLECTION_HERO_CONTENT[activeTab] || COLLECTION_HERO_CONTENT.All).heading}
            </h1>
            <p key={`hero-sub-${activeTab}`} className="hero-banner-sub hero-sub-fade">
              {(COLLECTION_HERO_CONTENT[activeTab] || COLLECTION_HERO_CONTENT.All).sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE ── */}
      <main className="container collections-main-container">
        
        {/* ── COLLECTION NAVIGATION TABS (Directly Below Hero, Single Row Horizontal Scroll on Mobile) ── */}
        <nav 
          className="collections-tabs-bar" 
          role="tablist" 
          aria-label="Collections Category Navigation"
        >
          {COLLECTIONS_TABS.map((tab) => {
            const isActive = activeTab === tab.filterValue;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`collection-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.filterValue)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* ── FILTERS AND SORTING TOOLBAR ── */}
        <div className="collections-toolbar-row" ref={dropdownContainerRef}>
          {/* Left: Filter Buttons & Dropdowns */}
          <div className="collections-filters-group">
            {/* Main Filters Button */}
            <button 
              type="button" 
              className={`filter-pill-btn filter-trigger-main ${activeFiltersCount > 0 ? 'has-active' : ''}`}
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open filter controls"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="filter-count-badge">{activeFiltersCount}</span>
              )}
            </button>

            {/* Desktop Individual Filter Dropdowns (Texture, Length, Colour, Cap Size, Price) */}
            <div className="desktop-filters-dropdowns desktop-only">
              {applicableKeys.map((key) => {
                const config = FILTER_CONFIG[key];
                const currentVal = getFilterCurrentValue(key);
                const isSelected = currentVal !== 'all';
                const isOpen = openDropdown === key;

                return (
                  <div key={key} className="filter-dropdown-relative">
                    <button
                      type="button"
                      className={`filter-pill-btn filter-dropdown-trigger ${isSelected ? 'is-selected' : ''} ${isOpen ? 'is-open' : ''}`}
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      aria-haspopup="listbox"
                    >
                      <span>{isSelected ? getFilterCurrentLabel(key) : config.label}</span>
                      <ChevronDown size={13} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                    </button>

                    {/* Popover Dropdown Panel */}
                    {isOpen && (
                      <div className="filter-popover-menu" role="listbox">
                        <div className="popover-menu-header">
                          <span className="popover-title">{config.label}</span>
                          {isSelected && (
                            <button 
                              type="button" 
                              className="popover-reset-btn"
                              onClick={() => setFilterValue(key, 'all')}
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="popover-options-list">
                          {config.options.map((opt) => {
                            const isOptActive = currentVal === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                role="option"
                                aria-selected={isOptActive}
                                className={`popover-option-item ${isOptActive ? 'selected' : ''}`}
                                onClick={() => setFilterValue(key, opt.id)}
                              >
                                <span>{opt.label}</span>
                                {isOptActive && <Check size={14} className="popover-check" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Clear All Link when filters applied */}
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  className="filter-clear-all-inline"
                  onClick={handleClearAllFilters}
                  title="Clear all selected filters"
                >
                  <RotateCcw size={12} />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Sort By Dropdown */}
          <div className="collections-sort-group">
            <label htmlFor="collections-sort-select" className="sort-by-label desktop-only">
              Sort by:
            </label>
            <div className="sort-select-pill">
              <span className="sort-pill-content">
                <span className="sort-mobile-prefix mobile-only">Sort: </span>
                <span className="sort-display-value">
                  {SORT_LABELS[sortBy] || 'Featured'}
                </span>
              </span>
              <ChevronDown size={12} className="sort-chevron-icon" aria-hidden="true" />
              <select 
                id="collections-sort-select"
                className="collections-sort-native-select-overlay"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort collection products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar (Shown when any filters applied) */}
        {activeFiltersCount > 0 && (
          <div className="collections-active-chips-bar" aria-label="Applied filters">
            <span className="active-chips-label">Active:</span>
            {applicableKeys.map((key) => {
              const val = getFilterCurrentValue(key);
              if (val === 'all') return null;
              return (
                <span key={key} className="active-filter-chip">
                  <span>{FILTER_CONFIG[key].label}: {getFilterCurrentLabel(key)}</span>
                  <button 
                    type="button" 
                    onClick={() => setFilterValue(key, 'all')}
                    aria-label={`Remove ${FILTER_CONFIG[key].label} filter`}
                  >
                    <X size={11} />
                  </button>
                </span>
              );
            })}
            <button 
              type="button" 
              className="active-chips-clear-btn"
              onClick={handleClearAllFilters}
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── SUBTLE PRODUCT COUNT & VIEW CONTROLS ROW ── */}
        <div className="collections-meta-bar">
          <div className="collections-count-text">
            <span>{displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'}</span>
          </div>

          {/* Grid Toggle: 4-Column Standard vs 2-Column Editorial (Desktop only, redundant on mobile) */}
          <div className="collections-view-toggle desktop-only" role="group" aria-label="Product Grid Layout">
            <button
              type="button"
              className={`view-toggle-btn ${gridMode === 'standard' ? 'active' : ''}`}
              onClick={() => setGridMode('standard')}
              title="Standard Grid"
              aria-label="Standard Grid"
            >
              <Grid3X3 size={15} />
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${gridMode === 'editorial' ? 'active' : ''}`}
              onClick={() => setGridMode('editorial')}
              title="Editorial 2-Column View"
              aria-label="Editorial View"
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>

        {/* ── PRODUCT GRID (EXACT APPROVED PRODUCT CARDS PRESERVED UNCHANGED) ── */}
        {displayProducts.length === 0 ? (
          <div className="collections-empty-state">
            <h3 className="empty-title">No matching pieces found</h3>
            <p className="empty-desc">
              We couldn't find any creations matching your selected filter preferences.
            </p>
            <button 
              type="button" 
              className="btn-primary-editorial" 
              onClick={handleClearAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`collections-products-showcase-grid ${gridMode === 'editorial' ? 'is-editorial-layout' : ''}`}>
            {displayProducts.map((product) => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              const isCardActive = activeCardId === product.id;

              return (
                <article 
                  key={product.id} 
                  className={`product-card creative-product-card ${isCardActive ? 'is-active' : ''}`}
                  onClick={() => setActiveCardId(prev => prev === product.id ? null : product.id)}
                >
                  {/* Card Visual Container */}
                  <div className="product-image-container creative-img-box">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-img creative-product-img" 
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                      <span className="product-tag-badge creative-tag-badge">
                        {product.tag}
                      </span>
                    )}

                    {/* House of Nina Luxury Wax Seal Stamp */}
                    <div className="product-wax-seal-stamp" title="House of Nina Atelier Certified">
                      <img 
                        src="/images/wax-seal-stamp.webp" 
                        alt="House of Nina Atelier Seal" 
                        className="wax-seal-stamp-img"
                        width="36"
                        height="36"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Quick Floating Actions: Heart, Reviews, Quick Add */}
                    <div className="product-card-actions">
                      <button 
                        type="button" 
                        className={`product-action-circle-btn ${isWishlisted ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWishlist) onToggleWishlist(product);
                        }}
                        aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
                        title={isWishlisted ? "Saved" : "Save to wishlist"}
                      >
                        <Heart 
                          size={15} 
                          fill={isWishlisted ? "var(--color-gold)" : "none"} 
                          color={isWishlisted ? "var(--color-gold)" : "var(--color-deep-espresso)"} 
                          strokeWidth={isWishlisted ? 2.2 : 1.8}
                        />
                      </button>

                      <button 
                        type="button" 
                        className="product-action-circle-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenReviews) onOpenReviews(product);
                          else if (onOpenDetails) onOpenDetails(product);
                        }}
                        aria-label={`Client reviews for ${product.name}`}
                        title="Client Reviews"
                      >
                        <MessageCircle size={15} strokeWidth={1.8} />
                      </button>

                      <button 
                        type="button" 
                        className={`product-action-circle-btn ${addedId === product.id ? 'added' : ''}`}
                        onClick={(e) => handleQuickAdd(product, e)}
                        aria-label={`Quick add ${product.name} to bag`}
                        title="Quick Add to Bag"
                      >
                        {addedId === product.id ? (
                          <Check size={15} strokeWidth={2.4} color="#2E7D32" />
                        ) : (
                          <ShoppingBag size={15} strokeWidth={1.8} />
                        )}
                      </button>
                    </div>

                    {/* Quick View (Video preview) */}
                    <div className="product-quick-action">
                      <button 
                        type="button" 
                        className="btn-quick-view creative-quick-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onQuickView) onQuickView(product);
                        }}
                        aria-label={`Watch video preview of ${product.name}`}
                      >
                        <Eye size={13} /> <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details Body */}
                  <div className="product-details creative-details-box">
                    <div className="creative-card-top-row">
                      <span className="product-cat-pill">{product.category}</span>
                      <div className="creative-star-rating">
                        <Star size={12} fill="#D4AF7A" color="#D4AF7A" />
                        <span>5.0</span>
                      </div>
                    </div>

                    <h3 
                      className="product-title creative-product-title" 
                      onClick={() => onOpenDetails && onOpenDetails(product)}
                    >
                      {product.name}
                    </h3>

                    {/* Option Chips (Lengths, Lace Types) */}
                    <div className="product-options-row creative-options-row">
                      {product.options?.lengths?.slice(0, 3).map((len) => (
                        <span key={len} className="option-chip">{len}</span>
                      ))}
                      <span className="option-chip">{product.options?.laceTypes?.[0]?.split(' ')[0] || 'HD'} Lace</span>
                    </div>

                    {/* Price and Details CTA */}
                    <div className="product-bottom-row creative-bottom-row">
                      <div className="creative-price-wrap">
                        <span className="product-price">£{product.price}</span>
                      </div>
                      <button 
                        type="button" 
                        className="product-explore-btn creative-details-btn"
                        onClick={() => onOpenDetails && onOpenDetails(product)}
                        aria-label={`View full details for ${product.name}`}
                      >
                        <span>Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}



      </main>

      {/* ── MOBILE FILTER DRAWER (BOTTOM SHEET) ── */}
      {isMobileFilterOpen && (
        <div 
          className="mobile-filter-drawer-backdrop fade-in" 
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="mobile-filter-drawer-sheet slide-up" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
          >
            {/* Sheet Header */}
            <div className="drawer-header">
              <div className="drawer-title-group">
                <SlidersHorizontal size={16} />
                <span className="drawer-title">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="filter-count-badge">{activeFiltersCount}</span>
                )}
              </div>
              <button 
                type="button" 
                className="drawer-close-btn"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="drawer-content">
              {applicableKeys.map((key) => {
                const config = FILTER_CONFIG[key];
                const currentVal = getFilterCurrentValue(key);

                return (
                  <div key={key} className="drawer-filter-group">
                    <span className="drawer-group-label">{config.label}</span>
                    <div className="drawer-chips-wrap">
                      {config.options.map((opt) => {
                        const isOptActive = currentVal === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`drawer-option-pill ${isOptActive ? 'active' : ''}`}
                            onClick={() => setFilterValue(key, opt.id)}
                          >
                            <span>{opt.label}</span>
                            {isOptActive && <Check size={12} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Sheet Footer */}
            <div className="drawer-footer">
              <button 
                type="button" 
                className="drawer-clear-btn"
                onClick={handleClearAllFilters}
                disabled={activeFiltersCount === 0}
              >
                Clear all
              </button>
              <button 
                type="button" 
                className="drawer-apply-btn btn-primary-editorial"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                View {displayProducts.length} {displayProducts.length === 1 ? 'Result' : 'Results'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
