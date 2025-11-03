import { useEffect, useState, useMemo  } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Menu,
  LogOut,
  ShieldCheck,
  Settings,
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardTab from './DashboardTab';
import SettingsTab from './SettingsTab';
import ApproveTab from './ApproveTab';
import md5 from 'blueimp-md5';
import SwipeDeck from './Dilemma/SwipeDeck';

export default function AdminDashboard() {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [tab, setTab] = useState('dashboard');
  const navigate = useNavigate();
  const avatarUrl = useMemo(() => {
    if (!email) return '';
    // `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon`;
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`;
  }, [email]);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email || 'Admin');
    } catch (err) {
      console.error('Invalid token');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleTabClick = (selectedTab) => {
    setTab(selectedTab);
    setSidebarOpen(false); // закриваємо меню на мобільних після вибору
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
<aside
  className={`bg-white ${
    isCollapsed ? 'w-20' : 'w-64'
  } shadow-xl fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out md:relative z-30`}
>
  {!isCollapsed && (
  <div className="flex items-center space-x-3 p-4 border-b">
    <img
      src={avatarUrl}
      alt="avatar"
      className="w-10 h-10 rounded-full"
    />
    <div>
      <h2 className="text-md font-semibold truncate">{email}</h2>
    </div>
  </div>
  )}

  <nav className="p-2 space-y-2">
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="flex items-center p-2 rounded w-full hover:bg-gray-200 transition-colors duration-200"
    >
      {isCollapsed ? (
        <ChevronRight className="w-5 h-5 mx-auto text-gray-600" />
      ) : (
        <>
          <ChevronLeft className="w-5 h-5 mr-3 text-gray-600" />
          <span className="whitespace-nowrap">Згорнути</span>
        </>
      )}
    </button>

    {[
      { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { key: 'approve', icon: ShieldCheck, label: 'Approve' },
      { key: 'users', icon: Users, label: 'Users' },
      { key: 'settings', icon: Settings, label: 'Settings' },
    ].map(({ key, icon: Icon, label }) => (
      <button
        key={key}
        onClick={() => handleTabClick(key)}
        className={`flex items-center p-2 rounded w-full transition-colors duration-200 ${
          tab === key
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Icon
          className={`w-5 h-5 transition-colors duration-200 ${
            tab === key ? 'text-indigo-700' : 'text-gray-400'
          } ${!isCollapsed ? 'mr-3' : 'mx-auto'}`}
        />
        {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
      </button>
    ))}

    <button
      onClick={handleLogout}
      className="flex items-center p-2 text-red-500 hover:bg-red-100 rounded w-full"
    >
      <LogOut className={`w-5 h-5 ${!isCollapsed ? 'mr-3' : 'mx-auto'}`} />
      {!isCollapsed && <span>Logout</span>}
    </button>
  </nav>
</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-20">
  {/* Mobile menu button */}
  <button
    className="md:hidden text-gray-700"
    onClick={() => setSidebarOpen(true)}
  >
    <Menu className="w-6 h-6" />
  </button>
  <div>
    <h1 className="text-xl font-semibold">
      {tab === 'dashboard' && 'Огляд'}
      {tab === 'approve' && 'Підтвердження'}
      {tab === 'settings' && 'Налаштування'}
    </h1>
    <p className="text-sm text-gray-500">
      {tab === 'dashboard' && 'Останні дані системи та статистика'}
      {tab === 'approve' && 'Перегляд та управління заявками'}
      {tab === 'settings' && 'Параметри та налаштування'}
    </p>
  </div>
</header>

        {/* <main className="flex-1 p-6 space-y-6 overflow-auto"> */}
  <AnimatePresence mode="wait">
  {tab === 'dashboard' && (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DashboardTab />
    </motion.div>
  )}
  {tab === 'approve' && (
    <motion.div
      key="approve"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ApproveTab />
    </motion.div>
  )}
  {tab === 'settings' && (
    <motion.div
      key="settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SettingsTab />
    </motion.div>
  )}
</AnimatePresence>

        {/* </main> */}
      </div>
    </div>
  );
}
