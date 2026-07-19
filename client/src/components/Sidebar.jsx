import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Wallet,
  Send,
  QrCode,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  HelpCircle,
  Shield,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Wallets', path: '/wallet' },
    { icon: Send, label: 'Send Money', path: '/send' },
    { icon: QrCode, label: 'QR Payments', path: '/qr' },
    { icon: FileText, label: 'Transactions', path: '/transactions' },
    { icon: CreditCard, label: 'Bills', path: '/bills' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  const bottomNavItems = [
    { icon: HelpCircle, label: 'Help', path: '/help' },
    { icon: Shield, label: 'Security', path: '/security' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ✅ Handle navigation and close sidebar
  const handleNavigation = (path) => {
    if (isMobile) {
      setSidebarOpen(false);
      // Small delay to ensure sidebar closes before navigation
      setTimeout(() => {
        navigate(path);
      }, 100);
    } else {
      navigate(path);
    }
  };

  // ✅ Close sidebar when clicking overlay
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed left-0 top-0 h-full 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          z-40 transition-all duration-300
          ${sidebarOpen ? 'w-[280px]' : 'w-20'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 ${!sidebarOpen ? 'justify-center' : ''}`}>
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => handleNavigation('/dashboard')}>
            <div className="w-8 h-8 bg-[#0B7A43] rounded-xl flex items-center justify-center shadow-lg shadow-[#0B7A43]/25 flex-shrink-0">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-[#0B7A43] dark:text-white">EthioPay</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group w-full text-left
                  ${isActive(item.path)
                    ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0B7A43] dark:hover:text-white'
                  }
                  ${!sidebarOpen && 'justify-center'}
                `}
                title={!sidebarOpen ? item.label : ''}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0B7A43] dark:group-hover:text-white'
                  }`}
                />
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            </div>
          ))}

          {/* Divider */}
          {sidebarOpen && (
            <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
          )}

          {/* Bottom Navigation Items */}
          {sidebarOpen && bottomNavItems.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group w-full text-left ${
                  isActive(item.path)
                    ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0B7A43] dark:hover:text-white'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0B7A43] dark:group-hover:text-white'
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-gray-200 dark:border-gray-700 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 w-full ${!sidebarOpen && 'justify-center'}`}>
            <button
              onClick={() => handleNavigation('/profile')}
              className={`flex items-center gap-3 ${!sidebarOpen ? 'justify-center' : 'flex-1'} hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1.5 transition w-full text-left`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0B7A43] to-[#14B86A] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
              )}
            </button>
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
              sidebarOpen ? 'rotate-90' : '-rotate-90'
            }`}
          />
        </button>
      </aside>

      {/* Mobile Sidebar - Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleOverlayClick}
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={handleOverlayClick}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Logo */}
              <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <div className="w-8 h-8 bg-[#0B7A43] rounded-xl flex items-center justify-center shadow-lg shadow-[#0B7A43]/25">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="text-xl font-bold text-[#0B7A43] dark:text-white">EthioPay</span>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group w-full text-left ${
                      isActive(item.path)
                        ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0B7A43] dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive(item.path)
                          ? 'text-white'
                          : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0B7A43] dark:group-hover:text-white'
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

                {/* Bottom Navigation Items */}
                {bottomNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group w-full text-left ${
                      isActive(item.path)
                        ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0B7A43] dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive(item.path)
                          ? 'text-white'
                          : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0B7A43] dark:group-hover:text-white'
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* User Profile */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="flex items-center gap-3 flex-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1.5 transition w-full text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0B7A43] to-[#14B86A] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {user?.fullName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || 'user@email.com'}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;