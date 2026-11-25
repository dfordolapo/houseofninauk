import React, { useEffect, useState } from 'react';
import { Cookie, Check, Settings2 } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'house_of_nina_cookie_consent_v1';
const OPEN_SETTINGS_EVENT = 'house_of_nina_open_cookie_settings';

export function readCookieConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function CookieConsentBanner({ onOpenLegal }) {
  const [isVisible, setIsVisible] = useState(() => !readCookieConsent());
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = readCookieConsent();
    if (stored) {
      setPreferences({
        analytics: Boolean(stored.analytics),
        marketing: Boolean(stored.marketing)
      });
    }
    const openSettings = () => setIsVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  const persist = (consent) => {
    const payload = {
      necessary: true,
      analytics: Boolean(consent.analytics),
      marketing: Boolean(consent.marketing),
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch {}
    try {
      window.dispatchEvent(new CustomEvent('house_of_nina_consent_changed', { detail: payload }));
    } catch {}
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-banner" role="dialog" aria-label="Cookie preferences" aria-modal="false">
      <div className="cookie-consent-heading">
        <span className="cookie-consent-icon"><Cookie size={17} /></span>
        <div>
          <h2>Your privacy, your choice</h2>
          <p>
            We use essential cookies to keep your bag and checkout working. With your permission,
            we also use optional cookies to understand visits and personalise offers.
          </p>
        </div>
      </div>

      {showSettings && (
        <div className="cookie-consent-options">
          <label className="cookie-consent-option">
            <input type="checkbox" checked disabled readOnly />
            <span><strong>Strictly necessary</strong><small>Required for cart, checkout and security.</small></span>
          </label>
          <label className="cookie-consent-option">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
            />
            <span><strong>Analytics</strong><small>Helps us improve the boutique experience.</small></span>
          </label>
          <label className="cookie-consent-option">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
            />
            <span><strong>Marketing</strong><small>Relevant collections and offers.</small></span>
          </label>
        </div>
      )}

      <div className="cookie-consent-actions">
        <button type="button" className="cookie-consent-accept" onClick={() => persist({ analytics: true, marketing: true })}>
          <Check size={14} /> Accept all
        </button>
        <button type="button" className="cookie-consent-reject" onClick={() => persist({ analytics: false, marketing: false })}>
          Reject optional
        </button>
        <button
          type="button"
          className="cookie-consent-manage"
          onClick={() => (showSettings ? persist(preferences) : setShowSettings(true))}
        >
          {showSettings ? <Check size={13} /> : <Settings2 size={13} />}
          {showSettings ? 'Save choices' : 'Manage'}
        </button>
      </div>

      <button
        type="button"
        className="cookie-consent-legal-link"
        onClick={() => onOpenLegal ? onOpenLegal('privacy') : null}
      >
        Read our Privacy &amp; Cookies notice
      </button>
    </div>
  );
}
