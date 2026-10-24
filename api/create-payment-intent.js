import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

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

  if (!stripe) {
    return res.status(500).json({ 
      error: 'Stripe secret key not configured on server. Please set STRIPE_SECRET_KEY in Vercel environment variables.' 
    });
  }

  try {
    const { 
      cartItems = [], 
      shippingOption = {}, 
      customer = {}, 
      orderReference,
      currency = 'GBP' 
    } = req.body || {};

    // Calculate subtotal from items
    const subtotal = cartItems.reduce((acc, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || 1);
      return acc + (price * qty);
    }, 0);

    const shippingPrice = Number(shippingOption.price || 0);
    const totalAmount = subtotal + shippingPrice;

    // Minimum charge check (e.g. £0.50 minimum for Stripe)
    if (totalAmount <= 0) {
      return res.status(400).json({ error: 'Order total must be greater than zero.' });
    }

    // Stripe amount in lowest currency denomination (pence for GBP, cents for USD/EUR)
    const amountInMinorUnits = Math.round(totalAmount * 100);

    // Create PaymentIntent with modern automated payment methods (Apple Pay, Google Pay, Cards, Klarna)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        orderReference: orderReference || `HON-${Date.now().toString().slice(-5)}`,
        customerName: customer.name || 'Client',
        customerEmail: customer.email || '',
        customerPhone: customer.phone || '',
        shippingAddressLine1: customer.address?.line1 || '',
        shippingPostalCode: customer.address?.postalCode || '',
        shippingCountry: customer.address?.country || 'GB',
        itemCount: String(cartItems.length)
      },
      description: `House of Nina London — Order ${orderReference || ''}`
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      currency: currency.toUpperCase()
    });
  } catch (error) {
    console.error('[House of Nina Stripe Error]:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to initialize payment intent with Stripe.' 
    });
  }
}
