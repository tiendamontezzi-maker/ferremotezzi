import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Product, Category, Order, OrderStatus, MainCollection, WholesaleLead,
  AbandonedCart, ProductClickAnalytics, Coupon, ProductReview, Appointment, ActivityLog 
} from '../types/database';
import { 
  OFFICIAL_PRODUCTS, OFFICIAL_CATEGORIES, INITIAL_ORDERS,
  INITIAL_ABANDONED_CARTS, INITIAL_PRODUCT_ANALYTICS,
  INITIAL_COUPONS, INITIAL_REVIEWS, INITIAL_APPOINTMENTS, INITIAL_ACTIVITY_LOGS
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
  coupons: Coupon[];
  reviews: ProductReview[];
  appointments: Appointment[];
  activityLogs: ActivityLog[];
  isLoading: boolean;
  filters: ProductFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilterState>>;
  filteredProducts: Product[];
  featuredProducts: Product[];
  getProductByCode: (code: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  updateProductStock: (productId: string, newStock: number) => Promise<void>;
  updateMultichannelStock: (
    productId: string, 
    channels: { warehouse_stock?: number; store_stock?: number; web_stock?: number }
  ) => Promise<void>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  createOrder: (orderData: Omit<Order, 'id' | 'created_at'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  submitWholesaleLead: (lead: Omit<WholesaleLead, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateAbandonedCartStatus: (id: string, status: 'abandonado' | 'contactado' | 'recuperado', notes?: string) => void;
  recordProductClick: (productId: string) => void;
  bulkUpdateProducts: (updates: Array<{ 
    code?: string; 
    id?: string; 
    stock?: number; 
    price?: number;
    warehouse_stock?: number;
    store_stock?: number;
    web_stock?: number;
  }>) => Promise<{ updatedCount: number }>;
  validateCoupon: (code: string, subtotal: number) => { valid: boolean; coupon?: Coupon; discount: number; error?: string };
  addReview: (review: Omit<ProductReview, 'id' | 'created_at' | 'status'>) => Promise<ProductReview>;
  createAppointment: (appointment: Omit<Appointment, 'id' | 'created_at' | 'status' | 'payment_status'>) => Promise<Appointment>;
  logActivity: (entry: Omit<ActivityLog, 'id' | 'created_at'>) => void;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('montezzi_products_dossier_2026');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 45 && parsed[0]?.technical_specs?.ref_fabricante) {
          return parsed;
        }
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

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('montezzi_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_COUPONS; }
    }
    return INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('montezzi_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_REVIEWS; }
    }
    return INITIAL_REVIEWS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('montezzi_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_APPOINTMENTS; }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('montezzi_activity_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_ACTIVITY_LOGS; }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [supabaseNotice, setSupabaseNotice] = useState<{
    type: 'saving' | 'success' | 'error';
    text: string;
  } | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSupabaseNotice = useCallback(
    (type: 'saving' | 'success' | 'error', text: string) => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }
      setSupabaseNotice({ type, text });
      if (type !== 'saving') {
        noticeTimerRef.current = setTimeout(() => {
          setSupabaseNotice(null);
        }, 4200);
      }
    },
    []
  );

  const [filters, setFilters] = useState<ProductFilterState>({
    searchQuery: '',
    collection: 'all',
    categorySlug: 'all',
    finish: 'all',
    priceRange: [0, 5000000],
    onlyLowStock: false
  });

  // Deferred sync to localStorage so JSON.stringify never blocks main thread rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('montezzi_products_dossier_2026', JSON.stringify(products));
      } catch (e) {
        // Ignore quota errors
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('montezzi_orders_cache', JSON.stringify(orders));
      } catch (e) {}
    }, 300);
    return () => clearTimeout(timer);
  }, [orders]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('montezzi_wholesale_leads', JSON.stringify(wholesaleLeads));
        localStorage.setItem('montezzi_abandoned_carts', JSON.stringify(abandonedCarts));
        localStorage.setItem('montezzi_product_clicks', JSON.stringify(productClickAnalytics));
        localStorage.setItem('montezzi_coupons', JSON.stringify(coupons));
        localStorage.setItem('montezzi_reviews', JSON.stringify(reviews));
        localStorage.setItem('montezzi_appointments', JSON.stringify(appointments));
        localStorage.setItem('montezzi_activity_logs', JSON.stringify(activityLogs));
      } catch (e) {}
    }, 400);
    return () => clearTimeout(timer);
  }, [wholesaleLeads, abandonedCarts, productClickAnalytics, coupons, reviews, appointments, activityLogs]);

  // Load from Supabase in parallel (no sequential waterfall)
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    let isMounted = true;

    const fetchSupabaseData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch storefront-critical data & admin data in parallel with Promise.all
        const [
          prodRes,
          ordRes,
          coupRes,
          aptRes,
          revRes,
          logRes
        ] = await Promise.all([
          client.from('products').select('*').order('code', { ascending: true }),
          client.from('orders').select('*').order('created_at', { ascending: false }),
          client.from('coupons').select('*').eq('is_active', true),
          client.from('appointments').select('*').order('appointment_date', { ascending: false }),
          client.from('product_reviews').select('*').order('created_at', { ascending: false }),
          client.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100)
        ]);

        if (!isMounted) return;

        // React 18 automatically batches all state updates in a single render pass
        if (prodRes.data && prodRes.data.length > 0 && !prodRes.error) {
          setProducts(prodRes.data as Product[]);
        }
        if (ordRes.data && !ordRes.error) {
          setOrders(ordRes.data as Order[]);
        }
        if (coupRes.data && coupRes.data.length > 0 && !coupRes.error) {
          setCoupons(coupRes.data as Coupon[]);
        }
        if (aptRes.data && aptRes.data.length > 0 && !aptRes.error) {
          setAppointments(aptRes.data as Appointment[]);
        }
        if (revRes.data && revRes.data.length > 0 && !revRes.error) {
          setReviews(revRes.data as ProductReview[]);
        }
        if (logRes.data && logRes.data.length > 0 && !logRes.error) {
          setActivityLogs(logRes.data as ActivityLog[]);
        }
      } catch (e) {
        console.warn('Using local catalog cache due to Supabase fetch error:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSupabaseData();
    return () => {
      isMounted = false;
    };
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      collection: 'all',
      categorySlug: 'all',
      finish: 'all',
      priceRange: [0, 5000000],
      onlyLowStock: false
    });
  }, []);

  const filteredProducts = useMemo(() => {
    const q = filters.searchQuery.trim().toLowerCase();
    const f = filters.finish !== 'all' ? filters.finish.toLowerCase() : '';
    const selectedCategory =
      filters.categorySlug !== 'all'
        ? categories.find(c => c.slug === filters.categorySlug)
        : undefined;

    return products.filter(p => {
      // Search query: by code (KDJ-X), name, category, or short description
      if (q) {
        const matchCode = p.code.toLowerCase().includes(q);
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = (p.category_name || '').toLowerCase().includes(q);
        const matchDesc = (p.short_description || '').toLowerCase().includes(q);
        const matchMaterial = p.technical_specs?.material?.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchCat && !matchDesc && !matchMaterial) {
          return false;
        }
      }

      // Collection filter
      if (filters.collection !== 'all' && p.main_collection !== filters.collection) {
        return false;
      }

      // Category filter
      if (selectedCategory && p.category_id !== selectedCategory.id) {
        return false;
      }

      // Finish filter
      if (f) {
        const specFinish = (p.technical_specs?.acabado || '').toLowerCase();
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
  }, [products, filters, categories]);

  const featuredProducts = useMemo(
    () => products.filter(p => p.is_featured),
    [products]
  );

  const getProductByCode = useCallback(
    (code: string) => {
      const target = code.toLowerCase();
      return products.find(
        p =>
          p.code.toLowerCase() === target ||
          p.id.toLowerCase() === target ||
          p.slug?.toLowerCase() === target
      );
    },
    [products]
  );

  const getProductById = useCallback(
    (id: string) => {
      return products.find(p => p.id === id);
    },
    [products]
  );

  const updateProductStock = async (productId: string, newStock: number) => {
    const safeStock = Math.max(0, newStock);
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const s = p.store_stock ?? 0;
        const b = p.web_stock ?? 0;
        const w = Math.max(0, safeStock - s - b);
        const total = w + s + b;
        const status: 'in_stock' | 'low_stock' | 'out_of_stock' = total <= 0 ? 'out_of_stock' : total < 5 ? 'low_stock' : 'in_stock';
        return {
          ...p,
          warehouse_stock: w,
          stock: total,
          inventory_status: status
        };
      })
    );

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', 'Guardando stock en Supabase...');
        const { error } = await supabase
          .from('products')
          .update({ stock: safeStock, updated_at: new Date().toISOString() })
          .eq('id', productId);
        if (error) {
          showSupabaseNotice('error', `Error en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice('success', 'Los cambios de stock se han guardado en Supabase');
        }
      } catch (err) {
        console.error('Error updating stock in Supabase:', err);
        showSupabaseNotice('error', 'No se pudo conectar con Supabase');
      }
    }
  };

  const updateMultichannelStock = async (
    productId: string,
    channels: { warehouse_stock?: number; store_stock?: number; web_stock?: number }
  ) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const w = channels.warehouse_stock !== undefined ? Math.max(0, channels.warehouse_stock) : (p.warehouse_stock ?? 0);
        const s = channels.store_stock !== undefined ? Math.max(0, channels.store_stock) : (p.store_stock ?? 0);
        const b = channels.web_stock !== undefined ? Math.max(0, channels.web_stock) : (p.web_stock ?? 0);
        const total = w + s + b;
        const status: 'in_stock' | 'low_stock' | 'out_of_stock' = total <= 0 ? 'out_of_stock' : total < 5 ? 'low_stock' : 'in_stock';
        return {
          ...p,
          warehouse_stock: w,
          store_stock: s,
          web_stock: b,
          stock: total,
          inventory_status: status
        };
      })
    );

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', 'Guardando stock multicanal en Supabase...');
        const { error } = await supabase
          .from('products')
          .update({ ...channels, updated_at: new Date().toISOString() })
          .eq('id', productId);
        if (error) {
          showSupabaseNotice('error', `Error en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice('success', 'Los cambios de stock se han guardado en Supabase');
        }
      } catch (err) {
        console.error('Error updating multichannel stock in Supabase:', err);
        showSupabaseNotice('error', 'No se pudo conectar con Supabase');
      }
    }
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, price: Math.max(0, newPrice) } : p))
    );

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', 'Guardando precio en Supabase...');
        const { error } = await supabase
          .from('products')
          .update({ price: Math.max(0, newPrice), updated_at: new Date().toISOString() })
          .eq('id', productId);
        if (error) {
          showSupabaseNotice('error', `Error en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice('success', 'El nuevo precio se ha guardado en Supabase');
        }
      } catch (err) {
        console.error('Error updating price in Supabase:', err);
        showSupabaseNotice('error', 'No se pudo conectar con Supabase');
      }
    }
  };

  const bulkUpdateProducts = async (
    updates: Array<{ 
      code?: string; 
      id?: string; 
      stock?: number; 
      price?: number;
      warehouse_stock?: number;
      store_stock?: number;
      web_stock?: number;
    }>
  ): Promise<{ updatedCount: number }> => {
    let count = 0;
    setProducts(prev => {
      return prev.map(p => {
        const match = updates.find(
          u => (u.id && u.id === p.id) || (u.code && u.code.toLowerCase() === p.code.toLowerCase())
        );
        if (match) {
          count++;
          const w = match.warehouse_stock !== undefined 
            ? Math.max(0, Number(match.warehouse_stock)) 
            : (p.warehouse_stock ?? 0);
          const s = match.store_stock !== undefined 
            ? Math.max(0, Number(match.store_stock)) 
            : (p.store_stock ?? 0);
          const b = match.web_stock !== undefined 
            ? Math.max(0, Number(match.web_stock)) 
            : (p.web_stock ?? 0);

          let total = w + s + b;
          if (match.stock !== undefined && match.warehouse_stock === undefined && match.store_stock === undefined && match.web_stock === undefined) {
            total = Math.max(0, Number(match.stock));
          }
          const status: 'in_stock' | 'low_stock' | 'out_of_stock' = total <= 0 ? 'out_of_stock' : total < 5 ? 'low_stock' : 'in_stock';

          return {
            ...p,
            warehouse_stock: w,
            store_stock: s,
            web_stock: b,
            stock: total,
            inventory_status: status,
            price: match.price !== undefined ? Math.max(0, Number(match.price)) : p.price,
            updated_at: new Date().toISOString()
          };
        }
        return p;
      });
    });

    return { updatedCount: count };
  };

  const toSupabaseProductRow = (p: Product) => ({
    id: p.id,
    code: p.code,
    sku: p.sku || p.technical_specs?.ref_fabricante || p.code,
    name: p.name,
    slug:
      p.slug ||
      `${p.code.toLowerCase()}-${p.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}`,
    short_description: p.short_description,
    full_description: p.full_description || p.description || p.short_description,
    description: p.description || p.full_description || p.short_description,
    price: p.price,
    category_id: p.category_id,
    category_name: p.category_name || p.category || 'General',
    category: p.category || p.category_name || 'General',
    main_collection: p.main_collection,
    warehouse_stock: p.warehouse_stock ?? 0,
    store_stock: p.store_stock ?? 0,
    web_stock: p.web_stock ?? 0,
    stock: p.stock,
    min_stock_alert: p.min_stock_alert ?? 3,
    image_url: p.image_url,
    gallery_urls:
      Array.isArray(p.gallery_urls) && p.gallery_urls.length > 0
        ? p.gallery_urls
        : p.image_url
        ? [p.image_url]
        : [],
    is_featured: Boolean(p.is_featured),
    technical_specs: p.technical_specs,
    benefits: p.benefits || [],
    inventory_status: p.inventory_status || 'in_stock',
    updated_at: new Date().toISOString()
  });

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${productData.code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      created_at: new Date().toISOString()
    };

    setProducts(prev => {
      const next = [newProduct, ...prev];
      try {
        localStorage.setItem('montezzi_products_dossier_2026', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    logActivity({
      entity_type: 'product',
      entity_id: newProduct.id,
      entity_name: `${newProduct.code} - ${newProduct.name}`,
      action: 'create',
      description: `Creación de referencia ${newProduct.code} con stock multicanal (${newProduct.stock} unids: Bodega ${newProduct.warehouse_stock ?? 0}, Showroom ${newProduct.store_stock ?? 0}, Web ${newProduct.web_stock ?? 0})`,
      details: { price: newProduct.price, image_url: newProduct.image_url, collection: newProduct.main_collection }
    });

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', `Guardando nueva referencia ${newProduct.code} en Supabase...`);
        const { error } = await supabase
          .from('products')
          .upsert([toSupabaseProductRow(newProduct)], { onConflict: 'id' });
        if (error) {
          console.error('Supabase upsert error on addProduct:', error.message);
          showSupabaseNotice('error', `Error al guardar en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice(
            'success',
            `¡Los cambios de ${newProduct.code} se han guardado en Supabase!`
          );
        }
      } catch (err) {
        console.error('Error inserting product in Supabase:', err);
        showSupabaseNotice('error', 'Error de red al guardar en Supabase');
      }
    }

    return newProduct;
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => {
      const next = prev.map(p =>
        p.id === updatedProduct.id || p.code === updatedProduct.code ? updatedProduct : p
      );
      try {
        localStorage.setItem('montezzi_products_dossier_2026', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', `Guardando cambios de ${updatedProduct.code} en Supabase...`);
        const row = toSupabaseProductRow(updatedProduct);
        const { error } = await supabase
          .from('products')
          .upsert([row], { onConflict: 'id' });
        if (error) {
          console.error('Supabase upsert error on updateProduct:', error.message);
          showSupabaseNotice('error', `Error al guardar en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice(
            'success',
            `¡Los cambios de ${updatedProduct.code} se han guardado en Supabase!`
          );
        }
      } catch (err) {
        console.error('Error updating product in Supabase:', err);
        showSupabaseNotice('error', 'Error de red al guardar en Supabase');
      }
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem('montezzi_products_dossier_2026', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        showSupabaseNotice('saving', 'Eliminando producto en Supabase...');
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) {
          showSupabaseNotice('error', `Error al eliminar en Supabase: ${error.message}`);
        } else {
          showSupabaseNotice('success', 'Producto eliminado de Supabase correctamente');
        }
      } catch (err) {
        console.error('Error deleting product from Supabase:', err);
        showSupabaseNotice('error', 'Error de red al eliminar en Supabase');
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

  const validateCoupon = (code: string, subtotal: number) => {
    const cleanCode = code.trim().toUpperCase();
    const cpn = coupons.find(c => c.code.toUpperCase() === cleanCode && c.is_active);
    if (!cpn) {
      return { valid: false, discount: 0, error: 'Cupón no válido o inexistente' };
    }
    if (cpn.expiry_date && new Date(cpn.expiry_date) < new Date()) {
      return { valid: false, discount: 0, error: 'Este cupón ha expirado' };
    }
    if (cpn.min_purchase && subtotal < cpn.min_purchase) {
      return {
        valid: false,
        discount: 0,
        error: `Compra mínima de $${cpn.min_purchase.toLocaleString('es-CO')} COP requerida`
      };
    }
    let discount = 0;
    if (cpn.discount_type === 'percentage') {
      discount = Math.round((subtotal * cpn.discount_value) / 100);
    } else {
      discount = Math.min(subtotal, cpn.discount_value);
    }
    return { valid: true, coupon: cpn, discount };
  };

  const addReview = async (reviewData: Omit<ProductReview, 'id' | 'created_at' | 'status'>): Promise<ProductReview> => {
    const newReview: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'approved',
      created_at: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('product_reviews').insert([newReview]);
      } catch (err) {
        console.error('Error inserting review in Supabase:', err);
      }
    }

    return newReview;
  };

  const createAppointment = async (
    aptData: Omit<Appointment, 'id' | 'created_at' | 'status' | 'payment_status'>
  ): Promise<Appointment> => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      status: 'confirmed',
      payment_status: 'paid',
      created_at: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('appointments').insert([newApt]);
      } catch (err) {
        console.error('Error inserting appointment in Supabase:', err);
      }
    }

    return newApt;
  };

  const logActivity = (entry: Omit<ActivityLog, 'id' | 'created_at'>) => {
    const newLog: ActivityLog = {
      ...entry,
      id: `log-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]);

    if (isSupabaseConfigured && supabase) {
      supabase.from('activity_logs').insert([newLog]).then(({ error }) => {
        if (error) console.warn('Supabase log activity error:', error.message);
      });
    }
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
        coupons,
        reviews,
        appointments,
        activityLogs,
        isLoading,
        filters,
        setFilters,
        filteredProducts,
        featuredProducts,
        getProductByCode,
        getProductById,
        updateProductStock,
        updateMultichannelStock,
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
        validateCoupon,
        addReview,
        createAppointment,
        logActivity,
        resetFilters
      }}
    >
      {children}
      {supabaseNotice && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-5 right-5 z-[200] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-sans font-semibold transition-all duration-300 ${
            supabaseNotice.type === 'saving'
              ? 'bg-[#18181B] text-white border-white/15'
              : supabaseNotice.type === 'success'
              ? 'bg-[#059669] text-white border-[#34D399]'
              : 'bg-[#DC2626] text-white border-[#F87171]'
          }`}
        >
          {supabaseNotice.type === 'saving' ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
          ) : supabaseNotice.type === 'success' ? (
            <span className="w-5 h-5 rounded-full bg-white text-[#059669] flex items-center justify-center font-bold shrink-0">
              ✓
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full bg-white text-[#DC2626] flex items-center justify-center font-bold shrink-0">
              !
            </span>
          )}
          <span>{supabaseNotice.text}</span>
          <button
            type="button"
            onClick={() => setSupabaseNotice(null)}
            className="ml-1 opacity-75 hover:opacity-100 text-white font-bold px-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
