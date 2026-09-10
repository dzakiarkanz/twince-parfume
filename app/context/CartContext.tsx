'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../types/product';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  totalPrice: number;
  totalItems: number;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = 'twince-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setCartItems(JSON.parse(storedCart) as CartItem[]);
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hasLoadedCart]);

  const addToCart = (product: Product) => {
    console.log(">> ITEM MASUK CART CONTEXT:", product);
    const stockQuantity = product.stockQuantity ?? product.stock ?? 10;
    const imageUrl = product.imageUrl || product.image || '';

    // Pemetaan field produk sesuai backend Spring Boot
    const normalizedProduct: Product = {
      ...product,
      id: String(product.id),
      name: String(product.name || 'TWINCE Perfume'),
      price: Number(product.price) || 0,
      imageUrl,
      image: imageUrl,
      stockQuantity,
      stock: stockQuantity,
      sku: product.sku || ''
    };

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === normalizedProduct.id);
      if (existingItem) {
        if (existingItem.quantity >= stockQuantity) {
          return currentItems;
        }
        return currentItems.map((item) =>
          item.product.id === normalizedProduct.id
            ? { ...item, quantity: item.quantity + 1, product: normalizedProduct }
            : item
        );
      }
      return [...currentItems, { product: normalizedProduct, quantity: 1 }];
    });

    // Otomatis ubah state isCartOpen menjadi true agar drawer langsung muncul
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((currentItems) => currentItems
      .map((item) => {
        if (item.product.id !== id) return item;
        const availableStock = item.product.stockQuantity ?? item.product.stock ?? 999;
        const newQuantity = item.quantity + delta;
        if (newQuantity > availableStock) return item;
        return { ...item, quantity: newQuantity };
      })
      .filter((item) => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.product.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(() => ({
    cartItems,
    isCartOpen,
    totalPrice,
    totalItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    setIsCartOpen,
    clearCart: () => setCartItems([])
  }), [cartItems, isCartOpen, totalPrice, totalItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
