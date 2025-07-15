import { motion } from 'framer-motion';

export default function DashboardTab() {
  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold mb-2">Welcome Back!</h2>
      <p className="text-gray-600">Here’s a quick overview of your admin panel.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <p className="text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <p className="text-gray-600">Active Sessions</p>
          <p className="text-2xl font-bold">87</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <p className="text-gray-600">Server Status</p>
          <p className="text-2xl font-bold text-green-600">Online</p>
        </div>
      </div>
    </motion.div>
    </main>
  );
}
