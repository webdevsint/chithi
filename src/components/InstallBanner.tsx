import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Download } from 'lucide-react';

export const InstallBanner = ({ installPrompt, onInstall, visitCount }: { installPrompt: any, onInstall: () => void, visitCount: number }) => {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!installPrompt || visitCount === 0) return;

    const dismissedAt = parseInt(localStorage.getItem('chithi_install_dismissed_at') || '-10', 10);
    const shouldSnooze = visitCount - dismissedAt < 3;

    if (!shouldSnooze && location.pathname === '/') {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [installPrompt, location.pathname, visitCount]);

  if (!showBanner || !installPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-xl border border-stone-200 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center shrink-0 relative shadow-sm">
              <img src="/logo.png" alt="Chithi Logo" className="w-8 h-8 object-contain" />
              <div className="absolute -bottom-1.5 -right-1.5 bg-stone-900 rounded-lg p-1.5 shadow-lg border-2 border-white">
                <Download className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900 leading-tightPlus">Install Chithi</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => {
                localStorage.setItem('chithi_install_dismissed_at', visitCount.toString());
                setShowBanner(false);
              }}
              className="px-3 py-2 text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors"
            >
              Later
            </button>
            <button 
              onClick={onInstall}
              className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-2xl hover:bg-stone-800 transition-all active:scale-95 shadow-lg shadow-stone-900/20"
            >
              Install
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
