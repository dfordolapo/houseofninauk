import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, MapPin, ExternalLink } from 'lucide-react';
import { lookupOrderByReference } from '../lib/supabase';

export default function TrackOrderModal({ isOpen, onClose }) {
  const [orderQuery, setOrderQuery] = useState('HN-8492');
  const [hasSearched, setHasSearched] = useState(true);
  const [isFound, setIsFound] = useState(true);
  const [activeOrder, setActiveOrder] = useState({
    orderNumber: 'HN-8492',
    status: 'shipped',
    itemTitle: 'The Victoria Glass Bob • 12" Swiss HD Lace',
    trackingNumber: 'RM-UK-8492100'
  });

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const raw = orderQuery.trim();
    if (!raw) return;

    setHasSearched(true);

    // 1. Check Supabase cloud database
    try {
      const { data, error } = await lookupOrderByReference(raw);
      if (data && !error) {
        const firstItem = Array.isArray(data.cart_items) && data.cart_items[0];
        const itemTitle = firstItem ? `${firstItem.name || 'Custom Wig'}${firstItem.selectedLength ? ` • ${firstItem.selectedLength}` : ''}` : 'Bespoke Order';
        setActiveOrder({
          orderNumber: data.reference,
          status: (data.fulfillment_status || 'confirmed').toLowerCase(),
          itemTitle,
          trackingNumber: data.tracking_number || ''
        });
        setIsFound(true);
        return;
      }
    } catch (err) {
      console.warn('Supabase lookup notice:', err);
    }

    // 2. Check local client storage
    try {
      const local = JSON.parse(localStorage.getItem('house_of_nina_client_orders') || '[]');
      const match = local.find(o => 
        (o.orderNumber && o.orderNumber.toUpperCase() === raw.toUpperCase()) ||
        (o.id && o.id.toUpperCase() === raw.toUpperCase())
      );
      if (match) {
        const firstItem = Array.isArray(match.items) && match.items[0];
        setActiveOrder({
          orderNumber: match.orderNumber || match.id,
          status: (match.status || 'confirmed').toLowerCase(),
          itemTitle: firstItem ? `${firstItem.name || 'Custom Wig'}${firstItem.selectedLength ? ` • ${firstItem.selectedLength}` : ''}` : 'Bespoke Order',
          trackingNumber: match.trackingNumber || ''
        });
        setIsFound(true);
        return;
      }
    } catch {}

    // 3. Fallback demo order check (HN-8492)
    const q = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (q === 'HN8492' || q === '8492' || (q.startsWith('HN') && q.length >= 6)) {
      setActiveOrder({
        orderNumber: raw.toUpperCase(),
        status: 'shipped',
        itemTitle: 'The Victoria Glass Bob • 12" Swiss HD Lace',
        trackingNumber: 'RM-UK-8492100'
      });
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  };

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div 
        className="modal-dialog track-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true" 
        aria-label="Track Your Order Concierge"
      >
        {/* HEADER */}
        <div className="track-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span className="section-label" style={{ margin: 0 }}>Order Dispatch</span>
              <span style={{ fontSize: '11px', color: '#8C8074' }}>• Realtime Tracking</span>
            </div>
            <h2 className="track-title">
              Track Your Order
            </h2>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Tracking Modal"
            style={{ position: 'static', margin: 0, width: '36px', height: '36px' }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* SEARCH FORM */}
        <div className="track-search-bar">
          <form onSubmit={handleSearch} className="track-search-form">
            <div className="track-search-input-wrap">
              <Search 
                size={15} 
                color="#8C8074" 
                style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} 
              />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Order # (e.g. HN-8492) or Email"
                className="track-search-input"
              />
            </div>
            <button
              type="submit"
              className="btn-primary-editorial track-search-btn"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* TRACKING PROGRESS CONTENT */}
        <div className="track-body">
          {/* EMPTY / NOT FOUND STATE */}
          {hasSearched && !isFound && (
            <div style={{ textAlign: 'center', padding: '44px 20px', color: 'var(--color-espresso-muted)' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(235, 219, 197, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: '#8C8074'
              }}>
                <Search size={26} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-deep-espresso)', marginBottom: '8px' }}>
                Order Not Found
              </h3>
              <p style={{ fontSize: '13px', color: '#7A6E62', maxWidth: '320px', margin: '0 auto 18px', lineHeight: 1.5 }}>
                We could not find an order with that reference. Please check the number and try again.
              </p>
              <button
                type="button"
                className="btn-outline-editorial"
                onClick={() => {
                  setOrderQuery('HN-8492');
                  setIsFound(true);
                }}
                style={{ fontSize: '11.5px', padding: '8px 18px' }}
              >
                Try sample order: HN-8492
              </button>
            </div>
          )}

          {hasSearched && isFound && (
            <div>
              {/* Order Meta Box */}
              <div className="track-order-card">
                <div className="track-order-card-header">
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8074', fontWeight: 600, display: 'block' }}>
                      Active Order
                    </span>
                    <h3 className="track-order-card-id">
                      #{activeOrder.orderNumber || orderQuery.toUpperCase() || 'HN-8492'}
                    </h3>
                  </div>

                  <span className="track-order-status-badge">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#28A745' }} />
                    {activeOrder.status === 'delivered' ? 'Delivered' : activeOrder.status === 'shipped' ? 'Dispatched' : activeOrder.status === 'processing' ? 'Handcrafting' : 'Confirmed'}
                  </span>
                </div>

                <div className="track-order-card-desc">
                  {activeOrder.itemTitle || 'House of Nina Bespoke Unit'}
                </div>

                <div className="track-order-card-est">
                  <Clock size={12} color="#8C8074" />
                  <span>Est. Arrival: Next Working Day (Royal Mail by 1pm)</span>
                </div>
              </div>

              {/* TIMELINE STEPS */}
              <div className="track-timeline">
                {/* Connecting Vertical Line */}
                <div className="track-timeline-line" />

                {/* Step 1: Confirmed */}
                <div className="track-timeline-step">
                  <div className="track-step-dot" style={{ backgroundColor: '#2E7D32' }}>
                    <CheckCircle2 size={13} />
                  </div>
                  <div>
                    <strong className="track-step-title">
                      Order Placed &amp; Payment Verified
                    </strong>
                    <span className="track-step-desc">
                      Payment authorized via secure checkout. Order entered queue.
                    </span>
                  </div>
                </div>

                {/* Step 2: Customization & Hand-Styling */}
                <div className="track-timeline-step">
                  <div className="track-step-dot" style={{ backgroundColor: '#2E7D32' }}>
                    <CheckCircle2 size={13} />
                  </div>
                  <div>
                    <strong className="track-step-title">
                      London Studio Hand-Plucking &amp; Styling
                    </strong>
                    <span className="track-step-desc">
                      Knots bleached, hairline plucked, and raw hair steam-treated.
                    </span>
                  </div>
                </div>

                {/* Step 3: Dispatched */}
                <div className="track-timeline-step">
                  <div className="track-step-dot" style={{ backgroundColor: '#C7A46A', boxShadow: '0 0 0 3px rgba(199, 164, 106, 0.25)' }}>
                    <Truck size={12} />
                  </div>
                  <div>
                    <strong className="track-step-title">
                      Dispatched with Royal Mail Special Delivery
                    </strong>
                    <span className="track-step-desc">
                      Tracking: <strong>GB729481029UK</strong> • Handed over to courier.
                    </span>
                  </div>
                </div>

                {/* Step 4: Final Delivery */}
                <div className="track-timeline-step" style={{ opacity: 0.55 }}>
                  <div className="track-step-dot" style={{ backgroundColor: '#E0D6C8', color: '#8C8074' }}>
                    <MapPin size={12} />
                  </div>
                  <div>
                    <strong className="track-step-title">
                      Delivered &amp; Signed
                    </strong>
                    <span className="track-step-desc">
                      Expected by 1:00 PM next business day.
                    </span>
                  </div>
                </div>
              </div>

              {/* Courier Tracking Action Box */}
              <div className="track-courier-card">
                <div>
                  <span style={{ fontSize: '10.5px', color: '#8C8074', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                    Courier Reference
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-deep-espresso)' }}>
                    Royal Mail Special Delivery (1pm)
                  </div>
                </div>

                <a 
                  href="https://www.royalmail.com/track-your-item" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline-editorial track-courier-btn"
                >
                  <span>Open Royal Mail Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="track-footer">
          <div className="track-footer-help">
            <span>Need assistance?</span>
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
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
