import { motion } from 'framer-motion';

export default function SettingsTab() {
  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
    <motion.div
      key="settings"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold mb-2">Налаштування</h2>
      <p className="text-gray-600">Конфігурації адміністратора.</p>
    </motion.div>
    </main>
  );
}
