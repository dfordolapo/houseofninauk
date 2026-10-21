import React from 'react';
import { X, Droplets, Wind, Scissors, Moon } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';

const ICONS = [Droplets, Scissors, Wind, Moon];

export default function CareGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="modal-dialog care-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Wig Care Guide"
      >
        {/* HEADER */}
        <div className="care-modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span className="section-label" style={{ margin: 0 }}>Atelier Preservation</span>
              <span style={{ fontSize: '11px', color: '#8C8074' }}>• Raw Hair Maintenance</span>
            </div>
            <h2 className="care-modal-title">
              Wig Care Guide
            </h2>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Care Guide"
            style={{ position: 'static', margin: 0, width: '36px', height: '36px' }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="care-modal-body">
          <div className="care-intro-banner">
            <h3 className="care-intro-heading">
              {CARE_GUIDE_DATA.heading}
            </h3>
            <p className="care-intro-sub">
              {CARE_GUIDE_DATA.supportingCopy}
            </p>
          </div>

          <div className="care-tips-grid">
            {CARE_GUIDE_DATA.tips.map((tip, idx) => {
              const TipIcon = ICONS[idx % ICONS.length];
              return (
                <div key={idx} className="care-tip-card">
                  <div className="care-tip-icon-box">
                    <TipIcon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 className="care-tip-title">
                      {tip.title}
                    </h4>
                    <p className="care-tip-desc">
                      {tip.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="care-modal-footer">
          <button 
            type="button" 
            className="btn-primary-editorial" 
            onClick={onClose}
            style={{ padding: '10px 28px', fontSize: '13px' }}
          >
            Got it, back to store
          </button>
        </div>
      </div>
    </div>
  );
}
