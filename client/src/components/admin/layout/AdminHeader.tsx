import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  MessageSquare,
  Calendar,
  Moon,
  Sun,
  Globe,
  User,
  Settings,
  LogOut,
  Plus,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    message: '45,000 ETB from Abebe Kebede',
    time: '2 min ago',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Withdrawal Request',
    message: '12,500 ETB pending approval',
    time: '15 min ago',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'New User Registered',
    message: 'Selamawit T. created an account',
    time: '1 hour ago',
    read: true,
    type: 'info',
  },
];

export const AdminHeader = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      darkMode ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' : 'bg-white/80 backdrop-blur-xl border-gray-200'
    } border-b`}>
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-gray-400">Admin</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-800 dark:text-white">Dashboard</span>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md relative ml-4">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions, users..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border ${
                darkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-400' : 'border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400'
              } focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition-all text-sm`}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Quick Create */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0D7C4A] text-white rounded-xl text-sm font-medium hover:bg-[#065F46] transition shadow-lg shadow-[#0D7C4A]/25 hover:scale-105 transform duration-200">
            <Plus className="w-4 h-4" />
            Create
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition ${
              darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg transition relative ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border overflow-hidden ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Notifications
                      </h4>
                      {unreadCount > 0 && (
                        <button className="text-xs text-[#0D7C4A] hover:underline">Mark all read</button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b transition cursor-pointer ${
                          darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-50 hover:bg-gray-50'
                        } ${!notif.read ? darkMode ? 'bg-gray-700/30' : 'bg-[#0D7C4A]/5' : ''}`}
                      >
                        <div className={`p-2 rounded-lg mb-2 ${getTypeStyles(notif.type)}`}>
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {notif.title}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {notif.message}
                          </p>
                        </div>
                        <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className={`p-3 text-center text-sm border-t ${
                    darkMode ? 'border-gray-700 text-[#0D7C4A] hover:bg-gray-700' : 'border-gray-100 text-[#0D7C4A] hover:bg-gray-50'
                  } cursor-pointer transition`}>
                    View all notifications
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 p-1 rounded-full hover:ring-2 hover:ring-[#0D7C4A] transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0D7C4A] to-[#065F46] flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
              <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl border overflow-hidden ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin User</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>admin@ethiopay.com</p>
                  </div>
                  <div className="p-1">
                    <Link to="/admin/profile" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link to="/admin/settings" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition w-full ${
                      darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'
                    }`}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};