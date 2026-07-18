import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
    Clock,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

interface Merchant {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  balance: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  totalRevenue: number;
  transactionCount: number;
}

const Merchants = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchMerchants();
  }, [search, filter, currentPage]);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await adminService.merchants({ page: currentPage, limit: 10 });
      // setMerchants(response.data.merchants || []);
      
      // Sample data
      setMerchants([
        {
          id: '1',
          businessName: 'Abyssinia Supermarket',
          ownerName: 'Abebe Kebede',
          email: 'abyssinia@example.com',
          phone: '+251 911 234 567',
          balance: 45000,
          isVerified: true,
          isActive: true,
          createdAt: '2024-01-15T10:30:00Z',
          totalRevenue: 125000,
          transactionCount: 342,
        },
        {
          id: '2',
          businessName: 'Addis Tech Solutions',
          ownerName: 'Selamawit Tesfaye',
          email: 'addistech@example.com',
          phone: '+251 922 345 678',
          balance: 28000,
          isVerified: true,
          isActive: true,
          createdAt: '2024-02-20T14:45:00Z',
          totalRevenue: 89000,
          transactionCount: 215,
        },
        {
          id: '3',
          businessName: 'Ethio Fashion',
          ownerName: 'Merchant User',
          email: 'merchant@ethiopay.com',
          phone: '+251 933 333 333',
          balance: 20000,
          isVerified: false,
          isActive: true,
          createdAt: '2024-03-01T09:15:00Z',
          totalRevenue: 34000,
          transactionCount: 98,
        },
        {
          id: '4',
          businessName: 'Green Coffee Export',
          ownerName: 'Michael Desta',
          email: 'greencoffee@example.com',
          phone: '+251 944 456 789',
          balance: 67000,
          isVerified: true,
          isActive: false,
          createdAt: '2024-04-10T11:20:00Z',
          totalRevenue: 210000,
          transactionCount: 567,
        },
      ]);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      toast.error('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  };

  const toggleMerchantStatus = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // await adminService.toggleMerchant(id);
      toast.success('Merchant status updated!');
      fetchMerchants();
    } catch (error) {
      toast.error('Failed to update merchant status');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `ETB ${amount.toLocaleString()}`;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <XCircle className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <CheckCircle className="w-3 h-3" />
        Verified
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D7C4A]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Merchants</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage all merchants on the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchMerchants}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Merchants</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{merchants.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Verified</p>
            <p className="text-xl font-bold text-green-500">{merchants.filter(m => m.isVerified).length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending Verification</p>
            <p className="text-xl font-bold text-yellow-500">{merchants.filter(m => !m.isVerified).length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-xl font-bold text-[#0D7C4A]">
              {formatCurrency(merchants.reduce((sum, m) => sum + m.totalRevenue, 0))}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search merchants by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Merchants</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Merchants Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {merchants.map((merchant) => (
                  <motion.tr
                    key={merchant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0D7C4A]/10 flex items-center justify-center text-[#0D7C4A] font-semibold text-sm">
                          <Store className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {merchant.businessName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {merchant.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{merchant.ownerName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{merchant.email}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {formatCurrency(merchant.balance)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getVerificationBadge(merchant.isVerified)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(merchant.isActive)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-[#0D7C4A]">
                        {formatCurrency(merchant.totalRevenue)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {merchant.transactionCount} transactions
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedMerchant(merchant);
                            setShowDetails(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => toggleMerchantStatus(merchant.id)}
                          className={`p-1.5 rounded-lg transition ${
                            merchant.isActive
                              ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500'
                              : 'hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500'
                          }`}
                        >
                          {merchant.isActive ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {merchants.length} of {merchants.length} merchants
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      currentPage === page
                        ? 'bg-[#0D7C4A] text-white'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Merchant Details Modal */}
      {showDetails && selectedMerchant && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Merchant Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0D7C4A]/10 flex items-center justify-center text-[#0D7C4A] text-2xl">
                  <Store className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedMerchant.businessName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getVerificationBadge(selectedMerchant.isVerified)}
                    {getStatusBadge(selectedMerchant.isActive)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedMerchant.ownerName}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedMerchant.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedMerchant.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Balance: {formatCurrency(selectedMerchant.balance)}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Revenue: {formatCurrency(selectedMerchant.totalRevenue)}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Joined: {formatDate(selectedMerchant.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => toggleMerchantStatus(selectedMerchant.id)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${
                    selectedMerchant.isActive
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {selectedMerchant.isActive ? 'Deactivate Merchant' : 'Activate Merchant'}
                </button>
                <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-[#0D7C4A] text-white hover:bg-[#065F46] transition">
                  View Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Merchants;