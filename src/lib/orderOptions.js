export const CAP_SIZES = ['Small (21")', 'Medium (22")', 'Large (23")', 'Custom'];

export const PARTING_OPTIONS = ['Middle Part', 'Left Part', 'Right Part', 'Free Part', 'C Part'];

const DISCOUNTS_STORAGE_KEY = 'house_of_nina_admin_discounts_v3';

const FALLBACK_DISCOUNTS = [
  {
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
    code: 'VIP15',
    type: 'percentage',
    value: 15,
    minSpend: 300,
    usageCount: 18,
    maxUses: 50,
    status: 'active',
    expiresAt: '2026-11-30'
  }
];

export function getItemCustomizationSummary(item) {
  const customization = item?.customization;
  if (!customization) return '';

  const parts = [];
  if (customization.capSize) parts.push(`Cap: ${customization.capSize}`);
  if (customization.parting) parts.push(`Parting: ${customization.parting}`);
  if (customization.lagosHairline) parts.push(`Lagos hairline: ${customization.lagosHairline}`);
  const trimLace = customization.trimLace || customization.ripOffLace;
  if (trimLace) parts.push(`Trim lace: ${trimLace}`);

  return parts.join(' • ');
}

export function getItemCustomizationText(item) {
  const summary = getItemCustomizationSummary(item);
  const note = item?.customization?.note?.trim();
  return [summary, note ? `Note: ${note}` : ''].filter(Boolean).join(' | ');
}

export function getAvailableDiscounts() {
  const byCode = new Map(FALLBACK_DISCOUNTS.map(discount => [discount.code, discount]));

  try {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(DISCOUNTS_STORAGE_KEY) || '[]');
      if (Array.isArray(stored)) {
        stored.forEach(discount => {
          if (discount?.code) byCode.set(String(discount.code).toUpperCase().trim(), discount);
        });
      }
    }
  } catch {}

  return [...byCode.values()];
}

export function validateDiscountCode(rawCode, subtotal = 0) {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!code) return { ok: false, message: 'Enter a discount code.' };

  const discount = getAvailableDiscounts().find(entry => String(entry.code || '').toUpperCase().trim() === code);
  if (!discount) return { ok: false, message: `Code "${code}" is not recognised.` };
  if (discount.status && discount.status !== 'active') return { ok: false, message: `Code "${code}" is no longer active.` };

  if (discount.expiresAt) {
    const expires = new Date(`${String(discount.expiresAt).slice(0, 10)}T23:59:59`);
    if (!Number.isNaN(expires.getTime()) && expires < new Date()) {
      return { ok: false, message: `Code "${code}" has expired.` };
    }
  }

  const usageCount = Number(discount.usageCount || 0);
  const maxUses = Number(discount.maxUses || 0);
  if (maxUses > 0 && usageCount >= maxUses) {
    return { ok: false, message: `Code "${code}" has reached its usage limit.` };
  }

  const minSpend = Number(discount.minSpend || 0);
  if (subtotal < minSpend) {
    return { ok: false, message: `Spend at least £${minSpend.toFixed(2)} to use ${code}.` };
  }

  const value = Number(discount.value || 0);
  const isFixed = discount.type === 'fixed' || discount.type === 'amount';
  const amount = isFixed ? value : subtotal * (value / 100);

  return {
    ok: true,
    code,
    amount: Math.max(0, Math.round(amount * 100) / 100),
    label: isFixed ? `£${value.toFixed(2)} off` : `${value}% off`
  };
}
