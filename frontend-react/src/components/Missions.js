import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

import ModalForm from './ModalForm';
import FaceToFaceLogo from './LogoUa';

const swipeConfidenceThreshold = 100;

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/Mission/random')
      .then(res => res.json())
      .then(data => {
        setMissions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSwipe = (offsetX, index) => {
    if (Math.abs(offsetX) > swipeConfidenceThreshold) {
      setMissions(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-10">
        <div className="w-full max-w-4xl rounded-3xl border border-zinc-700 p-12 animate-pulse bg-white dark:bg-gray-800">
          <div className="h-12 w-12 bg-gray-300 dark:bg-zinc-600 rounded-full mx-auto mb-6" />
          <div className="h-6 bg-gray-300 dark:bg-zinc-600 rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-5/6 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-10 bg-noise">
      
      <div className="w-[320px] mb-8">
        <FaceToFaceLogo />
      </div>

      <AnimatePresence>
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id || index}
            className="relative w-full max-w-4xl my-6"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* glow */}
            <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300 via-purple-200 to-indigo-300 opacity-30 blur-2xl pointer-events-none" />

            <motion.div
              drag="x"
              dragElastic={0.25}
              dragConstraints={{ left: -300, right: 300 }}
              onDragEnd={(e, info) => handleSwipe(info.offset.x, index)}
              className="
                relative z-10 w-full rounded-3xl p-12 text-center space-y-8 cursor-grab active:cursor-grabbing
                bg-white/10 dark:bg-black/40 backdrop-blur-lg
                border border-white/20
                hover:scale-[1.02] transition-transform
              "
            >
              <div className="absolute top-4 right-4 text-gray-700 dark:text-gray-200">
                <ArrowRightLeft size={22} />
              </div>

              <div className="flex justify-center">
                <img
                  src={`data:image/svg+xml;base64,${mission.image}`}
                  width={48}
                  height={48}
                  alt="mission"
                />
              </div>

              <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {mission.question}
              </h3>

              <motion.p
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                {mission.missionType || 'Опис місії недоступний.'}
              </motion.p>

            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      <ModalForm />

      <style jsx>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='%23fff' fill-opacity='0.03' cx='1' cy='1' r='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }
      `}</style>

    </div>
  );
};

export default Missions;
