import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const GiveawayAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDismissed = localStorage.getItem('chithi_giveaway_dismissed');
    if (!isDismissed && location.pathname === '/') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -120, opacity: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[340px]"
      >
        <div className="bg-white/95 backdrop-blur-3xl border border-stone-200/50 p-5 rounded-[2rem] shadow-2xl shadow-black/5">
          <div className="flex items-center justify-between mb-3 text-stone-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[4px] overflow-hidden shadow-sm shrink-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="w-full h-full object-cover scale-110" 
                />
              </div>
              <span className="text-[11px] font-bold text-stone-500 tracking-tight">Instagram</span>
            </div>
            <span className="text-[11px] font-medium text-stone-300 tracking-tight">now</span>
          </div>
          
          <div className="mb-4">
            <p className="text-[14px] font-semibold text-stone-900 tracking-tight">Giveaway alert by Cursor Studios</p>
          </div>
          
          <div className="flex gap-2">
            <a 
              href="https://www.instagram.com/p/DWHIeDVD5sl/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => {
                setIsVisible(false);
                localStorage.setItem('chithi_giveaway_dismissed', 'true');
              }}
              className="flex-1 py-3 bg-stone-900 text-white rounded-2xl text-[12px] font-bold text-center shadow-lg shadow-stone-900/10 active:scale-95 transition-all"
            >
              View
            </a>
            <button 
              onClick={() => {
                setIsVisible(false);
                localStorage.setItem('chithi_giveaway_dismissed', 'true');
              }}
              className="flex-1 py-3 bg-stone-100 text-stone-600 rounded-2xl text-[12px] font-bold text-center hover:bg-stone-200 transition-all active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
