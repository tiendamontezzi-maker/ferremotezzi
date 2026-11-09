import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { SearchProvider } from './context/SearchContext';
import { Layout } from './components/layout/Layout';

// Eagerly loaded core storefront pages for instant product rendering
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';

// Lazy-loaded secondary pages & heavy 12-tab Admin ERP
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const WarrantyPolicy = lazy(() => import('./pages/WarrantyPolicy').then(m => ({ default: m.WarrantyPolicy })));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy').then(m => ({ default: m.ShippingPolicy })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Wholesale = lazy(() => import('./pages/Wholesale').then(m => ({ default: m.Wholesale })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-white">
    <div className="w-8 h-8 rounded-full border-2 border-[#18181B] border-t-transparent animate-spin" />
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <SearchProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="catalogo" element={<Catalog />} />
                    <Route path="producto/:code" element={<ProductDetail />} />
                    <Route path="carrito" element={<Cart />} />
                    <Route path="nosotros" element={<About />} />
                    <Route path="garantias" element={<WarrantyPolicy />} />
                    <Route path="envios" element={<ShippingPolicy />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="distribucion" element={<Wholesale />} />
                    <Route path="login" element={<Login />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </SearchProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
