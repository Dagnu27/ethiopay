import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { billService } from '../services/api';
import {
  FileText,
  Search,
  Plus,
  Bell,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Shield,
  Gift,
  Sparkles,
  X,
  Loader,
  MoreHorizontal,
  Zap,
  Droplets,
  Wifi,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

const Bills = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const sampleBills = [
    { id: 1, provider: 'Ethio Electric (EEP)', account: '88203-11', amount: 1420.50, dueDate: '2024-10-12', status: 'Due Today' },
    { id: 2, provider: 'Ethio Telecom', account: '0911002233', amount: 850.00, dueDate: '2024-10-28', status: 'Due This Week' },
    { id: 3, provider: 'Water Authority', account: 'WA-456-789', amount: 450.00, dueDate: '2024-10-05', status: 'Overdue' },
    { id: 4, provider: 'Addis Academy', account: 'SA-202-01', amount: 12500.00, dueDate: '2024-10-15', status: 'Due Tomorrow' },
    { id: 5, provider: 'Safaricom Ethiopia', account: '0700112233', amount: 350.00, dueDate: '2024-10-20', status: 'Due This Week' },
  ];

  const chartData = [
    { month: 'Jan', amount: 3200 },
    { month: 'Feb', amount: 2800 },
    { month: 'Mar', amount: 3500 },
    { month: 'Apr', amount: 3000 },
    { month: 'May', amount: 3100 },
    { month: 'Jun', amount: 3400 },
  ];

  const stats = {
    totalOutstanding: 12450,
    paidThisMonth: 8450,
    upcoming: 3200,
    monthlySpending: 8450,
    autoPayActive: 3,
    savings: 450,
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await billService.getAll();
      setBills(response.data.bills || sampleBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setBills(sampleBills);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setShowPayModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedBill) return;

    setProcessing(true);
    try {
      // Actual API call
      const response = await billService.pay(selectedBill.id);
      setPaymentSuccess(true);
      toast.success('✅ Bill paid successfully!');
      
      // Refresh bills
      await fetchBills();
      
      setTimeout(() => {
        setShowPayModal(false);
        setPaymentSuccess(false);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to pay bill');
    } finally {
      setProcessing(false);
    }
  };

  const filteredBills = bills.filter(bill =>
    bill.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProviderIcon = (provider) => {
    if (provider.includes('Electric')) return <Zap className="w-5 h-5" />;
    if (provider.includes('Telecom') || provider.includes('Safaricom')) return <Wifi className="w-5 h-5" />;
    if (provider.includes('Water')) return <Droplets className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Due Today': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'Due Tomorrow': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Due This Week': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400';
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Bill Payments Center</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage, track, and pay all your bills in one place.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <StatCard 
                icon={AlertCircle} 
                label="Outstanding" 
                value={`ETB ${stats.totalOutstanding.toLocaleString()}`} 
                subtitle="Total due" 
                color="red" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={CheckCircle} 
                label="Paid This Month" 
                value={`ETB ${stats.paidThisMonth.toLocaleString()}`} 
                change="+8%" 
                positive={true} 
                color="green" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Calendar} 
                label="Upcoming" 
                value={`ETB ${stats.upcoming.toLocaleString()}`} 
                subtitle="This week" 
                color="blue" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={TrendingUp} 
                label="Monthly Spending" 
                value={`ETB ${stats.monthlySpending.toLocaleString()}`} 
                change="+5%" 
                positive={true} 
                color="purple" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Shield} 
                label="AutoPay Active" 
                value={stats.autoPayActive} 
                subtitle="3 bills" 
                color="green" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Gift} 
                label="Savings" 
                value={`ETB ${stats.savings.toLocaleString()}`} 
                change="-2%" 
                positive={false} 
                color="yellow" 
                darkMode={darkMode}
              />
            </div>

            {/* Search */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search bills..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </button>
              <button 
                onClick={fetchBills}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <RefreshCw className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </button>
            </div>

            {/* Bill Cards Grid */}
            {loading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading bills...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {filteredBills.length > 0 ? (
                  filteredBills.map((bill) => (
                    <BillCard 
                      key={bill.id} 
                      bill={bill} 
                      onPay={handlePayBill}
                      darkMode={darkMode}
                      getProviderIcon={getProviderIcon}
                      getStatusColor={getStatusColor}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p>No bills found</p>
                  </div>
                )}
              </div>
            )}

            {/* Chart Section */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Monthly Bill Spending</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B7A43" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0B7A43" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#0B7A43" strokeWidth={2} fill="url(#billGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#0B7A43] dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Electricity Bill</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Increased by 12% compared to last month.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Savings Opportunity</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Save 450 ETB annually by enabling AutoPay.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Stable Spending</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Internet bills stable for the last 6 months.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl`}
            >
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Successful!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Your bill has been paid.</p>
                  <button
                    onClick={() => {
                      setShowPayModal(false);
                      setPaymentSuccess(false);
                    }}
                    className="mt-6 px-6 py-3 bg-[#0B7A43] text-white rounded-xl font-medium hover:bg-[#096336] transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Payment</h3>
                    <button onClick={() => setShowPayModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  {selectedBill && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Provider</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{selectedBill.provider}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="text-2xl font-bold text-[#0B7A43] dark:text-[#14B86A]">{selectedBill.amount} ETB</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Account</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedBill.account}</p>
                      </div>
                      <button
                        onClick={handleConfirmPayment}
                        disabled={processing}
                        className="w-full bg-[#0B7A43] text-white py-3.5 rounded-xl font-semibold hover:bg-[#096336] transition disabled:opacity-50"
                      >
                        {processing ? (
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

// ============ BILL CARD COMPONENT ============
const BillCard = ({ bill, onPay, darkMode, getProviderIcon, getStatusColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0B7A43]/10 dark:bg-[#0B7A43]/20 flex items-center justify-center text-[#0B7A43] dark:text-[#14B86A]">
            {getProviderIcon(bill.provider)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{bill.provider}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account: {bill.account}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
          {bill.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
          <p className="text-sm font-medium text-gray-800 dark:text-white">{bill.dueDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">{bill.amount} ETB</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onPay(bill)}
          className="flex-1 bg-[#0B7A43] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#096336] transition"
        >
          Pay Now
        </button>
        <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default Bills;