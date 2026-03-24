import { TEMPLATES, CATEGORIES } from '../config/constants';
import { CardImage } from './CardImage';

export const CardTemplate = ({ templateId, side, to, from, message, isThumbnail = false, fetchPriority, imageWidth = 1000 }: { templateId: number, side: 'front' | 'back', to?: string, from?: string, message?: string, isThumbnail?: boolean, fetchPriority?: 'high' | 'low' | 'auto', imageWidth?: number }) => {
  const template = TEMPLATES[templateId];

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
        <p className={`font-serif ${isThumbnail ? 'text-xl md:text-[26px] lg:text-3xl' : 'text-2xl md:text-3xl'} mb-2 leading-relaxed`}>Dear {to},</p>
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
