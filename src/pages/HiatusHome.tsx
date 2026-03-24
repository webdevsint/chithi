import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export const HiatusHome = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 relative overflow-x-hidden overflow-y-auto">
      <Helmet>
        <title>চিঠি (Chithi) - See you soon</title>
        <meta name="description" content="Chithi pilot has concluded. Stay tuned for what's next." />
      </Helmet>
      
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl opacity-30 blur-[100px] bg-gradient-to-tr from-amber-100 to-emerald-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-3xl px-8 py-12 md:px-12 md:py-16 my-8 md:my-12 rounded-[2rem] shadow-xl border border-stone-100 z-10 text-center flex-shrink-0"
      >
        <img src="/logo with text.png" alt="Chithi Logo" className="h-16 md:h-20 mx-auto mb-8" />
        
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">Thank You</h1>
        <p className="text-stone-500 mb-10 max-w-md mx-auto leading-relaxed">
          The <strong className="font-bangla font-normal">চিঠি</strong> (Make Eid Personal) pilot was a beautiful journey. Here are the results of our experiment in restoring the gravity of a personal message.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 mb-16 px-4">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">373</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Total Cards</span>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">732</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Total Clicks</span>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-stone-100" />
            <span className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">51%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Conversion</span>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <span className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">0</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Ad Spend</span>
          </div>
        </div>

        <h2 className="font-serif text-2xl text-stone-900 mb-3">We will be back.</h2>
        <p className="text-stone-500 mb-8">Until then, existing cards remain viewable.</p>

        <a
          href="mailto:contact@cursorstudios.net" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95"
        >
          Contact us for collaborations
        </a>
        
        <p className="font-sans text-xs text-stone-400 mt-10">
          A <a href="https://cursorstudios.net" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium hover:underline">Cursor Studios</a> Initiative
        </p>
      </motion.div>
    </div>
  );
};
