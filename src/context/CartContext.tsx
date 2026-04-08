import  { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  color: string;   // selected color name
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tawat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tawat_cart', JSON.stringify(items));
  }, [items]);

  const key = (id: number, size: string, color: string) => `${id}|${size}|${color}`;

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => key(i.product.id, i.size, i.color) === key(product.id, size, color));
      if (existing) {
        return prev.map(i =>
          key(i.product.id, i.size, i.color) === key(product.id, size, color)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setItems(prev => prev.filter(i => key(i.product.id, i.size, i.color) !== key(productId, size, color)));
  };

  const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId, size, color); return; }
    setItems(prev =>
      prev.map(i =>
        key(i.product.id, i.size, i.color) === key(productId, size, color) ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
