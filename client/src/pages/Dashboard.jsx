// client/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  HelpCircle,
  CreditCard,
  Send,
  QrCode,
  FileText,
  Phone,
  Coins,
  BarChart3,
  PieChart,
  Home,
  Gift,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import toast from 'react-hot-toast';

// Import components
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';
import BalanceCard from '../components/dashboard/BalanceCard';
import QuickActions from '../components/dashboard/QuickActions';
import Analytics from '../components/dashboard/Analytics';
import Insights from '../components/dashboard/Insights';
import Transactions from '../components/dashboard/Transactions';
import BudgetTracker from '../components/dashboard/BudgetTracker';
import PaymentCards from '../components/dashboard/PaymentCards';
import Notifications from '../components/dashboard/Notifications';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(124580);
  const [transactions, setTransactions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    income: 142500,
    expenses: 84210.50,
    savings: 58289.50,
    totalTransactions: 124
  });

  // Sample data
  const spendingData = [
    { name: 'Jan', income: 120000, expenses: 78000 },
    { name: 'Feb', income: 132000, expenses: 82000 },
    { name: 'Mar', income: 110000, expenses: 65000 },
    { name: 'Apr', income: 145000, expenses: 88000 },
    { name: 'May', income: 138000, expenses: 79000 },
    { name: 'Jun', income: 142500, expenses: 84210 },
  ];

  const categoryData = [
    { name: 'Food', value: 35, color: '#FF6B6B' },
    { name: 'Transport', value: 20, color: '#4ECDC4' },
    { name: 'Shopping', value: 25, color: '#45B7D1' },
    { name: 'Bills', value: 15, color: '#96CEB4' },
    { name: 'Others', value: 5, color: '#FFEAA7' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch real data from API
      const balanceRes = await transactionService.balance();
      const historyRes = await transactionService.history({ limit: 10 });
      setBalance(balanceRes.data.balance);
      setTransactions(historyRes.data.transactions || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      // Use fallback data
      setTransactions([
        {
          id: 1,
          merchant: 'Addis Supermarket',
          category: 'Shopping',
          amount: -1200,
          date: '2024-01-15T10:45:00',
          status: 'completed'
        },
        {
          id: 2,
          merchant: 'Salary Deposit',
          category: 'Income',
          amount: 45000,
          date: '2024-01-14T09:00:00',
          status: 'completed'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] ${darkMode ? 'dark' : ''}`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}>
          {/* Top Nav */}
          <TopNav 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Dashboard Content */}
          <main className="p-4 md:p-6 lg:p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome back, {user?.fullName?.split(' ')[0] || 'User'} 👋
              </h1>
              <p className="text-gray-500">Here's what's happening with your money</p>
            </motion.div>

            {/* Balance Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <div className="lg:col-span-2">
                <BalanceCard balance={balance} stats={stats} />
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <StatCard
                  icon={TrendingUp}
                  label="Total Income"
                  value={`ETB ${stats.income.toLocaleString()}`}
                  change="+12.4%"
                  positive={true}
                  color="green"
                />
                <StatCard
                  icon={TrendingDown}
                  label="Total Expenses"
                  value={`ETB ${stats.expenses.toLocaleString()}`}
                  change="+5.1%"
                  positive={false}
                  color="red"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2">
                <Analytics spendingData={spendingData} />
              </div>
              <div className="lg:col-span-1">
                <Insights />
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Transactions transactions={transactions} />
              </div>
              <div className="lg:col-span-1 space-y-4">
                <BudgetTracker categoryData={categoryData} />
                <PaymentCards />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, change, positive, color }) => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{value}</p>
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

export default Dashboard;