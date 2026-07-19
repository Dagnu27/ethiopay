// client/src/components/dashboard/Analytics.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const Analytics = ({ spendingData, darkMode, isMobile }) => {
  const [timeframe, setTimeframe] = useState('6M');
  const [chartType, setChartType] = useState('area');

  const timeframes = ['1W', '1M', '3M', '6M', '1Y'];

  // Responsive chart height
  const chartHeight = isMobile ? 200 : 280;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`rounded-xl p-3 sm:p-4 shadow-lg border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {label}
          </p>
          <div className="space-y-1 mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-green-500">
              Income: ETB {payload[0]?.value?.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-red-500">
              Expenses: ETB {payload[1]?.value?.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Responsive tick font size
  const tickFontSize = isMobile ? 10 : 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800 dark:text-white`}>
            Income vs Expenses
          </h3>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400`}>
            Monthly overview
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium rounded-lg transition ${
                  timeframe === tf
                    ? 'bg-white dark:bg-gray-600 text-[#0E7A4B] shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <Calendar className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-gray-400`} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className={`h-48 sm:h-56 md:h-72`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendingData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: tickFontSize }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: tickFontSize }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#incomeGradient)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 sm:gap-6 mt-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#22C55E]" />
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-600 dark:text-gray-400`}>
            Income
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]" />
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-600 dark:text-gray-400`}>
            Expenses
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;