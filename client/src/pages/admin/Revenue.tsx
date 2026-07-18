import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  Building,
  Smartphone,
  PieChart,
  BarChart3,
  LineChart,
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
  Legend,
} from 'recharts';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
  fees: number;
}

interface RevenueStats {
  totalRevenue: number;
  totalFees: number;
  totalTransactions: number;
  averageTransaction: number;
  growth: number;
  dailyAverage: number;
}

const Revenue = () => {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    totalFees: 0,
    totalTransactions: 0,
    averageTransaction: 0,
    growth: 0,
    dailyAverage: 0,
  });

  // Payment method distribution
  const paymentMethodData = [
    { name: 'Card', value: 35, color: '#3B82F6' },
    { name: 'Bank Transfer', value: 30, color: '#0D7C4A' },
    { name: 'Mobile Money', value: 20, color: '#8B5CF6' },
    { name: 'Wallet', value: 15, color: '#F59E0B' },
  ];

  // Revenue by category
  const categoryData = [
    { name: 'Transfer Fees', value: 45, color: '#0D7C4A' },
    { name: 'Bill Payments', value: 25, color: '#3B82F6' },
    { name: 'Withdrawals', value: 20, color: '#F59E0B' },
    { name: 'QR Payments', value: 10, color: '#8B5CF6' },
  ];

  const COLORS = ['#0D7C4A', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#22C55E'];

  useEffect(() => {
    fetchRevenueData();
  }, [timeframe]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      // Sample data - 30 days
      const data: RevenueData[] = [];
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: Math.floor(Math.random() * 50000) + 10000,
          transactions: Math.floor(Math.random() * 100) + 20,
          fees: Math.floor(Math.random() * 5000) + 1000,
        });
      }
      setRevenueData(data);

      // Calculate stats
      const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
      const totalFees = data.reduce((sum, d) => sum + d.fees, 0);
      const totalTransactions = data.reduce((sum, d) => sum + d.transactions, 0);
      const dailyAverage = totalRevenue / data.length;
      const growth = 12.5; // Sample growth percentage

      setStats({
        totalRevenue,
        totalFees,
        totalTransactions,
        averageTransaction: totalRevenue / totalTransactions,
        growth,
        dailyAverage,
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      toast.error('Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return 'ETB 0.00';
    }
    if (amount >= 1000000) {
      return `ETB ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `ETB ${(amount / 1000).toFixed(1)}K`;
    }
    return `ETB ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatCurrencyFull = (amount: number) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return 'ETB 0.00';
    }
    return `ETB ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-white">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-[#0D7C4A]">
              Revenue: {formatCurrency(payload[0]?.value || 0)}
            </p>
            <p className="text-sm text-blue-500">
              Transactions: {payload[1]?.value || 0}
            </p>
          </div>
        </div>
      );
    }
    return null;
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Revenue Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track platform revenue and financial performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    timeframe === period
                      ? 'bg-white dark:bg-gray-700 text-[#0D7C4A] shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {period === '7d' ? '7D' : period === '30d' ? '30D' : period === '90d' ? '90D' : '1Y'}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {formatCurrencyFull(stats.totalRevenue)}
                </p>
                <p className={`text-xs font-medium mt-1 text-green-500`}>
                  ↑ {stats.growth}% growth
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-[#0D7C4A]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Fees</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {formatCurrencyFull(stats.totalFees)}
                </p>
                <p className="text-xs font-medium mt-1 text-blue-500">
                  ↑ 8.3% from last period
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Transactions</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {stats.totalTransactions.toLocaleString()}
                </p>
                <p className="text-xs font-medium mt-1 text-purple-500">
                  ↑ 15.2% from last period
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-500">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Daily Average</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {formatCurrencyFull(stats.dailyAverage)}
                </p>
                <p className="text-xs font-medium mt-1 text-green-500">
                  ↑ {stats.growth}% from last period
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500">
                <LineChart className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Revenue Trend</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily revenue and transaction volume</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0D7C4A]" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Transactions</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D7C4A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D7C4A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0D7C4A"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  name="Revenue"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="transactions"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="none"
                  name="Transactions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Payment Methods</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="text-xs font-medium text-gray-800 dark:text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Revenue by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} tick={{ fill: '#6B7280', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Average Transaction</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">
              {formatCurrencyFull(stats.averageTransaction)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Fees Collected</p>
            <p className="text-lg font-bold text-blue-500 mt-1">
              {formatCurrencyFull(stats.totalFees)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Revenue Growth</p>
            <p className="text-lg font-bold text-green-500 mt-1">
              ↑ {stats.growth}%
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Active Users</p>
            <p className="text-lg font-bold text-purple-500 mt-1">
              12,543
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Revenue;