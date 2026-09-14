import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, Category, Order, OrderStatus, MainCollection, WholesaleLead,
  AbandonedCart, ProductClickAnalytics 
} from '../types/database';
import { 
  OFFICIAL_PRODUCTS, OFFICIAL_CATEGORIES, INITIAL_ORDERS,
  INITIAL_ABANDONED_CARTS, INITIAL_PRODUCT_ANALYTICS 
} from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ProductFilterState {
  searchQuery: string;
  collection: MainCollection | 'all';
  categorySlug: string | 'all';
  finish: string | 'all';
  priceRange: [number, number];
  onlyLowStock?: boolean;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  wholesaleLeads: WholesaleLead[];
  abandonedCarts: AbandonedCart[];
  productClickAnalytics: ProductClickAnalytics[];
  isLoading: boolean;
  filters: ProductFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilterState>>;
  filteredProducts: Product[];
  featuredProducts: Product[];
  getProductByCode: (code: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  updateProductStock: (productId: string, newStock: number) => Promise<void>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  createOrder: (orderData: Omit<Order, 'id' | 'created_at'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  submitWholesaleLead: (lead: Omit<WholesaleLead, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateAbandonedCartStatus: (id: string, status: 'abandonado' | 'contactado' | 'recuperado', notes?: string) => void;
  recordProductClick: (productId: string) => void;
  bulkUpdateProducts: (updates: Array<{ code?: string; id?: string; stock?: number; price?: number }>) => Promise<{ updatedCount: number }>;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('montezzi_products_cache');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 110) return parsed;
      } catch (e) {
        console.error('Error loading products cache:', e);
      }
    }
    return OFFICIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(OFFICIAL_CATEGORIES);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('montezzi_orders_cache');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ORDERS; }
    }
    return INITIAL_ORDERS;
  });

  const [wholesaleLeads, setWholesaleLeads] = useState<WholesaleLead[]>(() => {
    const saved = localStorage.getItem('montezzi_wholesale_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>(() => {
    const saved = localStorage.getItem('montezzi_abandoned_carts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ABANDONED_CARTS; }
    }
    return INITIAL_ABANDONED_CARTS;
  });

  const [productClickAnalytics, setProductClickAnalytics] = useState<ProductClickAnalytics[]>(() => {
    const saved = localStorage.getItem('montezzi_product_clicks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PRODUCT_ANALYTICS; }
    }
    return INITIAL_PRODUCT_ANALYTICS;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<ProductFilterState>({
    searchQuery: '',
    collection: 'all',
    categorySlug: 'all',
    finish: 'all',
    priceRange: [0, 3000000],
    onlyLowStock: false
  });

  // Sync products and orders to localStorage
  useEffect(() => {
    localStorage.setItem('montezzi_products_cache', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('montezzi_orders_cache', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('montezzi_wholesale_leads', JSON.stringify(wholesaleLeads));
  }, [wholesaleLeads]);

  useEffect(() => {
    localStorage.setItem('montezzi_abandoned_carts', JSON.stringify(abandonedCarts));
  }, [abandonedCarts]);

  useEffect(() => {
    localStorage.setItem('montezzi_product_clicks', JSON.stringify(productClickAnalytics));
  }, [productClickAnalytics]);

  // Load from Supabase if configured
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const fetchSupabaseData = async () => {
      setIsLoading(true);
      try {
        const { data: dbProducts, error: prodErr } = await client
          .from('products')
          .select('*')
          .order('code', { ascending: true });

        if (dbProducts && dbProducts.length > 0 && !prodErr) {
          setProducts(dbProducts as Product[]);
        }

        const { data: dbOrders, error: ordErr } = await client
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbOrders && !ordErr) {
          setOrders(dbOrders as Order[]);
        }
      } catch (e) {
        console.warn('Using local catalog cache due to Supabase fetch error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      collection: 'all',
      categorySlug: 'all',
      finish: 'all',
      priceRange: [0, 3000000],
      onlyLowStock: false
    });
  };

  const filteredProducts = products.filter(p => {
    // Search query: by code (KDJ-X), name, category, or short description
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchCode = p.code.toLowerCase().includes(q);
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category_name.toLowerCase().includes(q);
      const matchDesc = p.short_description.toLowerCase().includes(q);
      const matchMaterial = p.technical_specs.material?.toLowerCase().includes(q);
      if (!matchCode && !matchName && !matchCat && !matchDesc && !matchMaterial) {
        return false;
      }
    }

    // Collection filter
    if (filters.collection !== 'all' && p.main_collection !== filters.collection) {
      return false;
    }

    // Category filter
    if (filters.categorySlug !== 'all') {
      const cat = categories.find(c => c.slug === filters.categorySlug);
      if (cat && p.category_id !== cat.id) {
        return false;
      }
    }

    // Finish filter
    if (filters.finish !== 'all') {
      const f = filters.finish.toLowerCase();
      const specFinish = (p.technical_specs.acabado || '').toLowerCase();
      const name = p.name.toLowerCase();
      if (!specFinish.includes(f) && !name.includes(f)) {
        return false;
      }
    }

    // Price range
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }

    // Low stock filter for inventory
    if (filters.onlyLowStock) {
      const minAlert = p.min_stock_alert ?? 8;
      if (p.stock > minAlert) return false;
    }

    return true;
  });

  const featuredProducts = products.filter(p => p.is_featured);

  const getProductByCode = (code: string) => {
    return products.find(p => p.code.toLowerCase() === code.toLowerCase());
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const updateProductStock = async (productId: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('products')
          .update({ stock: Math.max(0, newStock), updated_at: new Date().toISOString() })
          .eq('id', productId);
      } catch (err) {
        console.error('Error updating stock in Supabase:', err);
      }
    }
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, price: Math.max(0, newPrice) } : p))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('products')
          .update({ price: Math.max(0, newPrice), updated_at: new Date().toISOString() })
          .eq('id', productId);
      } catch (err) {
        console.error('Error updating price in Supabase:', err);
      }
    }
  };

  const bulkUpdateProducts = async (
    updates: Array<{ code?: string; id?: string; stock?: number; price?: number }>
  ): Promise<{ updatedCount: number }> => {
    let count = 0;
    setProducts(prev => {
      return prev.map(p => {
        const match = updates.find(
          u => (u.id && u.id === p.id) || (u.code && u.code.toLowerCase() === p.code.toLowerCase())
        );
        if (match) {
          count++;
          return {
            ...p,
            stock: match.stock !== undefined ? Math.max(0, Number(match.stock)) : p.stock,
            price: match.price !== undefined ? Math.max(0, Number(match.price)) : p.price,
            updated_at: new Date().toISOString()
          };
        }
        return p;
      });
    });

    return { updatedCount: count };
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${productData.code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      created_at: new Date().toISOString()
    };

    setProducts(prev => [newProduct, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').insert([newProduct]);
      } catch (err) {
        console.error('Error inserting product in Supabase:', err);
      }
    }

    return newProduct;
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('products')
          .update({ ...updatedProduct, updated_at: new Date().toISOString() })
          .eq('id', updatedProduct.id);
      } catch (err) {
        console.error('Error updating product in Supabase:', err);
      }
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', productId);
      } catch (err) {
        console.error('Error deleting product from Supabase:', err);
      }
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at'>): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      created_at: new Date().toISOString()
    };

    // Deduct stock for ordered items
    setProducts(prev =>
      prev.map(p => {
        const item = newOrder.items.find(i => i.product_id === p.id);
        if (item) {
          return { ...p, stock: Math.max(0, p.stock - item.quantity) };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').insert([newOrder]);
      } catch (err) {
        console.error('Error creating order in Supabase:', err);
      }
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (err) {
        console.error('Error updating order status in Supabase:', err);
      }
    }
  };

  const submitWholesaleLead = async (leadData: Omit<WholesaleLead, 'id' | 'created_at' | 'status'>) => {
    const newLead: WholesaleLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'nuevo',
      created_at: new Date().toISOString()
    };

    setWholesaleLeads(prev => [newLead, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('wholesale_leads').insert([newLead]);
      } catch (err) {
        console.error('Error inserting wholesale lead in Supabase:', err);
      }
    }
  };

  const updateAbandonedCartStatus = (id: string, status: 'abandonado' | 'contactado' | 'recuperado', notes?: string) => {
    setAbandonedCarts(prev =>
      prev.map(c => (c.id === id ? { ...c, status, recovery_notes: notes || c.recovery_notes } : c))
    );
  };

  const recordProductClick = (productId: string) => {
    setProductClickAnalytics(prev => {
      const existing = prev.find(p => p.product_id === productId);
      if (existing) {
        return prev.map(p => (p.product_id === productId ? { ...p, clicks: p.clicks + 1 } : p));
      }
      const prod = products.find(p => p.id === productId);
      if (!prod) return prev;
      return [
        ...prev,
        {
          product_id: prod.id,
          code: prod.code,
          name: prod.name,
          category_name: prod.category_name,
          main_collection: prod.main_collection,
          price: prod.price,
          clicks: 1,
          add_to_cart_count: 0,
          orders_count: 0,
          image_url: prod.image_url
        }
      ];
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        orders,
        wholesaleLeads,
        abandonedCarts,
        productClickAnalytics,
        isLoading,
        filters,
        setFilters,
        filteredProducts,
        featuredProducts,
        getProductByCode,
        getProductById,
        updateProductStock,
        updateProductPrice,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        submitWholesaleLead,
        updateAbandonedCartStatus,
        recordProductClick,
        bulkUpdateProducts,
        resetFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
