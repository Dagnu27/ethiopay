import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Store,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
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
  LineChart,
  Line,
} from 'recharts';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';

// Sample data
const revenueData = [
  { name: 'Mon', revenue: 12000, transactions: 45 },
  { name: 'Tue', revenue: 18000, transactions: 52 },
  { name: 'Wed', revenue: 15000, transactions: 48 },
  { name: 'Thu', revenue: 22000, transactions: 65 },
  { name: 'Fri', revenue: 28000, transactions: 78 },
  { name: 'Sat', revenue: 20000, transactions: 56 },
  { name: 'Sun', revenue: 14000, transactions: 38 },
];

const transactionData = [
  { name: 'Jan', amount: 45000 },
  { name: 'Feb', amount: 52000 },
  { name: 'Mar', amount: 48000 },
  { name: 'Apr', amount: 61000 },
  { name: 'May', amount: 55000 },
  { name: 'Jun', amount: 72000 },
];

const paymentMethodData = [
  { name: 'Bank Transfer', value: 45 },
  { name: 'Card', value: 30 },
  { name: 'Wallet', value: 15 },
  { name: 'QR', value: 10 },
];

const COLORS = ['#0D7C4A', '#22C55E', '#3B82F6', '#F59E0B'];

const recentTransactions = [
  { id: 'TX-001', user: 'Abebe K.', amount: 45000, status: 'completed', date: '2024-06-15 14:30' },
  { id: 'TX-002', user: 'Selamawit T.', amount: -12500, status: 'pending', date: '2024-06-15 13:45' },
  { id: 'TX-003', user: 'Merchant ABC', amount: 2800, status: 'completed', date: '2024-06-15 12:20' },
  { id: 'TX-004', user: 'Helen G.', amount: -850, status: 'failed', date: '2024-06-15 11:10' },
  { id: 'TX-005', user: 'Abebe K.', amount: 3200, status: 'completed', date: '2024-06-15 10:00' },
];

const activityFeed = [
  { id: 1, user: 'Abebe K.', action: 'Transaction', amount: '45,000 ETB', time: '2 min ago', type: 'success' },
  { id: 2, user: 'Selamawit T.', action: 'Withdrawal Request', amount: '12,500 ETB', time: '15 min ago', type: 'warning' },
  { id: 3, user: 'New User', action: 'Account Created', amount: '', time: '1 hour ago', type: 'info' },
  { id: 4, user: 'Merchant ABC', action: 'Settlement', amount: '28,500 ETB', time: '2 hours ago', type: 'success' },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: 'ETB 2,845,000', change: '+12.5%', positive: true, icon: DollarSign, color: 'green' },
    { label: 'Transactions', value: '18,247', change: '+8.2%', positive: true, icon: CreditCard, color: 'blue' },
    { label: 'Active Users', value: '12,543', change: '+18.4%', positive: true, icon: Users, color: 'purple' },
    { label: 'Merchants', value: '847', change: '+5.1%', positive: true, icon: Store, color: 'emerald' },
    { label: 'Success Rate', value: '99.97%', change: '+0.02%', positive: true, icon: CheckCircle, color: 'green' },
    { label: 'Failed Transactions', value: '42', change: '-3.1%', positive: true, icon: AlertTriangle, color: 'red' },
  ];

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time platform overview</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.positive ? '↑' : '↓'} {stat.change}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Revenue Overview</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily revenue and transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-xs bg-[#0D7C4A] text-white rounded-lg">7D</button>
                <button className="px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">30D</button>
                <button className="px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">90D</button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D7C4A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D7C4A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#0D7C4A" strokeWidth={2} fill="url(#revenueGrad)" />
                  <Area type="monotone" dataKey="transactions" stroke="#3B82F6" strokeWidth={2} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Payment Methods</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {paymentMethodData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
              <button className="text-sm text-[#0D7C4A] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">{tx.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{tx.user}</td>
                      <td className={`px-6 py-4 text-sm font-semibold text-right ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ETB
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Live Activity</h3>
            <div className="space-y-4">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className={`p-2 rounded-xl ${
                    item.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                    item.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    {item.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {item.type === 'info' && <Users className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{item.user}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.action} {item.amount && `· ${item.amount}`}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">System Health</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-800 dark:text-white">99.97%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending KYC</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">23</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Fraud Alerts</p>
            <p className="text-sm font-medium text-red-500 mt-1">2</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Settlement Queue</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">8</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;