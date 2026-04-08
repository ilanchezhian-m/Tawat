import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
];

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
          <img src={logo} alt="TAWAT" className="h-20 w-auto object-contain -ml-2" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="text-[0.85rem] font-medium tracking-[0.08em] uppercase text-gray-500 hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate('/cart')}
            id="cart-button"
            className="relative flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] hover:bg-gray-800 text-black rounded font-bold text-[0.8rem] tracking-[0.05em] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Cart
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-[#c9a96e] text-black rounded-full w-5 h-5 flex items-center justify-center text-[0.6rem] font-extrabold"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#0a0a0a] p-1"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="flex flex-col gap-4 px-8 py-5">
              {[...navLinks, { label: 'Cart', path: '/cart' }].map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-[#0a0a0a] hover:text-[#c9a96e] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}