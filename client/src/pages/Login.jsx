
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

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
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#faf5ff] to-[#fdf2f8] p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6128ff]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#34a853]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6128ff]/5 to-[#8a57ea]/5 rounded-full blur-3xl"></div>

      <div 
        className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ boxShadow: '0 25px 50px -12px rgba(97, 40, 255, 0.25)' }}
      >
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6128ff] to-[#8a57ea] text-white text-3xl font-bold mb-4 shadow-lg shadow-[#6128ff]/30 relative">
            <span className="relative z-10">E</span>
            <div className="absolute inset-0 bg-gradient-to-br from-[#6128ff] to-[#8a57ea] rounded-2xl animate-pulse opacity-50"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6128ff] to-[#8a57ea] bg-clip-text text-transparent">
            EthioPay
          </h1>
          <p className="text-gray-500 text-sm mt-2">Secure digital finance for Ethiopia</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-[#6128ff] to-[#8a57ea] rounded-full"></div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                <LockClosedIcon className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-2 border-gray-300 text-[#6128ff] focus:ring-[#6128ff]/20 focus:ring-offset-0 transition-all"
                />
              </div>
              <span className="group-hover:text-gray-800 transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-[#6128ff] hover:text-[#4a1ad9] font-semibold transition-colors hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6128ff] to-[#8a57ea] text-white py-3.5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#6128ff]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/80 text-gray-400 backdrop-blur-sm">or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-2xl hover:border-[#6128ff]/20 hover:bg-[#6128ff]/5 transition-all duration-200 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#6128ff] transition-colors">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-2xl hover:border-[#6128ff]/20 hover:bg-[#6128ff]/5 transition-all duration-200 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.04-3.91 1.18-4.96 3.01-2.12 3.67-.54 9.1 1.52 12.08 1.01 1.46 2.21 3.09 3.79 3.04 1.52-.06 2.1-.98 3.94-.98 1.84 0 2.38.98 3.95.95 1.63-.03 2.66-1.48 3.66-2.94 1.15-1.68 1.62-3.31 1.65-3.39-.03-.02-3.16-1.21-3.19-4.81-.03-3.01 2.45-4.46 2.56-4.54-1.4-2.07-3.58-2.31-4.35-2.35-1.58-.07-3.07.96-3.87.96z"/>
            </svg>
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#6128ff] transition-colors">Apple</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#6128ff] font-bold hover:text-[#4a1ad9] transition-colors hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheckIcon className="w-4 h-4 text-green-500" />
          <span>Secured by National Bank of Ethiopia standards</span>
          <SparklesIcon className="w-3 h-3 text-[#6128ff]" />
        </div>
      </div>
    </div>
  );
};

export default Login;