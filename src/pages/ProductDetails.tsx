import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, type ColorVariant } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Default to first color on load
  const activeColor = selectedColor ?? (product?.colors[0] ?? null);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl text-[#0a0a0a]">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-[#0a0a0a] text-white rounded font-bold">
          Back to Shop
        </button>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    let hasError = false;
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); hasError = true; }
    if (!hasError) {
      addToCart(product, selectedSize, activeColor?.name ?? product.colors[0].name, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex gap-2 items-center text-[0.8rem] text-gray-400">
        <Link to="/" className="hover:text-[#0a0a0a] transition-colors duration-200">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#0a0a0a] transition-colors duration-200">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#0a0a0a] transition-colors duration-200">{product.category}</Link>
        <span>/</span>
        <span className="text-[#0a0a0a]">{product.name}</span>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── Images ─────────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="rounded-2xl overflow-hidden bg-gray-50 mb-4" style={{ aspectRatio: '1/1' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor?.image}
                src={activeColor?.image ?? ''}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 flex-wrap">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 p-0 ${
                  activeColor?.name === c.name ? 'border-[#0a0a0a]' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Info ───────────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-3">
            {product.badge && (
              <span className="bg-[#0a0a0a] text-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded">
                {product.badge}
              </span>
            )}
            {product.tag && (
              <span className="bg-gray-100 text-[#0a0a0a] text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded">
                {product.tag}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-green-100 text-green-700 text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          <p className="text-[0.72rem] text-gray-400 tracking-[0.1em] uppercase mb-1.5">{product.category}</p>
          <h1 className="font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0a0a0a] mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[2rem] font-extrabold text-[#0a0a0a]">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-[1.1rem] text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-[0.92rem] text-gray-500 leading-[1.8] mb-8">{product.description}</p>

          {/* ── Color selector ────────────────────────────────────── */}
          {product.colors.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-gray-400">Colour</p>
                <span className="font-semibold text-[0.88rem] text-[#0a0a0a]">{activeColor?.name}</span>
                {activeColor?.note && (
                  <span className="text-[0.7rem] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{activeColor.note}</span>
                )}
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(c => {
                  const isActive = activeColor?.name === c.name;
                  return (
                    <motion.button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(c)}
                      whileTap={{ scale: 0.9 }}
                      animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="relative flex flex-col items-center gap-1.5 group"
                    >
                      {/* Swatch circle */}
                      <div
                        className="w-10 h-10 rounded-full border-2 transition-all duration-200"
                        style={{
                          backgroundColor: c.swatch,
                          borderColor: isActive ? '#0a0a0a' : '#e5e7eb',
                          boxShadow: isActive ? '0 0 0 3px rgba(10,10,10,0.15)' : 'none',
                        }}
                      />
                      {/* Label */}
                      <span
                        className="text-[0.68rem] font-semibold tracking-wide transition-colors duration-200"
                        style={{ color: isActive ? '#0a0a0a' : '#9ca3af' }}
                      >
                        {c.name}
                      </span>
                      {/* Active dot */}
                      {isActive && (
                        <motion.div
                          layoutId="color-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0a0a] rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Size selector ─────────────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-gray-400">Size</p>
                {selectedSize && (
                  <motion.span
                    key={selectedSize}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-semibold text-[0.88rem] text-[#0a0a0a]"
                  >
                    {selectedSize}
                  </motion.span>
                )}
              </div>
              {product.preOrderSizes && product.preOrderSizes.length > 0 && (
                <span className="text-[0.7rem] text-amber-600 font-medium">
                  ⚠️ S & XXXL are pre-order
                </span>
              )}
            </div>

            <AnimatePresence>
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="text-[0.8rem] text-red-500 mb-3 font-medium"
                >
                  ← Please pick a size first
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => {
                const isPreOrder = product.preOrderSizes?.includes(size);
                const isSelected = selectedSize === size;
                return (
                  <div key={size} className="relative flex flex-col items-center gap-1">
                    <motion.button
                      id={`size-${size}`}
                      onClick={() => setSelectedSize(size)}
                      whileTap={{ scale: 0.93 }}
                      animate={isSelected ? { y: -2 } : { y: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className={`relative px-4 py-2.5 text-[0.85rem] font-bold min-w-[52px] text-center transition-colors duration-150 ${
                        isSelected
                          ? 'text-[#0a0a0a]'
                          : sizeError
                          ? 'text-red-400 hover:text-[#0a0a0a]'
                          : 'text-gray-400 hover:text-[#0a0a0a]'
                      } ${
                        isPreOrder ? 'opacity-80' : ''
                      }`}
                      style={{
                        border: `2px solid ${isSelected ? '#0a0a0a' : sizeError ? '#fca5a5' : '#e5e7eb'}`,
                        borderRadius: '10px',
                        background: isSelected ? '#f8f8f8' : 'white',
                      }}
                    >
                      {size}
                      {/* Selected underline bar */}
                      {isSelected && (
                        <motion.div
                          layoutId="size-bar"
                          className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#0a0a0a] rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                    {isPreOrder && (
                      <span className="text-[0.58rem] font-bold text-amber-500 tracking-wide uppercase">Pre-order</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Quantity ──────────────────────────────────────────── */}
          <div className="mb-8">
            <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Quantity</p>
            <div className="inline-flex items-center rounded-xl overflow-hidden border border-gray-200">
              <motion.button
                id="qty-decrease"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                whileTap={{ backgroundColor: '#f3f4f6' }}
                className="w-12 h-12 text-xl font-light text-gray-600 hover:text-[#0a0a0a] hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center"
              >−</motion.button>
              <AnimatePresence mode="wait">
                <motion.span
                  key={quantity}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="w-12 h-12 font-bold text-[1rem] text-[#0a0a0a] border-x border-gray-200 flex items-center justify-center"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
              <motion.button
                id="qty-increase"
                onClick={() => setQuantity(q => q + 1)}
                whileTap={{ backgroundColor: '#f3f4f6' }}
                className="w-12 h-12 text-xl font-light text-gray-600 hover:text-[#0a0a0a] hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center"
              >+</motion.button>
            </div>
          </div>

          {/* ── Add to Cart ───────────────────────────────────────── */}
          <div className="flex flex-col gap-3 mb-4">
            <motion.button
              id="add-to-cart-btn"
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              animate={added ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="relative w-full py-4 font-bold text-[0.95rem] tracking-[0.08em] uppercase rounded-2xl text-white overflow-hidden transition-all duration-300"
              style={{
                background: added
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                boxShadow: added
                  ? '0 8px 24px rgba(22,163,74,0.35)'
                  : '0 8px 24px rgba(10,10,10,0.25)',
              }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Added to Cart!
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* <motion.button
              id="buy-now-btn"
              onClick={() => { handleAddToCart(); if (selectedSize) navigate('/cart'); }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 font-bold text-[0.95rem] tracking-[0.08em] uppercase rounded-2xl text-[#0a0a0a] border-2 border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-colors duration-200"
            >
              Buy Now
            </motion.button> */}
          </div>

          {/* Trust */}
          {/* <div className="flex gap-5 flex-wrap border-t border-gray-100 pt-5">
            {[{ icon: '🚚', text: 'Free Delivery' }, { icon: '↩️', text: '7-day returns' }, { icon: '🔒', text: 'Secure checkout' }].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-[0.78rem] text-gray-500">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div> */}
        </motion.div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[1400px] mx-auto px-6 pb-24 pt-16 border-t border-gray-100"
        >
          <h2 className="text-[1.4rem] font-extrabold mb-8 text-[#0a0a0a]">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
