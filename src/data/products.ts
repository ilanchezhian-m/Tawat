// ─── Category ────────────────────────────────────────────────────────────────
export type Category = 'All' | 'SPORT' | 'SKIN' | 'POLO' | 'NOVA' | 'ALL PLAY COMBO' | 'SHAKERS';

// ─── Color variant ───────────────────────────────────────────────────────────
export interface ColorVariant {
  name: string;
  swatch: string;
  image: string;
  hoverImage?: string;
  note?: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: Exclude<Category, 'All'>;
  sizes: string[];
  preOrderSizes?: string[];
  colors: ColorVariant[];
  description: string;
  tag?: string;
  badge?: string;
}

// ─── Products — one per category ─────────────────────────────────────────────
export const products: Product[] = [
  // ── 1. SPORT ───────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'SPORT',
    price: 499,
    originalPrice: 699,
    category: 'SPORT',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    preOrderSizes: ['S', 'XXXL'],
    colors: [
      {
        name: 'black',
        swatch: '#0a0a0a',
        image: '/src/assets/sport/image1.jpg',
        hoverImage: '/src/assets/sport/image2.jpg',
      },
      {
        name: 'white',
        swatch: '#f5f5f5',
        image: '/src/assets/sport/image2.jpg',
        hoverImage: '/src/assets/sport/image2.jpg',
      },
    ],
    description:
      'Premium sport-performance tee available in White and Black. Sizes S & XXXL are on pre-order only. Available sizes: M, L, XL, XXL.',
    tag: 'Sport',
  },

  // ── 2. SKIN ────────────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'SKIN',
    price: 599,
    originalPrice: 1199,
    category: 'SKIN',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Navy',
        swatch: '#1e3a5f',
        image: '/src/assets/skinfullsleeve/fullsleeveimage1.jpg',
        hoverImage: '/src/assets/skinfullsleeve/fullsleeveimage2.jpg',
        note: 'Below 150 GSM',
      },
      {
        name: 'Grey',
        swatch: '#9ca3af',
          image: '/src/assets/skinfullsleeve/fullsleeveimage2.jpg',
        hoverImage: '/src/assets/skinfullsleeve/fullsleeveimage1.jpg',
        note: 'Above 150 GSM',
      },
    ],
    description:
      'Ultra-soft half-sleeve tee. Navy is below 150 GSM for a lightweight feel; Grey is above 150 GSM for a premium structured drape.',
    tag: 'New',
  },

  // ── 3. POLO ────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'POLO',
    price: 499,
    originalPrice: 699,
    category: 'POLO',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Lemon',
        swatch: '#ffe135',
        image: '/src/assets/halfsleevepolo/halfsleeveimage1.jpg',
        hoverImage: '/src/assets/halfsleevepolo/halfsleeveimage2.jpg',
      },
      {
        name: 'Greymil',
        swatch: '#6b7280',
        image: '/src/assets/halfsleevepolo/halfsleeveimage2.jpg',
        hoverImage: '/src/assets/halfsleevepolo/halfsleeveimage2.jpg',
      },
      {
        name: 'Pistachio',
        swatch: '#93c47d',
        image: '/src/assets/halfsleevepolo/halfsleeveimage3.jpg',
        hoverImage: '/src/assets/halfsleevepolo/halfsleeveimage1.jpg',
      },
    ],
    description:
      'Classic polo-collar tee in three fresh colourways — Lemon, Greymil, and Pistachio. Choose your colour before adding to cart.',
    tag: 'Bestseller',
  },

  // ── 4. NOVA ────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'NOVA Full Sleeve',
    price: 599,
    originalPrice: 1299,
    category: 'NOVA',
    sizes: ['L', 'XL'],
    colors: [
      {
        name: 'Classic',
        swatch: '#374151',
        image: '/src/assets/nova/Nova.jpg',
        hoverImage: '/src/assets/fullsleeve/fullsleeveimage1.jpg',
      },
      {
        name: 'Alt',
        swatch: '#1f2937',
        image: '/src/assets/fullsleeve/fullsleeveimage1.jpg',
        hoverImage: '/src/assets/fullsleeve/fullsleeveimage2.jpg',
      },
    ],
    description:
      'Full-sleeve NOVA tee. Available in L & XL only. Two colourways — Classic and Alt.',
    tag: 'New',
  },

  // ── 5. ALL PLAY COMBO ──────────────────────────────────────────────────────
  {
    id: 5,
    name: 'All Play Combo',
    price: 999,
    originalPrice: 1199,
    category: 'ALL PLAY COMBO',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Pack of 2',
    colors: [
      {
        name: 'Blue + Black',
        swatch: '#3b82f6',
        image: '/src/assets/allplay/allplayimage1.jpg',
        hoverImage: '/src/assets/allplay/allplayimage2.jpg',
      },
      {
        name: 'Red + Grey',
        swatch: '#ef4444',
        image: '/src/assets/allplay/allplayimage2.jpg',
        hoverImage: '/src/assets/allplay/allplayimage1.jpg',
      },
    ],
    description:
      'Get 2 premium tees at an unbeatable price. Choose between Blue+Black or Red+Grey combo packs.',
    tag: 'Bestseller',
  },

  // ── 6. SHAKERS ─────────────────────────────────────────────────────────────
  {
    id: 6,
    name: 'Tawat Shaker',
    price: 99,
    originalPrice: 149,
    category: 'SHAKERS',
    sizes: ['One Size'],
    colors: [
      {
        name: 'Sky Blue',
        swatch: '#38bdf8',
        image: '/src/assets/shakers/Shakersiamge1.jpg',
        hoverImage: '/src/assets/shakers/Shakersiamge2.jpg',
      },
      {
        name: 'Pink',
        swatch: '#f472b6',
        image: '/src/assets/shakers/Shakersiamge2.jpg',
        hoverImage: '/src/assets/shakers/Shakersiamge3.jpg',
      },
      {
        name: 'Black',
        swatch: '#0a0a0a',
        image: '/src/assets/shakers/Shakersiamge3.jpg',
        hoverImage: '/src/assets/shakers/Shakersiamge4.jpg',
      },
    ],
    description:
      'Leak-proof protein shaker in three colourways — Sky Blue, Pink, or Black. BPA-free, 600 ml capacity.',
    tag: 'New',
  },
];

export const categories: Category[] = [
  'All',
  'SPORT',
  'SKIN',
  'POLO',
  'NOVA',
  'ALL PLAY COMBO',
  'SHAKERS',
];
