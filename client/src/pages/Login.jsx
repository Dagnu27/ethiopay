import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Wallet
} from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
      <div
        className={`w-full max-w-sm transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#006633] rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#006633]">EthioPay</span>
            </div>
            <p className="text-xs text-gray-500">Secure digital finance for Ethiopia</p>
          </div>

          <h2 className="text-lg font-bold text-[#0F172A] mb-0.5">Welcome back</h2>
          <p className="text-xs text-gray-500 mb-4">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-[#006633] focus:ring-2 focus:ring-[#006633]/20 outline-none transition-all text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 focus:border-[#006633] focus:ring-2 focus:ring-[#006633]/20 outline-none transition-all text-sm"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#006633] focus:ring-[#006633]/20"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-[#006633] font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006633] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#004d26] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-600 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-600 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.04-3.91 1.18-4.96 3.01-2.12 3.67-.54 9.1 1.52 12.08 1.01 1.46 2.21 3.09 3.79 3.04 1.52-.06 2.1-.98 3.94-.98 1.84 0 2.38.98 3.95.95 1.63-.03 2.66-1.48 3.66-2.94 1.15-1.68 1.62-3.31 1.65-3.39-.03-.02-3.16-1.21-3.19-4.81-.03-3.01 2.45-4.46 2.56-4.54-1.4-2.07-3.58-2.31-4.35-2.35-1.58-.07-3.07.96-3.87.96z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#006633] font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>

          {/* Security Message */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 border-t border-gray-100 pt-3">
            <Shield className="w-3 h-3" />
            <span>Secured by National Bank standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;