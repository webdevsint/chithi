import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import { CATEGORIES } from '../config/constants';
import { Category } from '../types';
import { CardTemplate } from '../components/CardTemplate';

export const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    return (sessionStorage.getItem('chithi_category') as Category) || 'Classic';
  });
  const [currentIndex, setCurrentIndex] = useState(() => {
    return parseInt(sessionStorage.getItem('chithi_index') || '0', 10);
  });

  const activeTemplates = CATEGORIES.find(c => c.name === activeCategory)?.templates || [];

  useEffect(() => {
    if (searchParams.get('d') || searchParams.get('t')) {
      navigate(`/view?${searchParams.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    sessionStorage.setItem('chithi_category', cat);
    sessionStorage.setItem('chithi_index', '0');
  };

  useEffect(() => {
    sessionStorage.setItem('chithi_index', currentIndex.toString());
  }, [currentIndex]);

  const handleNext = () => {
    if (activeTemplates.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % activeTemplates.length);
    }
  };
  const handlePrev = () => {
    if (activeTemplates.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + activeTemplates.length) % activeTemplates.length);
    }
  };

  const getOffset = (index: number, current: number, total: number) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col overflow-x-hidden">
      <Helmet>
        <title>চিঠি (Chithi) - Make Eid Personal</title>
        <meta name="description" content="Choose a classic template to bring back the magic of শৈশব. Write your heart out and send a digital card that feels like home." />
        <meta property="og:image" content="https://chithi.cursorstudios.net/meta.png" />
        <meta property="twitter:image" content="https://chithi.cursorstudios.net/meta.png" />
      </Helmet>
      {/* Header */}
      <header className="w-full p-6 md:p-10 flex justify-between items-center z-10">
        <img src="/logo.png" alt="Chithi Logo" className="h-9 md:h-11" />
        <button onClick={() => navigate('/about')} className="text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
          About
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-8 md:pt-12 relative px-4 pb-8 md:pb-12">
        <div className="text-center mb-8 md:mb-12 z-10">
          <h1 className="font-serif text-4xl md:text-6xl mb-4 text-stone-900">Make Eid Personal</h1>
          <p className="font-sans text-stone-500 max-w-md mx-auto mb-8">Choose a classic template to bring back the magic of <span className="font-bangla text-lg">শৈশব</span>. Write your heart out and send a digital card that feels like home.</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name as Category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.name
                    ? 'bg-stone-200 text-stone-900 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] ring-1 ring-inset ring-stone-300/50 scale-[0.98]'
                    : 'bg-stone-50 text-stone-500 shadow-sm ring-1 ring-inset ring-stone-200/60 hover:bg-stone-100 hover:text-stone-900'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className={`relative w-full max-w-5xl flex items-center justify-center perspective-[1200px] transition-[height] duration-500 ease-in-out ${activeTemplates.length > 0 ? 'h-[400px] md:h-[550px]' : 'h-[160px] md:h-[200px]'}`}>
          <AnimatePresence mode="wait">
            {activeTemplates.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) {
                    handleNext();
                  } else if (offset.x > 50) {
                    handlePrev();
                  }
                }}
              >
                {activeTemplates.map((templateId, index) => {
                  const offset = getOffset(index, currentIndex, activeTemplates.length);
                  const isCenter = offset === 0;

                  const scale = isCenter ? 1 : 0.85;
                  const zIndex = 50 - Math.abs(offset);
                  const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0;
                  const rotateY = offset * -20;

                  return (
                    <motion.div
                      key={templateId}
                      className="absolute w-[240px] md:w-[320px] aspect-[2/3] cursor-pointer"
                      initial={false}
                      animate={{
                        x: `${offset * 85}%`,
                        scale,
                        zIndex,
                        opacity,
                        rotateY,
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                      onClick={() => {
                        if (isCenter) {
                          navigate(`/create?t=${templateId}`);
                        } else {
                          setCurrentIndex(index);
                        }
                      }}
                      style={{ transformStyle: 'preserve-3d', pointerEvents: opacity === 0 ? 'none' : 'auto' }}
                    >
                      <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden">
                        <CardTemplate templateId={templateId} side="front" fetchPriority={isCenter ? 'high' : 'auto'} imageWidth={600} />
                      </div>
                      {!isCenter && (
                        <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center text-stone-400 absolute inset-0"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                  <Loader className="w-6 h-6 text-stone-300 animate-spin" />
                </div>
                <p className="font-medium text-lg text-stone-500">New cards arriving soon</p>
                <p className="text-sm mt-2">Check back later for {activeCategory} templates</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <AnimatePresence>
          {activeTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-6 md:gap-8 mt-8 md:mt-10 z-10"
            >
              <button
                onClick={handlePrev}
                className="p-3 md:p-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate(`/create?t=${activeTemplates[currentIndex]}`)}
                className="px-8 md:px-10 py-3 md:py-4 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-stone-800 transition-colors shadow-xl shadow-stone-900/10"
              >
                Customize
              </button>
              <button
                onClick={handleNext}
                className="p-3 md:p-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
