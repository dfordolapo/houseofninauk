// Central Data Configuration for House of Nina: "Welcome to the Wigverse"

export const BRAND_INFO = {
  name: "House of Nina",
  handle: "@houseofnina",
  tagline: "Welcome to our Wigverse",
  locationBadge: "United Kingdom",
  currency: "GBP",
  currencySymbol: "£",
  freeShippingThreshold: 100,
  announcement: "UK Orders · Free shipping over £100"
};

export const NAV_LINKS = [
  { id: "shop", label: "Shop", href: "#find-your-next-look" },
  { id: "wigs-scarves", label: "Collections", href: "#featured-products" },
  { id: "our-story", label: "Our Story", href: "#our-story" },
  { id: "wig-care", label: "Care Guide", href: "#wig-care-guide" },
  { id: "contact", label: "Contact", href: "#contact" }
];

// THE HOUSE COLLECTIONS: Curated Showcase Data
export const HOUSE_COLLECTIONS_CONFIG = {
  titlePrefix: "The House ",
  titleGold: "Collections",
  subtitle: "Explore our signature crown units and lustrous protective silks, made to elevate everyday elegance.",
  navLabel: "Collections",
  pageTabs: [
    { id: "all", label: "All Pieces", filterValue: "All" },
    { id: "wigs", label: "Wigs & Units", filterValue: "Wigs" },
    { id: "scarves", label: "Silk Scarves", filterValue: "Scarves" },
    { id: "accessories", label: "Accessories", filterValue: "Accessories" }
  ]
};

export const HOUSE_COLLECTION_CARDS = [
  {
    id: "col-wigs",
    title: "Wigs & Units",
    categoryFilter: "Wigs",
    badge: "100% Virgin Hair",
    tagline: "Handcrafted Luxury Units",
    description: "Handcrafted virgin units with pre-plucked hairlines and undetectable Swiss HD lace frontals.",
    highlights: ["13x4 / 13x6 HD Swiss Lace", "Pre-plucked natural hairlines", "180% – 200% fullness"],
    itemCount: "3 Signature Styles",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80",
    buttonLabel: "Explore Wigs & Units"
  },
  {
    id: "col-scarves",
    title: "Silk Scarves",
    categoryFilter: "Scarves",
    badge: "Pure Mulberry Silk",
    tagline: "Protective Styling & Edge Care",
    description: "Pure Mulberry silk edge-melting bands and twill wraps to preserve lace and seal in hydration.",
    highlights: ["100% Pure Mulberry Silk", "Frizz prevention & edge melting", "Day-to-night versatile styling"],
    itemCount: "Silk Care Editions",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
    buttonLabel: "Explore Silk Scarves"
  },
  {
    id: "col-accessories",
    title: "Accessories",
    categoryFilter: "Accessories",
    badge: "Install & Maintenance",
    tagline: "Essential Installation Tools",
    description: "Velvet-lined elastic lace melt bands, precision edge brushes, and double-layered sleeping bonnets.",
    highlights: ["Seamless 10-min lace melt", "Zero tension elastic comfort", "Double-lined friction defence"],
    itemCount: "Care & Melt Essentials",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    buttonLabel: "Explore Accessories"
  }
];

// THREE VERTICAL EDITORIAL REELS: Wigs (Up), Scarves (Down), Accessories (Up)
export const COLLECTION_REELS_DATA = [
  {
    id: "wigs",
    title: "Wigs",
    categoryFilter: "Wigs",
    tagline: "Virgin Hair & HD Lace",
    countLabel: "3 Signature Units",
    direction: "up", // Left reel moves continuously upward
    speedClass: "speed-wigs",
    images: [
      {
        id: "w-1",
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
        alt: "The Victoria Glass Bob - Precision blunt cut with Swiss HD lace"
      },
      {
        id: "w-2",
        src: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80",
        alt: "The Silk Bone Straight - Single donor raw virgin hair"
      },
      {
        id: "w-3",
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
        alt: "The Soft Body Wave Unit - Undetectable hairline and natural bounce"
      },
      {
        id: "w-4",
        src: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
        alt: "Voluminous Curls - Pre-plucked natural hairline"
      },
      {
        id: "w-5",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        alt: "Signature HD Lace Frontal Unit - Seamless melted scalp finish"
      }
    ]
  },
  {
    id: "scarves",
    title: "Scarves",
    categoryFilter: "Scarves",
    tagline: "100% Mulberry Silk",
    countLabel: "Protective Silks",
    direction: "down", // Middle reel moves continuously downward
    speedClass: "speed-scarves",
    images: [
      {
        id: "s-1",
        src: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
        alt: "The Mulberry Silk Edge Scarf - Lace melting and edge protection"
      },
      {
        id: "s-2",
        src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        alt: "Signature Monogram Headscarf - 100% twill silk square wrap"
      },
      {
        id: "s-3",
        src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80",
        alt: "Pure Mulberry Silk Draping - Soft lustre and friction protection"
      },
      {
        id: "s-4",
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
        alt: "Lustrous Silk Weave Fabric - Breathable hair preservation texture"
      }
    ]
  },
  {
    id: "accessories",
    title: "Accessories",
    categoryFilter: "Accessories",
    tagline: "Essential Installation Tools",
    countLabel: "Care & Melt Essentials",
    direction: "up", // Right reel moves continuously upward
    speedClass: "speed-accessories",
    images: [
      {
        id: "a-1",
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        alt: "HD Lace Melt Elastic Band & Edge Brush - 10-minute seamless lay"
      },
      {
        id: "a-2",
        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        alt: "Pure Mulberry Silk Sleeping Bonnet - Double-layered hydration lock"
      },
      {
        id: "a-3",
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
        alt: "Salon-Grade Installation & Care Tools - Professional wig upkeep"
      },
      {
        id: "a-4",
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        alt: "Velvet-lined elastic band for zero tension lace adhesion"
      }
    ]
  }
];

// THE FLOATING SHOWROOM: Curated Sculptural Environment (Wigs, Scarves, Accessories)
export const FLOATING_SHOWROOM_DATA = [
  {
    id: "wigs",
    title: "Wigs",
    categoryFilter: "Wigs",
    subtitle: "LUXURY TEXTURES. TIMELESS STYLES.",
    actionLabel: "Explore Wigs",
    image: "/images/showroom/showroom-wigs.webp",
    alt: "Luxurious deep wavy human-hair wig on faceless mannequin head supported by slim champagne-gold metal stand",
    inset: {
      image: "/images/showroom/inset-wig-scalp.webp",
      alt: "Close-up undetectable Swiss HD lace hairline and scalp parting"
    }
  },
  {
    id: "scarves",
    title: "Scarves",
    categoryFilter: "Scarves",
    subtitle: "BOLD PRINTS. SILKY FINISHES.",
    actionLabel: "Explore Scarves",
    image: "/images/showroom/showroom-scarves.webp",
    alt: "Pure Mulberry silk scarf in flowing drape suspended on slender champagne-gold metal stand",
    inset: {
      image: "/images/showroom/inset-scarf-detail.webp",
      alt: "Close-up pure silk twill weave and liquid fabric sheen"
    }
  },
  {
    id: "accessories",
    title: "Accessories",
    categoryFilter: "Accessories",
    subtitle: "THE FINISHING TOUCH.",
    actionLabel: "Explore Accessories",
    image: "/images/showroom/showroom-accessories.webp",
    alt: "Curated styling accessories including silk scrunchies, tortoiseshell clip and gold jewelry on champagne-gold display tree",
    inset: null
  }
];



// HERO 9-CARD COMPOSITION with alternating image sets
export const HERO_NINE_TILES = [
  {
    id: "tile-1",
    label: "Bone Straight",
    accent: "sand",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-2",
    label: "Body Wave Silk",
    accent: "blush",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 18%"
  },
  {
    id: "tile-3",
    label: "Voluminous Curls",
    accent: "olive",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-4",
    label: "Honey Blonde #613",
    accent: "olive",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-5",
    label: "Snatched High Pony",
    accent: "sand",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-6",
    label: "Sleek Glass Bob",
    accent: "blush",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 20%"
  },
  {
    id: "tile-7",
    label: "Caramel Swirl Balayage",
    accent: "blush",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-8",
    label: "Burgundy Velvet 99J",
    accent: "olive",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  },
  {
    id: "tile-9",
    label: "Curly Topknot Updo",
    accent: "sand",
    doodle: "none",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=360&q=75&fm=webp",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=360&q=75&fm=webp"
    ],
    objectPosition: "50% 15%"
  }
];

