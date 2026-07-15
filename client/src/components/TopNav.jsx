import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  Bell,
  User,
  Plus,
  Search,
  Moon,
  Sun,
  X,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

const TopNav = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, title: 'Payment Received', message: '+5,000 ETB from Abebe K.', time: '2 min ago', read: false },
    { id: 2, title: 'Bill Due Soon', message: 'Electricity bill due in 3 days', time: '1 hour ago', read: false },
    { id: 3, title: 'Transfer Complete', message: '2,500 ETB sent to Selam T.', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/transactions?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleAddFunds = () => {
    toast.success('Add Funds feature coming soon!');
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700' 
        : 'bg-white/80 backdrop-blur-xl border-gray-200'
    } border-b`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className={`absolute left-3 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions, contacts..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border ${
                darkMode 
                  ? 'border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:border-[#14B86A]' 
                  : 'border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-[#0B7A43]'
              } focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <X className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </button>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Add Funds Button */}
          <button
            onClick={handleAddFunds}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition shadow-lg shadow-[#0B7A43]/25 hover:scale-105 transform duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Funds
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition ${
              darkMode 
                ? 'hover:bg-gray-700 text-yellow-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg transition ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } relative`}
            >
              <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl border overflow-hidden ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Notifications
                    </h4>
                    {unreadCount > 0 && (
                      <button className="text-xs text-[#0B7A43] hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className={`p-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b transition cursor-pointer ${
                          darkMode 
                            ? 'border-gray-700 hover:bg-gray-700/50' 
                            : 'border-gray-50 hover:bg-gray-50'
                        } ${!notif.read ? darkMode ? 'bg-gray-700/30' : 'bg-[#0B7A43]/5' : ''}`}
                      >
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {notif.title}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {notif.message}
                        </p>
                        <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                          {notif.time}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <div className={`p-3 text-center text-sm border-t ${
                  darkMode 
                    ? 'border-gray-700 text-[#0B7A43] hover:bg-gray-700' 
                    : 'border-gray-100 text-[#0B7A43] hover:bg-gray-50'
                } cursor-pointer transition`}>
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 p-1 rounded-full hover:ring-2 hover:ring-[#0B7A43] transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0B7A43] to-[#14B86A] flex items-center justify-center text-white font-semibold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl border overflow-hidden ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user?.fullName || 'User'}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
                <div className="p-1">
                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;