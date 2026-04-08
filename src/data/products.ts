// ─── Imports ────────────────────────────────────────────────────────────────
import sportImage1 from '../assets/sport/image1.jpg';
import sportImage2 from '../assets/sport/image2.jpg';
import sportImage3 from '../assets/sport/image3.jpg';
import sportImage4 from '../assets/sport/sizeinfo.jpg';

import skinFullsleeve1 from '../assets/skinfullsleeve/fullsleeveimage1.jpg';
import skinFullsleeve2 from '../assets/skinfullsleeve/fullsleeveimage2.jpg';
import halfsleevePolo1 from '../assets/halfsleevepolo/halfsleeveimage1.jpg';
import halfsleevePolo2 from '../assets/halfsleevepolo/halfsleeveimage2.jpg';
import halfsleevePolo3 from '../assets/halfsleevepolo/halfsleeveimage3.jpg';
import nova1 from '../assets/nova/Nova.jpg';
import fullsleeve1 from '../assets/skinfullsleeve/fullsleeveimage1.jpg';
import fullsleeve2 from '../assets/skinfullsleeve/fullsleeveimage2.jpg';
import allplay1 from '../assets/allplay/allplayimage1.jpg';
import allplay2 from '../assets/allplay/allplayimage2.jpg';
import shakers1 from '../assets/shakers/Shakersiamge1.jpg';
import shakers2 from '../assets/shakers/Shakersiamge2.jpg';
import shakers3 from '../assets/shakers/Shakersiamge3.jpg';
import shakers4 from '../assets/shakers/Shakersiamge4.jpg';

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
  additionalImages?: string[];
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
        image: sportImage1,
        hoverImage: sportImage2,
      },
      {
        name: 'white',
        swatch: '#f5f5f5',
        image: sportImage2,
        hoverImage: sportImage2,
      },
    ],
    additionalImages: [sportImage3, sportImage4],
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
        image: skinFullsleeve1,
        hoverImage: skinFullsleeve2,
        note: 'Below 150 GSM',
      },
      {
        name: 'Grey',
        swatch: '#9ca3af',
        image: skinFullsleeve2,
        hoverImage: skinFullsleeve1,
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
        image: halfsleevePolo1,
        hoverImage: halfsleevePolo2,
      },
      {
        name: 'Greymil',
        swatch: '#6b7280',
        image: halfsleevePolo2,
        hoverImage: halfsleevePolo2,
      },
      {
        name: 'Pistachio',
        swatch: '#93c47d',
        image: halfsleevePolo3,
        hoverImage: halfsleevePolo1,
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
        image: nova1,
        hoverImage: fullsleeve1,
      },
      {
        name: 'Alt',
        swatch: '#1f2937',
        image: fullsleeve1,
        hoverImage: fullsleeve2,
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
        image: allplay1,
        hoverImage: allplay2,
      },
      {
        name: 'Red + Grey',
        swatch: '#ef4444',
        image: allplay2,
        hoverImage: allplay1,
      },
    ],
     additionalImages: [ sportImage4],
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
        image: shakers1,
        hoverImage: shakers2,
      },
      {
        name: 'Pink',
        swatch: '#f472b6',
        image: shakers2,
        hoverImage: shakers3,
      },
      {
        name: 'Black',
        swatch: '#0a0a0a',
        image: shakers3,
        hoverImage: shakers4,
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
