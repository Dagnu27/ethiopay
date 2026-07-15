import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { qrService } from '../services/api';
import {
  QrCode,
  TrendingUp,
  Calendar,
  Shield,
  DollarSign,
  Building2,
  Camera,
  Scan,
  Coffee,
  Gift,
  Sparkles,
  Star,
  Plus,
  Bell,
  Smartphone,
  Download,
  Share2,
  Copy,
  Printer,
  CheckCircle,
  X,
  Loader,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

// ============ QR CARD ============
const QrCard = ({ user, darkMode }) => {
  const [qrValue] = useState('EP-123456789');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden bg-gradient-to-br from-[#0B7A43] via-[#14B86A] to-[#0B7A43] rounded-2xl p-6 text-white`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-semibold">{user?.fullName || 'User'}</p>
              <p className="text-sm text-white/80">Wallet ID: {qrValue}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-green-500/30 text-green-200 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </span>
        </div>

        <div className="flex justify-center my-6">
          <div className="bg-white p-4 rounded-2xl shadow-2xl">
            <QrCode className="w-48 h-48 text-[#0B7A43]" />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm">
            <Copy className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm">
            <Printer className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/80">
            Scan to pay <span className="font-medium">{user?.fullName || 'User'}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ============ SCAN SECTION ============
const ScanSection = ({ darkMode }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        merchant: 'Ethio Telecom',
        amount: 350,
        status: 'pending',
      });
      toast.success('QR scanned! Please confirm payment.');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}
    >
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scan to Pay</h3>
      
      {isScanning ? (
        <div className="relative aspect-square max-w-xs mx-auto">
          <div className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-sm">Scanning QR code...</p>
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-[#0B7A43] rounded-2xl animate-pulse" />
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#0B7A43] rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#0B7A43] rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#0B7A43] rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#0B7A43] rounded-br-2xl" />
        </div>
      ) : scanResult ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-white">QR Scanned!</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{scanResult.merchant}</p>
          <p className="text-2xl font-bold text-[#0B7A43] dark:text-[#14B86A] mt-2">{scanResult.amount} ETB</p>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-[#0B7A43] text-white py-2.5 rounded-xl font-medium hover:bg-[#096336] transition">
              Pay Now
            </button>
            <button 
              onClick={() => setScanResult(null)}
              className="flex-1 border border-gray-200 dark:border-gray-700 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-12 h-12 text-gray-300 dark:text-gray-500" />
          </div>
          <button
            onClick={handleScan}
            className="bg-[#0B7A43] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#096336] transition inline-flex items-center gap-2"
          >
            <Scan className="w-5 h-5" />
            Start Scanning
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Allow camera access to scan QR codes</p>
        </div>
      )}
    </motion.div>
  );
};

// ============ MERCHANT CARD ============
const MerchantCard = ({ merchant, darkMode }) => {
  const getIcon = (category) => {
    const icons = {
      'Coffee': Coffee,
      'Restaurant': '🍽️',
      'Supermarket': '🛒',
      'Fuel': '⛽',
      'Transport': '🚌',
      'Hotel': '🏨',
      'Entertainment': '🎟️',
      'Telecom': Smartphone,
    };
    const Icon = icons[category] || Building2;
    return typeof Icon === 'string' ? (
      <span className="text-xl">{Icon}</span>
    ) : (
      <Icon className="w-5 h-5" />
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#0B7A43]/10 dark:bg-[#0B7A43]/20 flex items-center justify-center text-[#0B7A43] dark:text-[#14B86A]">
          {getIcon(merchant.category)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800 dark:text-white">{merchant.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{merchant.category}</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Star className="w-4 h-4 text-gray-300 hover:text-yellow-400 transition" />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Last payment</span>
        <span className="font-medium text-gray-800 dark:text-white">{merchant.lastAmount} ETB</span>
      </div>
    </motion.div>
  );
};

// ============ MAIN QR PAY PAGE ============
const QRPay = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const stats = {
    totalPayments: 124,
    revenue: 12450,
    today: 8,
    merchants: 34,
    successRate: 98.5,
    avgValue: 450,
  };

  const merchants = [
    { id: 1, name: 'Ethiopian Airlines', category: 'Transport', lastAmount: 2500 },
    { id: 2, name: 'Ethio Telecom', category: 'Telecom', lastAmount: 350 },
    { id: 3, name: "Kaldi's Coffee", category: 'Coffee', lastAmount: 180 },
    { id: 4, name: 'Shoa Supermarket', category: 'Supermarket', lastAmount: 850 },
  ];

  const recentTransactions = [
    { id: 1, merchant: "Kaldi's Coffee", amount: 180, date: 'Today, 10:45 AM', status: 'Completed' },
    { id: 2, merchant: 'Ethio Telecom', amount: 350, date: 'Today, 09:15 AM', status: 'Completed' },
    { id: 3, merchant: 'Shoa Supermarket', amount: 850, date: 'Yesterday', status: 'Pending' },
  ];

  useEffect(() => {
    fetchQRData();
  }, []);

  const fetchQRData = async () => {
    try {
      // In a real app, fetch QR data from API
      setLoading(false);
    } catch (error) {
      console.error('Error fetching QR data:', error);
      setLoading(false);
    }
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">QR Payments</h1>
              <p className="text-gray-500 dark:text-gray-400">Pay, receive, and manage QR transactions instantly.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <StatCard 
                icon={QrCode} 
                label="Total Payments" 
                value={stats.totalPayments} 
                subtitle="All time" 
                color="green" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={TrendingUp} 
                label="Revenue" 
                value={`ETB ${stats.revenue.toLocaleString()}`} 
                change="+12%" 
                positive={true} 
                color="blue" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Calendar} 
                label="Today" 
                value={stats.today} 
                subtitle="Transactions" 
                color="purple" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Building2} 
                label="Merchants" 
                value={stats.merchants} 
                subtitle="Active" 
                color="yellow" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={Shield} 
                label="Success Rate" 
                value={`${stats.successRate}%`} 
                subtitle="Secure" 
                color="green" 
                darkMode={darkMode}
              />
              <StatCard 
                icon={DollarSign} 
                label="Avg Value" 
                value={`ETB ${stats.avgValue}`} 
                subtitle="Per payment" 
                color="blue" 
                darkMode={darkMode}
              />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - QR Code */}
              <div className="lg:col-span-1">
                <QrCard user={user} darkMode={darkMode} />
              </div>

              {/* Right Column - Scanner & Quick Pay */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ScanSection darkMode={darkMode} />
                  
                  {/* Quick Pay */}
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Pay</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="EthioPay ID or Phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white dark:placeholder-gray-400"
                      />
                      <input
                        type="number"
                        placeholder="Amount (ETB)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white dark:placeholder-gray-400"
                      />
                      <button className="w-full bg-[#0B7A43] text-white py-3 rounded-xl font-medium hover:bg-[#096336] transition">
                        Pay Securely
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700`}>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Recent QR Payments</h3>
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0B7A43]/10 dark:bg-[#0B7A43]/20 flex items-center justify-center text-[#0B7A43] dark:text-[#14B86A]">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{tx.merchant}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800 dark:text-white">{tx.amount} ETB</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            tx.status === 'Completed' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Merchants Grid */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Merchants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {merchants.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} darkMode={darkMode} />
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#0B7A43] dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">QR Usage</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">You made 23 QR payments this month.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Spending Insight</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Coffee is 18% of your QR spending.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Savings</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Saved 125 ETB using QR merchant discounts.</p>
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

export default QRPay;