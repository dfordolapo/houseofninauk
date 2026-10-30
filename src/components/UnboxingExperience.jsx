import React, { useState } from 'react';
import { RotateCcw, ArrowRight, ShieldCheck, Check, Info } from 'lucide-react';

export default function UnboxingExperience() {
  // Step 0: Sealed with Silk Ribbon
  // Step 1: Ribbon Untied, Ready to Slide Box
  // Step 2: Box Drawer Open, Wax Seal on Tissue
  // Step 3: Wax Seal Broken, Tissue Folded Open -> The Reveal!
  const [step, setStep] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const nextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const resetUnboxing = () => {
    setStep(0);
    setActiveHotspot(null);
  };

  return (
    <section id="unboxing-ritual" className="section-wrapper unboxing-section" aria-label="The Unboxing Ritual">
      <div className="container unboxing-container">

        {/* Section Editorial Header */}
        <div className="unboxing-header">
          <span className="unboxing-eyebrow">
            <span>THE ARRIVAL EXPERIENCE</span>
          </span>
          <h2 className="unboxing-title">
            The House of Nina Unboxing Ritual.
          </h2>
          <p className="unboxing-subtitle">
            Every bespoke unit arrives in a handcrafted midnight-espresso studio box, tied in 24k champagne silk and sealed with our studio wax stamp. Tap through the ritual below to experience what lands at your doorstep.
          </p>

          {/* Stepper Indicator Pills */}
          <div className="unboxing-stepper-pills">
            <button 
              type="button" 
              className={`stepper-pill ${step === 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}
              onClick={() => setStep(0)}
            >
              <span>01. The Silk Ribbon</span>
            </button>
            <div className="stepper-line" />
            <button 
              type="button" 
              className={`stepper-pill ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
              onClick={() => setStep(1)}
            >
              <span>02. The Studio Box</span>
            </button>
            <div className="stepper-line" />
            <button 
              type="button" 
              className={`stepper-pill ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
              onClick={() => setStep(2)}
            >
              <span>03. The Wax Seal</span>
            </button>
            <div className="stepper-line" />
            <button 
              type="button" 
              className={`stepper-pill ${step === 3 ? 'active' : ''}`}
              onClick={() => setStep(3)}
            >
              <span>04. The Reveal</span>
            </button>
          </div>
        </div>

        {/* ── Interactive 3D Unboxing Stage ── */}
        <div className="unboxing-stage">

          {/* Prompt Instruction Banner */}
          <div className="unboxing-instruction-banner">
            {step === 0 && (
              <span className="instruction-text animate-fade-in">
                <strong>Step 1:</strong> Tap the champagne silk bow to untie the ribbon.
              </span>
            )}
            {step === 1 && (
              <span className="instruction-text animate-fade-in">
                <strong>Step 2:</strong> Tap the gold pull-tab to slide open the studio drawer.
              </span>
            )}
            {step === 2 && (
              <span className="instruction-text animate-fade-in">
                <strong>Step 3:</strong> Tap the 24k gold wax stamp to break the seal and unfold the tissue.
              </span>
            )}
            {step === 3 && (
              <span className="instruction-text animate-fade-in">
                👑 <strong>Your Crown Has Arrived:</strong> Tap the items inside to inspect your studio inclusions.
              </span>
            )}
          </div>

          {/* ── The Physical Box Assembly ── */}
          <div className={`unboxing-box-case ${step >= 1 ? 'is-drawer-open' : ''}`}>

            {/* Box Outer Sleeve Frame */}
            <div className="box-outer-sleeve">
              <div className="box-lid-crest">
                <span className="box-crest-monogram">HN</span>
                <span className="box-crest-text">HOUSE OF NINA • UNITED KINGDOM</span>
              </div>
            </div>

            {/* Inner Gold-Lined Drawer (Slides out during Step 1+) */}
            <div className={`box-inner-drawer step-${step}`}>

              {/* Step 0 & Step 1: The Silk Ribbon Overlay */}
              {step === 0 && (
                <div 
                  className="unboxing-ribbon-wrap" 
                  onClick={nextStep}
                  role="button"
                  tabIndex={0}
                  aria-label="Untie silk ribbon"
                >
                  <div className="ribbon-vertical-band" />
                  <div className="ribbon-horizontal-band" />
                  <div className="ribbon-bow-knot animate-pulse-glow">
                    <div className="bow-loop-left" />
                    <div className="bow-loop-right" />
                    <div className="bow-center-knot">
                      <span className="bow-knot-label">UNTIE</span>
                    </div>
                  </div>
                  <div className="ribbon-tag">100% Pure Mulberry Silk Ribbon</div>
                </div>
              )}

              {/* Step 1: Untied Box with Gold Drawer Pull-Tab */}
              {step === 1 && (
                <div 
                  className="unboxing-slide-trigger"
                  onClick={nextStep}
                  role="button"
                  tabIndex={0}
                  aria-label="Slide open studio drawer"
                >
                  <div className="drawer-pull-tab animate-pulse-glow">
                    <span>SLIDE OPEN DRAWER →</span>
                  </div>
                </div>
              )}

              {/* Step 2: Closed Tissue Paper with 24K Gold Wax Seal */}
              {step === 2 && (
                <div 
                  className="unboxing-tissue-closed"
                  onClick={nextStep}
                  role="button"
                  tabIndex={0}
                  aria-label="Break gold wax seal"
                >
                  <div className="tissue-pattern-monogram" />
                  <div className="gold-wax-seal animate-pulse-glow">
                    <div className="wax-seal-crest">HN</div>
                    <span className="wax-seal-label">TAP TO UNSEAL</span>
                  </div>
                  <div className="tissue-note">Bespoke Acid-Free Monogrammed Silk Tissue</div>
                </div>
              )}

              {/* Step 3: Full Grand Reveal! Nested Unit, Certificate, and Silk Pairing */}
              {step === 3 && (
                <div className="unboxing-reveal-chamber animate-fade-in">
                  
                  {/* Item 1: The Raw Hair Unit on Satin Hanger */}
                  <div 
                    className={`reveal-unit-card ${activeHotspot === 'unit' ? 'active-hotspot' : ''}`}
                    onClick={() => setActiveHotspot(activeHotspot === 'unit' ? null : 'unit')}
                  >
                    <div className="reveal-unit-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80&fm=webp" 
                        alt="The Victoria Raw Hair Unit" 
                        className="reveal-unit-img"
                      />
                      <span className="reveal-badge">100% SINGLE-DONOR RAW</span>
                    </div>
                    <div className="reveal-unit-meta">
                      <h4 className="reveal-unit-title">The Victoria Glass Bob</h4>
                      <span className="reveal-unit-subtitle">Strand-by-strand pre-plucked in London studio</span>
                    </div>
                  </div>

                  {/* Item 2: Studio Certificate of Authenticity */}
                  <div 
                    className={`reveal-certificate-card ${activeHotspot === 'cert' ? 'active-hotspot' : ''}`}
                    onClick={() => setActiveHotspot(activeHotspot === 'cert' ? null : 'cert')}
                  >
                    <div className="cert-gold-crest">
                      <ShieldCheck size={20} className="cert-shield-icon" />
                      <span className="cert-auth-label">CERTIFIED SPEC</span>
                    </div>
                    <h5 className="cert-title">Studio Craft Passport</h5>
                    <ul className="cert-checklist">
                      <li><Check size={12} className="check-gold" /> Unidirectional Cuticle Alignment</li>
                      <li><Check size={12} className="check-gold" /> 0.02mm Swiss HD Melt Film</li>
                      <li><Check size={12} className="check-gold" /> Chemical-Free Pure Steam Setting</li>
                    </ul>
                    <span className="cert-stamp">UK STUDIO VERIFIED • NO. 0842</span>
                  </div>

                  {/* Item 3: Free Pure Silk Scarf & Care Essentials */}
                  <div 
                    className={`reveal-accessory-card ${activeHotspot === 'silk' ? 'active-hotspot' : ''}`}
                    onClick={() => setActiveHotspot(activeHotspot === 'silk' ? null : 'silk')}
                  >
                    <div className="reveal-acc-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80&fm=webp" 
                        alt="Silk Scarf Inclusions" 
                        className="reveal-acc-img"
                      />
                    </div>
                    <div className="reveal-acc-info">
                      <span className="acc-tag">FREE INCLUSION</span>
                      <h5 className="acc-title">22-Momme Mulberry Silk Scarf</h5>
                      <p className="acc-desc">Protects melted hairline while sleeping &amp; lounging</p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Action Row */}
          <div className="unboxing-controls-bar">
            {step < 3 ? (
              <button 
                type="button" 
                className="btn-unboxing-action"
                onClick={nextStep}
              >
                <span>Continue Unboxing Ritual ({step + 1}/3)</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div className="unboxing-completed-actions">
                <button 
                  type="button" 
                  className="btn-unboxing-reset"
                  onClick={resetUnboxing}
                >
                  <RotateCcw size={15} />
                  <span>Replay Ritual</span>
                </button>
                <a 
                  href="#featured-products"
                  className="btn-unboxing-shop"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('featured-products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Wigs In This Packaging</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
