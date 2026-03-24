import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl opacity-30 blur-[100px] bg-gradient-to-tr from-amber-100 to-emerald-50 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
           <Search className="w-8 h-8 text-stone-500" />
        </div>
        <h1 className="font-serif text-4xl mb-4 text-stone-900">Lost in the mail?</h1>
        <p className="text-stone-500 mb-10 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a different address.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95"
        >
          Return Home
        </button>
      </motion.div>
    </div>
  );
};
