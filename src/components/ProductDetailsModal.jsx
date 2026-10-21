import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Play, Pause, Volume2, VolumeX, Film, Image as ImageIcon, Heart } from 'lucide-react';

/**
 * ============================================================================
 * HOUSE OF NINA: PRODUCT DETAILS MODAL
 * ============================================================================
 * Displays full product details, specifications, length/lace/density options,
 * quantity counter, and Add to Bag functionality.
 */
export default function ProductDetailsModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onOpenVideo,
  onToggleWishlist,
  wishlist = []
}) {
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedLace, setSelectedLace] = useState('');
  const [selectedDensity, setSelectedDensity] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  
  // Media view states
  const [mediaMode, setMediaMode] = useState('image'); // 'image' | 'video'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const videoRef = useRef(null);

  // Setup options and reset on product change / modal open
  useEffect(() => {
    if (product) {
      setSelectedLength(product.options?.lengths?.[0] || '');
      setSelectedLace(product.options?.laceTypes?.[0] || '');
      setSelectedDensity(product.options?.densities?.[0] || '');
      setIsAdded(false);
      setMediaMode('image');
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [product, isOpen]);

  // Handle video autoplay & playback lifecycle if user switches to video mode
  useEffect(() => {
    const vid = videoRef.current;
    if (!isOpen || mediaMode !== 'video' || !vid) return;

    vid.muted = isMuted;
    vid.defaultMuted = isMuted;
    vid.playsInline = true;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    };
  }, [isOpen, mediaMode, product, isMuted]);

  if (!isOpen || !product) return null;

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (vid) {
      vid.muted = newMuted;
    }
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedLength,
      selectedLace,
      selectedDensity,
      cartId: `${product.id}-${selectedLength}-${selectedLace}-${selectedDensity}`
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const hasCustomVideo = !!product.video;
  const webmSource = hasCustomVideo ? null : '/videos/15558864.webm';
  const mp4Source = product.video || '/videos/15558864_1080_1920_30fps.mp4';
  const posterSource = product.image || '/videos/15558864_poster.webp';

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label={`${product.name} details`}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="quickview-layout">
          {/* ── Left Column: Media Showcase ── */}
          <div className="quickview-media-wrap" style={{ position: 'relative' }}>
            {/* Floating Lookbook / Wishlist Button */}
            <button 
              type="button" 
              className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleWishlist) onToggleWishlist(product);
              }}
              aria-label={isWishlisted ? `Remove ${product.name} from lookbook` : `Save ${product.name} to lookbook`}
              title={isWishlisted ? "Saved to lookbook" : "Save to lookbook"}
            >
              <Heart 
                size={16} 
                fill={isWishlisted ? "var(--color-gold)" : "none"} 
                color={isWishlisted ? "var(--color-gold)" : "var(--color-deep-espresso)"} 
                strokeWidth={isWishlisted ? 2.2 : 1.8}
              />
            </button>
            {mediaMode === 'video' ? (
              <div 
                className="quickview-video-container" 
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? 'Pause video preview' : 'Play video preview'}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
              >
                <video
                  ref={videoRef}
                  className="quickview-video-player"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  preload="auto"
                  poster={posterSource}
                  key={`${product.id || 'dt'}-video`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  {webmSource && <source src={webmSource} type="video/webm" />}
                  <source src={mp4Source} type="video/mp4" />
                </video>

                {/* Live Hair Motion Badge */}
                <div className="quickview-video-badge" aria-hidden="true">
                  <span className="qv-live-dot" />
                  <span>LIVE STRAND MOVEMENT</span>
                </div>

                {/* Big Center Play Icon when paused */}
                {!isPlaying && (
                  <div className="quickview-play-overlay">
                    <div className="quickview-play-circle">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Floating Media Action Controls */}
                <div className="quickview-video-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="qv-media-ctrl-btn"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                  </button>

                  <button
                    type="button"
                    className="qv-media-ctrl-btn"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="quickview-img-container">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="quickview-img" 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Video vs Photo switcher tabs */}
            {product.image && (
              <div className="quickview-mode-tabs" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`qv-tab-btn ${mediaMode === 'image' ? 'active' : ''}`}
                  onClick={() => setMediaMode('image')}
                  aria-label="Show still photo"
                >
                  <ImageIcon size={12} /> Still Photo
                </button>
                <button
                  type="button"
                  className={`qv-tab-btn ${mediaMode === 'video' ? 'active' : ''}`}
                  onClick={() => setMediaMode('video')}
                  aria-label="Show video preview"
                >
                  <Film size={12} /> Movement Video
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column: Product Details & Options ── */}
          <div className="quickview-body">
            <span className="product-cat-pill">{product.category}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '14px', marginTop: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <h2 className="product-title" style={{ fontSize: '18px', margin: 0, fontWeight: 600, color: 'var(--color-deep-espresso)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {product.name}
              </h2>
              <span className="product-price" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                {typeof product.price === 'number' ? `£${product.price}` : product.price}
              </span>
            </div>

            <p className="product-desc" style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#685C50', marginBottom: '18px' }}>
              {product.description}
            </p>

            {/* Length Selector */}
            {product.options?.lengths?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px', color: '#685C50' }}>
                  Length: <span style={{ color: 'var(--color-deep-espresso)' }}>{selectedLength}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.options.lengths.map(len => (
                    <button
                      key={len}
                      type="button"
                      className={`option-chip ${selectedLength === len ? 'selected' : ''}`}
                      onClick={() => setSelectedLength(len)}
                      aria-pressed={selectedLength === len}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lace Selector */}
            {product.options?.laceTypes?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px', color: '#685C50' }}>
                  Lace Type: <span style={{ color: 'var(--color-deep-espresso)' }}>{selectedLace}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.options.laceTypes.map(lace => (
                    <button
                      key={lace}
                      type="button"
                      className={`option-chip ${selectedLace === lace ? 'selected' : ''}`}
                      onClick={() => setSelectedLace(lace)}
                      aria-pressed={selectedLace === lace}
                    >
                      {lace}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Density Selector */}
            {product.options?.densities?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px', color: '#685C50' }}>
                  Density: <span style={{ color: 'var(--color-deep-espresso)' }}>{selectedDensity}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.options.densities.map(density => (
                    <button
                      key={density}
                      type="button"
                      className={`option-chip ${selectedDensity === density ? 'selected' : ''}`}
                      onClick={() => setSelectedDensity(density)}
                      aria-pressed={selectedDensity === density}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag Button Row */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button 
                type="button" 
                className="btn-primary-editorial" 
                style={{ flex: 1, padding: '13px 16px', fontSize: '13px', justifyContent: 'center' }}
                onClick={handleAdd}
              >
                {isAdded ? (
                  <>
                    <Check size={17} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={17} /> Add to Bag
                  </>
                )}
              </button>

              {/* Lookbook / Wishlist Save Button */}
              <button
                type="button"
                className="btn-secondary-editorial"
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                aria-label={isWishlisted ? "Remove from lookbook" : "Save to lookbook"}
                title={isWishlisted ? "Saved to lookbook" : "Save to lookbook"}
                style={{ 
                  padding: '13px 16px', 
                  justifyContent: 'center',
                  borderColor: isWishlisted ? 'var(--color-gold)' : undefined,
                  backgroundColor: isWishlisted ? 'rgba(215, 172, 85, 0.12)' : undefined
                }}
              >
                <Heart 
                  size={17} 
                  fill={isWishlisted ? "var(--color-gold)" : "none"} 
                  color={isWishlisted ? "var(--color-gold)" : "currentColor"} 
                />
              </button>

              {onOpenVideo && (
                <button
                  type="button"
                  className="btn-secondary-editorial"
                  style={{ padding: '13px 16px', justifyContent: 'center' }}
                  onClick={() => {
                    onClose();
                    onOpenVideo(product);
                  }}
                  title="Watch Hair Movement Video"
                >
                  <Film size={17} />
                </button>
              )}
            </div>

            {/* Quality badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: 'var(--color-espresso-muted)', fontSize: '12px' }}>
              <ShieldCheck size={16} className="text-gold" />
              <span>100% Virgin Hair · Pre-Plucked Hairline &amp; Bleached Knots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
