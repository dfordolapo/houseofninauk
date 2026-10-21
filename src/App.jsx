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
import SearchModal from './components/SearchModal';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import CareGuideModal from './components/CareGuideModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AddedToBagModal from './components/AddedToBagModal';
import LookReviewsModal from './components/LookReviewsModal';
import LegalModal from './components/LegalModal';
import TrackOrderModal from './components/TrackOrderModal';
import FaqModal from './components/FaqModal';
import CheckoutModal from './components/CheckoutModal';
import { FEATURED_PRODUCTS } from './data/wigData';

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

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
        onAddToCart={handleAddToCart}
        onMoveAllToBag={handleMoveAllToBag}
      />

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
      />

      {/* PURE VIDEO QUICK VIEW MODAL (VIDEO ONLY) */}
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

      {/* FULL PRODUCT DETAILS & CUSTOMIZATION MODAL */}
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
        wishlist={wishlist}
      />

      <CareGuideModal 
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setDetailsProduct(prod)}
        onSelectCategory={handleSelectCategory}
        onToggleWishlist={handleToggleSave}
        wishlist={wishlist}
      />

      {/* ADDED TO BAG UPSELL & CROSS-SELL MODAL */}
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

      {/* INSTAGRAM-STYLE LOOK COMMENTS & REVIEWS MODAL */}
      <LookReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        post={activeReviewPost}
        onQuickView={handleInstagramQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* COMPREHENSIVE LEGAL & POLICIES MODAL (TERMS, PRIVACY NOTICE, RETURNS) */}
      <LegalModal
        isOpen={Boolean(legalModalTab)}
        initialTab={legalModalTab || 'terms'}
        onClose={() => setLegalModalTab(null)}
      />

      {/* TRACK ORDER REALTIME CONCIERGE MODAL */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      {/* CLIENT FAQS ACCORDION MODAL */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />
    </div>
  );
}
