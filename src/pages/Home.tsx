import  { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories, type Category } from '../data/products';
import sportImg3 from '../assets/sport/image3.jpg';

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Accent colour per category pill
const categoryAccents: Record<string, string> = {
  All: '#0a0a0a',
  SPORT: '#38bdf8',
  SKIN: '#d946ef',
  POLO: '#c9a96e',
  NOVA: '#7c3aed',
  'ALL PLAY COMBO': '#16a34a',
  SHAKERS: '#ea580c',
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ height: 'calc(100vh - 64px)', minHeight: '520px' }}
      >
        <img
          src={sportImg3}
          alt="TAWAT Hero"
          className="absolute inset-0 w-full h-full object-contain bg-gray-100"
          style={{ objectPosition: 'center top' }}
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85'; }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.05) 100%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-[1400px] mx-auto px-8 pb-20 w-full"
        >
          {/* <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#c9a96e] font-semibold mb-4">
            SS 2025 Collection
          </p> */}
          <h1
            className="font-extrabold leading-[0.95] tracking-[-0.02em] text-white mb-8 max-w-2xl"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            Wear the<br />
            <span className="text-[#c9a96e]">Silence.</span>
          </h1>
          <div className="flex gap-4 flex-wrap">
            <button
              id="hero-shop-now"
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-white hover:bg-gray-100 text-[#0a0a0a] font-bold text-[0.85rem] tracking-[0.08em] uppercase rounded transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Announcement Bar ─────────────────────────────────────────────── */}
      <div className="bg-[#0a0a0a] py-3 px-8 text-center text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-white">
        Free shipping on all orders · New arrivals every Friday
      </div>

      {/* ── All Products ─────────────────────────────────────────────────── */}
      <section id="products-section" className="max-w-[1400px] mx-auto px-6 py-16 pb-24">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-400 mb-2">Our Range</p>
          <h2 className="font-extrabold tracking-[-0.02em] text-[#0a0a0a]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            All Products
          </h2>
        </motion.div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(cat => {
            const accent = categoryAccents[cat] ?? '#0a0a0a';
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`home-filter-${cat.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-[0.04em] border transition-all duration-200 ${
                  isActive ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
                style={isActive ? { backgroundColor: accent, borderColor: accent } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product grid — desktop 3-col, mobile 1-col */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {filtered.map(product => (
              <motion.div key={product.id} variants={fadeUpVariant}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16">No products in this category yet.</p>
        )}
      </section>

      {/* ── Brand Statement ───────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-24 px-8 text-center border-y border-gray-100"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-6">Our Philosophy</p>
          <blockquote
            className="font-light leading-relaxed text-[#0a0a0a] italic mb-8"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}
          >
            "Fashion is not about following trends. It's about finding your voice and wearing it."
          </blockquote>
          <p className="text-[0.8rem] text-gray-400 tracking-[0.1em]">— TAWAT</p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}