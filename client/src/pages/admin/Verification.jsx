import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Check,
  X,
  AlertCircle,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Building,
  Camera,
  IdCard,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import toast from 'react-hot-toast';

const Verification = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    fetchVerifications();
  }, [search, filter, statusFilter, currentPage]);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      // Sample data
      const data = [
        {
          id: 'VER-001',
          user: {
            id: '1',
            fullName: 'Abebe Kebede',
            email: 'abebe@example.com',
            phone: '+251 911 234 567',
          },
          type: 'identity',
          status: 'pending',
          documents: [
            {
              type: 'passport',
              name: 'Passport.pdf',
              url: '#',
              uploadedAt: '2024-06-15T14:30:00Z',
            },
            {
              type: 'id_card',
              name: 'ID_Card.jpg',
              url: '#',
              uploadedAt: '2024-06-15T14:30:00Z',
            },
          ],
          createdAt: '2024-06-15T14:30:00Z',
        },
        {
          id: 'VER-002',
          user: {
            id: '2',
            fullName: 'Selamawit Tesfaye',
            email: 'selam@example.com',
            phone: '+251 922 345 678',
          },
          type: 'business',
          status: 'reviewing',
          documents: [
            {
              type: 'business_license',
              name: 'Business_License.pdf',
              url: '#',
              uploadedAt: '2024-06-15T13:45:00Z',
            },
            {
              type: 'tin',
              name: 'TIN_Certificate.pdf',
              url: '#',
              uploadedAt: '2024-06-15T13:45:00Z',
            },
          ],
          notes: 'Business registration looks good, waiting for additional documents',
          createdAt: '2024-06-15T13:45:00Z',
        },
        {
          id: 'VER-003',
          user: {
            id: '3',
            fullName: 'Merchant ABC',
            email: 'merchant@example.com',
            phone: '+251 933 333 333',
          },
          type: 'bank',
          status: 'approved',
          documents: [
            {
              type: 'bank_statement',
              name: 'Bank_Statement.pdf',
              url: '#',
              uploadedAt: '2024-06-15T12:20:00Z',
            },
          ],
          notes: 'All documents verified and approved',
          createdAt: '2024-06-15T12:20:00Z',
          reviewedAt: '2024-06-15T13:00:00Z',
          reviewedBy: 'Admin User',
        },
        {
          id: 'VER-004',
          user: {
            id: '4',
            fullName: 'Michael Desta',
            email: 'michael@example.com',
            phone: '+251 944 456 789',
          },
          type: 'address',
          status: 'rejected',
          documents: [
            {
              type: 'utility_bill',
              name: 'Utility_Bill.jpg',
              url: '#',
              uploadedAt: '2024-06-15T11:10:00Z',
            },
          ],
          notes: 'Address proof is not clear, please upload a better quality image',
          createdAt: '2024-06-15T11:10:00Z',
          reviewedAt: '2024-06-15T11:45:00Z',
          reviewedBy: 'Admin User',
        },
        {
          id: 'VER-005',
          user: {
            id: '5',
            fullName: 'TechHub Ethiopia',
            email: 'techhub@example.com',
            phone: '+251 955 567 890',
          },
          type: 'identity',
          status: 'pending',
          documents: [
            {
              type: 'id_card',
              name: 'ID_Card.png',
              url: '#',
              uploadedAt: '2024-06-15T10:00:00Z',
            },
          ],
          createdAt: '2024-06-15T10:00:00Z',
        },
      ];

      setVerifications(data);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast.error('Failed to load verification requests');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'reviewing':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <AlertCircle className="w-3 h-3" />
            Reviewing
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const getTypeBadge = (type) => {
    const types = {
      identity: {
        label: 'Identity',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        icon: <IdCard className="w-3 h-3" />,
      },
      business: {
        label: 'Business',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: <Building className="w-3 h-3" />,
      },
      address: {
        label: 'Address',
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        icon: <FileText className="w-3 h-3" />,
      },
      bank: {
        label: 'Bank',
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: <Building className="w-3 h-3" />,
      },
    };
    const info = types[type] || types.identity;
    return (
      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${info.color}`}>
        {info.icon}
        {info.label}
      </span>
    );
  };

  const handleAction = async (id, action) => {
    try {
      toast.loading('Processing...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.dismiss();
      toast.success(`Verification ${action}d successfully!`);
      fetchVerifications();
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to process verification');
    }
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Verification</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage user verification requests and KYC compliance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchVerifications}
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Requests</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{verifications.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-xl font-bold text-yellow-500">{verifications.filter(v => v.status === 'pending').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Reviewing</p>
            <p className="text-xl font-bold text-blue-500">{verifications.filter(v => v.status === 'reviewing').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Approved</p>
            <p className="text-xl font-bold text-green-500">{verifications.filter(v => v.status === 'approved').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search verifications by ID, user, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="identity">Identity</option>
                <option value="business">Business</option>
                <option value="address">Address</option>
                <option value="bank">Bank</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Verifications Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {verifications.map((verification) => (
                  <motion.tr
                    key={verification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{verification.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{verification.user.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{verification.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getTypeBadge(verification.type)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(verification.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {verification.documents.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(verification.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedVerification(verification);
                            setShowDetails(true);
                            setReviewNotes('');
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        {verification.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction(verification.id, 'approve')}
                              className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-500 transition"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(verification.id, 'reject')}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
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
                Showing {verifications.length} of {verifications.length} requests
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

      {/* Verification Details Modal */}
      {showDetails && selectedVerification && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Verification Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {selectedVerification.user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedVerification.user.email} • {selectedVerification.user.phone}
                  </p>
                </div>
                <div>
                  {getStatusBadge(selectedVerification.status)}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {selectedVerification.type.charAt(0).toUpperCase() + selectedVerification.type.slice(1)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Submitted</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {formatDate(selectedVerification.createdAt)}
                  </p>
                </div>
                {selectedVerification.reviewedAt && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reviewed</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {formatDate(selectedVerification.reviewedAt)}
                    </p>
                  </div>
                )}
                {selectedVerification.reviewedBy && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reviewed By</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {selectedVerification.reviewedBy}
                    </p>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Documents</h4>
                <div className="space-y-2">
                  {selectedVerification.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(doc.uploadedAt)}</span>
                        <button className="text-xs text-[#0D7C4A] hover:underline">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedVerification.notes && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">{selectedVerification.notes}</p>
                </div>
              )}

              {/* Review Notes Input */}
              {selectedVerification.status === 'pending' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Review Notes
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add notes about this verification..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#0D7C4A] focus:ring-2 focus:ring-[#0D7C4A]/20 outline-none transition text-sm dark:text-white resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Actions */}
              {selectedVerification.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => {
                      handleAction(selectedVerification.id, 'approve');
                      setShowDetails(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    <Check className="w-4 h-4 inline mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleAction(selectedVerification.id, 'reject');
                      setShowDetails(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Verification;