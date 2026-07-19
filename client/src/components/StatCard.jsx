import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, change, positive, color, darkMode, isMobile }) => {
  const colors = {
    green: `bg-green-50 text-green-600 ${darkMode ? 'dark:bg-green-900/20 dark:text-green-400' : ''}`,
    red: `bg-red-50 text-red-600 ${darkMode ? 'dark:bg-red-900/20 dark:text-red-400' : ''}`,
    blue: `bg-blue-50 text-blue-600 ${darkMode ? 'dark:bg-blue-900/20 dark:text-blue-400' : ''}`,
    yellow: `bg-yellow-50 text-yellow-600 ${darkMode ? 'dark:bg-yellow-900/20 dark:text-yellow-400' : ''}`,
    purple: `bg-purple-50 text-purple-600 ${darkMode ? 'dark:bg-purple-900/20 dark:text-purple-400' : ''}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className={`${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'} text-gray-500 dark:text-gray-400 truncate`}>
            {label}
          </p>
          <p className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-bold text-gray-800 dark:text-white mt-0.5 truncate`}>
            {value}
          </p>
          <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-0.5`}>
            {positive ? '↑' : '↓'} {change}
          </p>
        </div>
        <div className={`p-2 sm:p-3 rounded-xl ${colors[color]} flex-shrink-0`}>
          <Icon className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;