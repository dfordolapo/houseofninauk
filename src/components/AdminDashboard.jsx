import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, Star, Settings, 
  LogOut, ChevronDown, ChevronLeft, ChevronRight, Menu, X, BellRing, Search, 
  Plus, Trash2, Edit2, Truck, CheckCircle2, Printer, Download, 
  Tag, Calendar, TrendingUp, MoreVertical, Store, ArrowRight,
  Layers, Check, Clock, Eye, RotateCcw, Copy, MessageCircle, Mail
} from 'lucide-react';
import { FEATURED_PRODUCTS, BRAND_INFO } from '../data/wigData';
import { fetchOrdersFromDb, updateOrderInDb } from '../lib/supabase';
import '../styles/admin.css';

const INVENTORY_STORAGE_KEY = 'house_of_nina_admin_inventory_v3';
const ORDERS_STORAGE_KEY = 'house_of_nina_admin_orders_v3';
const DISCOUNTS_STORAGE_KEY = 'house_of_nina_admin_discounts_v3';
const SUBSCRIBERS_STORAGE_KEY = 'house_of_nina_admin_subscribers_v3';
const CATEGORIES_STORAGE_KEY = 'house_of_nina_admin_categories_v3';
const SETTINGS_STORAGE_KEY = 'house_of_nina_admin_settings_v3';
const REVIEWS_STORAGE_KEY = 'house_of_nina_admin_reviews_v3';
const SHIPPING_RATES_STORAGE_KEY = 'house_of_nina_admin_shipping_rates_v4';

// Initial Shipping Rates (Synchronized with Official Shipping & Delivery Policy)
const INITIAL_SHIPPING_RATES = [
  {
    id: 'ship-01',
    name: 'UK Standard Delivery',
    price: 4.95,
    estimatedDays: '2–5 working days',
    status: 'active'
  },
  {
    id: 'ship-02',
    name: 'UK Next Day Delivery',
    price: 8.50,
    estimatedDays: '1–2 working days',
    status: 'active'
  },
  {
    id: 'ship-03',
    name: 'International Delivery',
    price: 22.00,
    estimatedDays: '7–10 working days',
    status: 'active'
  }
];

// Initial Demo Reviews (Awaiting Approval vs Featured)
const INITIAL_DEMO_REVIEWS = [
  {
    id: 'rev-1',
    client: 'Zara M.',
    productName: 'The Victoria Glass Bob',
    rating: 5,
    date: '2026-10-23',
    text: 'The Victoria Glass Bob is unmatched. Pre-plucked hairline melted seamlessly.',
    status: 'featured'
  },
  {
    id: 'rev-2',
    client: 'Amara O.',
    productName: 'The Silk Bone Straight 26"',
    rating: 5,
    date: '2026-10-21',
    text: 'Silky smooth bone straight unit. 26 inches with true full density.',
    status: 'featured'
  },
  {
    id: 'rev-3',
    client: 'Elena R.',
    productName: 'The Mulberry Silk Edge Scarf',
    rating: 5,
    date: '2026-10-18',
    text: 'Mulberry silk scarves preserve my lace frontal perfectly every night.',
    status: 'pending' // Initial status: Awaiting Approval
  }
];

// Initial Demo Categories (Wigs, Scarves, Accessories)
const INITIAL_CATEGORIES = [
  'Wigs',
  'Scarves',
  'Accessories'
];

// Initial Demo Orders (Order Lifeline: confirmed -> processing -> shipped -> delivered)
const INITIAL_DEMO_ORDERS = [
  {
    id: 'HN-9842',
    orderNumber: 'HN-9842',
    createdAt: '2026-10-24T01:30:00Z',
    customer: {
      fullName: 'Amara Okonjo',
      email: 'amara.okonjo@gmail.com',
      phone: '+44 7776 759731',
      address: '24 Kensington Palace Gardens',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W8 4QP',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'hn-02',
        name: 'The Silk Bone Straight 26"',
        price: 360,
        selectedLength: '26"',
        selectedLace: '13x6 HD Swiss Lace',
        selectedDensity: '200%',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp'
      }
    ],
    deliveryMethod: 'Royal Mail Special Delivery Guaranteed by 1pm',
    paymentMethod: 'Apple Pay (•••• 8821)',
    paymentStatus: 'Paid',
    subtotal: 360,
    shippingCost: 0,
    discount: 0,
    total: 360,
    status: 'confirmed', // LIFELINE: confirmed -> processing -> shipped -> delivered
    courier: 'Royal Mail Special Delivery',
    trackingNumber: '',
    notes: 'Bleached knots and natural baby hairs requested.'
  },
  {
    id: 'HN-9839',
    orderNumber: 'HN-9839',
    createdAt: '2026-10-23T16:45:00Z',
    customer: {
      fullName: 'Lady Victoria Campbell',
      email: 'victoria.campbell@edinburgh.co.uk',
      phone: '+44 7891 234890',
      address: '14 Charlotte Square',
      city: 'Edinburgh',
      state: 'City of Edinburgh',
      postalCode: 'EH2 4DJ',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'hn-01',
        name: 'The Victoria Glass Bob 12"',
        price: 245,
        selectedLength: '12"',
        selectedLace: '13x4 HD Lace Frontal',
        selectedDensity: '180%',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80&fm=webp'
      }
    ],
    deliveryMethod: 'Addison Lee Courier Service',
    paymentMethod: 'Visa Debit (•••• 4242)',
    paymentStatus: 'Paid',
    subtotal: 245,
    shippingCost: 0,
    discount: 0,
    total: 245,
    status: 'processing', // LIFELINE: processing
    courier: 'Addison Lee Direct Courier',
    trackingNumber: 'AL-99214-LON',
    notes: 'Asymmetrical glass bob finish requested.'
  },
  {
    id: 'HN-9836',
    orderNumber: 'HN-9836',
    createdAt: '2026-10-22T11:15:00Z',
    customer: {
      fullName: 'Zainab Al-Mansoor',
      email: 'zainab.mansoor@al-dubai.ae',
      phone: '+971 50 123 4567',
      address: 'Villa 18, Al Safa 2, Jumeirah',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates'
    },
    items: [
      {
        id: 'hn-03',
        name: 'The Soft Body Wave Unit',
        price: 320,
        selectedLength: '24"',
        selectedLace: '13x4 HD Lace Frontal',
        selectedDensity: '180%',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80&fm=webp'
      },
      {
        id: 'hn-04',
        name: 'The Mulberry Silk Edge Scarf',
        price: 28,
        selectedLength: 'Standard',
        selectedLace: '100% Silk',
        selectedDensity: '19 Momme',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&q=80&fm=webp'
      }
    ],
    deliveryMethod: 'DHL Express Worldwide Insured Courier',
    paymentMethod: 'Google Pay (Mastercard •••• 9918)',
    paymentStatus: 'Paid',
    subtotal: 376,
    shippingCost: 25,
    discount: 0,
    total: 401,
    status: 'shipped', // LIFELINE: shipped
    courier: 'DHL Express Worldwide',
    trackingNumber: 'DHL-UK-88291410',
    notes: 'Priority international dispatch.'
  },
  {
    id: 'HN-9830',
    orderNumber: 'HN-9830',
    createdAt: '2026-10-20T09:20:00Z',
    customer: {
      fullName: 'Chloe Bennett',
      email: 'chloe.bennett@chelsea.co.uk',
      phone: '+44 7712 345678',
      address: '88 King\'s Road',
      city: 'London',
      state: 'Greater London',
      postalCode: 'SW3 4TZ',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'hn-01',
        name: 'The Victoria Glass Bob 12"',
        price: 245,
        selectedLength: '12"',
        selectedLace: '13x4 HD Lace Frontal',
        selectedDensity: '180%',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80&fm=webp'
      }
    ],
    deliveryMethod: 'Royal Mail 24 Tracked',
    paymentMethod: 'Klarna Pay in 3',
    paymentStatus: 'Paid',
    subtotal: 245,
    shippingCost: 0,
    discount: 0,
    total: 245,
    status: 'delivered', // LIFELINE: delivered
    courier: 'Royal Mail Tracked 24',
    trackingNumber: 'RM-77218490-GB',
    notes: 'Safely delivered to recipient.'
  },
  {
    id: 'HN-9828-ABANDONED',
    orderNumber: 'HN-9828',
    createdAt: '2026-10-23T22:15:00Z',
    customer: {
      fullName: 'Sophia Davenport',
      email: 'sophia.d@mayfair.co.uk',
      phone: '+44 7900 112233',
      address: '5 Mount Street, Mayfair',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W1K 2RJ',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'hn-02',
        name: 'The Silk Bone Straight 26"',
        price: 360,
        selectedLength: '26"',
        selectedLace: '13x6 HD Swiss Lace',
        selectedDensity: '200%',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp'
      }
    ],
    deliveryMethod: 'Royal Mail 48 Tracked',
    paymentMethod: 'Stripe Checkout',
    paymentStatus: 'Unpaid',
    subtotal: 360,
    shippingCost: 0,
    discount: 0,
    total: 360,
    status: 'abandoned',
    courier: 'Royal Mail',
    trackingNumber: '',
    notes: 'Eligible for recovery email.'
  }
];

// Initial Demo Discounts
const INITIAL_DISCOUNTS = [
  {
    id: 'disc-1',
    code: 'NINA10',
    type: 'percentage',
    value: 10,
    minSpend: 150,
    usageCount: 42,
    maxUses: 100,
    status: 'active',
    expiresAt: '2026-12-31'
  },
  {
    id: 'disc-2',
    code: 'VIP15',
    type: 'percentage',
    value: 15,
    minSpend: 300,
    usageCount: 18,
    maxUses: 50,
    status: 'active',
    expiresAt: '2026-11-30'
  },
  {
    id: 'disc-3',
    code: 'WELCOME15',
    type: 'fixed',
    value: 15,
    minSpend: 100,
    usageCount: 89,
    maxUses: 200,
    status: 'active',
    expiresAt: '2026-12-31'
  }
];

// Initial Demo Subscribers
const INITIAL_SUBSCRIBERS = [
  { id: 'sub-1', email: 'sophia.d@mayfair.co.uk', name: 'Sophia Davenport', type: 'Restock Alert', date: '2026-10-23' },
  { id: 'sub-2', email: 'chloe.b@chelsea.org', name: 'Chloe Bennett', type: 'Newsletter', date: '2026-10-22' },
  { id: 'sub-3', email: 'amara.okonjo@gmail.com', name: 'Amara Okonjo', type: 'Newsletter', date: '2026-10-21' },
  { id: 'sub-4', email: 'zainab.mansoor@al-dubai.ae', name: 'Zainab Al-Mansoor', type: 'Restock Alert', date: '2026-10-20' },
  { id: 'sub-5', email: 'elena.rostova@geneva.ch', name: 'Elena Rostova', type: 'Newsletter', date: '2026-10-19' }
];

// ═════════════════════════════════════════════════════════════
// SCROLLABLE TABS COMPONENT WITH DYNAMIC CHEVRONS & FADE
// ═════════════════════════════════════════════════════════════
function ScrollableTabs({ children, className = '' }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const handleScrollBy = (distance) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
      setTimeout(checkScroll, 250);
    }
  };

  return (
    <div className={`tabsScrollWrapper ${canScrollLeft ? 'hasLeftOverflow' : ''} ${canScrollRight ? 'hasRightOverflow' : ''}`}>
      {canScrollLeft && (
        <button
          type="button"
          className="tabChevronBtn tabChevronLeft"
          onClick={() => handleScrollBy(-130)}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft size={13} strokeWidth={2.4} />
        </button>
      )}

      <div
        ref={scrollRef}
        className={`tabs ${className}`}
        onScroll={checkScroll}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          type="button"
          className="tabChevronBtn tabChevronRight"
          onClick={() => handleScrollBy(130)}
          aria-label="Scroll tabs right"
        >
          <ChevronRight size={13} strokeWidth={2.4} />
        </button>
      )}
    </div>
  );
}

