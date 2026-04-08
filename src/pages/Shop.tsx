import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories, type Category } from '../data/products';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// Accent colours for each category pill
const categoryAccents: Record<string, string> = {
  All: '#0a0a0a',
  SPORT: '#38bdf8',
  SKIN: '#d946ef',
  POLO: '#c9a96e',
  NOVA: '#7c3aed',
  'ALL PLAY COMBO': '#16a34a',
  SHAKERS: '#ea580c',
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'All';

  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [sort, setSort] = useState<SortOption>('featured');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = (searchParams.get('category') as Category) || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    if (cat === 'All') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-12 border-b border-gray-100">
        {/* <p className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-400 mb-2">SS 2025</p> */}
        <h1 className="font-extrabold tracking-[-0.02em] text-[#0a0a0a] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          All Products
        </h1>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="shop-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#c9a96e] rounded text-[#0a0a0a] text-[0.9rem] outline-none transition-colors duration-200"
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Filters Row */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => {
              const accent = categoryAccents[cat] ?? '#0a0a0a';
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => handleCategoryChange(cat)}
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

          {/* Sort + count */}
          <div className="flex items-center gap-4">
            <span className="text-[0.8rem] text-gray-400">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </span>
            <select
              id="shop-sort"
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-[#0a0a0a] text-[0.8rem] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 text-gray-400">
              <p className="text-xl mb-2 text-[#0a0a0a]">No products found</p>
              <p className="text-sm">Try a different search term or category.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + sort + search}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filtered.map(product => (
                <motion.div key={product.id} variants={fadeUpVariant}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
