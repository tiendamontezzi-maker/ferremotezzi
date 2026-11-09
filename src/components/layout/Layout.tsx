import React, { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../ui/CartDrawer';
import { SmartSearchModal } from '../search/SmartSearchModal';

export const Layout: React.FC = () => {
  const { pathname, search } = useLocation();

  // Instantly scroll to top (photo & title area) on every route or product navigation
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return (
    <div className="min-h-screen flex flex-col glass-ambient-canvas text-obsidian selection:bg-black selection:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SmartSearchModal />
    </div>
  );
};
