import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon,
  ArrowRightIcon,
  BanknotesIcon,
  QrCodeIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  BellIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [dailySpending, setDailySpending] = useState(2450.50);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [balanceRes, transactionsRes] = await Promise.all([
        transactionService.balance(),
        transactionService.history({ limit: 4 }),
      ]);
      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data.transactions || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6128ff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6128ff] to-[#8a57ea] bg-clip-text text-transparent">
                EthioPay
              </span>
              <span className="text-sm text-gray-400 hidden sm:inline">Secure Digital Banking</span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Premium Badge */}
              <span className="hidden sm:inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                <UserIcon className="w-3 h-3" />
                Premium User
              </span>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <BellIcon className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Logout
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#6128ff] to-[#8a57ea] flex items-center justify-center text-white font-semibold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.fullName?.split(' ')[0] || 'User'}
          </h1>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#6128ff] to-[#8a57ea] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <p className="text-sm text-white/80 mb-1">Total Available Balance</p>
            <p className="text-4xl font-bold">
              {formatCurrency(balance)} ETB
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                +4 this month
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
                <CreditCardIcon className="w-4 h-4" />
                <span>Commercial Bank of Ethiopia - 8829</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Spending */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Daily Spending</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(dailySpending)} ETB</p>
            <p className="text-sm text-red-500">12% higher than yesterday</p>
            <div className="mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Daily Limit: 5,000 ETB</span>
                <span className="text-gray-700 font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-[#6128ff] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Income vs Expense Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Income vs Expense</p>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">Last 6 Months ▼</span>
            </div>
            <div className="mt-4 flex items-center justify-center h-24 bg-gray-50 rounded-lg">
              <div className="flex items-end gap-3 h-16">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#34a853] rounded-t" style={{ height: '20px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#34a853] rounded-t" style={{ height: '32px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">Jun</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#ea4335] rounded-t" style={{ height: '24px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">Jul</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#ea4335] rounded-t" style={{ height: '40px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">Aug</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#34a853] rounded-t" style={{ height: '48px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">Sep</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-[#34a853] rounded-t" style={{ height: '56px' }}></div>
                  <span className="text-xs text-gray-400 mt-1">Oct</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: BanknotesIcon, label: 'Send Money', path: '/send', color: 'bg-[#6128ff]' },
            { icon: QrCodeIcon, label: 'QR Pay', path: '/qr', color: 'bg-[#34a853]' },
            { icon: DocumentTextIcon, label: 'Bills', path: '/bills', color: 'bg-[#ea4335]' },
            { icon: ArrowPathIcon, label: 'Withdraw', path: '/withdrawals', color: 'bg-[#fbbc04]' },
          ].map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg hover:border-[#6128ff]/20 transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${action.color} p-3 rounded-xl text-white mb-2 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
            <Link
              to="/transactions"
              className="text-sm text-[#6128ff] hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === 'send' ? 'bg-red-50' : 'bg-green-50'}`}>
                      {tx.type === 'send' ? (
                        <ArrowUpIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {tx.description || tx.type || 'Transaction'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.type === 'send' ? 'text-red-500' : 'text-green-500'}`}>
                      {tx.type === 'send' ? '-' : '+'}
                      {formatCurrency(tx.amount)} ETB
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No transactions yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
          <p>© 2024 EthioPay. Secured by National Bank of Ethiopia standards.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;