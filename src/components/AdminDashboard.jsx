import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Star, Settings, 
  LogOut, ChevronDown, Menu, X, BellRing, Search, 
  Plus, Trash2, Edit2, Truck, CheckCircle2, Printer, Download, 
  Tag, Calendar, TrendingUp, MoreVertical, Store, ArrowRight,
  Layers, Check
} from 'lucide-react';
import { FEATURED_PRODUCTS, BRAND_INFO } from '../data/wigData';
import '../styles/admin.css';

const INVENTORY_STORAGE_KEY = 'house_of_nina_admin_inventory_v3';
const ORDERS_STORAGE_KEY = 'house_of_nina_admin_orders_v3';
const DISCOUNTS_STORAGE_KEY = 'house_of_nina_admin_discounts_v3';
const SUBSCRIBERS_STORAGE_KEY = 'house_of_nina_admin_subscribers_v3';
const CATEGORIES_STORAGE_KEY = 'house_of_nina_admin_categories_v3';
const SETTINGS_STORAGE_KEY = 'house_of_nina_admin_settings_v3';

// Initial Demo Categories
const INITIAL_CATEGORIES = [
  'Ready-to-Wear Wigs',
  'Silk Styling Care',
  'HD Swiss Lace Frontals',
  'Lace Closures'
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
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return FEATURED_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      categoryName: p.category === 'Scarves' ? 'Silk Styling Care' : 'Ready-to-Wear Wigs',
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
    categoryName: categories[0] || 'Ready-to-Wear Wigs',
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

  // LocalStorage Sync
  useEffect(() => {
    try { localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)); } catch {}
  }, [orders]);

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
    try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings)); } catch {}
  }, [storeSettings]);

  // Click outside menu closer
  useEffect(() => {
    const handleOutside = () => setOpenKebabId(null);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

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
    triggerToast(`Order updated to: ${targetStatus || 'advanced'}`);
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
      categoryName: productForm.categoryName || categories[0] || 'Ready-to-Wear Wigs',
      price: parseFloat(productForm.price) || 200,
      stockCount: parseInt(productForm.stockCount) || 10,
      inStock: true,
      image: productForm.image || 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80&fm=webp',
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts([created, ...products]);
    setIsAddProductOpen(false);
    setProductForm({ name: '', categoryName: categories[0] || 'Ready-to-Wear Wigs', price: '', stockCount: 10, image: '' });
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
              {/* Brand Wordmark (Authentic Pinyon Script font matching live site header) */}
              <a
                href="#"
                className="adminBrandWordmark"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSwitchToStorefront) onSwitchToStorefront();
                  else onClose();
                }}
                title="House of Nina"
                aria-label="House of Nina"
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
            <span style={{ fontFamily: 'var(--font-script)', fontSize: '26px', color: 'var(--color-primary)' }}>
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
              { id: 'reviews', label: 'Reviews', icon: Star },
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

              {/* 4 Stats Cards */}
              <div className="statsGrid">
                <div className="statCard">
                  <div className="statTitle">Total Revenue</div>
                  <div className="statValue" style={{ fontSize: '1.75rem', color: 'var(--color-primary-800)' }}>
                    £{stats.totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="statTrend" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={13} /> {stats.paidOrdersCount} completed
                  </div>
                </div>

                <div className="statCard">
                  <div className="statTitle">Orders to Fulfill</div>
                  <div className="statValue">{stats.ordersRequiringAction}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('orders')} 
                    className="statLink"
                  >
                    View orders →
                  </button>
                </div>

                <div className="statCard">
                  <div className="statTitle">Catalog Products</div>
                  <div className="statValue">{stats.totalProducts}</div>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('products')} 
                    className="statLink"
                  >
                    Manage inventory →
                  </button>
                </div>

                <div className="statCard">
                  <div className="statTitle">Active Discounts</div>
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

              <div className="tableContainer">
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
                          <span className={`badge ${o.status}`}>{o.status}</span>
                        </td>
                        <td><strong>£{Number(o.total).toFixed(2)}</strong></td>
                        <td style={{ textAlign: 'right' }}>
                          {o.status === 'confirmed' && (
                            <button
                              type="button"
                              className="btnPrimary"
                              onClick={() => handleAdvanceLifeline(o.id, 'processing')}
                              style={{ fontSize: '0.78rem', padding: '5px 10px', minHeight: '30px' }}
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
                              style={{ fontSize: '0.78rem', padding: '5px 10px', minHeight: '30px' }}
                            >
                              Ship...
                            </button>
                          )}
                          {o.status === 'shipped' && (
                            <button
                              type="button"
                              className="btnSecondary"
                              onClick={() => handleAdvanceLifeline(o.id, 'delivered')}
                              style={{ fontSize: '0.78rem', padding: '5px 10px' }}
                            >
                              Deliver
                            </button>
                          )}
                          {o.status === 'delivered' && (
                            <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>✓ Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══════════════ TAB 2: ORDERS (CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED) ══════════════ */}
          {activeTab === 'orders' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Orders</h1>
                  <p className="pageSubtitle">Order Lifeline: Confirmed → Processing → Shipped → Delivered.</p>
                </div>
              </div>

              {/* Order Lifeline Tabs */}
              <div className="toolbar">
                <div className="tabs">
                  {[
                    { id: 'all', label: 'All Orders' },
                    { id: 'confirmed', label: 'Confirmed' },
                    { id: 'processing', label: 'Processing' },
                    { id: 'shipped', label: 'Shipped' },
                    { id: 'delivered', label: 'Delivered' },
                    { id: 'abandoned', label: `Abandoned (${orders.filter(o => o.status === 'abandoned').length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`tabBtn ${ordersStatusFilter === tab.id ? 'active' : ''}`}
                      onClick={() => setOrdersStatusFilter(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

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
                <div className="tableContainer">
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
                      {filteredOrders.map(order => (
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
                              {order.status}
                            </span>
                          </td>
                          <td>
                            {order.trackingNumber ? (
                              <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 600 }}>
                                {order.trackingNumber}
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.76rem', color: 'var(--color-text-tertiary)' }}>
                                —
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'right', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              {/* 1-Click Lifeline Advance Button */}
                              {order.status === 'confirmed' && (
                                <button
                                  type="button"
                                  className="btnPrimary"
                                  onClick={() => handleAdvanceLifeline(order.id, 'processing')}
                                  style={{ fontSize: '0.75rem', padding: '4px 8px', minHeight: '28px' }}
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
                                  style={{ fontSize: '0.75rem', padding: '4px 8px', minHeight: '28px' }}
                                >
                                  Ship
                                </button>
                              )}
                              {order.status === 'shipped' && (
                                <button
                                  type="button"
                                  className="btnSecondary"
                                  onClick={() => handleAdvanceLifeline(order.id, 'delivered')}
                                  style={{ fontSize: '0.75rem', padding: '4px 8px', minHeight: '28px' }}
                                >
                                  Deliver
                                </button>
                              )}

                              <button
                                type="button"
                                className="kebabTriggerBtn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenKebabId(openKebabId === order.id ? null : order.id);
                                }}
                              >
                                <MoreVertical size={16} />
                              </button>
                            </div>

                            {openKebabId === order.id && (
                              <div className="kebabMenu">
                                <button
                                  type="button"
                                  className="kebabItem"
                                  onClick={() => {
                                    setViewOrderDetails(order);
                                    setOpenKebabId(null);
                                  }}
                                >
                                  Lifeline &amp; Slip
                                </button>
                                <button
                                  type="button"
                                  className="kebabItem"
                                  onClick={() => {
                                    setEditingOrder({ ...order, customer: { ...order.customer } });
                                    setOpenKebabId(null);
                                  }}
                                >
                                  Edit Order Details
                                </button>
                                <button
                                  type="button"
                                  className="kebabItem kebabDelete"
                                  onClick={() => handleDeleteOrder(order.id)}
                                >
                                  Delete Order
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                      setProductForm({ name: '', categoryName: categories[0] || 'Ready-to-Wear Wigs', price: '', stockCount: 10, image: '' });
                      setIsAddProductOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              <div className="toolbar">
                <div className="tabs">
                  <button
                    type="button"
                    className={`tabBtn ${productsCategoryFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setProductsCategoryFilter('all')}
                  >
                    All Categories
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
                <div className="tableContainer">
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
                      {filteredProducts.map(prod => (
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
                            >
                              {prod.inStock && prod.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => setEditingProduct({ ...prod })}
                                title="Edit product"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => handleDeleteProduct(prod.id)}
                                title="Delete product"
                              >
                                <Trash2 size={14} color="#EF4444" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

              <div className="tableContainer">
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
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => {
                                  setEditingCategory(cat);
                                  setCategoryInputName(cat);
                                }}
                                title="Edit category name"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => handleDeleteCategory(cat)}
                                title="Delete category"
                              >
                                <Trash2 size={14} color="#EF4444" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                <div className="tableContainer">
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
                      {discounts.map(disc => (
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
                            >
                              {disc.status === 'active' ? 'Active' : 'Paused'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => setEditingDiscount({ ...disc })}
                                title="Edit discount"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                type="button"
                                className="actionBtn"
                                onClick={() => handleDeleteDiscount(disc.id)}
                                title="Delete code"
                              >
                                <Trash2 size={14} color="#EF4444" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ══════════════ TAB 6: REVIEWS ══════════════ */}
          {activeTab === 'reviews' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Reviews</h1>
                  <p className="pageSubtitle">Client ratings &amp; verified testimonials.</p>
                </div>
              </div>

              <div className="tableContainer">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Rating</th>
                      <th>Client</th>
                      <th>Feedback</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'rev-1', client: 'Zara M.', rating: 5, date: '2026-10-23', text: 'The Victoria Glass Bob is unmatched. Pre-plucked hairline melted seamlessly.', verified: true },
                      { id: 'rev-2', client: 'Amara O.', rating: 5, date: '2026-10-21', text: 'Silky smooth bone straight unit. 26 inches with true full density.', verified: true },
                      { id: 'rev-3', client: 'Elena R.', rating: 5, date: '2026-10-18', text: 'Mulberry silk scarves preserve my lace frontal perfectly every night.', verified: true }
                    ].map(rev => (
                      <tr key={rev.id}>
                        <td>
                          <div style={{ display: 'flex', gap: '2px', color: 'var(--color-accent)' }}>
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </td>
                        <td><strong>{rev.client}</strong></td>
                        <td style={{ fontSize: '0.86rem', maxWidth: '340px' }}>"{rev.text}"</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{rev.date}</td>
                        <td><span className="badge inStock">Verified Client</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

              <div className="tableContainer">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Subscriber</th>
                      <th>Email Address</th>
                      <th>List Type</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(sub => (
                      <tr key={sub.id}>
                        <td><strong>{sub.name}</strong></td>
                        <td>{sub.email}</td>
                        <td><span className="badge processing">{sub.type}</span></td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{sub.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══════════════ TAB 8: SETTINGS (FULL CRUD) ══════════════ */}
          {activeTab === 'settings' && (
            <>
              <div className="pageHeader">
                <div className="pageHeaderLeft">
                  <h1 className="pageTitle">Settings</h1>
                  <p className="pageSubtitle">Update store profile, contact hotlines, and shipping rates.</p>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '22px' }}>
                  <h3 style={{ fontSize: '1.05rem', margin: '0 0 14px 0', fontFamily: 'var(--font-heading)' }}>Store Profile</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Store Name</label>
                      <input 
                        type="text" 
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Headquarters Address</label>
                      <input 
                        type="text" 
                        value={storeSettings.headquarters}
                        onChange={(e) => setStoreSettings({ ...storeSettings, headquarters: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Support Email</label>
                      <input 
                        type="email" 
                        value={storeSettings.supportEmail}
                        onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>WhatsApp Concierge Hotline</label>
                      <input 
                        type="text" 
                        value={storeSettings.hotline}
                        onChange={(e) => setStoreSettings({ ...storeSettings, hotline: e.target.value })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '22px' }}>
                  <h3 style={{ fontSize: '1.05rem', margin: '0 0 14px 0', fontFamily: 'var(--font-heading)' }}>Shipping Rates Configuration</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Free Shipping Threshold (£)</label>
                      <input 
                        type="number" 
                        value={storeSettings.freeShippingThreshold}
                        onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Royal Mail 48 (£)</label>
                        <input 
                          type="number" 
                          step="0.5"
                          value={storeSettings.rateStandard}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rateStandard: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Royal Mail 24 (£)</label>
                        <input 
                          type="number" 
                          step="0.5"
                          value={storeSettings.rateExpress}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rateExpress: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>Special Delivery (£)</label>
                        <input 
                          type="number" 
                          step="0.5"
                          value={storeSettings.rateSpecial}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rateSpecial: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>DHL Express (£)</label>
                        <input 
                          type="number" 
                          step="0.5"
                          value={storeSettings.rateDhl}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rateDhl: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>
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
            <h2 className="modalTitle">Add Product</h2>
            <p className="modalText">Create a new hair unit or silk styling care product.</p>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Product Title</label>
                <input 
                  type="text" 
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. The Chelsea Raw Straight 30''"
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
                  <select 
                    value={productForm.categoryName}
                    onChange={(e) => setProductForm({ ...productForm, categoryName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Price (£ GBP)</label>
                  <input 
                    type="number" 
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="280"
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Image URL</label>
                  <input 
                    type="url" 
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">Create Product</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddProductOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="modalOverlay" onClick={() => setEditingProduct(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">Edit Product</h2>
            <p className="modalText">Update title, category, price, and stock count.</p>

            <form onSubmit={handleUpdateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Product Title</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
                  <select 
                    value={editingProduct.categoryName}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Price (£ GBP)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Image URL</label>
                  <input 
                    type="url" 
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {(isAddCategoryOpen || editingCategory) && (
        <div className="modalOverlay" onClick={() => { setIsAddCategoryOpen(false); setEditingCategory(null); }}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">{editingCategory ? 'Rename Category' : 'New Category'}</h2>
            <p className="modalText">{editingCategory ? `Update name for "${editingCategory}".` : 'Add a new product category.'}</p>

            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category Name</label>
                <input 
                  type="text" 
                  value={categoryInputName}
                  onChange={(e) => setCategoryInputName(e.target.value)}
                  placeholder="e.g. Silk Styling Care"
                  required
                  autoFocus
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">{editingCategory ? 'Save' : 'Create'}</button>
                <button type="button" className="modalBtnCancel" onClick={() => { setIsAddCategoryOpen(false); setEditingCategory(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DISCOUNT */}
      {isAddDiscountOpen && (
        <div className="modalOverlay" onClick={() => setIsAddDiscountOpen(false)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">New Discount Code</h2>
            <p className="modalText">Active discount codes will automatically show the privilege code box in the client cart.</p>

            <form onSubmit={handleCreateDiscount} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Discount Code</label>
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Type</label>
                  <select 
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  >
                    <option value="percentage">% Percentage Off</option>
                    <option value="fixed">£ Fixed Amount Off</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Value ({discountForm.type === 'percentage' ? '%' : '£'})</label>
                  <input 
                    type="number" 
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })}
                    placeholder="15"
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Min Spend (£)</label>
                  <input 
                    type="number" 
                    value={discountForm.minSpend}
                    onChange={(e) => setDiscountForm({ ...discountForm, minSpend: e.target.value })}
                    placeholder="100"
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Max Uses</label>
                  <input 
                    type="number" 
                    value={discountForm.maxUses}
                    onChange={(e) => setDiscountForm({ ...discountForm, maxUses: e.target.value })}
                    placeholder="100"
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">Activate Code</button>
                <button type="button" className="modalBtnCancel" onClick={() => setIsAddDiscountOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DISCOUNT */}
      {editingDiscount && (
        <div className="modalOverlay" onClick={() => setEditingDiscount(null)}>
          <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">Edit Discount Code</h2>
            <p className="modalText">Update code terms, value, or usage limits.</p>

            <form onSubmit={handleUpdateDiscount} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Code</label>
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Value ({editingDiscount.type === 'percentage' ? '%' : '£'})</label>
                  <input 
                    type="number" 
                    value={editingDiscount.value}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, value: parseFloat(e.target.value) || 0 })}
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Min Spend (£)</label>
                  <input 
                    type="number" 
                    value={editingDiscount.minSpend}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, minSpend: parseFloat(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Max Uses</label>
                  <input 
                    type="number" 
                    value={editingDiscount.maxUses}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, maxUses: parseInt(e.target.value) || 100 })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Status</label>
                  <select 
                    value={editingDiscount.status}
                    onChange={(e) => setEditingDiscount({ ...editingDiscount, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  >
                    <option value="active">Active (Visible in Cart)</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">Save Changes</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingDiscount(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SHIPPING DISPATCH (Advances Lifeline to Shipped) */}
      {isDispatchModalOpen && dispatchOrderTarget && (
        <div className="modalOverlay" onClick={() => setIsDispatchModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">Ship Order {dispatchOrderTarget.orderNumber}</h2>
            <p className="modalText">Assign courier partner and tracking code to advance lifeline to Shipped.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Courier Partner</label>
                <select 
                  value={dispatchCourier}
                  onChange={(e) => setDispatchCourier(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                >
                  <option value="Royal Mail Special Delivery">Royal Mail Special Delivery Guaranteed</option>
                  <option value="Royal Mail 24 Tracked">Royal Mail 24 Tracked</option>
                  <option value="DHL Express Worldwide">DHL Express Worldwide</option>
                  <option value="Addison Lee Direct Courier">Addison Lee Direct Courier</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Tracking Number</label>
                <input 
                  type="text" 
                  value={dispatchTrackingNum}
                  onChange={(e) => setDispatchTrackingNum(e.target.value)}
                  placeholder="e.g. RM-77219481-GB"
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                />
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
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ORDER DETAILS */}
      {editingOrder && (
        <div className="modalOverlay" onClick={() => setEditingOrder(null)}>
          <div className="editModalContent" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">Edit Order {editingOrder.orderNumber}</h2>
            <p className="modalText">Update recipient information, status, or fulfillment notes.</p>

            <form onSubmit={handleSaveOrderEdit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Recipient Name</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.fullName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, fullName: e.target.value } })}
                    required
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.phone}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, phone: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editingOrder.customer.email}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, email: e.target.value } })}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Street Address</label>
                <input 
                  type="text" 
                  value={editingOrder.customer.address}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, address: e.target.value } })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>City</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.city}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, city: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Postal Code</label>
                  <input 
                    type="text" 
                    value={editingOrder.customer.postalCode}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: { ...editingOrder.customer, postalCode: e.target.value } })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Lifeline Status</label>
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Tracking Number</label>
                  <input 
                    type="text" 
                    value={editingOrder.trackingNumber || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <div className="modalActions" style={{ marginTop: '8px' }}>
                <button type="submit" className="modalBtnSubmit">Save Order</button>
                <button type="button" className="modalBtnCancel" onClick={() => setEditingOrder(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS & LIFELINE TRACKER & PACKING SLIP */}
      {viewOrderDetails && (
        <div className="modalOverlay" onClick={() => setViewOrderDetails(null)}>
          <div className="editModalContent" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '14px' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>{viewOrderDetails.orderNumber}</h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  Placed on {new Date(viewOrderDetails.createdAt).toLocaleString('en-GB')}
                </span>
              </div>
              <button
                type="button"
                className="btnPrimary"
                onClick={() => window.print()}
                style={{ fontSize: '0.78rem', padding: '6px 12px', minHeight: '34px' }}
              >
                <Printer size={13} />
                <span>Print Slip</span>
              </button>
            </div>

            {/* Visual Lifeline Tracker (Confirmed -> Processing -> Shipped -> Delivered) */}
            <div className="lifelineContainer">
              <div className="lifelineBar" />
              {[
                { key: 'confirmed', label: '1. Confirmed', stepNum: 1 },
                { key: 'processing', label: '2. Processing', stepNum: 2 },
                { key: 'shipped', label: '3. Shipped', stepNum: 3 },
                { key: 'delivered', label: '4. Delivered', stepNum: 4 }
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px', fontSize: '0.85rem' }}>
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

            <table className="table" style={{ marginBottom: '14px' }}>
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Qty</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
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
                    <td>{it.quantity}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>£{(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Total: </span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>£{Number(viewOrderDetails.total).toFixed(2)}</strong>
              </div>
            </div>

            <div className="modalActions" style={{ marginTop: '16px' }}>
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
      )}

    </div>
  );
}
