import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Plus, MoreHorizontal, Eye, EyeOff, Lock, Unlock } from 'lucide-react';

const PaymentCards = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [frozen, setFrozen] = useState(false);

  const cards = [
    {
      id: 1,
      type: 'Mastercard',
      last4: '8829',
      expiry: '12/27',
      color: 'from-[#0E7A4B] to-[#14B86A]',
      brand: '💳'
    },
    {
      id: 2,
      type: 'Visa',
      last4: '4451',
      expiry: '08/28',
      color: 'from-blue-500 to-purple-500',
      brand: '💳'
    },
  ];

  const formatCardNumber = (last4) => {
    if (showCardNumber) {
      return `**** **** **** ${last4}`;
    }
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#0E7A4B]" />
          <h3 className="font-semibold text-gray-800 dark:text-white">Your Cards</h3>
        </div>
        <button className="text-sm text-[#0E7A4B] font-medium hover:underline flex items-center gap-1">
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-r ${card.color} text-white`}
          >
            {/* Card Background Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{card.type}</span>
                <span className="text-2xl">{card.brand}</span>
              </div>

              <div className="mt-3">
                <p className="text-lg font-mono tracking-wider">{formatCardNumber(card.last4)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-[10px] text-white/60">Expiry</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                      {showCardNumber ? (
                        <EyeOff className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                    <button
                      onClick={() => setFrozen(!frozen)}
                      className={`p-1.5 rounded-lg transition ${
                        frozen ? 'bg-yellow-500/30 text-yellow-300' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {frozen ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                    <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">
                      <MoreHorizontal className="w-3.5 h-3.5 text-white/80" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentCards;