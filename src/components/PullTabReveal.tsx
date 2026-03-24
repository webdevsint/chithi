import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useMotionValueEvent } from 'motion/react';

const triggerHaptic = (pattern: number | number[] = 50) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

export const PullTabReveal = ({ front, back }: { front: React.ReactNode, back: React.ReactNode }) => {
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

  const handleDragEnd = (_event: any, info: any) => {
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
