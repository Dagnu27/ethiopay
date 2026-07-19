import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import { 
  TrendingUp, 
  TrendingDown,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import BalanceCard from '../components/dashboard/BalanceCard';
import QuickActions from '../components/dashboard/QuickActions';
import Analytics from '../components/dashboard/Analytics';
import Insights from '../components/dashboard/Insights';
import Transactions from '../components/dashboard/Transactions';
import BudgetTracker from '../components/dashboard/BudgetTracker';
import PaymentCards from '../components/dashboard/PaymentCards';
import StatCard from '../components/StatCard';

// Import sample data
import { spendingData, categoryData } from '../data/dashboardData';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(124580);
  const [transactions, setTransactions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    income: 142500,
    expenses: 84210.50,
    savings: 58289.50,
    totalTransactions: 124
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [window.location?.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const balanceRes = await transactionService.balance();
      const historyRes = await transactionService.history({ limit: 10 });
      setBalance(balanceRes.data.balance);
      setTransactions(historyRes.data.transactions || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setTransactions([
        {
          id: 1,
          merchant: 'Addis Supermarket',
          category: 'Shopping',
          amount: -1200,
          date: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: 2,
          merchant: 'Salary Deposit',
          category: 'Income',
          amount: 45000,
          date: new Date().toISOString(),
          status: 'completed'
        }
      ]);
    } finally {
      setLoading(false);
    }
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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          !isMobile && sidebarOpen ? 'lg:ml-64' : ''
        } ${!isMobile && !sidebarOpen ? 'lg:ml-20' : ''}`}>
          
          <TopNav 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isMobile={isMobile}
          />

          <main className="p-3 sm:p-4 md:p-6 lg:p-8 pt-20 lg:pt-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-6"
            >
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                Welcome back, {user?.fullName?.split(' ')[0] || 'User'} 👋
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Here's what's happening with your money
              </p>
            </motion.div>

            {/* Balance Cards - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="lg:col-span-2">
                <BalanceCard balance={balance} stats={stats} darkMode={darkMode} isMobile={isMobile} />
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
                <StatCard
                  icon={TrendingUp}
                  label="Total Income"
                  value={`ETB ${stats.income.toLocaleString()}`}
                  change="+12.4%"
                  positive={true}
                  color="green"
                  darkMode={darkMode}
                  isMobile={isMobile}
                />
                <StatCard
                  icon={TrendingDown}
                  label="Total Expenses"
                  value={`ETB ${stats.expenses.toLocaleString()}`}
                  change="+5.1%"
                  positive={false}
                  color="red"
                  darkMode={darkMode}
                  isMobile={isMobile}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-4 md:mb-6">
              <QuickActions darkMode={darkMode} isMobile={isMobile} />
            </div>

            {/* Charts - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="lg:col-span-2">
                <Analytics spendingData={spendingData} darkMode={darkMode} isMobile={isMobile} />
              </div>
              <div className="lg:col-span-1">
                <Insights darkMode={darkMode} isMobile={isMobile} />
              </div>
            </div>

            {/* Bottom Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
              <div className="lg:col-span-2">
                <Transactions transactions={transactions} darkMode={darkMode} isMobile={isMobile} />
              </div>
              <div className="lg:col-span-1 space-y-3 md:space-y-4">
                <BudgetTracker categoryData={categoryData} darkMode={darkMode} isMobile={isMobile} />
                <PaymentCards darkMode={darkMode} isMobile={isMobile} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;