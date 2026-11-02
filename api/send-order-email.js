/**
 * ============================================================================
 * HOUSE OF NINA: ORDER NOTIFICATION & CONFIRMATION EMAIL API
 * ============================================================================
 * Sends a clean, direct order notification email via Resend when an order
 * is placed on the site.
 * 
 * Target recipient: Client / Store Owner (and optional customer confirmation)
 * Format: No large header blocks, no eyebrow tagline, straight to body details.
 * ============================================================================
 */

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    orderNumber = 'HON-ORDER',
    clientName = 'Valued Customer',
    customerEmail = '',
    phone = '',
    shippingAddress = null,
    items = [],
    total = 0,
    currency = 'GBP',
    paymentMethod = 'Online Card Payment',
    subtotal = 0,
    shippingCost = 0
  } = req.body || {};

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('[House of Nina Email] RESEND_API_KEY is not configured in Vercel environment.');
    return res.status(200).json({
      success: true,
      provider: 'simulated',
      message: 'Email simulated. Add RESEND_API_KEY in Vercel to send live emails.'
    });
  }

  // Recipient: Owner email configured in Vercel, or registered Resend account email
  const ownerRecipient = process.env.ORDER_ALERT_EMAIL || 'houseofnina2026@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'House of Nina <onboarding@resend.dev>';

  const subject = `New Order Placed: #${orderNumber} (${currency === 'GBP' ? '£' : currency}${Number(total).toFixed(2)})`;

  // Format currency
  const formatMoney = (val) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '';
    return `${symbol}${Number(val || 0).toFixed(2)}`;
  };

  // Clean, Direct HTML Email Template (No large banners, no eyebrow text)
  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 24px 16px; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1614; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #EAE0D5; padding: 32px 28px; box-sizing: border-box; }
    .title { font-size: 19px; font-weight: 700; color: #1C1614; margin: 0 0 16px 0; }
    .lead-text { font-size: 14.5px; line-height: 1.6; color: #3A302A; margin: 0 0 20px 0; }
    .summary-card { background-color: #FAF6F0; border: 1px solid #E5D9CC; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .card-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13.5px; }
    .card-label { color: #7A6E62; font-weight: 500; }
    .card-val { color: #1C1614; font-weight: 600; }
    .items-list { margin-top: 20px; border-top: 1px solid #EAE0D5; padding-top: 18px; }
    .items-heading { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #1C1614; margin-bottom: 12px; }
    .item-row { font-size: 13.5px; color: #3A302A; margin-bottom: 10px; line-height: 1.5; }
    .address-card { background-color: #FFFFFF; border: 1px dashed #D6C7B8; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 13px; color: #4A3E39; line-height: 1.5; }
    .sign-off { margin-top: 26px; padding-top: 18px; border-top: 1px solid #EAE0D5; font-size: 13px; color: #6E6156; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h2 class="title">New Order Received: #${orderNumber}</h2>

    <p class="lead-text">
      An order has been successfully placed on House of Nina. Here are the order details:
    </p>

    <!-- Order Overview -->
    <div class="summary-card">
      <div class="card-row">
        <span class="card-label">Order Number:</span>
        <span class="card-val">#${orderNumber}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Client Name:</span>
        <span class="card-val">${clientName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Client Email:</span>
        <span class="card-val">${customerEmail || 'Not provided'}</span>
      </div>
      ${phone ? `
      <div class="card-row">
        <span class="card-label">Client Phone:</span>
        <span class="card-val">${phone}</span>
      </div>
      ` : ''}
      <div class="card-row">
        <span class="card-label">Payment Method:</span>
        <span class="card-val">${paymentMethod}</span>
      </div>
      <div class="card-row" style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #D6C7B8;">
        <span class="card-label" style="font-weight: 700; color: #1C1614;">Total Paid:</span>
        <span class="card-val" style="font-size: 16px; font-weight: 700; color: #1C1614;">${formatMoney(total)}</span>
      </div>
    </div>

    <!-- Items Ordered -->
    ${items && items.length > 0 ? `
    <div class="items-list">
      <div class="items-heading">Items Ordered (${items.length})</div>
      ${items.map(it => `
        <div class="item-row">
          <strong>${it.name || it.title || 'Luxury Hair Unit'}</strong>
          ${it.selectedLength ? ` • ${it.selectedLength}` : ''}
          ${it.selectedLace ? ` (${it.selectedLace})` : ''}
          ${it.quantity ? ` × ${it.quantity}` : ' × 1'}
          <br>
          <span style="color: #7A6E62; font-size: 12.5px;">Price: ${formatMoney((it.price || 0) * (it.quantity || 1))}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Delivery Address -->
    ${shippingAddress ? `
    <div class="items-heading" style="margin-top: 20px;">Delivery Address</div>
    <div class="address-card">
      <strong>${shippingAddress.fullName || clientName}</strong><br>
      ${shippingAddress.address || ''}<br>
      ${shippingAddress.city || ''}${shippingAddress.state ? `, ${shippingAddress.state}` : ''} ${shippingAddress.postalCode || ''}<br>
      ${shippingAddress.country || 'United Kingdom'}
    </div>
    ` : ''}

    <div class="sign-off">
      House of Nina Management &amp; Studio System<br>
      Automated Order Notification
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [ownerRecipient],
        subject: subject,
        html: emailHtml
      })
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.warn('[Resend Order Notification Error]:', resendData);
      return res.status(200).json({
        success: false,
        warning: resendData.message,
        orderNumber
      });
    }

    console.log(`[House of Nina] Order notification email sent to ${ownerRecipient} (ID: ${resendData.id})`);
    return res.status(200).json({
      success: true,
      provider: 'resend',
      id: resendData.id,
      recipient: ownerRecipient,
      orderNumber
    });
  } catch (err) {
    console.error('[Resend Notification Exception]:', err);
    return res.status(500).json({ error: 'Failed to dispatch order notification email.' });
  }
}
