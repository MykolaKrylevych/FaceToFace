import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardTab() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [filter, setFilter] = useState('7d'); // time filter
  const [metric, setMetric] = useState('users'); // metric category
  const [chartData, setChartData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dataSets = useMemo(() => ({
    users: {
      '24h': [
        { name: '00:00', value: 20 },
        { name: '06:00', value: 45 },
        { name: '12:00', value: 80 },
        { name: '18:00', value: 60 },
        { name: '23:59', value: 35 },
      ],
      '7d': [
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 132 },
        { name: 'Wed', value: 101 },
        { name: 'Thu', value: 134 },
        { name: 'Fri', value: 90 },
        { name: 'Sat', value: 230 },
        { name: 'Sun', value: 210 },
      ],
      '30d': Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 250) + 50,
      })),
    },
    sales: {
      '24h': [
        { name: '00:00', value: 5 },
        { name: '06:00', value: 15 },
        { name: '12:00', value: 22 },
        { name: '18:00', value: 18 },
        { name: '23:59', value: 10 },
      ],
      '7d': [
        { name: 'Mon', value: 40 },
        { name: 'Tue', value: 55 },
        { name: 'Wed', value: 50 },
        { name: 'Thu', value: 75 },
        { name: 'Fri', value: 60 },
        { name: 'Sat', value: 90 },
        { name: 'Sun', value: 70 },
      ],
      '30d': Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100) + 10,
      })),
    },
    traffic: {
      '24h': [
        { name: '00:00', value: 120 },
        { name: '06:00', value: 180 },
        { name: '12:00', value: 300 },
        { name: '18:00', value: 240 },
        { name: '23:59', value: 160 },
      ],
      '7d': [
        { name: 'Mon', value: 800 },
        { name: 'Tue', value: 950 },
        { name: 'Wed', value: 870 },
        { name: 'Thu', value: 1020 },
        { name: 'Fri', value: 930 },
        { name: 'Sat', value: 1300 },
        { name: 'Sun', value: 1200 },
      ],
      '30d': Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 1200) + 400,
      })),
    },
  }), []);

  const getDataFor = (m, f) => dataSets[m]?.[f] || [];

  useEffect(() => {
    setChartData(getDataFor(metric, filter));
  }, [metric, filter]);

  useEffect(() => {
    const BACKEND_HOST = 'localhost:5001';
    const PATH = '/api/Health';
    const TIMEOUT_MS = 2000;
    const fetchWithTimeout = async (url) => {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
      try {
        const res = await fetch(url, { method: 'HEAD', signal: ctl.signal });
        clearTimeout(timer);
        return res;
      } catch (err) {
        clearTimeout(timer);
        throw err;
      }
    };
    const ping = async () => {
      try {
        const res = await fetchWithTimeout(`https://${BACKEND_HOST}${PATH}`);
        setServerStatus(res.ok ? 'Online' : 'Offline');
      } catch {
        try {
          const res = await fetchWithTimeout(`http://${BACKEND_HOST}${PATH}`);
          setServerStatus(res.ok ? 'Online' : 'Offline');
        } catch {
          setServerStatus('Offline');
        }
      }
    };
    ping();
    const interval = setInterval(ping, 10000);
    return () => clearInterval(interval);
  }, []);

  const metricColor =
    metric === 'users' ? '#3b82f6' : metric === 'sales' ? '#10b981' : '#f59e0b';

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

        {/* Stats Cards */}
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
            <p
              className={`text-2xl font-bold ${
                serverStatus === 'Online'
                  ? 'text-green-600'
                  : serverStatus === 'Checking...'
                  ? 'text-yellow-500'
                  : 'text-red-600'
              }`}
            >
              {serverStatus}
            </p>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl shadow relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
            <h3 className="text-md font-semibold capitalize">{metric} statistics</h3>

            <div className="flex items-center gap-3">
              {/* Metric category buttons */}
              <div className="flex flex-wrap gap-2">
                {['users', 'sales', 'traffic'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setMetric(option)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      metric === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>

              {/* Time filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition flex items-center gap-1"
                >
                  {filter.toUpperCase()}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    {['24h', '7d', '30d'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilter(option);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-1 text-sm rounded-md ${
                          filter === option
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={metricColor}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
