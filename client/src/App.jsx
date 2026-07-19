import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';
import './styles/landing.css';

// Pages - Main App
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import Transactions from './pages/Transactions';
import Bills from './pages/Bills';
import QRPay from './pages/QRPay';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

// ✅ Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminAnalytics from './pages/admin/Analytics';
import AdminUsers from './pages/admin/Users';
import AdminMerchants from './pages/admin/Merchants';
import AdminTransactions from './pages/admin/Transactions';
import AdminPayments from './pages/admin/Payments';
import AdminRevenue from './pages/admin/Revenue';
import AdminSettlement from './pages/admin/Settlement';
import AdminVerification from './pages/admin/Verification';
import AdminSecurity from './pages/admin/Security';
import AdminReports from './pages/admin/Reports';
import AdminNotifications from './pages/admin/Notifications';
import AdminSettings from './pages/admin/Settings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A6E3D]"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  console.log('🔍 AdminRoute - user:', user);
  console.log('🔍 AdminRoute - loading:', loading);
  console.log('🔍 AdminRoute - isAdmin:', user?.isAdmin);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A6E3D]"></div>
      </div>
    );
  }
  
  if (!user) {
    console.log('❌ No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  const isAdmin = user.isAdmin === true || user.email === 'admin@ethiopay.com';
  console.log('🔑 Final isAdmin check:', isAdmin);
  
  if (!isAdmin) {
    console.log('❌ Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('✅ Admin access granted!');
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#0A6E3D',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ========== USER ROUTES (Protected) ========== */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
          <Route path="/qr" element={<ProtectedRoute><QRPay /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

          {/* ========== ADMIN ROUTES (Admin Only) ========== */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/merchants" element={<AdminRoute><AdminMerchants /></AdminRoute>} />
          <Route path="/admin/transactions" element={<AdminRoute><AdminTransactions /></AdminRoute>} />
          <Route path="/admin/payments" element={<AdminRoute><AdminPayments /></AdminRoute>} />
          <Route path="/admin/revenue" element={<AdminRoute><AdminRevenue /></AdminRoute>} />
          <Route path="/admin/settlement" element={<AdminRoute><AdminSettlement /></AdminRoute>} />
          <Route path="/admin/verification" element={<AdminRoute><AdminVerification /></AdminRoute>} />
          <Route path="/admin/security" element={<AdminRoute><AdminSecurity /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
          <Route path="/admin/notifications" element={<AdminRoute><AdminNotifications /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

          {/* ========== 404 ========== */}
          <Route path="*" element={<Navigate to="/" replace />} />  {/* ✅ CHANGED TO "/" */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;