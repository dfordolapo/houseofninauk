import React, { useEffect } from 'react';
import { X, Droplets, Wind, Scissors, Moon } from 'lucide-react';
import { CARE_GUIDE_DATA } from '../data/wigData';

const ICONS = [Droplets, Scissors, Wind, Moon];

export default function CareGuideModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Wig Care Guide"
        style={{ maxWidth: '720px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Care Guide"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="modal-content-inner" style={{ padding: '4px 32px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="section-label">Atelier Preservation</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '8px' }}>
            {CARE_GUIDE_DATA.heading}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-espresso-muted)', maxWidth: '500px', margin: '0 auto' }}>
            {CARE_GUIDE_DATA.supportingCopy}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {CARE_GUIDE_DATA.tips.map((tip, idx) => {
            const TipIcon = ICONS[idx % ICONS.length];
            return (
              <div 
                key={idx} 
                style={{ 
                  backgroundColor: 'var(--color-white)', 
                  padding: '20px', 
                  borderRadius: '14px', 
                  border: '1px solid var(--color-border-light)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--color-sand-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-dusty-rose)'
                }}>
                  <TipIcon size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '4px' }}>
                    {tip.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--color-espresso-muted)', lineHeight: '1.5', margin: 0 }}>
                    {tip.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <button 
            type="button" 
            className="btn-primary-editorial" 
            onClick={onClose}
            style={{ padding: '12px 32px' }}
          >
            Got it, back to store
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
