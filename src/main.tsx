import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);

// Aggressively unregister outdated service workers to force the hiatus update
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister().then(() => {
        console.log('ServiceWorker unregistered to force cache bust.');
      });
    }
  });

  // Also clear window caches
  if (window.caches) {
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
}
