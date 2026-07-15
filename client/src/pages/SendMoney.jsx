import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  Send,
  Search,
  Plus,
  Shield,
  Fingerprint,
  Sparkles,
  CheckCircle,
  Loader,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const SendMoney = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [recentContacts] = useState([
    { name: 'Selamawit T.', email: 'selam@email.com', initial: 'S' },
    { name: 'Abebe K.', email: 'abebe@email.com', initial: 'A' },
    { name: 'Helen G.', email: 'helen@email.com', initial: 'H' },
  ]);

  const quickAmounts = [100, 500, 1000, 5000];

  // Fetch balance on mount
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const response = await transactionService.balance();
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(124580); // Fallback
    } finally {
      setBalanceLoading(false);
    }
  };

  const handleSend = async () => {
    // Validation
    if (!receiver) {
      toast.error('Please enter recipient email');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Check if amount exceeds balance
    const totalAmount = calculateTotal();
    if (totalAmount > balance) {
      toast.error(`Insufficient balance. You need ${totalAmount.toFixed(2)} ETB`);
      return;
    }

    setLoading(true);
    try {
      const response = await transactionService.send({
        receiverEmail: receiver,
        amount: parseFloat(amount),
        description: note || 'Money transfer',
      });
      
      setSuccess(true);
      toast.success('Money sent successfully! 🎉');
      
      // Update balance
      await fetchBalance();
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send money');
    } finally {
      setLoading(false);
    }
  };

  const calculateFee = () => {
    if (!amount) return 0;
    return Math.max(parseFloat(amount) * 0.01, 1);
  };

  const calculateTotal = () => {
    if (!amount) return 0;
    return parseFloat(amount) + calculateFee();
  };

  const formatCurrency = (value) => {
    return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300`}>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <TopNav 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <main className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-4">
                {/* Page Header */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Send Money</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transfer funds instantly to anyone
                  </p>
                </div>

                {/* Recipient Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Recipient</h3>
                    <button className="text-sm text-[#0B7A43] font-medium hover:underline">
                      New Contact
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      placeholder="Search by email or phone..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Recent Contacts
                    </p>
                    <div className="space-y-2">
                      {recentContacts.map((contact, index) => (
                        <div
                          key={index}
                          onClick={() => setReceiver(contact.email)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#0B7A43]/10 flex items-center justify-center text-[#0B7A43] font-bold">
                            {contact.initial}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {contact.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {contact.email}
                            </p>
                          </div>
                          <Send className="w-4 h-4 text-[#0B7A43] opacity-0 group-hover:opacity-100 transition" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amount Card */}
                <div className="bg-gradient-to-br from-[#0B7A43] to-[#13B86C] rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-white/80">Amount</p>
                      <p className="text-xs text-white/60">
                        Balance: {balanceLoading ? '...' : `${formatCurrency(balance)} ETB`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-light text-white/80">ETB</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="text-5xl font-bold bg-transparent border-none outline-none text-white w-full placeholder-white/30"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {quickAmounts.map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm font-medium text-white/90"
                      >
                        {value.toLocaleString()} ETB
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Payment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Transfer Fee</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {calculateFee().toFixed(2)} ETB
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Recipient Receives</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {amount || '0.00'} ETB
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Estimated Arrival</span>
                      <span className="font-medium text-green-600">Instant</span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                      <span className="font-semibold text-gray-800 dark:text-white">Total</span>
                      <span className={`text-xl font-bold ${calculateTotal() > balance ? 'text-red-500' : 'text-[#0B7A43]'}`}>
                        {calculateTotal().toFixed(2)} ETB
                      </span>
                    </div>
                    {calculateTotal() > balance && balance !== null && (
                      <p className="text-xs text-red-500 mt-1">
                        Insufficient balance. You need {calculateTotal().toFixed(2)} ETB
                      </p>
                    )}
                  </div>
                </div>

                {/* Note */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add a Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all resize-none dark:text-white dark:placeholder-gray-400"
                    rows="2"
                    maxLength="100"
                  />
                  <div className="flex justify-end text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {note.length}/100
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={loading || success || (calculateTotal() > balance && balance !== null)}
                  className="w-full bg-gradient-to-r from-[#0B7A43] to-[#13B86C] text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#0B7A43]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : success ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Sent Successfully!
                    </span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Money Securely
                    </>
                  )}
                </button>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 space-y-4">
                {/* Security Badge */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20">
                      <Shield className="w-5 h-5 text-[#0B7A43]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        Secure Transfer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        256-bit encryption
                      </p>
                    </div>
                    <Fingerprint className="w-5 h-5 text-gray-400 ml-auto" />
                  </div>
                </div>

                {/* Favorites */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Favorites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'A', 'H', 'M'].map((letter) => (
                      <button
                        key={letter}
                        className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold hover:bg-[#0B7A43] hover:text-white transition-all"
                      >
                        {letter}
                      </button>
                    ))}
                    <button className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#0B7A43] hover:text-[#0B7A43] transition">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="bg-gradient-to-r from-[#0B7A43]/10 to-[#13B86C]/10 rounded-2xl p-5 border border-[#0B7A43]/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#0B7A43] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        Smart Insight
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        You have transferred 15% less this month. You're on track with your budget! 🎯
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">3</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transfers</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Sent</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">ETB 12,500</p>
                    <p className="text-xs text-green-600">+5% from last week</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;