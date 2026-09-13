import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../ui/CartDrawer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col glass-ambient-canvas text-obsidian selection:bg-black selection:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
