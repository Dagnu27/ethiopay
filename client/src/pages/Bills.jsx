import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { billService } from '../services/api';
import {
  Home,
  Wallet,
  Send,
  QrCode,
  FileText,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  User,
  Plus,
  Search,
  Menu,
  ChevronDown,
  MoreHorizontal,
  Download,
  RefreshCw,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Droplets,
  Wifi,
  Tv,
  Home as HomeIcon,
  Car,
  GraduationCap,
  Building,
  CreditCard as CreditCardIcon,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Percent,
  Shield,
  Gift,
  Zap as ZapIcon,
  Eye,
  EyeOff,
  X,
  Check,
  Printer,
  Share2,
  Copy,
  ExternalLink,
  Loader,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import toast from 'react-hot-toast';

// ============ SIDEBAR ============
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = window.location;
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
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-[280px]' : 'w-20'
      }`}>
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 ${!sidebarOpen ? 'justify-center' : ''}`}>
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

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 hidden lg:flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition"
        >
          <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
      </aside>
    </>
  );
};

// ============ STAT CARD ============
const StatCard = ({ icon: Icon, label, value, subtitle, change, positive, color, delay }) => {
  const colors = {
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    red: 'bg-red-50 text-red-600 border-red-100',
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
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          {change && (
            <p className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

// ============ BILL CARD ============
const BillCard = ({ bill, onPay }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Due Today': 'bg-red-100 text-red-700',
      'Due Tomorrow': 'bg-yellow-100 text-yellow-700',
      'Due This Week': 'bg-blue-100 text-blue-700',
      'Paid': 'bg-green-100 text-green-700',
      'Overdue': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getProviderIcon = (provider) => {
    const icons = {
      'Electricity': Zap,
      'Telecom': Wifi,
      'Water': Droplets,
      'Internet': Wifi,
      'TV': Tv,
      'Rent': HomeIcon,
      'Fuel': Car,
      'Education': GraduationCap,
      'Government': Building,
      'Loan': CreditCardIcon,
    };
    const Icon = icons[provider] || FileText;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0B7A43]/10 flex items-center justify-center text-[#0B7A43]">
            {getProviderIcon(bill.provider)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{bill.provider}</h4>
            <p className="text-sm text-gray-500">Account: {bill.account}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
          {bill.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Due Date</p>
          <p className="text-sm font-medium text-gray-800">{bill.dueDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Amount</p>
          <p className="text-lg font-bold text-gray-800">{bill.amount} ETB</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onPay(bill)}
          className="flex-1 bg-[#0B7A43] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#096336] transition"
        >
          Pay Now
        </button>
        <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
};

// ============ CATEGORY CARD ============
const CategoryCard = ({ category, count, amount, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">{category}</p>
          <p className="text-xs text-gray-500">{count} bills • {amount} ETB</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>
    </motion.div>
  );
};

// ============ MAIN BILLS PAGE ============
const Bills = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stats = {
    totalOutstanding: 12450,
    paidThisMonth: 8450,
    upcoming: 3200,
    monthlySpending: 8450,
    autoPayActive: 3,
    savings: 450,
  };

  const categories = [
    { name: 'Electricity', icon: Zap, count: 2, amount: 1200, color: 'bg-yellow-500' },
    { name: 'Telecom', icon: Wifi, count: 3, amount: 850, color: 'bg-blue-500' },
    { name: 'Water', icon: Droplets, count: 1, amount: 450, color: 'bg-cyan-500' },
    { name: 'Internet', icon: Wifi, count: 2, amount: 1500, color: 'bg-purple-500' },
    { name: 'TV', icon: Tv, count: 1, amount: 350, color: 'bg-red-500' },
    { name: 'Education', icon: GraduationCap, count: 2, amount: 3000, color: 'bg-green-500' },
  ];

  const sampleBills = [
    { id: 1, provider: 'Ethio Electric (EEP)', account: '88203-11', amount: 1420.50, dueDate: '2024-10-12', status: 'Due Today' },
    { id: 2, provider: 'Ethio Telecom', account: '0911002233', amount: 850.00, dueDate: '2024-10-28', status: 'Due This Week' },
    { id: 3, provider: 'Water Authority', account: 'WA-456-789', amount: 450.00, dueDate: '2024-10-05', status: 'Overdue' },
    { id: 4, provider: 'Addis Academy', account: 'SA-202-01', amount: 12500.00, dueDate: '2024-10-15', status: 'Due Tomorrow' },
    { id: 5, provider: 'Safaricom Ethiopia', account: '0700112233', amount: 350.00, dueDate: '2024-10-20', status: 'Due This Week' },
  ];

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await billService.getAll();
      setBills(response.data.bills || sampleBills);
    } catch (error) {
      setBills(sampleBills);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setShowPayModal(true);
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      toast.success('Bill paid successfully! 🎉');
      setTimeout(() => {
        setShowPayModal(false);
        setPaymentSuccess(false);
        fetchBills();
      }, 2000);
    }, 1500);
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || bill.provider === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const chartData = [
    { month: 'Jan', utilities: 3200, telecom: 1800, other: 1200 },
    { month: 'Feb', utilities: 2800, telecom: 1900, other: 1400 },
    { month: 'Mar', utilities: 3500, telecom: 2000, other: 1100 },
    { month: 'Apr', utilities: 3000, telecom: 1700, other: 1500 },
    { month: 'May', utilities: 3100, telecom: 1850, other: 1300 },
    { month: 'Jun', utilities: 3400, telecom: 1950, other: 1600 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          {/* Top Nav */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="flex items-center justify-between px-4 md:px-6 h-16">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Bill Payments</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-sm text-gray-500">Balance:</span>
                  <span className="text-sm font-bold text-[#0B7A43]">ETB 124,580</span>
                </div>
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

          {/* Main Content */}
          <main className="p-4 md:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bill Payments Center</h1>
              <p className="text-gray-500">Manage, track, and pay all your bills in one place.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <StatCard icon={AlertCircle} label="Outstanding" value={`ETB ${stats.totalOutstanding.toLocaleString()}`} subtitle="Total due" color="red" delay={0} />
              <StatCard icon={CheckCircle} label="Paid This Month" value={`ETB ${stats.paidThisMonth.toLocaleString()}`} change="+8%" positive color="green" delay={0.1} />
              <StatCard icon={Calendar} label="Upcoming" value={`ETB ${stats.upcoming.toLocaleString()}`} subtitle="This week" color="blue" delay={0.2} />
              <StatCard icon={TrendingUp} label="Monthly Spending" value={`ETB ${stats.monthlySpending.toLocaleString()}`} change="+5%" positive color="purple" delay={0.3} />
              <StatCard icon={Shield} label="AutoPay Active" value={stats.autoPayActive} subtitle="3 bills" color="green" delay={0.4} />
              <StatCard icon={Gift} label="Savings" value={`ETB ${stats.savings.toLocaleString()}`} change="-2%" positive color="yellow" delay={0.5} />
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search bills..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#0B7A43] outline-none text-sm"
              >
                <option value="All">All Categories</option>
                <option value="Electricity">Electricity</option>
                <option value="Telecom">Telecom</option>
                <option value="Water">Water</option>
                <option value="Internet">Internet</option>
              </select>
              <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Bill Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredBills.map((bill) => (
                <BillCard key={bill.id} bill={bill} onPay={handlePayBill} />
              ))}
            </div>

            {/* Categories Section */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.name} {...cat} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Monthly Bill Spending</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="utilities" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B7A43" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0B7A43" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="utilities" stroke="#0B7A43" strokeWidth={2} fill="url(#utilities)" />
                      <Area type="monotone" dataKey="telecom" stroke="#14B86A" strokeWidth={2} fill="none" />
                      <Area type="monotone" dataKey="other" stroke="#6B7280" strokeWidth={2} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">AI Bill Assistant</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#0B7A43] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Electricity Bill</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Your electricity bill increased by 12% compared to last month.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Savings Opportunity</p>
                        <p className="text-xs text-gray-600 mt-1">
                          You can save 450 ETB annually by enabling AutoPay.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Stable Spending</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Internet bills have remained stable for the last 6 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AutoPay Section */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">AutoPay Management</h3>
                <button className="text-sm text-[#0B7A43] font-medium hover:underline">Manage All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Ethio Electric</p>
                    <p className="text-xs text-gray-500">Next: Oct 12, 2024</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Ethio Telecom</p>
                    <p className="text-xs text-gray-500">Next: Oct 28, 2024</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">Inactive</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Water Authority</p>
                    <p className="text-xs text-gray-500">Next: Oct 5, 2024</p>
                  </div>
                  <button className="text-sm text-[#0B7A43] font-medium hover:underline">Enable</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl"
            >
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
                  <p className="text-gray-500 mt-2">Your bill has been paid.</p>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="mt-6 px-6 py-3 bg-[#0B7A43] text-white rounded-xl font-medium hover:bg-[#096336] transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Confirm Payment</h3>
                    <button onClick={() => setShowPayModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  {selectedBill && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Provider</p>
                        <p className="font-semibold text-gray-800">{selectedBill.provider}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="text-2xl font-bold text-[#0B7A43]">{selectedBill.amount} ETB</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Account</p>
                        <p className="font-medium text-gray-800">{selectedBill.account}</p>
                      </div>
                      <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className="w-full bg-[#0B7A43] text-white py-3.5 rounded-xl font-semibold hover:bg-[#096336] transition disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader className="w-5 h-5 animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          'Confirm Payment'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bills;