// INSTAGRAM POST TILES (Realistic aesthetic social posts with product tags and customer reviews)
export const INSTA_POSTS = [
  {
    id: "ig-1",
    productName: "The Victoria Glass Bob",
    category: "Wigs",
    price: "£245",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=75&fm=webp",
    likes: "2,118",
    comments: "84",
    caption: "Sharp blunt perimeter, pure mirror glass reflection. Customised unit ready to wear. 🖤 #HouseOfNina #UKWigs",
    timeAgo: "2 HOURS AGO",
    isMultiple: false,
    reviewsList: [
      { id: "rev-1-1", author: "Maya T.", rating: 5, time: "35m ago", verified: true, text: "The sharp blunt cut is pure perfection! Lace melted into my scalp like butter." },
      { id: "rev-1-2", author: "Chloe B.", rating: 5, time: "2h ago", verified: true, text: "Best bob I have ever bought in the UK. Barely needs heat styling to stay pin-straight." },
      { id: "rev-1-3", author: "Eleanor S.", rating: 5, time: "4h ago", verified: true, text: "Lustre and weight are supreme. Got so many compliments in Mayfair!" }
    ]
  },
  {
    id: "ig-2",
    productName: "The Silk Bone Straight 26\"",
    category: "Wigs",
    price: "£360",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=75&fm=webp",
    likes: "3,490",
    comments: "142",
    caption: "Ultra-silky straight hair that moves effortlessly. Hand-finished lace closure. 👑",
    timeAgo: "1 DAY AGO",
    isMultiple: true,
    reviewsList: [
      { id: "rev-2-1", author: "Zainab K.", rating: 5, time: "1h ago", verified: true, text: "Silky and full all the way to the 26\" tips. Zero tangling even in London wind." },
      { id: "rev-2-2", author: "Sophia D.", rating: 5, time: "5h ago", verified: true, text: "The HD closure is truly invisible. Nina’s team has outdone themselves." },
      { id: "rev-2-3", author: "Tasha M.", rating: 5, time: "1d ago", verified: true, text: "10/10 quality. Moves so naturally." }
    ]
  },
  {
    id: "ig-3",
    productName: "The Mulberry Silk Edge Scarf",
    category: "Scarves",
    price: "£28",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=75&fm=webp",
    likes: "1,890",
    comments: "63",
    caption: "Melt your lace seamlessly and protect your edges overnight with 100% pure Mulberry silk. 🤍",
    timeAgo: "2 DAYS AGO",
    isMultiple: false,
    reviewsList: [
      { id: "rev-3-1", author: "Nia A.", rating: 5, time: "3h ago", verified: true, text: "The only scarf that properly melts lace edges without slipping off overnight." },
      { id: "rev-3-2", author: "Jessica R.", rating: 5, time: "1d ago", verified: true, text: "Pure silk luxury. My edges have never looked so neat." }
    ]
  },
  {
    id: "ig-4",
    productName: "The Soft Body Wave Unit",
    category: "Wigs",
    price: "£320",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=75&fm=webp",
    likes: "2,240",
    comments: "95",
    caption: "Soft bounce and effortless body wave. Handcrafted with love in the UK. 💫",
    timeAgo: "3 DAYS AGO",
    isMultiple: false,
    reviewsList: [
      { id: "rev-4-1", author: "Amara O.", rating: 5, time: "6h ago", verified: true, text: "The bounce stays even after washing! Super soft and minimal shedding." },
      { id: "rev-4-2", author: "Danielle P.", rating: 5, time: "2d ago", verified: true, text: "Worth every single pound. Feels like my own natural hair." }
    ]
  }
];

