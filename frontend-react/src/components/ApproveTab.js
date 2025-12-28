import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Check, Trash, PencilLine } from 'lucide-react';

export default function ApproveTab() {
  const controls = useAnimation();
  const [missions, setMissions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('https://localhost/api/Mission/pending') // doapi:8081
      .then((res) => res.json())
      .then((data) => {
        setMissions(data);
        setLoading(false);
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);



  const sendRequest = async (action, missionId) => {
    let url = '';
    let method = 'PATCH';
    let payload = {};

    if (action === 'approve') {
      url = `https://localhost/api/Mission/status/${missionId}`;
      payload = { status: 'approved' };
    } else if (action === 'reject') {
      url = `https://localhost/api/Mission/${missionId}`;
      method = 'DELETE';
    } else if (action === 'draft') {
      url = `https://localhost/api/Mission/status/${missionId}`;
      payload = { status: 'draft' };
    } else {
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },
        body: JSON.stringify(payload),
      });
      console.log("sended")
      console.log(url)
      console.log(payload)
      console.log(token)
      

      if (res.ok) {
        setMessage(`✅ ${action} успішно для місії ${missionId}`);
        setMissions((prev) => prev.filter((m) => m.id !== missionId));
      } else {
        setMessage(`❌ Помилка для ${action}: ${res.status}`);
      }
    } catch (err) {
      setMessage(`⚠️ Помилка мережі: ${err}`);
    }
  };


  const handleDragEnd = (_e, info, missionId) => {
    const { offset } = info;
    const threshold = 100;

    const resetCard = () => {
      controls.set({ x: 0, y: 0, opacity: 1 });
    };

    if (offset.x < -threshold) {
      controls
        .start({ x: -300, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          sendRequest('approve', missionId);
          resetCard();
        });
    } else if (offset.x > threshold) {
      controls
        .start({ x: 300, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          sendRequest('reject', missionId);
          resetCard();
        });
    } else if (offset.y > threshold) {
      controls
        .start({ y: 300, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          sendRequest('draft', missionId);
          resetCard();
        });
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: 'spring', stiffness: 600, damping: 30 },
      });
      setMessage('ℹ️ Свайп ліво — підтвердити, право — відхилити, вниз — нотатка');
    }
  };






  
  return (
        
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-10 bg-noise">
      
      {missions.map((mission, index) => (
        <div key={index} className="relative w-full max-w-4xl my-20">
  {/* Іконка "Затвердити" — зліва поза карткою */}
  <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-20">
    <Check
      size={36}
      className="text-green-500 hover:text-green-400 transition"
      
    />
  </div>

  {/* Іконка "Видалити" — справа поза карткою */}
  <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-20">
    <Trash
      size={36}
      className="text-red-500 hover:text-red-400 transition"
      
    />
  </div>

  {/* Іконка "Нотатка" — знизу поза карткою */}
  <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 z-20">
    <PencilLine
      size={36}
      className="text-yellow-500 hover:text-yellow-400 transition"
      
    />
  </div>

  {/* Motion картка з місією */}
  <motion.div
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.2}
    onDragEnd={(e, info) => handleDragEnd(e, info, mission.id)}
    animate={controls}
    initial={{ opacity: 0, y: 20 }}
    className="
      relative z-10 w-full rounded-3xl p-12 text-center space-y-8 cursor-grab active:cursor-grabbing
      bg-white/10 dark:bg-black/40 backdrop-blur-lg border-2 border-gradient-to-r from-teal-400 via-purple-500 to-pink-500
      text-white hover:scale-[1.02] transition-shadow duration-300 ease-in-out
    "
  >
    <div className="flex justify-center mb-6">
      <img
        src={`data:image/svg+xml;base64,${mission.image}`}
        width={48}
        height={48}
        alt="mission"
      />
    </div>

    <div className="space-y-3">
      <h3 className="font-semibold text-3xl font-poppins text-gray-900 dark:text-white">
        {mission.question}
        
      </h3>

      <motion.p
        initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="text-lg text-gray-600 dark:text-gray-300 animate-pulse"
      >
        {mission.missionType || 'Опис місії недоступний.'}
        {mission.id || 'id'}
      </motion.p>
    </div>
  </motion.div>

</div>

      ))}
      
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