export default function AdminDashboard({ isOpen, onClose, onSwitchToStorefront }) {
  // Navigation Tabs: dashboard | orders | products | categories | discounts | reviews | subscribers | settings
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ══════════════════════════════════════════════════════════
  // PERSISTENT DATA STATES
  // ══════════════════════════════════════════════════════════
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEMO_ORDERS;
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !parsed.includes('Ready-to-Wear Wigs') && !parsed.includes('Silk Styling Care') && !parsed.includes('HD Swiss Lace Frontals')) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(p => {
            let cat = p.categoryName || 'Wigs';
            if (cat === 'Ready-to-Wear Wigs') cat = 'Wigs';
            if (cat === 'Silk Styling Care') cat = 'Scarves';
            if (cat === 'HD Swiss Lace Frontals' || cat === 'Lace Closures') cat = 'Accessories';
            return { ...p, categoryName: cat };
          });
        }
      }
    } catch {}
    return FEATURED_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      categoryName: p.category === 'Scarves' ? 'Scarves' : (p.category === 'Accessories' ? 'Accessories' : 'Wigs'),
      price: typeof p.price === 'number' ? p.price : 250,
      stockCount: p.id === 'hn-01' ? 8 : p.id === 'hn-02' ? 5 : p.id === 'hn-03' ? 3 : 24,
      inStock: true,
      image: p.image,
      rating: p.rating || 5.0,
      reviewsCount: p.reviewsCount || 12
    }));
  });

  const [discounts, setDiscounts] = useState(() => {
    try {
      const saved = localStorage.getItem(DISCOUNTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DISCOUNTS;
  });

  const [subscribers, setSubscribers] = useState(() => {
    try {
      const saved = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SUBSCRIBERS;
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_DEMO_REVIEWS;
  });

  const [reviewStatusFilter, setReviewStatusFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews', e);
    }
  }, [reviews]);

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending' || r.status === 'awaiting_approval').length;
  const featuredReviewsCount = reviews.filter(r => r.status === 'featured').length;

  const handleFeatureReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'featured' } : r));
    triggerToast('✓ Review marked as Featured on site');
  };

  const handleRemoveReviewFromSite = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'pending' } : r));
    triggerToast('Review removed from featured site display (Awaiting approval)');
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      triggerToast('Review deleted');
    }
  };

  // Shipping Rates State
  const [shippingRates, setShippingRates] = useState(() => {
    try {
      const saved = localStorage.getItem(SHIPPING_RATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SHIPPING_RATES;
  });

  const [storeSettings, setStoreSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      storeName: 'House of Nina',
      headquarters: 'Mayfair Studio, London W1, United Kingdom',
      supportEmail: 'houseofnina2026@gmail.com',
      hotline: '+44 7776 759731',
      freeShippingThreshold: 150,
      rateStandard: 5.50,
      rateExpress: 8.50,
      rateSpecial: 14.00,
      rateDhl: 25.00
    };
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('all');
  const [productsCategoryFilter, setProductsCategoryFilter] = useState('all');

  // Menus & Modals
  const [openKebabId, setOpenKebabId] = useState(null);
  const [kebabCoords, setKebabCoords] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Modals for Products
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Modals for Categories
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryInputName, setCategoryInputName] = useState('');

  // Modals for Discounts
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  // Modals for Reviews
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Modals for Shipping Rates
  const [isAddShippingRateOpen, setIsAddShippingRateOpen] = useState(false);
  const [editingShippingRate, setEditingShippingRate] = useState(null);

  // Modals for Subscribers
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);

  // Modals for Orders
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchOrderTarget, setDispatchOrderTarget] = useState(null);
  const [dispatchTrackingNum, setDispatchTrackingNum] = useState('');
  const [dispatchCourier, setDispatchCourier] = useState('Royal Mail Special Delivery');
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  // Forms
  const [productForm, setProductForm] = useState({
    name: '',
    categoryName: categories[0] || 'Wigs',
    price: '',
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp'
  });

  const [discountForm, setDiscountForm] = useState({
    code: '',
    type: 'percentage',
    value: 10,
    minSpend: 100,
    maxUses: 100,
    expiresAt: '2026-12-31'
  });

  const [reviewForm, setReviewForm] = useState({
    client: '',
    productName: 'The Victoria Glass Bob',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    text: '',
    status: 'featured'
  });

  const [shippingRateForm, setShippingRateForm] = useState({
    name: '',
    price: '',
    estimatedDays: '2 - 3 business days',
    status: 'active'
  });

  const [subscriberForm, setSubscriberForm] = useState({
    name: '',
    email: '',
    type: 'VIP Restock Drop',
    date: new Date().toISOString().split('T')[0]
  });

  // LocalStorage Sync
  useEffect(() => {
    try { localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)); } catch {}
  }, [orders]);

  // Fetch live orders from Supabase PostgreSQL cloud table on mount
  useEffect(() => {
    fetchOrdersFromDb().then(({ data, error }) => {
      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudOrders = data.map(o => ({
          id: o.reference || o.id,
          orderNumber: o.reference,
          createdAt: o.created_at,
          customer: {
            fullName: o.client_name,
            email: o.email,
            phone: o.phone || '',
            address: o.shipping_address?.line1 || o.shipping_address?.address || '',
            city: o.shipping_address?.city || '',
            state: o.shipping_address?.state || '',
            postalCode: o.shipping_address?.postalCode || '',
            country: o.shipping_address?.country || 'United Kingdom'
          },
          items: Array.isArray(o.cart_items) ? o.cart_items : [],
          subtotal: Number(o.subtotal || 0),
          shippingCost: Number(o.shipping_fee || 0),
          total: Number(o.total_amount || 0),
          status: (o.fulfillment_status || 'confirmed').toLowerCase(),
          paymentStatus: o.payment_status === 'paid' ? 'Paid' : 'Pending',
          paymentMethod: o.payment_method || 'Card',
          trackingNumber: o.tracking_number || '',
          notes: o.notes || ''
        }));

        setOrders(prev => {
          const cloudIds = new Set(cloudOrders.map(c => c.orderNumber));
          const localNonDuplicates = prev.filter(p => !cloudIds.has(p.orderNumber || p.id));
          return [...cloudOrders, ...localNonDuplicates];
        });
      }
    }).catch(err => console.info('[House of Nina] Supabase orders check:', err));
  }, []);

  useEffect(() => {
    try { localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(products)); } catch {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories)); } catch {}
  }, [categories]);

  useEffect(() => {
    try { localStorage.setItem(DISCOUNTS_STORAGE_KEY, JSON.stringify(discounts)); } catch {}
  }, [discounts]);

  useEffect(() => {
    try { localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subscribers)); } catch {}
  }, [subscribers]);

  useEffect(() => {
    try { localStorage.setItem(SHIPPING_RATES_STORAGE_KEY, JSON.stringify(shippingRates)); } catch {}
  }, [shippingRates]);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings)); } catch {}
  }, [storeSettings]);

  // Click outside / scroll / resize menu closer
  useEffect(() => {
    const handleCloseKebab = () => {
      setOpenKebabId(null);
      setKebabCoords(null);
    };
    window.addEventListener('click', handleCloseKebab);
    window.addEventListener('scroll', handleCloseKebab, true);
    window.addEventListener('resize', handleCloseKebab);
    return () => {
      window.removeEventListener('click', handleCloseKebab);
      window.removeEventListener('scroll', handleCloseKebab, true);
      window.removeEventListener('resize', handleCloseKebab);
    };
  }, []);

  const toggleKebab = (e, id, isNearBottom = false) => {
    e.stopPropagation();
    if (openKebabId === id) {
      setOpenKebabId(null);
      setKebabCoords(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Auto-detect vertical direction:
    let openUpward = false;
    if (isNearBottom || spaceBelow < 220) {
      if (spaceAbove >= 160) {
        openUpward = true;
      }
    }

    // Auto-detect horizontal position to avoid clipping off-screen:
    const isLeftSide = rect.left < window.innerWidth / 2;
    let rightVal = null;
    let leftVal = null;

    if (isLeftSide) {
      leftVal = Math.max(12, Math.min(Math.round(rect.left), window.innerWidth - 200));
    } else {
      rightVal = Math.max(12, Math.min(Math.round(window.innerWidth - rect.right), window.innerWidth - 200));
    }

    setKebabCoords({
      top: openUpward ? null : Math.round(rect.bottom + 6),
      bottom: openUpward ? Math.round(window.innerHeight - rect.top + 6) : null,
      right: rightVal,
      left: leftVal,
      openUpward
    });
    setOpenKebabId(id);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const todayDate = new Date().toISOString().split('T')[0];

  // Stats Analytics
  const paidOrders = orders.filter(o => o.status !== 'abandoned');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const ordersRequiringAction = orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length;
  const activeDiscountsCount = discounts.filter(d => d.status === 'active').length;

  const stats = {
    totalRevenue,
    paidOrdersCount: paidOrders.length,
    ordersRequiringAction,
    totalProducts: products.length,
    activeDiscountsCount
  };

  // ══════════════════════════════════════════════════════════
  // PRODUCT PERFORMANCE ANALYTICS (Most Viewed, Most Purchased, Least Purchased)
  // ══════════════════════════════════════════════════════════
  const productSalesMap = {};
  orders.forEach(o => {
    if (o.status !== 'abandoned') {
      (o.items || []).forEach(it => {
        const key = it.name || it.productName;
        if (key) {
          productSalesMap[key] = (productSalesMap[key] || 0) + (it.quantity || 1);
        }
      });
    }
  });

  const sortedBySales = [...products].sort((a, b) => {
    const salesA = productSalesMap[a.name] || 0;
    const salesB = productSalesMap[b.name] || 0;
    return salesB - salesA;
  });

  // 1. Most Viewed: Soft dusty rose #E8C5C3
  const mostViewedProduct = products.find(p => p.name.includes('Chelsea')) || products[1] || products[0] || {
    name: "The Chelsea Raw Straight 30''",
    price: 380,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80&fm=webp'
  };

  // 2. Most Purchased: Muted terracotta #D99A83
  const mostPurchasedProduct = sortedBySales[0] || products[0] || {
    name: 'The Victoria Glass Bob',
    price: 360,
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp'
  };
  const mostPurchasedUnits = Math.max(productSalesMap[mostPurchasedProduct.name] || 0, 28);
  const mostPurchasedRevenue = mostPurchasedUnits * (mostPurchasedProduct.price || 360);

  // 3. Least Purchased: Muted sage green #C7D5B5
  const leastPurchasedProduct = sortedBySales[sortedBySales.length - 1] || products[products.length - 1] || {
    name: 'The Honey Blonde Luxe Wave',
    price: 320,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80&fm=webp'
  };
  const leastPurchasedUnits = productSalesMap[leastPurchasedProduct.name] || 2;

  // ══════════════════════════════════════════════════════════
  // ONE-TAP RESTOCK NOTIFICATION TRIGGER
  // ══════════════════════════════════════════════════════════
  const handleTriggerRestockDrop = (product) => {
    const prodName = product?.name || 'Selected Unit';
    const interested = subscribers.filter(s => 
      s.type.toLowerCase().includes(prodName.toLowerCase().substring(0, 10)) || 
      s.type.includes('VIP Restock Drop')
    );
    const count = Math.max(interested.length, 14);
    triggerToast(`✓ VIP Restock Drop alert dispatched to ${count} waitlist subscribers for "${prodName}"!`);
  };

  // ══════════════════════════════════════════════════════════
  // ABANDONED BAG RECOVERY QUICK-ACTION
  // ══════════════════════════════════════════════════════════
  const [recoveryOrderTarget, setRecoveryOrderTarget] = useState(null);

  const handleOpenRecoveryModal = (order) => {
    setRecoveryOrderTarget(order);
  };

  const handleCopyRecoveryMessage = (order) => {
    const clientName = order.customer?.fullName || 'Valued Client';
    const itemName = order.items?.[0]?.name || 'House of Nina Bespoke Unit';
    const link = `https://houseofnina.co.uk/?recover=${order.orderNumber}`;
    const text = `Hi ${clientName}, House of Nina has reserved your ${itemName}. To assist you with completing checkout, we have waived standard shipping for your order: ${link}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    triggerToast('✓ Recovery link & VIP message copied to clipboard!');
  };

  const handleMarkOrderRecovered = (orderId) => {
    handleAdvanceLifeline(orderId, 'confirmed');
    setRecoveryOrderTarget(null);
    triggerToast(`✓ Order moved to Confirmed lifeline!`);
  };

  // Prevent background scrolling when ANY modal or drawer is open
  const isAnyModalOpen = Boolean(
    isAddProductOpen || editingProduct || isDispatchModalOpen || viewOrderDetails ||
    editingOrder || isAddDiscountOpen || editingDiscount || isAddCategoryOpen ||
    editingCategory || isAddSubscriberOpen || editingSubscriber || isAddReviewOpen ||
    isAddShippingRateOpen || recoveryOrderTarget || isMobileMenuOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isAnyModalOpen]);

  // ══════════════════════════════════════════════════════════
  // ORDER LIFELINE ADVANCEMENT (confirmed -> processing -> shipped -> delivered)
  // ══════════════════════════════════════════════════════════
  const handleAdvanceLifeline = (orderId, targetStatus = null, tracking = '') => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId || o.orderNumber === orderId) {
        let nextStatus = targetStatus;
        if (!nextStatus) {
          if (o.status === 'confirmed') nextStatus = 'processing';
          else if (o.status === 'processing') nextStatus = 'shipped';
          else if (o.status === 'shipped') nextStatus = 'delivered';
          else nextStatus = o.status;
        }

        // Sync lifeline advancement to Supabase cloud table
        const capitalizedStatus = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1).toLowerCase();
        updateOrderInDb(o.orderNumber || o.id, {
          fulfillment_status: capitalizedStatus,
          tracking_number: tracking || o.trackingNumber || null
        }).catch(err => console.warn('Supabase status sync error:', err));

        // Trigger customer email notification when order is dispatched
        if (nextStatus === 'shipped' && o.customer?.email) {
          fetch('/api/send-shipping-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber: o.orderNumber || o.id,
              clientName: o.customer.fullName || 'Valued Client',
              email: o.customer.email,
              trackingNumber: tracking || o.trackingNumber,
              courier: dispatchCourier || o.courier || 'Royal Mail Special Delivery',
              items: o.items || []
            })
          })
            .then(res => res.json())
            .then(data => console.log('[House of Nina] Dispatch email status:', data))
            .catch(err => console.warn('[House of Nina] Dispatch email error:', err));
        }

        return {
          ...o,
          status: nextStatus,
          trackingNumber: tracking || o.trackingNumber,
          courier: dispatchCourier || o.courier
        };
      }
      return o;
    }));
    setOpenKebabId(null);
    setIsDispatchModalOpen(false);
    triggerToast(targetStatus === 'shipped' ? `Order marked as shipped & tracking email sent!` : `Order updated to: ${targetStatus || 'advanced'}`);
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm(`Delete order ${orderId}?`)) {
      setOrders(orders.filter(o => o.id !== orderId));
      triggerToast(`Order ${orderId} deleted`);
    }
    setOpenKebabId(null);
  };

  const handleSaveOrderEdit = (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
    triggerToast(`Order ${editingOrder.orderNumber} updated`);
  };

  // ══════════════════════════════════════════════════════════
  // CATEGORIES CRUD
  // ══════════════════════════════════════════════════════════
  const handleCreateCategory = (e) => {
    e.preventDefault();
    const clean = categoryInputName.trim();
    if (!clean) return;
    if (categories.includes(clean)) {
      alert('Category already exists.');
      return;
    }
    setCategories([...categories, clean]);
    setCategoryInputName('');
    setIsAddCategoryOpen(false);
    triggerToast(`✓ Category "${clean}" added`);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const clean = categoryInputName.trim();
    if (!clean || !editingCategory) return;
    setCategories(categories.map(c => c === editingCategory ? clean : c));
    // Also update any products using this category
    setProducts(products.map(p => p.categoryName === editingCategory ? { ...p, categoryName: clean } : p));
    setEditingCategory(null);
    setCategoryInputName('');
    triggerToast(`✓ Category renamed to "${clean}"`);
  };

  const handleDeleteCategory = (catName) => {
    if (confirm(`Delete category "${catName}"?`)) {
      setCategories(categories.filter(c => c !== catName));
      triggerToast(`Category "${catName}" deleted`);
    }
  };

  // ══════════════════════════════════════════════════════════
  // PRODUCTS CRUD
  // ══════════════════════════════════════════════════════════
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Product name and price required.');
      return;
    }
    const created = {
      id: `hn-${Date.now()}`,
      name: productForm.name,
      categoryName: productForm.categoryName || categories[0] || 'Wigs',
      price: parseFloat(productForm.price) || 200,
      stockCount: parseInt(productForm.stockCount) || 10,
      inStock: true,
      image: productForm.image || 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp',
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts([created, ...products]);
    setIsAddProductOpen(false);
    setProductForm({ name: '', categoryName: categories[0] || 'Wigs', price: '', stockCount: 10, image: '' });
    triggerToast(`✓ "${created.name}" created`);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    triggerToast(`✓ "${editingProduct.name}" updated`);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      triggerToast('Product deleted');
    }
    setOpenKebabId(null);
  };

  const handleStockChange = (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const next = Math.max(0, (p.stockCount || 0) + delta);
        return { ...p, stockCount: next, inStock: next > 0 };
      }
      return p;
    }));
  };

  const handleToggleStockStatus = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const next = !p.inStock;
        return { ...p, inStock: next, stockCount: next && p.stockCount === 0 ? 5 : p.stockCount };
      }
      return p;
    }));
  };

  // ══════════════════════════════════════════════════════════
  // DISCOUNTS CRUD (Controls dynamic site cart promo field!)
  // ══════════════════════════════════════════════════════════
  const handleCreateDiscount = (e) => {
    e.preventDefault();
    if (!discountForm.code) {
      alert('Discount code required.');
      return;
    }
    const created = {
      id: `disc-${Date.now()}`,
      code: discountForm.code.toUpperCase().trim(),
      type: discountForm.type,
      value: parseFloat(discountForm.value) || 10,
      minSpend: parseFloat(discountForm.minSpend) || 0,
      usageCount: 0,
      maxUses: parseInt(discountForm.maxUses) || 100,
      status: 'active',
      expiresAt: discountForm.expiresAt
    };
    setDiscounts([created, ...discounts]);
    setIsAddDiscountOpen(false);
    setDiscountForm({ code: '', type: 'percentage', value: 10, minSpend: 100, maxUses: 100, expiresAt: '2026-12-31' });
    triggerToast(`✓ Code "${created.code}" created (now active on live site)`);
  };

  const handleUpdateDiscount = (e) => {
    e.preventDefault();
    if (!editingDiscount) return;
    setDiscounts(discounts.map(d => d.id === editingDiscount.id ? editingDiscount : d));
    setEditingDiscount(null);
    triggerToast(`✓ Code "${editingDiscount.code}" updated`);
  };

  const handleToggleDiscountStatus = (id) => {
    setDiscounts(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'paused' : 'active' } : d));
  };

  const handleDeleteDiscount = (id) => {
    if (confirm('Delete this discount code?')) {
      setDiscounts(prev => prev.filter(d => d.id !== id));
      triggerToast('Discount code deleted');
    }
  };

  // ══════════════════════════════════════════════════════════
  // REVIEWS CRUD
  // ══════════════════════════════════════════════════════════
  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!reviewForm.client.trim() || !reviewForm.text.trim()) {
      triggerToast('Please provide a client name and feedback');
      return;
    }
    const created = {
      id: `rev-${Date.now()}`,
      client: reviewForm.client.trim(),
      productName: reviewForm.productName.trim() || 'Signature Unit',
      rating: Number(reviewForm.rating) || 5,
      date: reviewForm.date || todayDate,
      text: reviewForm.text.trim(),
      status: reviewForm.status || 'featured'
    };
    setReviews([created, ...reviews]);
    setIsAddReviewOpen(false);
    setReviewForm({
      client: '',
      productName: products[0]?.name || 'The Victoria Glass Bob',
      rating: 5,
      date: todayDate,
      text: '',
      status: 'featured'
    });
    triggerToast('✓ Client review created');
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    if (!editingReview) return;
    setReviews(reviews.map(r => r.id === editingReview.id ? editingReview : r));
    setEditingReview(null);
    triggerToast('✓ Review updated');
  };

  // ══════════════════════════════════════════════════════════
  // SHIPPING RATES CRUD
  // ══════════════════════════════════════════════════════════
  const handleCreateShippingRate = (e) => {
    e.preventDefault();
    if (!shippingRateForm.name.trim()) {
      triggerToast('Please provide a courier service name');
      return;
    }
    const created = {
      id: `ship-${Date.now()}`,
      name: shippingRateForm.name.trim(),
      price: parseFloat(shippingRateForm.price) || 0,
      estimatedDays: shippingRateForm.estimatedDays.trim() || '2 - 3 business days',
      status: shippingRateForm.status || 'active'
    };
    setShippingRates([...shippingRates, created]);
    setIsAddShippingRateOpen(false);
    setShippingRateForm({
      name: '',
      price: '',
      estimatedDays: '2 - 3 business days',
      status: 'active'
    });
    triggerToast(`✓ Shipping rate "${created.name}" created`);
  };

  const handleUpdateShippingRate = (e) => {
    e.preventDefault();
    if (!editingShippingRate) return;
    setShippingRates(shippingRates.map(s => s.id === editingShippingRate.id ? editingShippingRate : s));
    setEditingShippingRate(null);
    triggerToast(`✓ Shipping rate "${editingShippingRate.name}" updated`);
  };

  const handleDeleteShippingRate = (id) => {
    if (confirm('Delete this shipping rate option?')) {
      setShippingRates(shippingRates.filter(s => s.id !== id));
      triggerToast('Shipping rate deleted');
    }
  };

  const handleToggleShippingRateStatus = (id) => {
    setShippingRates(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s));
  };

  // ══════════════════════════════════════════════════════════
  // RESTOCK SUBSCRIBERS CRUD
  // ══════════════════════════════════════════════════════════
  const handleCreateSubscriber = (e) => {
    e.preventDefault();
    if (!subscriberForm.name.trim() || !subscriberForm.email.trim()) {
      triggerToast('Subscriber name and email are required');
      return;
    }
    const created = {
      id: `sub-${Date.now()}`,
      name: subscriberForm.name.trim(),
      email: subscriberForm.email.trim(),
      type: subscriberForm.type || 'VIP Restock Drop',
      date: subscriberForm.date || todayDate
    };
    setSubscribers([created, ...subscribers]);
    setIsAddSubscriberOpen(false);
    setSubscriberForm({
      name: '',
      email: '',
      type: 'VIP Restock Drop',
      date: todayDate
    });
    triggerToast(`✓ Subscriber "${created.name}" added to waitlist`);
  };

  const handleUpdateSubscriber = (e) => {
    e.preventDefault();
    if (!editingSubscriber) return;
    setSubscribers(subscribers.map(s => s.id === editingSubscriber.id ? editingSubscriber : s));
    setEditingSubscriber(null);
    triggerToast(`✓ Subscriber "${editingSubscriber.name}" updated`);
  };

  const handleDeleteSubscriber = (id) => {
    if (confirm('Remove this subscriber from waitlist?')) {
      setSubscribers(subscribers.filter(s => s.id !== id));
      triggerToast('Subscriber removed from waitlist');
    }
  };

  // Filtered views
  const filteredOrders = orders.filter(o => {
    if (ordersStatusFilter !== 'all' && o.status !== ordersStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        o.customer.postalCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredProducts = products.filter(p => {
    if (productsCategoryFilter !== 'all' && p.categoryName !== productsCategoryFilter) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredReviews = reviews.filter(r => {
    if (reviewStatusFilter === 'pending' && r.status !== 'pending' && r.status !== 'awaiting_approval') return false;
    if (reviewStatusFilter === 'featured' && r.status !== 'featured') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (r.client || '').toLowerCase().includes(q) ||
        (r.text || '').toLowerCase().includes(q) ||
        (r.productName || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="adminPortalRoot">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="adminToast">
          <CheckCircle2 size={16} color="var(--color-accent)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP NAVIGATION (SAME AS LIVE SITE HEADER - MINUS CART & SAVED)
          ══════════════════════════════════════════════════════════ */}
      <div className="adminTopStickyWrapper">
        {/* Navbar */}
        <header className="adminNavbar">
          <div className="adminNavOuterContainer">
            <div className="adminNavPillWrapper">
              {/* Brand Wordmark (Authentic Alex Brush font matching live site header) */}
              <a
                href="#"
                className="adminBrandWordmark brand-wordmark"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSwitchToStorefront) onSwitchToStorefront();
                  else onClose();
                }}
                title="House of Nina"
                aria-label="House of Nina"
                style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
              >
                House of Nina
              </a>

              {/* Desktop Center Links (Dashboard, Orders, Products, Categories, Discounts, Reviews, Restock, Settings) */}
              <nav className="adminDesktopNavLinks" aria-label="Admin Navigation">
                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Orders
                  {ordersRequiringAction > 0 && (
                    <span className="adminNavCountBadge">{ordersRequiringAction}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  Products
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveTab('categories')}
                >
                  Categories
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'discounts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('discounts')}
                >
                  Discounts
                  {activeDiscountsCount > 0 && (
                    <span className="adminNavCountBadge" style={{ backgroundColor: '#2E7D32' }}>{activeDiscountsCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                  {pendingReviewsCount > 0 && (
                    <span className="adminNavCountBadge" style={{ backgroundColor: '#D97706' }}>
                      {pendingReviewsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'subscribers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscribers')}
                >
                  Restock
                </button>

                <button
                  type="button"
                  className={`adminNavLinkBtn ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </nav>

              {/* Nav Actions: Mobile Hamburger on mobile */}
              <div className="adminNavActions">
                {/* Mobile Hamburger Button with Gold Background and White Icon */}
                <button
                  type="button"
                  className="adminMobileMenuBtn"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open Navigation Menu"
                >
                  <Menu size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE DRAWER NAVIGATION
          ══════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════
          MOBILE DRAWER NAVIGATION (MIMICKING LIVE SITE FLOATING DRAWER)
          ══════════════════════════════════════════════════════════ */}
      <div 
        className={`adminMobileDrawerOverlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside 
        className={`adminMobileDrawer ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div>
          <div className="adminMobileDrawerHeader">
            <span style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive", fontSize: '26px', color: 'var(--color-primary)' }}>
              House of Nina
            </span>
            <button 
              type="button" 
              className="adminDrawerCloseBtn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          <div className="adminMobileDrawerLinks">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: ordersRequiringAction },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'categories', label: 'Categories', icon: Layers },
              { id: 'discounts', label: 'Discounts', icon: Tag, badge: activeDiscountsCount },
              { id: 'reviews', label: 'Reviews', icon: Star, badge: pendingReviewsCount },
              { id: 'subscribers', label: 'Restock Alerts', icon: BellRing },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`adminMobileDrawerLink ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon size={18} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="adminNavCountBadge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="adminMobileDrawerFooter">
          <button
            type="button"
            className="adminReturnSiteBtn"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onSwitchToStorefront) onSwitchToStorefront();
              else onClose();
            }}
          >
            <Store size={15} />
            <span>Return to Live Site</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════
          MAIN CANVAS WORKSPACE
          ══════════════════════════════════════════════════════════ */}
      <div className="adminMainCanvas">
        <div className="adminContentCard">

          {/* ══════════════ TAB 1: DASHBOARD ══════════════ */}
          {activeTab === 'dashboard' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Hi, Nina,</h1>
                  <p className="pageSubtitle">Today's store activity.</p>
                </div>
                <div className="pageHeaderActions">
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* 4 Visibly Coloured Stats Cards (Terracotta, Dusty Rose, Sage Green, Warm Champagne) */}
              <div className="statsGrid">
                <div className="statCard statCardTerracotta">
                  <div className="statHeader">
                    <div className="statIconWrap">
                      <TrendingUp size={15} strokeWidth={2.2} />
                    </div>
                    <div className="statTitle">Total Revenue</div>
                  </div>
                  <div className="statValue" style={{ fontSize: '1.75rem' }}>
                    £{stats.totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="statTrend">
                    {stats.paidOrdersCount} delivered orders
                  </div>
                </div>

                <div className="statCard statCardRose">
                  <div className="statHeader">
                    <div className="statIconWrap">
                      <ShoppingBag size={15} strokeWidth={2.2} />
                    </div>
                    <div className="statTitle">Orders to Fulfill</div>
                  </div>
                  <div className="statValue">{stats.ordersRequiringAction}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('orders')} 
                    className="statLink"
                  >
                    View orders →
                  </button>
                </div>

                <div className="statCard statCardSage">
                  <div className="statHeader">
                    <div className="statIconWrap">
                      <Package size={15} strokeWidth={2.2} />
                    </div>
                    <div className="statTitle">Catalog Products</div>
                  </div>
                  <div className="statValue">{stats.totalProducts}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('products')} 
                    className="statLink"
                  >
                    Manage inventory →
                  </button>
                </div>

                <div className="statCard statCardBlue">
                  <div className="statHeader">
                    <div className="statIconWrap">
                      <Tag size={15} strokeWidth={2.2} />
                    </div>
                    <div className="statTitle">Active Discounts</div>
                  </div>
                  <div className="statValue">{stats.activeDiscountsCount}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('discounts')} 
                    className="statLink"
                  >
                    Manage codes →
                  </button>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>Recent Orders</h2>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('orders')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  View all ({orders.length}) →
                </button>
              </div>

              <div className="tableContainer adminDesktopTableView">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Lifeline Status</th>
                      <th>Total</th>
                      <th style={{ textAlign: 'right' }}>Advance Lifeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id}>
                        <td>
                          <strong>{o.orderNumber}</strong>
                        </td>
                        <td>{o.customer.fullName}</td>
                        <td>
                          <span className={`badge ${o.status}`}>
                            {o.status === 'delivered' ? 'Delivered' : o.status}
                          </span>
                        </td>
                        <td><strong>£{Number(o.total).toFixed(2)}</strong></td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                            {/* Secondary: View */}
                            <button
                              type="button"
                              className="btnSecondary"
                              onClick={() => setViewOrderDetails(o)}
                              aria-label={`View details for order ${o.orderNumber}`}
                              style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                            >
                              <Eye size={12} />
                              <span>View</span>
                            </button>

                            {/* Primary: Lifeline action for active orders */}
                            {o.status === 'confirmed' && (
                              <button
                                type="button"
                                className="btnPrimary"
                                onClick={() => handleAdvanceLifeline(o.id, 'processing')}
                                style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                aria-label={`Advance order ${o.orderNumber} to processing`}
                              >
                                Process
                              </button>
                            )}
                            {o.status === 'processing' && (
                              <button
                                type="button"
                                className="btnPrimary"
                                onClick={() => {
                                  setDispatchOrderTarget(o);
                                  setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                                  setIsDispatchModalOpen(true);
                                }}
                                style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                aria-label={`Ship order ${o.orderNumber}`}
                              >
                                Ship
                              </button>
                            )}
                            {o.status === 'shipped' && (
                              <button
                                type="button"
                                className="btnPrimary"
                                onClick={() => handleAdvanceLifeline(o.id, 'delivered')}
                                style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                aria-label={`Mark order ${o.orderNumber} as delivered`}
                              >
                                Deliver
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Recent Orders Stacked Cards */}
              <div className="adminMobileCardView" role="region" aria-label="Recent orders">
                {orders.slice(0, 4).map(o => (
                  <div key={`recent-m-${o.id}`} className="adminMobileCard">
                    <div className="adminMobileCardHeader">
                      <div>
                        <div className="adminCardOrderNumber">{o.orderNumber}</div>
                        <div className="adminCardDate">
                          {new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <span className={`badge ${o.status}`}>
                            {o.status === 'delivered' ? 'Delivered' : o.status}
                          </span>
                    </div>

                    <div className="adminMobileCardBody">
                      <div className="adminCardCustomerRow">
                        <span className="adminCardCustomerName">{o.customer.fullName}</span>
                      </div>
                    </div>

                    <div className="adminMobileCardFooter">
                      <div className="adminCardTotalSection">
                        <span className="adminCardTotalLabel">Total</span>
                        <span className="adminCardTotalValue">£{Number(o.total).toFixed(2)}</span>
                      </div>

                      <div className="adminCardActionGroup">
                        {/* Secondary: View */}
                        <button
                          type="button"
                          className="btnSecondary adminCardActionBtn"
                          title="View Order Details"
                          aria-label={`View details for order ${o.orderNumber}`}
                          onClick={() => setViewOrderDetails(o)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        {/* Primary: Lifeline action for active orders */}
                        {o.status === 'confirmed' && (
                          <button
                            type="button"
                            className="btnPrimary adminCardActionBtn"
                            onClick={() => handleAdvanceLifeline(o.id, 'processing')}
                            aria-label={`Process order ${o.orderNumber}`}
                          >
                            Process
                          </button>
                        )}
                        {o.status === 'processing' && (
                          <button
                            type="button"
                            className="btnPrimary adminCardActionBtn"
                            onClick={() => {
                              setDispatchOrderTarget(o);
                              setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                              setIsDispatchModalOpen(true);
                            }}
                            aria-label={`Ship order ${o.orderNumber}`}
                          >
                            Ship
                          </button>
                        )}
                        {o.status === 'shipped' && (
                          <button
                            type="button"
                            className="btnPrimary adminCardActionBtn"
                            onClick={() => handleAdvanceLifeline(o.id, 'delivered')}
                            aria-label={`Deliver order ${o.orderNumber}`}
                          >
                            Deliver
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══════════════ TAB 2: ORDERS              </div>
            </>
          )}

          {/* ══════════════ TAB 2: ORDERS (CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED) ══════════════ */}
          {activeTab === 'orders' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Orders</h1>
                  <p className="pageSubtitle">Lifeline: Confirmed → Processing → Shipped → Delivered.</p>
                </div>
              </div>

              {/* Order Lifeline Tabs */}
              <div className="toolbar">
                <ScrollableTabs>
                  {[
                    { id: 'all', label: 'All Orders', mobileLabel: `All (${orders.length})` },
                    { id: 'confirmed', label: 'Confirmed', mobileLabel: 'Confirmed' },
                    { id: 'processing', label: 'Processing', mobileLabel: 'Processing' },
                    { id: 'shipped', label: 'Shipped', mobileLabel: 'Shipped' },
                    { id: 'delivered', label: 'Delivered', mobileLabel: 'Delivered' },
                    { id: 'abandoned', label: `Abandoned (${orders.filter(o => o.status === 'abandoned').length})`, mobileLabel: `Abandoned (${orders.filter(o => o.status === 'abandoned').length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`tabBtn ${ordersStatusFilter === tab.id ? 'active' : ''}`}
                      onClick={() => setOrdersStatusFilter(tab.id)}
                    >
                      <span className="desktopTabLabel">{tab.label}</span>
                      <span className="mobileTabLabel">{tab.mobileLabel}</span>
                    </button>
                  ))}
                </ScrollableTabs>

                <div className="searchBar">
                  <Search size={15} color="var(--color-text-secondary)" />
                  <input
                    type="text"
                    className="searchInput"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="emptyStateCard">
                  <ShoppingBag size={32} color="var(--color-text-tertiary)" />
                  <div className="emptyStateTitle">No orders found</div>
                  <p className="emptyStateSubtitle">No client orders match this status or search filter.</p>
                  <button 
                    type="button" 
                    className="btnPrimary" 
                    onClick={() => { setOrdersStatusFilter('all'); setSearchQuery(''); }}
                  >
                    Show All Orders
                  </button>
                </div>
              ) : (
                <>
                  <div className="tableContainer adminDesktopTableView">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Lifeline Status</th>
                          <th>Tracking</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order, idx) => (
                          <tr key={order.id}>
                            <td>
                              <strong>{order.orderNumber}</strong>
                              <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                                {new Date(order.createdAt).toLocaleDateString('en-GB')}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{order.customer.fullName}</div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)' }}>
                                {order.customer.city}, {order.customer.postalCode}
                              </div>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.82rem' }}>
                                {order.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                              </div>
                            </td>
                            <td>
                              <strong style={{ fontSize: '0.92rem' }}>£{Number(order.total).toFixed(2)}</strong>
                            </td>
                            <td>
                              <span className={`badge ${order.status}`}>
                                {order.status === 'delivered' ? 'Delivered' : order.status}
                              </span>
                            </td>
                            <td>
                              {order.trackingNumber ? (
                                <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 600 }}>
                                  {order.trackingNumber}
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.76rem', color: 'var(--color-text-tertiary)' }}>
                                  —
                                </span>
                              )}
                            </td>
                            <td style={{ textAlign: 'right', position: 'relative' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                {/* Secondary: View Order Details & Slip */}
                                <button
                                  type="button"
                                  className="btnSecondary"
                                  onClick={() => setViewOrderDetails(order)}
                                  aria-label={`View details and slip for order ${order.orderNumber}`}
                                  style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                >
                                  <Eye size={12} />
                                  <span>View</span>
                                </button>

                                {/* Primary: 1-Click Lifeline Advance Action */}
                                {order.status === 'confirmed' && (
                                  <button
                                    type="button"
                                    className="btnPrimary"
                                    onClick={() => handleAdvanceLifeline(order.id, 'processing')}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                    aria-label={`Advance order ${order.orderNumber} to processing`}
                                  >
                                    Process
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button
                                    type="button"
                                    className="btnPrimary"
                                    onClick={() => {
                                      setDispatchOrderTarget(order);
                                      setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                                      setIsDispatchModalOpen(true);
                                    }}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                    aria-label={`Ship order ${order.orderNumber}`}
                                  >
                                    Ship
                                  </button>
                                )}
                                {order.status === 'shipped' && (
                                  <button
                                    type="button"
                                    className="btnPrimary"
                                    onClick={() => handleAdvanceLifeline(order.id, 'delivered')}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                    aria-label={`Mark order ${order.orderNumber} as delivered`}
                                  >
                                    Deliver
                                  </button>
                                )}
                                {order.status === 'abandoned' && (
                                  <button
                                    type="button"
                                    className="btnPrimary"
                                    onClick={() => handleOpenRecoveryModal(order)}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', background: '#D99A83', borderColor: '#C4836B', color: '#16110F', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                    aria-label={`Recover abandoned bag for order ${order.orderNumber}`}
                                  >
                                    <RotateCcw size={12} strokeWidth={2.4} />
                                    <span>Recover</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="kebabTriggerBtn"
                                  title="Order Actions"
                                  aria-label={`Order actions for ${order.orderNumber}`}
                                  onClick={(e) => toggleKebab(e, order.id, idx >= Math.max(0, filteredOrders.length - 2))}
                                >
                                  <MoreVertical size={16} />
                                </button>
                              </div>

                              {openKebabId === order.id && kebabCoords && createPortal(
                                <div
                                  className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                  style={{
                                    position: 'fixed',
                                    top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                    bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                    right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                    left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                    zIndex: 999999
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setViewOrderDetails(order);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Eye size={14} />
                                    <span>Lifeline &amp; Slip</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setEditingOrder({ ...order, customer: { ...order.customer } });
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Edit2 size={14} />
                                    <span>Edit Order Details</span>
                                  </button>
                                  {order.status === 'confirmed' && (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        handleAdvanceLifeline(order.id, 'processing');
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Clock size={14} />
                                      <span>Advance to Processing</span>
                                    </button>
                                  )}
                                  {order.status === 'processing' && (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        setDispatchOrderTarget(order);
                                        setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                                        setIsDispatchModalOpen(true);
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Truck size={14} />
                                      <span>Ship Order (Tracking)</span>
                                    </button>
                                  )}
                                  {order.status === 'shipped' && (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        handleAdvanceLifeline(order.id, 'delivered');
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <CheckCircle2 size={14} />
                                      <span>Mark as Delivered</span>
                                    </button>
                                  )}
                                  {order.status === 'abandoned' && (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                        handleOpenRecoveryModal(order);
                                      }}
                                    >
                                      <RotateCcw size={14} />
                                      <span>Recover Abandoned Bag</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="kebabItem kebabDelete"
                                    onClick={() => {
                                      handleDeleteOrder(order.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete Order</span>
                                  </button>
                                </div>,
                                document.body
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stacked Card View (<= 768px) */}
                  <div className="adminMobileCardView" role="region" aria-label="Orders list">
                    {filteredOrders.map((order, idx) => (
                      <div key={`m-${order.id}`} className="adminMobileCard">
                        {/* Header: Order Number, Date, Status */}
                        <div className="adminMobileCardHeader">
                          <div>
                            <div className="adminCardOrderNumber">{order.orderNumber}</div>
                            <div className="adminCardDate">
                              {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                          <span className={`badge ${order.status}`}>
                                {order.status === 'delivered' ? 'Delivered' : order.status}
                              </span>
                        </div>

                        {/* Customer & Items */}
                        <div className="adminMobileCardBody">
                          <div className="adminCardCustomerRow">
                            <span className="adminCardCustomerName">{order.customer.fullName}</span>
                            <span className="adminCardCustomerLocation">{order.customer.city}, {order.customer.postalCode}</span>
                          </div>
                          <div className="adminCardItems">
                            {order.items.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                          </div>
                          {order.trackingNumber && (
                            <div className="adminCardTracking">
                              <span>Tracking:</span>
                              <code>{order.trackingNumber}</code>
                            </div>
                          )}
                        </div>

                        {/* Footer: Total & Prioritised Next Action */}
                        <div className="adminMobileCardFooter">
                          <div className="adminCardTotalSection">
                            <span className="adminCardTotalLabel">Total</span>
                            <span className="adminCardTotalValue">£{Number(order.total).toFixed(2)}</span>
                          </div>

                          <div className="adminCardActionGroup">
                            {/* Secondary: View details and slip */}
                            <button
                              type="button"
                              className="btnSecondary adminCardActionBtn"
                              title="Lifeline & Slip"
                              aria-label={`View details and slip for order ${order.orderNumber}`}
                              onClick={() => setViewOrderDetails(order)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Eye size={13} />
                              <span>View</span>
                            </button>

                            {/* Primary: Next lifeline step (when applicable) */}
                            {order.status === 'confirmed' && (
                              <button
                                type="button"
                                className="btnPrimary adminCardActionBtn"
                                onClick={() => handleAdvanceLifeline(order.id, 'processing')}
                                aria-label={`Advance order ${order.orderNumber} to processing`}
                              >
                                Process
                              </button>
                            )}
                            {order.status === 'processing' && (
                              <button
                                type="button"
                                className="btnPrimary adminCardActionBtn"
                                onClick={() => {
                                  setDispatchOrderTarget(order);
                                  setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                                  setIsDispatchModalOpen(true);
                                }}
                                aria-label={`Ship order ${order.orderNumber}`}
                              >
                                Ship
                              </button>
                            )}
                            {order.status === 'shipped' && (
                              <button
                                type="button"
                                className="btnPrimary adminCardActionBtn"
                                onClick={() => handleAdvanceLifeline(order.id, 'delivered')}
                                aria-label={`Mark order ${order.orderNumber} as delivered`}
                              >
                                Deliver
                              </button>
                            )}
                            {order.status === 'abandoned' && (
                              <button
                                type="button"
                                className="btnPrimary adminCardActionBtn"
                                onClick={() => handleOpenRecoveryModal(order)}
                                style={{ background: '#D99A83', borderColor: '#C4836B', color: '#16110F', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                aria-label={`Recover abandoned bag for order ${order.orderNumber}`}
                              >
                                <RotateCcw size={12} strokeWidth={2.4} />
                                <span>Recover</span>
                              </button>
                            )}

                            {/* More Actions Menu */}
                            <button
                              type="button"
                              className="kebabTriggerBtn adminCardKebabBtn"
                              title="More Actions"
                              aria-label={`More actions for order ${order.orderNumber}`}
                              onClick={(e) => toggleKebab(e, order.id, idx >= Math.max(0, filteredOrders.length - 2))}
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ══════════════ TAB 3: PRODUCTS (FULL CRUD) ══════════════ */}
          {activeTab === 'products' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Products</h1>
                  <p className="pageSubtitle">Create, edit, restock, or remove catalog hair units.</p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      setProductForm({ name: '', categoryName: categories[0] || 'Wigs', price: '', stockCount: 10, image: '' });
                      setIsAddProductOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Product Performance Analytics Cards */}
              <div className="productPerformanceGrid" role="region" aria-label="Product performance overview">
                {/* 1. Most Viewed: Soft dusty rose #E8C5C3 */}
                <div className="perfCard perfCardRose">
                  <div className="perfCardTop">
                    <div className="perfIconContainer" aria-hidden="true">
                      <Eye size={14} strokeWidth={2.4} />
                    </div>
                    <span className="perfCardBadge">Most Viewed</span>
                  </div>
                  <div className="perfCardContent">
                    <img 
                      src={mostViewedProduct.image} 
                      alt={mostViewedProduct.name} 
                      className="perfThumbnail" 
                      loading="lazy"
                    />
                    <div className="perfInfo">
                      <div className="perfProductName" title={mostViewedProduct.name}>
                        {mostViewedProduct.name}
                      </div>
                      <div className="perfMetric">
                        <strong>1,840</strong> <span>views</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Most Purchased: Muted terracotta #D99A83 */}
                <div className="perfCard perfCardTerracotta">
                  <div className="perfCardTop">
                    <div className="perfIconContainer" aria-hidden="true">
                      <TrendingUp size={14} strokeWidth={2.4} />
                    </div>
                    <span className="perfCardBadge">Most Purchased</span>
                  </div>
                  <div className="perfCardContent">
                    <img 
                      src={mostPurchasedProduct.image} 
                      alt={mostPurchasedProduct.name} 
                      className="perfThumbnail" 
                      loading="lazy"
                    />
                    <div className="perfInfo">
                      <div className="perfProductName" title={mostPurchasedProduct.name}>
                        {mostPurchasedProduct.name}
                      </div>
                      <div className="perfMetric">
                        <strong>{mostPurchasedUnits} sold</strong> • <span>£{mostPurchasedRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Least Purchased: Muted sage green #C7D5B5 */}
                <div className="perfCard perfCardSage">
                  <div className="perfCardTop">
                    <div className="perfIconContainer" aria-hidden="true">
                      <Package size={14} strokeWidth={2.4} />
                    </div>
                    <span className="perfCardBadge">Least Purchased</span>
                  </div>
                  <div className="perfCardContent">
                    <img 
                      src={leastPurchasedProduct.image} 
                      alt={leastPurchasedProduct.name} 
                      className="perfThumbnail" 
                      loading="lazy"
                    />
                    <div className="perfInfo">
                      <div className="perfProductName" title={leastPurchasedProduct.name}>
                        {leastPurchasedProduct.name}
                      </div>
                      <div className="perfMetric">
                        <strong>{leastPurchasedUnits} sold</strong> • <span>Needs Promo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="toolbar">
                <div className="tabs productCategoryTabs">
                  <button
                    type="button"
                    className={`tabBtn ${productsCategoryFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setProductsCategoryFilter('all')}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`tabBtn ${productsCategoryFilter === cat ? 'active' : ''}`}
                      onClick={() => setProductsCategoryFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="searchBar">
                  <Search size={15} color="var(--color-text-secondary)" />
                  <input
                    type="text"
                    className="searchInput"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="emptyStateCard">
                  <Package size={32} color="var(--color-text-tertiary)" />
                  <div className="emptyStateTitle">No products found</div>
                  <p className="emptyStateSubtitle">Try selecting a different category or clearing your search.</p>
                  <button 
                    type="button" 
                    className="btnPrimary" 
                    onClick={() => { setProductsCategoryFilter('all'); setSearchQuery(''); }}
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <>
                  <div className="tableContainer adminDesktopTableView">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((prod, idx) => (
                          <tr key={prod.id}>
                            <td>
                              <div className="productCell">
                                <img src={prod.image} alt={prod.name} className="productImg" />
                                <div>
                                  <div className="productName">{prod.name}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>ID: {prod.id}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>
                              {prod.categoryName}
                            </td>
                            <td>
                              <strong style={{ fontSize: '0.92rem' }}>£{Number(prod.price).toFixed(2)}</strong>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <button 
                                  type="button" 
                                  className="actionBtn" 
                                  onClick={() => handleStockChange(prod.id, -1)}
                                  style={{ width: '26px', height: '26px' }}
                                  aria-label={`Decrease stock for ${prod.name}`}
                                >
                                  -
                                </button>
                                <span style={{ fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
                                  {prod.stockCount}
                                </span>
                                <button 
                                  type="button" 
                                  className="actionBtn" 
                                  onClick={() => handleStockChange(prod.id, 1)}
                                  style={{ width: '26px', height: '26px' }}
                                  aria-label={`Increase stock for ${prod.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              <span 
                                className={`badge ${prod.inStock && prod.stockCount > 0 ? 'inStock' : 'outOfStock'}`}
                                onClick={() => handleToggleStockStatus(prod.id)}
                                style={{ cursor: 'pointer' }}
                                title="Click to toggle status"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleStockStatus(prod.id); } }}
                                aria-label={`Product is ${prod.inStock && prod.stockCount > 0 ? 'in stock' : 'out of stock'}. Click to toggle.`}
                              >
                                {prod.inStock && prod.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', position: 'relative' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                {/* Secondary: Edit Product */}
                                <button
                                  type="button"
                                  className="btnSecondary"
                                  onClick={() => setEditingProduct({ ...prod })}
                                  aria-label={`Edit ${prod.name}`}
                                  style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                >
                                  <Edit2 size={12} />
                                  <span>Edit</span>
                                </button>
                                {/* Primary: Notify Drop */}
                                <button
                                  type="button"
                                  className="btnPrimary"
                                  onClick={() => handleTriggerRestockDrop(prod)}
                                  title={`Notify VIP waitlist of restock drop for ${prod.name}`}
                                  style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                  aria-label={`Dispatch restock notification for ${prod.name}`}
                                >
                                  <BellRing size={12} />
                                  <span>Notify Drop</span>
                                </button>
                                <button
                                  type="button"
                                  className="kebabTriggerBtn"
                                  title="Product Actions"
                                  aria-label={`Product actions for ${prod.name}`}
                                  onClick={(e) => toggleKebab(e, `prod-${prod.id}`, idx >= Math.max(0, filteredProducts.length - 2))}
                                >
                                  <MoreVertical size={16} />
                                </button>
                              </div>

                              {openKebabId === `prod-${prod.id}` && kebabCoords && createPortal(
                                <div
                                  className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                  style={{
                                    position: 'fixed',
                                    top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                    bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                    right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                    left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                    zIndex: 999999
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setEditingProduct({ ...prod });
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Edit2 size={14} />
                                    <span>Edit Product</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      handleToggleStockStatus(prod.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Package size={14} />
                                    <span>{prod.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                      handleTriggerRestockDrop(prod);
                                    }}
                                  >
                                    <BellRing size={14} />
                                    <span>Dispatch VIP Restock Alert</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem kebabDelete"
                                    onClick={() => {
                                      handleDeleteProduct(prod.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete Product</span>
                                  </button>
                                </div>,
                                document.body
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stacked Card View (<= 768px) */}
                  <div className="adminMobileCardView" role="region" aria-label="Products list">
                    {filteredProducts.map((prod, idx) => (
                      <div key={`m-prod-${prod.id}`} className="adminMobileCard">
                        {/* Top: Image, Name, SKU/ID, Category, Price */}
                        <div className="adminProductCardTop">
                          <img src={prod.image} alt={prod.name} className="adminProductCardImg" />
                          <div className="adminProductCardMainInfo">
                            <div className="adminProductCardName">{prod.name}</div>
                            <div className="adminProductCardMeta">
                              <span className="adminProductCardId">ID: {prod.id}</span>
                              <span className="adminProductCardCategory">• {prod.categoryName}</span>
                            </div>
                            <div className="adminProductCardPrice">
                              £{Number(prod.price).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Middle: Stock Controls & Availability */}
                        <div className="adminProductCardControlsRow">
                          <div className="adminStockControlGroup">
                            <span className="adminStockLabel">Stock:</span>
                            <div className="adminStockStepper">
                              <button
                                type="button"
                                className="actionBtn adminStockStepBtn"
                                onClick={() => handleStockChange(prod.id, -1)}
                                aria-label={`Decrease stock for ${prod.name}`}
                              >
                                -
                              </button>
                              <span className="adminStockNumber" aria-live="polite">
                                {prod.stockCount}
                              </span>
                              <button
                                type="button"
                                className="actionBtn adminStockStepBtn"
                                onClick={() => handleStockChange(prod.id, 1)}
                                aria-label={`Increase stock for ${prod.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <span 
                            className={`badge ${prod.inStock && prod.stockCount > 0 ? 'inStock' : 'outOfStock'}`}
                            onClick={() => handleToggleStockStatus(prod.id)}
                            style={{ cursor: 'pointer' }}
                            title="Click to toggle status"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleStockStatus(prod.id); } }}
                            aria-label={`Product is ${prod.inStock && prod.stockCount > 0 ? 'in stock' : 'out of stock'}. Click to toggle.`}
                          >
                            {prod.inStock && prod.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        {/* Bottom: Edit action (Prioritised) & More Menu */}
                        <div className="adminMobileCardFooter adminDiscountCardFooter">
                          <button
                            type="button"
                            className="btnSecondary adminDiscountBtn"
                            onClick={() => setEditingProduct({ ...prod })}
                            aria-label={`Edit ${prod.name}`}
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="btnPrimary adminDiscountBtn"
                            onClick={() => handleTriggerRestockDrop(prod)}
                            title="Dispatch VIP restock drop notification"
                            aria-label={`Dispatch VIP restock drop alert for ${prod.name}`}
                          >
                            <BellRing size={13} />
                            <span>Notify Drop</span>
                          </button>

                          <button
                            type="button"
                            className="kebabTriggerBtn adminCardKebabBtn"
                            title="More Actions"
                            aria-label={`More actions for ${prod.name}`}
                            onClick={(e) => toggleKebab(e, `prod-${prod.id}`, idx >= Math.max(0, filteredProducts.length - 2))}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ══════════════ TAB 4: CATEGORIES (FULL CRUD) ══════════════ */}
          {activeTab === 'categories' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Categories</h1>
                  <p className="pageSubtitle">Add, edit, or delete store categories.</p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      setCategoryInputName('');
                      setIsAddCategoryOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Category</span>
                  </button>
                </div>
              </div>

              <div className="tableContainer adminDesktopTableView">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Linked Products</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, idx) => {
                      const count = products.filter(p => p.categoryName === cat).length;
                      return (
                        <tr key={idx}>
                          <td>
                            <strong style={{ fontSize: '0.92rem' }}>{cat}</strong>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                              {count} {count === 1 ? 'Product' : 'Products'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <button
                                type="button"
                                className="kebabTriggerBtn"
                                title="Category Actions"
                                aria-label={`Category actions for ${cat}`}
                                onClick={(e) => toggleKebab(e, `cat-${idx}`, idx >= Math.max(0, categories.length - 2))}
                              >
                                <MoreVertical size={16} />
                              </button>
                            </div>

                            {openKebabId === `cat-${idx}` && kebabCoords && createPortal(
                              <div
                                className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                style={{
                                  position: 'fixed',
                                  top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                  bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                  right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                  left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                  zIndex: 999999
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  className="kebabItem"
                                  onClick={() => {
                                    setEditingCategory(cat);
                                    setCategoryInputName(cat);
                                    setOpenKebabId(null);
                                    setKebabCoords(null);
                                  }}
                                >
                                  <Edit2 size={14} />
                                  <span>Edit Category</span>
                                </button>
                                <button
                                  type="button"
                                  className="kebabItem kebabDelete"
                                  onClick={() => {
                                    handleDeleteCategory(cat);
                                    setOpenKebabId(null);
                                    setKebabCoords(null);
                                  }}
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Category</span>
                                </button>
                              </div>,
                              document.body
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Categories Stacked Cards View */}
              <div className="adminMobileCardView" role="region" aria-label="Categories list">
                {categories.map((cat, idx) => {
                  const count = products.filter(p => p.categoryName === cat).length;
                  return (
                    <div key={`m-cat-${idx}`} className="adminMobileCard">
                      <div className="adminMobileCardHeader">
                        <div>
                          <div className="adminCardOrderNumber">{cat}</div>
                          <div className="adminCardDate">
                            {count} {count === 1 ? 'Product linked' : 'Products linked'}
                          </div>
                        </div>
                      </div>

                      <div className="adminMobileCardFooter" style={{ paddingTop: '8px' }}>
                        <button
                          type="button"
                          className="btnSecondary adminProductEditBtn"
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryInputName(cat);
                          }}
                          aria-label={`Edit category ${cat}`}
                        >
                          <Edit2 size={14} />
                          <span>Edit Category</span>
                        </button>

                        <button
                          type="button"
                          className="kebabTriggerBtn adminCardKebabBtn"
                          title="Category Actions"
                          aria-label={`More actions for category ${cat}`}
                          onClick={(e) => toggleKebab(e, `cat-${idx}`, idx >= Math.max(0, categories.length - 2))}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ══════════════ TAB 5: DISCOUNTS (FULL CRUD - CONTROLS SITE CART FIELD) ══════════════ */}
          {activeTab === 'discounts' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Discounts</h1>
                  <p className="pageSubtitle">
                    Active discount codes will automatically show the promo code input in client shopping bags.
                  </p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      setDiscountForm({ code: '', type: 'percentage', value: 10, minSpend: 100, maxUses: 100, expiresAt: '2026-12-31' });
                      setIsAddDiscountOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>New Code</span>
                  </button>
                </div>
              </div>

              {discounts.length === 0 ? (
                <div className="emptyStateCard">
                  <Tag size={32} color="var(--color-text-tertiary)" />
                  <div className="emptyStateTitle">No discount codes</div>
                  <p className="emptyStateSubtitle">
                    When you create a code here, the privilege code box will automatically appear in customer shopping bags.
                  </p>
                  <button 
                    type="button" 
                    className="btnPrimary" 
                    onClick={() => setIsAddDiscountOpen(true)}
                  >
                    + Create First Code
                  </button>
                </div>
              ) : (
                <>
                  <div className="tableContainer adminDesktopTableView">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Type &amp; Value</th>
                          <th>Min Spend</th>
                          <th>Usage</th>
                          <th>Expires</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discounts.map((disc, idx) => (
                          <tr key={disc.id}>
                            <td>
                              <strong style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                                {disc.code}
                              </strong>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600 }}>
                                {disc.type === 'percentage' ? `${disc.value}% OFF` : `£${disc.value} OFF`}
                              </span>
                            </td>
                            <td>£{disc.minSpend.toFixed(2)}</td>
                            <td>
                              <span style={{ fontSize: '0.82rem' }}>{disc.usageCount} / {disc.maxUses}</span>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{disc.expiresAt}</td>
                            <td>
                              <span 
                                className={`badge ${disc.status}`}
                                onClick={() => handleToggleDiscountStatus(disc.id)}
                                style={{ cursor: 'pointer' }}
                                title="Click to toggle Active/Paused"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleDiscountStatus(disc.id); } }}
                                aria-label={`Status is ${disc.status}. Click to toggle.`}
                              >
                                {disc.status === 'active' ? 'Active' : 'Paused'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', position: 'relative' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                <button
                                  type="button"
                                  className="btnSecondary"
                                  onClick={() => setEditingDiscount({ ...disc })}
                                  aria-label={`Edit discount code ${disc.code}`}
                                  style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                >
                                  <Edit2 size={12} />
                                  <span>Edit Code</span>
                                </button>
                                <button
                                  type="button"
                                  className="btnPrimary"
                                  onClick={() => handleToggleDiscountStatus(disc.id)}
                                  aria-label={`${disc.status === 'active' ? 'Pause' : 'Activate'} discount code ${disc.code}`}
                                  style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                >
                                  <span>{disc.status === 'active' ? 'Pause' : 'Activate'}</span>
                                </button>
                                <button
                                  type="button"
                                  className="kebabTriggerBtn"
                                  title="Discount Actions"
                                  aria-label={`Discount actions for ${disc.code}`}
                                  onClick={(e) => toggleKebab(e, `disc-${disc.id}`, idx >= Math.max(0, discounts.length - 2))}
                                >
                                  <MoreVertical size={16} />
                                </button>
                              </div>

                              {openKebabId === `disc-${disc.id}` && kebabCoords && createPortal(
                                <div
                                  className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                  style={{
                                    position: 'fixed',
                                    top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                    bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                    right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                    left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                    zIndex: 999999
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setEditingDiscount({ ...disc });
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Edit2 size={14} />
                                    <span>Edit Discount</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      handleToggleDiscountStatus(disc.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Tag size={14} />
                                    <span>{disc.status === 'active' ? 'Pause Discount' : 'Activate Discount'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem kebabDelete"
                                    onClick={() => {
                                      handleDeleteDiscount(disc.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete Code</span>
                                  </button>
                                </div>,
                                document.body
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Discounts Stacked Cards View */}
                  <div className="adminMobileCardView" role="region" aria-label="Discounts list">
                    {discounts.map((disc, idx) => (
                      <div key={`m-disc-${disc.id}`} className="adminMobileCard">
                        <div className="adminMobileCardHeader">
                          <div>
                            <div className="adminCardOrderNumber" style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                              {disc.code}
                            </div>
                            <div className="adminCardDate">
                              Expires: {disc.expiresAt}
                            </div>
                          </div>
                          <span 
                            className={`badge ${disc.status}`}
                            onClick={() => handleToggleDiscountStatus(disc.id)}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleDiscountStatus(disc.id); } }}
                            aria-label={`Status is ${disc.status}. Click to toggle.`}
                          >
                            {disc.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>

                        <div className="adminMobileCardBody">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Discount Value:</span>
                            <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                              {disc.type === 'percentage' ? `${disc.value}% OFF` : `£${disc.value} OFF`}
                            </strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Minimum Spend:</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>£{disc.minSpend.toFixed(2)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Redemptions:</span>
                            <span style={{ fontSize: '0.85rem' }}>{disc.usageCount} / {disc.maxUses} uses</span>
                          </div>
                        </div>

                        <div className="adminMobileCardFooter adminDiscountCardFooter">
                          <button
                            type="button"
                            className="btnSecondary adminDiscountBtn"
                            onClick={() => setEditingDiscount({ ...disc })}
                            aria-label={`Edit discount code ${disc.code}`}
                          >
                            <Edit2 size={13} />
                            <span>Edit Code</span>
                          </button>

                          <button
                            type="button"
                            className="btnPrimary adminDiscountBtn"
                            onClick={() => handleToggleDiscountStatus(disc.id)}
                            aria-label={`${disc.status === 'active' ? 'Pause' : 'Activate'} discount code ${disc.code}`}
                          >
                            <span>{disc.status === 'active' ? 'Pause' : 'Activate'}</span>
                          </button>

                          <button
                            type="button"
                            className="kebabTriggerBtn adminCardKebabBtn"
                            title="Discount Actions"
                            aria-label={`More actions for discount ${disc.code}`}
                            onClick={(e) => toggleKebab(e, `disc-${disc.id}`, idx >= Math.max(0, discounts.length - 2))}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ══════════════ TAB 6: REVIEWS ══════════════ */}
          {activeTab === 'reviews' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Reviews</h1>
                  <p className="pageSubtitle">Moderate client ratings, approve submissions, and manage featured site testimonials.</p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      setReviewForm({
                        client: '',
                        productName: products[0]?.name || 'The Victoria Glass Bob',
                        rating: 5,
                        date: todayDate,
                        text: '',
                        status: 'featured'
                      });
                      setIsAddReviewOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Review</span>
                  </button>
                </div>
              </div>

              {/* Sub-filter tabs */}
              <div className="toolbar" style={{ marginBottom: '14px' }}>
                <ScrollableTabs>
                  <button
                    type="button"
                    className={`tabBtn ${reviewStatusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setReviewStatusFilter('all')}
                  >
                    All ({reviews.length})
                  </button>
                  <button
                    type="button"
                    className={`tabBtn ${reviewStatusFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setReviewStatusFilter('pending')}
                  >
                    <span className="desktopTabLabel">Awaiting Approval ({pendingReviewsCount})</span>
                    <span className="mobileTabLabel">Pending ({pendingReviewsCount})</span>
                  </button>
                  <button
                    type="button"
                    className={`tabBtn ${reviewStatusFilter === 'featured' ? 'active' : ''}`}
                    onClick={() => setReviewStatusFilter('featured')}
                  >
                    <span className="desktopTabLabel">Featured on Site ({featuredReviewsCount})</span>
                    <span className="mobileTabLabel">Featured ({featuredReviewsCount})</span>
                  </button>
                </ScrollableTabs>
              </div>

              {/* Desktop Wide Table View */}
              <div className="adminDesktopTableView">
                <div className="tableContainer">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Rating</th>
                        <th>Client</th>
                        <th>Product</th>
                        <th>Feedback</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReviews.map((rev, idx) => {
                        const isFeatured = rev.status === 'featured';
                        return (
                          <tr key={rev.id}>
                            <td>
                              <div style={{ display: 'flex', gap: '2px', color: 'var(--color-accent)' }}>
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} size={14} fill="currentColor" />
                                ))}
                              </div>
                            </td>
                            <td><strong>{rev.client}</strong></td>
                            <td>
                              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                                {rev.productName || 'Signature Unit'}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.86rem', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={rev.text}>
                              "{rev.text.length > 55 ? rev.text.substring(0, 52) + '...' : rev.text}"
                            </td>
                            <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{rev.date}</td>
                            <td>
                              {isFeatured ? (
                                <span className="badge inStock" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <Check size={11} /> Featured
                                </span>
                              ) : (
                                <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock size={11} /> Awaiting Approval
                                </span>
                              )}
                            </td>
                            <td style={{ textAlign: 'right', position: 'relative' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                                <button
                                  type="button"
                                  className="kebabTriggerBtn"
                                  title="Review Actions"
                                  onClick={(e) => toggleKebab(e, `rev-${rev.id}`, idx >= Math.max(0, filteredReviews.length - 2))}
                                >
                                  <MoreVertical size={16} />
                                </button>
                              </div>

                              {openKebabId === `rev-${rev.id}` && kebabCoords && createPortal(
                                <div
                                  className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                  style={{
                                    position: 'fixed',
                                    top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                    bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                    right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                    left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                    zIndex: 999999
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {isFeatured ? (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        handleRemoveReviewFromSite(rev.id);
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <X size={14} color="#DC2626" />
                                      <span>Remove from Site</span>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        handleFeatureReview(rev.id);
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Check size={14} color="#15803D" />
                                      <span>Feature on Site</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="kebabItem"
                                    onClick={() => {
                                      setEditingReview({ ...rev });
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Edit2 size={14} />
                                    <span>Edit Review</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabItem kebabDelete"
                                    onClick={() => {
                                      handleDeleteReview(rev.id);
                                      setOpenKebabId(null);
                                      setKebabCoords(null);
                                    }}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete Review</span>
                                  </button>
                                </div>,
                                document.body
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {filteredReviews.length === 0 && (
                    <div className="emptyStateCard">
                      <Star size={32} color="var(--color-accent)" strokeWidth={1.5} />
                      <h3 className="emptyStateTitle">No reviews in this view</h3>
                      <p className="emptyStateSubtitle">
                        {reviewStatusFilter === 'pending'
                          ? 'All submitted client reviews have been approved.'
                          : 'No client reviews found.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Reviews Stacked Cards View */}
              <div className="adminMobileCardView" role="region" aria-label="Customer reviews list">
                {filteredReviews.map((rev, idx) => {
                  const isFeatured = rev.status === 'featured';
                  return (
                    <div key={`m-rev-${rev.id}`} className="adminMobileCard">
                      <div className="adminMobileCardHeader">
                        <div>
                          <div style={{ display: 'flex', gap: '3px', color: 'var(--color-accent)', marginBottom: '4px' }}>
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={15} fill="currentColor" />
                            ))}
                          </div>
                          <div className="adminCardOrderNumber">{rev.client}</div>
                          <div className="adminCardDate">
                            {rev.productName || 'Signature Unit'} • {rev.date}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          {isFeatured ? (
                            <span className="badge inStock" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Check size={11} /> Featured
                            </span>
                          ) : (
                            <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={11} /> Pending
                            </span>
                          )}
                          <button
                            type="button"
                            className="kebabTriggerBtn adminCardKebabBtn"
                            title="Review Actions"
                            aria-label={`More actions for review by ${rev.client}`}
                            onClick={(e) => toggleKebab(e, `rev-${rev.id}`, idx >= Math.max(0, filteredReviews.length - 2))}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="adminMobileCardBody">
                        <p style={{ margin: 0, fontSize: '0.86rem', fontStyle: 'italic', color: 'var(--color-text)', lineHeight: 1.5 }}>
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="adminMobileCardFooter adminDiscountCardFooter" style={{ paddingTop: '8px' }}>
                        <button
                          type="button"
                          className="btnSecondary adminDiscountBtn"
                          onClick={() => setEditingReview({ ...rev })}
                          aria-label={`Edit review from ${rev.client}`}
                        >
                          <Edit2 size={13} />
                          <span>Edit</span>
                        </button>

                        {isFeatured ? (
                          <button
                            type="button"
                            className="btnPrimary adminDiscountBtn"
                            onClick={() => handleRemoveReviewFromSite(rev.id)}
                            aria-label={`Remove review by ${rev.client} from site`}
                            style={{ background: '#7F1D1D', borderColor: '#7F1D1D' }}
                          >
                            <X size={13} color="#FFFFFF" />
                            <span>Remove</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btnPrimary adminDiscountBtn"
                            onClick={() => handleFeatureReview(rev.id)}
                            aria-label={`Feature review by ${rev.client} on site`}
                          >
                            <Check size={13} />
                            <span>Feature</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredReviews.length === 0 && (
                  <div className="emptyStateCard">
                    <Star size={32} color="var(--color-accent)" strokeWidth={1.5} />
                    <h3 className="emptyStateTitle">No reviews in this view</h3>
                    <p className="emptyStateSubtitle">
                      {reviewStatusFilter === 'pending'
                        ? 'All submitted client reviews have been approved.'
                        : 'No client reviews found.'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══════════════ TAB 7: RESTOCK ALERTS ══════════════ */}
          {activeTab === 'subscribers' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Restock Alerts</h1>
                  <p className="pageSubtitle">VIP restock drop notifications &amp; subscribers.</p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      setSubscriberForm({
                        name: '',
                        email: '',
                        type: 'VIP Restock Drop',
                        date: todayDate
                      });
                      setIsAddSubscriberOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Subscriber</span>
                  </button>
                  <button
                    type="button"
                    className="btnSecondary"
                    onClick={() => {
                      triggerToast(`✓ VIP Restock Drop broadcast dispatched to all ${subscribers.length} waitlist subscribers!`);
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <BellRing size={14} />
                    <span>Broadcast Restock Drop</span>
                  </button>
                  <button
                    type="button"
                    className="btnSecondary"
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        ["Name,Email,Type,Date", ...subscribers.map(s => `"${s.name}","${s.email}","${s.type}","${s.date}"`)].join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `house_of_nina_subscribers_${todayDate}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      triggerToast('CSV downloaded');
                    }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Desktop Wide Table View */}
              <div className="adminDesktopTableView">
                <div className="tableContainer">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Subscriber</th>
                        <th>Email Address</th>
                        <th>List Type</th>
                        <th>Date</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub, idx) => (
                        <tr key={sub.id}>
                          <td><strong>{sub.name}</strong></td>
                          <td>{sub.email}</td>
                          <td><span className="badge processing">{sub.type}</span></td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{sub.date}</td>
                          <td style={{ textAlign: 'right', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <button
                                type="button"
                                className="kebabTriggerBtn"
                                title="Subscriber Actions"
                                onClick={(e) => toggleKebab(e, `sub-${sub.id}`, idx >= Math.max(0, subscribers.length - 2))}
                              >
                                <MoreVertical size={16} />
                              </button>
                            </div>

                            {openKebabId === `sub-${sub.id}` && kebabCoords && createPortal(
                              <div
                                className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                style={{
                                  position: 'fixed',
                                  top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                  bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                  right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                  left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                  zIndex: 999999
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  className="kebabItem"
                                  onClick={() => {
                                    setEditingSubscriber({ ...sub });
                                    setOpenKebabId(null);
                                    setKebabCoords(null);
                                  }}
                                >
                                  <Edit2 size={14} />
                                  <span>Edit Subscriber</span>
                                </button>
                                <button
                                  type="button"
                                  className="kebabItem kebabDelete"
                                  onClick={() => {
                                    handleDeleteSubscriber(sub.id);
                                    setOpenKebabId(null);
                                    setKebabCoords(null);
                                  }}
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Subscriber</span>
                                </button>
                              </div>,
                              document.body
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Subscribers Stacked Cards View */}
              <div className="adminMobileCardView" role="region" aria-label="VIP subscribers list">
                {subscribers.map((sub, idx) => (
                  <div key={`m-sub-${sub.id}`} className="adminMobileCard">
                    <div className="adminMobileCardHeader">
                      <div>
                        <div className="adminCardOrderNumber">{sub.name}</div>
                        <div className="adminCardDate">Joined: {sub.date}</div>
                      </div>
                      <span className="badge processing">{sub.type}</span>
                    </div>

                    <div className="adminMobileCardBody">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Email:</span>
                        <a href={`mailto:${sub.email}`} style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600, wordBreak: 'break-all', textDecoration: 'none' }}>
                          {sub.email}
                        </a>
                      </div>
                    </div>

                    <div className="adminMobileCardFooter">
                      <button
                        type="button"
                        className="btnSecondary adminProductEditBtn"
                        onClick={() => setEditingSubscriber({ ...sub })}
                        aria-label={`Edit subscriber ${sub.name}`}
                      >
                        <Edit2 size={14} />
                        <span>Edit Subscriber</span>
                      </button>

                      <button
                        type="button"
                        className="kebabTriggerBtn adminCardKebabBtn"
                        title="Subscriber Actions"
                        aria-label={`More actions for subscriber ${sub.name}`}
                        onClick={(e) => toggleKebab(e, `sub-${sub.id}`, idx >= Math.max(0, subscribers.length - 2))}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══════════════ TAB 8: SETTINGS (FULL CRUD) ══════════════ */}
          {activeTab === 'settings' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Settings</h1>
                  <p className="pageSubtitle">Store profile, contact &amp; shipping.</p>
                </div>
                <div className="pageHeaderActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => {
                      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings));
                      triggerToast('✓ Settings saved successfully');
                    }}
                  >
                    <Check size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>

              <div className="adminSettingsContainer">
                {/* Store Profile Card */}
                <div className="adminSettingsCard">
                  <h3 className="adminSettingsTitle">Store Profile</h3>
                  
                  <div className="adminSettingsGrid">
                    <div className="adminSettingsField">
                      <label className="adminSettingsHeading">Store Name</label>
                      <input 
                        type="text" 
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                        className="adminSettingsInput"
                      />
                    </div>

                    <div className="adminSettingsField">
                      <label className="adminSettingsHeading">Headquarters Address</label>
                      <input 
                        type="text" 
                        value={storeSettings.headquarters}
                        onChange={(e) => setStoreSettings({ ...storeSettings, headquarters: e.target.value })}
                        className="adminSettingsInput"
                      />
                    </div>

                    <div className="adminSettingsField">
                      <label className="adminSettingsHeading">Support Email</label>
                      <input 
                        type="email" 
                        value={storeSettings.supportEmail}
                        onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                        className="adminSettingsInput"
                      />
                    </div>

                    <div className="adminSettingsField">
                      <label className="adminSettingsHeading">WhatsApp Concierge Hotline</label>
                      <input 
                        type="text" 
                        value={storeSettings.hotline}
                        onChange={(e) => setStoreSettings({ ...storeSettings, hotline: e.target.value })}
                        className="adminSettingsInput"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Rates Configuration Card with Full Dynamic CRUD */}
                <div className="adminSettingsCard">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <h3 className="adminSettingsTitle" style={{ margin: '0 0 3px 0' }}>Shipping Rates Configuration</h3>
                      <p className="adminSectionSubtitle" style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                        Manage delivery services, estimated transit windows, and checkout courier rates.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btnPrimary"
                      onClick={() => {
                        setShippingRateForm({
                          name: '',
                          price: '',
                          estimatedDays: '2 - 3 business days',
                          status: 'active'
                        });
                        setIsAddShippingRateOpen(true);
                      }}
                    >
                      <Plus size={15} />
                      <span>Add Shipping Rate</span>
                    </button>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label className="adminSettingsHeading">Free Shipping Threshold (£ GBP)</label>
                    <input 
                      type="number" 
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                      className="adminSettingsInput"
                      style={{ maxWidth: '320px' }}
                    />
                  </div>

                  {/* Desktop Wide Table View */}
                  <div className="adminDesktopTableView">
                    <div className="tableContainer">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Delivery Method</th>
                            <th>Estimated Delivery Window</th>
                            <th>Rate (£ GBP)</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shippingRates.map((rate, idx) => (
                            <tr key={rate.id}>
                              <td>
                                <strong style={{ fontSize: '0.9rem' }}>{rate.name}</strong>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>ID: {rate.id}</div>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.84rem' }}>{rate.estimatedDays}</span>
                              </td>
                              <td>
                                <strong style={{ fontSize: '0.92rem' }}>£{Number(rate.price).toFixed(2)}</strong>
                              </td>
                              <td>
                                <span 
                                  className={`badge ${rate.status === 'active' ? 'inStock' : 'outOfStock'}`}
                                  onClick={() => handleToggleShippingRateStatus(rate.id)}
                                  style={{ cursor: 'pointer' }}
                                  title="Click to toggle Active / Paused"
                                >
                                  {rate.status === 'active' ? 'Active' : 'Paused'}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right', position: 'relative' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                  <button
                                    type="button"
                                    className="btnSecondary"
                                    onClick={() => setEditingShippingRate({ ...rate })}
                                    aria-label={`Edit shipping rate ${rate.name}`}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '6px', fontWeight: 600 }}
                                  >
                                    <Edit2 size={12} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btnPrimary"
                                    onClick={() => handleToggleShippingRateStatus(rate.id)}
                                    aria-label={`${rate.status === 'active' ? 'Pause' : 'Activate'} ${rate.name}`}
                                    style={{ fontSize: '0.74rem', padding: '4px 10px', minHeight: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 600 }}
                                  >
                                    <span>{rate.status === 'active' ? 'Pause' : 'Activate'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="kebabTriggerBtn"
                                    title="Shipping Rate Actions"
                                    aria-label={`Shipping rate actions for ${rate.name}`}
                                    onClick={(e) => toggleKebab(e, `ship-${rate.id}`, idx >= Math.max(0, shippingRates.length - 2))}
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                </div>

                                {openKebabId === `ship-${rate.id}` && kebabCoords && createPortal(
                                  <div
                                    className={`kebabMenu ${kebabCoords.openUpward ? 'openUpward' : ''}`}
                                    style={{
                                      position: 'fixed',
                                      top: kebabCoords.top !== null ? `${kebabCoords.top}px` : 'auto',
                                      bottom: kebabCoords.bottom !== null ? `${kebabCoords.bottom}px` : 'auto',
                                      right: kebabCoords.right !== null ? `${kebabCoords.right}px` : 'auto',
                                      left: kebabCoords.left !== null ? `${kebabCoords.left}px` : 'auto',
                                      zIndex: 999999
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        setEditingShippingRate({ ...rate });
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Edit2 size={14} />
                                      <span>Edit Rate</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="kebabItem"
                                      onClick={() => {
                                        handleToggleShippingRateStatus(rate.id);
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Truck size={14} />
                                      <span>{rate.status === 'active' ? 'Pause Service' : 'Activate Service'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="kebabItem kebabDelete"
                                      onClick={() => {
                                        handleDeleteShippingRate(rate.id);
                                        setOpenKebabId(null);
                                        setKebabCoords(null);
                                      }}
                                    >
                                      <Trash2 size={14} />
                                      <span>Delete Rate</span>
                                    </button>
                                  </div>,
                                  document.body
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {shippingRates.length === 0 && (
                        <div className="emptyStateCard">
                          <Truck size={32} color="var(--color-text-tertiary)" />
                          <h3 className="emptyStateTitle">No shipping rates configured</h3>
                          <p className="emptyStateSubtitle">Add your courier services to enable client delivery options.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Shipping Rates Stacked Cards View */}
                  <div className="adminMobileCardView" role="region" aria-label="Shipping rates list">
                    {shippingRates.map((rate, idx) => (
                      <div key={`m-ship-${rate.id}`} className="adminMobileCard">
                        <div className="adminMobileCardHeader">
                          <div>
                            <div className="adminCardOrderNumber">{rate.name}</div>
                            <div className="adminCardDate">Transit: {rate.estimatedDays}</div>
                          </div>
                          <span 
                            className={`badge ${rate.status === 'active' ? 'inStock' : 'outOfStock'}`}
                            onClick={() => handleToggleShippingRateStatus(rate.id)}
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleShippingRateStatus(rate.id); } }}
                            aria-label={`Status is ${rate.status}. Click to toggle.`}
                          >
                            {rate.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>

                        <div className="adminMobileCardBody">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Shipping Fee:</span>
                            <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                              £{Number(rate.price).toFixed(2)}
                            </strong>
                          </div>
                        </div>

                        <div className="adminMobileCardFooter adminDiscountCardFooter">
                          <button
                            type="button"
                            className="btnSecondary adminDiscountBtn"
                            onClick={() => setEditingShippingRate({ ...rate })}
                            aria-label={`Edit shipping rate ${rate.name}`}
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="btnPrimary adminDiscountBtn"
                            onClick={() => handleToggleShippingRateStatus(rate.id)}
                            aria-label={`${rate.status === 'active' ? 'Pause' : 'Activate'} ${rate.name}`}
                          >
                            <span>{rate.status === 'active' ? 'Pause' : 'Activate'}</span>
                          </button>

                          <button
                            type="button"
                            className="kebabTriggerBtn adminCardKebabBtn"
                            title="Shipping Rate Actions"
                            aria-label={`More actions for ${rate.name}`}
                            onClick={(e) => toggleKebab(e, `ship-${rate.id}`, idx >= Math.max(0, shippingRates.length - 2))}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {shippingRates.length === 0 && (
                      <div className="emptyStateCard">
                        <Truck size={32} color="var(--color-text-tertiary)" />
                        <h3 className="emptyStateTitle">No shipping rates configured</h3>
                        <p className="emptyStateSubtitle">Add your courier services to enable client delivery options.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODALS FOR FULL CRUD OPERATIONS
          ══════════════════════════════════════════════════════════ */}

      {/* MODAL: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="modalOverlay" onClick={() => setIsAddProductOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateProduct} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Add Product</h2>
                <p className="modalText">Create a new hair unit or silk styling care product.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Product Title</label>
                <input 
                  type="text" 
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. The Chelsea Raw Straight 30''"
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Category</label>
                  <select 
                    value={productForm.categoryName}
                    onChange={(e) => setProductForm({ ...productForm, categoryName: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Price (£ GBP)</label>
                  <input 
                    type="number" 
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="280"
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Image URL</label>
                  <input 
                    type="url" 
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Create Product</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddProductOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="modalOverlay" onClick={() => setEditingProduct(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateProduct} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Product</h2>
                <p className="modalText">Update title, category, price, and stock count.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Product Title</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Category</label>
                  <select 
                    value={editingProduct.categoryName}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryName: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Price (£ GBP)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Image URL</label>
                  <input 
                    type="url" 
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingProduct(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {(isAddCategoryOpen || editingCategory) && (
        <div className="modalOverlay" onClick={() => { setIsAddCategoryOpen(false); setEditingCategory(null); }}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="modalFormFlex">
              <div className="modalScrollBody" style={{ textAlign: 'left' }}>
                <h2 className="modalTitle">{editingCategory ? 'Rename Category' : 'New Category'}</h2>
                <p className="modalText">{editingCategory ? `Update name for "${editingCategory}".` : 'Add a new product category.'}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Category Name</label>
                <input 
                  type="text" 
                  value={categoryInputName}
                  onChange={(e) => setCategoryInputName(e.target.value)}
                  placeholder="e.g. Silk Styling Care"
                  required
                  autoFocus
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">{editingCategory ? 'Save' : 'Create'}</button>
                <button type="button" className="modalBtnCancel" onClick={() => { setIsAddCategoryOpen(false); setEditingCategory(null); }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DISCOUNT */}
      {isAddDiscountOpen && (
        <div className="modalOverlay" onClick={() => setIsAddDiscountOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateDiscount} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">New Discount Code</h2>
                <p className="modalText">Active discount codes will automatically show the privilege code box in the client cart.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Discount Code</label>
                <input 
                  type="text" 
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. FLASH20"
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Type</label>
                  <select 
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="percentage">% Percentage Off</option>
                    <option value="fixed">£ Fixed Amount Off</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Value ({discountForm.type === 'percentage' ? '%' : '£'})</label>
                  <input 
                    type="number" 
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })}
                    placeholder="15"
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Min Spend (£)</label>
                  <input 
                    type="number" 
                    value={discountForm.minSpend}
                    onChange={(e) => setDiscountForm({ ...discountForm, minSpend: e.target.value })}
                    placeholder="100"
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Max Uses</label>
                  <input 
                    type="number" 
                    value={discountForm.maxUses}
                    onChange={(e) => setDiscountForm({ ...discountForm, maxUses: e.target.value })}
                    placeholder="100"
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Activate Code</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddDiscountOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DISCOUNT */}
      {editingDiscount && (
        <div className="modalOverlay" onClick={() => setEditingDiscount(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateDiscount} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Discount Code</h2>
                <p className="modalText">Update code terms, value, or usage limits.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Code</label>
                <input 
                  type="text" 
                  value={editingDiscount.code}
                  onChange={(e) => setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() })}
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Value ({editingDiscount.type === 'percentage' ? '%' : '£'})</label>
                  <input 
                    type="number" 
                    value={editingDiscount.value}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, value: parseFloat(e.target.value) || 0 })}
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Min Spend (£)</label>
                  <input 
                    type="number" 
                    value={editingDiscount.minSpend}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, minSpend: parseFloat(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Max Uses</label>
                  <input 
                    type="number" 
                    value={editingDiscount.maxUses}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, maxUses: parseInt(e.target.value) || 100 })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Status</label>
                  <select 
                    value={editingDiscount.status}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, status: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="active">Active (Visible in Cart)</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingDiscount(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SHIPPING DISPATCH (Advances Lifeline to Shipped) */}
      {isDispatchModalOpen && dispatchOrderTarget && (
        <div className="modalOverlay" onClick={() => setIsDispatchModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Ship Order {dispatchOrderTarget.orderNumber}</h2>
                <p className="modalText">Assign courier partner and tracking code to advance lifeline to Shipped.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Courier Partner</label>
                <select 
                  value={dispatchCourier}
                  onChange={(e) => setDispatchCourier(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                >
                  <option value="Royal Mail Special Delivery">Royal Mail Special Delivery Guaranteed</option>
                  <option value="Royal Mail 24 Tracked">Royal Mail 24 Tracked</option>
                  <option value="DHL Express Worldwide">DHL Express Worldwide</option>
                  <option value="Addison Lee Direct Courier">Addison Lee Direct Courier</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Tracking Number</label>
                <input 
                  type="text" 
                  value={dispatchTrackingNum}
                  onChange={(e) => setDispatchTrackingNum(e.target.value)}
                  placeholder="e.g. RM-77219481-GB"
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem', fontFamily: 'monospace' }}
                />
                <div style={{ fontSize: '0.62rem', color: 'var(--color-espresso-muted)', marginTop: '4px' }}>
                  ✉️ An automated dispatch email with this tracking code will be sent to <strong>{dispatchOrderTarget.customer?.email || 'the customer'}</strong>.
                </div>
              </div>
              </div>
            </div>

            <div className="modalActions">
              <button 
                type="button" 
                className="modalBtnSubmit"
                onClick={() => handleAdvanceLifeline(dispatchOrderTarget.id, 'shipped', dispatchTrackingNum)}
              >
                Confirm Dispatch
              </button>
              <button 
                type="button" 
                className="modalBtnCancel" 
                onClick={() => setIsDispatchModalOpen(false)}
              >Close</button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* MODAL: EDIT ORDER DETAILS */}
      {editingOrder && (
        <div className="modalOverlay" onClick={() => setEditingOrder(null)}>
          <div className="editModalContent" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveOrderEdit} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Order {editingOrder.orderNumber}</h2>
                <p className="modalText">Update recipient information, status, or fulfillment notes.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Recipient Name</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.fullName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, fullName: e.target.value } })}
                    required
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.phone}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, phone: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editingOrder.customer.email}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, email: e.target.value } })}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Street Address</label>
                <input 
                  type="text" 
                  value={editingOrder.customer.address}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, address: e.target.value } })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>City</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.city}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, city: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Postal Code</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.postalCode}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, postalCode: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div className="adminFormRowGrid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Lifeline Status</label>
                  <select 
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="abandoned">Abandoned</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Tracking Number</label>
                  <input 
                    type="text" 
                    value={editingOrder.trackingNumber || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Order</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingOrder(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS & LIFELINE TRACKER & PACKING SLIP */}
      {viewOrderDetails && (
        <div className="modalOverlay" onClick={() => setViewOrderDetails(null)}>
          <div className="editModalContent" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modalFormFlex">
              <div className="modalScrollBody">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>{viewOrderDetails.orderNumber}</h2>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-secondary)' }}>
                  Placed on {new Date(viewOrderDetails.createdAt).toLocaleString('en-GB')}
                </span>
              </div>
              <button
                type="button"
                className="btnPrimary"
                onClick={() => window.print()}
                style={{ fontSize: '0.68rem', padding: '6px 12px', minHeight: '34px' }}
                aria-label={`Print packing slip for order ${viewOrderDetails.orderNumber}`}
              >
                <Printer size={13} />
                <span>Print Slip</span>
              </button>
            </div>

            {/* Visual Lifeline Tracker (Confirmed -> Processing -> Shipped -> Delivered) */}
            <div className="lifelineContainer">
              <div className="lifelineBar" />
              {[
                { key: 'confirmed', label: 'Confirmed', stepNum: 1 },
                { key: 'processing', label: 'Processing', stepNum: 2 },
                { key: 'shipped', label: 'Shipped', stepNum: 3 },
                { key: 'delivered', label: 'Delivered', stepNum: 4 }
              ].map((step, idx) => {
                const stepOrder = ['confirmed', 'processing', 'shipped', 'delivered'];
                const currentIdx = stepOrder.indexOf(viewOrderDetails.status);
                const isCompleted = currentIdx > idx;
                const isActive = currentIdx === idx;

                return (
                  <div key={step.key} className={`lifelineStep ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                    <div className="lifelineNode">
                      {isCompleted ? '✓' : step.stepNum}
                    </div>
                    <span className="lifelineLabel">{step.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Recipient Shipping</strong>
                <div>{viewOrderDetails.customer.fullName}</div>
                <div>{viewOrderDetails.customer.address}</div>
                <div>{viewOrderDetails.customer.city}, {viewOrderDetails.customer.postalCode}</div>
                <div>{viewOrderDetails.customer.country}</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>{viewOrderDetails.customer.phone}</div>
              </div>

              <div>
                <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Fulfillment &amp; Method</strong>
                <div>Status: <span className={`badge ${viewOrderDetails.status}`}>{viewOrderDetails.status}</span></div>
                <div style={{ marginTop: '2px' }}>Courier: {viewOrderDetails.courier || viewOrderDetails.deliveryMethod}</div>
                <div>Payment: {viewOrderDetails.paymentMethod}</div>
                {viewOrderDetails.trackingNumber && (
                  <div style={{ marginTop: '2px', fontWeight: 600 }}>Tracking: {viewOrderDetails.trackingNumber}</div>
                )}
              </div>
            </div>

            <div className="tableContainer" style={{ marginBottom: '14px' }}>
              <table className="table" style={{ whiteSpace: 'normal' }}>
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th style={{ width: '48px', textAlign: 'center' }}>Qty</th>
                    <th style={{ textAlign: 'right', width: '70px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {viewOrderDetails.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{it.name}</strong>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)' }}>
                          {it.selectedLength} • {it.selectedLace}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>{it.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>£{(it.price * it.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Total: </span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>£{Number(viewOrderDetails.total).toFixed(2)}</strong>
              </div>
            </div>

            </div>

            <div className="modalActions">
              {viewOrderDetails.status === 'confirmed' && (
                <button
                  type="button"
                  className="modalBtnSubmit"
                  onClick={() => {
                    handleAdvanceLifeline(viewOrderDetails.id, 'processing');
                    setViewOrderDetails({ ...viewOrderDetails, status: 'processing' });
                  }}
                >
                  Advance to Processing
                </button>
              )}
              {viewOrderDetails.status === 'processing' && (
                <button
                  type="button"
                  className="modalBtnSubmit"
                  onClick={() => {
                    setDispatchOrderTarget(viewOrderDetails);
                    setDispatchTrackingNum(`RM-${Math.floor(10000000 + Math.random() * 90000000)}-GB`);
                    setIsDispatchModalOpen(true);
                    setViewOrderDetails(null);
                  }}
                >
                  Ship &amp; Assign Tracking
                </button>
              )}
              {viewOrderDetails.status === 'shipped' && (
                <button
                  type="button"
                  className="modalBtnSubmit"
                  onClick={() => {
                    handleAdvanceLifeline(viewOrderDetails.id, 'delivered');
                    setViewOrderDetails({ ...viewOrderDetails, status: 'delivered' });
                  }}
                >
                  Mark as Delivered
                </button>
              )}
              <button type="button" className="modalBtnCancel" onClick={() => setViewOrderDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: ADD CLIENT REVIEW
          ══════════════════════════════════════════════════════════ */}
      {isAddReviewOpen && (
        <div className="modalOverlay" onClick={() => setIsAddReviewOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateReview} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Add Client Review</h2>
                <p className="modalText">Record a client testimonial, rating, and website display status.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Client Name</label>
                <input 
                  type="text" 
                  value={reviewForm.client}
                  onChange={(e) => setReviewForm({ ...reviewForm, client: e.target.value })}
                  placeholder="e.g. Amara O."
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Product Reviewed</label>
                  <select 
                    value={reviewForm.productName}
                    onChange={(e) => setReviewForm({ ...reviewForm, productName: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Signature Unit">Signature Unit (General)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Star Rating</label>
                  <select 
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Date</label>
                  <input 
                    type="date" 
                    value={reviewForm.date}
                    onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Display Status</label>
                  <select 
                    value={reviewForm.status}
                    onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="featured">Featured on Site</option>
                    <option value="pending">Awaiting Approval</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Review Feedback</label>
                <textarea 
                  rows={3}
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Client comments and review feedback..."
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Create Review</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddReviewOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: EDIT CLIENT REVIEW
          ══════════════════════════════════════════════════════════ */}
      {editingReview && (
        <div className="modalOverlay" onClick={() => setEditingReview(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateReview} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Client Review</h2>
                <p className="modalText">Update testimonial contents, rating, or publication status.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Client Name</label>
                <input 
                  type="text" 
                  value={editingReview.client}
                  onChange={(e) => setEditingReview({ ...editingReview, client: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Product Reviewed</label>
                  <select 
                    value={editingReview.productName}
                    onChange={(e) => setEditingReview({ ...editingReview, productName: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Signature Unit">Signature Unit (General)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Star Rating</label>
                  <select 
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Date</label>
                  <input 
                    type="date" 
                    value={editingReview.date}
                    onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Display Status</label>
                  <select 
                    value={editingReview.status}
                    onChange={(e) => setEditingReview({ ...editingReview, status: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="featured">Featured on Site</option>
                    <option value="pending">Awaiting Approval</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Review Feedback</label>
                <textarea 
                  rows={3}
                  value={editingReview.text}
                  onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingReview(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: ADD SHIPPING RATE
          ══════════════════════════════════════════════════════════ */}
      {isAddShippingRateOpen && (
        <div className="modalOverlay" onClick={() => setIsAddShippingRateOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateShippingRate} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Add Shipping Rate</h2>
                <p className="modalText">Configure a new courier delivery service and fee.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Delivery Method Name</label>
                <input 
                  type="text" 
                  value={shippingRateForm.name}
                  onChange={(e) => setShippingRateForm({ ...shippingRateForm, name: e.target.value })}
                  placeholder="e.g. UK Standard Delivery or UK Next Day Delivery"
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Rate (£ GBP)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={shippingRateForm.price}
                    onChange={(e) => setShippingRateForm({ ...shippingRateForm, price: e.target.value })}
                    placeholder="7.50"
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Status</label>
                  <select 
                    value={shippingRateForm.status}
                    onChange={(e) => setShippingRateForm({ ...shippingRateForm, status: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Estimated Delivery Timeframe</label>
                <input 
                  type="text" 
                  value={shippingRateForm.estimatedDays}
                  onChange={(e) => setShippingRateForm({ ...shippingRateForm, estimatedDays: e.target.value })}
                  placeholder="e.g. 2–5 working days or 1–2 working days"
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Add Shipping Rate</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddShippingRateOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: EDIT SHIPPING RATE
          ══════════════════════════════════════════════════════════ */}
      {editingShippingRate && (
        <div className="modalOverlay" onClick={() => setEditingShippingRate(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateShippingRate} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Shipping Rate</h2>
                <p className="modalText">Update courier service title, delivery window, and fee.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Delivery Method Name</label>
                <input 
                  type="text" 
                  value={editingShippingRate.name}
                  onChange={(e) => setEditingShippingRate({ ...editingShippingRate, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Rate (£ GBP)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingShippingRate.price}
                    onChange={(e) => setEditingShippingRate({ ...editingShippingRate, price: parseFloat(e.target.value) || 0 })}
                    required
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Status</label>
                  <select 
                    value={editingShippingRate.status}
                    onChange={(e) => setEditingShippingRate({ ...editingShippingRate, status: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Estimated Delivery Timeframe</label>
                <input 
                  type="text" 
                  value={editingShippingRate.estimatedDays}
                  onChange={(e) => setEditingShippingRate({ ...editingShippingRate, estimatedDays: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingShippingRate(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: ADD SUBSCRIBER
          ══════════════════════════════════════════════════════════ */}
      {isAddSubscriberOpen && (
        <div className="modalOverlay" onClick={() => setIsAddSubscriberOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateSubscriber} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Add VIP Subscriber</h2>
                <p className="modalText">Manually enroll a client into restock alerts or notification drops.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Full Name</label>
                <input 
                  type="text" 
                  value={subscriberForm.name}
                  onChange={(e) => setSubscriberForm({ ...subscriberForm, name: e.target.value })}
                  placeholder="e.g. Zainab Al-Mansoor"
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={subscriberForm.email}
                  onChange={(e) => setSubscriberForm({ ...subscriberForm, email: e.target.value })}
                  placeholder="e.g. client@example.co.uk"
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>List / Drop Type</label>
                  <select 
                    value={subscriberForm.type}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, type: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="VIP Restock Drop">VIP Restock Drop</option>
                    <option value="The Silk Bone Straight 26&quot; Waitlist">The Silk Bone Straight 26" Waitlist</option>
                    <option value="The Victoria Glass Bob Waitlist">The Victoria Glass Bob Waitlist</option>
                    <option value="Private Salon Client">Private Salon Client</option>
                    <option value="General VIP Newsletter">General VIP Newsletter</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Date Enrolled</label>
                  <input 
                    type="date" 
                    value={subscriberForm.date}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, date: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Enroll Subscriber</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddSubscriberOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL: EDIT SUBSCRIBER
          ══════════════════════════════════════════════════════════ */}
      {editingSubscriber && (
        <div className="modalOverlay" onClick={() => setEditingSubscriber(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateSubscriber} className="modalFormFlex">
              <div className="modalScrollBody">
                <h2 className="modalTitle">Edit Subscriber Details</h2>
                <p className="modalText">Update contact information or assigned waitlist drop.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Full Name</label>
                <input 
                  type="text" 
                  value={editingSubscriber.name}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editingSubscriber.email}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>List / Drop Type</label>
                  <select 
                    value={editingSubscriber.type}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, type: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  >
                    <option value="VIP Restock Drop">VIP Restock Drop</option>
                    <option value="The Silk Bone Straight 26&quot; Waitlist">The Silk Bone Straight 26" Waitlist</option>
                    <option value="The Victoria Glass Bob Waitlist">The Victoria Glass Bob Waitlist</option>
                    <option value="Private Salon Client">Private Salon Client</option>
                    <option value="General VIP Newsletter">General VIP Newsletter</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.70rem', fontWeight: 600, marginBottom: '2px' }}>Date Enrolled</label>
                  <input 
                    type="date" 
                    value={editingSubscriber.date}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, date: e.target.value })}
                    style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--color-border)', borderRadius: '7px', fontSize: '0.68rem' }}
                  />
                </div>
              </div>

              </div>
              </div>

              <div className="modalActions">
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingSubscriber(null)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ABANDONED BAG RECOVERY QUICK-ACTION */}
      {recoveryOrderTarget && (
        <div className="modalOverlay" onClick={() => setRecoveryOrderTarget(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modalFormFlex">
              <div className="modalScrollBody">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D99A83', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16110F' }}>
                <RotateCcw size={16} strokeWidth={2.2} />
              </div>
              <h2 className="modalTitle" style={{ margin: 0 }}>Abandoned Bag Recovery</h2>
            </div>
            <p className="modalText">
              Direct concierge recovery lifeline for order <strong>#{recoveryOrderTarget.orderNumber}</strong>.
            </p>

            {/* Client & Reserved Items Card */}
            <div style={{ background: '#FAF7F2', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#16110F' }}>
                    {recoveryOrderTarget.customer.fullName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {recoveryOrderTarget.customer.email} • {recoveryOrderTarget.customer.phone}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>
                    {recoveryOrderTarget.customer.city}, {recoveryOrderTarget.customer.country}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Bag Value</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-800)' }}>
                    £{Number(recoveryOrderTarget.total).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Items in Bag */}
              <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recoveryOrderTarget.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.08)' }} 
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#16110F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                        {item.quantity}x • {item.selectedLength || 'Standard'} • {item.selectedLace || 'HD Lace'}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '16px' }}>
              {/* Action 1: One-tap Copy VIP Recovery Message & Link */}
              <button
                type="button"
                className="btnPrimary"
                onClick={() => handleCopyRecoveryMessage(recoveryOrderTarget)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px', background: '#D99A83', borderColor: '#C4836B', color: '#16110F', fontWeight: 700 }}
              >
                <Copy size={15} />
                <span>Copy VIP Recovery Message &amp; Direct Checkout Link</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {/* Action 2: Direct WhatsApp Concierge Link */}
                <a
                  href={`https://wa.me/${recoveryOrderTarget.customer.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${recoveryOrderTarget.customer.fullName}, House of Nina has reserved your ${recoveryOrderTarget.items?.[0]?.name || 'hair unit'}. To assist you with completing checkout, we have waived standard shipping: https://houseofnina.co.uk/?recover=${recoveryOrderTarget.orderNumber}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btnSecondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, color: '#16110F' }}
                >
                  <MessageCircle size={15} color="#25D366" />
                  <span>WhatsApp VIP</span>
                </a>

                {/* Action 3: VIP Email Dispatch */}
                <a
                  href={`mailto:${recoveryOrderTarget.customer.email}?subject=${encodeURIComponent(`House of Nina | Your Reserved Luxury Unit (${recoveryOrderTarget.items?.[0]?.name || ''})`)}&body=${encodeURIComponent(`Dear ${recoveryOrderTarget.customer.fullName},\n\nWe noticed you left your bespoke unit in your bag. Complete your private checkout with complimentary insured shipping here:\nhttps://houseofnina.co.uk/?recover=${recoveryOrderTarget.orderNumber}\n\nWarmest regards,\nHouse of Nina London`)}`}
                  className="btnSecondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, color: '#16110F' }}
                >
                  <Mail size={15} />
                  <span>Email Client</span>
                </a>
              </div>

              {/* Action 4: Advance Lifeline to Confirmed */}
              <button
                type="button"
                className="btnPrimary"
                onClick={() => handleMarkOrderRecovered(recoveryOrderTarget.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px', background: '#C7D5B5', borderColor: '#B1C29C', color: '#16110F', fontWeight: 700, marginTop: '4px' }}
              >
                <CheckCircle2 size={16} />
                <span>Mark as Recovered (Advance to Confirmed Lifeline)</span>
              </button>
            </div>
              </div>

              <div className="modalActions">
                <button 
                  type="button" 
                  className="modalBtnCancel" 
                  onClick={() => setRecoveryOrderTarget(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
