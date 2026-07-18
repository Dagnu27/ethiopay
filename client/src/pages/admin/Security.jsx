import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  AlertTriangle,
  Lock,
  Unlock,
  Activity,
  Server,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Mail,
  Phone,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Info,  // ✅ ADD THIS
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

const Security = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Summary stats
  const [stats, setStats] = useState({
    totalEvents: 0,
    critical: 0,
    warning: 0,
    info: 0,
    failedLogins: 0,
    suspiciousActivities: 0,
  });

  useEffect(() => {
    fetchSecurityLogs();
  }, [search, filter, severityFilter, currentPage]);

  const fetchSecurityLogs = async () => {
    try {
      setLoading(true);
      // Sample data
      const data = [
        {
          id: 'SEC-001',
          user: {
            id: '1',
            fullName: 'Abebe Kebede',
            email: 'abebe@example.com',
          },
          event: 'Login Successful',
          type: 'login',
          severity: 'info',
          ip: '192.168.1.100',
          device: 'Chrome on Windows',
          location: 'Addis Ababa, Ethiopia',
          timestamp: '2024-06-15T14:30:00Z',
          details: 'User logged in from a new device',
        },
        {
          id: 'SEC-002',
          user: {
            id: '2',
            fullName: 'Selamawit Tesfaye',
            email: 'selam@example.com',
          },
          event: 'Failed Login Attempt',
          type: 'failed_login',
          severity: 'warning',
          ip: '192.168.1.200',
          device: 'Firefox on Mac',
          location: 'Addis Ababa, Ethiopia',
          timestamp: '2024-06-15T13:45:00Z',
          details: 'Invalid password attempt (3 attempts)',
        },
        {
          id: 'SEC-003',
          user: {
            id: '3',
            fullName: 'Merchant ABC',
            email: 'merchant@example.com',
          },
          event: 'Suspicious Activity Detected',
          type: 'suspicious',
          severity: 'critical',
          ip: '10.0.0.50',
          device: 'Unknown Device',
          location: 'Unknown Location',
          timestamp: '2024-06-15T12:20:00Z',
          details: 'Multiple failed transactions from same IP',
        },
        {
          id: 'SEC-004',
          user: {
            id: '4',
            fullName: 'Michael Desta',
            email: 'michael@example.com',
          },
          event: 'Admin Action',
          type: 'admin_action',
          severity: 'info',
          ip: '192.168.1.10',
          device: 'Chrome on Windows',
          location: 'Addis Ababa, Ethiopia',
          timestamp: '2024-06-15T11:10:00Z',
          details: 'Admin user toggled user status',
        },
        {
          id: 'SEC-005',
          user: {
            id: '5',
            fullName: 'TechHub Ethiopia',
            email: 'techhub@example.com',
          },
          event: 'Password Change',
          type: 'password_change',
          severity: 'info',
          ip: '192.168.1.150',
          device: 'Safari on iPhone',
          location: 'Addis Ababa, Ethiopia',
          timestamp: '2024-06-15T10:00:00Z',
          details: 'User changed password successfully',
        },
        {
          id: 'SEC-006',
          user: {
            id: '1',
            fullName: 'Abebe Kebede',
            email: 'abebe@example.com',
          },
          event: 'Failed Login Attempt',
          type: 'failed_login',
          severity: 'warning',
          ip: '8.8.8.8',
          device: 'Unknown Device',
          location: 'Outside Ethiopia',
          timestamp: '2024-06-15T09:30:00Z',
          details: 'Suspicious login attempt from foreign IP',
        },
      ];

      setLogs(data);

      // Calculate stats
      setStats({
        totalEvents: data.length,
        critical: data.filter(l => l.severity === 'critical').length,
        warning: data.filter(l => l.severity === 'warning').length,
        info: data.filter(l => l.severity === 'info').length,
        failedLogins: data.filter(l => l.type === 'failed_login').length,
        suspiciousActivities: data.filter(l => l.type === 'suspicious').length,
      });

      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching security logs:', error);
      toast.error('Failed to load security logs');
    } finally {
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

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <AlertCircle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
      case 'info':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Info className="w-3 h-3" />
            Info
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {severity}
          </span>
        );
    }
  };

  const getTypeBadge = (type) => {
    const types = {
      login: { label: 'Login', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: <Lock className="w-3 h-3" /> },
      logout: { label: 'Logout', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: <Unlock className="w-3 h-3" /> },
      failed_login: { label: 'Failed Login', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: <AlertTriangle className="w-3 h-3" /> },
      password_change: { label: 'Password Change', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: <Lock className="w-3 h-3" /> },
      suspicious: { label: 'Suspicious', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: <ShieldAlert className="w-3 h-3" /> },
      admin_action: { label: 'Admin Action', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: <Shield className="w-3 h-3" /> },
    };
    const info = types[type] || types.login;
    return (
      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${info.color}`}>
        {info.icon}
        {info.label}
      </span>
    );
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Security</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monitor security events and suspicious activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSecurityLogs}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Events</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalEvents}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Critical</p>
            <p className="text-xl font-bold text-red-500">{stats.critical}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Failed Logins</p>
            <p className="text-xl font-bold text-yellow-500">{stats.failedLogins}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Suspicious</p>
            <p className="text-xl font-bold text-red-500">{stats.suspiciousActivities}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search security logs by ID, user, event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="failed_login">Failed Login</option>
                <option value="password_change">Password Change</option>
                <option value="suspicious">Suspicious</option>
                <option value="admin_action">Admin Action</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Security Logs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                      log.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{log.event}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{log.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{log.user.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{log.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getTypeBadge(log.type)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getSeverityBadge(log.severity)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{log.ip}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(log.timestamp)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedLog(log);
                            setShowDetails(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {logs.length} of {logs.length} logs
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      currentPage === page
                        ? 'bg-[#0D7C4A] text-white'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Security Score</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">98%</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active Sessions</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Blocked IPs</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">23</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Log Details Modal */}
      {showDetails && selectedLog && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Security Event Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Event</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedLog.event}</p>
                </div>
                <div>
                  {getSeverityBadge(selectedLog.severity)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedLog.user.fullName} ({selectedLog.user.email})
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">IP: {selectedLog.ip}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Device: {selectedLog.device}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Location: {selectedLog.location}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(selectedLog.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedLog.details}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                {selectedLog.severity === 'critical' && (
                  <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Block IP
                  </button>
                )}
                <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-[#0D7C4A] text-white hover:bg-[#065F46] transition">
                  <Eye className="w-4 h-4 inline mr-1" />
                  Investigate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Security;