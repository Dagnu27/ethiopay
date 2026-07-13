import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/api';
import {
  ArrowLeft,
  Send,
  User,
  Wallet,
  Search,
  Bell,
  Menu,
  X,
  QrCode,
  Shield,
  Fingerprint,
  Sparkles,
  CheckCircle,
  Plus,
  ChevronRight,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Home,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ============ SIDEBAR ============
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = window.location;
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Send, label: 'Send Money', path: '/send' },
    { icon: FileText, label: 'Transactions', path: '/transactions' },
    { icon: CreditCard, label: 'Bills', path: '/bills' },
    { icon: QrCode, label: 'QR Payments', path: '/qr' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 z-50 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-[280px]' : 'w-20'
      }`}>
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-700 ${!sidebarOpen ? 'justify-center' : ''}`}>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0B7A43] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-[#0B7A43]">EthioPay</span>}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#0B7A43] text-white shadow-lg shadow-[#0B7A43]/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B7A43]'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={`border-t border-gray-100 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0B7A43] flex items-center justify-center text-white font-semibold text-sm">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-medium text-gray-800 truncate">{user?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@email.com'}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// ============ TOP NAV ============
const TopNav = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Send Money</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0B7A43] text-white rounded-xl text-sm font-medium hover:bg-[#096336] transition shadow-lg shadow-[#0B7A43]/25">
            <Plus className="w-4 h-4" />
            Add Funds
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0B7A43] flex items-center justify-center text-white font-semibold text-sm">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

// ============ MAIN PAGE ============
const SendMoney = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000];
  const recentContacts = [
    { name: 'Selamawit T.', email: 'selam@email.com', initial: 'S' },
    { name: 'Abebe K.', email: 'abebe@email.com', initial: 'A' },
    { name: 'Helen G.', email: 'helen@email.com', initial: 'H' },
  ];

  const handleSend = async () => {
    if (!receiver) {
      toast.error('Please enter recipient email');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      toast.success('Money sent successfully! 🎉');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Failed to send money');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-4">
                {/* Recipient Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Recipient</h3>
                    <button className="text-sm text-[#0B7A43] font-medium hover:underline">New Contact</button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      placeholder="Search by email or phone..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Recent Contacts</p>
                    <div className="space-y-2">
                      {recentContacts.map((contact, index) => (
                        <div
                          key={index}
                          onClick={() => setReceiver(contact.email)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#0B7A43]/10 flex items-center justify-center text-[#0B7A43] font-bold">
                            {contact.initial}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.email}</p>
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
                      <p className="text-xs text-white/60">Balance: 124,580 ETB</p>
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
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Transfer Fee</span>
                      <span className="font-medium text-gray-800">
                        {amount ? Math.max(parseFloat(amount) * 0.01, 1).toFixed(2) : '0.00'} ETB
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Recipient Receives</span>
                      <span className="font-medium text-gray-800">{amount || '0.00'} ETB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Estimated Arrival</span>
                      <span className="font-medium text-green-600">Instant</span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-[#0B7A43]">
                        {amount ? (parseFloat(amount) + Math.max(parseFloat(amount) * 0.01, 1)).toFixed(2) : '0.00'} ETB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add a Note (Optional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all resize-none"
                    rows="2"
                    maxLength="100"
                  />
                  <div className="flex justify-end text-xs text-gray-400 mt-1">{note.length}/100</div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-[#0B7A43] to-[#13B86C] text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#0B7A43]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
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
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-50">
                      <Shield className="w-5 h-5 text-[#0B7A43]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Secure Transfer</p>
                      <p className="text-xs text-gray-500">256-bit encryption</p>
                    </div>
                    <Fingerprint className="w-5 h-5 text-gray-400 ml-auto" />
                  </div>
                </div>

                {/* Favorites */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Favorites</h4>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'A', 'H', 'M'].map((letter) => (
                      <button key={letter} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold hover:bg-[#0B7A43] hover:text-white transition-all">
                        {letter}
                      </button>
                    ))}
                    <button className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#0B7A43] hover:text-[#0B7A43] transition">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="bg-gradient-to-r from-[#0B7A43]/10 to-[#13B86C]/10 rounded-2xl p-5 border border-[#0B7A43]/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#0B7A43] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Smart Insight</p>
                      <p className="text-xs text-gray-600 mt-1">
                        You have transferred 15% less this month. You're on track with your budget! 🎯
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500">Today</p>
                    <p className="text-lg font-bold text-gray-800">3</p>
                    <p className="text-xs text-gray-500">Transfers</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500">Total Sent</p>
                    <p className="text-lg font-bold text-gray-800">ETB 12,500</p>
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