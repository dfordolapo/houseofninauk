import React, { useState } from 'react';
import { Mail, Send, Check, AlertCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate newsletter dispatch registration
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 750);
  };

  return (
    <section 
      id="letters-from-the-wigverse" 
      className="section-wrapper newsletter-section" 
      aria-label="Letters from the Wigverse Email Subscription"
    >
      <div className="container newsletter-container">
        <div className="newsletter-card">
          
          {/* Subtle Ambient Golden Glow Behind Card */}
          <div className="newsletter-card-glow" aria-hidden="true" />

          {/* Main Display Heading */}
          <h2 className="newsletter-heading">
            Letters from the Wigverse.
          </h2>

          {/* Subtitle */}
          <p className="newsletter-subtext">
            Private invitations to one-of-one unit drops, new look releases, and masterclass lace care rituals delivered gently to your inbox.
          </p>

          {/* Interactive Form or Success State */}
          {status === 'success' ? (
            <div className="newsletter-success-state" role="status" aria-live="polite">
              <div className="newsletter-success-badge">
                <Check size={20} className="newsletter-success-icon" />
                <span className="newsletter-success-title">Welcome to the Inner Circle</span>
              </div>
              <p className="newsletter-success-desc">
                Your place in the Wigverse dispatch is reserved. Expect our next editorial hair dispatch shortly.
              </p>
              <button 
                type="button" 
                className="newsletter-another-btn"
                onClick={() => setStatus('idle')}
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
              <div className="newsletter-input-group">
                <div className="newsletter-input-icon" aria-hidden="true">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  aria-label="Email address for Letters from the Wigverse"
                  required
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit" 
                  className="newsletter-submit-btn"
                  disabled={status === 'loading'}
                  aria-label="Subscribe to Letters from the Wigverse"
                >
                  {status === 'loading' ? (
                    <span className="newsletter-btn-loader">Joining...</span>
                  ) : (
                    <>
                      <span>Join the Circle</span>
                      <Send size={15} className="newsletter-btn-arrow" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="newsletter-error-state" role="alert">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
