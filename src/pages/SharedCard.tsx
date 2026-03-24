import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { X, Download } from 'lucide-react';
import LZString from 'lz-string';
import { TEMPLATES } from '../config/constants';
import { CardTemplate } from '../components/CardTemplate';
import { PullTabReveal } from '../components/PullTabReveal';
import { handleDownloadFront, handleDownloadBack } from '../utils/download';

export const SharedCard = () => {
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

  if (isValid && !TEMPLATES[templateId]) {
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
        <meta property="og:image" content="https://chithi.cursorstudios.net/meta.png" />
        <meta property="twitter:title" content="You received a চিঠি (Chithi)" />
        <meta property="twitter:description" content="Someone sent you a personal Eid card. Open it to see their message." />
        <meta property="twitter:image" content="https://chithi.cursorstudios.net/meta.png" />
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

      <div className="flex flex-col sm:flex-row gap-3 mt-4 z-10 w-full max-w-[320px] md:max-w-[380px]">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={() => handleDownloadFront(templateId)}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-md hover:shadow-lg transition-all font-medium text-xs md:text-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Front Story
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={() => handleDownloadBack(templateId, data)}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-md hover:shadow-lg transition-all font-medium text-xs md:text-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Back Story
        </motion.button>
      </div>

      <div className="flex flex-col gap-3 mt-3 z-10 w-full max-w-[320px] md:max-w-[380px]">
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
