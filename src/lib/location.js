const LOCATION_STORAGE_KEY = 'house_of_nina_visitor_location_v1';
const LOCATION_EVENT = 'house_of_nina_location_changed';

export const SUPPORTED_LOCATIONS = [
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', phonePrefix: '+44' },
  { code: 'US', name: 'United States', currency: 'USD', phonePrefix: '+1' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', phonePrefix: '+234' },
  { code: 'CA', name: 'Canada', currency: 'CAD', phonePrefix: '+1' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', phonePrefix: '+233' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', phonePrefix: '+971' },
  { code: 'FR', name: 'France', currency: 'EUR', phonePrefix: '+33' },
  { code: 'DE', name: 'Germany', currency: 'EUR', phonePrefix: '+49' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', phonePrefix: '+353' },
  { code: 'AU', name: 'Australia', currency: 'AUD', phonePrefix: '+61' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', phonePrefix: '+31' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', phonePrefix: '+32' },
  { code: 'PL', name: 'Poland', currency: 'PLN', phonePrefix: '+48' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', phonePrefix: '+351' },
  { code: 'AT', name: 'Austria', currency: 'EUR', phonePrefix: '+43' },
  { code: 'IT', name: 'Italy', currency: 'EUR', phonePrefix: '+39' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', phonePrefix: '+82' },
  { code: 'JP', name: 'Japan', currency: 'JPY', phonePrefix: '+81' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', phonePrefix: '+27' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', phonePrefix: '+41' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', phonePrefix: '+46' }
];

const TIMEZONE_TO_COUNTRY = {
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Warsaw': 'PL',
  'Europe/Lisbon': 'PT',
  'Europe/Vienna': 'AT',
  'Europe/Rome': 'IT',
  'Europe/Zurich': 'CH',
  'Europe/Stockholm': 'SE',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Asia/Seoul': 'KR',
  'Asia/Tokyo': 'JP',
  'Asia/Dubai': 'AE',
  'Africa/Lagos': 'NG',
  'Africa/Accra': 'GH',
  'Africa/Johannesburg': 'ZA'
};

const DEFAULT_LOCATION = SUPPORTED_LOCATIONS[0];

function normalizeLocation(code, name) {
  const upperCode = String(code || '').toUpperCase().slice(0, 2);
  const supported = SUPPORTED_LOCATIONS.find(loc => loc.code === upperCode);
  return {
    code: upperCode || DEFAULT_LOCATION.code,
    name: name || supported?.name || upperCode || DEFAULT_LOCATION.name,
    currency: supported?.currency || DEFAULT_LOCATION.currency,
    phonePrefix: supported?.phonePrefix || DEFAULT_LOCATION.phonePrefix,
    supported: Boolean(supported)
  };
}

export function getStoredLocation() {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.code) return null;
    return normalizeLocation(parsed.code, parsed.name);
  } catch {
    return null;
  }
}

export function saveVisitorLocation(code, name) {
  const location = normalizeLocation(code, name);
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent(LOCATION_EVENT, { detail: location }));
  } catch {}
  return location;
}

export function subscribeToLocation(listener) {
  window.addEventListener(LOCATION_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(LOCATION_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

function detectFromBrowser() {
  try {
    const locale = navigator.language || '';
    const region = new Intl.Locale(locale).region;
    if (region && SUPPORTED_LOCATIONS.some(loc => loc.code === region)) {
      return normalizeLocation(region);
    }
  } catch {}

  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && TIMEZONE_TO_COUNTRY[zone]) {
      return normalizeLocation(TIMEZONE_TO_COUNTRY[zone]);
    }
  } catch {}

  return DEFAULT_LOCATION;
}

async function fetchWithTimeout(url, signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) throw new Error(`Location lookup failed: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

export async function detectVisitorLocation({ force = false, signal } = {}) {
  const stored = getStoredLocation();
  if (stored && !force) return stored;

  let detected = null;
  try {
    const data = await fetchWithTimeout('https://ipapi.co/json/', signal);
    if (data?.country_code) detected = normalizeLocation(data.country_code, data.country_name);
  } catch {}

  if (!detected && !signal?.aborted) {
    try {
      const data = await fetchWithTimeout('https://ipwho.is/', signal);
      if (data?.success && data?.country_code) detected = normalizeLocation(data.country_code, data.country);
    } catch {}
  }

  if (signal?.aborted) return stored || detectFromBrowser();

  if (!detected || !detected.supported) {
    const fromBrowser = detectFromBrowser();
    detected = fromBrowser.supported ? fromBrowser : DEFAULT_LOCATION;
  }

  return saveVisitorLocation(detected.code, detected.name);
}
