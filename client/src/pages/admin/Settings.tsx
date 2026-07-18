import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Bell,
  Mail,
  Lock,
  User,
  Globe,
  Database,
  Server,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General
    siteName: 'EthioPay',
    siteDescription: 'Ethiopia Digital Payment Platform',
    siteUrl: 'https://ethiopay.com',
    timezone: 'Africa/Addis_Ababa',
    currency: 'ETB',

    // Security
    twoFactorAuth: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordPolicy: 'strong',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    adminAlerts: true,

    // System
    maintenanceMode: false,
    allowRegistration: true,
    allowWithdrawals: true,
    allowDeposits: true,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully!');
    }, 1500);
  };

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const sections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Settings className="w-5 h-5" />,
      description: 'Basic platform settings and information',
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      description: 'Security policies and authentication settings',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Configure notification preferences',
    },
    {
      id: 'system',
      title: 'System',
      icon: <Server className="w-5 h-5" />,
      description: 'System configuration and maintenance',
    },
  ];

  const [activeSection, setActiveSection] = useState('general');

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
                >
                  <option value="ETB">ETB - Ethiopian Birr</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows="2"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
              >
                <option value="Africa/Addis_Ababa">Africa/Addis_Ababa</option>
                <option value="Africa/Nairobi">Africa/Nairobi</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Require 2FA for admin accounts</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.twoFactorAuth ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.twoFactorAuth ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleChange('maxLoginAttempts', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password Policy
              </label>
              <select
                value={settings.passwordPolicy}
                onChange={(e) => handleChange('passwordPolicy', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
              >
                <option value="weak">Weak - Minimum 6 characters</option>
                <option value="medium">Medium - 8 characters with letters & numbers</option>
                <option value="strong">Strong - 10+ characters with special characters</option>
              </select>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Email Notifications</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Send notifications via email</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.emailNotifications ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.emailNotifications ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Push Notifications</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Send push notifications to devices</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.pushNotifications ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.pushNotifications ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">SMS Notifications</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Send SMS notifications</p>
              </div>
              <button
                onClick={() => handleToggle('smsNotifications')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.smsNotifications ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.smsNotifications ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Admin Alerts</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Critical alerts for admins</p>
              </div>
              <button
                onClick={() => handleToggle('adminAlerts')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.adminAlerts ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.adminAlerts ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Maintenance Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Put the platform in maintenance mode</p>
              </div>
              <button
                onClick={() => handleToggle('maintenanceMode')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.maintenanceMode ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Allow Registration</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow new user registration</p>
              </div>
              <button
                onClick={() => handleToggle('allowRegistration')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.allowRegistration ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.allowRegistration ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Allow Withdrawals</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Enable withdrawal functionality</p>
              </div>
              <button
                onClick={() => handleToggle('allowWithdrawals')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.allowWithdrawals ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.allowWithdrawals ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Allow Deposits</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Enable deposit functionality</p>
              </div>
              <button
                onClick={() => handleToggle('allowDeposits')}
                className={`relative w-12 h-6 rounded-full transition ${
                  settings.allowDeposits ? 'bg-[#0D7C4A]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                    settings.allowDeposits ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage platform configuration and preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D7C4A] text-white rounded-xl text-sm font-medium hover:bg-[#065F46] transition disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                    activeSection === section.id
                      ? 'bg-[#0D7C4A]/10 text-[#0D7C4A] dark:bg-[#0D7C4A]/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {sections.find(s => s.id === activeSection)?.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
              {renderSection()}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-500 dark:text-gray-400">System Status</p>
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">Operational</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Database</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">Connected</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Last Backup</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">2 hours ago</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Version</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">v2.4.1</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;