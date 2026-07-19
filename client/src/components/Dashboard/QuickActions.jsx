// client/src/components/dashboard/QuickActions.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Download, 
  QrCode, 
  FileText, 
  Phone, 
  Coins,
  ArrowRight
} from 'lucide-react';

const QuickActions = ({ darkMode, isMobile }) => {
  const actions = [
    { icon: Send, label: 'Send Money', path: '/send', color: 'from-[#0E7A4B] to-[#14B86A]' },
    { icon: Download, label: 'Receive', path: '/receive', color: 'from-blue-500 to-cyan-500' },
    { icon: QrCode, label: 'QR Pay', path: '/qr', color: 'from-purple-500 to-pink-500' },
    { icon: FileText, label: 'Pay Bills', path: '/bills', color: 'from-orange-500 to-red-500' },
    { icon: Phone, label: 'Recharge', path: '/recharge', color: 'from-yellow-500 to-amber-500' },
    { icon: Coins, label: 'Request', path: '/request', color: 'from-green-500 to-teal-500' },
  ];

  // On mobile, show fewer actions or smaller size
  const displayActions = isMobile ? actions.slice(0, 4) : actions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 mb-4 sm:mb-6`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">Quick Actions</h3>
        <button className="text-xs sm:text-sm text-[#0E7A4B] hover:underline flex items-center gap-1">
          View All
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className={`grid gap-2 sm:gap-3 ${isMobile ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-6'}`}>
        {displayActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              to={action.path}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </div>
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-gray-600 dark:text-gray-300 text-center leading-tight`}>
                {isMobile ? action.label.split(' ').slice(0, 2).join(' ') : action.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;