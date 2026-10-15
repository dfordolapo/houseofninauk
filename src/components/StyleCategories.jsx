import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, ShoppingBag, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { INSTA_POSTS } from '../data/wigData';
import GoldStroke from './GoldStroke';

export default function StyleCategories({ onSelectCategory, onQuickView, onToggleWishlist, onOpenReviews, wishlist = [] }) {
  const [activeTagPostId, setActiveTagPostId] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const toggleLike = (post) => {
    if (onToggleWishlist) {
      onToggleWishlist(post);
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveSlideIndex(Math.min(Math.max(newIndex, 0), INSTA_POSTS.length - 1));
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveSlideIndex(index);
    }
  };

  const scrollPrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section id="find-your-next-look" className="section-wrapper instagram-style-section" aria-label="Find Your Next Look Instagram Feed">
      <div className="container">
        
        {/* Editorial Section Header with Carousel Arrows */}
        <header className="section-header insta-carousel-header">
          <div>
            <h2 className="section-heading">Find your <GoldStroke>next look</GoldStroke>.</h2>
          </div>
          <div className="insta-carousel-nav-btns">
            <button 
              type="button" 
              className="insta-carousel-nav-btn" 
              onClick={scrollPrev}
              aria-label="Previous card"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              className="insta-carousel-nav-btn" 
              onClick={scrollNext}
              aria-label="Next card"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </header>

        {/* Swipable Instagram Posts Slideshow */}
        <div 
          className="insta-posts-slider" 
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {INSTA_POSTS.map((post) => {
            const isLiked = wishlist.some(item => item.id === post.id);
            const isTagOpen = activeTagPostId === post.id;

            return (
              <article key={post.id} className="insta-post-card">
                {/* Post Header */}
                <div className="insta-post-header">
                  <div className="insta-author-info">
                    <div className="author-avatar-wrap">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="House of Nina" className="author-avatar-img" />
                    </div>
                    <div>
                      <h3 className="author-name">houseofnina</h3>
                      <span className="author-location">United Kingdom</span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="insta-more-btn" 
                    aria-label="Look reviews & options"
                    onClick={() => onOpenReviews && onOpenReviews(post)}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Post Image with Product Tagging */}
                <div 
                  className="insta-image-container"
                  onDoubleClick={() => toggleLike(post)}
                >
                  <img src={post.image} alt={post.productName} className="insta-post-img" loading="lazy" />
                  
                  {/* Tag Toggle Button */}
                  <button 
                    type="button" 
                    className={`insta-tag-pill-btn ${isTagOpen ? 'tag-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTagPostId(isTagOpen ? null : post.id);
                    }}
                    aria-label="Toggle product tag"
                  >
                    <Tag size={13} />
                    <span>{post.category}</span>
                  </button>

                  {/* Interactive Shopping Tag Overlay */}
                  {isTagOpen && (
                    <div className="insta-product-tag-bubble animate-pop">
                      <div className="tag-bubble-content">
                        <span className="tag-product-name">{post.productName}</span>
                        <span className="tag-product-price">{post.price}</span>
                      </div>
                      <button 
                        type="button" 
                        className="tag-shop-now-btn"
                        onClick={() => {
                          if (onQuickView) onQuickView(post);
                        }}
                      >
                        Shop
                      </button>
                    </div>
                  )}
                </div>

                {/* Post Action Icons Bar (Saved icon removed, comments icon triggers reviews like Instagram) */}
                <div className="insta-actions-bar">
                  <div className="insta-left-actions">
                    <button 
                      type="button" 
                      className={`insta-action-btn ${isLiked ? 'liked' : ''}`}
                      onClick={() => toggleLike(post)}
                      aria-label="Like post"
                    >
                      <Heart 
                        size={22} 
                        fill={isLiked ? "var(--color-gold)" : "none"} 
                        color={isLiked ? "var(--color-gold)" : "var(--color-deep-espresso)"} 
                      />
                    </button>
                    
                    {/* Comments icon: direct reviews section trigger */}
                    <button 
                      type="button" 
                      className="insta-action-btn" 
                      onClick={() => onOpenReviews && onOpenReviews(post)}
                      aria-label="View and write reviews"
                      title="Comments & Reviews"
                    >
                      <MessageCircle size={22} color="var(--color-deep-espresso)" />
                    </button>

                    <button 
                      type="button" 
                      className="insta-action-btn" 
                      aria-label="Share post"
                      onClick={() => alert("Link copied to clipboard! Share this look with friends.")}
                    >
                      <Send size={20} color="var(--color-deep-espresso)" />
                    </button>
                  </div>
                </div>

                {/* Likes Counter */}
                <div className="insta-likes-count">
                  <span>{isLiked ? 'Liked by you and ' + post.likes + ' others' : post.likes + ' likes'}</span>
                </div>

                {/* Caption */}
                <div className="insta-caption-box">
                  <p className="insta-caption-text">
                    <strong className="caption-author">houseofnina</strong> {post.caption}
                  </p>
                </div>

                {/* Quick Shop Action Footer */}
                <div className="insta-post-footer-cta">
                  <a 
                    href="#featured-products"
                    className="insta-shop-look-link"
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(post.category);
                    }}
                  >
                    <ShoppingBag size={13} />
                    <span>Shop {post.category}</span>
                  </a>
                  <span className="insta-post-time">{post.timeAgo}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Slideshow Pagination Indicator Dots */}
        <div className="insta-slider-dots">
          {INSTA_POSTS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`insta-slider-dot ${activeSlideIndex === dotIdx ? 'active' : ''}`}
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
