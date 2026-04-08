import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      {/* Newsletter Strip */}
      <div className="bg-[#0a0a0a] py-10 px-8 text-center">
        <p className="text-[0.75rem] tracking-[0.15em] uppercase text-gray-400 mb-1 font-semibold">
          Join the Inner Circle
        </p>
        <h3 className="text-2xl font-extrabold text-white mb-6">
          Get early access &amp; exclusive drops
        </h3>
        <form onSubmit={e => e.preventDefault()} className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            id="newsletter-email"
            className="flex-1 px-5 py-3 bg-white/10 border border-white/20 border-r-0 text-white text-sm outline-none rounded-l placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#c9a96e] hover:bg-[#b8954f] text-[#0a0a0a] font-bold text-[0.8rem] tracking-[0.05em] rounded-r transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-[1.8rem] font-extrabold tracking-[0.15em] mb-4 text-[#0a0a0a]">TAWAT</h2>
          <p className="text-gray-500 text-sm leading-7 max-w-[240px]">
            Minimal luxury streetwear. Crafted with intention, worn with purpose.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[0.75rem] tracking-[0.15em] uppercase text-gray-400 mb-5 font-semibold">Collections</h4>
          <ul className="flex flex-col gap-3">
            {['SPORT', 'SKIN', 'POLO', 'NOVA', 'ALL PLAY COMBO', 'SHAKERS'].map(item => (
              <li key={item}>
                <Link to={`/shop?category=${item}`} className="text-gray-700 text-sm hover:text-[#c9a96e] transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-[0.75rem] tracking-[0.15em] uppercase text-gray-400 mb-5 font-semibold">Help</h4>
          <ul className="flex flex-col gap-3">
            {['Shipping & Returns', 'Size Guide', 'FAQ', 'Contact Us', 'Track Order'].map(item => (
              <li key={item}>
                <Link to="/" className="text-gray-700 text-sm hover:text-[#c9a96e] transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="text-[0.75rem] tracking-[0.15em] uppercase text-gray-400 mb-5 font-semibold">Follow</h4>
          <div className="flex flex-col gap-3">
            {['Instagram', 'TikTok', 'Pinterest', 'Twitter / X'].map(s => (
              <a key={s} href="#" className="text-gray-700 text-sm hover:text-[#c9a96e] transition-colors duration-200">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-8 py-6 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <p className="text-gray-400 text-[0.8rem]">
          © {new Date().getFullYear()} TAWAT. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(link => (
            <a key={link} href="#" className="text-gray-400 text-[0.8rem] hover:text-[#0a0a0a] transition-colors duration-200">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}