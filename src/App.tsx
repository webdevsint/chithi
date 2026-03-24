import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';

// Components
import { GiveawayAlert } from './components/GiveawayAlert';
import { InstallBanner } from './components/InstallBanner';

// Pages
import { HiatusHome } from './pages/HiatusHome';
import { Home } from './pages/Home'; // Kept original
import { About } from './pages/About';
import { Editor } from './pages/Editor'; // Kept original
import { SharedCard } from './pages/SharedCard';
import { NotFound } from './pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React Router v6 Routes doesn't explicitly type key but it's needed for AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <HiatusHome />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen">
            <About />
          </motion.div>
        } />
        <Route path="/create" element={<Navigate to="/" replace />} />
        <Route path="/view" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <SharedCard />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Visit counting logic (once per load)
    const currentVisits = parseInt(localStorage.getItem('chithi_visit_count') || '0', 10);
    const isNewSession = !sessionStorage.getItem('chithi_session_active');
    
    let currentCount = currentVisits;
    if (isNewSession) {
      currentCount = currentVisits + 1;
      localStorage.setItem('chithi_visit_count', currentCount.toString());
      sessionStorage.setItem('chithi_session_active', 'true');
    }
    setVisitCount(currentCount);

    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fcfcfc] font-sans text-stone-900 selection:bg-stone-200">
          {/* <GiveawayAlert /> */}
          <AnimatedRoutes />
          <InstallBanner installPrompt={installPrompt} onInstall={handleInstallClick} visitCount={visitCount} />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
