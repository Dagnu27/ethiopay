import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  Wallet as WalletIcon,  // ✅ RENAMED
  CreditCard,
  Plus,
  Send,
  Download,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Copy,
  RefreshCw,
  QrCode,
  Smartphone,
  Building2,
  Gift,
  Sparkles,
  Shield,
  Lock,
  Fingerprint,
  Bell,
  Menu,
  Home,
  FileText,
  BarChart3,
  Settings,
  QrCode as QrCodeIcon,
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
} from 'recharts';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

const Wallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(124580);
  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);

  // Stats
  const stats = {
    totalIncome: 142500,
    totalExpenses: 84210,
    savings: 58289,
    monthlySpending: 12450,
  };

  const spendingData = [
    { name: 'Jan', amount: 3200 },
    { name: 'Feb', amount: 2800 },
    { name: 'Mar', amount: 3500 },
    { name: 'Apr', amount: 3000 },
    { name: 'May', amount: 3100 },
    { name: 'Jun', amount: 3400 },
  ];

  const categoryData = [
    { name: 'Shopping', value: 35, color: '#FF6B6B' },
    { name: 'Food', value: 25, color: '#4ECDC4' },
    { name: 'Transport', value: 20, color: '#45B7D1' },
    { name: 'Bills', value: 15, color: '#96CEB4' },
    { name: 'Others', value: 5, color: '#FFEAA7' },
  ];

  const sampleCards = [
    {
      id: 1,
      type: 'Mastercard',
      last4: '8829',
      expiry: '12/27',
      color: 'from-[#0B7A43] to-[#14B86A]',
      brand: '💳',
      status: 'active',
    },
    {
      id: 2,
      type: 'Visa',
      last4: '4451',
      expiry: '08/28',
      color: 'from-blue-500 to-purple-500',
      brand: '💳',
      status: 'active',
    },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Kaldi\'s Coffee', amount: -180, date: 'Today, 10:45 AM', status: 'Completed' },
    { id: 2, merchant: 'Salary Deposit', amount: 45000, date: 'Today, 09:00 AM', status: 'Completed' },
    { id: 3, merchant: 'Ethio Telecom', amount: -850, date: 'Yesterday', status: 'Pending' },
    { id: 4, merchant: 'Shoa Supermarket', amount: -1200, date: '2 days ago', status: 'Completed' },
  ];

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const balanceRes = await transactionService.balance();
      setBalance(balanceRes.data.balance);
      setCards(sampleCards);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Wallet</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your funds and cards</p>
            </div>

            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0B7A43] via-[#14B86A] to-[#0B7A43] rounded-2xl p-6 text-white mb-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <WalletIcon className="w-5 h-5 text-white/80" />
                    <span className="text-sm text-white/80">Total Balance</span>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4 text-white/80" />
                    ) : (
                      <Eye className="w-4 h-4 text-white/80" />
                    )}
                  </button>
                </div>

                <p className="text-4xl font-bold">
                  {showBalance ? `${formatCurrency(balance)} ETB` : '••••••••'}
                </p>
                <p className="text-sm text-white/60 mt-1">Available balance</p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition backdrop-blur-sm">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition backdrop-blur-sm">
                    <Download className="w-4 h-4" />
                    Receive
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition backdrop-blur-sm">
                    <Plus className="w-4 h-4" />
                    Add Funds
                  </button>
                </div>
              </div>
            </motion.div>

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
                icon={WalletIcon}
                label="Net Savings"
                value={`ETB ${stats.savings.toLocaleString()}`}
                change="+8.2%"
                positive={true}
                color="blue"
                darkMode={darkMode}
              />
              <StatCard
                icon={Calendar}
                label="Monthly Spending"
                value={`ETB ${stats.monthlySpending.toLocaleString()}`}
                change="+2.5%"
                positive={false}
                color="yellow"
                darkMode={darkMode}
              />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Cards & Quick Actions */}
              <div className="lg:col-span-1 space-y-4">
                {/* Cards */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Your Cards</h3>
                    <button className="text-sm text-[#0B7A43] font-medium hover:underline flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Add Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sampleCards.map((card) => (
                      <div
                        key={card.id}
                        className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-r ${card.color} text-white`}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{card.type}</span>
                            <span className="text-2xl">{card.brand}</span>
                          </div>
                          <p className="text-lg font-mono tracking-wider mt-2">•••• •••• •••• {card.last4}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <p className="text-[10px] text-white/60">Expiry</p>
                              <p className="text-sm font-medium">{card.expiry}</p>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/30 text-green-200">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 rounded-xl bg-[#0B7A43]/10 dark:bg-[#0B7A43]/20 text-[#0B7A43] dark:text-[#14B86A] hover:bg-[#0B7A43]/20 transition text-sm font-medium">
                      Add Money
                    </button>
                    <button className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition text-sm font-medium">
                      Request
                    </button>
                    <button className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 transition text-sm font-medium">
                      QR Code
                    </button>
                    <button className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 transition text-sm font-medium">
                      Statement
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Transactions & Analytics */}
              <div className="lg:col-span-2 space-y-4">
                {/* Recent Transactions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
                    <button className="text-sm text-[#0B7A43] hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                            {tx.amount > 0 ? (
                              <ArrowDownLeft className="w-4 h-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{tx.merchant}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)} ETB
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            tx.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Monthly Spending</h4>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendingData}>
                          <defs>
                            <linearGradient id="spendingGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0B7A43" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#0B7A43" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 10 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 10 }} />
                          <Tooltip />
                          <Area type="monotone" dataKey="amount" stroke="#0B7A43" strokeWidth={2} fill="url(#spendingGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Spending by Category</h4>
                    <div className="h-40 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={50}
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

export default Wallet;