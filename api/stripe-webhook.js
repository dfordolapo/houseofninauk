import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to buffer the raw request stream
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY is not configured.' });
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    const rawBody = await getRawBody(req);

    if (webhookSecret && signature) {
      // Cryptographically verify signature
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Fallback for development/testing if webhook secret isn't configured yet
      event = JSON.parse(rawBody.toString('utf8'));
      console.warn('[House of Nina Webhook] Processing event without signature verification (missing STRIPE_WEBHOOK_SECRET).');
    }
  } catch (err) {
    console.error(`[House of Nina Webhook Signature Error]: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Initialize Supabase admin client if service role key is present
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const supabase = (supabaseUrl && serviceRoleKey) ? createClient(supabaseUrl, serviceRoleKey) : null;

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderRef = paymentIntent.metadata?.orderReference;

        console.log(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} succeeded for Order ${orderRef || 'N/A'}`);

        if (supabase && orderRef) {
          const { error } = await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              fulfillment_status: 'Confirmed',
              stripe_payment_intent_id: paymentIntent.id,
              updated_at: new Date().toISOString()
            })
            .eq('reference', orderRef);

          if (error) {
            console.warn(`[Stripe Webhook] Could not update order ${orderRef} in Supabase:`, error.message);
          } else {
            console.log(`[Stripe Webhook] Successfully marked order ${orderRef} as paid in Supabase.`);
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const orderRef = paymentIntent.metadata?.orderReference;
        console.warn(`[Stripe Webhook] Payment failed for Order ${orderRef}:`, paymentIntent.last_payment_error?.message);

        if (supabase && orderRef) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('reference', orderRef);
        }
        break;
      }

      default:
        // Acknowledge receipt of other events
        break;
    }

    return res.status(200).json({ received: true });
  } catch (handlerErr) {
    console.error('[Stripe Webhook Processing Error]:', handlerErr);
    // Return 200 so Stripe doesn't continuously spam retries for internal logic issues
    return res.status(200).json({ received: true, error: handlerErr.message });
  }
}
