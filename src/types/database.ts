export type UserRole = 'admin' | 'colaborador' | 'cliente';

export type MainCollection = 'cocina' | 'closet' | 'herrajes_especiales';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  company?: string;
  created_at: string;
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
  capacidad_carga?: string; // kg
  tolerancia?: string;
  compatibilidad?: string;
  origen_norma?: string;
  unidades_empaque?: string;
}

export interface ProductBenefit {
  label: string; // 'MATERIAL' | 'CIERRE' | 'CARGA' | 'DURABILIDAD' | 'ACCESO'
  value: string;
}

export interface Product {
  id: string;
  code: string; // e.g. KDJ-1 to KDJ-112
  name: string;
  category_id: string;
  category_name: string;
  main_collection: MainCollection;
  short_description: string;
  full_description?: string;
  technical_specs: TechnicalSpecs;
  benefits?: ProductBenefit[];
  price: number; // in COP (Colombian Pesos)
  stock: number;
  min_stock_alert?: number;
  image_url: string;
  gallery_urls: string[];
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

export type OrderStatus = 'pendiente' | 'aprobado' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  product_id: string;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  subtotal: number;
}

export interface Order {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  department: string;
  notes?: string;
  total_amount: number;
  subtotal_amount: number;
  shipping_cost: number;
  status: OrderStatus;
  items: OrderItem[];
  payment_method: 'transferencia' | 'tarjeta' | 'efectivo_showroom';
  payment_status: 'pendiente_verificacion' | 'acreditado' | 'rechazado';
  tracking_number?: string;
  created_at: string;
}

export interface WholesaleLead {
  id: string;
  full_name: string;
  company: string;
  city: string;
  phone: string;
  email: string;
  business_type: string; // 'Carpintero / Fabricante' | 'Arquitecto / Diseñador' | 'Distribuidor' | 'Empresa' | 'Otro'
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

