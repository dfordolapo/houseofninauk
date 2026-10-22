import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Truck, ShoppingBag, Check, Copy, Printer, 
  ShieldCheck, Sparkles, Scissors, RotateCcw, Share2, 
  ChevronRight, ArrowDown, MapPin, CreditCard, Clock
} from 'lucide-react';
import HouseOfNinaCrest from './HouseOfNinaCrest';

/**
 * ============================================================================
 * HOUSE OF NINA: BESPOKE LUXURY THERMAL REGISTER & WAX STAMPING CEREMONY
 * ============================================================================
 * An authentic, tangible Mayfair boutique register printing ceremony:
 * 1. Physical brushed champagne gold & emerald Saffiano leather register machine
 * 2. Real-time thermal feed printing with mechanical audio synthesis
 * 3. Molten Gold Wax Stamping Ceremony (3D brass stamp presses official crest)
 * 4. Interactive "Tear Off Receipt" physical rip action & paper tear audio
 * 5. Full inspected archival receipt with live tracking & print styling
 */
export default function OrderSuccessReceipt({ 
  order, 
  isOpen = true, 
  onClose, 
  onContinueShopping,
  onTrackOrder 
}) {
  // Ceremony Stages: 'printing' -> 'stamping' -> 'printed' -> 'torn'
  const [stage, setStage] = useState('printing');
  const [copiedRef, setCopiedRef] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const audioCtxRef = useRef(null);

  if (!isOpen && !order) return null;

  // Realistic dynamic order structure for House of Nina luxury hair
  const orderData = order || {
    orderId: "HN4892",
    date: new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }) + ' ' + new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    customer: {
      fullName: "Amara Okafor",
      email: "amara.okafor@luxurymail.co.uk",
      phone: "+44 7776 759731",
      address: "14 Mayfair Place, Flat 3B",
      city: "London",
      state: "Greater London",
      postalCode: "W1J 8AJ"
    },
    items: [
      {
        id: "hn-01",
        name: "Raw Virgin Straight Hair Bundle",
        selectedLength: "26\"",
        selectedLace: "Invisible HD Lace",
        selectedDensity: "200% Density",
        quantity: 1,
        price: 240,
        currencySymbol: "£",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80&fm=webp"
      }
    ],
    deliveryMethod: "Royal Mail 48 Tracked (Complimentary)",
    paymentMethod: "Stripe Verified Card (•••• 4892)",
    subtotal: 240,
    shippingCost: 0,
    discount: 0,
    total: 240,
    currencySymbol: "£"
  };

  const curr = orderData.currencySymbol || "£";
  const formatMoney = (val) => {
    if (typeof val !== 'number') return `${curr}${val}`;
    return `${curr}${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // ── Web Audio Synthesis (No external sound files, 100% reliable) ──
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 1. Mechanical Thermal Print Pulse
  const playPrintPulse = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch {}
  };

  // 2. Heavy Brass Wax Stamp Thud & Squish
  const playStampThud = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {}
  };

  // 3. Serrated Paper Tear
  const playPaperTear = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.045));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2600;
      filter.Q.value = 1.4;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  };

  // Lifecycle of the Printing & Stamping Ceremony
  useEffect(() => {
    if (stage === 'printing') {
      // Periodic printing audio pulses
      const interval = setInterval(() => {
        playPrintPulse();
      }, 220);

      const printTimer = setTimeout(() => {
        clearInterval(interval);
        setStage('stamping');
      }, 2400);

      return () => {
        clearInterval(interval);
        clearTimeout(printTimer);
      };
    }

    if (stage === 'stamping') {
      // Trigger the heavy stamp thud after stamp descends
      const stampSoundTimer = setTimeout(() => {
        playStampThud();
      }, 650);

      const finishTimer = setTimeout(() => {
        setStage('printed');
      }, 1600);

      return () => {
        clearTimeout(stampSoundTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [stage]);

  // Handle Tear-Off Action
  const handleTearOff = () => {
    playPaperTear();
    setStage('torn');
  };

  // Replay Ceremony
  const handleReplay = () => {
    setStage('printing');
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText?.(orderData.orderId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`receipt-screen-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      
      {/* Floating Close Button */}
      <button
        type="button"
        className="receipt-close-btn"
        onClick={onClose}
        aria-label="Close order confirmation"
      >
        <X size={20} strokeWidth={2.2} />
      </button>

      <div 
        className="receipt-stage-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Order Confirmation Receipt ${orderData.orderId}`}
      >
        
        {/* ══════════════════════════════════════════════════════════════════════
            CEREMONY VIEW: THE MAYFAIR REGISTER MACHINE WITH WAX STAMP
           ══════════════════════════════════════════════════════════════════════ */}
        {stage !== 'torn' && (
          <div className="register-scene-wrapper animate-receipt-slide">
            
            {/* Top Status Header */}
            <div className="register-scene-header">
              <div className="register-live-badge">
                <span className={`live-dot ${stage === 'printing' ? 'blinking' : 'solid'}`} />
                <span>
                  {stage === 'printing' && "PRINTING BOUTIQUE RECEIPT..."}
                  {stage === 'stamping' && "EMBOSSING OFFICIAL MAYFAIR WAX SEAL..."}
                  {stage === 'printed' && "OFFICIAL RECEIPT READY"}
                </span>
              </div>
              <h2 className="register-scene-title">House of Nina Mayfair Register</h2>
            </div>

            {/* The Machine & Slot Assembly */}
            <div className="register-machine-stage">
              
              {/* Machine Background Image */}
              <div className="register-machine-frame">
                <picture>
                  <source srcSet="/images/house-of-nina-printer-cropped.webp" type="image/webp" />
                  <img 
                    src="/images/house-of-nina-printer-cropped.jpg" 
                    alt="House of Nina Mayfair Boutique Register" 
                    className="register-machine-img"
                  />
                </picture>

                {/* ── THE FEEDING RECEIPT PAPER ── */}
                <div className={`register-paper-feeder ${stage}`}>
                  <div className="register-paper-content">
                    
                    {/* Serrated Top Edge */}
                    <div className="paper-serrated-edge top" />

                    {/* Paper Header */}
                    <div className="paper-header">
                      <div className="paper-crest">
                        <HouseOfNinaCrest size={28} color="#1E1713" showWordmark={true} />
                      </div>
                      <span className="paper-reg-num">MAYFAIR LONDON • REG #01</span>
                      <span className="paper-date">{orderData.date}</span>
                    </div>

                    <div className="paper-divider-dash" />

                    {/* Order Reference & Client */}
                    <div className="paper-client-block">
                      <div className="paper-row">
                        <span>ORDER:</span>
                        <strong>#{orderData.orderId}</strong>
                      </div>
                      <div className="paper-row">
                        <span>CLIENT:</span>
                        <strong>{orderData.customer?.fullName || "Valued VIP Client"}</strong>
                      </div>
                    </div>

                    <div className="paper-divider-dash" />

                    {/* Purchased Items */}
                    <div className="paper-items-table">
                      {orderData.items.map((item, idx) => (
                        <div key={idx} className="paper-item-entry">
                          <div className="paper-item-name">{item.name}</div>
                          <div className="paper-item-sub">
                            <span>{item.selectedLength} · {item.selectedDensity || "200%"}</span>
                            <strong>{formatMoney(item.price)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="paper-divider-dash" />

                    {/* Financial Summary */}
                    <div className="paper-totals-table">
                      <div className="paper-row">
                        <span>SUBTOTAL</span>
                        <span>{formatMoney(orderData.subtotal)}</span>
                      </div>
                      <div className="paper-row">
                        <span>LUXURY BOX</span>
                        <span>COMPLIMENTARY</span>
                      </div>
                      <div className="paper-row total">
                        <strong>TOTAL PAID</strong>
                        <strong>{formatMoney(orderData.total)}</strong>
                      </div>
                    </div>

                    {/* Authentic Barcode */}
                    <div className="paper-barcode-block">
                      <div className="paper-barcode-lines" />
                      <span className="paper-barcode-number">*HN-{orderData.orderId}-LON*</span>
                    </div>

                    {/* ── THE MOLTEN WAX STAMPING ZONE ── */}
                    <div className="paper-wax-stamp-zone">
                      {/* 3D Brass Stamping Tool descending during 'stamping' stage */}
                      {stage === 'stamping' && (
                        <div className="brass-stamp-tool animate-stamp-down">
                          <div className="brass-stamp-handle" />
                          <div className="brass-stamp-head" />
                        </div>
                      )}

                      {/* The Molten Wax Pool / Raised 3D Wax Seal */}
                      {(stage === 'stamping' || stage === 'printed') && (
                        <div className="paper-wax-seal animate-wax-squish">
                          <img 
                            src="/images/wax-seal.webp" 
                            alt="House of Nina Antique Gold Wax Seal" 
                            className="paper-wax-img"
                          />
                        </div>
                      )}
                    </div>

                    {/* Serrated Bottom Edge */}
                    <div className="paper-serrated-edge bottom" />

                  </div>
                </div>

                {/* ── LOWER BRASS SLOT LIP OVERLAY (creates realistic 3D slot depth) ── */}
                <div className="register-slot-lip-overlay">
                  <img 
                    src="/images/nina-slot-lip.png" 
                    alt="Brass Slot Lip" 
                    className="slot-lip-img"
                  />
                </div>

              </div>

              {/* ── TEAR OFF CALL TO ACTION ── */}
              {stage === 'printed' && (
                <div className="register-tear-cta-container animate-fade-in-up">
                  <button 
                    type="button" 
                    className="register-tear-btn"
                    onClick={handleTearOff}
                  >
                    <Scissors size={15} />
                    <span>TEAR OFF RECEIPT</span>
                  </button>
                  <span className="register-tear-hint">Tap to inspect full archival order deed</span>
                </div>
              )}

            </div>

            {/* Quick Helper below machine */}
            <div className="register-footer-hint">
              <span>Authentic 100% Raw Virgin Hair • Dispatched from Mayfair Studio</span>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            INSPECTED VIEW: THE TORN ARCHIVAL DEED WITH WAX SEAL (Full Clarity)
           ══════════════════════════════════════════════════════════════════════ */}
        {stage === 'torn' && (
          <div className="torn-receipt-dossier animate-receipt-slide">
            
            {/* Replay Ribbon at Top */}
            <div className="torn-dossier-top-bar">
              <div className="dossier-torn-badge">
                <Scissors size={13} />
                <span>OFFICIALLY REGISTERED &amp; SEALED</span>
              </div>

              <button 
                type="button" 
                className="dossier-replay-btn"
                onClick={handleReplay}
                title="Watch register machine print again"
              >
                <RotateCcw size={13} />
                <span>Re-Print Register</span>
              </button>
            </div>

            {/* The Physical Parchment Receipt Card */}
            <div className="torn-parchment-sheet">
              
              {/* Jagged Serrated Top Edge */}
              <div className="serrated-tear-lip top-rip" />

              {/* Dual Inset Gold Foil Frame */}
              <div className="parchment-gold-frame" aria-hidden="true" />

              {/* Header */}
              <div className="parchment-header">
                <div className="parchment-crest-row">
                  <HouseOfNinaCrest size={46} color="#A37E3E" showWordmark={true} />
                </div>
                <span className="parchment-subtitle">MAYFAIR, LONDON • 100% RAW VIRGIN HAIR</span>
                <h1 className="parchment-title">Official Order Confirmation</h1>
                <p className="parchment-date">Issued {orderData.date}</p>
              </div>

              {/* Reference & Copy Pill */}
              <div className="parchment-security-strip">
                <div className="security-strip-left">
                  <span className="security-pulse-core" />
                  <span className="security-ref-label">ORDER REF:</span>
                  <span className="security-ref-num">{orderData.orderId}</span>
                </div>

                <button 
                  type="button" 
                  className="copy-reference-pill"
                  onClick={handleCopyOrderId}
                >
                  {copiedRef ? (
                    <>
                      <Check size={12} color="#A37E3E" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Ref</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Studio Timeline */}
              <div className="parchment-timeline-card">
                <div className="timeline-header-row">
                  <span className="timeline-title">STUDIO PREPARATION STATUS</span>
                  <span className="timeline-step-badge">STAGE 1 OF 4</span>
                </div>

                <div className="timeline-progress-track">
                  <div className="timeline-step completed">
                    <div className="step-marker">
                      <Check size={12} strokeWidth={2.8} />
                    </div>
                    <div className="step-info">
                      <strong>Authorized</strong>
                      <span>Payment verified</span>
                    </div>
                  </div>

                  <div className="step-connector active" />

                  <div className="timeline-step in-progress">
                    <div className="step-marker">
                      <Sparkles size={12} />
                    </div>
                    <div className="step-info">
                      <strong>Studio Quality</strong>
                      <span>Steamed &amp; matched</span>
                    </div>
                  </div>

                  <div className="step-connector" />

                  <div className="timeline-step pending">
                    <div className="step-marker">
                      <Truck size={12} />
                    </div>
                    <div className="step-info">
                      <strong>Dispatch</strong>
                      <span>Royal Mail 48</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Particulars Grid */}
              <div className="parchment-particulars-grid">
                <div className="particular-card">
                  <span className="particular-label">PAYMENT METHOD</span>
                  <strong className="particular-value">{orderData.paymentMethod}</strong>
                </div>

                <div className="particular-card">
                  <span className="particular-label">DELIVERING TO</span>
                  <strong className="particular-value">{orderData.customer?.fullName}</strong>
                  <span className="particular-subtext">
                    {orderData.customer?.address}, {orderData.customer?.city} {orderData.customer?.postalCode}
                  </span>
                </div>
              </div>

              {/* Itemized Purchased Pieces */}
              <div className="parchment-items-section">
                <div className="items-header-bar">
                  <span>PURCHASED PIECES ({orderData.items?.length || 0})</span>
                  <span>AMOUNT</span>
                </div>

                <div className="parchment-items-list">
                  {orderData.items.map((item, idx) => (
                    <div key={idx} className="parchment-product-row">
                      <div className="product-thumb">
                        <img src={item.image} alt={item.name} className="product-thumb-img" />
                      </div>
                      <div className="product-details">
                        <h4 className="product-name">{item.name}</h4>
                        <span className="product-specs">
                          {item.selectedLength} · {item.selectedLace || "HD Lace"} · {item.selectedDensity || "200%"}
                        </span>
                        <span className="product-qty">Quantity: {item.quantity || 1}</span>
                      </div>
                      <div className="product-price">
                        {formatMoney(typeof item.price === 'number' ? item.price * (item.quantity || 1) : item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="parchment-breakdown-card">
                <div className="breakdown-line">
                  <span>Subtotal</span>
                  <span>{formatMoney(orderData.subtotal)}</span>
                </div>
                <div className="breakdown-line">
                  <span>Signature Velvet Box &amp; Bonnet</span>
                  <span className="text-emerald">Complimentary</span>
                </div>
                <div className="breakdown-line">
                  <span>Delivery Speed</span>
                  <span>{orderData.deliveryMethod}</span>
                </div>
                <div className="breakdown-total-line">
                  <div>
                    <span className="total-title">Total Authorized</span>
                    <span className="total-subtitle">Includes UK VAT</span>
                  </div>
                  <span className="total-figure">{formatMoney(orderData.total)}</span>
                </div>
              </div>

              {/* The Wax Seal & Signature Section */}
              <div className="parchment-seal-signoff-row">
                <div className="signoff-left">
                  <span className="signoff-script">With gratitude &amp; care,</span>
                  <span className="signoff-brand">House of Nina</span>
                  <span className="signoff-loc">Mayfair, London UK</span>
                </div>

                <div className="signoff-seal-badge" title="Official House of Nina Antique Gold Wax Seal">
                  <img 
                    src="/images/wax-seal.webp" 
                    alt="House of Nina Antique Gold Wax Seal" 
                    className="wax-seal-img" 
                  />
                </div>
              </div>

              {/* Jagged Serrated Bottom Edge */}
              <div className="serrated-tear-lip bottom-rip" />

            </div>

            {/* Action Buttons Toolbar */}
            <div className="parchment-actions-toolbar">
              <div className="actions-button-row">
                <button
                  type="button"
                  className="btn-primary-editorial action-btn-pill"
                  onClick={() => {
                    if (onTrackOrder) onTrackOrder(orderData);
                    else setTrackingModalOpen(true);
                  }}
                >
                  <Truck size={16} />
                  <span>Track Order Live</span>
                </button>

                <button
                  type="button"
                  className="btn-secondary-editorial action-btn-pill"
                  onClick={handlePrint}
                >
                  <Printer size={16} />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  className="btn-secondary-editorial action-btn-pill"
                  onClick={() => {
                    if (onContinueShopping) onContinueShopping();
                    else onClose();
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Continue Shopping</span>
                </button>
              </div>

              {orderData.customer?.email && (
                <p className="parchment-email-note">
                  Official dispatch confirmation and tracking link sent to{' '}
                  <strong>{orderData.customer.email}</strong>.
                </p>
              )}
            </div>

          </div>
        )}

      </div>

      {/* TRACK ORDER MODAL */}
      {trackingModalOpen && (
        <div className="tracking-modal-backdrop" onClick={() => setTrackingModalOpen(false)}>
          <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} color="#A37E3E" />
                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: "'Playfair Display', serif", color: 'var(--color-deep-espresso)' }}>
                  Tracking Order #{orderData.orderId}
                </h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                style={{ position: 'static', margin: 0, width: '32px', height: '32px' }}
                onClick={() => setTrackingModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="tracking-status-step">
              <span className="tracking-dot active" />
              <div>
                <strong>Order Verified &amp; Authorized</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Your House of Nina hair order is verified and entered the studio preparation queue.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '14px' }}>
              <span className="tracking-dot active" />
              <div>
                <strong>Studio Inspection &amp; Conditioning</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Raw virgin hair bundles selected, aligned, and steamed with organic oils.
                </p>
              </div>
            </div>

            <div className="tracking-status-step" style={{ marginTop: '14px', opacity: 0.6 }}>
              <span className="tracking-dot" />
              <div>
                <strong>Royal Mail 48 Tracked Dispatch</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#685C50' }}>
                  Tracking code will be activated as soon as collected by Royal Mail.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-editorial"
              style={{ width: '100%', marginTop: '20px', height: '46px', justifyContent: 'center' }}
              onClick={() => setTrackingModalOpen(false)}
            >
              Close Tracking Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
