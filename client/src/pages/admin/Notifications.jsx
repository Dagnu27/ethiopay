import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  Filter,
  RefreshCw,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Mail,
  Send,
  Trash2,
  Eye,
  User,
  Calendar,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const notifications = [
    {
      id: 'NOT-001',
      title: 'New User Registration',
      message: 'Abebe Kebede has registered as a new user',
      type: 'info',
      status: 'unread',
      recipient: 'All Admins',
      createdAt: '2024-06-15T14:30:00Z',
    },
    {
      id: 'NOT-002',
      title: 'Transaction Alert',
      message: 'Large transaction of ETB 45,000 detected',
      type: 'warning',
      status: 'unread',
      recipient: 'Security Team',
      createdAt: '2024-06-15T13:45:00Z',
    },
    {
      id: 'NOT-003',
      title: 'System Update',
      message: 'Platform maintenance scheduled for June 20, 2024',
      type: 'info',
      status: 'read',
      recipient: 'All Users',
      createdAt: '2024-06-14T10:00:00Z',
    },
    {
      id: 'NOT-004',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 8.8.8.8',
      type: 'critical',
      status: 'unread',
      recipient: 'Security Team',
      createdAt: '2024-06-14T08:30:00Z',
    },
    {
      id: 'NOT-005',
      title: 'Merchant Verification',
      message: 'Merchant ABC has been verified successfully',
      type: 'success',
      status: 'read',
      recipient: 'Merchant',
      createdAt: '2024-06-13T16:20:00Z',
    },
  ];

  useEffect(() => {
    fetchNotifications();
  }, [search, filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      info: <Info className="w-4 h-4" />,
      warning: <AlertCircle className="w-4 h-4" />,
      critical: <XCircle className="w-4 h-4" />,
      success: <CheckCircle className="w-4 h-4" />,
    };
    return icons[type] || <Info className="w-4 h-4" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      critical: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800',
      success: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
    };
    return colors[type] || colors.info;
  };

  const getStatusBadge = (status) => {
    return status === 'unread' ? (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        Unread
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400">
        <Check className="w-3 h-3" />
        Read
      </span>
    );
  };

  const handleMarkAsRead = (id) => {
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    toast.success('Notification deleted');
  };

  const handleSendNotification = () => {
    toast.success('Notification sent successfully!');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D7C4A]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage system notifications and alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendNotification}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0D7C4A] text-white rounded-xl text-sm font-medium hover:bg-[#065F46] transition"
            >
              <Send className="w-4 h-4" />
              Send Notification
            </button>
            <button
              onClick={handleMarkAllAsRead}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <Check className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={fetchNotifications}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{notifications.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Unread</p>
            <p className="text-xl font-bold text-blue-500">{notifications.filter(n => n.status === 'unread').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Read</p>
            <p className="text-xl font-bold text-gray-500">{notifications.filter(n => n.status === 'read').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Critical</p>
            <p className="text-xl font-bold text-red-500">{notifications.filter(n => n.type === 'critical').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="success">Success</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                  notification.status === 'unread' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-xl ${getTypeColor(notification.type)} border`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {getStatusBadge(notification.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <User className="w-3 h-3" />
                        {notification.recipient}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(notification.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {notification.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0D7C4A] transition">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Broadcast Message</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Send to all users</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0D7C4A] transition">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-500">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Email Campaign</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Send email notifications</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0D7C4A] transition">
            <div className="p-2 rounded-lg bg-green-50 text-green-500">
              <Send className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Push Notification</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Send push notifications</p>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notifications;