import React, { useState, useEffect } from 'react';
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
import NewsletterSignup from './components/NewsletterSignup';
import SilkPairingAtelier from './components/SilkPairingAtelier';
import CinematicVideoBanner from './components/CinematicVideoBanner';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CareGuideModal from './components/CareGuideModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AddedToBagModal from './components/AddedToBagModal';
import LookReviewsModal from './components/LookReviewsModal';
import { FEATURED_PRODUCTS } from './data/wigData';

export default function App() {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
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
  ]);

  // Added To Bag Upsell Modal State
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [addedProductForModal, setAddedProductForModal] = useState(null);

  // Look Reviews / Comments Modal State
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [activeReviewPost, setActiveReviewPost] = useState(null);

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Care Guide Modal state
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Centralized Modal Background Scroll-Lock:
  // When ANY modal or drawer is open, lock the document body so nothing else can scroll
  const isAnyModalOpen = Boolean(
    isMobileMenuOpen || 
    isCartOpen || 
    isWishlistOpen || 
    quickViewProduct || 
    isCareGuideOpen || 
    isSearchOpen || 
    isAddedModalOpen || 
    isReviewsModalOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add('modal-scroll-locked');
      document.documentElement.classList.add('modal-scroll-locked');
    } else {
      document.body.classList.remove('modal-scroll-locked');
      document.documentElement.classList.remove('modal-scroll-locked');
    }

    return () => {
      document.body.classList.remove('modal-scroll-locked');
      document.documentElement.classList.remove('modal-scroll-locked');
    };
  }, [isAnyModalOpen]);

  // Wishlist state (saved looks)
  const [wishlist, setWishlist] = useState([]);

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

  // Hero display and transition states
  const [showHero, setShowHero] = useState(true);
  const [isHeroFadingOut, setIsHeroFadingOut] = useState(false);

  const handleEnterStore = () => {
    if (!showHero || isHeroFadingOut) return;
    setIsHeroFadingOut(true);
    // Fast fade & switch (350ms)
    setTimeout(() => {
      setShowHero(false);
      setIsHeroFadingOut(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 360);
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

  return (
    <div className="wigverse-app">
      {/* SECTION 1: NAVIGATION */}
      <Header 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onReturnToHero={handleReturnToHero}
        onOpenWishlist={() => setIsWishlistOpen(true)}
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
              onAddToCart={handleAddToCart}
              activeFilter={activeFilter}
              onClearFilter={() => setActiveFilter('All')}
            />

            {/* SECTION 6: THE SILK & LACE PAIRING ATELIER */}
            <SilkPairingAtelier 
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
            />

            {/* SECTION 8: THE WIG CARE GUIDE */}
            <CareFeature onOpenCareGuide={() => setIsCareGuideOpen(true)} />

            {/* SECTION 12: FOOTER */}
            <Footer onOpenCareGuide={() => setIsCareGuideOpen(true)} />
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
        onSelectNavLink={(hash) => {
          if (showHero) {
            setShowHero(false);
          }
          setTimeout(() => {
            const targetId = hash.replace('#', '');
            const elem = document.getElementById(targetId);
            if (elem) {
              elem.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
        onAddToCart={handleAddToCart}
      />

      <ProductQuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CareGuideModal 
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        onSelectCategory={handleSelectCategory}
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
    </div>
  );
}
