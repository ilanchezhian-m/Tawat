import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Truck, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface FieldProps { label: string; required?: boolean; children: React.ReactNode; }
function Field({ label, required, children }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}

const inputCls = 'w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-[#0a0a0a] rounded-xl text-[#0a0a0a] text-[0.95rem] outline-none transition-colors duration-200 placeholder:text-gray-400';

const WHATSAPP_NUMBER = '918825702024';

export default function Checkout() {
    const { items, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [altPhone, setAltPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [landmark, setLandmark] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (items.length === 0) navigate('/cart');
    }, [items, navigate]);

    if (items.length === 0) return null;

    const handlePlaceOrder = () => {
        if (!name || !phone || !address || !pincode) {
            alert('Please fill in all required fields (Name, Phone, Address, Pincode).');
            return;
        }
        const isValidPhone = /^0\d{10}$/.test(phone) || /^[1-9]\d{9}$/.test(phone);
        if (!isValidPhone) { alert('Please enter a valid 10-digit Indian phone number.'); return; }
        if (!/^[1-9][0-9]{5}$/.test(pincode)) { alert('Please enter a valid 6-digit Indian PIN code.'); return; }

        const productList = items
            .map(item => `${item.product.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}) - ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`)
            .join('%0A');
        const altLine = altPhone ? `%0AAlternate / Email: ${altPhone}` : '';
        const landmarkLine = landmark ? `%0ALandmark: ${landmark}` : '';
        const msg =
            `*Order from TAWAT*%0A` +
            `━━━━━━━━━━━━━━━━━━━━%0A${productList}%0A` +
            `━━━━━━━━━━━━━━━━━━━━%0A` +
            `*Total Items:* ${totalItems}%0A*Total Amount:* ₹${totalPrice.toLocaleString('en-IN')}%0A` +
            `━━━━━━━━━━━━━━━━━━━━%0A` +
            `*Delivery Details*%0AName: ${name}%0APhone: ${phone}${altLine}%0AAddress: ${address}${landmarkLine}%0APincode: ${pincode}`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-24">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link to="/" className="hover:text-[#0a0a0a] transition-colors duration-200">Store</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/cart" className="hover:text-[#0a0a0a] transition-colors duration-200">Cart</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#0a0a0a]">Checkout</span>
                </nav>

                <h1 className="font-extrabold tracking-[-0.02em] text-[#0a0a0a] mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
                    {/* ── Delivery Form ──────────────────────────────────────────── */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-8 tracking-[-0.01em] text-[#0a0a0a]">Delivery Details</h2>

                        <div className="flex flex-col gap-5">
                            <Field label="Full Name" required>
                                <input id="checkout-name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Phone Number" required>
                                    <input
                                        id="checkout-phone" placeholder="10-digit mobile number" type="tel" value={phone}
                                        onChange={e => { const val = e.target.value.replace(/\D/g, ''); const max = val.startsWith('0') ? 11 : 10; if (val.length <= max) setPhone(val); }}
                                        className={inputCls}
                                    />
                                </Field>
                                {/* <Field label="Alternate Phone / Email">
                                    <input id="checkout-alt" placeholder="Optional" value={altPhone} onChange={e => setAltPhone(e.target.value)} className={inputCls} />
                                </Field> */}
                            </div>

                            <Field label="Complete Address" required>
                                <textarea
                                    id="checkout-address" placeholder={"House No, Building, Street\nCity, State"} value={address}
                                    onChange={e => setAddress(e.target.value)} rows={3}
                                    className={`${inputCls} resize-y min-h-[96px]`}
                                />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Landmark">
                                    <input id="checkout-landmark" placeholder="Nearby landmark (optional)" value={landmark} onChange={e => setLandmark(e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="PIN Code" required>
                                    <input id="checkout-pincode" placeholder="6-digit PIN code" value={pincode}
                                        onChange={e => { const val = e.target.value.replace(/\D/g, ''); if (val.length <= 6) setPincode(val); }}
                                        className={inputCls}
                                    />
                                </Field>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Order Summary ───────────────────────────────────────────── */}
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.12 }}
                        className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-7 sticky top-20">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-[#c9a96e]" />
                            <h2 className="text-xl font-bold tracking-[-0.01em] text-[#0a0a0a]">Order Summary</h2>
                        </div>

                        {/* Item List */}
                        <div className="max-h-56 overflow-y-auto flex flex-col gap-3 pr-1">
                            {items.map(item => (
                                <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                <img src={item.product.colors.find(c => c.name === item.color)?.image ?? item.product.colors[0]?.image} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate text-[#0a0a0a]">{item.product.name}</p>
                                        <p className="text-[0.75rem] text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-[#c9a96e] shrink-0">
                                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
                            <div className="flex justify-between text-[0.9rem]">
                                <span className="text-gray-500">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                                <span className="text-[#0a0a0a] font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-[0.9rem]">
                                <span className="text-gray-500">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                <span className="font-bold text-base text-[#0a0a0a]">Total</span>
                                <div className="text-right">
                                    <p className="text-[0.7rem] text-gray-400 mb-0.5">Incl. GST</p>
                                    <p className="text-[2rem] font-extrabold text-[#c9a96e] leading-none">₹{totalPrice.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            id="place-order-btn"
                            onClick={handlePlaceOrder}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-gray-200  hover:bg-gray-800 text-white font-bold text-[1rem] tracking-wide rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
                             style={{ background: 'linear-gradient(135deg, #000000ff, #000000ff)' }}
                        >
                            Place Order via WhatsApp
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>

                        {/* UPI / QR
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
              <p className="text-center text-base font-bold tracking-wide text-[#0a0a0a]">UPI PAYMENT</p>
              <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center min-h-[200px]">
                <p className="text-gray-400 text-sm text-center px-6 leading-relaxed">
                  📱 Add your PhonePe / GPay QR image to<br />
                  <code className="text-[#c9a96e] text-xs">src/assets/payment scanner/Phonepe.jpeg</code>
                </p>
              </div>
              <p className="text-[0.75rem] text-gray-400 text-center">Pay via any UPI app — PhonePe, GPay, Paytm</p>
            </div> */}

                        {/* Trust */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                                <span className="text-[0.75rem] font-medium uppercase tracking-wider">Secure</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Truck className="w-4 h-4 text-[#c9a96e] shrink-0" />
                                <span className="text-[0.75rem] font-medium uppercase tracking-wider">Free Delivery</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
