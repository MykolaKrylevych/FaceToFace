import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

import ModalForm from './ModalForm';
import FaceToFaceLogo from './LogoUa';

const swipeConfidenceThreshold = 100;
const AMOUNT = 10; // missions per API call

/* ---------------- Skeleton ---------------- */
const SkeletonCard = () => (
  <div className="w-full max-w-4xl rounded-3xl border border-zinc-700 p-12 animate-pulse bg-white dark:bg-gray-800">
    <div className="h-12 w-12 bg-gray-300 dark:bg-zinc-600 rounded-full mx-auto mb-6" />
    <div className="h-6 bg-gray-300 dark:bg-zinc-600 rounded w-3/4 mx-auto mb-4" />
    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-5/6 mx-auto mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3 mx-auto" />
  </div>
);

/* ---------------- Animations ---------------- */
const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (direction) => ({
    opacity: 0,
    x: direction * 450,
    rotate: direction * 18,
    scale: 0.9,
    transition: { duration: 0.35, ease: 'easeIn' },
  }),
};

/* ---------------- Component ---------------- */
const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(0);

  /* ---------------- Fetch missions ---------------- */
  const fetchMissions = async () => {
    try {
      const res = await fetch(`/api/Mission/random?status=approved&amount=${AMOUNT}`);
      const data = await res.json();
      setMissions(data);
      setCurrentIndex(0); // reset index to show new cards
    } catch (err) {
      console.error('Failed to fetch missions', err);
    }
  };

  useEffect(() => {
    fetchMissions().then(() => setLoading(false));
  }, []);

  /* ---------------- Swipe logic ---------------- */
  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;

    if (Math.abs(offsetX) > swipeConfidenceThreshold) {
      const direction = offsetX > 0 ? 1 : -1;
      setSwipeDirection(direction);
      if (currentIndex + 1 >= missions.length) {
        // If we reached the last card, fetch new missions
        fetchMissions();
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-10">
        <SkeletonCard />
      </div>
    );
  }

  const mission = missions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-10 bg-noise">
      <div className="w-[320px] mb-8">
        <FaceToFaceLogo />
      </div>

      <AnimatePresence mode="wait" custom={swipeDirection}>
        {mission && (
          <motion.div
            key={mission.id}
            custom={swipeDirection}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-4xl my-6"
          >
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300 via-purple-200 to-indigo-300 opacity-30 blur-2xl pointer-events-none" />

            <motion.div
              drag="x"
              dragElastic={0.25}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="
                relative z-10 w-full rounded-3xl p-12 text-center space-y-8
                cursor-grab active:cursor-grabbing
                bg-white/10 dark:bg-black/40 backdrop-blur-lg
                border border-white/20
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

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {mission.missionType || 'Опис місії недоступний.'}
              </p>
            </motion.div>
          </motion.div>
        )}
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
