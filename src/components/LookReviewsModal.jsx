import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Send, Check, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function LookReviewsModal({
  isOpen,
  onClose,
  post,
  onQuickView,
  onAddToCart
}) {
  const [reviews, setReviews] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Initialize or update reviews whenever post/product changes
  useEffect(() => {
    if (post) {
      const storageKey = `house_of_nina_reviews_${post.id}`;
      let storedList = null;
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) storedList = JSON.parse(raw);
      } catch (e) {
        console.warn('Failed to parse stored reviews', e);
      }

      setReviews(storedList || post.reviewsList || [
        { id: `default-1-${post.id}`, author: "Maya T.", rating: 5, time: "30m ago", verified: true, text: "The lace melted seamlessly! Looks completely natural even in daylight." },
        { id: `default-2-${post.id}`, author: "Chloe B.", rating: 5, time: "2h ago", verified: true, text: "Best hair purchase I've made this year. High density and minimal shedding." }
      ]);
      setSuccessMessage(false);
      setReviewText('');
      setAuthorName('');
    }
  }, [post]);

  if (!isOpen || !post) return null;

  const title = post.name || post.productName || 'Signature Unit';
  const priceFormatted = typeof post.price === 'number' ? `£${post.price}` : (post.price || '£10');
  const descriptionText = post.caption || post.description || "Crafted from verified single-donor raw hair with invisible Swiss HD lace.";

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() || "House of Nina Client",
      rating: rating,
      time: "Just now",
      date: new Date().toISOString().split('T')[0],
      verified: true,
      text: reviewText.trim(),
      status: 'pending' // Initial status: Awaiting approval
    };

    setReviews(prev => {
      const updated = [newRev, ...prev];
      try {
        localStorage.setItem(`house_of_nina_reviews_${post.id}`, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to persist review', err);
      }
      return updated;
    });

    // Also sync to Admin Reviews portal for moderation
    try {
      const adminKey = 'house_of_nina_admin_reviews_v3';
      const existing = JSON.parse(localStorage.getItem(adminKey) || '[]');
      const adminEntry = {
        id: newRev.id,
        client: newRev.author,
        productName: title,
        rating: newRev.rating,
        date: newRev.date,
        text: newRev.text,
        status: 'pending' // Shows as "Awaiting Approval" in admin
      };
      localStorage.setItem(adminKey, JSON.stringify([adminEntry, ...existing]));
    } catch (err) {
      console.warn('Failed to sync review to admin portal', err);
    }

    setReviewText('');
    setAuthorName('');
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);
  };

  return (
    <div className="look-reviews-backdrop animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="look-reviews-dialog animate-scale-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Left Side: Product / Look Image Showcase */}
        <div className="look-reviews-media-col">
          <img src={post.image} alt={title} className="look-reviews-img" />
          <div className="look-reviews-img-overlay">
            <span className="look-reviews-cat-tag">{post.category || 'Luxury Hair'}</span>
            <span className="look-reviews-price-tag">{priceFormatted}</span>
          </div>
        </div>

        {/* Right Side: Instagram-style Comments & Reviews Stream */}
        <div className="look-reviews-content-col">
          
          {/* Header */}
          <div className="look-reviews-col-header">
            <div className="look-reviews-author-meta">
              <div className="look-author-avatar-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80&fm=webp" 
                  alt="House of Nina" 
                  className="look-author-avatar" 
                />
              </div>
              <div>
                <h3 className="look-author-title">houseofnina</h3>
                <span className="look-author-sub">United Kingdom • {title}</span>
              </div>
            </div>
            <button 
              type="button" 
              className="look-reviews-close-btn" 
              onClick={onClose}
              aria-label="Close comments"
            >
              <X size={20} />
            </button>
          </div>

          {/* Caption Box */}
          <div className="look-reviews-caption-row">
            <p className="look-reviews-caption-p">
              <strong>houseofnina</strong> {descriptionText}
            </p>
            {post.timeAgo && <span className="look-caption-time">{post.timeAgo}</span>}
          </div>

          {/* Reviews & Comments Scrollable Stream */}
          <div className="look-reviews-stream-wrap">
            <div className="look-stream-title-row">
              <span className="look-stream-label">Customer Reviews ({reviews.length})</span>
            </div>

            {successMessage && (
              <div className="look-review-success-toast animate-pop">
                <CheckCircle2 size={16} />
                <span>Your review has been submitted and is awaiting approval! ✨</span>
              </div>
            )}

            <div className="look-comments-list">
              {reviews.map((rev) => (
                <div key={rev.id} className="look-single-comment-card">
                  <div className="look-comment-header">
                    <div className="look-comment-author-wrap">
                      <strong className="look-commenter-name">{rev.author}</strong>
                      {rev.status === 'pending' ? (
                        <span style={{ fontSize: '10px', color: '#B45309', backgroundColor: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', border: '1px solid #FDE68A' }}>
                          Awaiting Approval
                        </span>
                      ) : rev.verified ? (
                        <span className="look-verified-chip">
                          <Check size={10} /> Verified
                        </span>
                      ) : null}
                    </div>
                    <span className="look-comment-time">{rev.time}</span>
                  </div>

                  <div className="look-comment-stars">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={13} fill="var(--color-gold)" color="var(--color-gold)" />
                    ))}
                  </div>

                  <p className="look-comment-text">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review / Comment Form */}
          <div className="look-reviews-footer-form-wrap">
            
            {/* Star Rating Selection */}
            <div className="look-star-picker-row">
              <span className="look-rate-label">Your Rating:</span>
              <div className="look-star-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="look-star-btn"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star`}
                  >
                    <Star 
                      size={17} 
                      fill={star <= rating ? "var(--color-gold)" : "none"} 
                      color="var(--color-gold)" 
                    />
                  </button>
                ))}
                <span className="look-rating-score">{rating}.0</span>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="look-add-review-form">
              <input
                type="text"
                placeholder="Your name or handle..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="look-author-input"
                maxLength={40}
              />
              <div className="look-comment-input-row">
                <textarea
                  placeholder="Write your review or comment..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="look-comment-textarea"
                  rows={2}
                  required
                />
                <button 
                  type="submit" 
                  className="look-post-btn"
                  disabled={!reviewText.trim()}
                >
                  Post
                </button>
              </div>
            </form>

            {/* Quick Action to Shop this look */}
            <div className="look-modal-bottom-cta">
              <button
                type="button"
                className="look-shop-unit-btn"
                onClick={() => {
                  onClose();
                  if (onQuickView) onQuickView(post);
                }}
              >
                <ShoppingBag size={14} />
                <span>Shop {title} ({priceFormatted})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
