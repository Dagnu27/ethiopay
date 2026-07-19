import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Briefcase,
  Gift
} from 'lucide-react';

const Transactions = ({ transactions, darkMode, isMobile }) => {
  const [filter, setFilter] = useState('all');

  const getCategoryIcon = (category) => {
    const icons = {
      'Shopping': ShoppingBag,
      'Food': Coffee,
      'Housing': Home,
      'Transport': Car,
      'Income': Briefcase,
      'Gift': Gift,
    };
    const Icon = icons[category] || ShoppingBag;
    return <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'failed':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-700/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
        return <CheckCircle className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
      case 'pending':
        return <Clock className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
      case 'failed':
        return <XCircle className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
      default:
        return <Clock className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />;
    }
  };

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  const filteredTransactions = transactions?.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'income') return tx.amount > 0;
    if (filter === 'expense') return tx.amount < 0;
    return true;
  }) || [];

  // Show fewer items on mobile
  const displayTransactions = isMobile ? filteredTransactions.slice(0, 5) : filteredTransactions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="p-3 sm:p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800 dark:text-white`}>
            Recent Transactions
          </h3>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
              {['all', 'income', 'expense'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium rounded-lg transition ${
                    filter === type
                      ? 'bg-white dark:bg-gray-600 text-[#0E7A4B] shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <button className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <Filter className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-400`} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 md:max-h-96 overflow-y-auto">
        {displayTransactions.length > 0 ? (
          displayTransactions.map((tx, index) => (
            <motion.div
              key={tx.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer group"
            >
              {/* Icon */}
              <div className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 ${
                tx.amount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                {tx.amount > 0 ? (
                  <ArrowDownLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-green-500`} />
                ) : (
                  <ArrowUpRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-red-500`} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-800 dark:text-white truncate`}>
                    {tx.merchant || tx.description || 'Transaction'}
                  </p>
                  <span className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full ${getStatusColor(tx.status)} flex items-center gap-0.5`}>
                    {getStatusIcon(tx.status)}
                    <span className="hidden sm:inline">{tx.status}</span>
                  </span>
                </div>
                <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-500 dark:text-gray-400 truncate`}>
                  {tx.category || 'General'} • {new Date(tx.date || tx.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold ${
                  tx.amount > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))} ETB
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-6 sm:p-8 text-center text-gray-500 dark:text-gray-400">
            <p className={`${isMobile ? 'text-sm' : 'text-base'}`}>No transactions found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-700 text-center">
        <Link
          to="/transactions"
          className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#0E7A4B] hover:underline flex items-center justify-center gap-1`}
        >
          View All Transactions
          <ArrowUpRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Transactions;