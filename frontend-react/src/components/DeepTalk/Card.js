import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

export default function Card({ question, missionType, image }) {
  return (
    <motion.div
      className="
        relative overflow-hidden
        rounded-2xl p-12 text-center
        bg-white/10 dark:bg-black/40
        backdrop-blur-lg
        border border-white/20
        shadow-xl
      "
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="article"
      aria-label={question}
    >
      <div className="absolute top-5 right-5 text-white/70">
        <ArrowRightLeft size={20} />
      </div>

      <div className="flex justify-center mb-6">
        {image ? (
          <img
            src={image.startsWith('data:') ? image : `data:image/svg+xml;base64,${image}`}
            alt="mission"
            className="w-14 h-14"
          />
        ) : (
          <div className="w-14 h-14" />
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2 text-white">
        {question}
      </h2>

      <p className="text-lg text-indigo-200">
        {missionType || 'No type'}
      </p>
    </motion.div>
  );
}
