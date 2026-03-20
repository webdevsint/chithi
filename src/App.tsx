import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, useMotionValueEvent } from 'motion/react';
import { ChevronRight, ChevronLeft, Share2, ArrowLeft, Sparkles, X, Download, Loader, Link, Search } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import LZString from 'lz-string';

const TEMPLATES = {
  1: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/1.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/2.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/19.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/20.png"
  },
  2: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/3.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/4.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/21.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/22.png"
  },
  3: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/5.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/6.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/23.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/24.png"
  },
  4: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/7.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/8.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/25.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/26.png"
  },
  5: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/9.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/10.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/27.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/28.png"
  },
  6: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/classic/11.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/classic/12.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/29.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/30.png"
  },
  7: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/partners/1.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/partners/2.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/11.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/12.png"
  },
  8: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/partners/3.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/partners/4.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/13.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/14.png"
  },
  9: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/partners/5.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/partners/6.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/15.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/16.png"
  },
  10: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/partners/7.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/partners/8.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/17.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/18.png"
  },
  11: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/1.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/2.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/31.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/32.png"
  },
  12: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/3.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/4.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/33.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/34.png"
  },
  13: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/5.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/6.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/35.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/36.png"
  },
  14: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/7.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/8.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/37.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/38.png"
  },
  15: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/9.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/10.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/39.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/40.png"
  },
  16: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/11.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/12.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/41.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/42.png"
  },
  17: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/13.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/14.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/43.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/44.png"
  },
  18: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/15.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/16.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/45.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/46.png"
  },
  19: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/17.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/18.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/47.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/48.png"
  },
  20: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/19.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/20.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/49.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/50.png"
  },
  21: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/21.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/22.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/51.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/52.png"
  },
  22: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/anime/23.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/anime/24.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/53.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/54.png"
  },
  23: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/friends/1.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/friends/2.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/1.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/2.png"
  },
  24: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/friends/3.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/friends/4.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/3.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/4.png"
  },
  25: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/friends/5.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/friends/6.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/5.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/6.png"
  },
  26: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/friends/7.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/friends/8.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/7.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/8.png"
  },
  27: {
    front: 'https://ik.imagekit.io/cursorstudios/chithi/friends/9.png?tr=w-1000,q-80,f-auto',
    back: 'https://ik.imagekit.io/cursorstudios/chithi/friends/10.png?tr=w-1000,q-80,f-auto',
    textColor: '#4a4a4a',
    shareFront: "https://ik.imagekit.io/cursorstudios/chithi/share/9.png",
    shareBack: "https://ik.imagekit.io/cursorstudios/chithi/share/10.png"
  },

};

type Category = 'Classic' | 'Family' | 'Partners' | 'Friends' | 'Anime';

