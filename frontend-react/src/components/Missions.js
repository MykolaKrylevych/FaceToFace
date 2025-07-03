import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ModalForm from './ModalForm';
import { ArrowRightLeft } from 'lucide-react';
import Logo from './Logo';
import FaceToFaceLogo from './LogoUa';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  }, [controls]);



  useEffect(() => {
    fetch('https://localhost:5001/api/Mission/random') // doapi:8081
      .then((res) => res.json())
      .then((data) => {
        setMissions(data);
        setLoading(false);
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      controls
        .start({ x: 300, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          window.location.reload();
        });
    } else if (info.offset.x < -100) {
      controls
        .start({ x: -300, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          window.location.reload();
        });
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300 } });
    }
  };

  if (loading) {
    return  (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-10">
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-10 bg-noise">
      <div className="flex justify-center w-full mb-8">
        <div className="w-[320px]"> {/* щоб обмежити ширину логотипу */}
          {/* <Logo /> */}
          <FaceToFaceLogo/>
        </div>
      </div>
      
      {missions.map((mission, index) => (
        <div key={index} className="relative w-full max-w-4xl my-4">
          {/* blur background */}
          {/* <div className="absolute -inset-2 rounded-3xl bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-teal-600 via-fuchsia-600 to-red-600 opacity-50 blur-2xl"></div> */}
          <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300 via-purple-200 to-indigo-300 opacity-30 blur-2xl pointer-events-none"></div>


        

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ opacity: 0, y: 20 }}
            className="
              relative z-10 w-full rounded-3xl p-12 text-center space-y-8 cursor-grab active:cursor-grabbing
              bg-white/10 dark:bg-black/40 backdrop-blur-lg border-2 border-gradient-to-r from-teal-400 via-purple-500 to-pink-500
              text-white
              hover:scale-[1.02] transition-shadow duration-300 ease-in-out
            "


          >

          <div className="absolute top-4 right-4 z-20 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white cursor-pointer">
            <ArrowRightLeft size={24} />
          </div>
          
            <div className="flex justify-center mb-6">
              <img
                src={`data:image/svg+xml;base64,${mission.image}`}
                width={48}
                height={48}
                alt="mission"
              />
            </div>
            <div className="space-y-3">
              <h3 className=" font-semibold text-3xl font-poppins text-gray-900 dark:text-white">
                {mission.question}
              </h3>

              <motion.p
              initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="text-lg text-gray-600 dark:text-gray-300 animate-pulse"
            >
              {mission.missionType || 'Опис місії недоступний.'}
            </motion.p>
              
            </div>
          </motion.div>
        </div>
      ))}
      <ModalForm />
    <style jsx>
    {`
    .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='%23fff' fill-opacity='0.03' cx='1' cy='1' r='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    }
    `}  
    </style> 
    </div>
  );
};

export default Missions;
