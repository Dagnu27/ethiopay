// client/src/components/landing/Hero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Play, Wallet, Send, QrCode } from 'lucide-react';
import { Button } from '../Button';
import { Container } from './Container';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-[#F8FAFC] to-[#F0F4F8]">
      <Container className="py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#0A6E3D]/10 text-[#0A6E3D] px-4 py-2 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              National Bank of Ethiopia Licensed
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">Financial Freedom</span>
              <br />
              in Ethiopia
            </h1>

            <p className="text-lg text-[#64748B] max-w-md leading-relaxed">
              Fast, secure, and reliable financial services at your fingertips.
              Join over a million users modernizing their financial lives.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button icon={ArrowRight}>Get Started →</Button>
              </Link>
              <Button variant="outline" icon={Play} onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#0A6E3D]/20 to-[#C89B2B]/20 flex items-center justify-center text-sm font-bold text-[#0A6E3D]">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">10k+ New Users</p>
                <p className="text-xs text-[#64748B]">Joined this month</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex justify-center">
            <div className="relative w-[320px] h-[640px]">
              <div className="absolute -inset-4 bg-[#0A6E3D]/20 rounded-full blur-3xl animate-float" />
              <motion.div className="relative w-full h-full bg-[#0F172A] rounded-[40px] p-4 shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[#0A6E3D]">EthioPay</span>
                      <div className="w-8 h-8 bg-[#0A6E3D]/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">👤</span>
                      </div>
                    </div>
                    <div className="bg-[#0A6E3D]/5 rounded-2xl p-4">
                      <p className="text-xs text-gray-500">Balance</p>
                      <p className="text-2xl font-bold text-[#0F172A]">₿ 12,450.00</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Send, label: 'Send' },
                        { icon: Wallet, label: 'Receive' },
                        { icon: QrCode, label: 'QR' },
                        { icon: ArrowRight, label: 'Pay' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-[#0A6E3D]/5 transition cursor-pointer">
                          <item.icon className="w-5 h-5 text-[#0A6E3D] mx-auto mb-1" />
                          <p className="text-xs font-medium">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;     