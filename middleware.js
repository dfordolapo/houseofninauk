// Vercel Edge Middleware for Dynamic Social Previews (WhatsApp, iMessage, Twitter, Facebook)

const CRAWLER_USER_AGENTS = /bot|crawl|spider|whatsapp|facebookexternalhit|twitterbot|slackbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|applebot|discordbot/i;

const PRODUCTS_MAP = {
  'hn-01': {
    name: 'The Victoria Glass Bob',
    price: '£245',
    tag: 'Signature Wig',
    description: 'Handcrafted blunt glass bob with pre-plucked hairline and invisible HD lace. Designed in the UK.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-02': {
    name: 'The Silk Bone Straight 26"',
    price: '£360',
    tag: 'Bestseller Wig',
    description: 'Ultra-silky raw straight hair that stays bone flat with minimal heat. Full 200% density from root to tip.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-03': {
    name: 'The Soft Body Wave Unit',
    price: '£320',
    tag: 'Everyday Luxury',
    description: 'Classic loose wave with full body and natural movement. Undetectable Swiss HD frontal.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-04': {
    name: 'The Mulberry Silk Edge Scarf',
    price: '£28',
    tag: 'Pure Silk',
    description: '100% pure Mulberry silk scarf to melt lace edges, preserve wig styles, and prevent frizz overnight.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-05': {
    name: 'The Signature Monogram Headscarf',
    price: '£35',
    tag: 'Pure Silk',
    description: 'Versatile luxury silk square scarf for headwraps, wig protection, and effortless styling.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-06': {
    name: 'HD Lace Melt Elastic Band & Edge Brush',
    price: '£16',
    tag: 'Essential Add-on',
    description: 'Custom velvet-lined elastic melt band paired with dual-sided edge styling brush for flawless invisible installs.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  'hn-07': {
    name: 'Pure Mulberry Silk Sleeping Bonnet',
    price: '£26',
    tag: 'Essential Add-on',
    description: 'Reversible double-lined 100% Mulberry silk bonnet to seal in hydration, eliminate friction, and prolong wig longevity.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&h=630&q=85'
  }
};

const DEFAULT_METADATA = {
  title: 'House of Nina | Welcome to our House',
  description: 'House of Nina – A Nigerian-owned luxury hair studio serving the UK. Explore bone straight, body wave, deep curls, and custom coloured raw wigs.',
  image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&h=630&q=85',
  url: 'https://houseofnina.co.uk'
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isCrawler = CRAWLER_USER_AGENTS.test(userAgent);

  // If request is from a normal browser user, pass through directly to React SPA
  if (!isCrawler) {
    return;
  }

  const url = new URL(request.url);
  const productId = url.searchParams.get('product') || url.searchParams.get('id');
  const product = productId ? PRODUCTS_MAP[productId.toLowerCase()] : null;

  const title = product 
    ? `${product.name} (${product.price}) | House of Nina UK` 
    : DEFAULT_METADATA.title;

  const description = product 
    ? `${product.description} Available now with complimentary UK shipping.` 
    : DEFAULT_METADATA.description;

  const image = product ? product.image : DEFAULT_METADATA.image;
  const canonicalUrl = request.url;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph / WhatsApp / Facebook / Instagram -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="House of Nina UK">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">

  <link rel="canonical" href="${canonicalUrl}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <img src="${image}" alt="${title}">
  <script>window.location.replace("${canonicalUrl}");</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
}

export const config = {
  // Run middleware only for top-level pages and social links, ignoring static assets
  matcher: ['/((?!api|_next|assets|images|videos|favicon.ico|.*\\..*).*)', '/']
};
