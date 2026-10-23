import React, { useState, useEffect } from 'react';
import { 
  X, Check, ArrowRight, CreditCard, Building2, Edit3, Lock, Truck, 
  MapPin, Plus, Home, Briefcase, Gift, ChevronRight, ChevronDown, ChevronUp, AlertCircle, ArrowLeft,
  ShieldCheck, Sparkles, CheckCircle2, Zap, Search
} from 'lucide-react';
import OrderSuccessReceipt from './OrderSuccessReceipt';

/** Authentic Official Apple Pay Mark (100% Vector Math - Official Apple Guidelines) */
function ApplePayLogo({ height = 22, color = "#FFFFFF" }) {
  const width = Math.round(height * 2.27);
  return (
    <svg
      width={width}
      height={height}
      viewBox="13.5 19.5 93 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      role="img"
      aria-label="Apple Pay"
    >
      {/* Apple Leaf */}
      <path d="M31.7358 25.6955C32.8058 24.3572 33.5319 22.5603 33.3404 20.724C31.7741 20.8019 29.8627 21.7573 28.7562 23.0967C27.7626 24.2436 26.8832 26.1158 27.1124 27.8751C28.8707 28.0276 30.6273 26.9962 31.7358 25.6955Z" fill={color} />
      {/* Apple Body with Bite */}
      <path d="M33.3204 28.2186C30.7671 28.0665 28.5961 29.6678 27.3767 29.6678C26.1567 29.6678 24.2894 28.2952 22.2698 28.3322C19.6412 28.3708 17.2022 29.8571 15.8682 32.2209C13.1246 36.9497 15.1442 43.9642 17.8122 47.8155C19.1079 49.7209 20.6694 51.8189 22.7269 51.7435C24.6709 51.6672 25.4328 50.4847 27.7958 50.4847C30.1571 50.4847 30.8435 51.7435 32.9013 51.7054C35.0353 51.6672 36.3695 49.799 37.6651 47.8918C39.1515 45.7198 39.7599 43.6225 39.7982 43.5073C39.7599 43.4692 35.6832 41.9053 35.6454 37.2158C35.6069 33.2892 38.8461 31.4215 38.9985 31.3057C37.1694 28.6003 34.3113 28.2952 33.3204 28.2186Z" fill={color} />
      {/* P */}
      <path d="M55.5533 22.9046C61.103 22.9046 64.9675 26.7301 64.9675 32.2997C64.9675 37.8892 61.0235 41.7345 55.4142 41.7345H49.2696V51.5062H44.8301V22.9046L55.5533 22.9046ZM49.2695 38.0081H54.3635C58.2288 38.0081 60.4286 35.9271 60.4286 32.3196C60.4286 28.7124 58.2288 26.6509 54.3834 26.6509H49.2695V38.0081Z" fill={color} />
      {/* a */}
      <path d="M66.1274 45.5799C66.1274 41.9326 68.9222 39.6929 73.8778 39.4154L79.5858 39.0786V37.4732C79.5858 35.1541 78.0198 33.7666 75.404 33.7666C72.9258 33.7666 71.3797 34.9556 71.0035 36.8191H66.9601C67.1979 33.0528 70.4086 30.278 75.5623 30.278C80.6165 30.278 83.8471 32.9538 83.8471 37.136V51.5062H79.7441V48.0772H79.6454C78.4365 50.3963 75.8001 51.8629 73.065 51.8629C68.9818 51.8629 66.1274 49.3258 66.1274 45.5799ZM79.5858 43.697V42.0518L74.452 42.3688C71.8951 42.5473 70.4484 43.6771 70.4484 45.461C70.4484 47.2842 71.9547 48.4736 74.254 48.4736C77.2468 48.4736 79.5858 46.4122 79.5858 43.697Z" fill={color} />
      {/* y */}
      <path d="M87.7206 59.177V55.7082C88.0372 55.7874 88.7506 55.7874 89.1077 55.7874C91.0896 55.7874 92.1601 54.9551 92.8139 52.8145C92.8139 52.7747 93.1908 51.5459 93.1908 51.5261L85.6592 30.6546H90.2967L95.5696 47.6214H95.6484L100.921 30.6546H105.44L97.6303 52.5962C95.8472 57.6508 93.7857 59.276 89.4648 59.276C89.1077 59.276 88.0372 59.2363 87.7206 59.177Z" fill={color} />
    </svg>
  );
}

/** Authentic Official Google Pay Mark (100% Vector Math - Official Google Brand Guidelines) */
function GooglePayLogo({ height = 20, color = "#3C4043" }) {
  const width = Math.round(height * 2.42);
  return (
    <svg
      width={width}
      height={height}
      viewBox="14 20.5 92 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      role="img"
      aria-label="Google Pay"
    >
      {/* 4-Color Google G */}
      <path d="M44.1722 36.8948C44.1722 35.8542 44.0842 34.8488 43.917 33.8896H29.9602V39.5832H37.955C37.6239 41.4215 36.5557 43.0445 34.9982 44.0756V47.7716H39.77C42.564 45.1976 44.1722 41.3916 44.1722 36.8948Z" fill="#4285F4" />
      <path d="M29.9603 51.34C33.9555 51.34 37.3171 50.031 39.7701 47.7738L34.9983 44.0756C33.6717 44.9688 31.9623 45.4902 29.9603 45.4902C26.1015 45.4902 22.8235 42.8898 21.6531 39.3874H16.7383V43.1956C19.2527 48.1909 24.3678 51.3425 29.9603 51.3422" fill="#34A853" />
      <path d="M21.6529 39.3874C21.0355 37.5518 21.0355 35.5646 21.6529 33.729V29.9208H16.7381C15.6991 31.9782 15.1587 34.2512 15.1606 36.556C15.1606 38.943 15.7327 41.198 16.7381 43.1934L21.6529 39.3852V39.3874Z" fill="#FABB05" />
      <path d="M29.96 27.6262C32.1424 27.6262 34.096 28.3742 35.636 29.8438V29.846L39.86 25.6264C37.2992 23.2416 33.9552 21.7764 29.9622 21.7764C24.3703 21.7757 19.2553 24.9264 16.7402 29.9208L21.655 33.729C22.8254 30.2266 26.1034 27.6262 29.9622 27.6262" fill="#E94235" />
      {/* Official "Pay" Typography in Pure Vector */}
      <path d="M57.5437 26.997V35.9796H63.0833C64.4033 35.9796 65.4945 35.5352 66.3569 34.6486C67.2435 33.7642 67.6879 32.7082 67.6879 31.4872C67.6879 30.2904 67.2435 29.2476 66.3569 28.3588C65.4945 27.4502 64.4033 26.9948 63.0833 26.9948H57.5437V26.997ZM57.5437 39.141V49.5602H54.2349V23.8356H63.0129C65.2415 23.8356 67.1335 24.577 68.6933 26.062C70.2773 27.547 71.0693 29.3554 71.0693 31.4872C71.0693 33.6674 70.2773 35.489 68.6933 36.9476C67.1599 38.4106 65.2635 39.1388 63.0107 39.1388H57.5437V39.141ZM74.4133 44.1724C74.4133 45.0348 74.7785 45.752 75.5111 46.3284C76.2415 46.9004 77.0995 47.1886 78.0807 47.1886C79.4733 47.1886 80.7119 46.6738 81.8031 45.6464C82.8965 44.6146 83.4399 43.4046 83.4399 42.0164C82.4081 41.2024 80.9693 40.7954 79.1235 40.7954C77.7815 40.7954 76.6595 41.121 75.7619 41.7678C74.8621 42.4146 74.4133 43.2132 74.4133 44.1724ZM78.6945 31.3794C81.1409 31.3794 83.0703 32.0328 84.4871 33.3374C85.8995 34.6442 86.6079 36.435 86.6079 38.7098V49.5602H83.4421V47.1182H83.2991C81.9307 49.129 80.1091 50.1366 77.8299 50.1366C75.8895 50.1366 74.2637 49.5602 72.9569 48.4118C71.6501 47.2612 70.9967 45.8246 70.9967 44.0998C70.9967 42.2782 71.6853 40.8306 73.0647 39.7526C74.4441 38.6746 76.2833 38.1356 78.5867 38.1356C80.5491 38.1356 82.1705 38.4942 83.4399 39.2136V38.4568C83.4399 37.3084 82.9845 36.3316 82.0737 35.5308C81.1961 34.7411 80.0531 34.3114 78.8727 34.3274C77.0247 34.3274 75.5639 35.104 74.4837 36.6638L71.5709 34.829C73.1769 32.53 75.5529 31.3794 78.6945 31.3794ZM104.771 31.9558L93.7271 57.3218H90.3105L94.4113 48.447L87.1469 31.9558H90.7439L95.9953 44.6036H96.0657L101.174 31.9536L104.771 31.9558Z" fill={color} />
    </svg>
  );
}

