import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, OrderItem } from '../types/database';

export const FREE_SHIPPING_THRESHOLD = 500000; // $500,000 COP según el manual de envíos oficial
export const STANDARD_SHIPPING_COST = 25000;   // $25,000 COP estándar nacional

interface CartContextType {
  items: OrderItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shippingCost: number;
  total: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('montezzi_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('montezzi_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * i.price }
            : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          code: product.code,
          name: product.name,
          price: product.price,
          quantity,
          image_url: product.image_url,
          subtotal: product.price * quantity
        }
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product_id === productId
          ? { ...i, quantity, subtotal: quantity * i.price }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        shippingCost,
        total,
        isFreeShipping,
        amountNeededForFreeShipping,
        freeShippingProgress,
        itemCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
