import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const BudgetTracker = ({ categoryData, darkMode, isMobile }) => {
  const totalBudget = 50000;
  const spent = 32450;
  const remaining = totalBudget - spent;
  const percentage = (spent / totalBudget) * 100;

  const data = categoryData || [
    { name: 'Food', value: 35, color: '#FF6B6B' },
    { name: 'Transport', value: 20, color: '#4ECDC4' },
    { name: 'Shopping', value: 25, color: '#45B7D1' },
    { name: 'Bills', value: 15, color: '#96CEB4' },
    { name: 'Others', value: 5, color: '#FFEAA7' },
  ];

  // Responsive circle size
  const circleSize = isMobile ? 20 : 24;
  const fontSize = isMobile ? 'text-base' : 'text-xl';
  const labelSize = isMobile ? 'text-[8px]' : 'text-[10px]';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`rounded-xl p-2 sm:p-3 shadow-lg border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {payload[0].name}
          </p>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800 dark:text-white`}>
          Budget Tracker
        </h3>
        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
          Monthly
        </span>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className={`relative ${isMobile ? 'w-20 h-20' : 'w-24 h-24'} flex-shrink-0`}>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
              className="dark:stroke-gray-700"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#0E7A4B"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 2.51} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 dark:text-white`}>
              {Math.round(percentage)}%
            </span>
            <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-gray-500 dark:text-gray-400`}>
              Used
            </span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">Spent</span>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-800 dark:text-white`}>
              ETB {spent.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm mt-0.5 sm:mt-1">
            <span className="text-gray-600 dark:text-gray-400">Remaining</span>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-[#0E7A4B]`}>
              ETB {remaining.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5 sm:mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${
                percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-[#0E7A4B]'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-1.5 sm:space-y-2">
        {data.map((category, index) => (
          <div key={index} className="flex items-center gap-1.5 sm:gap-2">
            <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full flex-shrink-0`} style={{ backgroundColor: category.color }} />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400 flex-1`}>
              {category.name}
            </span>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-800 dark:text-white`}>
              {category.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetTracker;