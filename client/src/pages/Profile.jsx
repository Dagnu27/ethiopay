import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Save,
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Fingerprint,
  LogOut,
  CheckCircle,
  AlertCircle,
  Edit2,
  X,
  Loader,
  Eye,
  EyeOff,
  CreditCard,
  Wallet,
  Calendar,
  Award,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Import shared components
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    biometric: false,
    twoFactor: false,
    language: 'en',
    currency: 'ETB',
  });

  // Stats
  const stats = {
    memberSince: 'Jan 2024',
    tier: 'Gold',
    monthlyLimit: 500000,
    spent: 245000,
    transactions: 124,
  };

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferenceChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Update profile API call
      const response = await authService.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
      });
      toast.success('Profile updated successfully!');
      setEditMode(false);
      // Update user context
      if (updateUser) updateUser(response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success('Password changed successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-1 space-y-4">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0B7A43] to-[#14B86A] flex items-center justify-center text-white text-3xl font-bold mx-auto">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 bg-[#0B7A43] rounded-full text-white hover:bg-[#096336] transition">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4">
                    {user?.fullName || 'User'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@email.com'}</p>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {stats.tier} Tier
                    </span>
                  </div>

                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {editMode ? 'Cancel Edit' : 'Edit Profile'}
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </motion.div>

                {/* Account Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Account Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                      <span className="font-medium text-gray-800 dark:text-white">{stats.memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Wallet Tier</span>
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">{stats.tier} Tier</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Monthly Limit</span>
                      <span className="font-medium text-gray-800 dark:text-white">{stats.monthlyLimit.toLocaleString()} ETB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Transactions</span>
                      <span className="font-medium text-gray-800 dark:text-white">{stats.transactions}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Spent This Month</span>
                        <span className="font-medium text-[#0B7A43]">{stats.spent.toLocaleString()} ETB</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#0B7A43] to-[#14B86A] h-2 rounded-full"
                          style={{ width: `${(stats.spent / stats.monthlyLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Settings */}
              <div className="lg:col-span-2 space-y-4">
                {/* Edit Profile */}
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Edit Profile</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white"
                            placeholder="+251 9XX XXX XXX"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="w-full bg-[#0B7A43] text-white py-2.5 rounded-xl font-medium hover:bg-[#096336] transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Change Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#0B7A43]" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white pr-10"
                          placeholder="Enter new password (min 8 characters)"
                        />
                        <button
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button
                      onClick={handleChangePassword}
                      disabled={loading || !formData.currentPassword || !formData.newPassword}
                      className="w-full bg-[#0B7A43] text-white py-2.5 rounded-xl font-medium hover:bg-[#096336] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      Update Password
                    </button>
                  </div>
                </motion.div>

                {/* Preferences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Preferences</h3>
                  <div className="space-y-4">
                    {/* Dark Mode */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5 text-[#0B7A43]" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Dark Mode</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Switch theme appearance</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-[#0B7A43]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-[#0B7A43]" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Push Notifications</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Alerts for all payments</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('notifications')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${preferences.notifications ? 'bg-[#0B7A43]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Email Alerts */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#0B7A43]" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Email Alerts</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Transaction confirmations</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('emailAlerts')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${preferences.emailAlerts ? 'bg-[#0B7A43]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${preferences.emailAlerts ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Biometric */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-5 h-5 text-[#0B7A43]" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Biometric Login</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Fingerprint or Face ID</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('biometric')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${preferences.biometric ? 'bg-[#0B7A43]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${preferences.biometric ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#0B7A43]" />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Two-Factor Auth</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Extra security layer</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('twoFactor')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${preferences.twoFactor ? 'bg-[#0B7A43]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${preferences.twoFactor ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Currency & Language */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white"
                      >
                        <option value="ETB">ETB - Ethiopian Birr</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all dark:text-white"
                      >
                        <option value="en">English</option>
                        <option value="am">Amharic</option>
                        <option value="om">Oromo</option>
                        <option value="ti">Tigrinya</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;