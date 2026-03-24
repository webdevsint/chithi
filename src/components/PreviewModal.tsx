import { motion } from 'motion/react';
import { PullTabReveal } from './PullTabReveal';
import { CardTemplate } from './CardTemplate';
import { CardData } from '../types';

export const PreviewModal = ({ templateId, data, onClose }: { templateId: number, data: CardData, onClose: () => void }) => {
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
