import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  ArrowLeft,
  Search,
  Bell,
  User,
  Plus,
  Wallet,
  Send,
  QrCode,
  FileText,
  BarChart3,
  Settings,
  Home,
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  Shield,
  Lock,
  Fingerprint,
  Sparkles,
  TrendingUp,
  TrendingDown,
  X,
  Camera,
  UserPlus,
  Star,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Info,
  Gift,
  Zap,
  Coins,
  Banknote,
  Phone,
  Mail,
  AtSign,
  Copy,
  Share2,
  MoreHorizontal,
  Filter,
  Calendar,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Menu,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw,
  Loader,
  Check,
  AlertTriangle,
  DollarSign,
  PieChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity,
  CalendarDays,
  Clock as ClockIcon,
  Percent,
  Award,
  Target,
  Brain,
  Zap as ZapIcon,
  Flame,
  Heart,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import toast from 'react-hot-toast';

// ============ SIDEBAR ============
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Send, label: 'Send Money', path: '/send' },
    { icon: FileText, label: 'Transactions', path: '/transactions' },
    { icon: CreditCard, label: 'Bills', path: '/bills' },
    { icon: QrCode, label: 'QR Payments', path: '/qr' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-[280px]' : 'w-20'
      }`}>
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-700 ${!sidebarOpen ? 'justify-center' : ''}`}>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0B7A43] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-[#0B7A43]">EthioPay</span>}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B7A43]'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={`border-t border-gray-100 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0B7A43] flex items-center justify-center text-white font-semibold text-sm">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-medium text-gray-800 truncate">{user?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@email.com'}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// ============ TOP NAV ============
const TopNav = ({ sidebarOpen, setSidebarOpen, onExport }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Transaction Center</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition shadow-lg shadow-[#0B7A43]/25">
            <Plus className="w-4 h-4" />
            Add Funds
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0B7A43] flex items-center justify-center text-white font-semibold text-sm">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

// ============ STAT CARD ============
const StatCard = ({ icon: Icon, label, value, change, positive, color, delay }) => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {positive ? '↑' : '↓'} {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

// ============ FILTER BAR ============
const FilterBar = ({ filters, setFilters, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = ['All', 'Completed', 'Pending', 'Processing', 'Failed', 'Refunded'];
  const typeOptions = ['All', 'Transfer', 'QR Payment', 'Bill Payment', 'Deposit', 'Withdrawal', 'Refund', 'Salary', 'Airtime Purchase'];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search by name, reference, or amount..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <button
          onClick={onApply}
          className="px-6 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition"
        >
          Apply
        </button>

        <button
          onClick={() => setFilters({ search: '', status: 'All', type: 'All', dateRange: 'All' })}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          Reset
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="text-xs font-medium text-gray-500">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#0B7A43] outline-none text-sm"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#0B7A43] outline-none text-sm"
                >
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#0B7A43] outline-none text-sm"
                >
                  <option value="All">All Time</option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                  <option value="Year">This Year</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#0B7A43] outline-none text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============ TRANSACTION TABLE ============
const TransactionTable = ({ transactions, loading }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Failed': 'bg-red-100 text-red-700',
      'Refunded': 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Transfer': Send,
      'QR Payment': QrCode,
      'Bill Payment': FileText,
      'Deposit': TrendingUp,
      'Withdrawal': TrendingDown,
      'Refund': ArrowLeft,
      'Salary': Wallet,
      'Airtime Purchase': Phone,
    };
    return icons[type] || Send;
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(transactions.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(s => s !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A43] mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedIds.length === transactions.length && transactions.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-gray-300 text-[#0B7A43] focus:ring-[#0B7A43]/20"
          />
          <span className="text-sm text-gray-500">
            {selectedIds.length} selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === transactions.length && transactions.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#0B7A43] focus:ring-[#0B7A43]/20"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('name')}>
                Recipient/Sender
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('type')}>
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('date')}>
                Date & Time
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('amount')}>
                Amount
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((tx, index) => {
                const TypeIcon = getTypeIcon(tx.type);
                return (
                  <motion.tr
                    key={tx.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(tx.id)}
                        onChange={() => handleSelectRow(tx.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#0B7A43] focus:ring-[#0B7A43]/20"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm">
                          {tx.recipient?.charAt(0) || tx.sender?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {tx.recipient || tx.sender || 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-500">{tx.category || 'General'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{tx.type || 'Transfer'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">{formatDate(tx.date || tx.createdAt)}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)} ETB
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                        {tx.status || 'Completed'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <p>No transactions found</p>
                    <p className="text-sm text-gray-400">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {transactions.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {transactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#0B7A43] text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm">
              2
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm">
              3
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ CHART SECTION ============
const ChartSection = ({ spendingData }) => {
  const data = spendingData || [
    { month: 'Jan', income: 120000, expenses: 78000 },
    { month: 'Feb', income: 132000, expenses: 82000 },
    { month: 'Mar', income: 110000, expenses: 65000 },
    { month: 'Apr', income: 145000, expenses: 88000 },
    { month: 'May', income: 138000, expenses: 79000 },
    { month: 'Jun', income: 142500, expenses: 84210 },
  ];

  const categoryData = [
    { name: 'Shopping', value: 35, color: '#FF6B6B' },
    { name: 'Food', value: 25, color: '#4ECDC4' },
    { name: 'Transport', value: 20, color: '#45B7D1' },
    { name: 'Bills', value: 15, color: '#96CEB4' },
    { name: 'Others', value: 5, color: '#FFEAA7' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Income vs Expenses</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs bg-gray-100 rounded-lg">6M</button>
            <button className="px-3 py-1 text-xs hover:bg-gray-100 rounded-lg">1Y</button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Spending by Category</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ AI INSIGHTS ============
const AIInsights = () => {
  const insights = [
    { icon: Brain, title: 'Spending Analysis', description: 'You spent 18% less on utilities this month. Great job!', color: 'text-green-600' },
    { icon: Target, title: 'Savings Goal', description: 'You\'re 68% towards your monthly savings goal of 50,000 ETB.', color: 'text-blue-600' },
    { icon: ZapIcon, title: 'Smart Suggestion', description: 'Consider reducing dining out by 20% to reach your goals faster.', color: 'text-yellow-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#0B7A43]" />
        <h3 className="font-semibold text-gray-800">AI Financial Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
            <div>
              <p className="text-sm font-medium text-gray-800">{insight.title}</p>
              <p className="text-xs text-gray-600">{insight.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============ MAIN PAGE ============
const Transactions = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    type: 'All',
    dateRange: 'All',
    sort: 'newest',
  });

  const stats = {
    income: 142500,
    expenses: 84210.50,
    savings: 58289.50,
    volume: 124,
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionService.history({ limit: 50 });
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Fallback data
      setTransactions([
        {
          id: '1',
          recipient: 'Selamawit T.',
          amount: -2500,
          type: 'Transfer',
          category: 'Personal',
          status: 'Completed',
          date: '2024-06-15T14:30:00',
        },
        {
          id: '2',
          recipient: 'Salary Deposit',
          amount: 45000,
          type: 'Salary',
          category: 'Income',
          status: 'Completed',
          date: '2024-06-14T09:00:00',
        },
        {
          id: '3',
          recipient: 'Ethio Telecom',
          amount: -850,
          type: 'Bill Payment',
          category: 'Utilities',
          status: 'Pending',
          date: '2024-06-13T18:20:00',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.success('Exporting transactions...');
  };

  const handleApplyFilters = () => {
    toast.success('Filters applied');
    fetchTransactions();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onExport={handleExport} />

          <main className="p-4 md:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Transaction Center</h1>
              <p className="text-gray-500">View and manage all your transactions</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard icon={TrendingUp} label="Total Income" value={`ETB ${stats.income.toLocaleString()}`} change="+12.4%" positive color="green" delay={0} />
              <StatCard icon={TrendingDown} label="Total Expenses" value={`ETB ${stats.expenses.toLocaleString()}`} change="+5.1%" positive={false} color="red" delay={0.1} />
              <StatCard icon={Wallet} label="Net Savings" value={`ETB ${stats.savings.toLocaleString()}`} change="+8.2%" positive color="blue" delay={0.2} />
              <StatCard icon={Activity} label="Transaction Volume" value={stats.volume} change="+3.1%" positive color="purple" delay={0.3} />
            </div>

            {/* Filter Bar */}
            <FilterBar filters={filters} setFilters={setFilters} onApply={handleApplyFilters} />

            {/* Transaction Table */}
            <div className="mt-4">
              <TransactionTable transactions={transactions} loading={loading} />
            </div>

            {/* Charts Section */}
            <div className="mt-6">
              <ChartSection />
            </div>

            {/* AI Insights */}
            <div className="mt-6">
              <AIInsights />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;