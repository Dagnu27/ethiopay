// client/src/components/dashboard/BalanceCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, CreditCard, Sparkles } from 'lucide-react';
import { useState } from 'react';

const BalanceCard = ({ balance, stats }) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#0E7A4B] via-[#14B86A] to-[#0E7A4B] rounded-2xl p-6 text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      {/* Floating Sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          className={`absolute ${i === 0 ? 'top-8 right-12' : i === 1 ? 'bottom-16 right-20' : 'top-20 right-32'}`}
        >
          <Sparkles className={`w-4 h-4 text-white/30 ${i === 1 ? 'w-3 h-3' : i === 2 ? 'w-5 h-5' : ''}`} />
        </motion.div>
      ))}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-white/80" />
            <span className="text-sm text-white/80">Total Balance</span>
          </div>
          <div className="flex items-center gap-3">
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
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
              Premium
            </span>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-4xl font-bold">
            {showBalance ? `ETB ${formatCurrency(balance)}` : '••••••••'}
          </p>
          <p className="text-sm text-white/60 mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/send"
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <ArrowUpRight className="w-4 h-4" />
            Send
          </Link>
          <Link
            to="/receive"
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Receive
          </Link>
        </div>

        {/* Linked Account */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-white/60" />
            <span className="text-xs text-white/60">CBE - 8829</span>
          </div>
          <span className="text-xs bg-green-500/30 px-2 py-0.5 rounded-full text-green-200">
            Active
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;