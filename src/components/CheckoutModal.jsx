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
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }} className="payment-badge-klarna">
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }} className="payment-badge-revolut">
      <span style={{ color: '#0075FF', fontWeight: 900, whiteSpace: 'nowrap' }}>R</span><span style={{ whiteSpace: 'nowrap' }}>evolut</span> <span style={{ fontSize: '8.5px', backgroundColor: '#0075FF', color: '#FFFFFF', padding: '1px 4px', borderRadius: '3px', fontWeight: 700, whiteSpace: 'nowrap' }}>PAY</span>
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }} className="payment-badge-amazon">
      <span style={{ whiteSpace: 'nowrap' }}>amazon<span style={{ color: '#FF9900', fontWeight: 800 }}>pay</span></span>
    </span>
  );
}

/** Regional Method Badges */
function BancontactBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#003A70', color: '#FFCC00', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      Bancontact
    </span>
  );
}

function IdealBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#CC0066', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      iDEAL
    </span>
  );
}

function BlikBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E60000', color: '#FFFFFF', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      BLIK
    </span>
  );
}

function MbWayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E30613', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      MB WAY
    </span>
  );
}

function EpsBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#E30613', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      eps
    </span>
  );
}

function SatispayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FD3743', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      satispay
    </span>
  );
}

function KakaoPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FFEB00', color: '#3C1E1E', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      kakao pay
    </span>
  );
}

function NaverPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#03C75A', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      N Pay
    </span>
  );
}

function SamsungPayBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#0C2340', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      SAMSUNG pay
    </span>
  );
}

function PaycoBadge() {
  return (
    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: '#FA142B', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
      PAYCO
    </span>
  );
}


/**
 * Official Store Delivery Destinations & Shipping Rates Configuration
 * Location determines courier availability, timeframes, pricing, and eligible payment methods.
 */
export const SUPPORTED_DESTINATIONS = [
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    phonePrefix: '+44',
    phonePlaceholder: '+44 7776 000000',
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: 'W1J 8AJ',
    postalCodeRequired: true,
    stateLabel: 'County (Optional)',
    statePlaceholder: 'Greater London',
    stateRequired: false,
    region: 'United Kingdom',
    isPopular: true,
    shippingOptions: [
      {
        id: 'standard',
        name: 'Royal Mail 48 Tracked',
        carrier: 'Royal Mail',
        timeframe: '2 – 4 working days',
        priceGbp: 0,
        notes: 'Free luxury insured delivery • Signature required'
      },
      {
        id: 'express',
        name: 'Royal Mail Special Delivery Guaranteed (1pm)',
        carrier: 'Royal Mail',
        timeframe: 'Next business day (by 1pm)',
        priceGbp: 8.50,
        notes: 'Guaranteed next business day by 1:00 PM • Priority dispatch'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'amazon_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut', 'klarna']
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    phonePrefix: '+1',
    phonePlaceholder: '+1 (555) 000-0000',
    postalCodeLabel: 'ZIP Code',
    postalCodePlaceholder: '10001',
    postalCodeRequired: true,
    stateLabel: 'State',
    statePlaceholder: 'New York',
    stateRequired: true,
    region: 'North America',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked & Signed',
        carrier: 'Royal Mail / USPS',
        timeframe: '7 – 10 working days',
        priceGbp: 16.00,
        notes: 'Transatlantic insured air freight • Fully tracked to your door'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Worldwide Priority Air',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 32.00,
        notes: 'Fast express courier • Priority customs clearance'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'amazon_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna']
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currency: 'NGN',
    phonePrefix: '+234',
    phonePlaceholder: '+234 803 000 0000',
    postalCodeLabel: 'Postal Code (Optional)',
    postalCodePlaceholder: '101233',
    postalCodeRequired: false,
    stateLabel: 'State / Region',
    statePlaceholder: 'Lagos / Abuja FCT',
    stateRequired: true,
    region: 'West Africa',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Signed',
        carrier: 'Royal Mail / NIPOST',
        timeframe: '7 – 12 working days',
        priceGbp: 18.00,
        notes: 'Insured air parcel • Requires signature on arrival'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Nigeria Priority Air',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 34.00,
        notes: 'Direct express flight to Lagos & Abuja • Door-to-door concierge'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank']
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    phonePrefix: '+1',
    phonePlaceholder: '+1 (416) 000-0000',
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: 'M5V 2T6',
    postalCodeRequired: true,
    stateLabel: 'Province',
    statePlaceholder: 'Ontario',
    stateRequired: true,
    region: 'North America',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked & Signed',
        carrier: 'Royal Mail / Canada Post',
        timeframe: '7 – 10 working days',
        priceGbp: 16.00,
        notes: 'Insured transatlantic air delivery • Tracked & signed'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Worldwide Priority',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 32.00,
        notes: 'Priority courier to Canadian provinces'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'amazon_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna']
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    phonePrefix: '+233',
    phonePlaceholder: '+233 24 000 0000',
    postalCodeLabel: 'Digital Address / Postcode (Optional)',
    postalCodePlaceholder: 'GA-183-9302',
    postalCodeRequired: false,
    stateLabel: 'Region',
    statePlaceholder: 'Greater Accra',
    stateRequired: true,
    region: 'West Africa',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Signed',
        carrier: 'Royal Mail / Ghana Post',
        timeframe: '7 – 12 working days',
        priceGbp: 18.00,
        notes: 'Insured international air dispatch'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Worldwide Air Cargo',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 34.00,
        notes: 'Express courier delivery to Accra & nationwide'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank']
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    phonePrefix: '+971',
    phonePlaceholder: '+971 50 000 0000',
    postalCodeLabel: 'Makani / P.O. Box (Optional)',
    postalCodePlaceholder: 'P.O. Box / Makani',
    postalCodeRequired: false,
    stateLabel: 'Emirate',
    statePlaceholder: 'Dubai / Abu Dhabi',
    stateRequired: true,
    region: 'Middle East',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked',
        carrier: 'Royal Mail / Emirates Post',
        timeframe: '6 – 9 working days',
        priceGbp: 18.00,
        notes: 'Insured international parcel to UAE'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Gulf VIP Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 4 working days',
        priceGbp: 34.00,
        notes: 'Direct priority air courier to residence or hotel'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank']
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    phonePrefix: '+33',
    phonePlaceholder: '+33 6 00 00 00 00',
    postalCodeLabel: 'Code Postal',
    postalCodePlaceholder: '75008',
    postalCodeRequired: true,
    stateLabel: 'Région (Optionnel)',
    statePlaceholder: 'Île-de-France',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / La Poste',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European parcel with tracking'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Next-flight priority courier across Europe'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut']
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    phonePrefix: '+49',
    phonePlaceholder: '+49 151 00000000',
    postalCodeLabel: 'Postleitzahl',
    postalCodePlaceholder: '10115',
    postalCodeRequired: true,
    stateLabel: 'Bundesland (Optional)',
    statePlaceholder: 'Berlin / Bayern',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / Deutsche Post',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Priority courier to German destinations'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'revolut', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'revolut']
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    phonePrefix: '+353',
    phonePlaceholder: '+353 85 000 0000',
    postalCodeLabel: 'Eircode / Postcode',
    postalCodePlaceholder: 'D02 X285',
    postalCodeRequired: true,
    stateLabel: 'County',
    statePlaceholder: 'Dublin',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / An Post',
        timeframe: '3 – 5 working days',
        priceGbp: 12.00,
        notes: 'Fast tracked cross-Irish Sea delivery'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '1 – 2 working days',
        priceGbp: 22.00,
        notes: 'Express 24-48h courier delivery'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut']
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    phonePrefix: '+61',
    phonePlaceholder: '+61 400 000 000',
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: '2000',
    postalCodeRequired: true,
    stateLabel: 'State',
    statePlaceholder: 'NSW / Victoria',
    stateRequired: true,
    region: 'Asia Pacific',
    isPopular: true,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked',
        carrier: 'Royal Mail / Australia Post',
        timeframe: '7 – 12 working days',
        priceGbp: 18.00,
        notes: 'Insured international air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Worldwide Priority',
        carrier: 'DHL Express',
        timeframe: '3 – 6 working days',
        priceGbp: 36.00,
        notes: 'Express courier directly to Australia'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna']
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: 'EUR',
    phonePrefix: '+31',
    phonePlaceholder: '+31 6 00000000',
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: '1012 JS',
    postalCodeRequired: true,
    stateLabel: 'Provincie (Optioneel)',
    statePlaceholder: 'Noord-Holland',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / PostNL',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Priority air courier'
      }
    ],
    eligiblePaymentMethods: ['ideal', 'card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['ideal', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    currency: 'EUR',
    phonePrefix: '+32',
    phonePlaceholder: '+32 470 00 00 00',
    postalCodeLabel: 'Code Postal / Postcode',
    postalCodePlaceholder: '1000',
    postalCodeRequired: true,
    stateLabel: 'Province (Optionnel)',
    statePlaceholder: 'Bruxelles',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / bpost',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Priority express courier'
      }
    ],
    eligiblePaymentMethods: ['bancontact', 'card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['bancontact', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    currency: 'PLN',
    phonePrefix: '+48',
    phonePlaceholder: '+48 500 000 000',
    postalCodeLabel: 'Kod Pocztowy',
    postalCodePlaceholder: '00-001',
    postalCodeRequired: true,
    stateLabel: 'Województwo (Opcjonalnie)',
    statePlaceholder: 'Mazowieckie',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / Poczta Polska',
        timeframe: '5 – 8 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Express courier delivery'
      }
    ],
    eligiblePaymentMethods: ['blik', 'card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['blik', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    currency: 'EUR',
    phonePrefix: '+351',
    phonePlaceholder: '+351 910 000 000',
    postalCodeLabel: 'Código Postal',
    postalCodePlaceholder: '1000-001',
    postalCodeRequired: true,
    stateLabel: 'Distrito (Opcional)',
    statePlaceholder: 'Lisboa',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / CTT',
        timeframe: '5 – 8 working days',
        priceGbp: 14.00,
        notes: 'Insured continental delivery'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Direct courier delivery'
      }
    ],
    eligiblePaymentMethods: ['mbway', 'card', 'apple_pay', 'google_pay', 'revolut', 'bank'],
    primaryPaymentMethods: ['mbway', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    currency: 'EUR',
    phonePrefix: '+43',
    phonePlaceholder: '+43 664 0000000',
    postalCodeLabel: 'Postleitzahl',
    postalCodePlaceholder: '1010',
    postalCodeRequired: true,
    stateLabel: 'Bundesland (Optional)',
    statePlaceholder: 'Wien',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / Österreichische Post',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Express courier delivery'
      }
    ],
    eligiblePaymentMethods: ['eps', 'card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['eps', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR',
    phonePrefix: '+39',
    phonePlaceholder: '+39 340 0000000',
    postalCodeLabel: 'CAP',
    postalCodePlaceholder: '20121',
    postalCodeRequired: true,
    stateLabel: 'Provincia (Opzionale)',
    statePlaceholder: 'Milano',
    stateRequired: false,
    region: 'Europe (EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / Poste Italiane',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Europe Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Express courier delivery'
      }
    ],
    eligiblePaymentMethods: ['satispay', 'card', 'apple_pay', 'google_pay', 'revolut', 'klarna', 'bank'],
    primaryPaymentMethods: ['satispay', 'card', 'apple_pay', 'google_pay']
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    currency: 'KRW',
    phonePrefix: '+82',
    phonePlaceholder: '+82 10 0000 0000',
    postalCodeLabel: 'Postal Code (우편번호)',
    postalCodePlaceholder: '04524',
    postalCodeRequired: true,
    stateLabel: 'City / Province (시/도)',
    statePlaceholder: 'Seoul',
    stateRequired: true,
    region: 'East Asia',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked',
        carrier: 'Royal Mail / Korea Post',
        timeframe: '7 – 12 working days',
        priceGbp: 18.00,
        notes: 'Insured air parcel to Korea'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Worldwide Air',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 36.00,
        notes: 'Priority express courier'
      }
    ],
    eligiblePaymentMethods: ['kakao_pay', 'naver_pay', 'samsung_pay', 'payco', 'card', 'apple_pay', 'bank'],
    primaryPaymentMethods: ['kakao_pay', 'naver_pay', 'card', 'apple_pay']
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    phonePrefix: '+81',
    phonePlaceholder: '+81 90 0000 0000',
    postalCodeLabel: 'Postal Code (〒)',
    postalCodePlaceholder: '100-0001',
    postalCodeRequired: true,
    stateLabel: 'Prefecture (都道府県)',
    statePlaceholder: 'Tokyo',
    stateRequired: true,
    region: 'East Asia',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Tracked',
        carrier: 'Royal Mail / Japan Post',
        timeframe: '7 – 12 working days',
        priceGbp: 18.00,
        notes: 'Insured international parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Tokyo Priority',
        carrier: 'DHL Express',
        timeframe: '3 – 5 working days',
        priceGbp: 36.00,
        notes: 'Door-to-door express courier'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay']
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    phonePrefix: '+27',
    phonePlaceholder: '+27 82 000 0000',
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: '2001',
    postalCodeRequired: true,
    stateLabel: 'Province',
    statePlaceholder: 'Gauteng',
    stateRequired: true,
    region: 'Southern Africa',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Signed',
        carrier: 'Royal Mail / SAPO',
        timeframe: '8 – 14 working days',
        priceGbp: 18.00,
        notes: 'Insured international air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express South Africa Priority',
        carrier: 'DHL Express',
        timeframe: '3 – 6 working days',
        priceGbp: 36.00,
        notes: 'Priority courier to Johannesburg, Cape Town, etc.'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay']
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    currency: 'CHF',
    phonePrefix: '+41',
    phonePlaceholder: '+41 79 000 00 00',
    postalCodeLabel: 'PLZ / NPA',
    postalCodePlaceholder: '8001',
    postalCodeRequired: true,
    stateLabel: 'Kanton / Canton (Optionnel)',
    statePlaceholder: 'Zürich / Genève',
    stateRequired: false,
    region: 'Europe (Non-EU)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / Swiss Post',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Switzerland Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Express courier delivery'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut', 'bank'],
    primaryPaymentMethods: ['card', 'apple_pay', 'google_pay', 'revolut']
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    currency: 'SEK',
    phonePrefix: '+46',
    phonePlaceholder: '+46 70 000 00 00',
    postalCodeLabel: 'Postnummer',
    postalCodePlaceholder: '111 22',
    postalCodeRequired: true,
    stateLabel: 'Län (Valfritt)',
    statePlaceholder: 'Stockholm',
    stateRequired: false,
    region: 'Europe (Nordics)',
    isPopular: false,
    shippingOptions: [
      {
        id: 'intl_standard',
        name: 'Royal Mail International Europe Tracked',
        carrier: 'Royal Mail / PostNord',
        timeframe: '4 – 7 working days',
        priceGbp: 14.00,
        notes: 'Insured European air parcel'
      },
      {
        id: 'intl_express',
        name: 'DHL Express Nordics Priority',
        carrier: 'DHL Express',
        timeframe: '2 – 3 working days',
        priceGbp: 26.00,
        notes: 'Express courier delivery'
      }
    ],
    eligiblePaymentMethods: ['card', 'apple_pay', 'google_pay', 'klarna', 'revolut', 'bank'],
    primaryPaymentMethods: ['klarna', 'card', 'apple_pay', 'google_pay']
  }
];

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
    countryCode: 'GB',
    country: 'United Kingdom',
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
    countryCode: 'GB',
    country: 'United Kingdom',
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
    countryCode: 'GB',
    country: 'United Kingdom',
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

  // Location-First Destination Selection with session restoration
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    try {
      const saved = sessionStorage.getItem('house_of_nina_checkout_destination');
      if (saved && SUPPORTED_DESTINATIONS.some(d => d.code === saved)) {
        return saved;
      }
    } catch (e) {}
    return 'GB'; // United Kingdom as default destination
  });

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [showMorePaymentOptions, setShowMorePaymentOptions] = useState(false);

  // Sync selected destination to session storage
  useEffect(() => {
    try {
      if (selectedCountryCode) {
        sessionStorage.setItem('house_of_nina_checkout_destination', selectedCountryCode);
      } else {
        sessionStorage.removeItem('house_of_nina_checkout_destination');
      }
    } catch {}
  }, [selectedCountryCode]);

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
    deliveryMethod: "standard", // standard | express | intl_standard | intl_express
    paymentMethod: "", // Empty by default: user chooses method themselves
    currency: "GBP", // Synced to destination currency
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });



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

  // Regional Payment States
  const [revolutMode, setRevolutMode] = useState('app');
  const [revolutData, setRevolutData] = useState({ phone: '', cardNumber: '', cardExpiry: '', cardCvc: '' });
  const [idealBank, setIdealBank] = useState('ing');
  const [blikCode, setBlikCode] = useState('');
  const [mbWayPhone, setMbWayPhone] = useState('');
  const [epsBank, setEpsBank] = useState('erste');
  const [satispayPhone, setSatispayPhone] = useState('');
  const [koreanWalletData, setKoreanWalletData] = useState({ phone: '', provider: 'kakao' });



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

  // Active Destination and Currency Resolution
  const currentDestination = SUPPORTED_DESTINATIONS.find(d => d.code === selectedCountryCode) || null;
  const currentCurrency = STRIPE_SUPPORTED_CURRENCIES.find(c => c.code === (formData.currency || (currentDestination?.currency || 'GBP'))) || STRIPE_SUPPORTED_CURRENCIES[0];
  const currencySymbol = currentCurrency.symbol;
  const rate = currentCurrency.rate;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 200;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  const subtotal = rawSubtotal * rate;
  const rawDiscount = checkoutData.discountAmount || 0;
  const discount = rawDiscount * rate;

  // Real Shipping Rates based on selected destination
  const availableShippingOptions = currentDestination?.shippingOptions || [];
  const selectedShippingOption = availableShippingOptions.find(o => o.id === formData.deliveryMethod) || availableShippingOptions[0] || null;

  const shippingCost = (selectedCountryCode && selectedShippingOption)
    ? Math.round(selectedShippingOption.priceGbp * rate)
    : 0;

  const total = Math.max(0, subtotal - discount + (selectedCountryCode ? shippingCost : 0));

  const formatPrice = (val) => {
    const decimals = ['JPY', 'KRW', 'VND', 'IDR', 'HUF'].includes(formData.currency) ? 0 : 2;
    return `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  };



  const matchingSavedAddresses = savedAddresses.filter(a =>
    !selectedCountryCode || a.countryCode === selectedCountryCode
  );

  // Address validation: required fields match selected destination requirements
  const isContactAndAddressValid = Boolean(
    selectedCountryCode &&
    formData.email?.trim() &&
    formData.email.includes('@') &&
    formData.phone?.trim() &&
    formData.phone.trim().length >= 6 &&
    formData.fullName?.trim() &&
    formData.address?.trim() &&
    formData.city?.trim() &&
    (!currentDestination?.postalCodeRequired || formData.postalCode?.trim()) &&
    (!currentDestination?.stateRequired || formData.state?.trim())
  );

  const isDeliveryOptionSelected = Boolean(selectedCountryCode && formData.deliveryMethod && selectedShippingOption);

  const canProceedToPayment = Boolean(selectedCountryCode && isContactAndAddressValid && isDeliveryOptionSelected);

  // Dynamic Browser & Device Wallet Detection State
  const [deviceWallets, setDeviceWallets] = useState(() => {
    if (typeof window === 'undefined') return { applePay: false, googlePay: false };
    const ua = window.navigator?.userAgent || '';
    const isSafariOrApple = /Macintosh|iPhone|iPad|iPod/.test(ua) && !/Chrome|CriOS|Edg/.test(ua);
    const isChromeOrAndroid = /Chrome|Android|Edg/.test(ua);
    const hasNativeApplePay = Boolean(window.ApplePaySession && window.ApplePaySession.canMakePayments && window.ApplePaySession.canMakePayments());
    const hasPaymentRequest = Boolean(window.PaymentRequest);

    return {
      applePay: hasNativeApplePay || isSafariOrApple,
      googlePay: hasPaymentRequest || isChromeOrAndroid
    };
  });

  // Stripe.js Dynamic Payment Method & Wallet Verification
  useEffect(() => {
    let isMounted = true;
    const stripeKey = import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY;

    if (window.Stripe && stripeKey && !stripeKey.includes('your_publishable_key')) {
      try {
        const stripe = window.Stripe(stripeKey);
        const pr = stripe.paymentRequest({
          country: selectedCountryCode || 'GB',
          currency: (formData.currency || 'GBP').toLowerCase(),
          total: {
            label: 'House of Nina Order',
            amount: Math.max(100, Math.round(total * 100))
          },
          requestPayerName: true,
          requestPayerEmail: true
        });

        pr.canMakePayment().then(result => {
          if (!isMounted) return;
          if (result) {
            setDeviceWallets({
              applePay: Boolean(result.applePay),
              googlePay: Boolean(result.googlePay)
            });
          }
        }).catch(() => {});
      } catch (e) {}
    } else if (window.ApplePaySession && typeof window.ApplePaySession.canMakePayments === 'function') {
      try {
        const canApple = window.ApplePaySession.canMakePayments();
        if (isMounted) {
          setDeviceWallets(prev => ({ ...prev, applePay: Boolean(canApple) }));
        }
      } catch (e) {}
    }

    return () => { isMounted = false; };
  }, [selectedCountryCode, formData.currency, total]);

  // Comprehensive Stripe & Transaction Payment Method Eligibility Evaluator
  const isMethodEligible = (m) => {
    if (!currentDestination) return false;
    const countryCode = currentDestination.code;
    const curr = formData.currency || currentDestination.currency || 'GBP';

    switch (m) {
      case 'card':
        // Global credit and debit cards
        return true;

      case 'apple_pay':
        // Device/browser support + destination capability
        return Boolean(deviceWallets.applePay) && (currentDestination.eligiblePaymentMethods || []).includes('apple_pay');

      case 'google_pay':
        // Device/browser support + destination capability
        return Boolean(deviceWallets.googlePay) && (currentDestination.eligiblePaymentMethods || []).includes('google_pay');

      case 'klarna': {
        // Stripe Klarna requirements: Supported countries, currencies, and minimum amount threshold
        const klarnaCountries = ['GB', 'US', 'DE', 'FR', 'IE', 'NL', 'BE', 'AT', 'SE', 'IT', 'ES', 'PL', 'PT', 'AU', 'CA', 'CH', 'DK', 'NO', 'FI'];
        const klarnaCurrencies = ['GBP', 'EUR', 'USD', 'CAD', 'AUD', 'SEK', 'PLN', 'CHF', 'DKK', 'NOK'];
        const isCountryEligible = klarnaCountries.includes(countryCode);
        const isCurrencyEligible = klarnaCurrencies.includes(curr);
        const isAmountEligible = total >= 35;
        return isCountryEligible && isCurrencyEligible && isAmountEligible && (currentDestination.eligiblePaymentMethods || []).includes('klarna');
      }

      case 'ideal':
        // Netherlands only, EUR only
        return countryCode === 'NL' && curr === 'EUR';

      case 'bancontact':
        // Belgium only, EUR only
        return countryCode === 'BE' && curr === 'EUR';

      case 'blik':
        // Poland only, PLN or EUR
        return countryCode === 'PL' && ['PLN', 'EUR'].includes(curr);

      case 'mbway':
        // Portugal only, EUR only
        return countryCode === 'PT' && curr === 'EUR';

      case 'eps':
        // Austria only, EUR only
        return countryCode === 'AT' && curr === 'EUR';

      case 'satispay':
        // Italy only, EUR only
        return countryCode === 'IT' && curr === 'EUR';

      case 'revolut':
        // UK & EEA destinations with GBP or EUR
        return ['GB', 'FR', 'DE', 'IE', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'PL', 'SE', 'CH'].includes(countryCode) && ['GBP', 'EUR'].includes(curr);

      case 'amazon_pay':
        // UK, US, Western EU with GBP, USD, EUR
        return ['GB', 'US', 'DE', 'FR', 'IT', 'ES', 'IE', 'AT', 'BE', 'NL'].includes(countryCode) && ['GBP', 'USD', 'EUR'].includes(curr);

      case 'kakao_pay':
      case 'naver_pay':
      case 'samsung_pay':
      case 'payco':
        // South Korea only with KRW or USD
        return countryCode === 'KR' && ['KRW', 'USD'].includes(curr);

      case 'bank':
        // Direct Studio Bank Wire available globally for couture orders
        return true;

      default:
        return (currentDestination.eligiblePaymentMethods || []).includes(m);
    }
  };

  // Master candidate methods in evaluated priority order
  const ALL_CANDIDATE_METHODS = [
    'card',
    'apple_pay',
    'google_pay',
    'klarna',
    'ideal',
    'bancontact',
    'blik',
    'mbway',
    'eps',
    'satispay',
    'revolut',
    'amazon_pay',
    'kakao_pay',
    'naver_pay',
    'samsung_pay',
    'payco',
    'bank'
  ];

  // All genuinely eligible methods for current transaction
  const allEligibleMethods = React.useMemo(() => {
    if (!currentDestination) return [];
    return ALL_CANDIDATE_METHODS.filter(m => isMethodEligible(m));
  }, [currentDestination, formData.currency, total, deviceWallets]);

  // Initial recommended list: short & relevant (3 to 4 methods maximum)
  const initialMethods = React.useMemo(() => {
    if (!currentDestination || allEligibleMethods.length === 0) return [];
    const list = [];

    // 1. Credit or debit card (Global primary)
    if (allEligibleMethods.includes('card')) {
      list.push('card');
    }

    // 2. Domestic dominant standard if applicable
    const dominantLocalMap = {
      NL: 'ideal',
      BE: 'bancontact',
      PL: 'blik',
      PT: 'mbway',
      AT: 'eps',
      IT: 'satispay',
      KR: 'kakao_pay'
    };
    const localDominant = dominantLocalMap[currentDestination.code];
    if (localDominant && allEligibleMethods.includes(localDominant) && !list.includes(localDominant)) {
      list.push(localDominant);
    }

    // 3. Apple Pay and/or Google Pay when supported by device/browser & eligible
    if (deviceWallets.applePay && allEligibleMethods.includes('apple_pay') && !list.includes('apple_pay')) {
      list.push('apple_pay');
    }
    if (deviceWallets.googlePay && allEligibleMethods.includes('google_pay') && !list.includes('google_pay')) {
      list.push('google_pay');
    }

    // 4. Eligible BNPL methods such as Klarna
    if (allEligibleMethods.includes('klarna') && !list.includes('klarna')) {
      list.push('klarna');
    }

    // 5. If initial list is very short (e.g. international destinations without BNPL), include bank
    if (list.length < 3 && allEligibleMethods.includes('bank') && !list.includes('bank')) {
      list.push('bank');
    }

    return list.slice(0, 4);
  }, [currentDestination, allEligibleMethods, deviceWallets]);

  // Remaining eligible methods: strictly exclude initialMethods (zero duplicates)
  const remainingMethods = React.useMemo(() => {
    return allEligibleMethods.filter(m => !initialMethods.includes(m));
  }, [allEligibleMethods, initialMethods]);

  // Guard: if current selected payment method becomes ineligible on destination or currency change, adapt gracefully
  useEffect(() => {
    if (formData.paymentMethod && allEligibleMethods.length > 0 && !allEligibleMethods.includes(formData.paymentMethod)) {
      setFormData(prev => ({ ...prev, paymentMethod: initialMethods[0] || 'card' }));
    }
  }, [selectedCountryCode, formData.currency, allEligibleMethods, initialMethods]);

  const getPaymentButtonLabel = (method) => {
    if (!method) return 'Select Payment Method';
    switch (method) {
      case 'apple_pay':
        return 'Pay with Apple Pay';
      case 'google_pay':
        return 'Pay with Google Pay';
      case 'revolut':
        return 'Pay with Revolut Pay';
      case 'amazon_pay':
        return 'Pay with Amazon Pay';
      case 'klarna':
        return 'Pay with Klarna';
      case 'bancontact':
        return 'Pay with Bancontact';
      case 'ideal':
        return 'Proceed with iDEAL';
      case 'blik':
        return 'Confirm BLIK Payment';
      case 'mbway':
        return 'Authorize with MB WAY';
      case 'eps':
        return 'Proceed to Bank via EPS';
      case 'satispay':
        return 'Authorize Satispay';
      case 'kakao_pay':
        return 'Pay with Kakao Pay';
      case 'naver_pay':
        return 'Pay with Naver Pay';
      case 'samsung_pay':
        return 'Pay with Samsung Pay';
      case 'payco':
        return 'Pay with PAYCO';
      case 'bank':
        return 'Confirm Bank Wire Booking';
      case 'card':
        return 'Pay with Card';
      default:
        return 'Select Payment Method';
    }
  };

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (stepError) setStepError('');
  };

  const handleTogglePaymentMethod = (method) => {
    handleChange('paymentMethod', method);
  };

  // Destination Selection & Invalidation Handler
  const handleSelectCountry = (countryCode) => {
    if (selectedCountryCode === countryCode) {
      setIsCountryDropdownOpen(false);
      return;
    }
    const newDest = SUPPORTED_DESTINATIONS.find(d => d.code === countryCode);
    if (!newDest) return;

    setSelectedCountryCode(countryCode);
    setIsCountryDropdownOpen(false);
    setStepError('');

    const prevDest = SUPPORTED_DESTINATIONS.find(d => d.code === selectedCountryCode);

    // 1. Re-align currency if user was using previous destination's currency
    if (!prevDest || formData.currency === prevDest.currency) {
      handleChange('currency', newDest.currency);
    }

    // 2. Re-evaluate dependent fields
    setFormData(prev => {
      let updatedPhone = prev.phone;
      if (!updatedPhone || (prevDest && updatedPhone.startsWith(prevDest.phonePrefix))) {
        updatedPhone = newDest.phonePrefix + ' ';
      }

      // Re-evaluate delivery option
      const defaultDelivery = newDest.shippingOptions[0]?.id || 'standard';

      // Invalidate payment method if it cannot actually be used for the new destination
      let updatedPayment = prev.paymentMethod;
      if (updatedPayment && !newDest.eligiblePaymentMethods.includes(updatedPayment)) {
        updatedPayment = ''; // Cleared!
      }

      // Invalidate saved address if it was from a different country
      const activeSaved = savedAddresses.find(a => a.id === selectedAddressId);
      let updatedAddressId = selectedAddressId;
      let updatedCity = prev.city;
      let updatedPostal = prev.postalCode;
      let updatedState = prev.state;
      let updatedAddress = prev.address;
      if (activeSaved && activeSaved.countryCode && activeSaved.countryCode !== countryCode) {
        updatedAddressId = null;
        updatedCity = '';
        updatedPostal = '';
        updatedState = '';
        updatedAddress = '';
      }

      return {
        ...prev,
        phone: updatedPhone,
        countryCode: newDest.phonePrefix,
        deliveryMethod: defaultDelivery,
        paymentMethod: updatedPayment,
        city: updatedCity,
        postalCode: updatedPostal,
        state: updatedState,
        address: updatedAddress
      };
    });

    // If client was on Step 2 (payment), return to Step 1 so they confirm address & shipping
    if (checkoutStep === 2) {
      setCheckoutStep(1);
    }
  };

  const handleSelectSavedAddress = (addr) => {
    if (selectedAddressId === addr.id) {
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
    if (!formData.address || !formData.city) return;
    const newId = `addr_${Date.now()}`;
    const newEntry = {
      id: newId,
      label: saveAsLabel || 'Other',
      fullName: formData.fullName || 'Client',
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      phone: formData.phone,
      countryCode: selectedCountryCode || 'GB',
      country: currentDestination?.name || 'United Kingdom'
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
    if (!selectedCountryCode || !currentDestination) {
      setStepError('Please select your delivery destination country or region first.');
      return;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setStepError('Please enter a valid email address for order confirmation & tracking.');
      return;
    }
    if (!formData.phone || formData.phone.trim().length < 6) {
      setStepError('Please enter a valid mobile phone number for courier updates.');
      return;
    }
    if (!formData.fullName?.trim() || !formData.address?.trim() || !formData.city?.trim()) {
      setStepError('Please complete your recipient full name and street delivery address.');
      return;
    }
    if (currentDestination.postalCodeRequired && !formData.postalCode?.trim()) {
      setStepError(`Please enter your ${currentDestination.postalCodeLabel}.`);
      return;
    }
    if (currentDestination.stateRequired && !formData.state?.trim()) {
      setStepError(`Please enter your ${currentDestination.stateLabel}.`);
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
    if (!selectedCountryCode) {
      setStepError('Please select your delivery destination country first.');
      return;
    }

    if (!isMethodEligible(method)) {
      setStepError(`${method} is not eligible for delivery to ${currentDestination?.name || 'this destination'}.`);
      return;
    }

    // Select the chosen express payment method
    handleChange('paymentMethod', method);

    // Auto-select matching saved address for destination if empty
    const matchingAddr = savedAddresses.find(a => a.countryCode === selectedCountryCode);
    if (matchingAddr && (!formData.fullName || !formData.address)) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || matchingAddr.fullName,
        address: prev.address || matchingAddr.address,
        city: prev.city || matchingAddr.city,
        state: prev.state || matchingAddr.state,
        postalCode: prev.postalCode || matchingAddr.postalCode,
        phone: prev.phone || matchingAddr.phone,
        email: prev.email || 'client@houseofnina.co.uk',
        deliveryMethod: prev.deliveryMethod || availableShippingOptions[0]?.id || 'standard',
        paymentMethod: method
      }));
      setSelectedAddressId(matchingAddr.id);
    }

    // Switch directly to Step 2 so the user sees the payment method view
    setCheckoutStep(2);
  };

  const handlePlaceOrder = (e, explicitMethod = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const chosenPayment = explicitMethod || formData.paymentMethod;

    if (!chosenPayment) {
      setStepError('Please select an eligible payment method to complete your order.');
      return;
    }

    if (!allEligibleMethods.includes(chosenPayment)) {
      setStepError('Selected payment method is not eligible for delivery to ' + (currentDestination?.name || 'your destination') + ' in ' + formData.currency + '. Please choose an eligible payment method.');
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
      const activePhone = (klarnaData.phone || formData.phone)?.trim();
      if (!activePhone) {
        setStepError('Please enter your mobile phone number for Klarna Pay in 3 approval.');
        return;
      }
      if (klarnaData.cardNumber?.trim() && !klarnaData.cardExpiry?.trim()) {
        setStepError('Please enter your installment card expiry date (MM/YY).');
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

      const deliveryLabel = selectedShippingOption
        ? `${selectedShippingOption.name} (${selectedShippingOption.priceGbp === 0 ? 'Free' : formatPrice(shippingCost)})`
        : 'Free Delivery';

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
          postalCode: formData.postalCode,
          country: currentDestination ? currentDestination.name : "United Kingdom",
          countryCode: selectedCountryCode || "GB"
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

    // Modal visibility guard (MUST be after all Hook calls to respect React Rules of Hooks)
  if (!isOpen) return null;

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

  // Render Individual Payment Option Item
  const renderPaymentOption = (methodId) => {
    switch (methodId) {
      case 'apple_pay':
        return (
          <div key="apple_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'apple_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'apple_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden',
                          transition: 'border-color 0.2s ease'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('apple_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'apple_pay'}
                                onChange={() => handleTogglePaymentMethod('apple_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Apple Pay
                                </strong>
                                <span className="payment-option-subtitle">
                                  Touch ID / Face ID
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container apple-pay-logo-wrapper">
                              <ApplePayLogo height={20} color="#1C1614" />
                            </div>
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
        );
      case 'google_pay':
        return (
          <div key="google_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'google_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'google_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden',
                          transition: 'border-color 0.2s ease'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('google_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'google_pay'}
                                onChange={() => handleTogglePaymentMethod('google_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Google Pay
                                </strong>
                                <span className="payment-option-subtitle">
                                  Google Wallet &amp; saved cards
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container google-pay-logo-wrapper">
                              <GooglePayLogo height={18} />
                            </div>
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
        );
      case 'card':
        return (
          <div key="card" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'card' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'card' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('card')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'card'}
                                onChange={() => handleTogglePaymentMethod('card')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Credit or Debit Card
                                </strong>
                                <span className="payment-option-subtitle">
                                  Visa, Mastercard, American Express
                                </span>
                              </div>
                            </div>

                            <div className="payment-badge-container">
                              <span className="card-chip-badge" style={{ border: '1px solid #D0D8E4', color: '#1A1F71' }}>VISA</span>
                              <span className="card-chip-badge" style={{ border: '1px solid #E8DBD0', color: '#EB001B' }}>MC</span>
                              <span className="card-chip-badge" style={{ border: '1px solid #C7DFEE', color: '#006FCF' }}>AMEX</span>
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
        );
      case 'revolut':
        return (
          <div key="revolut" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'revolut' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'revolut' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('revolut')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'revolut'}
                                onChange={() => handleTogglePaymentMethod('revolut')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Revolut Pay
                                </strong>
                                <span className="payment-option-subtitle">
                                  Instant in-app approval
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <RevolutPayBadge />
                            </div>
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
        );
      case 'amazon_pay':
        return (
          <div key="amazon_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'amazon_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'amazon_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('amazon_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'amazon_pay'}
                                onChange={() => handleTogglePaymentMethod('amazon_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Amazon Pay</strong>
                                <span className="payment-option-subtitle">
                                  Checkout with stored Amazon cards
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <AmazonPayBadge />
                            </div>
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
        );
      case 'klarna':
        return (
          <div key="klarna" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'klarna' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'klarna' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('klarna')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'klarna'}
                                onChange={() => handleTogglePaymentMethod('klarna')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Klarna
                                </strong>
                                <span className="payment-option-subtitle">
                                  Pay in 3 installments • 0% APR
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <KlarnaBadge />
                            </div>
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

                              {/* Klarna Verification & Card Details */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #E8DBD0', padding: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-deep-espresso)' }}>
                                    Klarna Verification &amp; Card
                                  </span>
                                  <span style={{ fontSize: '10.5px', color: '#8C8074' }}>
                                    0% APR • Instant Decision
                                  </span>
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                                    Mobile Phone for Klarna SMS Approval <span style={{ color: '#C53030' }}>*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    value={klarnaData.phone || formData.phone}
                                    onChange={(e) => setKlarnaData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="+44 7776 759731"
                                    style={standardInputStyle}
                                  />
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>
                                    Card for 3 Installments (charged on Day 1, 30, 60)
                                  </label>
                                  <input
                                    type="text"
                                    value={klarnaData.cardNumber}
                                    onChange={(e) => {
                                      const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                                      const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
                                      setKlarnaData(prev => ({ ...prev, cardNumber: formatted }));
                                    }}
                                    placeholder="Installment card number (•••• •••• •••• 4892)"
                                    maxLength={19}
                                    style={standardInputStyle}
                                  />
                                </div>

                                <div className="checkout-row-2">
                                  <div>
                                    <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>Expiry</label>
                                    <input
                                      type="text"
                                      value={klarnaData.cardExpiry}
                                      onChange={(e) => {
                                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                        setKlarnaData(prev => ({ ...prev, cardExpiry: v }));
                                      }}
                                      placeholder="MM/YY"
                                      maxLength={5}
                                      style={standardInputStyle}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '10.5px', color: '#685C50', marginBottom: '4px', fontWeight: 500 }}>CVC</label>
                                    <input
                                      type="text"
                                      value={klarnaData.cardCvc}
                                      onChange={(e) => setKlarnaData(prev => ({ ...prev, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                                      placeholder="3 digits"
                                      maxLength={4}
                                      style={standardInputStyle}
                                    />
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handlePlaceOrder(null, 'klarna')}
                                disabled={isSubmitting}
                                style={{
                                  height: '46px',
                                  backgroundColor: '#FFB3C7',
                                  color: '#0A0A0A',
                                  border: 'none',
                                  borderRadius: '8px',
                                  fontSize: '13.5px',
                                  fontWeight: 700,
                                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px'
                                }}
                              >
                                <span>Pay 1st Part {formatPrice(total / 3)} with Klarna</span>
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
        );
      case 'bancontact':
        return (
          <div key="bancontact" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'bancontact' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'bancontact' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('bancontact')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'bancontact'}
                                onChange={() => handleTogglePaymentMethod('bancontact')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Bancontact</strong>
                                <span className="payment-option-subtitle">
                                  Belgian card &amp; Payconiq
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <BancontactBadge />
                            </div>
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
        );
      case 'ideal':
        return (
          <div key="ideal" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'ideal' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'ideal' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('ideal')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'ideal'}
                                onChange={() => handleTogglePaymentMethod('ideal')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">iDEAL</strong>
                                <span className="payment-option-subtitle">
                                  Dutch online banking
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <IdealBadge />
                            </div>
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
        );
      case 'blik':
        return (
          <div key="blik" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'blik' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'blik' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('blik')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'blik'}
                                onChange={() => handleTogglePaymentMethod('blik')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">BLIK</strong>
                                <span className="payment-option-subtitle">
                                  6-digit banking code
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <BlikBadge />
                            </div>
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
        );
      case 'mbway':
        return (
          <div key="mbway" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'mbway' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'mbway' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('mbway')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'mbway'}
                                onChange={() => handleTogglePaymentMethod('mbway')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">MB WAY</strong>
                                <span className="payment-option-subtitle">
                                  Portuguese mobile payment
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <MbWayBadge />
                            </div>
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
        );
      case 'eps':
        return (
          <div key="eps" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'eps' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'eps' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('eps')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'eps'}
                                onChange={() => handleTogglePaymentMethod('eps')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">EPS Überweisung</strong>
                                <span className="payment-option-subtitle">
                                  Austrian online banking
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <EpsBadge />
                            </div>
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
        );
      case 'satispay':
        return (
          <div key="satispay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'satispay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'satispay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('satispay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'satispay'}
                                onChange={() => handleTogglePaymentMethod('satispay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Satispay</strong>
                                <span className="payment-option-subtitle">
                                  Italian mobile payment
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <SatispayBadge />
                            </div>
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
        );
      case 'kakao_pay':
        return (
          <div key="kakao_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'kakao_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'kakao_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('kakao_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'kakao_pay'}
                                onChange={() => handleTogglePaymentMethod('kakao_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Kakao Pay (카카오페이)</strong>
                                <span className="payment-option-subtitle">
                                  Kakao mobile payment
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <KakaoPayBadge />
                            </div>
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
        );
      case 'naver_pay':
        return (
          <div key="naver_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'naver_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'naver_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('naver_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'naver_pay'}
                                onChange={() => handleTogglePaymentMethod('naver_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Naver Pay (네이버페이)</strong>
                                <span className="payment-option-subtitle">
                                  Naver account checkout
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <NaverPayBadge />
                            </div>
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
        );
      case 'samsung_pay':
        return (
          <div key="samsung_pay" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'samsung_pay' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'samsung_pay' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('samsung_pay')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'samsung_pay'}
                                onChange={() => handleTogglePaymentMethod('samsung_pay')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">Samsung Pay (삼성페이)</strong>
                                <span className="payment-option-subtitle">
                                  Samsung biometric pay
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <SamsungPayBadge />
                            </div>
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
        );
      case 'payco':
        return (
          <div key="payco" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'payco' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'payco' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('payco')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'payco'}
                                onChange={() => handleTogglePaymentMethod('payco')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">PAYCO (페이코)</strong>
                                <span className="payment-option-subtitle">
                                  PAYCO quick checkout
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <PaycoBadge />
                            </div>
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
        );
      case 'bank':
        return (
          <div key="bank" style={{
                          borderRadius: '10px',
                          border: '1.5px solid',
                          borderColor: formData.paymentMethod === 'bank' ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                          backgroundColor: formData.paymentMethod === 'bank' ? '#FAF8F5' : '#FFFFFF',
                          overflow: 'hidden'
                        }}>
                          <label
                            onClick={() => handleTogglePaymentMethod('bank')}
                            className="payment-option-label"
                          >
                            <div className="payment-option-info">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={formData.paymentMethod === 'bank'}
                                onChange={() => handleTogglePaymentMethod('bank')}
                                className="payment-option-radio"
                              />
                              <div className="payment-option-text">
                                <strong className="payment-option-title">
                                  Direct Studio Bank Wire
                                </strong>
                                <span className="payment-option-subtitle">
                                  Barclays studio transfer with reference
                                </span>
                              </div>
                            </div>
                            <div className="payment-badge-container">
                              <Building2 size={16} color="#8C8074" style={{ flexShrink: 0 }} />
                            </div>
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
        );
      default:
        return null;
    }
  };

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
          <div className="checkout-header-branding">
            <span className="checkout-brand-title">
              House of Nina
            </span>
          </div>

          {/* Luxury Compact Icon Step Indicator (Never Crowds House of Nina on Mobile) */}
          <div className="checkout-step-icons">
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

          {/* Close Button Pinned at Top Right */}
          <div className="checkout-header-actions">
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
                      STEP 1: LOCATION-FIRST PROGRESSIVE DISCLOSURE
                      ══════════════════════════════════════════════════════════ */}
              {checkoutStep === 1 && (
                <>
                  {/* STEP 1: DELIVERY LOCATION */}
                  <div className="checkout-location-card">
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                        Step 1 • Delivery Destination
                      </span>
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--color-deep-espresso)',
                        margin: '0 0 5px 0',
                        lineHeight: 1.25
                      }}>
                        Where are we sending your order?
                      </h2>
                      <p style={{ margin: 0, fontSize: '11.5px', color: '#685C50', lineHeight: 1.4 }}>
                        Select your destination for shipping speeds and payment options.
                      </p>
                    </div>

                    {/* Chevron Dropdown Selector (Default: United Kingdom) */}
                    <div style={{ position: 'relative', width: '100%', marginTop: '14px' }}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(prev => !prev)}
                        style={{
                          width: '100%',
                          minHeight: '48px',
                          padding: '10px 14px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          border: '1.5px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          gap: '12px',
                          boxSizing: 'border-box',
                          transition: 'all 0.2s ease',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          <span style={{ fontSize: '22px', lineHeight: 1 }} role="img" aria-label={currentDestination?.name || 'United Kingdom'}>
                            {currentDestination?.flag || '🇬🇧'}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ fontSize: '13.5px', color: 'var(--color-deep-espresso)', display: 'block', lineHeight: 1.2 }}>
                              {currentDestination?.name || 'United Kingdom'}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#8C8074' }}>
                              {currentDestination?.region || 'United Kingdom'} • Currency: {currentDestination?.currency || 'GBP'}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, color: 'var(--color-deep-espresso)' }}>
                          {isCountryDropdownOpen ? (
                            <ChevronUp size={16} strokeWidth={2.2} />
                          ) : (
                            <ChevronDown size={16} strokeWidth={2.2} />
                          )}
                        </div>
                      </button>

                      {/* Dropdown Options Drawer */}
                      {isCountryDropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          right: 0,
                          zIndex: 60,
                          maxHeight: '260px',
                          overflowY: 'auto',
                          borderRadius: '10px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 10px 32px rgba(26, 20, 18, 0.14)',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '6px'
                        }}>
                          {SUPPORTED_DESTINATIONS.map(dest => {
                            const isSelected = (selectedCountryCode || 'GB') === dest.code;
                            return (
                              <button
                                key={dest.code}
                                type="button"
                                onClick={() => handleSelectCountry(dest.code)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '10px 12px',
                                  borderRadius: '7px',
                                  backgroundColor: isSelected ? '#FAF5EB' : 'transparent',
                                  border: 'none',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  gap: '10px',
                                  transition: 'background 0.15s ease'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <span style={{ fontSize: '18px' }}>{dest.flag}</span>
                                  <div>
                                    <strong style={{ fontSize: '12.5px', color: 'var(--color-deep-espresso)', display: 'block' }}>
                                      {dest.name}
                                    </strong>
                                    <span style={{ fontSize: '10.5px', color: '#8C8074' }}>
                                      {dest.region} • Currency: {dest.currency}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check size={14} color="var(--color-deep-espresso)" strokeWidth={2.5} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact, Delivery Address, and Shipping */}
                  {currentDestination && (
                    <div className="checkout-revealed-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* STEP 2: CONTACT INFORMATION AND ADDRESS */}
                      <div style={{ backgroundColor: '#FFFFFF', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '6px' }}>
                          <div>
                            <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block' }}>
                              Step 2 • Contact &amp; Address
                            </span>
                            <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Contact &amp; Delivery Address
                            </h3>
                          </div>
                          {matchingSavedAddresses.length > 0 && (
                            <span style={{ fontSize: '11px', color: '#8C8074' }}>
                              Saved in Client Book
                            </span>
                          )}
                        </div>

                        {/* Contact Fields: Email & Phone */}
                        <div className="checkout-row-2" style={{ marginBottom: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              Email Address <span style={{ color: '#C53030' }}>*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="client@domain.com"
                              required
                              style={standardInputStyle}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                              Phone Number (SMS updates) <span style={{ color: '#C53030' }}>*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder={currentDestination.phonePlaceholder}
                              required
                              style={standardInputStyle}
                            />
                          </div>
                        </div>

                        {/* Saved Address Chips for this country */}
                        {matchingSavedAddresses.length > 0 && (
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                              Saved Addresses for {currentDestination.name}
                            </span>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              {matchingSavedAddresses.map((addr) => {
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
                                <span>Custom Address</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Active Saved Address Summary Box (when not manually editing) */}
                        {!isEditingAddress && activeSaved && activeSaved.countryCode === selectedCountryCode && (
                          <div style={{
                            padding: '14px',
                            backgroundColor: '#FAF8F5',
                            borderRadius: '10px',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '10px',
                            marginBottom: '10px'
                          }}>
                            <div>
                              <strong style={{ fontSize: '13px', color: 'var(--color-deep-espresso)', display: 'block', marginBottom: '2px' }}>
                                {formData.fullName} • {activeSaved.label}
                              </strong>
                              <span style={{ fontSize: '12px', color: '#685C50', display: 'block' }}>
                                {formData.address}, {formData.city}{formData.state ? `, ${formData.state}` : ''} {formData.postalCode}
                              </span>
                              <span style={{ fontSize: '11.5px', color: '#8C8074', display: 'block', marginTop: '2px' }}>
                                {currentDestination.flag} {currentDestination.name} • Tel: {formData.phone}
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
                            >Edit</button>
                          </div>
                        )}

                        {/* Address Input Fields */}
                        {(isEditingAddress || !activeSaved || activeSaved.countryCode !== selectedCountryCode || selectedAddressId === 'new') && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                Recipient Full Name <span style={{ color: '#C53030' }}>*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="Full name of recipient"
                                required
                                style={standardInputStyle}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                Street Address &amp; Suite / Apt <span style={{ color: '#C53030' }}>*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="House / building number, street name, suite or apartment"
                                required
                                style={standardInputStyle}
                              />
                            </div>

                            <div className="checkout-row-3">
                              <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                  City / Town <span style={{ color: '#C53030' }}>*</span>
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
                                  {currentDestination.stateLabel} {currentDestination.stateRequired && <span style={{ color: '#C53030' }}>*</span>}
                                </label>
                                <input
                                  type="text"
                                  value={formData.state}
                                  onChange={(e) => handleChange('state', e.target.value)}
                                  placeholder={currentDestination.statePlaceholder}
                                  required={currentDestination.stateRequired}
                                  style={standardInputStyle}
                                />
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#685C50', marginBottom: '5px', fontWeight: 500 }}>
                                  {currentDestination.postalCodeLabel} {currentDestination.postalCodeRequired && <span style={{ color: '#C53030' }}>*</span>}
                                </label>
                                <input
                                  type="text"
                                  value={formData.postalCode}
                                  onChange={(e) => handleChange('postalCode', e.target.value)}
                                  placeholder={currentDestination.postalCodePlaceholder}
                                  required={currentDestination.postalCodeRequired}
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
                                  Save to Client Book:
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

                      {/* STEP 3: DELIVERY OPTIONS (Progressively revealed once address is complete) */}
                      <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '18px 20px',
                        borderRadius: '14px',
                        border: '1px solid var(--color-border)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{ marginBottom: '12px' }}>
                          <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block' }}>
                            Step 3 • Courier Options
                          </span>
                          <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-deep-espresso)', margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Available Shipping to {currentDestination.name}
                          </h3>
                        </div>

                        {!isContactAndAddressValid ? (
                          <div style={{
                            padding: '14px',
                            borderRadius: '8px',
                            backgroundColor: '#FAF8F5',
                            border: '1px dashed var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#685C50',
                            fontSize: '12px'
                          }}>
                            <Truck size={16} color="#8C8074" flexShrink={0} />
                            <span>
                              Complete your recipient name and delivery address above to reveal available courier speeds.
                            </span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {availableShippingOptions.map((opt) => {
                              const isSelected = formData.deliveryMethod === opt.id;
                              const optCost = Math.round(opt.priceGbp * rate);
                              const isFree = optCost === 0;

                              return (
                                <label
                                  key={opt.id}
                                  onClick={() => handleChange('deliveryMethod', opt.id)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid',
                                    borderColor: isSelected ? 'var(--color-deep-espresso)' : 'var(--color-border)',
                                    backgroundColor: isSelected ? '#FAF8F5' : '#FFFFFF',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    minHeight: '58px',
                                    gap: '12px',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                                    <input
                                      type="radio"
                                      name="deliveryMethod"
                                      checked={isSelected}
                                      onChange={() => { }}
                                      style={{ accentColor: 'var(--color-deep-espresso)', width: '16px', height: '16px', margin: 0, flexShrink: 0, cursor: 'pointer' }}
                                    />
                                    <div style={{ minWidth: 0 }}>
                                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)' }}>
                                        {opt.name}
                                      </strong>
                                      <span style={{ fontSize: '11.5px', color: '#8C8074' }}>
                                        {opt.timeframe}
                                      </span>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: isFree ? '#2E7D32' : 'var(--color-deep-espresso)', flexShrink: 0 }}>
                                    {isFree ? 'Free' : formatPrice(optCost)}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Continue to Payment Button */}
                      <button
                        type="button"
                        onClick={handleProceedToPayment}
                        disabled={!canProceedToPayment}
                        className="btn-primary-editorial"
                        style={{
                          width: '100%',
                          minHeight: '52px',
                          height: '52px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '14px 20px',
                          fontSize: '14px',
                          fontWeight: 700,
                          cursor: canProceedToPayment ? 'pointer' : 'not-allowed',
                          opacity: canProceedToPayment ? 1 : 0.6
                        }}
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
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
                        Delivering To {currentDestination ? `${currentDestination.flag} ${currentDestination.name}` : ''} ({currentAddressTag})
                      </span>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-deep-espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {formData.fullName} • {formData.address}, {formData.city}{formData.state ? `, ${formData.state}` : ''} {formData.postalCode}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 500 }}>
                        {selectedShippingOption
                          ? `${selectedShippingOption.name} (${selectedShippingOption.priceGbp === 0 ? 'Free' : formatPrice(shippingCost)})`
                          : 'Free Delivery'}
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

                  {/* Payment Options Selection */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-espresso)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Payment method
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#685C50' }}>
                        <Lock size={12} color="#1E7E34" />
                        <span>Encrypted &amp; Secure</span>
                      </div>
                    </div>

                    {/* Recommended / Initial Eligible Methods */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {initialMethods.map(methodId => renderPaymentOption(methodId))}
                    </div>

                    {/* Expandable "More payment options" row for remaining eligible methods */}
                    {remainingMethods.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setShowMorePaymentOptions(prev => !prev)}
                          className="btn-more-payment-options"
                          aria-expanded={showMorePaymentOptions}
                          id="btn-more-payment-options"
                        >
                          <span>{showMorePaymentOptions ? 'Fewer payment options' : 'More payment options'}</span>
                          {showMorePaymentOptions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {showMorePaymentOptions && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            {remainingMethods.map(methodId => renderPaymentOption(methodId))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Step 2 Action Buttons */}
                  <div className="checkout-step2-actions">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="checkout-btn-back"
                    >
                      <ArrowLeft size={15} />
                      <span>Back to Delivery</span>
                    </button>

                    <button
                      type="button"
                      className="checkout-btn-submit"
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting || cartItems.length === 0}
                    >
                      {isSubmitting ? (
                        <span style={{ whiteSpace: 'nowrap' }}>Processing Payment...</span>
                      ) : (
                        <>
                          <Lock size={15} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap' }}>
                            Authorize Payment • {formatPrice(total)}
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
                    <strong style={{ color: !selectedCountryCode ? '#8C8074' : (shippingCost === 0 ? '#1E7E34' : 'var(--color-deep-espresso)') }}>
                      {!selectedCountryCode
                        ? 'Select destination'
                        : (!formData.deliveryMethod
                          ? 'Select courier speed'
                          : (shippingCost === 0 ? 'Free' : formatPrice(shippingCost))
                        )
                      }
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
                        {selectedCountryCode === 'GB'
                          ? 'Includes UK VAT (20%)'
                          : 'Excludes local customs & import duties'
                        }
                      </span>
                    </div>
                    <strong style={{ fontSize: '22px', color: 'var(--color-deep-espresso)', fontFamily: 'var(--font-display)' }}>
                      {formatPrice(total)}
                    </strong>
                  </div>
                </div>

                {/* Desktop Contextual Step CTA on Right Column (Hidden on mobile to avoid duplicate buttons) */}
                <div className="checkout-summary-cta">
                  {checkoutStep === 1 ? (
                    <button
                      type="button"
                      className="btn-primary-editorial"
                      onClick={handleProceedToPayment}
                      disabled={!canProceedToPayment}
                      style={{
                        width: '100%',
                        minHeight: '52px',
                        height: '52px',
                        marginTop: '18px',
                        padding: '14px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        cursor: canProceedToPayment ? 'pointer' : 'not-allowed',
                        opacity: canProceedToPayment ? 1 : 0.6
                      }}
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="checkout-btn-submit"
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting || cartItems.length === 0}
                      style={{
                        width: '100%',
                        minHeight: '52px',
                        height: '52px',
                        marginTop: '18px',
                        padding: '14px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700
                      }}
                    >
                      {isSubmitting ? (
                        <span style={{ whiteSpace: 'nowrap' }}>Processing Payment...</span>
                      ) : (
                        <>
                          <Lock size={15} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap' }}>
                            Authorize Payment • {formatPrice(total)}
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
    </div>
  );
}
