import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Eye,
  EyeOff,
  Zap,
  Award,
  Target,
  Flame,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Utensils,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Legend,
} from 'recharts';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';

// Sample data
const revenueTrendData = [
  { month: 'Jan', revenue: 280000, transactions: 3200, growth: 12 },
  { month: 'Feb', revenue: 310000, transactions: 3500, growth: 15 },
  { month: 'Mar', revenue: 290000, transactions: 3300, growth: 10 },
  { month: 'Apr', revenue: 340000, transactions: 3800, growth: 18 },
  { month: 'May', revenue: 320000, transactions: 3600, growth: 14 },
  { month: 'Jun', revenue: 380000, transactions: 4200, growth: 22 },
  { month: 'Jul', revenue: 360000, transactions: 4000, growth: 19 },
  { month: 'Aug', revenue: 410000, transactions: 4500, growth: 25 },
  { month: 'Sep', revenue: 390000, transactions: 4300, growth: 21 },
  { month: 'Oct', revenue: 430000, transactions: 4700, growth: 28 },
  { month: 'Nov', revenue: 420000, transactions: 4600, growth: 26 },
  { month: 'Dec', revenue: 480000, transactions: 5200, growth: 32 },
];

const channelData = [
  { name: 'Mobile App', value: 45, color: '#0D7C4A' },
  { name: 'Web', value: 30, color: '#3B82F6' },
  { name: 'QR Code', value: 15, color: '#F59E0B' },
  { name: 'USSD', value: 10, color: '#8B5CF6' },
];

const regionalData = [
  { region: 'Addis Ababa', revenue: 180000, users: 4500, growth: 18 },
  { region: 'Oromia', revenue: 120000, users: 3200, growth: 22 },
  { region: 'Amhara', revenue: 85000, users: 2100, growth: 15 },
  { region: 'SNNPR', revenue: 60000, users: 1500, growth: 20 },
  { region: 'Tigray', revenue: 45000, users: 1100, growth: 10 },
  { region: 'Other', revenue: 30000, users: 800, growth: 25 },
];

const performanceData = [
  { subject: 'Speed', A: 95, fullMark: 100 },
  { subject: 'Security', A: 98, fullMark: 100 },
  { subject: 'Uptime', A: 99, fullMark: 100 },
  { subject: 'Support', A: 92, fullMark: 100 },
  { subject: 'UX', A: 88, fullMark: 100 },
  { subject: 'Reliability', A: 97, fullMark: 100 },
];

const dailyComparisonData = [
  { day: 'Mon', current: 4200, previous: 3800 },
  { day: 'Tue', current: 4800, previous: 4200 },
  { day: 'Wed', current: 4500, previous: 4000 },
  { day: 'Thu', current: 5100, previous: 4600 },
  { day: 'Fri', current: 5800, previous: 5200 },
  { day: 'Sat', current: 3800, previous: 3500 },
  { day: 'Sun', current: 3200, previous: 2900 },
];

const heatmapData = [
  { hour: '00:00', mon: 12, tue: 8, wed: 10, thu: 15, fri: 20, sat: 25, sun: 18 },
  { hour: '04:00', mon: 5, tue: 4, wed: 6, thu: 8, fri: 10, sat: 15, sun: 12 },
  { hour: '08:00', mon: 45, tue: 50, wed: 48, thu: 55, fri: 60, sat: 35, sun: 30 },
  { hour: '12:00', mon: 80, tue: 85, wed: 78, thu: 90, fri: 95, sat: 65, sun: 55 },
  { hour: '16:00', mon: 70, tue: 75, wed: 72, thu: 85, fri: 88, sat: 70, sun: 60 },
  { hour: '20:00', mon: 50, tue: 55, wed: 48, thu: 60, fri: 65, sat: 80, sun: 70 },
];

const COLORS = ['#0D7C4A', '#3B82F6', '#F59E0B', '#8B5CF6', '#22C55E', '#EF4444'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('12M');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const timeframes = ['7D', '30D', '90D', '12M'];

  const kpis = [
    { label: 'Total Revenue', value: 'ETB 4.8M', change: '+32%', positive: true, icon: DollarSign, color: 'green' },
    { label: 'Growth Rate', value: '28.5%', change: '+5.2%', positive: true, icon: TrendingUp, color: 'blue' },
    { label: 'Active Users', value: '18.2K', change: '+18.4%', positive: true, icon: Users, color: 'purple' },
    { label: 'Success Rate', value: '99.97%', change: '+0.02%', positive: true, icon: Activity, color: 'emerald' },
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Deep insights into platform performance</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    timeframe === tf
                      ? 'bg-white dark:bg-gray-700 text-[#0D7C4A] shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl bg-[#0D7C4A] text-white hover:bg-[#065F46] transition">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{kpi.value}</p>
                  <p className={`text-xs font-medium mt-1 ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.positive ? '↑' : '↓'} {kpi.change}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600`}>
                  <kpi.icon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Revenue & Transaction Trend</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly performance overview</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs bg-[#0D7C4A] text-white rounded-lg">12M</button>
              <button className="px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">6M</button>
              <button className="px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">3M</button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D7C4A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D7C4A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#0D7C4A" strokeWidth={2} fill="url(#revenueGrad2)" name="Revenue" />
                <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#3B82F6" strokeWidth={2} name="Transactions" />
                <Bar yAxisId="left" dataKey="growth" fill="#22C55E" name="Growth %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Payment Channels</h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {channelData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Regional Performance</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} width={80} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0D7C4A" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="growth" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Platform Performance Score</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                  <Radar name="Score" dataKey="A" stroke="#0D7C4A" fill="#0D7C4A" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Weekly Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyComparisonData}>
                  <defs>
                    <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D7C4A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D7C4A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="current" stroke="#0D7C4A" strokeWidth={2} fill="url(#currentGrad)" name="Current Week" />
                  <Area type="monotone" dataKey="previous" stroke="#3B82F6" strokeWidth={2} fill="none" name="Previous Week" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Activity Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Hour</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Mon</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Tue</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Wed</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Thu</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Fri</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Sat</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Sun</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row) => (
                  <tr key={row.hour} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{row.hour}</td>
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => {
                      const value = row[day as keyof typeof row] as number;
                      const intensity = Math.min(value / 100, 1);
                      return (
                        <td key={day} className="px-4 py-2 text-center">
                          <div
                            className="rounded-lg p-2 transition-all"
                            style={{
                              backgroundColor: `rgba(13, 124, 74, ${intensity * 0.8 + 0.1})`,
                              color: intensity > 0.5 ? 'white' : 'inherit',
                            }}
                          >
                            <span className="text-xs font-medium">{value}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-[#0D7C4A]/10 to-[#065F46]/10 rounded-2xl p-6 border border-[#0D7C4A]/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#0D7C4A]/20">
              <Zap className="w-6 h-6 text-[#0D7C4A]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 dark:text-white">AI Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Revenue Growth</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">32% increase this quarter</p>
                  <p className="text-xs text-green-500 mt-1">↑ 12% from last quarter</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400">User Activity</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Peak hours 12-4 PM</p>
                  <p className="text-xs text-blue-500 mt-1">18% higher than average</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recommendation</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Expand mobile channels</p>
                  <p className="text-xs text-purple-500 mt-1">45% of users prefer mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;