/** Authentic Klarna Badge */
function KlarnaBadge() {
  return (
    <span style={{
      fontSize: '11px',
      fontWeight: 800,
      padding: '3px 9px',
      borderRadius: '5px',
      background: '#FFB3C7',
      color: '#0A0A0A',
      letterSpacing: '0.02em',
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      Klarna.
    </span>
  );
}

/** Authentic Revolut Pay Badge */
function RevolutPayBadge() {
  return (
    <span style={{
      fontSize: '11px',
      fontWeight: 800,
      padding: '3px 8px',
      borderRadius: '5px',
      background: '#000000',
      color: '#FFFFFF',
      letterSpacing: '0.04em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <span style={{ color: '#0075FF', fontWeight: 900 }}>R</span>evolut <span style={{ fontSize: '9px', backgroundColor: '#0075FF', color: '#FFFFFF', padding: '1px 4px', borderRadius: '3px', fontWeight: 700 }}>PAY</span>
    </span>
  );
}

/** Authentic Amazon Pay Badge */
function AmazonPayBadge() {
  return (
    <span style={{
      fontSize: '11px',
      fontWeight: 700,
      padding: '3px 8px',
      borderRadius: '5px',
      background: '#FFFFFF',
      color: '#131921',
      border: '1px solid #D5D9D9',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      amazon<span style={{ color: '#FF9900', fontWeight: 800 }}>pay</span>
    </span>
  );
}

/** Regional Method Badges */
function BancontactBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#003A70', color: '#FFCC00', letterSpacing: '0.02em' }}>
      Bancontact
    </span>
  );
}

function IdealBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#CC0066', color: '#FFFFFF' }}>
      iDEAL
    </span>
  );
}

function BlikBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E60000', color: '#FFFFFF', letterSpacing: '0.05em' }}>
      BLIK
    </span>
  );
}

function MbWayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E30613', color: '#FFFFFF' }}>
      MB WAY
    </span>
  );
}

function EpsBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E30613', color: '#FFFFFF' }}>
      eps
    </span>
  );
}

function SatispayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FD3743', color: '#FFFFFF' }}>
      satispay
    </span>
  );
}

function KakaoPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FFEB00', color: '#3C1E1E' }}>
      kakao pay
    </span>
  );
}

function NaverPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#03C75A', color: '#FFFFFF' }}>
      N Pay
    </span>
  );
}

function SamsungPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#0C2340', color: '#FFFFFF' }}>
      SAMSUNG pay
    </span>
  );
}

function PaycoBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FA142B', color: '#FFFFFF' }}>
      PAYCO
    </span>
  );
}

/** Express 1-Tap Checkout Bar Component (Clean, Minimalist, 4 Wallets) */
function ExpressCheckoutBar({ onExpressPay, isSubmitting }) {
  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      border: '1.5px solid rgba(197, 160, 89, 0.4)',
      borderRadius: '14px',
      padding: '16px 18px',
      marginBottom: '18px',
      textAlign: 'center',
      boxShadow: '0 4px 18px rgba(36, 28, 25, 0.04)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-deep-espresso)',
        marginBottom: '12px'
      }}>
        Express 1-Tap Checkout
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '8px'
      }}>
        {/* Apple Pay Button */}
        <button
          type="button"
          onClick={() => onExpressPay('apple_pay')}
          disabled={isSubmitting}
          title="Pay with Apple Pay"
          style={{
            height: '42px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)'
          }}
        >
          <ApplePayLogo height={19} color="#FFFFFF" />
        </button>

        {/* Google Pay Button */}
        <button
          type="button"
          onClick={() => onExpressPay('google_pay')}
          disabled={isSubmitting}
          title="Pay with Google Pay"
          style={{
            height: '42px',
            backgroundColor: '#FFFFFF',
            color: '#1C1614',
            border: '1.5px solid #D8DFE8',
            borderRadius: '9px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
          }}
        >
          <GooglePayLogo height={18} />
        </button>

        {/* Revolut Pay Button */}
        <button
          type="button"
          onClick={() => onExpressPay('revolut')}
          disabled={isSubmitting}
          title="Pay with Revolut Pay"
          style={{
            height: '42px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)'
          }}
        >
          <RevolutPayBadge />
        </button>

        {/* Amazon Pay Button */}
        <button
          type="button"
          onClick={() => onExpressPay('amazon_pay')}
          disabled={isSubmitting}
          title="Pay with Amazon Pay"
          style={{
            height: '42px',
            backgroundColor: '#FFFFFF',
            color: '#131921',
            border: '1.5px solid #D8DFE8',
            borderRadius: '9px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
          }}
        >
          <AmazonPayBadge />
        </button>
      </div>
    </div>
  );
}

const DEFAULT_SAVED_ADDRESSES = [
  {
    id: 'home',
    label: 'Home',
    fullName: 'Amara Okafor',
    address: '14 Mayfair Place, Flat 3B',
    city: 'London',
    state: 'Greater London',
    postalCode: 'W1J 8AJ',
    phone: '+44 7776 759731',
    isDefault: false
  },
  {
    id: 'work',
    label: 'Work',
    fullName: 'Amara Okafor',
    address: "8 St James's Square, Suite 402",
    city: 'London',
    state: 'Greater London',
    postalCode: 'SW1Y 4JU',
    phone: '+44 7776 759731',
    isDefault: false
  },
  {
    id: 'gift',
    label: 'Gift',
    fullName: 'Zainab Okafor',
    address: '22 Victoria Avenue, Flat 2',
    city: 'Manchester',
    state: 'Greater Manchester',
    postalCode: 'M20 2EA',
    phone: '+44 7780 123456',
    isDefault: false
  }
];

/**
 * Stripe Accepted Global Currencies (Comprehensive list formatted for international luxury clients)
 */
export const STRIPE_SUPPORTED_CURRENCIES = [
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1, country: 'United Kingdom' },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.28, country: 'United States' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1.17, country: 'European Union' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1800, country: 'Nigeria' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.74, country: 'Canada' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rate: 1.95, country: 'Australia' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 4.70, country: 'United Arab Emirates' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rate: 4.80, country: 'Saudi Arabia' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 1.14, country: 'Switzerland' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 195, country: 'Japan' },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar', rate: 1.71, country: 'Singapore' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 9.98, country: 'Hong Kong' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 2.15, country: 'New Zealand' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 1720, country: 'South Korea' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 13.5, country: 'Sweden' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 8.75, country: 'Denmark' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 13.8, country: 'Norway' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', rate: 5.10, country: 'Poland' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 23.5, country: 'South Africa' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 107, country: 'India' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 6.95, country: 'Brazil' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', rate: 24.5, country: 'Mexico' },
  { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', rate: 4.66, country: 'Qatar' },
  { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', rate: 0.39, country: 'Kuwait' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', rate: 4.75, country: 'Israel' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 43.5, country: 'Turkey' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', rate: 29.5, country: 'Czech Republic' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', rate: 465, country: 'Hungary' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', rate: 5.82, country: 'Romania' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 5.65, country: 'Malaysia' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 46.2, country: 'Thailand' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 73.5, country: 'Philippines' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 20200, country: 'Indonesia' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Đồng', rate: 32000, country: 'Vietnam' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', rate: 19.8, country: 'Ghana' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 165, country: 'Kenya' }
];

/**
 * ============================================================================
 * HOUSE OF NINA: 2-STEP LUXURY CHECKOUT WITH SAVED ADDRESSES & STICKY HEADER
 * ============================================================================
 * Step 1: Delivery & Shipping (Saved Addresses: Home, Work, Gift, + Custom)
 * Step 2: Payment Selection & Review (Stripe Card, Klarna, Direct Bank Wire)
 * Step 3: Digital Order Receipt
 */
export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  checkoutData = {},
  onClearCart,
  onOpenCart
}) {
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Delivery, 2: Payment
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState('');
  const [stepError, setStepError] = useState('');

  // Saved addresses state with localStorage persistence
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem('house_of_nina_saved_addresses');
      return stored ? JSON.parse(stored) : DEFAULT_SAVED_ADDRESSES;
    } catch {
      return DEFAULT_SAVED_ADDRESSES;
    }
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [saveAsLabel, setSaveAsLabel] = useState('Home');
  const [showSaveAddressPrompt, setShowSaveAddressPrompt] = useState(false);

  // Form State - Nothing auto-filled or pre-selected
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    countryCode: "+44",
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    deliveryMethod: "standard", // standard | express
    paymentMethod: "", // Empty by default: user chooses method themselves
    currency: "GBP", // GBP | NGN
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  // Billing currency dropdown drawer and search state
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');

  // Auxiliary states
  const [applePayMode, setApplePayMode] = useState('ready');
  const [appleCardData, setAppleCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const [googlePayMode, setGooglePayMode] = useState('saved');
  const [gpayCardData, setGpayCardData] = useState({ number: '', expiry: '', cvc: '', name: '', zip: '' });

  const [klarnaMode, setKlarnaMode] = useState('new');
  const [klarnaData, setKlarnaData] = useState({
    phone: '',
    dob: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [bankWireData, setBankWireData] = useState({
    senderBank: '',
    accountHolder: '',
    referenceNote: ''
  });

  const [saveCardForFuture, setSaveCardForFuture] = useState(true);

  // Payment categories filter: 'all' | 'uk_global' | 'europe' | 'asia' | 'bank'
  const [paymentCategory, setPaymentCategory] = useState('all');

  // Regional Payment States
  const [revolutMode, setRevolutMode] = useState('app');
  const [revolutData, setRevolutData] = useState({ phone: '', cardNumber: '', cardExpiry: '', cardCvc: '' });
  const [idealBank, setIdealBank] = useState('ing');
  const [blikCode, setBlikCode] = useState('');
  const [mbWayPhone, setMbWayPhone] = useState('');
  const [epsBank, setEpsBank] = useState('erste');
  const [satispayPhone, setSatispayPhone] = useState('');
  const [koreanWalletData, setKoreanWalletData] = useState({ phone: '', provider: 'kakao' });

  if (!isOpen) return null;

  const standardInputStyle = {
    width: '100%',
    height: '36px',
    padding: '7px 10px',
    borderRadius: '7px',
    border: '1px solid var(--color-border)',
    fontSize: '11px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    color: 'var(--color-deep-espresso)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };

  // Selected Currency Details from Supported Currencies List
  const currentCurrency = STRIPE_SUPPORTED_CURRENCIES.find(c => c.code === (formData.currency || 'GBP')) || STRIPE_SUPPORTED_CURRENCIES[0];
  const currencySymbol = currentCurrency.symbol;
  const rate = currentCurrency.rate;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 200;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  const subtotal = rawSubtotal * rate;
  const rawDiscount = checkoutData.discountAmount || 0;
  const discount = rawDiscount * rate;

  const standardShippingCost = 0; // Complimentary standard delivery
  const expressShippingCost = Math.round(8.5 * rate); // Royal Mail Special Delivery Guaranteed by 1pm
  const shippingCost = formData.deliveryMethod === 'express'
    ? expressShippingCost
    : (formData.deliveryMethod === 'standard' ? standardShippingCost : 0);

  const total = Math.max(0, subtotal - discount + shippingCost);

  const formatPrice = (val) => {
    const decimals = ['JPY', 'KRW', 'VND', 'IDR', 'HUF'].includes(formData.currency) ? 0 : 2;
    return `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  };

  const filteredCurrencies = STRIPE_SUPPORTED_CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(currencySearch.toLowerCase()) || 
    c.name.toLowerCase().includes(currencySearch.toLowerCase()) || 
    c.country.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const shouldShowMethod = (m) => {
    if (paymentCategory === 'all') return true;
    if (paymentCategory === 'uk_global') {
      return ['card', 'apple_pay', 'google_pay', 'revolut', 'amazon_pay', 'klarna'].includes(m);
    }
    if (paymentCategory === 'europe') {
      return ['revolut', 'bancontact', 'ideal', 'blik', 'mbway', 'eps', 'satispay'].includes(m);
    }
    if (paymentCategory === 'asia') {
      return ['kakao_pay', 'naver_pay', 'samsung_pay', 'payco'].includes(m);
    }
    if (paymentCategory === 'bank') {
      return m === 'bank';
    }
    return true;
  };

  const getPaymentButtonLabel = (method) => {
    if (!method) return `Select Payment Method (${formatPrice(total)})`;
    switch (method) {
      case 'apple_pay':
        return `Pay ${formatPrice(total)} with Apple Pay`;
      case 'google_pay':
        return `Pay ${formatPrice(total)} with Google Pay`;
      case 'revolut':
        return `Pay ${formatPrice(total)} with Revolut Pay`;
      case 'amazon_pay':
        return `Pay ${formatPrice(total)} with Amazon Pay`;
      case 'klarna':
        return `Pay 1st Part ${formatPrice(total / 3)} with Klarna`;
      case 'bancontact':
        return `Pay ${formatPrice(total)} with Bancontact`;
      case 'ideal':
        return `Proceed with iDEAL (${formatPrice(total)})`;
      case 'blik':
        return `Confirm BLIK Payment (${formatPrice(total)})`;
      case 'mbway':
        return `Authorize with MB WAY (${formatPrice(total)})`;
      case 'eps':
        return `Proceed to Bank via EPS (${formatPrice(total)})`;
      case 'satispay':
        return `Authorize Satispay (${formatPrice(total)})`;
      case 'kakao_pay':
        return `Pay with Kakao Pay (${formatPrice(total)})`;
      case 'naver_pay':
        return `Pay with Naver Pay (${formatPrice(total)})`;
      case 'samsung_pay':
        return `Pay with Samsung Pay (${formatPrice(total)})`;
      case 'payco':
        return `Pay with PAYCO (${formatPrice(total)})`;
      case 'bank':
        return `Confirm Bank Wire Booking (${formatPrice(total)})`;
      case 'card':
        return `Pay ${formatPrice(total)} with Card`;
      default:
        return `Select Payment Method (${formatPrice(total)})`;
    }
  };

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (stepError) setStepError('');
  };

  const handleTogglePaymentMethod = (method) => {
    handleChange('paymentMethod', formData.paymentMethod === method ? '' : method);
  };

  const handleSelectSavedAddress = (addr) => {
    if (selectedAddressId === addr.id) {
      // Toggle off if tapping selected address chip again
      setSelectedAddressId(null);
      setIsEditingAddress(false);
      setShowSaveAddressPrompt(false);
      setFormData(prev => ({
        ...prev,
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: ''
      }));
      return;
    }
    setSelectedAddressId(addr.id);
    setIsEditingAddress(false);
    setShowSaveAddressPrompt(false);
    setFormData(prev => ({
      ...prev,
      fullName: addr.fullName,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      phone: addr.phone || prev.phone
    }));
    if (stepError) setStepError('');
  };

  const handleSelectNewAddress = () => {
    setSelectedAddressId('new');
    setIsEditingAddress(true);
    setShowSaveAddressPrompt(true);
    setFormData(prev => ({
      ...prev,
      fullName: '',
      address: '',
      city: '',
      state: '',
      postalCode: ''
    }));
    if (stepError) setStepError('');
  };

  const handleSaveAddressToBook = () => {
    if (!formData.address || !formData.city || !formData.postalCode) return;
    const newId = `addr_${Date.now()}`;
    const newEntry = {
      id: newId,
      label: saveAsLabel || 'Other',
      fullName: formData.fullName || 'Client',
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      phone: formData.phone
    };
    const updated = [...savedAddresses, newEntry];
    setSavedAddresses(updated);
    setSelectedAddressId(newId);
    setShowSaveAddressPrompt(false);
    setIsEditingAddress(false);
    try {
      localStorage.setItem('house_of_nina_saved_addresses', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedToPayment = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setStepError('Please enter a valid email address.');
      return;
    }
    if (!formData.fullName?.trim() || !formData.address?.trim() || !formData.city?.trim() || !formData.postalCode?.trim()) {
      setStepError('Please complete your recipient name and delivery address.');
      return;
    }
    if (!formData.deliveryMethod) {
      setStepError('Please choose your preferred delivery speed.');
      return;
    }
    setStepError('');
    setCheckoutStep(2);
  };

  const handleCardNumberChange = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleChange('cardNumber', formatted);
  };

  const handleCardExpiryChange = (raw) => {
    const clean = raw.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) {
      handleChange('cardExpiry', `${clean.slice(0, 2)}/${clean.slice(2)}`);
    } else {
      handleChange('cardExpiry', clean);
    }
  };

  const handleCardCvcChange = (raw) => {
    const clean = raw.replace(/\D/g, '').slice(0, 4);
    handleChange('cardCvc', clean);
  };

  const handleExpressPay = (method) => {
    // Select the chosen express payment method
    handleChange('paymentMethod', method);

    // Auto-select the default Saved Home address if empty so details are pre-filled
    const defaultAddr = savedAddresses.find(a => a.id === 'home') || savedAddresses[0];
    if (defaultAddr && (!formData.fullName || !formData.address)) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || defaultAddr.fullName,
        address: prev.address || defaultAddr.address,
        city: prev.city || defaultAddr.city,
        state: prev.state || defaultAddr.state,
        postalCode: prev.postalCode || defaultAddr.postalCode,
        phone: prev.phone || defaultAddr.phone,
        email: prev.email || 'amara.okafor@gmail.com',
        deliveryMethod: prev.deliveryMethod || 'standard',
        paymentMethod: method
      }));
      setSelectedAddressId(defaultAddr.id);
    }

    // Switch directly to Step 2 so the user sees the payment method view
    setCheckoutStep(2);
  };

  const handlePlaceOrder = (e, explicitMethod = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const chosenPayment = explicitMethod || formData.paymentMethod;

    if (!chosenPayment) {
      setStepError('Please select your preferred payment method or use Express 1-Tap.');
      return;
    }

    if (chosenPayment === 'card') {
      if (!formData.cardName?.trim() || !formData.cardNumber?.trim() || !formData.cardExpiry?.trim() || !formData.cardCvc?.trim()) {
        setStepError('Please complete your card details (Cardholder Name, 16-Digit Number, Expiry, and CVC).');
        return;
      }
    } else if (chosenPayment === 'google_pay') {
      if (googlePayMode === 'new' && (!gpayCardData.number?.trim() || !gpayCardData.expiry?.trim() || !gpayCardData.cvc?.trim())) {
        setStepError('Please enter your card number, expiry, and CVC to complete Google Pay.');
        return;
      }
    } else if (chosenPayment === 'apple_pay') {
      if (applePayMode === 'no_card') {
        setStepError('No card detected in Apple Wallet. Please click "Pay with Credit/Debit Card Instead" below or add a card.');
        return;
      } else if (applePayMode === 'add_card' && (!appleCardData.number?.trim() || !appleCardData.expiry?.trim() || !appleCardData.cvc?.trim())) {
        setStepError('Please enter your card number and expiry to add to Apple Wallet.');
        return;
      }
    } else if (chosenPayment === 'klarna') {
      if (klarnaMode === 'new' && (!klarnaData.cardNumber?.trim() || !klarnaData.cardExpiry?.trim() || !(klarnaData.phone || formData.phone)?.trim())) {
        setStepError('Please enter your mobile phone and installment card details for Klarna Pay in 3.');
        return;
      }
    } else if (chosenPayment === 'revolut') {
      if (revolutMode === 'card' && (!revolutData.cardNumber || !revolutData.cardExpiry)) {
        setStepError('Please enter your Revolut card details.');
        return;
      }
    } else if (chosenPayment === 'blik') {
      if (!blikCode || blikCode.replace(/\D/g, '').length < 6) {
        setStepError('Please enter your 6-digit BLIK code from your Polish banking app.');
        return;
      }
    } else if (chosenPayment === 'mbway') {
      if (!mbWayPhone && !formData.phone) {
        setStepError('Please enter your Portuguese mobile phone number for MB WAY approval.');
        return;
      }
    } else if (chosenPayment === 'bank') {
      if (!bankWireData.accountHolder?.trim()) {
        setStepError('Please provide your sender account holder name for bank transfer verification.');
        return;
      }
    }

    setStepError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
        ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      let paymentLabel = 'Stripe Verified Card (•••• 4892)';
      if (chosenPayment === 'card' && formData.cardNumber) {
        const last4 = formData.cardNumber.replace(/\s/g, '').slice(-4);
        paymentLabel = `Stripe Card (•••• ${last4 || '4892'})`;
      } else if (chosenPayment === 'apple_pay') {
        const last4 = appleCardData.number ? appleCardData.number.replace(/\s/g, '').slice(-4) : '8821';
        paymentLabel = `Apple Pay (•••• ${last4})`;
      } else if (chosenPayment === 'google_pay') {
        const last4 = gpayCardData.number ? gpayCardData.number.replace(/\s/g, '').slice(-4) : '4012';
        paymentLabel = `Google Pay (•••• ${last4})`;
      } else if (chosenPayment === 'revolut') {
        paymentLabel = 'Revolut Pay (UK/EU Verified)';
      } else if (chosenPayment === 'amazon_pay') {
        paymentLabel = 'Amazon Pay (Verified)';
      } else if (chosenPayment === 'klarna') {
        const last4 = klarnaData.cardNumber ? klarnaData.cardNumber.replace(/\s/g, '').slice(-4) : '4892';
        paymentLabel = `Klarna Pay in 3 (•••• ${last4})`;
      } else if (chosenPayment === 'bancontact') {
        paymentLabel = 'Bancontact (Belgium Direct)';
      } else if (chosenPayment === 'ideal') {
        paymentLabel = `iDEAL (${idealBank.toUpperCase()} Netherlands)`;
      } else if (chosenPayment === 'blik') {
        paymentLabel = `BLIK (${blikCode || '729 481'} Poland)`;
      } else if (chosenPayment === 'mbway') {
        paymentLabel = `MB WAY (${mbWayPhone || '+351'} Portugal)`;
      } else if (chosenPayment === 'eps') {
        paymentLabel = `EPS (${epsBank.toUpperCase()} Austria)`;
      } else if (chosenPayment === 'satispay') {
        paymentLabel = `Satispay (Italy Direct)`;
      } else if (chosenPayment === 'kakao_pay') {
        paymentLabel = 'Kakao Pay (South Korea)';
      } else if (chosenPayment === 'naver_pay') {
        paymentLabel = 'Naver Pay (South Korea)';
      } else if (chosenPayment === 'samsung_pay') {
        paymentLabel = 'Samsung Pay (South Korea)';
      } else if (chosenPayment === 'payco') {
        paymentLabel = 'PAYCO (South Korea)';
      } else if (chosenPayment === 'bank') {
        paymentLabel = `Direct Bank Wire (${bankWireData.senderBank || 'Barclays'} - ${bankWireData.accountHolder || 'Client'})`;
      }

      let deliveryLabel = 'Royal Mail 48 Tracked (Complimentary)';
      if (formData.deliveryMethod === 'express') deliveryLabel = 'Royal Mail Special Delivery Guaranteed (1pm)';

      const newOrder = {
        orderId: `HN${randomOrderNum}`,
        date: dateStr,
        customer: {
          fullName: formData.fullName || "Valued Client",
          email: formData.email || "client@houseofnina.co.uk",
          phone: formData.phone || "+44 7776 759731",
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        },
        items: cartItems.map(item => ({
          ...item,
          price: (typeof item.price === 'number' ? item.price : 200) * rate,
          currencySymbol
        })),
        deliveryMethod: deliveryLabel,
        paymentMethod: paymentLabel,
        subtotal,
        shippingCost,
        discount,
        promoCode: checkoutData.promoCode || null,
        orderNote: checkoutData.orderNote || null,
        total,
        currencySymbol
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      setIsConfirmed(true);

      if (onClearCart) onClearCart();
    }, 1350);
  };

  // Get active address label helper
  const activeSaved = savedAddresses.find(a => a.id === selectedAddressId);
  const currentAddressTag = activeSaved ? activeSaved.label : (selectedAddressId === 'new' ? 'New Address' : 'Custom');

  // When order is confirmed, render the luxury OrderSuccessReceipt directly without nested modal backdrops
  if (isConfirmed) {
    return (
      <OrderSuccessReceipt
        isOpen={isOpen}
        order={confirmedOrder}
        onClose={onClose}
        onContinueShopping={() => {
          onClose();
          setIsConfirmed(false);
        }}
      />
    );
  }

  return (
    <div className={`checkout-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className="checkout-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Secure Luxury Checkout"
        style={{ maxWidth: '980px', position: 'relative' }}
      >
        {/* STICKY TOP HEADER PINNED WITH CLOSE BUTTON & ICON STEP PROGRESS */}
        <div className="checkout-modal-header">
          <div className="checkout-header-branding" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: '1 1 0' }}>
            <span className="checkout-brand-title">
              House of Nina
            </span>
          </div>

          {/* Luxury Compact Icon Step Indicator (Never Spills or Overflows) */}
          <div className="checkout-step-icons" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setCheckoutStep(1)}
              className={`checkout-step-icon-btn ${checkoutStep === 1 ? 'active' : 'completed'}`}
              title="Step 1: Delivery Details"
              aria-label="Step 1: Delivery Details"
            >
              {checkoutStep > 1 ? <Check size={13} strokeWidth={2.5} /> : <Truck size={14} />}
              <span className="step-icon-label">Delivery</span>
            </button>

            <div className="checkout-step-icon-line" />

            <button
              type="button"
              onClick={() => setCheckoutStep(2)}
              className={`checkout-step-icon-btn ${checkoutStep === 2 ? 'active' : ''}`}
              title="Step 2: Payment & Review"
              aria-label="Step 2: Payment & Review"
            >
              <CreditCard size={14} />
              <span className="step-icon-label">Payment</span>
            </button>
          </div>

          {/* Close Button Pinned at Top Right — Perfectly Centered in its flex column and Never Cut Off */}
          <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              type="button"
              className="checkout-close-btn"
              onClick={onClose}
              aria-label="Close checkout"
            >
              <X size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CHECKOUT BODY */}
        <div className="checkout-content-container">
          <div className="checkout-grid-layout">

            {/* Left Column: Form Details based on Step */}
            <div className="checkout-form-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {stepError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  backgroundColor: '#FDF2F2',
                  border: '1px solid #F8B4B4',
                  borderRadius: '10px',
                  color: '#9B1C1C',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  <AlertCircle size={16} flexShrink={0} />
                  <span>{stepError}</span>
                </div>
              )}

              {/* ══════════════════════════════════════════════════════════
                      STEP 1: DELIVERY & ADDRESS MANAGEMENT
                      ══════════════════════════════════════════════════════════ */}
              {checkoutStep === 1 && (
                <>
                  {/* 1. Contact Information Card */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      1. Contact Information
                    </h3>

                    <div className="checkout-row-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@domain.com"
                          required
                          style={standardInputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                          Phone Number (Delivery SMS)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+44 7776 000000"
                          required
                          style={standardInputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Saved Addresses & Shipping Selection */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '6px' }}>
                      <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        2. Delivery Address
                      </h3>
                      <span style={{ fontSize: '11px', color: '#8C8074' }}>
                        Saved Client Book
                      </span>
                    </div>

                    {/* Saved Address Chips */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {savedAddresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        let IconComponent = Home;
                        if (addr.label.toLowerCase().includes('work')) IconComponent = Briefcase;
                        if (addr.label.toLowerCase().includes('gift')) IconComponent = Gift;

                        return (
                          <button
                            key={addr.id}
                            type="button"
                            onClick={() => handleSelectSavedAddress(addr)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: '1.5px solid',
                              borderColor: isSelected ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                              backgroundColor: isSelected ? 'var(--color-deep-espresso)' : '#FAF8F5',
                              color: isSelected ? '#FFFFFF' : 'var(--color-deep-espresso)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <IconComponent size={12} />
                            <span>{addr.label}</span>
                            {isSelected && <Check size={11} />}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={handleSelectNewAddress}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: '1.5px dashed',
                          borderColor: selectedAddressId === 'new' ? 'var(--color-gold-dark)' : 'var(--color-border)',
                          backgroundColor: selectedAddressId === 'new' ? '#FAF5EB' : '#FFFFFF',
                          color: selectedAddressId === 'new' ? 'var(--color-gold-dark)' : '#685C50'
                        }}
                      >
                        <Plus size={12} />
                        <span>Add Address</span>
                      </button>
                    </div>

                    {/* Selected Address Display Card when NOT in manual edit mode */}
                    {!isEditingAddress && activeSaved && (
                      <div style={{
                        padding: '14px',
                        backgroundColor: '#FAF8F5',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}>
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>
                            {formData.fullName} • {activeSaved.label}
                          </strong>
                          <span style={{ fontSize: '12px', color: '#685C50', display: 'block' }}>
                            {formData.address}, {formData.city}, {formData.state} {formData.postalCode}
                          </span>
                          <span style={{ fontSize: '11.5px', color: '#8C8074', display: 'block', marginTop: '2px' }}>
                            Tel: {formData.phone}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsEditingAddress(true)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-gold-dark)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 6px',
                            textDecoration: 'underline'
                          }}
                        >
                          Edit Address
                        </button>
                      </div>
                    )}

                    {/* Full Address Inputs (Shown if editing, no saved address selected, or new) */}
                    {(isEditingAddress || !activeSaved || selectedAddressId === 'new') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: activeSaved ? '10px' : '0' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                            Recipient Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="Recipient full name"
                            required
                            style={standardInputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                            Street Address &amp; Suite / Apt
                          </label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="House number, street name, apartment"
                            required
                            style={standardInputStyle}
                          />
                        </div>

                        <div className="checkout-row-3">
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              City
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => handleChange('city', e.target.value)}
                              placeholder="City"
                              required
                              style={standardInputStyle}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              County / State
                            </label>
                            <input
                              type="text"
                              value={formData.state}
                              onChange={(e) => handleChange('state', e.target.value)}
                              placeholder="Greater London"
                              required
                              style={standardInputStyle}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              Postcode
                            </label>
                            <input
                              type="text"
                              value={formData.postalCode}
                              onChange={(e) => handleChange('postalCode', e.target.value)}
                              placeholder="W1J 8AJ"
                              required
                              style={standardInputStyle}
                            />
                          </div>
                        </div>

                        {/* Save to Client Book Prompt */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          backgroundColor: '#FAF8F5',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginTop: '4px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11.5px', color: 'var(--color-deep-espresso)', fontWeight: 600 }}>
                              Save to Book as:
                            </span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {['Home', 'Work', 'Gift', 'Other'].map(lbl => (
                                <button
                                  key={lbl}
                                  type="button"
                                  onClick={() => setSaveAsLabel(lbl)}
                                  style={{
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    border: '1px solid',
                                    borderColor: saveAsLabel === lbl ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                                    backgroundColor: saveAsLabel === lbl ? 'var(--color-deep-espresso)' : '#FFFFFF',
                                    color: saveAsLabel === lbl ? '#FFFFFF' : '#685C50',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {lbl}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleSaveAddressToBook}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--color-gold-dark)',
                              color: '#FFFFFF',
                              fontSize: '11px',
                              fontWeight: 600,
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Delivery Method */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      3. Delivery Speed
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {/* Standard Delivery */}
                      <label
                        onClick={() => handleChange('deliveryMethod', 'standard')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.deliveryMethod === 'standard' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.deliveryMethod === 'standard' ? '#FAF8F5' : '#FFFFFF',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          width: '100%',
                          minHeight: '58px',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={formData.deliveryMethod === 'standard'}
                            onChange={() => { }}
                            style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                              Royal Mail 48 Tracked
                            </strong>
                            <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                              2 – 4 working days • Insured packaging
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2E7D32', flexShrink: 0 }}>
                          Complimentary
                        </span>
                      </label>

                      {/* Special Delivery */}
                      <label
                        onClick={() => handleChange('deliveryMethod', 'express')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.deliveryMethod === 'express' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.deliveryMethod === 'express' ? '#FAF8F5' : '#FFFFFF',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          width: '100%',
                          minHeight: '58px',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={formData.deliveryMethod === 'express'}
                            onChange={() => { }}
                            style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                              Royal Mail Special Delivery (Guaranteed 1pm)
                            </strong>
                            <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                              Next business day tracked &amp; signed
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                          {formatPrice(expressShippingCost)}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Continue to Payment Button */}
                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="btn-primary-editorial"
                    style={{
                      width: '100%',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '0 18px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              )}

              {/* ══════════════════════════════════════════════════════════
                      STEP 2: PAYMENT METHOD & AUTHORIZATION
                      ══════════════════════════════════════════════════════════ */}
              {checkoutStep === 2 && (
                <>
                  {/* Active Delivery Summary Banner */}
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Delivering To ({currentAddressTag})
                      </span>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {formData.fullName} • {formData.address}, {formData.city} {formData.postalCode}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 500 }}>
                        {formData.deliveryMethod === 'express' ? 'Royal Mail Special Delivery (1pm)' : 'Royal Mail 48 Tracked (Complimentary)'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-gold-dark)',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        flexShrink: 0
                      }}
                    >
                      Change
                    </button>
                  </div>

                  {/* Billing Currency Dropdown Chevron Drawer */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}>
                    <button
                      type="button"
                      onClick={() => setIsCurrencyDropdownOpen(prev => !prev)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 14px',
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap' }}>
                          Billing Currency
                        </span>
                        <span style={{ fontSize: '10.5px', color: '#8C8074', whiteSpace: 'nowrap' }}>
                          ({currentCurrency.name})
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--color-deep-espresso)',
                          backgroundColor: '#FAF7F2',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border-light)',
                          whiteSpace: 'nowrap'
                        }}>
                          {currentCurrency.symbol} {currentCurrency.code}
                        </span>
                        {isCurrencyDropdownOpen ? (
                          <ChevronUp size={15} color="var(--color-deep-espresso)" />
                        ) : (
                          <ChevronDown size={15} color="var(--color-deep-espresso)" />
                        )}
                      </div>
                    </button>

                    {isCurrencyDropdownOpen && (
                      <div style={{
                        borderTop: '1px solid var(--color-border-light)',
                        backgroundColor: '#FAF8F5',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        {/* Currency Search Input */}
                        <div style={{ position: 'relative', width: '100%' }}>
                          <Search size={14} color="#8C8074" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                          <input
                            type="text"
                            value={currencySearch}
                            onChange={(e) => setCurrencySearch(e.target.value)}
                            placeholder="Search currency or country (e.g. USD, EUR, Naira)..."
                            autoFocus
                            style={{
                              ...standardInputStyle,
                              height: '34px',
                              paddingLeft: '32px',
                              fontSize: '11px',
                              backgroundColor: '#FFFFFF'
                            }}
                          />
                        </div>

                        {/* Scrollable Currencies List (Max Height ~185px) */}
                        <div style={{
                          maxHeight: '185px',
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          paddingRight: '2px',
                          scrollbarWidth: 'thin'
                        }}>
                          {filteredCurrencies.map(curr => (
                            <button
                              key={curr.code}
                              type="button"
                              onClick={() => {
                                handleChange('currency', curr.code);
                                setIsCurrencyDropdownOpen(false);
                                setCurrencySearch('');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 10px',
                                borderRadius: '6px',
                                backgroundColor: formData.currency === curr.code ? '#FFFFFF' : 'transparent',
                                border: '1px solid',
                                borderColor: formData.currency === curr.code ? 'var(--color-deep-espresso)' : 'transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                                gap: '8px',
                                boxShadow: formData.currency === curr.code ? '0 1px 4px rgba(0,0,0,0.06)' : 'none'
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap' }}>
                                  {curr.symbol} {curr.code} — {curr.name}
                                </div>
                                <div style={{ fontSize: '10px', color: '#8C8074', whiteSpace: 'nowrap' }}>
                                  {curr.country}
                                </div>
                              </div>
                              {formData.currency === curr.code && <Check size={13} color="var(--color-deep-espresso)" />}
                            </button>
                          ))}
                          {filteredCurrencies.length === 0 && (
                            <div style={{ padding: '12px', textAlign: 'center', fontSize: '11px', color: '#8C8074' }}>
                              No matching currencies found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Express 1-Tap Checkout Bar */}
                  <div style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-deep-espresso)'
                      }}>
                        Express 1-Tap Checkout
                      </span>
                    </div>

                    {/* 4 Express Buttons: Apple Pay, Google Pay, Revolut Pay, Amazon Pay */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '8px'
                    }}>
                      <button
                        type="button"
                        onClick={() => {
                          handleTogglePaymentMethod('apple_pay');
                          setApplePayMode('ready');
                        }}
                        style={{
                          height: '42px',
                          backgroundColor: '#000000',
                          color: '#FFFFFF',
                          border: formData.paymentMethod === 'apple_pay' ? '2px solid #D4AF37' : '1px solid #000000',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <ApplePayLogo height={20} color="#FFFFFF" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleTogglePaymentMethod('google_pay');
                          setGooglePayMode('saved');
                        }}
                        style={{
                          height: '42px',
                          backgroundColor: '#000000',
                          color: '#FFFFFF',
                          border: formData.paymentMethod === 'google_pay' ? '2px solid #D4AF37' : '1px solid #000000',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <GooglePayLogo height={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleTogglePaymentMethod('revolut');
                          setRevolutMode('app');
                        }}
                        style={{
                          height: '42px',
                          backgroundColor: '#FFFFFF',
                          color: '#191C1F',
                          border: formData.paymentMethod === 'revolut' ? '2px solid #0075FF' : '1.5px solid #0075FF',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          fontWeight: 700,
                          fontSize: '13px',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <RevolutPayBadge />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTogglePaymentMethod('amazon_pay')}
                        style={{
                          height: '42px',
                          backgroundColor: '#FAD676',
                          color: '#111111',
                          border: formData.paymentMethod === 'amazon_pay' ? '2px solid #E68A00' : '1px solid #E68A00',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <AmazonPayBadge />
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    margin: '2px 0'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                    <span style={{
                      fontSize: '11px',
                      color: '#8C8074',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 600
                    }}>
                      Or Select Payment Below
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
                  </div>

                  {/* Payment Options Selection */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-espresso)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Payment Method
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#685C50' }}>
                        <Lock size={12} color="#1E7E34" />
                        <span>Encrypted &amp; Secure</span>
                      </div>
                    </div>

                    {/* Region & Category Filter Tabs */}
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      marginBottom: '14px',
                      scrollbarWidth: 'none',
                      borderBottom: '1px solid var(--color-border-light)'
                    }}>
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'uk_global', label: 'Popular' },
                        { id: 'europe', label: 'Europe' },
                        { id: 'asia', label: 'Asia' },
                        { id: 'bank', label: 'Bank Wire' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setPaymentCategory(cat.id)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: paymentCategory === cat.id ? 700 : 500,
                            backgroundColor: paymentCategory === cat.id ? 'var(--color-deep-espresso)' : '#FAF7F2',
                            color: paymentCategory === cat.id ? '#FFFFFF' : '#685C50',
                            border: '1px solid',
                            borderColor: paymentCategory === cat.id ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Option 1: Apple Pay */}
                      {shouldShowMethod('apple_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'apple_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'apple_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden',
                          transition: 'border-color 0.2s ease'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('apple_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'apple_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>
                                  Apple Pay
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Touch ID / Face ID
                                </span>
                              </div>
                            </div>
                            <ApplePayLogo height={22} color="#1C1614" />
                          </label>

                          {formData.paymentMethod === 'apple_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #E8DBD0', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '11.5px', color: '#8C8074' }}>Merchant</span>
                                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>House of Nina London</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E0D4C8', paddingTop: '8px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>Total Due</span>
                                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>{formatPrice(total)}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'apple_pay')}
                                disabled={isSubmitting}
                                style={{
                                  height: '46px',
                                  backgroundColor: '#000000',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  fontSize: '13.5px',
                                  fontWeight: 600
                                }}
                              >
                                <span>Pay {formatPrice(total)} with</span>
                                <ApplePayLogo height={20} color="#FFFFFF" />
                              </button>

                              <div style={{ textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleChange('paymentMethod', 'card')}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#8C8074',
                                    fontSize: '11px',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Or pay with credit / debit card
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 2: Google Pay */}
                      {shouldShowMethod('google_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'google_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'google_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden',
                          transition: 'border-color 0.2s ease'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('google_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'google_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>
                                  Google Pay
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Google Wallet &amp; saved cards
                                </span>
                              </div>
                            </div>
                            <GooglePayLogo height={20} />
                          </label>

                          {formData.paymentMethod === 'google_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #E8DBD0', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '11.5px', color: '#8C8074' }}>Merchant</span>
                                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>House of Nina London</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E0D4C8', paddingTop: '8px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>Total Due</span>
                                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--color-deep-espresso)' }}>{formatPrice(total)}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'google_pay')}
                                disabled={isSubmitting}
                                style={{
                                  height: '46px',
                                  backgroundColor: '#1C1614',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  fontSize: '13.5px',
                                  fontWeight: 600
                                }}
                              >
                                <span>Pay {formatPrice(total)} with</span>
                                <GooglePayLogo height={18} />
                              </button>

                              <div style={{ textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleChange('paymentMethod', 'card')}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#8C8074',
                                    fontSize: '11px',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Or pay with credit / debit card
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 3: Credit or Debit Card */}
                      {shouldShowMethod('card') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'card' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'card' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('card')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'card'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>
                                  Credit or Debit Card
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Visa, Mastercard, American Express
                                </span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: '4px', flexShrink: 0, alignItems: 'center' }}>
                              <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #D0D8E4', color: '#1A1F71' }}>VISA</span>
                              <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #E8DBD0', color: '#EB001B' }}>MC</span>
                              <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px', background: '#FFFFFF', border: '1px solid #C7DFEE', color: '#006FCF' }}>AMEX</span>
                            </div>
                          </label>

                          {formData.paymentMethod === 'card' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#FFFFFF' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#685C50' }}>Card Information</span>
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Cardholder Name</label>
                                <input
                                  type="text"
                                  value={formData.cardName}
                                  onChange={(e) => handleChange('cardName', e.target.value)}
                                  placeholder="Name as it appears on card (e.g. Amara Okafor)"
                                  style={standardInputStyle}
                                />
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Card Number</label>
                                <input
                                  type="text"
                                  value={formData.cardNumber}
                                  onChange={(e) => handleCardNumberChange(e.target.value)}
                                  placeholder="16-digit card number (•••• •••• •••• 4892)"
                                  maxLength={19}
                                  style={standardInputStyle}
                                />
                              </div>

                              <div className="checkout-row-2">
                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Expiry</label>
                                  <input
                                    type="text"
                                    value={formData.cardExpiry}
                                    onChange={(e) => handleCardExpiryChange(e.target.value)}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    style={standardInputStyle}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>CVC / CVV</label>
                                  <input
                                    type="text"
                                    value={formData.cardCvc}
                                    onChange={(e) => handleCardCvcChange(e.target.value)}
                                    placeholder="3 or 4 digits"
                                    maxLength={4}
                                    style={standardInputStyle}
                                  />
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'card')}
                                disabled={isSubmitting}
                                className="btn-primary-editorial"
                                style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}
                              >
                                <Lock size={13} />
                                <span>Pay {formatPrice(total)} with Card</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 4: Revolut Pay (UK & Europe) */}
                      {shouldShowMethod('revolut') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'revolut' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'revolut' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('revolut')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'revolut'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>
                                  Revolut Pay
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Instant in-app approval
                                </span>
                              </div>
                            </div>
                            <RevolutPayBadge />
                          </label>

                          {formData.paymentMethod === 'revolut' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #E0D4C8', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>
                                  Mobile Phone linked to Revolut
                                </label>
                                <input
                                  type="tel"
                                  value={revolutData.phone || formData.phone}
                                  onChange={(e) => setRevolutData(prev => ({ ...prev, phone: e.target.value }))}
                                  placeholder="+44 7776 759731"
                                  style={standardInputStyle}
                                />
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  An instant push notification will be sent to your Revolut app to approve {formatPrice(total)}.
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handlePlaceOrder(null, 'revolut')}
                                  disabled={isSubmitting}
                                  style={{
                                    height: '44px',
                                    backgroundColor: '#000000',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    marginTop: '4px'
                                  }}
                                >
                                  <span>Approve with Revolut Pay ({formatPrice(total)})</span>
                                </button>
                              </div>

                              <div style={{ textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleChange('paymentMethod', 'card')}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#8C8074',
                                    fontSize: '11px',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Or pay with credit / debit card
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 5: Amazon Pay */}
                      {shouldShowMethod('amazon_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'amazon_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'amazon_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('amazon_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'amazon_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>Amazon Pay</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Checkout with stored Amazon address &amp; payment methods
                                </span>
                              </div>
                            </div>
                            <AmazonPayBadge />
                          </label>

                          {formData.paymentMethod === 'amazon_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #E0D4C8', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#685C50' }}>
                                  <span>Amazon Account:</span>
                                  <strong style={{ color: 'var(--color-deep-espresso)' }}>{formData.email || 'client@houseofnina.co.uk'}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#685C50' }}>
                                  <span>Linked Method:</span>
                                  <strong style={{ color: 'var(--color-deep-espresso)' }}>Amazon Prime Visa (•••• 9912)</strong>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'amazon_pay')}
                                disabled={isSubmitting}
                                style={{
                                  height: '44px',
                                  backgroundColor: '#FF9900',
                                  color: '#111111',
                                  border: 'none',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                              >
                                Pay {formatPrice(total)} with Amazon Pay
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 6: Klarna */}
                      {shouldShowMethod('klarna') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'klarna' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'klarna' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('klarna')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'klarna'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                  Klarna
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Pay in 3 installments • 0% APR
                                </span>
                              </div>
                            </div>
                            <KlarnaBadge />
                          </label>

                          {formData.paymentMethod === 'klarna' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>
                                3 Interest-Free Installments:
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                <div style={{ padding: '10px 8px', borderRadius: '8px', backgroundColor: '#FAF7F2', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>1. Today</span>
                                  <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)' }}>{formatPrice(total / 3)}</strong>
                                </div>
                                <div style={{ padding: '10px 8px', borderRadius: '8px', backgroundColor: '#FAF7F2', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>2. 30 Days</span>
                                  <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)' }}>{formatPrice(total / 3)}</strong>
                                </div>
                                <div style={{ padding: '10px 8px', borderRadius: '8px', backgroundColor: '#FAF7F2', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>3. 60 Days</span>
                                  <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)' }}>{formatPrice(total / 3)}</strong>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'klarna')}
                                disabled={isSubmitting}
                                style={{
                                  height: '44px',
                                  backgroundColor: '#FFB3C7',
                                  color: '#1C1614',
                                  border: 'none',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                  marginTop: '4px'
                                }}
                              >
                                Pay 1st Part {formatPrice(total / 3)} with Klarna
                              </button>

                              <div style={{ textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleChange('paymentMethod', 'card')}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#8C8074',
                                    fontSize: '11px',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Or pay with credit / debit card
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 7: Bancontact (Belgium) */}
                      {shouldShowMethod('bancontact') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'bancontact' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'bancontact' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('bancontact')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'bancontact'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>Bancontact</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Belgian card &amp; Payconiq
                                </span>
                              </div>
                            </div>
                            <BancontactBadge />
                          </label>

                          {formData.paymentMethod === 'bancontact' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <input
                                type="text"
                                placeholder="Bancontact Card Number (16-19 digits)"
                                style={standardInputStyle}
                              />
                              <div className="checkout-row-2">
                                <input type="text" placeholder="Cardholder Name" style={standardInputStyle} />
                                <input type="text" placeholder="MM/YY" maxLength={5} style={standardInputStyle} />
                              </div>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'bancontact')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#003A70', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Pay {formatPrice(total)} with Bancontact
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 8: iDEAL (Netherlands) */}
                      {shouldShowMethod('ideal') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'ideal' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'ideal' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('ideal')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'ideal'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>iDEAL</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Dutch online banking
                                </span>
                              </div>
                            </div>
                            <IdealBadge />
                          </label>

                          {formData.paymentMethod === 'ideal' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>Select Your Dutch Bank:</label>
                              <select
                                value={idealBank}
                                onChange={(e) => setIdealBank(e.target.value)}
                                style={{ ...standardInputStyle, cursor: 'pointer' }}
                              >
                                <option value="ing">ING Bank</option>
                                <option value="rabobank">Rabobank</option>
                                <option value="abn_amro">ABN AMRO</option>
                                <option value="sns_bank">SNS Bank</option>
                                <option value="bunq">bunq</option>
                                <option value="asn_bank">ASN Bank</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'ideal')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#CC0066', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Proceed with iDEAL ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 9: BLIK (Poland) */}
                      {shouldShowMethod('blik') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'blik' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'blik' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('blik')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'blik'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>BLIK</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  6-digit banking code
                                </span>
                              </div>
                            </div>
                            <BlikBadge />
                          </label>

                          {formData.paymentMethod === 'blik' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>
                                Enter 6-digit BLIK Code:
                              </label>
                              <input
                                type="text"
                                placeholder="• • •  • • • (e.g. 729 481)"
                                value={blikCode}
                                onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                style={{ ...standardInputStyle, fontSize: '18px', textAlign: 'center', letterSpacing: '0.2em', fontWeight: 700 }}
                              />
                              <span style={{ fontSize: '10.5px', color: '#8C8074' }}>
                                Open your mBank, PKO, Santander, or ING app, tap BLIK, and enter the code.
                              </span>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'blik')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#E60000', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Confirm BLIK Payment ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 10: MB WAY (Portugal) */}
                      {shouldShowMethod('mbway') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'mbway' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'mbway' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('mbway')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'mbway'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>MB WAY</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Portuguese mobile payment
                                </span>
                              </div>
                            </div>
                            <MbWayBadge />
                          </label>

                          {formData.paymentMethod === 'mbway' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>
                                Portuguese Mobile Phone Number (+351):
                              </label>
                              <input
                                type="tel"
                                placeholder="+351 912 345 678"
                                value={mbWayPhone}
                                onChange={(e) => setMbWayPhone(e.target.value)}
                                style={standardInputStyle}
                              />
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'mbway')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#E30613', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Send MB WAY Request ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 11: EPS (Austria) */}
                      {shouldShowMethod('eps') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'eps' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'eps' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('eps')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'eps'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>EPS Überweisung</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Austrian online banking
                                </span>
                              </div>
                            </div>
                            <EpsBadge />
                          </label>

                          {formData.paymentMethod === 'eps' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>Select Austrian Bank:</label>
                              <select
                                value={epsBank}
                                onChange={(e) => setEpsBank(e.target.value)}
                                style={{ ...standardInputStyle, cursor: 'pointer' }}
                              >
                                <option value="erste">Erste Bank und Sparkassen</option>
                                <option value="raiffeisen">Raiffeisen Bankengruppe</option>
                                <option value="bawag">BAWAG P.S.K.</option>
                                <option value="bank_austria">Bank Austria</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'eps')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#E30613', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Proceed to Austrian Bank via EPS
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 12: Satispay (Italy) */}
                      {shouldShowMethod('satispay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'satispay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'satispay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('satispay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'satispay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>Satispay</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Italian mobile payment
                                </span>
                              </div>
                            </div>
                            <SatispayBadge />
                          </label>

                          {formData.paymentMethod === 'satispay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <label style={{ fontSize: '11px', color: '#685C50', fontWeight: 500 }}>Italian Mobile Number (+39):</label>
                              <input
                                type="tel"
                                placeholder="+39 345 678 9012"
                                value={satispayPhone}
                                onChange={(e) => setSatispayPhone(e.target.value)}
                                style={standardInputStyle}
                              />
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'satispay')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#FD3743', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Authorize with Satispay App
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 13: Kakao Pay (South Korea) */}
                      {shouldShowMethod('kakao_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'kakao_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'kakao_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('kakao_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'kakao_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>Kakao Pay (카카오페이)</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Kakao mobile payment
                                </span>
                              </div>
                            </div>
                            <KakaoPayBadge />
                          </label>

                          {formData.paymentMethod === 'kakao_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <input type="tel" placeholder="Korean Mobile Number (+82)" style={standardInputStyle} />
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'kakao_pay')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#FFEB00', color: '#3C1E1E', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Pay with Kakao Pay ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 14: Naver Pay (South Korea) */}
                      {shouldShowMethod('naver_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'naver_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'naver_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('naver_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'naver_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>Naver Pay (네이버페이)</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Naver account checkout
                                </span>
                              </div>
                            </div>
                            <NaverPayBadge />
                          </label>

                          {formData.paymentMethod === 'naver_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <input type="text" placeholder="Naver Account / ID" style={standardInputStyle} />
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'naver_pay')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#03C75A', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Pay with Naver Pay ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 15: Samsung Pay (South Korea) */}
                      {shouldShowMethod('samsung_pay') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'samsung_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'samsung_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('samsung_pay')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'samsung_pay'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>Samsung Pay (삼성페이)</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Samsung biometric pay
                                </span>
                              </div>
                            </div>
                            <SamsungPayBadge />
                          </label>

                          {formData.paymentMethod === 'samsung_pay' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'samsung_pay')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#0C2340', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Authorize Samsung Pay ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 16: PAYCO (South Korea) */}
                      {shouldShowMethod('payco') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'payco' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'payco' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('payco')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'payco'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block' }}>PAYCO (페이코)</strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  PAYCO quick checkout
                                </span>
                              </div>
                            </div>
                            <PaycoBadge />
                          </label>

                          {formData.paymentMethod === 'payco' && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'payco')}
                                disabled={isSubmitting}
                                style={{ height: '44px', backgroundColor: '#FA142B', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                              >
                                Pay with PAYCO ({formatPrice(total)})
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Option 17: Direct Studio Bank Wire */}
                      {shouldShowMethod('bank') && (
                        <div style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'bank' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'bank' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('bank')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', gap: '12px', minHeight: '56px' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'bank'}
                                onChange={() => { }}
                                style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                              />
                              <div>
                                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                  Direct Studio Bank Wire
                                </strong>
                                <span style={{ fontSize: '11px', color: '#8C8074' }}>
                                  Barclays studio transfer with reference
                                </span>
                              </div>
                            </div>
                            <Building2 size={16} color="#8C8074" style={{ flexShrink: 0 }} />
                          </label>

                          {formData.paymentMethod === 'bank' && (
                            <div style={{
                              padding: '16px',
                              borderTop: '1px solid var(--color-border-light)',
                              backgroundColor: '#FAF7F2',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px'
                            }}>
                              <span style={{ display: 'block', fontWeight: 700, color: 'var(--color-deep-espresso)', fontSize: '12.5px' }}>
                                House of Nina UK Studio Bank Details:
                              </span>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                                <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bank</span>
                                  <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)' }}>Barclays UK</strong>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sort Code</span>
                                  <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)', letterSpacing: '0.05em' }}>20-04-15</strong>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Account No.</span>
                                  <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)', letterSpacing: '0.05em' }}>83920194</strong>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                  <span style={{ display: 'block', fontSize: '10px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Beneficiary</span>
                                  <strong style={{ fontSize: '12px', color: 'var(--color-deep-espresso)' }}>House of Nina UK Ltd</strong>
                                </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                                    Sender Account Holder Name (as it appears on your transfer)
                                  </label>
                                  <input
                                    type="text"
                                    value={bankWireData.accountHolder}
                                    onChange={(e) => setBankWireData(prev => ({ ...prev, accountHolder: e.target.value }))}
                                    placeholder="e.g. Amara Okafor (Barclays UK)"
                                    style={standardInputStyle}
                                  />
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                                    Transfer Reference Note
                                  </label>
                                  <input
                                    type="text"
                                    value={bankWireData.referenceNote}
                                    onChange={(e) => setBankWireData(prev => ({ ...prev, referenceNote: e.target.value }))}
                                    placeholder="e.g. HN-BESPOKE-HAIR"
                                    style={standardInputStyle}
                                  />
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'bank')}
                                disabled={isSubmitting}
                                style={{
                                  height: '44px',
                                  backgroundColor: 'var(--color-deep-espresso)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                              >
                                Confirm Bank Wire Booking ({formatPrice(total)})
                              </button>

                              <span style={{ display: 'block', fontSize: '10.5px', color: '#8C8074', fontStyle: 'italic' }}>
                                *Hair is dispatched upon transfer receipt. Your invoice and reference will be generated on placement.
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 2 Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      style={{
                        height: '48px',
                        padding: '0 18px',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--color-deep-espresso)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        flexShrink: 0
                      }}
                    >
                      <ArrowLeft size={15} />
                      <span>Back to Delivery</span>
                    </button>

                    <button
                      type="button"
                      className="btn-primary-editorial"
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting || cartItems.length === 0}
                      style={{
                        flex: 1,
                        height: '48px',
                        padding: '0 14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isSubmitting ? (
                        <span style={{ whiteSpace: 'nowrap' }}>Processing Payment...</span>
                      ) : (
                        <>
                          <Lock size={14} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {getPaymentButtonLabel(formData.paymentMethod)}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

            </div>

            {/* Right Column: Order Summary Card (Sticky) */}
            <div className="checkout-summary-column">
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '22px',
                position: 'sticky',
                top: '20px',
                boxShadow: '0 8px 24px rgba(36, 28, 25, 0.04)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '17px',
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--color-deep-espresso)'
                  }}>
                    Order Summary ({cartItems.length})
                  </h3>
                  {onOpenCart && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCart();
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '11.5px',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit3 size={12} /> Edit Bag
                    </button>
                  )}
                </div>

                {/* Items Scroll List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px', width: '100%', boxSizing: 'border-box' }}>
                  {cartItems.map((item, idx) => (
                    <div key={item.cartId || idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '58px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, backgroundColor: '#FAF7F2' }}
                      />
                      <div style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden' }}>
                        <h4 style={{ fontSize: '12.5px', margin: 0, fontWeight: 600, color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '11px', color: '#8C8074' }}>
                          Qty: {item.quantity || 1} • {item.selectedLength || 'Standard'}
                        </span>
                      </div>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', flexShrink: 0 }}>
                        {formatPrice((item.price * (item.quantity || 1)) * rate)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', borderTop: '1px solid var(--color-border-light)', paddingTop: '14px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50', width: '100%', boxSizing: 'border-box' }}>
                    <span>Subtotal</span>
                    <strong style={{ color: 'var(--color-deep-espresso)' }}>{formatPrice(subtotal)}</strong>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#1E7E34', width: '100%', boxSizing: 'border-box' }}>
                      <span>Discount ({checkoutData.promoCode})</span>
                      <strong>−{formatPrice(discount)}</strong>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#685C50', width: '100%', boxSizing: 'border-box' }}>
                    <span>Delivery</span>
                    <strong style={{ color: !formData.deliveryMethod ? '#8C8074' : (shippingCost === 0 ? '#1E7E34' : 'var(--color-deep-espresso)') }}>
                      {!formData.deliveryMethod ? 'Calculated at delivery' : (shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost))}
                    </strong>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginTop: '10px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border)',
                    width: '100%',
                    boxSizing: 'border-box',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div>
                      <strong style={{ fontSize: '15px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)', display: 'block' }}>
                        Total Due
                      </strong>
                      <span style={{ fontSize: '10.5px', color: '#8C8074' }}>
                        Includes UK VAT
                      </span>
                    </div>
                    <strong style={{ fontSize: '22px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                      {formatPrice(total)}
                    </strong>
                  </div>
                </div>

                {/* Contextual Step CTA on Right Column */}
                {checkoutStep === 1 ? (
                  <button
                    type="button"
                    className="btn-primary-editorial"
                    onClick={handleProceedToPayment}
                    style={{
                      width: '100%',
                      height: '48px',
                      marginTop: '18px',
                      padding: '0 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary-editorial"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || cartItems.length === 0}
                    style={{
                      width: '100%',
                      height: '48px',
                      marginTop: '18px',
                      padding: '0 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isSubmitting ? (
                      <span style={{ whiteSpace: 'nowrap' }}>Processing Payment...</span>
                    ) : (
                      <>
                        <Lock size={14} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: 'nowrap' }}>
                          {formData.paymentMethod === 'apple_pay'
                            ? `Pay ${formatPrice(total)} with Apple Pay`
                            : formData.paymentMethod === 'google_pay'
                              ? `Pay ${formatPrice(total)} with Google Pay`
                              : formData.paymentMethod === 'klarna'
                                ? `Pay 1st Part ${formatPrice(total / 3)} with Klarna`
                                : `Authorize & Pay ${formatPrice(total)}`}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
