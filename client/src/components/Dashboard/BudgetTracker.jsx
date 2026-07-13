import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const BudgetTracker = ({ categoryData }) => {
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-white">{payload[0].name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{payload[0].value}%</p>
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
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">Budget Tracker</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">Monthly</span>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-24 h-24 flex-shrink-0">
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
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {Math.round(percentage)}%
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">Used</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Spent</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              ETB {spent.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600 dark:text-gray-400">Remaining</span>
            <span className="font-semibold text-[#0E7A4B]">
              ETB {remaining.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
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
      <div className="space-y-2">
        {data.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }} />
            <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">{category.name}</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{category.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetTracker;