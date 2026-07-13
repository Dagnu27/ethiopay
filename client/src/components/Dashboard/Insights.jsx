import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle,
  Zap,
  Brain,
  Target,
  PiggyBank,
  ArrowRight
} from 'lucide-react';

const Insights = () => {
  const insights = [
    {
      icon: Brain,
      title: 'AI Spending Analysis',
      description: 'Your spending on food is 15% higher than last month',
      type: 'warning',
      action: 'View insights'
    },
    {
      icon: Target,
      title: 'Savings Goal Progress',
      description: 'You\'re 68% towards your monthly savings goal of 50,000 ETB',
      type: 'success',
      action: 'Track progress'
    },
    {
      icon: PiggyBank,
      title: 'Smart Budget Suggestion',
      description: 'Consider reducing dining out by 20% to reach your goals faster',
      type: 'info',
      action: 'Adjust budget'
    }
  ];

  const getColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'danger': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#14B86A]" />
          <h3 className="font-semibold text-gray-800 dark:text-white">AI Insights</h3>
        </div>
        <span className="text-xs bg-[#0E7A4B]/10 text-[#0E7A4B] px-2 py-0.5 rounded-full">
          Powered by AI
        </span>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 ${getColor(insight.type)}`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{insight.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{insight.description}</p>
                <button className="text-xs text-[#0E7A4B] font-medium mt-1.5 flex items-center gap-0.5 group-hover:gap-1 transition-all">
                  {insight.action}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Insights;