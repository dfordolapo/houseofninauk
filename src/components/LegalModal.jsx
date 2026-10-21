import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Truck, AlertCircle, Mail, ExternalLink, Printer } from 'lucide-react';

export default function LegalModal({ isOpen, initialTab = 'terms', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`legal-modal-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
    >
      <div 
        className="legal-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="House of Nina Legal Policies"
      >
        {/* MODAL HEADER */}
        <div className="legal-modal-header">
          <div className="legal-modal-title-wrap">
            <div className="legal-modal-badge-row">
              <span className="section-label" style={{ margin: 0 }}>Legal &amp; Compliance</span>
              <span style={{ fontSize: '11px', color: '#8C8074' }}>• House of Nina Limited</span>
            </div>
            <h2 className="legal-modal-title">
              Customer Policies &amp; Terms
            </h2>
          </div>

          <div className="legal-modal-header-actions">
            <button
              type="button"
              onClick={() => window.print()}
              title="Print document"
              className="desktop-only"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                fontSize: '12px',
                color: 'var(--color-deep-espresso)',
                cursor: 'pointer'
              }}
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close Legal Modal"
              style={{ position: 'static', margin: 0, width: '36px', height: '36px', minWidth: '36px' }}
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* TAB CONTROLS (RESPONSIVE LABELS & NO UNWANTED WRAPPING) */}
        <div className="legal-modal-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            aria-selected={activeTab === 'terms'}
          >
            <FileText size={15} />
            <span className="legal-tab-text-full">Terms &amp; Conditions</span>
            <span className="legal-tab-text-compact">Terms</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            aria-selected={activeTab === 'privacy'}
          >
            <ShieldCheck size={15} />
            <span className="legal-tab-text-full">Customer Privacy Notice (UK GDPR)</span>
            <span className="legal-tab-text-compact">Privacy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`legal-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            aria-selected={activeTab === 'shipping'}
          >
            <Truck size={15} />
            <span className="legal-tab-text-full">Shipping &amp; Returns Policy</span>
            <span className="legal-tab-text-compact">Shipping &amp; Returns</span>
          </button>
        </div>

        {/* TAB CONTENT (SCROLLABLE BODY) */}
        <div className="legal-modal-body">
          {/* ===================== TAB 1: TERMS AND CONDITIONS ===================== */}
          {activeTab === 'terms' && (
            <div className="legal-article" style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div 
                className="legal-hero-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(235, 219, 197, 0.45) 0%, rgba(255, 255, 255, 0.85) 100%)',
                  padding: '18px 22px',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 196, 176, 0.6)',
                  marginBottom: '22px'
                }}
              >
                <h3 className="legal-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 6px 0' }}>
                  Terms and Conditions
                </h3>
                <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#5C5146' }}>
                  These terms and conditions govern the use of this website. This Site is owned and operated by <strong>House of Nina</strong> (House of Nina Limited). This Site is an ecommerce website.
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#5C5146' }}>
                  By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.
                </p>
              </div>

              {/* SECTION: INTELLECTUAL PROPERTY */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  1. Intellectual Property
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#5C5146' }}>
                  All content published and made available on our Site is the property of House of Nina and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.
                </p>
              </section>

              {/* SECTION: SALE OF GOODS AND SERVICES */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  2. Sale of Goods and Services
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  These Terms and Conditions govern the sale of goods and services available on our Site.
                </p>
                <div className="legal-goods-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                  <div className="legal-goods-card" style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--color-deep-espresso)', marginBottom: '4px' }}>Goods Available:</strong>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#685C50', lineHeight: 1.5 }}>
                      <li>Wigs</li>
                      <li>Scarves</li>
                      <li>Hair accessories</li>
                    </ul>
                  </div>
                  <div className="legal-goods-card" style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--color-deep-espresso)', marginBottom: '4px' }}>Services Available:</strong>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#685C50', lineHeight: 1.5 }}>
                      <li>Wig revamping</li>
                      <li>Wig restyling</li>
                      <li>Wig construction</li>
                    </ul>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  We are under a legal duty to supply goods that match the description of the good(s) you order on our Site. The services will be paid for in full when the services are ordered.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  These Terms and Conditions apply to all goods and services displayed on our site at the time you access it, including items listed as out of stock. All information, descriptions, or images provided about goods and services are as accurate as possible. However, we are not legally bound by such descriptions as we cannot guarantee complete accuracy. You agree to purchase goods and services from our Site at your own risk.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: 0 }}>
                  We reserve the right to modify, reject or cancel your order whenever necessary. If we cancel your order and have already processed payment, we will provide a refund equal to the amount paid. You agree it is your responsibility to monitor your payment instrument to verify receipt of any refund.
                </p>
              </section>

              {/* SECTION: PAYMENTS */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  3. Payments &amp; Authorisation
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  We accept the following payment methods on our Site:
                </p>
                <div className="legal-payment-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Klarna', 'Stripe', 'Clearpay'].map(method => (
                    <span key={method} className="legal-payment-chip" style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      color: 'var(--color-deep-espresso)'
                    }}>
                      {method}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  When you provide payment information, you authorise our use of and access to your chosen payment instrument and authorise us to charge the amount due.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: 0 }}>
                  If we believe your payment violates any law or these Terms and Conditions, we reserve the right to cancel or reverse your transaction.
                </p>
              </section>

              {/* SECTION: SHIPPING AND DELIVERY */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  4. Shipping and Delivery
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  When you purchase goods from our Site, goods will be delivered through one of the following methods:
                </p>
                <ul style={{ margin: '0 0 10px 0', paddingLeft: '18px', fontSize: '13px', color: '#5C5146', lineHeight: 1.55 }}>
                  <li><strong>UK Standard delivery:</strong> Delivery takes 2–5 working days</li>
                  <li><strong>UK Next day delivery:</strong> Delivery takes 1–2 working days</li>
                  <li><strong>International delivery:</strong> Delivery takes 7–10 working days</li>
                </ul>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  Delivery will take place as soon as reasonably possible. Times may vary due to unforeseen circumstances; delivery times do not include weekends and bank holidays. Delivery charges apply in addition to the goods price.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  For deliveries outside the United Kingdom, your purchase may be subject to destination import duties and taxes. You are responsible for paying any such duties or taxes.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: 0 }}>
                  You are required to provide a complete and accurate delivery address including recipient name. We are not liable for misdelivery caused by inaccurate information provided by you.
                </p>
              </section>

              {/* SECTION: RIGHT TO CANCEL AND RECEIVE REIMBURSEMENT */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  5. Right to Cancel &amp; Reimbursement (UK &amp; EU)
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  Under UK and EU regulations, you have the right to cancel your contract to purchase goods and services within 14 days without giving notice. The cancellation period ends 14 days from service purchase, or 14 days from when you receive the goods.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 10px 0' }}>
                  To cancel, contact us by email at <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>houseofnina2026@gmail.com</a>.
                </p>

                <div style={{ background: '#FFF9F2', borderLeft: '3.5px solid #D4A373', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px' }}>
                  <strong style={{ fontSize: '12.5px', color: '#8A5A36', display: 'block', marginBottom: '3px' }}>The right to cancel does NOT apply to:</strong>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6E4D30', lineHeight: 1.45 }}>
                    <li>Custom or personalised goods;</li>
                    <li>Goods that deteriorate or expire rapidly;</li>
                    <li>Services requested for urgent repairs or maintenance;</li>
                    <li>Fluctuation-dependent goods or dated leisure services.</li>
                  </ul>
                </div>

                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  <strong>Effects of Cancellation:</strong> If goods were dispatched, you must return them as soon as possible at your own expense. Goods must be in original condition. Reimbursement will be issued within 14 days of return receipt or proof via the original payment method.
                </p>
              </section>

              {/* SECTION: REFUNDS AND RETURNS */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  6. Refunds &amp; Returns Policy
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  Refund requests for goods sold on our Site must be made within <strong>14 days after receipt of your goods</strong>. We accept refund requests where the <strong>good is the wrong size</strong>.
                </p>

                <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', padding: '12px 14px', borderRadius: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <AlertCircle size={15} color="#E11D48" />
                    <strong style={{ fontSize: '12.5px', color: '#BE123C' }}>Strict Hygiene Exclusions — Refunds DO NOT apply to:</strong>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#9F1239', lineHeight: 1.5 }}>
                    <li><strong>If wig lace has been cut;</strong></li>
                    <li><strong>If any part of the wig has been tampered with; and</strong></li>
                    <li><strong>Scarves.</strong></li>
                  </ul>
                </div>

                <p style={{ fontSize: '13px', color: '#5C5146', margin: 0 }}>
                  <strong>Returns Procedure:</strong> Contact us for return address instructions, go to your nearest delivery point, and pay the return delivery fee. Goods must be returned in their original, pristine condition.
                </p>
              </section>

              {/* SECTION: APPLICABLE LAW */}
              <section style={{ marginBottom: '18px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  7. Consumer Protection &amp; Applicable Law
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  These terms are governed under the <strong>Sale of Goods Act 1979</strong>, the <strong>Consumer Rights Act 2015</strong>, and the laws of the <strong>Country of England</strong>.
                </p>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: 0 }}>
                  House of Nina and our directors, officers, agents, and employees will not be liable for any actions, claims, losses, or legal expenses arising from your use of the Site.
                </p>
              </section>

              {/* CONTACT BOX */}
              <div style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)', marginBottom: '3px' }}>
                  Contact Details
                </strong>
                <p style={{ fontSize: '12.5px', color: '#5C5146', margin: 0 }}>
                  For questions or concerns, email: <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>houseofnina2026@gmail.com</a>
                </p>
              </div>
            </div>
          )}

          {/* ===================== TAB 2: CUSTOMER PRIVACY NOTICE ===================== */}
          {activeTab === 'privacy' && (
            <div className="legal-article" style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div 
                className="legal-hero-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(235, 219, 197, 0.45) 0%, rgba(255, 255, 255, 0.85) 100%)',
                  padding: '18px 22px',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 196, 176, 0.6)',
                  marginBottom: '22px'
                }}
              >
                <h3 className="legal-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 4px 0' }}>
                  House of Nina Customer Privacy Notice
                </h3>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#8C8074' }}>
                  Registered name: <strong>House of Nina Limited</strong> • UK Data Protection Controller
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#5C5146' }}>
                  We are the controller of your personal data. This privacy notice tells you what to expect us to do with your personal information under UK GDPR.
                </p>
              </div>

              {/* CONTACT DETAILS */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  1. Contact Details
                </h4>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <Mail size={15} color="var(--color-deep-espresso)" />
                  <span style={{ fontSize: '12.5px', color: '#5C5146' }}>Email:</span>
                  <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600, fontSize: '12.5px', textDecoration: 'none' }}>
                    houseofnina2026@gmail.com
                  </a>
                </div>
              </section>

              {/* WHAT INFORMATION WE COLLECT */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  2. What Information We Collect, Use, and Why
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', marginBottom: '8px' }}>
                  We collect or use the following information to provide goods, services, and secure parcel dispatch:
                </p>
                <div className="legal-gdpr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                    <strong style={{ fontSize: '12.5px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>• Names &amp; Contact Details</strong>
                    <span style={{ fontSize: '12px', color: '#685C50' }}>Full name, email address, phone number for delivery updates.</span>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                    <strong style={{ fontSize: '12.5px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>• Addresses</strong>
                    <span style={{ fontSize: '12px', color: '#685C50' }}>Billing and shipping addresses for order delivery.</span>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                    <strong style={{ fontSize: '12.5px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>• Payment Details</strong>
                    <span style={{ fontSize: '12px', color: '#685C50' }}>Encrypted via secure payment gateways. The site never stores raw card details.</span>
                  </div>
                </div>
                <p style={{ fontSize: '12.5px', color: '#7A6E62', margin: 0 }}>
                  <strong>Source:</strong> Directly from you when you complete an order or make an enquiry.
                </p>
              </section>

              {/* LAWFUL BASES */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  3. Lawful Bases for Processing
                </h4>
                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '4px' }}>• Consent</strong>
                  <p style={{ fontSize: '12.5px', color: '#5C5146', margin: 0 }}>
                    Where you have provided explicit permission. You have the right to withdraw your consent at any time.
                  </p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '4px' }}>• Legitimate Interests</strong>
                  <p style={{ fontSize: '12.5px', color: '#5C5146', margin: 0 }}>
                    We collect personal information to share with delivery partners for order delivery and to facilitate secure payments without storing card details.
                  </p>
                </div>
              </section>

              {/* DATA PROTECTION RIGHTS */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  4. Your UK GDPR Data Protection Rights
                </h4>
                <div className="legal-gdpr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '10px' }}>
                  {[
                    { title: 'Right of access', desc: 'Ask for copies of your personal information.' },
                    { title: 'Right to rectification', desc: 'Ask to correct inaccurate or incomplete details.' },
                    { title: 'Right to erasure', desc: 'Ask to delete personal information in eligible circumstances.' },
                    { title: 'Right to restriction', desc: 'Ask us to limit the processing of your data.' },
                    { title: 'Right to object', desc: 'Object to the processing of your personal information.' },
                    { title: 'Right to data portability', desc: 'Request transfer of your data to another organization.' },
                    { title: 'Right to withdraw consent', desc: 'Withdraw consent at any time without fees.' }
                  ].map(r => (
                    <div key={r.title} style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>{r.title}</strong>
                      <span style={{ fontSize: '11.5px', color: '#685C50', lineHeight: 1.4, display: 'block' }}>{r.desc}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '12.5px', color: '#5C5146', margin: 0 }}>
                  Responses are provided without undue delay and within <strong>one calendar month</strong>. Contact: <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>houseofnina2026@gmail.com</a>.
                </p>
              </section>

              {/* RETENTION & SHARING */}
              <section style={{ marginBottom: '20px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                  5. Data Retention &amp; Sharing
                </h4>
                <p style={{ fontSize: '12.5px', color: '#5C5146', margin: '0 0 6px 0' }}>
                  We store personal information only for as long as needed to fulfill orders and comply with statutory UK accounting/tax laws (typically up to 6 years pursuant to HMRC guidelines), after which it is securely deleted.
                </p>
                <p style={{ fontSize: '12.5px', color: '#5C5146', margin: 0 }}>
                  We share personal information strictly with delivery couriers for product shipping and payment processors for transaction handling. We never sell your personal data.
                </p>
              </section>

              {/* HOW TO COMPLAIN / ICO */}
              <div style={{ background: '#FFFFFF', padding: '16px 18px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 6px 0' }}>
                  6. How to Complain
                </h4>
                <p style={{ fontSize: '12.5px', color: '#5C5146', margin: '0 0 8px 0' }}>
                  Contact us first at <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>houseofnina2026@gmail.com</a>. If you remain unsatisfied, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
                </p>
                <div style={{ background: '#F5EFE6', padding: '10px 14px', borderRadius: '8px', fontSize: '11.5px', color: '#5C5146', lineHeight: 1.5 }}>
                  <strong>ICO Head Office:</strong> 4th Floor, No.3 Circle Square, 5 Hawkshaw Street, Manchester M1 7BL<br />
                  <strong>Helpline:</strong> 0303 123 1113 • <strong>Web:</strong> <a href="https://www.ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>ico.org.uk/make-a-complaint</a>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 3: SHIPPING & RETURNS ===================== */}
          {activeTab === 'shipping' && (
            <div className="legal-article" style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div 
                className="legal-hero-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(235, 219, 197, 0.45) 0%, rgba(255, 255, 255, 0.85) 100%)',
                  padding: '18px 22px',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 196, 176, 0.6)',
                  marginBottom: '22px'
                }}
              >
                <h3 className="legal-hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 4px 0' }}>
                  Shipping, Delivery &amp; Returns Policy
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#5C5146' }}>
                  Delivery timeframes, international customs guidelines, and hygiene conditions for eligible returns.
                </p>
              </div>

              {/* DELIVERY TIMELINES */}
              <section style={{ marginBottom: '22px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '10px' }}>
                  Delivery Methods &amp; Estimated Timeframes
                </h4>
                <div className="legal-delivery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                  <div className="legal-delivery-card" style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                    <div className="legal-delivery-card-inner">
                      <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8074', fontWeight: 600 }}>Standard UK</span>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', margin: '2px 0 4px 0', color: 'var(--color-deep-espresso)' }}>
                        2–5 Working Days
                      </h5>
                    </div>
                    <p style={{ fontSize: '12px', color: '#685C50', margin: 0 }}>
                      Fully tracked. Excludes weekends and UK bank holidays.
                    </p>
                  </div>

                  <div className="legal-delivery-card" style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                    <div className="legal-delivery-card-inner">
                      <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8074', fontWeight: 600 }}>UK Priority</span>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', margin: '2px 0 4px 0', color: 'var(--color-deep-espresso)' }}>
                        1–2 Working Days
                      </h5>
                    </div>
                    <p style={{ fontSize: '12px', color: '#685C50', margin: 0 }}>
                      Next day dispatch for time-sensitive orders.
                    </p>
                  </div>

                  <div className="legal-delivery-card" style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                    <div className="legal-delivery-card-inner">
                      <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8074', fontWeight: 600 }}>Worldwide</span>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', margin: '2px 0 4px 0', color: 'var(--color-deep-espresso)' }}>
                        7–10 Working Days
                      </h5>
                    </div>
                    <p style={{ fontSize: '12px', color: '#685C50', margin: 0 }}>
                      International air parcel. Local duties/taxes are the buyer's responsibility.
                    </p>
                  </div>
                </div>
              </section>

              {/* 14-DAY CANCELLATION & RETURN CONDITIONS */}
              <section style={{ marginBottom: '22px' }}>
                <h4 className="legal-section-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', marginBottom: '8px' }}>
                  14-Day Statutory Cancellation &amp; Returns
                </h4>
                <p style={{ fontSize: '13px', color: '#5C5146', margin: '0 0 10px 0' }}>
                  You have <strong>14 days from delivery</strong> to cancel or request a return. We accept refund requests where the <strong>good is the wrong size</strong>.
                </p>

                {/* STRICT HYGIENE EXCLUSIONS ALERT */}
                <div style={{
                  background: '#FFF1F2',
                  border: '1.5px solid #FECDD3',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <AlertCircle size={16} color="#E11D48" />
                    <strong style={{ fontSize: '13px', color: '#9F1239' }}>Strict Hygiene Exclusions — Refunds Do NOT Apply to:</strong>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', color: '#BE123C', lineHeight: 1.55 }}>
                    <li><strong>If wig lace has been cut;</strong></li>
                    <li><strong>If any part of the wig has been tampered with;</strong> and</li>
                    <li><strong>Scarves.</strong></li>
                  </ul>
                </div>

                <div style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)', marginBottom: '6px' }}>
                    Return Procedure by Mail:
                  </strong>
                  <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#5C5146', lineHeight: 1.6 }}>
                    <li>Email <a href="mailto:houseofnina2026@gmail.com" style={{ color: 'var(--color-deep-espresso)', fontWeight: 600 }}>houseofnina2026@gmail.com</a> for return authorization.</li>
                    <li>Drop off parcel at your nearest delivery point and pay return postage.</li>
                    <li>Items must be in original unworn state with tags attached.</li>
                    <li>Reimbursement issued within 14 days of return receipt.</li>
                  </ol>
                </div>
              </section>

              {/* BESPOKE SERVICES NOTE */}
              <div style={{ background: '#F5EFE6', padding: '12px 14px', borderRadius: '8px', fontSize: '12px', color: '#5C5146', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-deep-espresso)' }}>Bespoke Services:</strong> Wig revamping, restyling, and construction are paid in full upon booking and are exempt from cancellation once work has commenced.
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="legal-modal-footer">
          <div className="legal-footer-contact" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7A6E62' }}>
            <span>Assistance:</span>
            <a 
              href="mailto:houseofnina2026@gmail.com" 
              style={{ color: 'var(--color-deep-espresso)', fontWeight: 600, textDecoration: 'none' }}
            >
              houseofnina2026@gmail.com
            </a>
          </div>

          <button
            type="button"
            className="btn-primary-editorial"
            onClick={onClose}
            style={{ padding: '9px 24px', fontSize: '13px' }}
          >
            Close &amp; Return to Store
          </button>
        </div>
      </div>
    </div>
  );
}
