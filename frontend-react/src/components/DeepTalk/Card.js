import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

export default function Card({ question, missionType, image }) {
  return (
    <motion.div
      className="relative rounded-2xl p-12 text-center bg-card-grad/70 border border-white/20 backdrop-blur-md shadow-2xl"
      initial={{ scale: 0.995 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      role="article"
      aria-label={question}
    >
      <div className="absolute top-5 right-5 text-white/70">
        <ArrowRightLeft size={20} />
      </div>

      {image ? (
        <div className="flex justify-center mb-6">
          <img
            src={image.startsWith('data:') ? image : `data:image/svg+xml;base64,${image}`}
            alt="mission"
            className="w-14 h-14 rounded-full"
          />
        </div>
      ) : (
        <div className="h-14" />
      )}

      <h2 className="text-3xl font-bold mb-2">{question}</h2>
      <p className="text-lg text-indigo-200">{missionType || 'No type'}</p>
    </motion.div>
  );
}
