import React, { useState } from 'react';
import { X, ChevronDown, HelpCircle, MessageCircle, Mail } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: "Fitting & Sizing",
    question: "How do I choose the correct cap size for a glueless fit?",
    answer: "Our units feature an ergonomic breathable stretch cap with adjustable elastic tension bands and interior grip combs. Standard Small fits 21–21.5\", Medium fits 22–22.5\" (fits 85% of clients), and Large fits 23–23.5\". Measure around your head along your natural hairline with a flexible tape measure."
  },
  {
    category: "Lace & Scalp Illusion",
    question: "What is Swiss HD Melted Lace, and will it match my skin tone?",
    answer: "Our Swiss HD Lace is ultra-thin (0.04mm), sheer, and undetectable against all skin tones. It blends seamlessly upon installation with micro-knots that are pre-bleached and pre-plucked in our UK studio for a scalp-like transition without harsh visible lines."
  },
  {
    category: "Hair Quality & Longevity",
    question: "Can I heat-style, bleach, and colour my House of Nina unit?",
    answer: "Yes. Our 100% Single-Donor Raw Hair has full cuticles intact and unidirectional, allowing it to be bleached up to level 10 (platinum blonde) and heat styled up to 230°C. With proper sulphate-free washing and hydration, our raw units last 2–3+ years of continuous wear."
  },
  {
    category: "Bespoke Services",
    question: "How do Wig Revamping and Restyling services work?",
    answer: "Our revamp service restores your existing unit to salon-fresh glory. We deep-cleanse, deep-condition with keratin, replace elastic bands if needed, re-pluck the hairline, and precision cut or bone-straighten/curl your unit. Simply book on our Site, mail your unit to our London atelier, and we return it within 5–7 working days."
  },
  {
    category: "Shipping & Delivery",
    question: "How long does UK and International delivery take?",
    answer: "UK Standard delivery takes 2–5 working days; UK Next Day express takes 1–2 working days. International delivery takes 7–10 working days. All parcels are fully tracked with signature on delivery. Please note delivery times exclude weekends and UK bank holidays."
  },
  {
    category: "Returns & Exchanges",
    question: "Why must the lace remain uncut to be eligible for a return?",
    answer: "In compliance with UK hygiene and consumer regulations for wearable intimate items, wigs can only be returned if the lace is 100% uncut and the unit is unwashed, unbrushed, and untampered with. We accept returns within 14 days of delivery if the unit is the wrong size."
  }
];

export default function FaqModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="modal-dialog faq-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Client FAQs"
      >
        {/* HEADER */}
        <div className="faq-modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span className="section-label" style={{ margin: 0 }}>Client Support</span>
              <span style={{ fontSize: '11px', color: '#8C8074' }}>• House of Nina Atelier</span>
            </div>
            <h2 className="faq-modal-title">
              Frequently Asked Questions
            </h2>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close FAQs Modal"
            style={{ position: 'static', margin: 0, width: '36px', height: '36px' }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* ACCORDION CONTENT */}
        <div className="faq-modal-body">
          <div>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="faq-accordion-item"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="faq-accordion-btn"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="faq-item-cat">
                        {item.category}
                      </span>
                      <h3 className="faq-item-question">
                        {item.question}
                      </h3>
                    </div>
                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      color: 'var(--color-deep-espresso)'
                    }}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-item-answer">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Box */}
          <div className="faq-quick-help">
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>
                Have a bespoke inquiry or need fitting advice?
              </strong>
              <span style={{ fontSize: '12px', color: '#685C50' }}>
                Our London atelier stylists are available on WhatsApp and email.
              </span>
            </div>
            <div className="faq-quick-help-buttons">
              <a 
                href="https://wa.me/447776759731" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline-editorial"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageCircle size={13} />
                <span>WhatsApp Atelier</span>
              </a>
              <a 
                href="mailto:houseofnina2026@gmail.com" 
                className="btn-primary-editorial"
              >
                Email Concierge
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="faq-modal-footer">
          <button
            type="button"
            className="btn-primary-editorial"
            onClick={onClose}
            style={{ padding: '8px 24px', fontSize: '12.5px' }}
          >
            Close &amp; Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
