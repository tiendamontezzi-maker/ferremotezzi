import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { SearchProvider } from './context/SearchContext';
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { WarrantyPolicy } from './pages/WarrantyPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { FAQ } from './pages/FAQ';
import { Wholesale } from './pages/Wholesale';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <SearchProvider>
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
            </SearchProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
