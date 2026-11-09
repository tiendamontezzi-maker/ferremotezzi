export type UserRole = 'admin' | 'colaborador' | 'cliente' | 'collaborator' | 'customer';

export type MainCollection = 'cocina' | 'closet' | 'herrajes_especiales';

export interface Profile {
  id: string;
  user_id?: string;
  full_name: string;
  role: UserRole;
  email: string;
  permissions?: string[];
  status?: 'active' | 'suspended' | 'activo' | 'inactivo';
  phone?: string;
  company?: string;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  main_collection: MainCollection;
  icon?: string;
}

export interface TechnicalSpecs {
  material: string;
  acabado: string;
  dimensiones: string; // W x D x H (mm)
  mecanismo: string;
  modulo?: string; // e.g. 200mm, 300mm, 600mm
  capacidad_carga?: string; // kg
  tolerancia?: string;
  compatibilidad?: string;
  origen_norma?: string;
  unidades_empaque?: string;
}

export interface ProductBenefit {
  label: string; // 'MATERIAL' | 'CIERRE' | 'CARGA' | 'DURABILIDAD' | 'ACCESO' | 'MÓDULO'
  value: string;
}

export interface Product {
  id: string;
  code: string; // e.g. KDJ-60 to KDJ-103
  sku?: string;
  slug?: string;
  name: string;
  category_id: string;
  category_name: string;
  category?: string;
  main_collection: MainCollection;
  brand_collection?: string;
  short_description: string;
  full_description?: string;
  description?: string;
  technical_specs: TechnicalSpecs;
  benefits?: ProductBenefit[];
  price: number; // in COP (Colombian Pesos)
  original_price?: number;
  wholesale_price?: number;
  wholesale_min_qty?: number;
  
  // Multichannel Reactive Inventory: stock = warehouse_stock + store_stock + web_stock
  stock: number;
  warehouse_stock?: number; // Bodega Principal
  store_stock?: number;     // Tienda Showroom
  web_stock?: number;       // Canal Web E-commerce
  inventory_status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
  min_stock_alert?: number;

  image_url: string;
  gallery_urls: string[];
  images?: string[];
  colors?: Array<{ name: string; hex: string }>;
  dimensions?: { width?: number; height?: number; depth?: number; unit?: string } | Record<string, any>;
  materials?: string[];
  boxes_count?: number;
  warranty?: string;
  shipping_returns_info?: string;
  care_instructions?: string;
  fast_shipping_badge?: boolean;
  returns_policy_badge?: boolean;

  is_featured: boolean;
  created_at: string;
  updated_at?: string;
  updated_by?: string;
}

export type OrderStatus = 'pendiente' | 'aprobado' | 'enviado' | 'entregado' | 'cancelado' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product_id: string;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  subtotal: number;
  sku?: string;
}

export interface Order {
  id: string;
  order_ref?: string; // Visible ref (e.g. MON-931128)
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_tag?: 'General' | 'VIP' | 'Mayorista' | 'Arquitecto' | string;
  customer_document_type?: 'CC' | 'NIT' | 'CE' | 'PP' | string;
  customer_document_id?: string;
  shipping_address: string;
  city: string;
  department?: string;
  carrier?: string; // e.g. Servientrega, Coordinadora, Propio
  tracking_number?: string;
  notes?: string;
  
  // Financial fields
  subtotal_amount: number;
  shipping_cost: number;
  discount?: number;
  deposit_amount?: number; // Abono inicial
  pending_balance?: number; // Saldo pendiente
  total_amount: number;

  status: OrderStatus;
  payment_status: 'pendiente_verificacion' | 'acreditado' | 'rechazado' | 'pending' | 'partial' | 'paid';
  payment_method: 'transferencia' | 'tarjeta' | 'efectivo_showroom' | string;
  payment_gateway?: 'bold' | 'wompi' | 'manual_transfer' | string;
  
  items_count?: number;
  items: OrderItem[];

  // DIAN / Siigo Electronic Invoicing
  siigo_invoice_id?: string;
  siigo_invoice_number?: string; // e.g. FEF-19
  siigo_invoice_status?: 'pending' | 'sent' | 'error' | 'aceptada' | 'rechazada' | string;
  siigo_cufe?: string;
  siigo_pdf_url?: string;
  siigo_error_log?: string;

  created_at: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number; // e.g. 10 (%) or 50000 (COP)
  min_purchase?: number;
  expiry_date?: string;
  usage_count?: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id?: string;
  user_name: string;
  user_email?: string;
  rating: number; // 1 to 5
  title?: string;
  comment?: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string; // 'Asesoría en Showroom' | 'Diseño Virtual' | 'Visita de Medición'
  appointment_date: string;
  appointment_time: string;
  city?: string;
  address?: string;
  price?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid';
  payment_gateway?: string;
  bold_order_id?: string;
  notes?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  entity_type: 'product' | 'order' | 'coupon' | 'appointment' | 'setting' | 'user';
  entity_id?: string;
  entity_name?: string;
  action: 'create' | 'update' | 'delete' | 'status_change' | 'siigo_sync' | 'stock_adjustment';
  description?: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface WholesaleLead {
  id: string;
  full_name: string;
  company: string;
  city: string;
  phone: string;
  email: string;
  business_type: string;
  interested_products: string;
  estimated_volume: string;
  message: string;
  status: 'nuevo' | 'contactado' | 'en_negociacion' | 'cerrado';
  created_at: string;
}

export interface AbandonedCart {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company?: string;
  city?: string;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
  last_activity: string;
  status: 'abandonado' | 'contactado' | 'recuperado';
  recovery_notes?: string;
}

export interface ProductClickAnalytics {
  product_id: string;
  code: string;
  name: string;
  category_name: string;
  main_collection: MainCollection;
  price: number;
  clicks: number;
  add_to_cart_count: number;
  orders_count: number;
  image_url: string;
}

export interface SystemUser {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string;
  company?: string;
  city?: string;
  total_orders: number;
  total_spent: number;
  status: 'activo' | 'inactivo';
  created_at: string;
}
