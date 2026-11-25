import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LOCATIONS, getStoredLocation, saveVisitorLocation, subscribeToLocation } from '../lib/location';

export default function VisitorLocation() {
  const [location, setLocation] = useState(() => getStoredLocation() || SUPPORTED_LOCATIONS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const sync = () => setLocation(getStoredLocation() || SUPPORTED_LOCATIONS[0]);
    return subscribeToLocation(sync);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const menuWidth = Math.min(260, window.innerWidth - 24);
      const rawLeft = rect.right - menuWidth;
      const left = Math.max(12, Math.min(rawLeft, window.innerWidth - menuWidth - 12));
      const spaceBelow = window.innerHeight - rect.bottom - 16;
      const spaceAbove = rect.top - 16;
      const openUpward = spaceBelow < 220 && spaceAbove > spaceBelow;

      setMenuStyle({
        position: 'fixed',
        left: `${left}px`,
        width: `${menuWidth}px`,
        zIndex: 100000,
        ...(openUpward
          ? {
              bottom: `${window.innerHeight - rect.top + 8}px`,
              top: 'auto',
              maxHeight: `${Math.min(320, Math.max(140, spaceAbove))}px`,
            }
          : {
              top: `${rect.bottom + 8}px`,
              bottom: 'auto',
              maxHeight: `${Math.min(320, Math.max(140, spaceBelow))}px`,
            }),
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      const inTrigger = wrapperRef.current && wrapperRef.current.contains(event.target);
      const inMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!inTrigger && !inMenu) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    setLocation(saveVisitorLocation(option.code, option.name));
    setIsOpen(false);
  };

  return (
    <div className="visitor-location" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className="visitor-location-trigger"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-label="Change delivery location"
      >
        <MapPin size={11} />
        <span>Delivering to {location.name} ({location.currency})</span>
        <ChevronDown size={11} className={isOpen ? 'is-open' : ''} />
      </button>

      {isOpen && createPortal(
        <div
          ref={menuRef}
          className="visitor-location-menu visitor-location-menu-portal"
          role="listbox"
          style={menuStyle || { position: 'fixed', zIndex: 100000, visibility: 'hidden' }}
        >
          <p className="visitor-location-menu-title">Choose your location</p>
          <div className="visitor-location-options">
            {SUPPORTED_LOCATIONS.map(option => (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={option.code === location.code}
                className={`visitor-location-option ${option.code === location.code ? 'is-active' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span>{option.name}</span>
                <span className="visitor-location-option-currency">{option.currency}</span>
                {option.code === location.code && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
