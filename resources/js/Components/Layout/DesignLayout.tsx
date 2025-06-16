// Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const DesignLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default DesignLayout;
