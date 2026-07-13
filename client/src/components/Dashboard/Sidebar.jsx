// client/src/components/dashboard/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
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

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Wallets', path: '/wallets' },
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

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-[280px]' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 ${!sidebarOpen ? 'justify-center' : ''}`}>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0E7A4B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-[#0E7A4B]">EthioPay</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-[#0E7A4B] text-white shadow-lg shadow-[#0E7A4B]/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0E7A4B]'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${
                isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-[#0E7A4B]'
              }`} />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-gray-100 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0E7A4B] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@email.com'}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <LogOut className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Button - Desktop */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          )}
        </button>
      </motion.aside>
    </>
  );
};

export default Sidebar;