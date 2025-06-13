import '../css/app.css';
import './bootstrap';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { AuthProvider } from './contexts/AuthContext';  // Make sure the path is correct
import { CartProvider } from './contexts/CartContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <React.StrictMode>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-1">
                <App {...props} />
                </main>
                <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </React.StrictMode>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
