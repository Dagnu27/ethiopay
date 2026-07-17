import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users as UsersIcon,  // ← RENAMED to avoid conflict
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { adminService } from '../../services/api';
import toast from 'react-hot-toast';

// Types
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  balance: number;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search, filter, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.users({
        page: currentPage,
        limit: 10,
        search: search || undefined,
        status: filter !== 'all' ? filter : undefined,
      });
      setUsers(response.data.users || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback sample data
      setUsers([
        {
          id: '1',
          fullName: 'Abebe Kebede',
          email: 'abebe@example.com',
          phone: '+251 911 234 567',
          balance: 25000,
          isAdmin: false,
          isActive: true,
          createdAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          fullName: 'Selamawit Tesfaye',
          email: 'selam@example.com',
          phone: '+251 922 345 678',
          balance: 12000,
          isAdmin: false,
          isActive: true,
          createdAt: '2024-02-20T14:45:00Z',
        },
        {
          id: '3',
          fullName: 'Merchant ABC',
          email: 'merchant@example.com',
          phone: '+251 933 456 789',
          balance: 45000,
          isAdmin: false,
          isActive: false,
          createdAt: '2024-03-01T09:15:00Z',
        },
        {
          id: '4',
          fullName: 'Admin User',
          email: 'admin@ethiopay.com',
          phone: '+251 911 111 111',
          balance: 100000,
          isAdmin: true,
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
        },
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      await adminService.toggleUser(userId);
      toast.success('User status updated!');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user status');
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

  const getRoleBadge = (isAdmin: boolean) => {
    return isAdmin ? (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
        <Shield className="w-3 h-3" />
        Admin
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <UsersIcon className="w-3 h-3" />
        User
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Users</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View and manage all users on the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
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
                <option value="all">All Users</option>
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

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0D7C4A]/10 flex items-center justify-center text-[#0D7C4A] font-semibold text-sm">
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {formatCurrency(user.balance)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getRoleBadge(user.isAdmin)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(user.isActive)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(user.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDetails(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1.5 rounded-lg transition ${
                            user.isActive
                              ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500'
                              : 'hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500'
                          }`}
                        >
                          {user.isActive ? (
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
                Showing {users.length} of {users.length} users
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{users.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-xl font-bold text-green-500">{users.filter(u => u.isActive).length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Inactive</p>
            <p className="text-xl font-bold text-red-500">{users.filter(u => !u.isActive).length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Admins</p>
            <p className="text-xl font-bold text-purple-500">{users.filter(u => u.isAdmin).length}</p>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showDetails && selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">User Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0D7C4A] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedUser.fullName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getRoleBadge(selectedUser.isAdmin)}
                    {getStatusBadge(selectedUser.isActive)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedUser.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Joined {formatDate(selectedUser.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <UsersIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Balance: {formatCurrency(selectedUser.balance)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => toggleUserStatus(selectedUser.id)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${
                    selectedUser.isActive
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {selectedUser.isActive ? 'Deactivate User' : 'Activate User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;