import { TEMPLATES, CATEGORIES } from '../config/constants';
import { CardData } from '../types';

export const handleDownloadFront = async (templateId: number) => {
  const template = TEMPLATES[templateId];
  if (!template) return;

  try {
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
  } catch (err) {
    console.error('Failed to download front image:', err);
  }
};

export const handleDownloadBack = async (templateId: number, data: CardData) => {
  const template = TEMPLATES[templateId];
  if (!template) return;

  try {
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
    ctx.font = '88px "Playfair Display", serif';
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
    // @ts-ignore
    ctx.letterSpacing = '4px'; // tracking-widest
    ctx.fillText(signOff.toUpperCase(), 540, y);
    // @ts-ignore
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
