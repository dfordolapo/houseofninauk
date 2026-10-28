import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import WigverseHero from './components/WigverseHero';
import StyleCategories from './components/StyleCategories';
import FeaturedProducts from './components/FeaturedProducts';
import MoodCollections from './components/MoodCollections';
import BrandDetails from './components/BrandDetails';
import CareFeature from './components/CareFeature';
import StoryFeature from './components/StoryFeature';
import CustomerReviews from './components/CustomerReviews';
import SilkPairingAtelier from './components/SilkPairingAtelier';
import CinematicVideoBanner from './components/CinematicVideoBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { FEATURED_PRODUCTS, NAV_LINKS, HOUSE_COLLECTIONS_CONFIG } from './data/wigData';

// Dynamic lazy imports for on-demand views, modals, and administrative workflows
const CollectionsCatalogView = React.lazy(() => import('./components/CollectionsCatalogView'));
const SearchModal = React.lazy(() => import('./components/SearchModal'));
const ProductQuickViewModal = React.lazy(() => import('./components/ProductQuickViewModal'));
const ProductDetailsModal = React.lazy(() => import('./components/ProductDetailsModal'));
import CareGuideModal from './components/CareGuideModal';
const WishlistDrawer = React.lazy(() => import('./components/WishlistDrawer'));
const AddedToBagModal = React.lazy(() => import('./components/AddedToBagModal'));
const LookReviewsModal = React.lazy(() => import('./components/LookReviewsModal'));
const LegalModal = React.lazy(() => import('./components/LegalModal'));
const TrackOrderModal = React.lazy(() => import('./components/TrackOrderModal'));
const FaqModal = React.lazy(() => import('./components/FaqModal'));
const CheckoutModal = React.lazy(() => import('./components/CheckoutModal'));
const OrderSuccessReceipt = React.lazy(() => import('./components/OrderSuccessReceipt'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

const CART_STORAGE_KEY = 'house_of_nina_cart_v1';
const WISHLIST_STORAGE_KEY = 'house_of_nina_wishlist_v1';
const SEEN_HERO_STORAGE_KEY = 'house_of_nina_seen_welcome_v1';

export default function App() {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dedicated Collection Page State (#collections or ?page=collections)
  const checkIsCollectionsPath = () => {
    try {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return hash === '#collections' || hash === '#all-collections' || params.get('page') === 'collections';
    } catch {
      return false;
    }
  };

  const [isCollectionsPageOpen, setIsCollectionsPageOpen] = useState(checkIsCollectionsPath);
  const [collectionsActiveCategory, setCollectionsActiveCategory] = useState('All');
  
  // Cart & Wishlist states - loaded from localStorage per browser
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});

  // Direct Order Success modal support (via ?preview=success or window.openOrderSuccessModal())
  const [isPreviewSuccessOpen, setIsPreviewSuccessOpen] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('preview') === 'success' || params.get('preview') === 'order-success';
    } catch {
      return false;
    }
  });

  // Dedicated Admin Route (/admin, #admin, #/admin, or ?admin=true)
  const checkIsAdminPath = () => {
    try {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return path === '/admin' || hash === '#admin' || hash === '#/admin' || params.get('admin') === 'true';
    } catch {
      return false;
    }
  };

  const [isAdminOpen, setIsAdminOpen] = useState(checkIsAdminPath);

  useEffect(() => {
    window.openOrderSuccessModal = () => setIsPreviewSuccessOpen(true);
    window.closeOrderSuccessModal = () => setIsPreviewSuccessOpen(false);

    window.openAdminPortal = () => {
      window.history.pushState(null, '', '/admin');
      setIsAdminOpen(true);
    };
    window.closeAdminPortal = () => {
      window.history.pushState(null, '', '/');
      setIsAdminOpen(false);
    };

    const checkProductParam = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const prodId = params.get('product');
        if (prodId) {
          const match = FEATURED_PRODUCTS.find(p => p.id === prodId || (p.slug && p.slug === prodId));
          if (match) {
            setDetailsProduct(match);
          }
        }
      } catch (e) {}
    };

    const handleUrlChange = () => {
      setIsAdminOpen(checkIsAdminPath());
      setIsCollectionsPageOpen(checkIsCollectionsPath());
      checkProductParam();
    };
    checkProductParam();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    const handleKeyDown = (e) => {
      // Alt + A to toggle Admin
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen(prev => {
          const next = !prev;
          if (next) window.history.pushState(null, '', '/admin');
          else window.history.pushState(null, '', '/');
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    return [
      {
        id: "hn-01",
        cartId: "hn-01-12-13x4-180",
        name: "The Victoria Glass Bob",
        price: 10.00,
        selectedLength: "12\"",
        selectedLace: "13x4 HD Lace Frontal",
        selectedDensity: "180%",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        quantity: 1
      }
    ];
  });

  // Added To Bag Upsell Modal State
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [addedProductForModal, setAddedProductForModal] = useState(null);

  // Look Reviews / Comments Modal State
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [activeReviewPost, setActiveReviewPost] = useState(null);

  // Quick View (Pure Video) Modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Product Details (Options & Specs) Modal state
  const [detailsProduct, setDetailsProduct] = useState(null);

  // Care Guide Modal state
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Legal Modal state ('terms' | 'privacy' | 'shipping' | null)
  const [legalModalTab, setLegalModalTab] = useState(null);

  // Track Order & FAQs Modal states
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Centralized Modal Background Scroll-Lock & Position Preservation:
  // When ANY modal or drawer is open, freeze the background at the exact scroll position
  // When closed, restore the exact scroll position seamlessly
  const scrollPositionRef = useRef(0);
  const isLockedRef = useRef(false);

  const isAnyModalOpen = Boolean(
    isMobileMenuOpen || 
    isCartOpen || 
    isWishlistOpen || 
    isCheckoutOpen ||
    quickViewProduct || 
    detailsProduct || 
    isCareGuideOpen || 
    isSearchOpen || 
    isAddedModalOpen || 
    isReviewsModalOpen ||
    legalModalTab ||
    isTrackOrderOpen ||
    isFaqOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      if (!isLockedRef.current) {
        isLockedRef.current = true;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.classList.add('modal-scroll-locked');
        document.documentElement.classList.add('modal-scroll-locked');
      }
    } else {
      if (isLockedRef.current) {
        isLockedRef.current = false;
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-scroll-locked');
        document.documentElement.classList.remove('modal-scroll-locked');
      }
    }

    return () => {
      if (isLockedRef.current) {
        isLockedRef.current = false;
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-scroll-locked');
        document.documentElement.classList.remove('modal-scroll-locked');
      }
    };
  }, [isAnyModalOpen]);

  // Wishlist state (saved looks) - loaded from localStorage per browser
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load wishlist from localStorage', e);
    }
    return [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Toggle product in wishlist
  const handleToggleSave = (post) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === post.id);
      if (exists) {
        return prev.filter(item => item.id !== post.id);
      }
      const priceNum = typeof post.price === 'number' 
        ? post.price 
        : parseInt(String(post.price).replace(/[^\d]/g, ''), 10) || 10;

      const normalizedItem = {
        ...post,
        name: post.productName || post.name || 'House of Nina Unit',
        price: priceNum,
        category: post.category || 'Wigs'
      };
      return [...prev, normalizedItem];
    });
  };

  // Active Category Filter for Featured Products
  const [activeFilter, setActiveFilter] = useState('All');

  // Hero display and transition states (shows once per browser, then loads landing page directly)
  const [showHero, setShowHero] = useState(() => {
    try {
      const hasSeen = localStorage.getItem(SEEN_HERO_STORAGE_KEY);
      return hasSeen !== 'true';
    } catch (e) {
      return true;
    }
  });
  const [isHeroFadingOut, setIsHeroFadingOut] = useState(false);

  // Deep-linked product URL handling (e.g. from shared Instagram cards)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prodQuery = params.get('product');
      if (prodQuery) {
        setShowHero(false);
        const match = FEATURED_PRODUCTS.find(p => 
          p.id.toLowerCase() === prodQuery.toLowerCase() || 
          p.name.toLowerCase().includes(prodQuery.toLowerCase())
        );
        if (match) {
          setTimeout(() => {
            setDetailsProduct(match);
            const el = document.getElementById('featured-products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      }
    } catch (e) {
      console.warn('URL product param handling error', e);
    }
  }, []);

  const handleEnterStore = () => {
    if (!showHero || isHeroFadingOut) return;
    setIsHeroFadingOut(true);
    try {
      localStorage.setItem(SEEN_HERO_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Failed to save seen welcome state to localStorage', e);
    }
    // Cinematic portal dive into image before revealing store (680ms)
    setTimeout(() => {
      setShowHero(false);
      setIsHeroFadingOut(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 680);
  };

  const handleReturnToHero = () => {
    // When the brand name in topnav is clicked, navigate smoothly to the site landing page (never the door screen)
    setShowHero(false);
    if (isCollectionsPageOpen) {
      setIsCollectionsPageOpen(false);
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product, { isSilent = false } = {}) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === product.cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === product.cartId 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (!isSilent) {
      setQuickViewProduct(null);
      setAddedProductForModal(product);
      setIsAddedModalOpen(true);
    }
  };

  const handleRemoveCartItem = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const handleMoveToWishlist = (item, removeFromBag = false) => {
    // Ensure item is saved to lookbook/wishlist
    const targetId = item.productId || item.id;
    setWishlist(prev => {
      const exists = prev.some(saved => (saved.id === targetId || saved.id === item.id || saved.id === item.cartId));
      if (exists) return prev;
      const priceNum = typeof item.price === 'number' 
        ? item.price 
        : parseInt(String(item.price).replace(/[^\d]/g, ''), 10) || 10;
      return [...prev, {
        ...item,
        id: targetId,
        name: item.name || item.productName || 'House of Nina Unit',
        price: priceNum,
        category: item.category || 'Wigs'
      }];
    });

    if (removeFromBag) {
      handleRemoveCartItem(item.cartId || item.id);
    }
  };

  const handleProceedToCheckout = (data = {}) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleMoveAllToBag = () => {
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const handleSelectCategory = (catName) => {
    setActiveFilter(catName);
    const elem = document.getElementById('featured-products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstagramQuickView = (instaPost) => {
    const matchedProduct = FEATURED_PRODUCTS.find(p => p.category === instaPost.category) || FEATURED_PRODUCTS[0];
    setQuickViewProduct({
      ...matchedProduct,
      name: instaPost.productName || matchedProduct.name,
      image: instaPost.image || matchedProduct.image
    });
  };

  const handleOpenCollectionsPage = (category = 'All') => {
    setCollectionsActiveCategory(category);
    setIsCollectionsPageOpen(true);
    try {
      window.history.pushState({ page: 'collections' }, '', '#collections');
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromCollectionsPage = () => {
    setIsCollectionsPageOpen(false);
    try {
      window.history.pushState(null, '', window.location.pathname);
    } catch (e) {}
    const elem = document.getElementById('featured-products');
    if (elem) {
      setTimeout(() => elem.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const handleSelectNavLink = (hash) => {
    let targetId = (hash || '').replace('#', '');
    if (targetId === 'contact' && window.innerWidth <= 768) {
      targetId = 'contact-mobile';
    }
    
    // If user clicks Collections link from top nav or mobile menu, navigate to full collections catalog page
    if (targetId === 'featured-products' || targetId === 'collections' || targetId === 'wigs-scarves') {
      setIsMobileMenuOpen(false);
      handleOpenCollectionsPage('All');
      return;
    }

    const scrollToTarget = () => {
      const elem = document.getElementById(targetId) || document.getElementById('contact');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (isCollectionsPageOpen) {
      setIsCollectionsPageOpen(false);
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch (e) {}
      setTimeout(scrollToTarget, 100);
      return;
    }

    if (showHero) {
      setShowHero(false);
      setTimeout(scrollToTarget, 150);
    } else {
      scrollToTarget();
    }
  };

  // Standalone Admin Workspace: Never render or flash the live storefront when Admin is open or loading!
  if (isAdminOpen) {
    return (
      <div className="adminStandaloneRoot" style={{ minHeight: '100vh', background: '#FAF7F2' }}>
        <React.Suspense
          fallback={
            <div className="admin-loading-root">
              <style>{`
                .admin-loading-root {
                  min-height: 100vh;
                  background: radial-gradient(circle at 50% 40%, #FFFDF9 0%, #F8F3ED 60%, #EFE8DF 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  overflow: hidden;
                  padding: 24px;
                  font-family: 'Manrope', -apple-system, sans-serif;
                }
                .admin-loading-aura {
                  position: absolute;
                  width: 440px;
                  height: 440px;
                  background: radial-gradient(circle, rgba(212, 175, 122, 0.22) 0%, transparent 70%);
                  filter: blur(60px);
                  pointer-events: none;
                  animation: adminGlowPulse 4s ease-in-out infinite;
                }
                .admin-loading-card {
                  background: rgba(255, 255, 255, 0.94);
                  backdrop-filter: blur(28px);
                  -webkit-backdrop-filter: blur(28px);
                  border: 1px solid rgba(212, 175, 122, 0.35);
                  border-radius: 28px;
                  padding: 44px 34px 40px 34px;
                  text-align: center;
                  max-width: 420px;
                  width: 92%;
                  box-shadow: 0 25px 60px rgba(26, 20, 18, 0.08), 0 6px 20px rgba(212, 175, 122, 0.12);
                  position: relative;
                  z-index: 1;
                  animation: adminFadeIn 0.4s ease-out;
                }
                .admin-loading-logo {
                  max-height: 86px;
                  width: auto;
                  max-width: 210px;
                  object-fit: contain;
                  display: block;
                  margin: 0 auto 24px auto;
                  animation: adminLogoFloat 3.2s ease-in-out infinite;
                }
                .admin-loading-track {
                  width: 130px;
                  height: 3px;
                  background: rgba(212, 175, 122, 0.24);
                  border-radius: 99px;
                  margin: 0 auto 16px auto;
                  overflow: hidden;
                  position: relative;
                }
                .admin-loading-bar {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  width: 45%;
                  background: linear-gradient(90deg, #D4AF7A, #C5A059, #1A1412, #C5A059, #D4AF7A);
                  border-radius: 99px;
                  animation: adminProgressBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .admin-loading-status {
                  font-size: 0.7rem;
                  color: #8C7D70;
                  letter-spacing: 0.16em;
                  font-weight: 600;
                  text-transform: uppercase;
                  display: block;
                }
                @keyframes adminLogoFloat {
                  0%, 100% { transform: translateY(0); filter: drop-shadow(0 8px 18px rgba(197, 160, 89, 0.2)); }
                  50% { transform: translateY(-4px); filter: drop-shadow(0 14px 26px rgba(197, 160, 89, 0.32)); }
                }
                @keyframes adminGlowPulse {
                  0%, 100% { transform: scale(1); opacity: 0.28; }
                  50% { transform: scale(1.1); opacity: 0.45; }
                }
                @keyframes adminProgressBar {
                  0% { transform: translateX(-100%); }
                  50% { transform: translateX(25%); }
                  100% { transform: translateX(200%); }
                }
                @keyframes adminFadeIn {
                  from { opacity: 0; transform: translateY(12px) scale(0.98); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* EXPANSIVE LUXURY PRESENTATION ON DESKTOP (WEB) */
                @media (min-width: 769px) {
                  .admin-loading-card {
                    max-width: 620px;
                    width: 90%;
                    border-radius: 36px;
                    padding: 76px 68px 68px 68px;
                    box-shadow: 0 35px 80px rgba(26, 20, 18, 0.09), 0 10px 30px rgba(212, 175, 122, 0.16);
                  }
                  .admin-loading-logo {
                    max-height: 145px;
                    max-width: 350px;
                    margin-bottom: 38px;
                  }
                  .admin-loading-track {
                    width: 210px;
                    height: 3.5px;
                    margin-bottom: 22px;
                  }
                  .admin-loading-status {
                    font-size: 0.82rem;
                    letter-spacing: 0.22em;
                  }
                  .admin-loading-aura {
                    width: 720px;
                    height: 720px;
                    filter: blur(90px);
                  }
                }
              `}</style>

              {/* Ambient Warm Golden Aura */}
              <div className="admin-loading-aura" />

              {/* Frosted Executive Portal Card */}
              <div className="admin-loading-card">
                {/* Actual House of Nina Crest Logo (Transparent Background Format) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img 
                    src="/images/logo.png" 
                    alt="House of Nina" 
                    className="admin-loading-logo"
                  />
                </div>

                {/* Shimmering Gold Progress Track */}
                <div className="admin-loading-track">
                  <div className="admin-loading-bar" />
                </div>

                <span className="admin-loading-status">
                  Loading...
                </span>
              </div>
            </div>
          }
        >
          <AdminDashboard
            isOpen={true}
            onClose={() => {
              setIsAdminOpen(false);
              try { window.history.pushState(null, '', '/'); } catch (e) {}
            }}
            onSwitchToStorefront={() => {
              setIsAdminOpen(false);
              try { window.history.pushState(null, '', '/'); } catch (e) {}
            }}
          />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div className={`wigverse-app ${showHero ? 'is-hero-active' : ''} ${isCollectionsPageOpen ? 'is-collections-active' : ''}`}>
      {/* SECTION 1: NAVIGATION */}
      <Header 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onReturnToHero={handleReturnToHero}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectNavLink={handleSelectNavLink}
        navLinks={NAV_LINKS}
        isCollectionsActive={isCollectionsPageOpen}
      />

      <main id="main-content">
        {isCollectionsPageOpen ? (
          <React.Suspense fallback={
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8F5F0', color: '#1C1614', gap: '16px' }}>
              <div style={{ width: '38px', height: '38px', border: '2px solid rgba(197,160,89,0.2)', borderTopColor: '#C5A059', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A827A' }}>Loading House Collections...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          }>
            <CollectionsCatalogView 
              initialCategory={collectionsActiveCategory}
              onBackToHome={handleBackFromCollectionsPage}
              onOpenDetails={(prod) => setDetailsProduct(prod)}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleSave}
              wishlist={wishlist}
              onOpenReviews={(prod) => {
                setActiveReviewPost(prod);
                setIsReviewsModalOpen(true);
              }}
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          </React.Suspense>
        ) : showHero ? (
          <div className={`hero-transition-wrap ${isHeroFadingOut ? 'fade-out' : ''}`}>
            <WigverseHero onEnterStore={handleEnterStore} />
          </div>
        ) : (
          <div className="store-content-wrap fade-in-from-top">
            {/* SECTION 4: FIND YOUR NEXT LOOK (INSTAGRAM-STYLE EDITORIAL FEED) */}
            <StyleCategories 
              onSelectCategory={handleSelectCategory} 
              onQuickView={handleInstagramQuickView}
              onToggleWishlist={handleToggleSave}
              wishlist={wishlist}
              onOpenReviews={(post) => {
                setActiveReviewPost(post);
                setIsReviewsModalOpen(true);
              }}
            />

            {/* CINEMATIC AUTOPLAY VIDEO BANNER (Movement Without Weight) */}
            <CinematicVideoBanner />

            {/* SECTION 5: THE HOUSE COLLECTIONS SLIDESHOW SHOWCASE */}
            <FeaturedProducts 
              onOpenCollection={handleOpenCollectionsPage}
            />

            {/* SECTION 6: THE SILK & LACE PAIRING STUDIO */}
            <SilkPairingAtelier 
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleSave}
              wishlist={wishlist}
            />

            {/* SECTION 7: OUR STORY — SCROLL-STACKING SPECIMEN CARDS */}
            <StoryFeature onOpenCollections={handleOpenCollectionsPage} />

            {/* SECTION 8: THE WIG CARE GUIDE */}
            <CareFeature onOpenCareGuide={() => setIsCareGuideOpen(true)} />

            {/* EDITORIAL OVERSIZED WORDMARK FOOTER (LAYER A, B, C) */}
            <Footer 
              onOpenCareGuide={() => setIsCareGuideOpen(true)} 
              onOpenLegal={(tab) => setLegalModalTab(tab)}
              onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
              onOpenFaq={() => setIsFaqOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenWishlist={() => setIsWishlistOpen(true)}
              onFilterCategory={(cat) => {
                handleOpenCollectionsPage(cat);
              }}
            />
          </div>
        )}
      </main>

      {/* OVERLAY COMPONENTS */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCart={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
        cartCount={cartItems.length}
        onOpenSearch={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
        onSelectNavLink={handleSelectNavLink}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
        navLinks={NAV_LINKS}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onMoveToWishlist={handleMoveToWishlist}
        onClearCart={() => setCartItems([])}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
      />

      {/* ON-DEMAND MODALS & DRAWERS (LAZY LOADED & CODE-SPLIT) */}
      <React.Suspense fallback={null}>
        {isWishlistOpen && (
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlist={wishlist}
            onRemoveItem={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
            onAddToCart={handleAddToCart}
            onMoveAllToBag={handleMoveAllToBag}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            checkoutData={checkoutData}
            onClearCart={() => setCartItems([])}
            onOpenCart={() => {
              setIsCheckoutOpen(false);
              setIsCartOpen(true);
            }}
            onOpenTrackOrder={() => {
              setIsCheckoutOpen(false);
              setIsTrackOrderOpen(true);
            }}
            onOpenLegal={(tab) => setLegalModalTab(tab)}
          />
        )}

        {/* LUXURY BESPOKE RIBBON ORDER SUCCESS MODAL */}
        {isPreviewSuccessOpen && (
          <OrderSuccessReceipt
            isOpen={isPreviewSuccessOpen}
            onClose={() => setIsPreviewSuccessOpen(false)}
            onContinueShopping={() => setIsPreviewSuccessOpen(false)}
          />
        )}

        {/* PURE VIDEO QUICK VIEW MODAL (VIDEO ONLY) */}
        {Boolean(quickViewProduct) && (
          <ProductQuickViewModal 
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onOpenDetails={(prod) => {
              setQuickViewProduct(null);
              setDetailsProduct(prod);
            }}
            onToggleWishlist={handleToggleSave}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* FULL PRODUCT DETAILS & CUSTOMIZATION MODAL */}
        {Boolean(detailsProduct) && (
          <ProductDetailsModal
            product={detailsProduct}
            isOpen={!!detailsProduct}
            onClose={() => setDetailsProduct(null)}
            onAddToCart={handleAddToCart}
            onOpenVideo={(prod) => {
              setDetailsProduct(null);
              setQuickViewProduct(prod);
            }}
            onToggleWishlist={handleToggleSave}
            onOpenReviews={(prod) => {
              setActiveReviewPost(prod);
              setIsReviewsModalOpen(true);
            }}
            wishlist={wishlist}
          />
        )}

        {isCareGuideOpen && (
          <CareGuideModal 
            isOpen={isCareGuideOpen}
            onClose={() => setIsCareGuideOpen(false)}
            onShopCollections={() => {
              setIsCareGuideOpen(false);
              handleOpenCollectionsPage('All');
            }}
          />
        )}

        {isSearchOpen && (
          <SearchModal 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={(prod) => setDetailsProduct(prod)}
            onSelectCategory={handleSelectCategory}
            onToggleWishlist={handleToggleSave}
            wishlist={wishlist}
          />
        )}

        {/* ADDED TO BAG UPSELL & CROSS-SELL MODAL */}
        {isAddedModalOpen && (
          <AddedToBagModal
            isOpen={isAddedModalOpen}
            onClose={() => setIsAddedModalOpen(false)}
            addedProduct={addedProductForModal}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onOpenCart={() => {
              setIsAddedModalOpen(false);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* INSTAGRAM-STYLE LOOK COMMENTS & REVIEWS MODAL */}
        {isReviewsModalOpen && (
          <LookReviewsModal
            isOpen={isReviewsModalOpen}
            onClose={() => setIsReviewsModalOpen(false)}
            post={activeReviewPost}
            onQuickView={handleInstagramQuickView}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* COMPREHENSIVE LEGAL & POLICIES MODAL (TERMS, PRIVACY NOTICE, RETURNS) */}
        {Boolean(legalModalTab) && (
          <LegalModal
            isOpen={Boolean(legalModalTab)}
            initialTab={legalModalTab || 'terms'}
            onClose={() => setLegalModalTab(null)}
          />
        )}

        {/* TRACK ORDER REALTIME CONCIERGE MODAL */}
        {isTrackOrderOpen && (
          <TrackOrderModal
            isOpen={isTrackOrderOpen}
            onClose={() => setIsTrackOrderOpen(false)}
          />
        )}

        {/* CLIENT FAQS ACCORDION MODAL */}
        {isFaqOpen && (
          <FaqModal
            isOpen={isFaqOpen}
            onClose={() => setIsFaqOpen(false)}
          />
        )}

        {/* HOUSE OF NINA ADMIN DASHBOARD */}
        {isAdminOpen && (
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => {
              setIsAdminOpen(false);
              try {
                if (window.location.pathname.toLowerCase().startsWith('/admin')) {
                  window.history.pushState(null, '', '/');
                } else if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
                  window.history.pushState(null, '', window.location.pathname + window.location.search);
                }
              } catch (e) {
                console.warn(e);
              }
            }}
            onSwitchToStorefront={() => {
              setIsAdminOpen(false);
              try {
                if (window.location.pathname.toLowerCase().startsWith('/admin')) {
                  window.history.pushState(null, '', '/');
                } else if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
                  window.history.pushState(null, '', window.location.pathname + window.location.search);
                }
              } catch (e) {
                console.warn(e);
              }
            }}
          />
        )}
      </React.Suspense>
    </div>
  );
}
