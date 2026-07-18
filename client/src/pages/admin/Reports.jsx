import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Printer,
  Mail,
  Share2,
  Archive,
  AlertCircle,
  Users,
  CreditCard,
  Wallet,
  Building,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const reports = [
    {
      id: 'RPT-001',
      name: 'Monthly Revenue Report',
      type: 'revenue',
      generated: '2024-06-15T14:30:00Z',
      size: '2.4 MB',
      status: 'completed',
      description: 'Detailed revenue breakdown for June 2024',
    },
    {
      id: 'RPT-002',
      name: 'User Growth Analytics',
      type: 'users',
      generated: '2024-06-14T10:00:00Z',
      size: '1.8 MB',
      status: 'completed',
      description: 'User registration and growth trends',
    },
    {
      id: 'RPT-003',
      name: 'Transaction Summary',
      type: 'transactions',
      generated: '2024-06-13T16:45:00Z',
      size: '3.1 MB',
      status: 'pending',
      description: 'Transaction volume and value analysis',
    },
    {
      id: 'RPT-004',
      name: 'Merchant Performance',
      type: 'merchants',
      generated: '2024-06-12T09:30:00Z',
      size: '1.2 MB',
      status: 'completed',
      description: 'Top merchants and revenue contribution',
    },
    {
      id: 'RPT-005',
      name: 'Security Audit Log',
      type: 'security',
      generated: '2024-06-11T13:20:00Z',
      size: '4.5 MB',
      status: 'failed',
      description: 'Security events and suspicious activities',
    },
  ];

  const reportTypes = [
    { value: 'all', label: 'All Reports', icon: <FileText className="w-4 h-4" /> },
    { value: 'revenue', label: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { value: 'transactions', label: 'Transactions', icon: <CreditCard className="w-4 h-4" /> },
    { value: 'merchants', label: 'Merchants', icon: <Building className="w-4 h-4" /> },
    { value: 'security', label: 'Security', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  useEffect(() => {
    fetchReports();
  }, [search, filter, dateRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      revenue: <DollarSign className="w-4 h-4" />,
      users: <Users className="w-4 h-4" />,
      transactions: <CreditCard className="w-4 h-4" />,
      merchants: <Building className="w-4 h-4" />,
      security: <AlertCircle className="w-4 h-4" />,
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      revenue: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      users: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      transactions: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      merchants: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      security: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[type] || 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const handleDownload = (report) => {
    toast.success(`Downloading ${report.name}...`);
  };

  const handleGenerate = () => {
    toast.success('Generating new report...');
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generate and manage platform reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0D7C4A] text-white rounded-xl text-sm font-medium hover:bg-[#065F46] transition"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
            <button
              onClick={fetchReports}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Reports</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{reports.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Ready for Download</p>
            <p className="text-xl font-bold text-green-500">{reports.filter(r => r.status === 'completed').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Generating</p>
            <p className="text-xl font-bold text-yellow-500">{reports.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Size</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">13.0 MB</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports by name, type..."
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
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {reports.map((report) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${getTypeColor(report.type)}`}>
                          {getTypeIcon(report.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{report.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{report.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(report.generated)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{report.size}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowDetails(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        {report.status === 'completed' && (
                          <button
                            onClick={() => handleDownload(report)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
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
        </div>

        {/* Report Templates */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Quick Report Templates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Revenue Summary', 'User Activity', 'Transaction Log', 'Merchant Report'].map((template) => (
              <button
                key={template}
                onClick={handleGenerate}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0D7C4A] hover:shadow-md transition group"
              >
                <div className="p-2 rounded-lg bg-[#0D7C4A]/10 text-[#0D7C4A] group-hover:bg-[#0D7C4A] group-hover:text-white transition">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{template}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetails && selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Report Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(selectedReport.type)}`}>
                  {getTypeIcon(selectedReport.type)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedReport.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedReport.id}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Type: {selectedReport.type}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Generated: {formatDate(selectedReport.generated)}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Size: {selectedReport.size}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedReport.description}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                {selectedReport.status === 'completed' && (
                  <button
                    onClick={() => handleDownload(selectedReport)}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-[#0D7C4A] text-white hover:bg-[#065F46] transition"
                  >
                    <Download className="w-4 h-4 inline mr-1" />
                    Download
                  </button>
                )}
                <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  <Share2 className="w-4 h-4 inline mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Reports;