import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate marketing service API integration point (e.g. Klaviyo, Mailchimp)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section id="contact" className="section-wrapper" aria-label="Newsletter Signup">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-icon-wrap" aria-hidden="true">
            <Mail size={24} />
          </div>

          <h2 className="newsletter-heading">Letters from the Wigverse.</h2>
          <p className="newsletter-subtext">
            New looks, hair care notes and updates from House of Nina.
          </p>

          {status === 'success' ? (
            <div className="newsletter-feedback success" style={{ padding: '16px', background: 'var(--color-olive-light)', borderRadius: '12px' }}>
              <p style={{ margin: 0, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Check size={18} /> Welcome to the Wigverse inner circle!
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--color-espresso-muted)' }}>
                You will receive our next editorial hair dispatch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-label="Email address for newsletter"
                required
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                className="newsletter-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="newsletter-feedback error" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
