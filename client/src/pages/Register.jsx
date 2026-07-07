  import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#faf5ff] to-[#fdf2f8] p-4 py-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#34a853]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6128ff]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#8a57ea]/5 to-[#6128ff]/5 rounded-full blur-3xl"></div>

      <div 
        className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ boxShadow: '0 25px 50px -12px rgba(97, 40, 255, 0.25)' }}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6128ff] to-[#8a57ea] text-white text-2xl font-bold mb-3 shadow-lg shadow-[#6128ff]/30 relative">
            <span className="relative z-10">E</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6128ff] to-[#8a57ea] bg-clip-text text-transparent">
            EthioPay
          </h1>
          <p className="text-gray-500 text-sm mt-1">Start your financial journey</p>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 bg-gradient-to-b from-[#6128ff] to-[#8a57ea] rounded-full"></div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500">Enter your details to get started</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            {/* Full Name */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                  <UserIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                  placeholder="+251 9XX XXX XXX"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                  <LockClosedIcon className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6128ff] transition-colors">
                  <LockClosedIcon className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-gray-50/50 border-2 border-gray-100 focus:border-[#6128ff] focus:ring-4 focus:ring-[#6128ff]/10 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-4 mb-5">
            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded-md border-2 border-gray-300 text-[#6128ff] focus:ring-[#6128ff]/20 focus:ring-offset-0 transition-all"
              />
              <span className="group-hover:text-gray-800 transition-colors">
                I agree to the{' '}
                <Link to="/terms" className="text-[#6128ff] font-semibold hover:underline">
                  Terms and Conditions
                </Link>
                {' '}and understand how my data is protected.
              </span>
            </label>
          </div>

          {/* Register Button */}
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
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6128ff] font-bold hover:text-[#4a1ad9] transition-colors hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheckIcon className="w-4 h-4 text-green-500" />
          <span>Secured by National Bank standards</span>
          <SparklesIcon className="w-3 h-3 text-[#6128ff]" />
        </div>
      </div>
    </div>
  );
};

export default Register;