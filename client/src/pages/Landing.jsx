import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../components/landing/Container';
import {
  ArrowRight,
  Play,
  Star,
  Users,
  TrendingUp,
  Wallet,
  Send,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Award,
  Menu,
  X,
  ArrowLeft,
  ChevronDown,  // ✅ ADDED
} from 'lucide-react';
import '../styles/landing.css';

// Hero background image
import heroBg from '/images/hero/hero-background.png';
import appScreenshot from '/images/hero/hero-phone.png';

// ============ NAVBAR ============
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A6E3D] to-[#10B981] rounded-xl flex items-center justify-center shadow-lg shadow-[#0A6E3D]/20 group-hover:scale-110 transition">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-white">EthioPay</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Security', 'Pricing', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0A6E3D] to-[#10B981] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition">
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#0F172A] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg shadow-white/20"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-3">
              {['Features', 'Security', 'Pricing', 'About'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-white/70 hover:text-white transition px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition px-2 py-1">
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-white text-[#0F172A] px-4 py-2 rounded-xl text-sm font-semibold text-center hover:bg-white/90 transition"
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

// ============ FLOATING CARDS ============
const FloatingCards = () => {
  const cards = [
    { icon: Send, label: 'Payment Sent', value: 'ETB 4,500', color: 'from-green-500/20 to-emerald-500/20' },
    { icon: Wallet, label: 'Wallet Balance', value: 'ETB 25,400', color: 'from-blue-500/20 to-cyan-500/20' },
    { icon: TrendingUp, label: 'Monthly Growth', value: '+18%', color: 'from-purple-500/20 to-pink-500/20' },
    { icon: CheckCircle, label: 'Instant Transfer', value: 'Completed', color: 'from-yellow-500/20 to-orange-500/20' },
  ];

  const positions = [
    'top-10 -right-8',
    'bottom-20 -right-12',
    'top-32 -left-12',
    'bottom-32 -left-8',
  ];

  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
          className={`absolute ${positions[index]} z-20 glass-card p-4 min-w-[160px] hidden lg:block`}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`bg-gradient-to-r ${card.color} rounded-xl p-3 mb-2`}>
            <card.icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-white/60">{card.label}</p>
          <p className="text-sm font-semibold text-white">{card.value}</p>
        </motion.div>
      ))}
    </>
  );
};

// ============ HERO ============
const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroBg} alt="Digital Finance" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/70 via-[#0F172A]/50 to-[#0A6E3D]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
      </motion.div>

      <div className="absolute inset-0 bg-noise opacity-5" />

      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C89B2B]/20 rounded-full blur-3xl"
      />

      <Container className="relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 glass-badge px-4 py-2 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-white/90">#1 Digital Wallet in Ethiopia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white"
            >
              Your Money
              <br />
              <span className="bg-gradient-to-r from-[#10B981] via-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">
                Moves Faster
              </span>
              <br />
              Than Ever
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Send, receive, and manage your money with zero fees. 
              The smartest way to handle your finances in Ethiopia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#0A6E3D] rounded-2xl font-semibold text-white overflow-hidden transition-all hover:scale-105 shadow-2xl shadow-[#0A6E3D]/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A6E3D] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <button className="glass-button px-8 py-4 rounded-2xl font-semibold text-white flex items-center gap-2 hover:bg-white/10 transition">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white font-medium text-sm backdrop-blur-sm">
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C89B2B] text-[#C89B2B]" />
                  ))}
                  <span className="text-sm text-white/70 ml-2">4.9/5</span>
                </div>
                <p className="text-sm text-white/50">Trusted by 100K+ Ethiopians</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            <FloatingCards />

            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md"
            >
              <div className="absolute -inset-12 bg-gradient-to-r from-[#10B981]/20 via-[#0A6E3D]/20 to-[#C89B2B]/20 rounded-full blur-3xl animate-pulse" />

              <div className="relative glass-screenshot rounded-3xl overflow-hidden shadow-2xl shadow-[#0A6E3D]/20">
                <img src={appScreenshot} alt="EthioPay App" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </div>

              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#10B981]/30 rounded-full blur-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// ============ STATS ============
