import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Zap, 
  ArrowRight,
  Lock,
  Mail,
  User,
  Phone,
  Wallet
} from 'lucide-react';
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!/^\+251[0-9]{9}$/.test(value.replace(/\s/g, ''))) 
          error = 'Please enter a valid Ethiopian phone number (+2519XXXXXXXX)';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the Terms');
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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
      <div 
        className={`w-full max-w-5xl transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* LEFT CARD - Branding (Centered) */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 flex flex-col items-center justify-center text-center border border-gray-100">
            <div className="w-full max-w-xs">
              {/* Logo with Wallet Icon */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#0B7A43] rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#0B7A43]">EthioPay</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172A] leading-tight mb-3">
                The Secure Bridge to <br />
                <span className="text-[#0B7A43]">Ethiopia's Digital Gold.</span>
              </h1>

              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Join thousands managing their wealth with modern fintech.
              </p>

              <div className="space-y-2 w-full">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 bg-[#0B7A43]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#0B7A43]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0F172A] text-sm">Secure</p>
                    <p className="text-xs text-gray-600">NIBE Standard Encryption</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 bg-[#0B7A43]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-[#0B7A43]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0F172A] text-sm">Fast</p>
                    <p className="text-xs text-gray-600">Instant Local Transfers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-400">
                © 2026 EthioPay. Secured by National Bank.
              </p>
            </div>
          </div>

          {/* RIGHT CARD - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">Create Account</h2>
              <p className="text-sm text-gray-600">Enter your details to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
                    placeholder="+251 9XX XXX XXX"
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>
                )}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-9 py-2 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 min-w-[28px]">
                        {getStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-[#0F172A] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-9 py-2 rounded-lg border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#0B7A43] focus:ring-2 focus:ring-[#0B7A43]/20 outline-none transition-all text-sm`}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 rounded border-gray-300 text-[#0B7A43] focus:ring-[#0B7A43]/20"
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#0B7A43] hover:underline font-medium">
                      Terms
                    </Link>
                  </span>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B7A43] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#096336] transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0B7A43] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;