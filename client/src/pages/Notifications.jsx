import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Check,
  Filter,
  Search,
  ChevronDown,
  Mail,
  Smartphone,
  Shield,
  Gift,
  TrendingUp,
  CreditCard,
  Send,
  Wallet,
  Home,
  FileText,
  BarChart3,
  Settings as SettingsIcon,
  QrCode,
  Menu,
  User,
  LogOut,
  Plus,
  Calendar,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received 5,000 ETB from Abebe Kebede',
      time: '2 minutes ago',
      read: false,
      icon: TrendingUp,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      action: 'View Transaction',
    },
    {
      id: 2,
      type: 'bill',
      title: 'Bill Due Soon',
      message: 'Your electricity bill of 1,420.50 ETB is due in 3 days',
      time: '1 hour ago',
      read: false,
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      action: 'Pay Now',
    },
    {
      id: 3,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from Addis Ababa, Ethiopia',
      time: '3 hours ago',
      read: false,
      icon: Shield,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      action: 'Review Activity',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Transfer Complete',
      message: 'You sent 2,500 ETB to Selamawit T.',
      time: '5 hours ago',
      read: true,
      icon: Send,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      action: 'View Receipt',
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 5% cashback on all QR payments this week',
      time: '1 day ago',
      read: true,
      icon: Gift,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      action: 'Learn More',
    },
    {
      id: 6,
      type: 'payment',
      title: 'Salary Deposit',
      message: 'Your salary of 45,000 ETB has been deposited',
      time: '2 days ago',
      read: true,
      icon: Wallet,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      action: 'View Details',
    },
    {
      id: 7,
      type: 'bill',
      title: 'Bill Paid',
      message: 'You paid 850 ETB to Ethio Telecom',
      time: '3 days ago',
      read: true,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      action: 'View Receipt',
    },
  ]);

  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    payment: 0,
    bill: 0,
    security: 0,
    promotion: 0,
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      calculateStats(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const unread = data.filter(n => !n.read).length;
    const read = data.filter(n => n.read).length;
    const payment = data.filter(n => n.type === 'payment').length;
    const bill = data.filter(n => n.type === 'bill').length;
    const security = data.filter(n => n.type === 'security').length;
    const promotion = data.filter(n => n.type === 'promotion').length;

    setStats({ total, unread, read, payment, bill, security, promotion });
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'all' || n.type === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'payment', label: 'Payments', count: stats.payment },
    { id: 'bill', label: 'Bills', count: stats.bill },
    { id: 'security', label: 'Security', count: stats.security },
    { id: 'promotion', label: 'Promotions', count: stats.promotion },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A43]"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300`}>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <TopNav
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <main className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  Notifications
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {stats.unread > 0 ? `You have ${stats.unread} unread notifications` : 'All caught up!'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition"
                >
                  Mark All Read
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'Total', value: stats.total, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white' },
                { label: 'Unread', value: stats.unread, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
                { label: 'Payments', value: stats.payment, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
                { label: 'Bills', value: stats.bill, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
                { label: 'Security', value: stats.security, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-xl p-3 text-center transition-all duration-300 hover:scale-105`}
                >
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                      filter === option.id
                        ? 'bg-[#0B7A43] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {option.label}
                    {option.count > 0 && (
                      <span className={`ml-1 text-xs ${filter === option.id ? 'text-white/80' : 'text-gray-400'}`}>
                        ({option.count})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg ${
                        notification.read
                          ? 'border-gray-100 dark:border-gray-700'
                          : 'border-[#0B7A43]/20 dark:border-[#0B7A43]/40 bg-[#0B7A43]/5 dark:bg-[#0B7A43]/10'
                      }`}
                    >
                      {!notification.read && (
                        <div className="absolute top-3 right-3 w-2 h-2 bg-[#0B7A43] rounded-full animate-pulse" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${notification.bgColor}`}>
                          <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className={`font-medium ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                                {notification.title}
                              </h4>
                              <p className={`text-sm ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'} mt-1`}>
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {notification.time}
                                </span>
                                {notification.action && (
                                  <button className="text-xs text-[#0B7A43] hover:underline font-medium">
                                    {notification.action}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-gray-400 hover:text-[#0B7A43]" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            title="Delete"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 dark:text-white">No notifications</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">You're all caught up!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notifications;