import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  FileText,
  Download,
  RefreshCw,
  Filter,
  Search,
  Plus,
  Bell,
  Sparkles,
  Brain,
  Target,
  Zap,
  ChevronDown,
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

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

// Import data constants
import { spendingData as defaultSpendingData, categoryData as defaultCategoryData } from '../data/dashboardData';

const Transactions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [stats, setStats] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    volume: 0,
  });

  const spendingData = defaultSpendingData;
  const categoryData = defaultCategoryData;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionService.history({ limit: 50 });
      const data = response.data.transactions || [];
      setTransactions(data);
      
      // Calculate stats from real data
      const income = data.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const expenses = data.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      setStats({
        income,
        expenses,
        savings: income - expenses,
        volume: data.length,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Fallback data
      const fallbackData = [
        { id: 1, description: 'Sent to Selamawit T.', amount: -2500, status: 'Completed', date: new Date().toISOString() },
        { id: 2, description: 'Salary Deposit', amount: 45000, status: 'Completed', date: new Date().toISOString() },
        { id: 3, description: 'Ethio Telecom Bill', amount: -850, status: 'Pending', date: new Date().toISOString() },
        { id: 4, description: 'Transfer to Abebe K.', amount: -1200, status: 'Completed', date: new Date().toISOString() },
        { id: 5, description: 'Freelance Payment', amount: 3200, status: 'Processing', date: new Date().toISOString() },
      ];
      setTransactions(fallbackData);
      setStats({
        income: 48200,
        expenses: 4550,
        savings: 43650,
        volume: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = () => {
    toast.success('Exporting transactions...');
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.merchant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || tx.status === filterStatus;
    const matchesType = filterType === 'All' || 
                       (filterType === 'Income' && tx.amount > 0) ||
                       (filterType === 'Expense' && tx.amount < 0);
    return matchesSearch && matchesStatus && matchesType;
  });

  // Status options for filter
  const statusOptions = ['All', 'Completed', 'Pending', 'Processing', 'Failed'];
  const typeOptions = ['All', 'Income', 'Expense'];

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
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Transaction Center
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                View and manage all your transactions
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={TrendingUp}
                label="Total Income"
                value={`ETB ${stats.income.toLocaleString()}`}
                change="+12.4%"
                positive={true}
                color="green"
                darkMode={darkMode}
              />
              <StatCard
                icon={TrendingDown}
                label="Total Expenses"
                value={`ETB ${stats.expenses.toLocaleString()}`}
                change="+5.1%"
                positive={false}
                color="red"
                darkMode={darkMode}
              />
              <StatCard
                icon={Wallet}
                label="Net Savings"
                value={`ETB ${stats.savings.toLocaleString()}`}
                change="+8.2%"
                positive={true}
                color="blue"
                darkMode={darkMode}
              />
              <StatCard
                icon={Activity}
                label="Transaction Volume"
                value={stats.volume}
                change="+3.1%"
                positive={true}
                color="purple"
                darkMode={darkMode}
              />
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0B7A43] outline-none text-sm dark:text-white"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0B7A43] outline-none text-sm dark:text-white"
                >
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>

                <button
                  onClick={fetchTransactions}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Transaction Table */}
            <TransactionTable 
              transactions={filteredTransactions} 
              loading={loading}
              darkMode={darkMode}
            />

            {/* Chart Section */}
            <div className="mt-6">
              <ChartSection darkMode={darkMode} />
            </div>

            {/* AI Insights */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#0B7A43]" />
                <h3 className="font-semibold text-gray-800 dark:text-white">AI Financial Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <Brain className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Spending Analysis</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">You spent 18% less on utilities this month.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Savings Goal</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">68% towards your monthly savings goal.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Smart Suggestion</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Reduce dining out by 20% to reach your goals.</p>
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

// ============ TRANSACTION TABLE ============
const TransactionTable = ({ transactions, loading, darkMode }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Processing': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Failed': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400';
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A43] mx-auto"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden`}>
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr key={tx.id || index} className={`${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition cursor-pointer`}>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{tx.description || tx.merchant || 'Transaction'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.date || tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
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
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
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
const ChartSection = ({ darkMode }) => {
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

  const textColor = darkMode ? '#9CA3AF' : '#6B7280';
  const gridColor = darkMode ? '#374151' : '#E5E7EB';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className={`lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Income vs Expenses</h3>
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
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Spending by Category</h3>
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
              <span className="text-xs text-gray-600 dark:text-gray-400">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;