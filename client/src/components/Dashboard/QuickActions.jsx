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

const QuickActions = () => {
  const actions = [
    { icon: Send, label: 'Send Money', path: '/send', color: 'from-[#0E7A4B] to-[#14B86A]' },
    { icon: Download, label: 'Receive', path: '/receive', color: 'from-blue-500 to-cyan-500' },
    { icon: QrCode, label: 'QR Pay', path: '/qr', color: 'from-purple-500 to-pink-500' },
    { icon: FileText, label: 'Pay Bills', path: '/bills', color: 'from-orange-500 to-red-500' },
    { icon: Phone, label: 'Mobile Recharge', path: '/recharge', color: 'from-yellow-500 to-amber-500' },
    { icon: Coins, label: 'Request Money', path: '/request', color: 'from-green-500 to-teal-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Quick Actions</h3>
        <button className="text-sm text-[#0E7A4B] hover:underline flex items-center gap-1">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              to={action.path}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-600 text-center leading-tight">
                {action.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;