// CURATED PRODUCTS: Wigs and Luxury Silk Hair Scarves (UK Boutique)
export const FEATURED_PRODUCTS = [
  {
    id: "hn-01",
    name: "The Victoria Glass Bob",
    category: "Wigs",
    price: 245,
    rating: 5.0,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["10\"", "12\"", "14\""],
      laceTypes: ["13x4 HD Lace Frontal", "5x5 HD Closure"],
      densities: ["180%"]
    },
    tag: "Signature Wig",
    description: "Handcrafted blunt glass bob with pre-plucked hairline and invisible HD lace.",
    reviewsList: [
      { id: "rev-hn01-1", author: "Maya T.", rating: 5, time: "30m ago", verified: true, text: "The lace melted seamlessly! Looks completely natural even in daylight." },
      { id: "rev-hn01-2", author: "Chloe B.", rating: 5, time: "2h ago", verified: true, text: "Best hair purchase I've made this year. High density and minimal shedding." },
      { id: "rev-hn01-3", author: "Temi A.", rating: 5, time: "1d ago", verified: true, text: "Installed it glue-free for an event in Mayfair and received compliments all night." }
    ]
  },
  {
    id: "hn-02",
    name: "The Silk Bone Straight 26\"",
    category: "Wigs",
    price: 360,
    rating: 5.0,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["24\"", "26\"", "28\""],
      laceTypes: ["13x6 HD Swiss Lace", "5x5 HD Closure"],
      densities: ["200%"]
    },
    tag: "Bestseller Wig",
    description: "Ultra-silky raw straight hair that stays bone flat with minimal heat.",
    reviewsList: [
      { id: "rev-hn02-1", author: "Zainab K.", rating: 5, time: "5h ago", verified: true, text: "True raw hair. Stays silky and bone straight even in British humidity." },
      { id: "rev-hn02-2", author: "Blessing E.", rating: 5, time: "1d ago", verified: true, text: "The 200% density is full from root to tip. Worth every single penny." }
    ]
  },
  {
    id: "hn-03",
    name: "The Soft Body Wave Unit",
    category: "Wigs",
    price: 320,
    rating: 4.9,
    reviewsCount: 11,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["20\"", "24\""],
      laceTypes: ["13x4 HD Lace Frontal", "5x5 HD Closure"],
      densities: ["180%"]
    },
    tag: "Everyday Wig",
    description: "Classic loose wave with full body and natural movement.",
    reviewsList: [
      { id: "rev-hn03-1", author: "Amara O.", rating: 5, time: "6h ago", verified: true, text: "The bounce stays even after washing! Super soft and effortless." },
      { id: "rev-hn03-2", author: "Danielle P.", rating: 5, time: "2d ago", verified: true, text: "Worth every single pound. Feels like my own natural hair." }
    ]
  },
  {
    id: "hn-04",
    name: "The Mulberry Silk Edge Scarf",
    category: "Scarves",
    price: 28,
    rating: 5.0,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["Standard (6cm x 150cm)"],
      laceTypes: ["100% Mulberry Silk"],
      densities: ["19 Momme"]
    },
    tag: "Silk Scarf",
    description: "100% pure Mulberry silk scarf to melt lace edges, preserve wig styles, and prevent frizz overnight.",
    reviewsList: [
      { id: "rev-hn04-1", author: "Nia A.", rating: 5, time: "3h ago", verified: true, text: "The only scarf that properly melts lace edges without slipping off overnight." },
      { id: "rev-hn04-2", author: "Jessica R.", rating: 5, time: "1d ago", verified: true, text: "Pure silk luxury. My edges have never looked so neat." }
    ]
  },
  {
    id: "hn-05",
    name: "The Signature Monogram Headscarf",
    category: "Scarves",
    price: 35,
    rating: 5.0,
    reviewsCount: 16,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["Square (70cm x 70cm)"],
      laceTypes: ["100% Twill Silk"],
      densities: ["Lightweight"]
    },
    tag: "Silk Scarf",
    description: "Versatile luxury silk square scarf for headwraps, wig protection, and effortless styling.",
    reviewsList: [
      { id: "rev-hn05-1", author: "Folake O.", rating: 5, time: "4h ago", verified: true, text: "Very versatile. I wear it both out as a chic look and at night to protect my unit." }
    ]
  },
  {
    id: "hn-06",
    name: "HD Lace Melt Elastic Band & Edge Brush",
    category: "Accessories",
    price: 16,
    rating: 5.0,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["Adjustable Velcro"],
      laceTypes: ["Soft Stretch Band"],
      densities: ["Edge Styling Duo"]
    },
    tag: "Essential Add-on",
    description: "Custom velvet-lined elastic melt band paired with dual-sided edge styling brush for flawless invisible installs.",
    reviewsList: [
      { id: "rev-hn06-1", author: "Kemi D.", rating: 5, time: "1h ago", verified: true, text: "Lays my lace flat in 10 minutes without hair pulling or headache." }
    ]
  },
  {
    id: "hn-07",
    name: "Pure Mulberry Silk Sleeping Bonnet",
    category: "Accessories",
    price: 26,
    rating: 5.0,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=75&fm=webp",
    options: {
      lengths: ["XL Fit (All Wig Lengths)"],
      laceTypes: ["22 Momme Silk"],
      densities: ["Double-Layered"]
    },
    tag: "Essential Add-on",
    description: "Reversible double-lined 100% Mulberry silk bonnet to seal in hydration, eliminate friction, and prolong wig longevity.",
    reviewsList: [
      { id: "rev-hn07-1", author: "Sarah M.", rating: 5, time: "2h ago", verified: true, text: "The XL size actually fits all my 28-inch hair comfortably. No frizz in the morning!" }
    ]
  }
];

