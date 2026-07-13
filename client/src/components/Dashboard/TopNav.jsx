import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ChevronDown,
  Plus,
  Wallet,
  Sparkles,
} from 'lucide-react';

const TopNav = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Payment Received', message: '+5,000 ETB from Abebe K.', time: '2 min ago', read: false },
    { id: 2, title: 'Bill Due Soon', message: 'Electricity bill due in 3 days', time: '1 hour ago', read: false },
    { id: 3, title: 'Transfer Complete', message: '2,500 ETB sent to Selam T.', time: '3 hours ago', read: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      darkMode ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' : 'bg-white/80 backdrop-blur-xl border-gray-100'
    } border-b`}>
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left - Menu Toggle & Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, contacts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:border-[#0E7A4B] focus:ring-2 focus:ring-[#0E7A4B]/20 outline-none transition-all text-sm dark:text-white"
            />
            <kbd className="absolute right-3 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Add */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0E7A4B] text-white rounded-xl text-sm font-medium hover:bg-[#0C663F] transition-all hover:scale-[1.02] shadow-lg shadow-[#0E7A4B]/25">
            <Plus className="w-4 h-4" />
            Add Funds
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 dark:text-white">Notifications</h4>
                    <span className="text-xs text-[#0E7A4B] cursor-pointer">Mark all read</span>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition ${
                        !notif.read ? 'bg-[#0E7A4B]/5' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{notif.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{notif.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center text-sm text-[#0E7A4B] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View all notifications
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0E7A4B] to-[#14B86A] flex items-center justify-center text-white font-semibold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-medium text-gray-800 dark:text-white">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@email.com'}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Help Center</span>
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;