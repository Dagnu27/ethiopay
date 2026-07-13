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

const Analytics = ({ spendingData }) => {
  const [timeframe, setTimeframe] = useState('6M');
  const [chartType, setChartType] = useState('area');

  const timeframes = ['1W', '1M', '3M', '6M', '1Y'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-green-600">
              Income: ETB {payload[0]?.value?.toLocaleString()}
            </p>
            <p className="text-sm text-red-500">
              Expenses: ETB {payload[1]?.value?.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-5 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Income vs Expenses</h3>
          <p className="text-sm text-gray-500">Monthly overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                  timeframe === tf
                    ? 'bg-white text-[#0E7A4B] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-50 transition">
            <Calendar className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
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
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
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
      <div className="flex items-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="text-xs text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="text-xs text-gray-600">Expenses</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;