// BAG COMPLEMENTARY SUGGESTIONS (For Cross-sell / Upsell Modal)
export const BAG_SUGGESTIONS = [
  {
    id: "sug-1",
    name: "The Mulberry Silk Edge Scarf",
    category: "Scarves",
    price: 28,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80&fm=webp",
    badge: "Must-Have Pairing",
    reason: "Melts lace edges seamlessly & protects styles overnight."
  },
  {
    id: "sug-2",
    name: "HD Lace Melt Band & Edge Brush",
    category: "Accessories",
    price: 16,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80&fm=webp",
    badge: "Best Seller",
    reason: "Locks your lace down in 10 minutes with zero residue."
  },
  {
    id: "sug-3",
    name: "Pure Mulberry Silk Sleeping Bonnet",
    category: "Accessories",
    price: 26,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80&fm=webp",
    badge: "Hair Preserver",
    reason: "Prevents tangles and keeps hair silky smooth while sleeping."
  },
  {
    id: "sug-4",
    name: "The Victoria Glass Bob",
    category: "Wigs",
    price: 245,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80&fm=webp",
    badge: "Signature Look",
    reason: "The iconic precision blunt cut that turns heads everywhere."
  }
];

// ONE GIRL, MANY LOOKS
export const MOOD_COLLECTIONS = [
  {
    id: "everyday-fine",
    title: "Everyday Fine",
    subtitle: "Polished, wearable styles.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=75&fm=webp",
    accentColor: "sand",
    description: "Effortless 9-to-5 elegance, sharp precision bobs, and clean middle-part silhouettes designed for effortless day-to-night transitions.",
    suggestedStyles: ["Blunt 12\" Glass Bob", "22\" Body Wave Closure", "Natural Texture Press"],
    href: "#style-categories"
  },
  {
    id: "main-character",
    title: "Main Character",
    subtitle: "Statement wigs and dramatic volume.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=700&q=75&fm=webp",
    accentColor: "blush",
    description: "32-inch floor-skimming locks, 250% high-density deep waves, and unapologetic presence. When walking into the room is an event.",
    suggestedStyles: ["30\" Bone Straight Frontal", "28\" Island Deep Wave", "250% Volume Cascade"],
    href: "#featured-products"
  },
  {
    id: "new-hair-energy",
    title: "New Hair Energy",
    subtitle: "Blonde, coloured and experimental looks.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=75&fm=webp",
    accentColor: "olive",
    description: "Honey tones, burgundy wine, molten copper and custom Balayage. Reinvent your mood with professionally toned luxury hair.",
    suggestedStyles: ["Mayfair Honey Blonde", "Chelsea 99J Burgundy", "Ginger Caramel Swirl"],
    href: "#style-categories"
  }
];

// THE HOUSE OF NINA DIFFERENCE
export const BRAND_DETAILS = [
  {
    id: "detail-1",
    step: "01",
    title: "100% Raw & Virgin Selection",
    description: "Sourced from single donors with cuticles intact and unidirectionally aligned. Silky, full from root to tip, with zero synthetic fillers."
  },
  {
    id: "detail-2",
    step: "02",
    title: "Melted HD Swiss Lace",
    description: "Ultra-thin, undetectable transparent Swiss HD lace with micro-knots and pre-plucked, soft hairline graduation for an invisible scalp illusion."
  },
  {
    id: "detail-3",
    step: "03",
    title: "Tailored Multi-Cap Fit",
    description: "Ergonomically designed breathable mesh caps featuring adjustable silicone elastic security bands and combs for glueless confidence."
  },
  {
    id: "detail-4",
    step: "04",
    title: "Restyling Longevity",
    description: "Engineered to withstand heat styling up to 230°C, salon bleaching, dyeing, and washing while preserving cuticle health for 2–3+ years."
  }
];

