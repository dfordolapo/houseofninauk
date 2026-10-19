import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Play, Pause, Volume2, VolumeX, Film, Image as ImageIcon } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedLace, setSelectedLace] = useState('');
  const [selectedDensity, setSelectedDensity] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  
  // Media view states
  const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'image'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const videoRef = useRef(null);

  // Setup options and reset video mode on product change / modal open
  useEffect(() => {
    if (product) {
      setSelectedLength(product.options?.lengths?.[0] || '');
      setSelectedLace(product.options?.laceTypes?.[0] || '');
      setSelectedDensity(product.options?.densities?.[0] || '');
      setIsAdded(false);
      setMediaMode('video');
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [product, isOpen]);

  // Handle video autoplay & playback lifecycle
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
          // Autoplay policy handled gracefully
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

  // Determine video sources: custom product video or landing page cinematic video placeholder
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
        aria-label={product.name}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product quick view"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="quickview-layout">
          {/* ── Left Column: Video & Media Showcase ── */}
          <div className="quickview-media-wrap">
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
                  key={`${product.id || 'qv'}-video`}
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
                  className={`qv-tab-btn ${mediaMode === 'video' ? 'active' : ''}`}
                  onClick={() => setMediaMode('video')}
                  aria-label="Show video preview"
                >
                  <Film size={12} /> Movement
                </button>
                <button
                  type="button"
                  className={`qv-tab-btn ${mediaMode === 'image' ? 'active' : ''}`}
                  onClick={() => setMediaMode('image')}
                  aria-label="Show still photo"
                >
                  <ImageIcon size={12} /> Still Photo
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column: Product Details & Options ── */}
          <div className="quickview-body">
            <span className="product-cat-pill">{product.category}</span>
            <h2 className="product-title" style={{ fontSize: '24px', marginBottom: '8px' }}>
              {product.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="product-price" style={{ fontSize: '24px' }}>
                {typeof product.price === 'number' ? `£${product.price}` : product.price}
              </span>
              {product.tag && <span className="product-tag-badge" style={{ position: 'static' }}>{product.tag}</span>}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--color-espresso-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
              {product.description || product.caption}
            </p>

            {/* Length selector */}
            {product.options?.lengths?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Length: <strong style={{ color: 'var(--color-dusty-rose)' }}>{selectedLength}</strong>
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.options.lengths.map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setSelectedLength(len)}
                      className="option-chip"
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        backgroundColor: selectedLength === len ? 'var(--color-deep-espresso)' : 'var(--color-ivory)',
                        color: selectedLength === len ? 'var(--color-ivory)' : 'var(--color-deep-espresso)',
                        fontWeight: selectedLength === len ? 600 : 400,
                        borderColor: selectedLength === len ? 'var(--color-deep-espresso)' : 'var(--color-border)'
                      }}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lace Type selector */}
            {product.options?.laceTypes?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Lace Construction:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.options.laceTypes.map((lace) => (
                    <button
                      key={lace}
                      type="button"
                      onClick={() => setSelectedLace(lace)}
                      className="option-chip"
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        backgroundColor: selectedLace === lace ? 'var(--color-deep-espresso)' : 'var(--color-ivory)',
                        color: selectedLace === lace ? 'var(--color-ivory)' : 'var(--color-deep-espresso)',
                        fontWeight: selectedLace === lace ? 600 : 400,
                        borderColor: selectedLace === lace ? 'var(--color-deep-espresso)' : 'var(--color-border)'
                      }}
                    >
                      {lace}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality assurance note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-muted-olive)', margin: '12px 0 24px 0' }}>
              <ShieldCheck size={16} /> Pre-plucked hairline & bleached micro-knots included
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '10px' }}
              onClick={handleAdd}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={18} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Bag · {typeof product.price === 'number' ? `£${product.price}` : product.price}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