const CATEGORIES: { name: Category; templates: number[] }[] = [
  { name: 'Classic', templates: [1, 2, 3] },
  { name: 'Family', templates: [4, 5, 6] },
  { name: 'Partners', templates: [7, 8, 9, 10] },
  { name: 'Friends', templates: [23, 24, 25, 26, 27] },
  { name: 'Anime', templates: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
];

// CardImage with Blur-Up Placeholder
const CardImage = ({ src, alt, className, fetchPriority, width = 1000 }: { src: string, alt: string, className?: string, fetchPriority?: 'high' | 'low' | 'auto', width?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const finalSrc = src.replace('w-1000', `w-${width}`);
  const lqipSrc = src.replace('?tr=w-1000,q-80,f-auto', '?tr=w-20,bl-10,q-10,f-auto');

  return (
    <div className={`relative ${className}`}>
      <img 
        src={lqipSrc} 
        alt={`Placeholder for ${alt}`} 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} 
        referrerPolicy="no-referrer" 
      />
      <img 
        src={finalSrc} 
        alt={alt} 
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        referrerPolicy="no-referrer" 
        fetchPriority={fetchPriority}
      />
    </div>
  );
};

// CardTemplate
const CardTemplate = ({ templateId, side, to, from, message, isThumbnail = false, fetchPriority, imageWidth = 1000 }: { templateId: number, side: 'front' | 'back', to?: string, from?: string, message?: string, isThumbnail?: boolean, fetchPriority?: 'high' | 'low' | 'auto', imageWidth?: number }) => {
  const template = TEMPLATES[templateId as keyof typeof TEMPLATES];

  const category = CATEGORIES.find(c => c.templates.includes(templateId))?.name;
  let signOff = 'Sincerely,';
  if (category === 'Classic' || category === 'Friends' || category === 'Family') {
    signOff = 'Warm Wishes,';
  } else if (category === 'Partners') {
    signOff = 'Forever Yours,';
  }

  if (side === 'front') {
    return (
      <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm bg-stone-100">
        <CardImage src={template.front} alt="Card Front" className="w-full h-full" fetchPriority={fetchPriority} width={imageWidth} />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm bg-stone-100">
      <CardImage src={template.back} alt="Card Back" className="w-full h-full" fetchPriority={fetchPriority} width={imageWidth} />
      <div className={`absolute inset-0 flex flex-col items-center pt-[15%] ${isThumbnail ? 'pb-[35%] px-6 md:pb-[32%] md:px-8 lg:pb-[30%] lg:px-12' : 'pb-[30%] px-8 md:pb-[30%] md:px-12'} text-center`} style={{ color: template.textColor }}>
        <p className={`font-serif ${isThumbnail ? 'text-lg md:text-[22px] lg:text-2xl' : 'text-xl md:text-2xl'} mb-2 leading-relaxed`}>Dear {to},</p>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className={`font-sans ${isThumbnail ? 'text-xs md:text-[15px] lg:text-base leading-relaxed lg:leading-loose max-w-[90%] md:max-w-[85%]' : 'text-sm md:text-base leading-loose max-w-[85%] md:leading-loose md:max-w-[85%]'} opacity-90 whitespace-pre-wrap`}>{message}</p>
        </div>
        <div className={`mt-${isThumbnail ? '1' : '2'} md:mt-2`}>
          <p className={`font-sans ${isThumbnail ? 'text-[8px] md:text-[10.5px] lg:text-xs' : 'text-[10px] md:text-xs'} uppercase tracking-widest opacity-60 mb-1`}>{signOff}</p>
          <p className={`font-serif ${isThumbnail ? 'text-xl md:text-[26px] lg:text-3xl' : 'text-2xl md:text-3xl'} italic`} style={{ fontFamily: "'Playfair Display', serif" }}>{from}</p>
        </div>
      </div>
    </div>
  );
};

// AboutView
const AboutView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-4 md:p-8">
      <Helmet>
        <title>About - চিঠি (Chithi)</title>
        <meta name="description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
        <meta property="og:title" content="About - চিঠি (Chithi)" />
        <meta property="og:description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
        <meta property="twitter:title" content="About - চিঠি (Chithi)" />
        <meta property="twitter:description" content="Learn about the vision behind চিঠি (Chithi), a digital artifact designed with the soul of a handwritten letter." />
      </Helmet>
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100">
          <X className="w-5 h-5" />
        </button>

        <div className="mt-4 flex flex-col items-center">
          <img src="https://ik.imagekit.io/cursorstudios/chithi/logo%20with%20text.png?tr=w-400,q-80,f-auto" alt="Chithi Logo" className="h-16 md:h-20 mb-2" referrerPolicy="no-referrer" />
          <p className="text-sm text-stone-500 mb-10">
            A <a href="https://cursorstudios.net/" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-medium hover:underline">Cursor Studios</a> Initiative
          </p>

          <div className="space-y-8 text-stone-700 leading-relaxed text-sm md:text-base w-full text-left">
            <section>
              <h2 className="font-serif text-xl mb-3 text-stone-900">The Vision</h2>
              <p className="font-sans mb-3">
                In an era of instant blue ticks and vanishing "stories," the weight of a word has been lost. We've traded the tactile thrill of tearing open an envelope for the sterile tap of a notification.
              </p>
              <p className="font-sans mb-3">
                <strong>চিঠি</strong> is our attempt to restore that gravity.
              </p>
              <p className="font-sans mb-3">
                It is a digital artifact designed with the soul of a handwritten letter. We combined the nostalgia of the 90s "Eid Card" culture with the precision of modern physics-based interactions to create a space where secrets have a home.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3 text-stone-900">Why "চিঠি"?</h2>
              <p className="font-sans mb-3">
                Because a message is data, but a <strong className="font-bangla text-lg font-normal">চিঠি</strong> is a memory.
              </p>
              <p className="font-sans mb-3">
                By naming it <strong className="font-bangla text-lg font-normal">চিঠি</strong>, we are honoring the tradition of private, thoughtful communication. It’s not about speed; it’s about the reveal. The pull-tab, the tension of the paper, and the final 3D fall—it’s all a tribute to the physical letters that used to travel across districts just to say "Eid Mubarak."
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-4 text-stone-900">Why we are different</h2>
              <p className="font-sans mb-5">
                In a world of data-mining and permanent digital footprints, we believe your personal wishes shouldn't be "content" for a server.
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">Privacy by Design</h3>
                  <p className="font-sans text-sm opacity-90">Your messages are encoded into your unique link. We don't store them, we don't read them, and we don't sell them.</p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">Zero Footprint</h3>
                  <p className="font-sans text-sm opacity-90">No accounts, no logins, no tracking. Just pure emotion.</p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-stone-900 mb-1">The Scented Pen Vibe</h3>
                  <p className="font-sans text-sm opacity-90">Our templates are designed to evoke the specific nostalgia of <span className="font-bangla text-base">শৈশব</span>—from glossy patterns to classic calligraphy.</p>
                </div>
              </div>
            </section>

            <div className="mt-10 pt-6 border-t border-stone-100 text-center space-y-2">
              
              <p className="font-sans text-xs text-stone-400 pt-2">
                In collaboration with <span className="font-semibold text-stone-500">Project Eunoia</span> <span className="mx-1 opacity-50">•</span> v1.0.0
              </p>
              <p className="font-sans text-xs text-stone-400 pt-2">
                Created by <span className="font-semibold text-stone-500">Nehan Yaser</span> & <span className="font-semibold text-stone-500">Mahian Arthob</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HomeView
const HomeView = () => {
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
      </Helmet>
      {/* Header */}
      <header className="w-full p-6 md:p-10 flex justify-between items-center z-10">
        <img src="https://ik.imagekit.io/cursorstudios/chithi/logo.png?tr=w-200,q-80,f-auto" alt="Chithi Logo" className="h-9 md:h-11" referrerPolicy="no-referrer" />
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
                onDragEnd={(e, { offset, velocity }) => {
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

// PullTabReveal
const triggerHaptic = (pattern: number | number[] = 50) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

const PullTabReveal = ({ front, back }: { front: React.ReactNode, back: React.ReactNode }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const isRevealedRef = React.useRef(false);
  const dragY = useMotionValue(0);
  const controls = useAnimation();

  const tabColor = useTransform(dragY, [0, 90], ['#502a73', '#341b4b']);
  const shadowOpacity = useTransform(dragY, [0, 90], [0, 0.5]);
  const tabHeight = useTransform(dragY, v => 80 + v);
  const tabMarginTop = useTransform(dragY, v => -v);

  const triggerReveal = async () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    triggerHaptic(50);

    await controls.start({
      rotateX: -60,
      y: window.innerHeight + 200,
      transition: {
        rotateX: { duration: 0.3, ease: "easeIn" },
        y: { duration: 0.6, delay: 0.15, ease: [0.5, 0, 1, 0.5] }
      }
    });
  };

  useMotionValueEvent(dragY, "change", (latest) => {
    // Removed auto-trigger
  });

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y >= 90) {
      triggerReveal();
    }
  };

  return (
    <div className="relative w-full h-full perspective-[1200px]">
      {/* Back (Message) */}
      <div className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl bg-stone-100">
        {back}
      </div>

      {/* Front Cover */}
      <motion.div
        className="absolute inset-0 w-full h-full origin-bottom rounded-2xl"
        style={{ zIndex: 10, transformStyle: 'preserve-3d' }}
        animate={controls}
      >
        {front}

        {/* Dynamic Shadow at the top as it tilts */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent rounded-t-2xl pointer-events-none"
          style={{ opacity: isRevealed ? 0 : shadowOpacity }}
        />

        {/* Fall Shadow (when revealed) */}
        {isRevealed && (
          <motion.div
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent rounded-t-2xl pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Pull Tab */}
        {!isRevealed && (
          <motion.div
            className="absolute top-0 right-8 w-14 rounded-b-xl cursor-grab active:cursor-grabbing flex flex-col justify-end items-center pb-3 shadow-lg"
            style={{
              y: dragY,
              height: tabHeight,
              marginTop: tabMarginTop,
              backgroundColor: tabColor,
              zIndex: 50
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 90 }}
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
          >
            <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 select-none">Pull</div>
            <div className="w-6 h-1.5 bg-white/40 rounded-full" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// PreviewModal
const PreviewModal = ({ templateId, data, onClose }: { templateId: number, data: any, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 flex flex-col items-center w-full pointer-events-none"
      >
        <div className="w-full max-w-[320px] md:max-w-[380px] aspect-[2/3] pointer-events-auto">
          <PullTabReveal
            front={<CardTemplate templateId={templateId} side="front" />}
            back={<CardTemplate templateId={templateId} side="back" to={data.to} from={data.from} message={data.message} />}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// EditorView
const EditorView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateIdParam = searchParams.get('t');
  const templateId = templateIdParam ? parseInt(templateIdParam, 10) : null;

  useEffect(() => {
    if (!templateId || !TEMPLATES[templateId as keyof typeof TEMPLATES]) {
      navigate('/', { replace: true });
    }
  }, [templateId, navigate]);

  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('May the magic of this Eid bring lots of happiness in your life and may you celebrate it with all your close friends & family.');
  const [showPreview, setShowPreview] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  if (!templateId || !TEMPLATES[templateId as keyof typeof TEMPLATES]) {
    return null; // or a loading spinner while redirecting
  }

  const sanitizeInput = (val: string) => val.replace(/[<>]/g, '');

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(sanitizeInput(e.target.value).slice(0, 15));
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(sanitizeInput(e.target.value).slice(0, 15));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(sanitizeInput(e.target.value).slice(0, 170));
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const payload = {
        t: templateId.toString(),
        to,
        from,
        m: message
      };
      const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
      const longUrl = `${window.location.origin}/view?c=${encoded}`;
      
      let finalUrl = longUrl;
      
      try {
        const loginRes = await fetch('https://cl.cursorstudios.net/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'projecteid2026', password: 'sucmanuts420' })
        });
        const loginData = await loginRes.json();
        
        if (loginData.success && loginData.data?.token) {
          const linkRes = await fetch('https://cl.cursorstudios.net/api/links', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loginData.data.token}`
            },
            body: JSON.stringify({ originalUrl: longUrl })
          });
          const linkData = await linkRes.json();
          
          if (linkData.success && linkData.data?.shortUrl) {
            finalUrl = linkData.data.shortUrl;
          }
        }
      } catch (err) {
        console.error('Failed to shorten URL:', err);
      }

      setShareUrl(finalUrl);
      setShareModalOpen(true);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col min-[1300px]:flex-row bg-white">
      <Helmet>
        <title>Create Card - চিঠি (Chithi)</title>
        <meta name="description" content="Write your heart out and send a digital card that feels like home." />
      </Helmet>
      {/* Left: Preview */}
      <div className="flex-1 bg-[#fcfcfc] flex flex-col items-center justify-center p-8 min-[1300px]:p-12 relative overflow-y-auto">
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors z-10">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-12 md:mt-0">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Front</span>
            <div className="w-[240px] md:w-[300px] lg:w-[340px] aspect-[2/3] shadow-2xl rounded-2xl">
              <CardTemplate templateId={templateId} side="front" isThumbnail />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Back</span>
            <div className="w-[240px] md:w-[300px] lg:w-[340px] aspect-[2/3] shadow-2xl rounded-2xl">
              <CardTemplate templateId={templateId} side="back" to={to || 'Recipient'} from={from || 'Your Name'} message={message} isThumbnail />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full min-[1300px]:w-[480px] bg-white p-8 min-[1300px]:p-12 flex flex-col border-l border-stone-100 overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <h2 className="font-serif text-3xl mb-2 text-stone-900">Personalize</h2>
          <p className="text-stone-500 text-sm mb-10">Add your personal touch to the greeting.</p>

          <div className="space-y-8 flex-1">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">To</label>
                <span className={`text-[10px] transition-colors duration-300 ${to.length >= 12 ? 'text-red-500' : 'text-stone-400'}`}>{to.length}/15</span>
              </div>
              <input type="text" maxLength={15} value={to} onChange={handleToChange} className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent font-serif text-xl text-stone-800 placeholder:text-stone-300" placeholder="Recipient Name" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">Message</label>
                <span className={`text-[10px] transition-colors duration-300 ${message.length >= 160 ? 'text-red-500' : 'text-stone-400'}`}>{message.length}/170</span>
              </div>
              <textarea maxLength={170} value={message} onChange={handleMessageChange} className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent font-sans text-base resize-none h-32 leading-relaxed text-stone-700 placeholder:text-stone-300" placeholder="Your message here..." />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">From</label>
                <span className={`text-[10px] transition-colors duration-300 ${from.length >= 12 ? 'text-red-500' : 'text-stone-400'}`}>{from.length}/15</span>
              </div>
              <input type="text" maxLength={15} value={from} onChange={handleFromChange} className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent font-serif text-xl text-stone-800 placeholder:text-stone-300" placeholder="Your Name" />
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <button
              onClick={() => setShowPreview(true)}
              disabled={!to.trim() || !from.trim()}
              className={`flex-1 bg-white border border-stone-200 py-4 rounded-full font-medium tracking-wide flex items-center justify-center shadow-sm transition-colors ${!to.trim() || !from.trim() ? 'opacity-50 cursor-not-allowed text-stone-400' : 'text-stone-900 hover:bg-stone-50'}`}
            >
              Preview
            </button>
            <button
              onClick={handleShare}
              disabled={!to.trim() || !from.trim() || isSharing}
              className={`flex-1 py-4 rounded-full font-medium tracking-wide flex items-center justify-center transition-colors ${!to.trim() || !from.trim() || isSharing ? 'bg-stone-300 text-stone-500 cursor-not-allowed' : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-900/20'}`}
            >
              {isSharing ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />}
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            templateId={templateId}
            data={{ to: to || 'Recipient', from: from || 'Your Name', message }}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareModalOpen && (
          <ShareModal 
            url={shareUrl} 
            templateId={templateId}
            data={{ to, from, message }}
            onClose={() => setShareModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// SharedCardView
const SharedCardView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const c = searchParams.get('c');
  const d = searchParams.get('d');

  let templateId = 0;
  let data = { to: '', from: '', message: '' };
  let isValid = false;

  if (c) {
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(c);
      if (decompressed) {
        const decoded = JSON.parse(decompressed);
        if (decoded.t) {
          templateId = parseInt(decoded.t, 10);
          data = {
            to: decoded.to || '',
            from: decoded.from || '',
            message: decoded.m || ''
          };
          isValid = true;
        }
      }
    } catch (e) {
      console.error("Failed to decompress URL", e);
    }
  } else if (d) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(d)));
      if (decoded.t) {
        templateId = parseInt(decoded.t, 10);
        data = {
          to: decoded.to || '',
          from: decoded.from || '',
          message: decoded.m || ''
        };
        isValid = true;
      }
    } catch (e) {
      console.error("Failed to decode URL", e);
    }
  } else {
    const t = searchParams.get('t');
    if (t) {
      templateId = parseInt(t, 10);
      data = {
        to: searchParams.get('to') || '',
        from: searchParams.get('from') || '',
        message: searchParams.get('m') || ''
      };
      isValid = true;
    }
  }

  if (isValid && !TEMPLATES[templateId as keyof typeof TEMPLATES]) {
    isValid = false;
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="text-center z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-serif text-3xl mb-3 text-stone-900">Card Not Found</h1>
          <p className="text-stone-500 mb-8 max-w-sm mx-auto">This link appears to be invalid or broken. The card encoding may have been malformed or the URL is incorrect.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Helmet>
        <title>You received a চিঠি (Chithi)</title>
        <meta name="description" content="Someone sent you a personal Eid card. Open it to see their message." />
        <meta property="og:title" content="You received a চিঠি (Chithi)" />
        <meta property="og:description" content="Someone sent you a personal Eid card. Open it to see their message." />
        <meta property="twitter:title" content="You received a চিঠি (Chithi)" />
        <meta property="twitter:description" content="Someone sent you a personal Eid card. Open it to see their message." />
      </Helmet>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl opacity-30 blur-[100px] bg-gradient-to-tr from-amber-100 to-emerald-50 pointer-events-none" />

      <div className="text-center mb-10 z-10 pointer-events-none">
        <p className="font-serif text-xl text-stone-800">You received a চিঠি</p>
      </div>

      <div className="w-full max-w-[320px] md:max-w-[380px] aspect-[2/3] mb-12 z-10">
        <PullTabReveal
          front={<CardTemplate templateId={templateId} side="front" />}
          back={<CardTemplate templateId={templateId} side="back" to={data.to} from={data.from} message={data.message} />}
        />
      </div>

      <div className="flex flex-col gap-3 mt-4 z-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={() => {
            handleInstagramDownload(templateId, data);
          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-md hover:shadow-lg transition-all font-medium text-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Download Instagram Stories
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center justify-center px-6 py-3 bg-white text-stone-900 rounded-full shadow-sm hover:shadow-md transition-all font-medium text-sm border border-stone-100"
        >
          Create your own Eid card
        </motion.button>
      </div>
    </div>
  );
};

// ShareModal
const handleInstagramDownload = async (templateId: number, data: any) => {
  const template = TEMPLATES[templateId as keyof typeof TEMPLATES];
  if (!template) return;

  try {
    // 1. Download Front
    const frontImg = new Image();
    frontImg.crossOrigin = "Anonymous";
    frontImg.src = template.shareFront;
    await new Promise((resolve, reject) => {
      frontImg.onload = resolve;
      frontImg.onerror = reject;
    });

    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = frontImg.width;
    frontCanvas.height = frontImg.height;
    const frontCtx = frontCanvas.getContext('2d');
    if (frontCtx) {
      frontCtx.drawImage(frontImg, 0, 0);
      const frontDataUrl = frontCanvas.toDataURL('image/png');
      const frontLink = document.createElement('a');
      frontLink.href = frontDataUrl;
      frontLink.download = `Chithi ${Date.now()} - Front.png`;
      document.body.appendChild(frontLink);
      frontLink.click();
      document.body.removeChild(frontLink);
    }

    // 2. Generate and Download Back (with overlay)
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const backImg = new Image();
    backImg.crossOrigin = "Anonymous";
    backImg.src = template.shareBack;
    
    await new Promise((resolve, reject) => {
      backImg.onload = resolve;
      backImg.onerror = reject;
    });

    ctx.drawImage(backImg, 0, 0, 1080, 1920);

    // Text Overlay Logic
    ctx.textAlign = 'center';
    
    // Proportional scaling from frontend (based on 1080px width)
    // frontend desktop reference: To=24px, Message=16px, SignOff=12px, From=32px

    // Dynamic starting position based on message length
    const messageLength = (data.message || '').length;
    const startY = messageLength <= 150 ? 620 : 580;

    // 1. Dear {To}
    ctx.fillStyle = '#1c1917'; // stone-900
    ctx.font = '64px "Playfair Display", serif';
    ctx.fillText(`Dear ${data.to || 'Recipient'},`, 540, startY);

    // 2. Message (Gap of 130px from Dear)
    ctx.fillStyle = '#44403c'; // stone-700
    ctx.font = '38px "Inter", sans-serif';
    const words = (data.message || '').split(' ');
    let line = '';
    let y = startY + 130;
    const lineHeight = 62;
    const maxWidth = 560;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), 540, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), 540, y);

    // 3. Sign off (Uniform gap of 130px after message)
    const category = CATEGORIES.find(c => c.templates.includes(templateId))?.name;
    let signOff = 'Sincerely,';
    if (category === 'Classic' || category === 'Friends' || category === 'Family') {
      signOff = 'Warm Wishes,';
    } else if (category === 'Partners') {
      signOff = 'Forever Yours,';
    }

    y += 130; 
    ctx.fillStyle = '#a8a29e'; // stone-400
    ctx.font = '28px "Inter", sans-serif';
    ctx.letterSpacing = '4px'; // tracking-widest
    ctx.fillText(signOff.toUpperCase(), 540, y);
    ctx.letterSpacing = '0px';

    // 4. From {From} (Tightened gap for more cohesion)
    y += 80; 
    ctx.fillStyle = '#1c1917'; 
    ctx.font = 'italic 88px "Playfair Display", serif';
    ctx.fillText(data.from || 'Your Name', 540, y);

    const backDataUrl = canvas.toDataURL('image/png');
    const backLink = document.createElement('a');
    backLink.href = backDataUrl;
    backLink.download = `Chithi ${Date.now()} - Back.png`;
    document.body.appendChild(backLink);
    backLink.click();
    document.body.removeChild(backLink);

  } catch (err) {
    console.error('Failed to generate sharing images:', err);
  }
};

// ShareModal
const ShareModal = ({ url, templateId, data, onClose }: { url: string, templateId: number, data: any, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        setLogoDataUrl(canvas.toDataURL());
      } catch (e) {
        console.error("Error processing logo:", e);
      }
    };
    img.src = "https://s6.imgcdn.dev/Yrv8GH.png";
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (navigator.share) {
        await navigator.share({
          title: 'চিঠি (Chithi)',
          text: 'I made an Eid card for you! View it here:',
          url: url
        });
      }
    } catch (err) {
      console.error('Failed to copy/share:', err);
    }
  };

  const downloadQR = async () => {
    const qrCanvas = document.getElementById('download-qr-code') as HTMLCanvasElement;
    if (!qrCanvas) return;

    // Create a new canvas for the composite
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load Footer Image
    const footerImg = new Image();
    footerImg.src = '/qr footer.png';
    
    await new Promise((resolve) => {
      footerImg.onload = resolve;
      footerImg.onerror = resolve; // Continue even if footer fails
    });

    const qrSize = qrCanvas.width;
    const footerWidth = qrSize; // Full width
    const footerHeight = (footerImg.height / footerImg.width) * footerWidth;
    const paddingTop = 5; 
    const paddingBottom = 40;
    
    canvas.width = qrSize;
    canvas.height = qrSize + footerHeight + paddingTop + paddingBottom;
    const x = 0;

    // 1. Fill Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw QR Code
    ctx.drawImage(qrCanvas, 0, 0);

    // 3. Draw Footer Image (Horizontal Center)
    if (footerImg.complete && footerImg.naturalWidth > 0) {
      ctx.drawImage(footerImg, x, qrSize + paddingTop, footerWidth, footerHeight);
    }

    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'chithi-eid-card-qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative flex flex-col items-center text-center z-10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors p-2">
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl mb-2 text-stone-900 mt-2">Your card is ready</h3>
        <p className="text-stone-500 text-sm mb-6 leading-relaxed">Scan the QR code or share the link below.</p>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 inline-block">
            <QRCodeCanvas
              id="share-qr-code"
              value={url}
              size={180}
              level="H"
              includeMargin={false}
              imageSettings={logoDataUrl ? {
                src: logoDataUrl,
                height: 40,
                width: 40,
                excavate: true,
              } : undefined}
            />
            <div className="hidden">
              <QRCodeCanvas
                id="download-qr-code"
                value={url}
                size={1000}
                level="H"
                includeMargin={true}
                imageSettings={logoDataUrl ? {
                  src: logoDataUrl,
                  height: 220,
                  width: 220,
                  excavate: true,
                } : undefined}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button onClick={downloadQR} className="w-full py-3.5 flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors">
            <Download className="w-4 h-4" /> Download QR
          </button>
          
          <button 
            onClick={() => handleInstagramDownload(templateId, data)}
            className="w-full py-3.5 flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Instagram Stories
          </button>

          <button onClick={handleCopy} className="w-full py-3.5 flex items-center justify-center gap-2 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            <Link className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// NotFoundView
const NotFoundView = () => {
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

// App
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
            <HomeView />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen">
            <AboutView />
          </motion.div>
        } />
        <Route path="/create" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-screen">
            <EditorView />
          </motion.div>
        } />
        <Route path="/view" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <SharedCardView />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <NotFoundView />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

// PWA Install Banner Component
const InstallBanner = ({ installPrompt, onInstall, visitCount }: { installPrompt: any, onInstall: () => void, visitCount: number }) => {
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
              <img src="https://ik.imagekit.io/cursorstudios/chithi/logo.png?tr=w-100,q-80,f-auto" alt="Chithi Logo" className="w-8 h-8 object-contain" />
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
    <BrowserRouter>
      <div className="min-h-screen bg-[#fcfcfc] font-sans text-stone-900 selection:bg-stone-200">
        <AnimatedRoutes />
        <InstallBanner installPrompt={installPrompt} onInstall={handleInstallClick} visitCount={visitCount} />
      </div>
    </BrowserRouter>
  );
}
