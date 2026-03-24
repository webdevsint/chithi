import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Share2, Loader } from 'lucide-react';
import LZString from 'lz-string';
import { TEMPLATES } from '../config/constants';
import { CardTemplate } from '../components/CardTemplate';
import { PreviewModal } from '../components/PreviewModal';
import { ShareModal } from '../components/ShareModal';

export const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateIdParam = searchParams.get('t');
  const templateId = templateIdParam ? parseInt(templateIdParam, 10) : null;

  useEffect(() => {
    if (!templateId || !TEMPLATES[templateId]) {
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

  if (!templateId || !TEMPLATES[templateId]) {
    return null; 
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
        <meta property="og:image" content="https://chithi.cursorstudios.net/meta.png" />
        <meta property="twitter:image" content="https://chithi.cursorstudios.net/meta.png" />
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
