import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../components/landing/Container';
import '../styles/landing.css';

// Import all images
import logoEthioPay from '/images/logos/logo-ethiopay.png';
import heroPhone from '/images/hero/hero-phone.png';
import heroBackground from '/images/hero/hero-background.png';
import iconSecurity from '/images/features/icon-security.png';
import iconSpeed from '/images/features/icon-speed.png';
import iconRewards from '/images/features/icon-rewards.png';
import iconShield from '/images/features/icon-shield.png';
import communityMain from '/images/community/community-main.png';
import community1 from '/images/community/community-1.png';
import community2 from '/images/community/community-2.png';
import community3 from '/images/community/community-3.png';
import user1 from '/images/testimonials/user-1.png';
import user2 from '/images/testimonials/user-2.png';
import user3 from '/images/testimonials/user-3.png';
import logoCbe from '/images/logos/logo-cbe.png';
import logoAwash from '/images/logos/logo-awash.png';
import logoDashen from '/images/logos/logo-dashen.png';
import logoAbyssinia from '/images/logos/logo-abyssinia.png';
import logoCooperative from '/images/logos/logo-cooperative.png';

// Import Lucide icons
import {
  ArrowRight,
  Play,
  Shield,
  Zap,
  Gift,
  Users,
  CheckCircle,
  QrCode,
  BarChart3,
  PiggyBank,
  Star,
  ChevronRight,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Menu,
  X,
  Send,
  Lock,
  Fingerprint,
  Database,
  Building2,
  Clock,
  Headphones,
  Wallet,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

// ============ NAVBAR ============
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Features', 'Security', 'Community', 'FAQ'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoEthioPay} alt="EthioPay" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0A6E3D] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-[#0A6E3D] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#08532E] transition-all hover:scale-105 shadow-lg shadow-[#0A6E3D]/20"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition px-2 py-1">
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-[#0A6E3D] text-white px-4 py-2 rounded-xl text-sm font-semibold text-center hover:bg-[#08532E] transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </Container>
    </motion.nav>
  );
};

