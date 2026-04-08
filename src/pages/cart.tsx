import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-8 py-32 text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-[2rem] font-extrabold mb-4 text-[#0a0a0a]">Your cart is empty</h2>
          <p className="text-gray-500 text-base mb-10">Explore our collection and find something you love.</p>
          <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-[#0a0a0a] hover:bg-gray-800 text-white font-bold text-[0.9rem] tracking-[0.08em] uppercase rounded-xl transition-colors duration-200">
            Shop Now
          </button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-extrabold tracking-[-0.02em] text-[#0a0a0a]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Your Cart
          </h1>
          <p className="text-gray-400 text-[0.9rem] mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Items */}
          <div>
            {items.map((item, idx) => (
              <motion.div
                key={`${item.product.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
                className={`flex gap-4 py-5 border-t border-gray-100 ${idx === items.length - 1 ? 'border-b' : ''}`}
              >
                {/* Thumbnail */}
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={item.product.colors.find(c => c.name === item.color)?.image ?? item.product.colors[0].image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[0.65rem] text-gray-400 tracking-[0.08em] uppercase mb-0.5">{item.product.category}</p>
                    <Link to={`/product/${item.product.id}`} className="text-[0.92rem] font-semibold text-[#0a0a0a] hover:text-gray-600 transition-colors duration-200 block mb-0.5">
                      {item.product.name}
                    </Link>
                    <p className="text-[0.8rem] text-gray-400">Size: {item.size} · Color: {item.color}</p>
                  </div>

                  <div className="flex justify-between items-center flex-wrap gap-3 mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="px-3 py-1 text-lg hover:bg-gray-50 rounded-l-lg">−</button>
                      <span className="px-3 py-1 border-x border-gray-200 text-[0.9rem] min-w-[36px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="px-3 py-1 text-lg hover:bg-gray-50 rounded-r-lg">+</button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-[0.88rem] font-bold text-[#0a0a0a]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                        {item.product.originalPrice && (
                          <p className="text-[0.72rem] text-gray-400 line-through">₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}</p>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.product.id, item.size, item.color)} className="text-gray-400 text-[0.78rem] hover:text-red-500 transition-colors duration-200">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-7 sticky top-20"
          >
            <h2 className="text-[1rem] font-bold mb-5 text-[#0a0a0a]">Order Summary</h2>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex justify-between text-[0.88rem]">
                <span className="text-gray-500">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span className="font-medium text-[#0a0a0a]">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[0.88rem]">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-5 flex justify-between items-baseline">
              <span className="font-bold text-[#0a0a0a]">Total</span>
              <span className="text-[1.4rem] font-extrabold text-[#0a0a0a]">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <button
              id="checkout-btn"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 text-white font-extrabold text-[0.95rem] tracking-[0.08em] uppercase rounded-2xl mb-4 shadow-[0_8px_24px_rgba(22,163,74,0.3)] hover:shadow-[0_12px_32px_rgba(22,163,74,0.4)] transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #e75816ff, #e77a3cff)' }}
            >
              Proceed to Checkout
            </button>

            <Link to="/shop" className="block text-center text-[0.8rem] text-gray-400 hover:text-[#0a0a0a] transition-colors duration-200">
              ← Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
