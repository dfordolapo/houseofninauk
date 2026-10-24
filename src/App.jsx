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
import { FEATURED_PRODUCTS } from './data/wigData';

// Dynamic lazy imports for on-demand modals and administrative workflows
const SearchModal = React.lazy(() => import('./components/SearchModal'));
const ProductQuickViewModal = React.lazy(() => import('./components/ProductQuickViewModal'));
const ProductDetailsModal = React.lazy(() => import('./components/ProductDetailsModal'));
const CareGuideModal = React.lazy(() => import('./components/CareGuideModal'));
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

    const handleUrlChange = () => {
      setIsAdminOpen(checkIsAdminPath());
    };
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
        price: 245,
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
        // Record the current scroll position before locking
        const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        scrollPositionRef.current = currentScrollY;
        isLockedRef.current = true;

        // Compensate for scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        // Freeze body in place at the exact scroll offset
        document.body.style.position = 'fixed';
        document.body.style.top = `-${currentScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.classList.add('modal-scroll-locked');
        document.documentElement.classList.add('modal-scroll-locked');
      }
    } else {
      if (isLockedRef.current) {
        const savedScrollY = scrollPositionRef.current;
        isLockedRef.current = false;

        // Clear fixed body styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-scroll-locked');
        document.documentElement.classList.remove('modal-scroll-locked');

        // Instantly restore the exact previous scroll position
        window.scrollTo({
          top: savedScrollY,
          left: 0,
          behavior: 'instant'
        });
      }
    }

    return () => {
      if (isLockedRef.current) {
        const savedScrollY = scrollPositionRef.current;
        isLockedRef.current = false;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-scroll-locked');
        document.documentElement.classList.remove('modal-scroll-locked');
        window.scrollTo({
          top: savedScrollY,
          left: 0,
          behavior: 'instant'
        });
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
        : parseInt(String(post.price).replace(/[^\d]/g, ''), 10) || 245;

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
    setShowHero(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  const handleMoveToWishlist = (item) => {
    handleToggleSave(item);
    handleRemoveCartItem(item.cartId || item.id);
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

  const handleSelectNavLink = (hash) => {
    let targetId = (hash || '').replace('#', '');
    if (targetId === 'contact' && window.innerWidth <= 768) {
      targetId = 'contact-mobile';
    }
    const scrollToTarget = () => {
      const elem = document.getElementById(targetId) || document.getElementById('contact');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    };

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
            <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 40%, #FFFDF9 0%, #F8F3ED 60%, #EFE8DF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '24px', fontFamily: "'Inter', sans-serif" }}>
              <style>{`
                @keyframes luxuryPulseGlow {
                  0%, 100% { transform: scale(1); box-shadow: 0 10px 24px rgba(212, 175, 122, 0.22); }
                  50% { transform: scale(1.05); box-shadow: 0 16px 36px rgba(212, 175, 122, 0.38); }
                }
                @keyframes luxuryGlideLine {
                  0% { left: -45%; }
                  50% { left: 40%; }
                  100% { left: 100%; }
                }
                @keyframes luxuryFadeInCard {
                  from { opacity: 0; transform: translateY(12px) scale(0.98); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }
              `}</style>

              {/* Ambient Warm Golden Glow */}
              <div style={{ position: 'absolute', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(212, 175, 122, 0.18) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

              {/* Frosted Luxury Portal Card */}
              <div style={{ background: 'rgba(255, 255, 255, 0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(212, 175, 122, 0.35)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center', maxWidth: '420px', width: '100%', boxShadow: '0 25px 60px rgba(22, 17, 15, 0.08), 0 4px 16px rgba(212, 175, 122, 0.12)', position: 'relative', zIndex: 1, animation: 'luxuryFadeInCard 0.4s ease-out' }}>
                {/* Crown / Luxury Seal */}
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #FAF6F0 0%, #EFE5D8 100%)', border: '1.5px solid #D4AF7A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', animation: 'luxuryPulseGlow 2.5s ease-in-out infinite' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9A7B4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 12L2 9z"/>
                    <path d="M11 3 L8 9 L12 21 L16 9 L13 3"/>
                  </svg>
                </div>

                {/* Brand Name in Signature Italianno Cursive */}
                <h1 style={{ fontFamily: "'Italianno', cursive", fontSize: '3.6rem', color: '#1B1917', margin: '0 0 4px 0', fontWeight: 400, lineHeight: 1 }}>House of Nina</h1>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: '#8C7D70', letterSpacing: '0.24em', textTransform: 'uppercase', margin: '0 0 24px 0' }}>Admin Workspace</p>

                {/* Shimmering Gold Progress Track */}
                <div style={{ width: '150px', height: '3px', background: 'rgba(212, 175, 122, 0.22)', borderRadius: '99px', margin: '0 auto 14px auto', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, width: '45%', background: 'linear-gradient(90deg, #D4AF7A, #1B1917, #D4AF7A)', borderRadius: '99px', animation: 'luxuryGlideLine 1.6s ease-in-out infinite' }} />
                </div>

                <span style={{ fontSize: '0.74rem', color: '#9E9084', letterSpacing: '0.02em', fontStyle: 'italic' }}>Entering management console...</span>
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
    <div className={`wigverse-app ${showHero ? 'is-hero-active' : ''}`}>
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
      />

      <main id="main-content">
        {showHero ? (
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

            {/* SECTION 5: FEATURED PRODUCTS (Signature Rose Section) */}
            <FeaturedProducts 
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onOpenDetails={(prod) => setDetailsProduct(prod)}
              onAddToCart={handleAddToCart}
              activeFilter={activeFilter}
              onClearFilter={() => setActiveFilter('All')}
              onToggleWishlist={handleToggleSave}
              wishlist={wishlist}
              onOpenReviews={(prod) => {
                setActiveReviewPost(prod);
                setIsReviewsModalOpen(true);
              }}
            />

            {/* SECTION 6: THE SILK & LACE PAIRING STUDIO */}
            <SilkPairingAtelier 
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleSave}
              wishlist={wishlist}
            />

            {/* SECTION 7: OUR STORY — SCROLL-STACKING SPECIMEN CARDS */}
            <StoryFeature />

            {/* SECTION 8: THE WIG CARE GUIDE */}
            <CareFeature onOpenCareGuide={() => setIsCareGuideOpen(true)} />

            {/* EDITORIAL OVERSIZED WORDMARK FOOTER (LAYER A, B, C) */}
            <Footer 
              onOpenCareGuide={() => setIsCareGuideOpen(true)} 
              onOpenLegal={(tab) => setLegalModalTab(tab)}
              onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
              onOpenFaq={() => setIsFaqOpen(true)}
              onFilterCategory={(cat) => {
                setActiveFilter(cat);
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
            onShopSilkCare={() => {
              setIsCareGuideOpen(false);
              setShowHero(false);
              const target = document.getElementById('silk-pairing-studio') || document.getElementById('featured-products');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
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
