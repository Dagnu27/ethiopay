    import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  Sparkles,
  Brain,
  Target,
  Zap,
  PieChart,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Percent,
  Clock,
  Award,
  Flame,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Gift,
  Smartphone,
  Tv,
  Droplets,
  Zap as ZapIcon,
  Wifi,
  MoreHorizontal,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend,
} from 'recharts';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('6M');

  // Sample data
  const monthlyData = [
    { month: 'Jan', income: 120000, expenses: 78000, savings: 42000 },
    { month: 'Feb', income: 132000, expenses: 82000, savings: 50000 },
    { month: 'Mar', income: 110000, expenses: 65000, savings: 45000 },
    { month: 'Apr', income: 145000, expenses: 88000, savings: 57000 },
    { month: 'May', income: 138000, expenses: 79000, savings: 59000 },
    { month: 'Jun', income: 142500, expenses: 84210, savings: 58290 },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 3200 },
    { day: 'Tue', amount: 2800 },
    { day: 'Wed', amount: 4500 },
    { day: 'Thu', amount: 3800 },
    { day: 'Fri', amount: 5200 },
    { day: 'Sat', amount: 2100 },
    { day: 'Sun', amount: 1800 },
  ];

  const categoryData = [
    { name: 'Shopping', value: 35, color: '#FF6B6B', icon: ShoppingBag },
    { name: 'Food', value: 25, color: '#4ECDC4', icon: Utensils },
    { name: 'Transport', value: 20, color: '#45B7D1', icon: Car },
    { name: 'Bills', value: 15, color: '#96CEB4', icon: Home },
    { name: 'Others', value: 5, color: '#FFEAA7', icon: Gift },
  ];

  const monthlyComparison = [
    { name: 'Income', current: 142500, previous: 138000 },
    { name: 'Expenses', current: 84210, previous: 79000 },
    { name: 'Savings', current: 58290, previous: 59000 },
  ];

  const stats = {
    totalIncome: 142500,
    totalExpenses: 84210,
    netSavings: 58290,
    monthlyGrowth: 12.4,
    avgDailySpending: 2800,
    totalTransactions: 124,
    bestCategory: 'Shopping',
    savingsRate: 41,
  };

  const timeframes = ['1W', '1M', '3M', '6M', '1Y'];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Fetch real data from API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

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
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
              <p className="text-gray-500 dark:text-gray-400">Deep insights into your financial health</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={TrendingUp}
                label="Total Income"
                value={`ETB ${stats.totalIncome.toLocaleString()}`}
                change="+12.4%"
                positive={true}
                color="green"
                darkMode={darkMode}
              />
              <StatCard
                icon={TrendingDown}
                label="Total Expenses"
                value={`ETB ${stats.totalExpenses.toLocaleString()}`}
                change="+5.1%"
                positive={false}
                color="red"
                darkMode={darkMode}
              />
              <StatCard
                icon={Wallet}
                label="Net Savings"
                value={`ETB ${stats.netSavings.toLocaleString()}`}
                change="+8.2%"
                positive={true}
                color="blue"
                darkMode={darkMode}
              />
              <StatCard
                icon={Activity}
                label="Transactions"
                value={stats.totalTransactions}
                change="+3.1%"
                positive={true}
                color="purple"
                darkMode={darkMode}
              />
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-2 mb-6">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    timeframe === tf
                      ? 'bg-[#0B7A43] text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tf}
                </button>
              ))}
              <button className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ml-auto">
                <Download className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {/* Income vs Expenses Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Income vs Expenses</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Last 6 months</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Savings Rate */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Savings Rate</h3>
                <div className="flex items-center justify-center h-48">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={darkMode ? '#374151' : '#E5E7EB'}
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#0B7A43"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${stats.savingsRate * 4.4} 440`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.savingsRate}%</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You're saving <span className="font-semibold text-[#0B7A43]">{formatCurrency(stats.netSavings)} ETB</span> per month
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {monthlyComparison.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(item.current)} ETB</p>
                    </div>
                    <div className={`text-right ${item.current > item.previous ? 'text-green-500' : 'text-red-500'}`}>
                      <p className="text-sm font-medium">
                        {item.current > item.previous ? '↑' : '↓'}
                        {((item.current - item.previous) / item.previous * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${item.current > item.previous ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${(item.current / item.previous) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Spending Categories & Weekly Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Spending Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Spending by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Weekly Activity</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B7A43" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0B7A43" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="amount" stroke="#0B7A43" strokeWidth={2} fill="url(#weeklyGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
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
                    <p className="text-xs text-gray-600 dark:text-gray-400">You're 68% towards your monthly savings goal.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Smart Suggestion</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Reduce dining out by 20% to reach your goals faster.</p>
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

export default Analytics;