const PremiumStats = () => {
  const stats = [
    { value: '100K+', label: 'Active Users', icon: Users },
    { value: 'ETB 500M+', label: 'Processed', icon: Send },
    { value: '99.99%', label: 'Reliability', icon: Shield },
    { value: '24/7', label: 'Support', icon: Award },
  ];

  return (
    <section className="py-20 relative -mt-20 z-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-stats-card rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-white/60">{stat.label}</p>
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
    { icon: '⚡', title: 'Instant Transfers', desc: 'Send money instantly to anyone in Ethiopia with zero fees.' },
    { icon: '💳', title: 'Digital Wallet', desc: 'Store, manage, and grow your money securely in one place.' },
    { icon: '📱', title: 'QR Payments', desc: 'Scan and pay with QR codes at any merchant instantly.' },
    { icon: '📄', title: 'Bill Payments', desc: 'Pay utility bills, school fees, and subscriptions in seconds.' },
    { icon: '📊', title: 'Transaction History', desc: 'Track every transaction with detailed insights and analytics.' },
    { icon: '🔒', title: 'Security Protection', desc: 'Bank-grade encryption and fraud detection for your safety.' },
  ];

  return (
    <section id="features" className="py-24 bg-[#0F172A]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Everything You Need in{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-[#0A6E3D] bg-clip-text text-transparent">
              One App
            </span>
          </h2>
          <p className="text-lg text-white/60">Powerful features designed to simplify your financial life.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-feature-card rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#0A6E3D]/20 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ HOW IT WORKS ============
const HowItWorks = () => {
  const steps = [
    { number: '01', title: 'Create Account', description: 'Sign up in 2 minutes with your email or phone.', emoji: '👤' },
    { number: '02', title: 'Verify Identity', description: 'Secure verification with NBE standards.', emoji: '🛡️' },
    { number: '03', title: 'Add Funds', description: 'Connect your bank account or card.', emoji: '💳' },
    { number: '04', title: 'Start Transacting', description: 'Send, receive, and manage your money.', emoji: '📤' },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0F172A] border-t border-white/5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-[#0A6E3D] bg-clip-text text-transparent">
              4 Easy Steps
            </span>
          </h2>
          <p className="text-lg text-white/60">Your journey to financial freedom starts here.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#10B981] via-[#0A6E3D] to-[#C89B2B]" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#0A6E3D]/20 to-[#10B981]/20 rounded-2xl flex items-center justify-center mb-4 relative z-10">
                <span className="text-3xl">{step.emoji}</span>
              </div>
              <p className="text-sm font-bold text-[#10B981] mb-1">{step.number}</p>
              <h3 className="font-bold text-white mb-1">{step.title}</h3>
              <p className="text-sm text-white/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ TESTIMONIALS ============
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    { name: 'Selamawit T.', role: 'Business Owner', quote: 'EthioPay has revolutionized how I manage my business finances. Instant transfers and secure payments have made my life so much easier.', initial: 'S' },
    { name: 'Abebe K.', role: 'Software Engineer', quote: 'The best digital wallet in Ethiopia. Fast, reliable, and the customer support is outstanding.', initial: 'A' },
    { name: 'Helen G.', role: 'Freelance Designer', quote: 'I love how easy it is to send and receive money. The QR code feature is a game-changer for my business.', initial: 'H' },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0F172A] border-t border-white/5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-[#0A6E3D] bg-clip-text text-transparent">
              Community
            </span>
            {' '}Says
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass-testimonial rounded-3xl p-8 md:p-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C89B2B] text-[#C89B2B]" />
              ))}
            </div>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A6E3D] to-[#10B981] flex items-center justify-center text-white text-xl font-bold">
                {testimonials[currentIndex].initial}
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-white/50">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 glass-button p-3 rounded-full hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 glass-button p-3 rounded-full hover:bg-white/10 transition"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-[#10B981]' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

// ============ FAQ ============
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'Is EthioPay free to use?', a: 'Yes! EthioPay is completely free to use. No hidden fees, no monthly charges.' },
    { q: 'How do I create an account?', a: 'Simply download the app, enter your phone number, and follow the verification steps.' },
    { q: 'Is my money safe?', a: 'Absolutely. We use bank-grade encryption and are fully compliant with NBE regulations.' },
    { q: 'How long do transfers take?', a: 'Transfers are instant. The recipient receives the money within seconds.' },
    { q: 'What if I have an issue?', a: 'Our 24/7 support team is always ready to help you via chat or phone.' },
  ];

  return (
    <section className="py-24 bg-[#0F172A] border-t border-white/5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-[#0A6E3D] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-white/60">Everything you need to know about EthioPay.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-faq-card rounded-2xl overflow-hidden border border-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-white/60 leading-relaxed">{faq.a}</div>
              </motion.div>
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
            Start Your Financial
            <br />
            <span className="text-[#C89B2B]">Journey Today</span>
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Join thousands of Ethiopians who trust EthioPay for their financial needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#C89B2B] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-[#A87B1A] transition-all hover:scale-105 shadow-2xl shadow-[#C89B2B]/30"
          >
            Get Started Now
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
    <footer className="bg-[#0A0F1F] text-white border-t border-white/5">
      <Container className="py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
            </div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              Pioneering the next generation of financial inclusion for every Ethiopian.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#security" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/30">
          <p>© {new Date().getFullYear()} EthioPay. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

// ============ MAIN LANDING ============
const Landing = () => {
  useEffect(() => {
    document.title = 'EthioPay - Your Money Moves Faster';
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] overflow-x-hidden">
      <Navbar />
      <Hero />
      <PremiumStats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;