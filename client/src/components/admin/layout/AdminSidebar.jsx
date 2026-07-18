import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Store,
  CreditCard,
  DollarSign,
  Wallet,
  Shield,
  FileCheck,
  AlertTriangle,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Plus,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: Store, label: 'Merchant Management', path: '/admin/merchants' },
  { icon: CreditCard, label: 'Transactions', path: '/admin/transactions' },
  { icon: DollarSign, label: 'Payments', path: '/admin/payments' },
  { icon: Wallet, label: 'Revenue', path: '/admin/revenue' },
  { icon: FileCheck, label: 'Settlement', path: '/admin/settlement' },
  { icon: Shield, label: 'Verification', path: '/admin/verification' },
  { icon: AlertTriangle, label: 'Security', path: '/admin/security' },
  { icon: FileText, label: 'Reports', path: '/admin/reports' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const toggleExpand = (label) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 80,
          x: isMobile ? (isOpen ? 0 : -280) : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col shadow-xl lg:shadow-none overflow-hidden ${
          isMobile && !isOpen ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 ${!isOpen ? 'justify-center' : ''}`}>
          <Link to="/admin" className="flex items-center gap-2" onClick={() => isMobile && setIsOpen(false)}>
            <div className="w-8 h-8 bg-gradient-to-r from-[#0D7C4A] to-[#065F46] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-[#0D7C4A] dark:text-white whitespace-nowrap"
              >
                EthioPay
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActiveItem = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActiveItem
                    ? 'bg-[#0D7C4A] text-white shadow-lg shadow-[#0D7C4A]/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-[#0D7C4A]/10 hover:text-[#0D7C4A] dark:hover:bg-[#0D7C4A]/20 dark:hover:text-white'
                } ${!isOpen && 'justify-center'}`}
                title={!isOpen ? item.label : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActiveItem ? 'text-white' : 'text-gray-400 group-hover:text-[#0D7C4A]'}`} />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-gray-200 dark:border-gray-800 p-3 ${!isOpen ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 w-full ${!isOpen && 'justify-center'}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0D7C4A] to-[#065F46] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              A
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@ethiopay.com</p>
              </motion.div>
            )}
            {isOpen && (
              <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition" title="Logout">
                <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition z-10"
        >
          <ChevronDown className={`w-3.5 h-3.5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;