// WIG CARE GUIDE DATA
export const CARE_GUIDE_DATA = {
  heading: "Love your wig. Keep the look.",
  supportingCopy: "",
  image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=75&fm=webp",
  tips: [
    {
      title: "Washing & Conditioning",
      text: "Wash every 10–15 wears in lukewarm water using sulphate-free shampoo. Always stroke downwards from root to ends without bunching."
    },
    {
      title: "Lace Preservation",
      text: "Clean adhesive residue gently using 90%+ isopropyl alcohol or lace release spray. Never scrub the delicate lace grid directly."
    },
    {
      title: "Heat & Styling Safety",
      text: "Always apply a lightweight thermal heat protectant before heat styling. Keep flat irons and curling wands under 200°C for raw hair."
    },
    {
      title: "Night Storage & Silk Care",
      text: "Store your unit on a satin mannequin head or in a breathable silk pouch. For sewn-down units, sleep in a 100% mulberry silk scarf."
    }
  ]
};

// OUR STORY DATA (United Kingdom Handcrafted Luxury)
export const STORY_DATA = {
  heading: "A little more about House of Nina.",
  badge: "British Craftsmanship • Handcrafted in the UK",
  content: [
    "Founded in the United Kingdom, House of Nina was created to redefine luxury hair through uncompromising British craftsmanship and editorial precision.",
    "We reject mass-produced, chemically stripped hair. Every House of Nina unit is sculpted from verified single-donor raw hair, paired with featherweight Swiss HD lace, and hand-plucked strand by strand in our UK studio for an undetectable hairline.",
    "The Wigverse is our world: bespoke units crafted to give you effortless confidence, pure movement, and everyday ease."
  ],
  image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=75&fm=webp",
  quote: "“Your hair is not an accessory, it is your crown, your mood, and your confidence in motion.”",
  author: "House of Nina Studio, United Kingdom"
};

// VERIFIED CUSTOMER REVIEWS
export const CUSTOMER_REVIEWS = [
  {
    id: "rev-1",
    author: "Temi A.",
    city: "London, UK",
    rating: 5,
    hairPurchased: "The Victoria Glass Bob • 12\" HD",
    quote: "The lace is literally transparent. I installed it without glue for an event in Mayfair and received compliments all night. The hair moves like silk.",
    mobileQuote: "The lace is literally transparent. Installed without glue for Mayfair, compliments all night...",
    date: "Verified UK Buyer"
  },
  {
    id: "rev-2",
    author: "Zainab K.",
    city: "Manchester, UK",
    rating: 5,
    hairPurchased: "The Lekki Silk Bone Straight • 28\"",
    quote: "Usually bone straight hair tangles after a week in UK weather, but House of Nina’s raw hair is on another level. Comb slips right through!",
    mobileQuote: "Usually bone straight tangles in UK weather, but House of Nina’s raw hair is on another level...",
    date: "Verified UK Buyer"
  },
  {
    id: "rev-3",
    author: "Chiamaka O.",
    city: "Birmingham, UK",
    rating: 5,
    hairPurchased: "The Mayfair Honey Balayage • 26\"",
    quote: "The colour blend is unbelievable. It doesn't look brassy or dry at all, it feels hydrated, thick from weft to tip, and smells gorgeous.",
    mobileQuote: "The colour blend is unbelievable. It feels hydrated, thick from weft to tip, and smells gorgeous...",
    date: "Verified UK Buyer"
  }
];

// STREAMLINED FOOTER DATA (Excludes main hamburger navigation)
export const FOOTER_DATA = {
  columns: [
    {
      title: "Client Care",
      links: [
        { label: "Delivery & Shipping", href: "#details" },
        { label: "Returns & Exchanges", href: "#details" },
        { label: "Bespoke Fitting FAQs", href: "#details" }
      ]
    },
    {
      title: "Legal & Trust",
      links: [
        { label: "Privacy & Cookies", href: "#privacy-cookies" },
        { label: "Terms of Service", href: "#terms" }
      ]
    }
  ],
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/house_of_nina_uk/" },
    { name: "WhatsApp", href: "https://wa.me/447776759731" },
    { name: "TikTok", href: "https://www.tiktok.com/@houseofninaofficial" },
    { name: "Email", href: "mailto:houseofnina2026@gmail.com" }
  ],
  payments: ["Visa", "Mastercard", "Apple Pay", "Klarna", "Clearpay", "American Express"]
};
