// client/src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Wallet,
  Send,
  QrCode,
  FileText,
  BarChart3,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Home,
  Gift,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Wallets', path: '/wallet' },
    { icon: Send, label: 'Send Money', path: '/send' },
    { icon: QrCode, label: 'QR Payments', path: '/qr' },
    { icon: FileText, label: 'Bills', path: '/bills' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: CreditCard, label: 'Cards', path: '/cards' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside
      className={`
        hidden lg:flex flex-col fixed left-0 top-0 h-full 
        bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 
        z-40 transition-all duration-300
        ${sidebarOpen ? 'w-[280px]' : 'w-20'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800 ${!sidebarOpen ? 'justify-center' : ''}`}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0E7A4B] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-[#0E7A4B] dark:text-white">EthioPay</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive(item.path)
                ? 'bg-[#0E7A4B] text-white shadow-lg shadow-[#0E7A4B]/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0E7A4B] dark:hover:text-white'
              }
              ${!sidebarOpen && 'justify-center'}
            `}
            title={!sidebarOpen ? item.label : ''}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${
              isActive(item.path) ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0E7A4B] dark:group-hover:text-white'
            }`} />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className={`border-t border-gray-100 dark:border-gray-800 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-9 h-9 rounded-full bg-[#0E7A4B] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          {sidebarOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || 'user@email.com'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toggle Button - Desktop */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </aside>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobile && sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-[280px] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-50 flex flex-col shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition z-10"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800">
              <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <div className="w-8 h-8 bg-[#0E7A4B] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-[#0E7A4B] dark:text-white">EthioPay</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'bg-[#0E7A4B] text-white shadow-lg shadow-[#0E7A4B]/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0E7A4B] dark:hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${
                    isActive(item.path) ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-[#0E7A4B] dark:group-hover:text-white'
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Profile */}
            <div className="border-t border-gray-100 dark:border-gray-800 p-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0E7A4B] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
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
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;