import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Download, Link as LinkIcon } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { CardData } from '../types';

export const ShareModal = ({ url, templateId, data, onClose }: { url: string, templateId: number, data: CardData, onClose: () => void }) => {
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

    // 1. Fill Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw QR Code
    ctx.drawImage(qrCanvas, 0, 0);

    // 3. Draw Footer Image (Horizontal Center)
    if (footerImg.complete && footerImg.naturalWidth > 0) {
      ctx.drawImage(footerImg, 0, qrSize + paddingTop, footerWidth, footerHeight);
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
          

          <button onClick={handleCopy} className="w-full py-3.5 flex items-center justify-center gap-2 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            <LinkIcon className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
