import { useState } from 'react';
import { IS_BOT } from '../utils/bot-detection';

export const CardImage = ({ src, alt, className, fetchPriority, width = 1000 }: { src: string, alt: string, className?: string, fetchPriority?: 'high' | 'low' | 'auto', width?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Prevent bots from fetching ImageKit images
  if (IS_BOT && src.includes('imagekit.io')) {
    return (
      <div className={`bg-stone-100 animate-pulse ${className}`} />
    );
  }

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
        // @ts-ignore
        fetchPriority={fetchPriority}
      />
    </div>
  );
};
