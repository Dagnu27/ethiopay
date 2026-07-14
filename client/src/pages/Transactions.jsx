import { useState, useEffect } from 'react';
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
  CreditCard,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Menu,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Sparkles,
  Activity,
  Brain,
  Target,
  Zap,
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
const StatCard = ({ icon: Icon, label, value, change, positive, color }) => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
    </div>
  );
};

// ============ TRANSACTION TABLE ============
const TransactionTable = ({ transactions, loading }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Failed': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
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
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr key={tx.id || index} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-4 text-sm text-gray-800">{tx.description || tx.merchant || 'Transaction'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(tx.date || tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))} ETB
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status || 'Completed'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No transactions found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ CHART SECTION ============
const ChartSection = () => {
  const data = [
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
        <h3 className="font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
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
            <PieChart>
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
            </PieChart>
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

// ============ MAIN PAGE ============
const Transactions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    income: 142500,
    expenses: 84210.50,
    savings: 58289.50,
    volume: 124,
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionService.history({ limit: 20 });
      setTransactions(response.data.transactions || []);
    } catch (error) {
      // Fallback data
      setTransactions([
        { id: 1, description: 'Sent to Selamawit T.', amount: -2500, status: 'Completed', date: new Date().toISOString() },
        { id: 2, description: 'Salary Deposit', amount: 45000, status: 'Completed', date: new Date().toISOString() },
        { id: 3, description: 'Ethio Telecom Bill', amount: -850, status: 'Pending', date: new Date().toISOString() },
        { id: 4, description: 'Transfer to Abebe K.', amount: -1200, status: 'Completed', date: new Date().toISOString() },
        { id: 5, description: 'Freelance Payment', amount: 3200, status: 'Processing', date: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
                <h1 className="text-lg font-bold text-gray-800">Transaction Center</h1>
              </div>

              <div className="flex items-center gap-2">
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Transaction Center</h1>
              <p className="text-gray-500">View and manage all your transactions</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard icon={TrendingUp} label="Total Income" value={`ETB ${stats.income.toLocaleString()}`} change="+12.4%" positive color="green" />
              <StatCard icon={TrendingDown} label="Total Expenses" value={`ETB ${stats.expenses.toLocaleString()}`} change="+5.1%" positive={false} color="red" />
              <StatCard icon={Wallet} label="Net Savings" value={`ETB ${stats.savings.toLocaleString()}`} change="+8.2%" positive color="blue" />
              <StatCard icon={Activity} label="Transaction Volume" value={stats.volume} change="+3.1%" positive color="purple" />
            </div>

            {/* Transaction Table */}
            <TransactionTable transactions={transactions} loading={loading} />

            {/* Chart Section */}
            <div className="mt-6">
              <ChartSection />
            </div>

            {/* AI Insights */}
            <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#0B7A43]" />
                <h3 className="font-semibold text-gray-800">AI Financial Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50">
                  <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Spending Analysis</p>
                    <p className="text-xs text-gray-600">You spent 18% less on utilities this month.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Savings Goal</p>
                    <p className="text-xs text-gray-600">68% towards your monthly savings goal.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50">
                  <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Smart Suggestion</p>
                    <p className="text-xs text-gray-600">Reduce dining out by 20% to reach your goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Fix: Add missing ChevronDown import in Sidebar
const ChevronDownIcon = ChevronDown;

export default Transactions;