import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes.find(s => !product.preOrderSizes?.includes(s)) ?? product.sizes[0];
    addToCart(product, defaultSize, activeColor.name, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      id={`product-card-${product.id}`}
      className="block no-underline text-inherit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white border border-gray-100 rounded-xl overflow-hidden"
        style={{
          boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
          <img
            src={isHovered ? (activeColor.hoverImage ?? activeColor.image) : activeColor.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badge && (
              <span className="bg-[#0a0a0a] text-white text-[0.6rem] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded">
                {product.badge}
              </span>
            )}
            {product.tag && (
              <span className="bg-white text-[#0a0a0a] text-[0.6rem] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded border border-gray-200">
                {product.tag}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-green-500 text-white text-[0.6rem] font-bold tracking-[0.06em] px-2 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Quick Add overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 p-3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
              >
                <button
                  onClick={handleQuickAdd}
                  id={`quick-add-${product.id}`}
                  className={`w-full py-2.5 font-bold text-[0.78rem] tracking-[0.08em] uppercase rounded-lg text-white transition-colors duration-200 ${
                    added ? 'bg-green-600' : 'bg-[#0a0a0a] hover:bg-gray-700'
                  }`}
                >
                  {added ? '✓ Added' : 'Quick Add'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <p className="text-[0.65rem] text-gray-400 tracking-[0.1em] uppercase mb-0.5">{product.category}</p>
          <h3 className="text-[0.88rem] font-semibold text-[#0a0a0a] mb-2 leading-tight">{product.name}</h3>

          {/* Price row */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[0.95rem] font-bold text-[#0a0a0a]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[0.8rem] text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="flex gap-1.5 flex-wrap">
              {product.colors.map(c => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={e => { e.preventDefault(); setActiveColor(c); }}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
                    activeColor.name === c.name ? 'border-[#0a0a0a] scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