// ============ HERO ============
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F4F8]">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#0A6E3D]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C89B2B]/10 rounded-full blur-3xl"
      />

      <Container className="relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#0A6E3D]/10 text-[#0A6E3D] px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-[#0A6E3D] rounded-full animate-pulse" />
              🏦 Licensed by National Bank of Ethiopia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1]">
              Future of
              <br />
              <span className="bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">Digital Banking</span>
              <br />
              in Ethiopia
            </h1>

            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Experience the future of finance with secure, instant, and intelligent
              banking services designed for every Ethiopian.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-[#0A6E3D] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#08532E] transition-all hover:scale-105 shadow-xl shadow-[#0A6E3D]/25 flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-[#0A6E3D] hover:text-[#0A6E3D] transition flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0A6E3D]" />
                <span className="font-semibold">50K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0A6E3D]" />
                <span className="font-semibold">NBE Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0A6E3D]" />
                <span className="font-semibold">99.99% Uptime</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-4 z-20 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#0A6E3D]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Payment Received</p>
                  <p className="text-xs text-gray-500">+1,500 ETB</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#C89B2B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Cashback Earned</p>
                  <p className="text-xs text-gray-500">+250 ETB</p>
                </div>
              </div>
            </motion.div>

            <div className="relative w-[300px] h-[600px]">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#0A6E3D]/20 to-[#C89B2B]/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full bg-[#0F172A] rounded-[40px] p-4 shadow-2xl animate-float">
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                  <img src={heroPhone} alt="EthioPay App" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// ============ STATS ============
const Stats = () => {
  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '15M+', label: 'Transactions', icon: Send },
    { number: '99.99%', label: 'Uptime', icon: Clock },
    { number: '24/7', label: 'Support', icon: Headphones },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-[#0A6E3D] mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-bold text-[#0F172A]">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ FEATURES ============
const Features = () => {
  const features = [
    { icon: Shield, title: 'Secure Payments', description: 'Bank-grade encryption with NIBE standards protecting every transaction.' },
    { icon: QrCode, title: 'QR Payments', description: 'Scan and pay with QR codes instantly at any merchant.' },
    { icon: Zap, title: 'Instant Transfers', description: 'Send and receive money in seconds with zero downtime.' },
    { icon: BarChart3, title: 'Smart Analytics', description: 'Track your spending with intelligent insights and reports.' },
    { icon: PiggyBank, title: 'Savings Goals', description: 'Set goals and save automatically towards your financial targets.' },
    { icon: Gift, title: 'Rewards & Offers', description: 'Earn cashback and exclusive offers on every transaction.' },
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Premium <span className="text-[#0A6E3D]">Features</span>
          </h2>
          <p className="text-lg text-gray-600">Everything you need to manage your finances</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#0A6E3D]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#0A6E3D] transition-all group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-[#0A6E3D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <button className="mt-4 text-[#0A6E3D] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ HOW IT WORKS ============
const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Create Account', description: 'Sign up in 2 minutes with your phone number.', icon: UserCheck },
    { number: '02', title: 'Verify Identity', description: 'Secure verification with NBE standards.', icon: ShieldCheck },
    { number: '03', title: 'Add Money', description: 'Fund your wallet from any bank or agent.', icon: Wallet },
    { number: '04', title: 'Start Sending', description: 'Send money instantly to anyone.', icon: Send },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How <span className="text-[#0A6E3D]">It Works</span>
          </h2>
          <p className="text-lg text-gray-600">Start your financial journey in minutes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B]" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="w-16 h-16 mx-auto bg-[#0A6E3D]/10 rounded-2xl flex items-center justify-center mb-4 relative z-10">
                <step.icon className="w-8 h-8 text-[#0A6E3D]" />
              </div>
              <p className="text-sm font-bold text-[#0A6E3D] mb-1">{step.number}</p>
              <h3 className="font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ SECURITY ============
const Security = () => {
  const features = [
    { icon: Lock, title: 'Bank Grade Encryption', description: '256-bit SSL encryption for all your data' },
    { icon: Fingerprint, title: 'Biometric Login', description: 'Secure access with fingerprint or face ID' },
    { icon: Database, title: 'Fraud Detection', description: 'AI-powered fraud detection system' },
    { icon: Building2, title: 'NBE Compliance', description: 'Fully compliant with National Bank regulations' },
  ];

  return (
    <section id="security" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#C89B2B] px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-[#C89B2B] rounded-full animate-pulse" />
              🔒 Your Security Matters
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Enterprise-Grade
              <br />
              <span className="text-[#C89B2B]">Security</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We protect your money with the highest security standards in the industry.
            </p>

            <div className="space-y-4">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="w-12 h-12 bg-[#0A6E3D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#C89B2B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-64 h-64 bg-gradient-to-br from-[#0A6E3D]/20 to-[#C89B2B]/20 rounded-full flex items-center justify-center animate-float-slow">
              <Shield className="w-32 h-32 text-[#C89B2B] opacity-50" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// ============ TESTIMONIALS ============
const Testimonials = () => {
  const testimonials = [
    { name: 'Selamawit T.', role: 'Business Owner', quote: 'EthioPay has revolutionized how I manage my business finances.', image: user1 },
    { name: 'Abebe K.', role: 'Software Engineer', quote: 'The best digital wallet in Ethiopia. Fast, reliable, and outstanding support.', image: user2 },
    { name: 'Helen G.', role: 'Freelance Designer', quote: 'I love how easy it is to send and receive money. The QR feature is a game-changer.', image: user3 },
  ];

  return (
    <section id="community" className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-[#0A6E3D]">Community</span> Says
          </h2>
          <p className="text-lg text-gray-600">Real stories from real users</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C89B2B] text-[#C89B2B]" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ PARTNERS ============
const Partners = () => {
  const partners = [
    { name: 'Commercial Bank', logo: logoCbe },
    { name: 'Awash Bank', logo: logoAwash },
    { name: 'Dashen Bank', logo: logoDashen },
    { name: 'Bank of Abyssinia', logo: logoAbyssinia },
    { name: 'Cooperative Bank', logo: logoCooperative },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-y border-gray-100">
      <Container>
        <p className="text-center text-sm text-gray-500 mb-8">Trusted by leading Ethiopian Banks</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <img src={partner.logo} alt={partner.name} className="h-12 w-auto" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ CTA ============
const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0A6E3D] to-[#08532E]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-[#C89B2B]/20 rounded-full blur-3xl"
      />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Join Ethiopia's
            <br />
            <span className="text-[#C89B2B]">Smartest Digital Wallet</span>
          </h2>
          <p className="text-white/80 text-lg mb-8">Start your financial journey today with EthioPay.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#C89B2B] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-[#A87B1A] transition-all hover:scale-105 shadow-2xl shadow-[#C89B2B]/30"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

// ============ FOOTER ============
const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoEthioPay} alt="EthioPay" className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Pioneering financial inclusion for every Ethiopian.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#security" className="hover:text-white transition">Security</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest updates.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EthioPay. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

// ============ MAIN LANDING ============
const Landing = () => {
  useEffect(() => {
    document.title = 'EthioPay - Premium Digital Banking in Ethiopia';
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Security />
      <Testimonials />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;