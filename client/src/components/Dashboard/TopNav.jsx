import { useState, useRef, useEffect } from 'react';
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

const TopNav = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode, isMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Payment Received', message: '+5,000 ETB from Abebe K.', time: '2 min ago', read: false },
    { id: 2, title: 'Bill Due Soon', message: 'Electricity bill due in 3 days', time: '1 hour ago', read: false },
    { id: 3, title: 'Transfer Complete', message: '2,500 ETB sent to Selam T.', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      darkMode ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' : 'bg-white/80 backdrop-blur-xl border-gray-100'
    } border-b`}>
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-14 sm:h-16">
        {/* Left - Menu Toggle & Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Mobile Logo */}
          <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0E7A4B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-[#0E7A4B] dark:text-white">EthioPay</span>
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, contacts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:border-[#0E7A4B] focus:ring-2 focus:ring-[#0E7A4B]/20 outline-none transition-all text-sm dark:text-white"
            />
            <kbd className="absolute right-3 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hidden lg:block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Add - Hidden on mobile */}
          <button className="hidden sm:flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0E7A4B] text-white rounded-xl text-xs md:text-sm font-medium hover:bg-[#0C663F] transition-all hover:scale-[1.02] shadow-lg shadow-[#0E7A4B]/25">
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden md:inline">Add Funds</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800 dark:text-white`}>
                      Notifications
                    </h4>
                    <span className="text-xs text-[#0E7A4B] cursor-pointer">Mark all read</span>
                  </div>
                </div>
                <div className="max-h-56 sm:max-h-64 overflow-y-auto">
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
                <div className="p-2 sm:p-3 text-center text-xs sm:text-sm text-[#0E7A4B] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View all notifications
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 sm:gap-2 p-0.5 sm:p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0E7A4B] to-[#14B86A] flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
                <div className="p-1 sm:p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Help Center</span>
                  </Link>
                </div>
                <div className="p-1 sm:p-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full text-red-500 text-sm"
                  >
                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">Logout</span>
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

export default TopNav;import { useState, useRef, useEffect } from 'react';
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

const TopNav = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode, isMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Payment Received', message: '+5,000 ETB from Abebe K.', time: '2 min ago', read: false },
    { id: 2, title: 'Bill Due Soon', message: 'Electricity bill due in 3 days', time: '1 hour ago', read: false },
    { id: 3, title: 'Transfer Complete', message: '2,500 ETB sent to Selam T.', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      darkMode ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800' : 'bg-white/80 backdrop-blur-xl border-gray-100'
    } border-b`}>
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-14 sm:h-16">
        {/* Left - Menu Toggle & Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Mobile Logo */}
          <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0E7A4B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-[#0E7A4B] dark:text-white">EthioPay</span>
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, contacts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:border-[#0E7A4B] focus:ring-2 focus:ring-[#0E7A4B]/20 outline-none transition-all text-sm dark:text-white"
            />
            <kbd className="absolute right-3 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hidden lg:block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Add - Hidden on mobile */}
          <button className="hidden sm:flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0E7A4B] text-white rounded-xl text-xs md:text-sm font-medium hover:bg-[#0C663F] transition-all hover:scale-[1.02] shadow-lg shadow-[#0E7A4B]/25">
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden md:inline">Add Funds</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800 dark:text-white`}>
                      Notifications
                    </h4>
                    <span className="text-xs text-[#0E7A4B] cursor-pointer">Mark all read</span>
                  </div>
                </div>
                <div className="max-h-56 sm:max-h-64 overflow-y-auto">
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
                <div className="p-2 sm:p-3 text-center text-xs sm:text-sm text-[#0E7A4B] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  View all notifications
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 sm:gap-2 p-0.5 sm:p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0E7A4B] to-[#14B86A] flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
                <div className="p-1 sm:p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Help Center</span>
                  </Link>
                </div>
                <div className="p-1 sm:p-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full text-red-500 text-sm"
                  >
                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">Logout</span>
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