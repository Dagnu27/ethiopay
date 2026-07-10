import { Link } from 'react-router-dom';
import { Container } from '../components/landing/Container';
import '../styles/landing.css';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0A6E3D] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-[#0A6E3D] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#08532E] transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <Container className="py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#0A6E3D]/10 text-[#0A6E3D] px-4 py-1 rounded-full text-sm font-medium mb-4">
              ✅ Licensed in Ethiopia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Future of
              <br />
              <span className="text-[#0A6E3D]">Financial Freedom</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Fast, secure, and reliable financial services at your fingertips.
              Join thousands of Ethiopians modernizing their financial lives.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/register"
                className="bg-[#0A6E3D] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#08532E] transition shadow-lg shadow-[#0A6E3D]/20"
              >
                Get Started →
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#0A6E3D] text-[#0A6E3D] px-8 py-3 rounded-xl font-semibold hover:bg-[#0A6E3D]/5 transition"
              >
                Learn More
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-3">
                {['A', 'B', 'C'].map((letter, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center font-bold text-sm text-gray-700">
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-[#0F172A]">10k+ New Users</p>
                <p className="text-sm text-gray-500">Joined this month</p>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="w-[300px] h-[600px] bg-[#0F172A] rounded-[40px] p-4 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[32px] p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-[#0A6E3D]">EthioPay</span>
                  <div className="w-8 h-8 bg-[#0A6E3D]/10 rounded-full flex items-center justify-center">
                    <span>👤</span>
                  </div>
                </div>
                <div className="bg-[#0A6E3D]/5 rounded-2xl p-4 mb-4">
                  <p className="text-xs text-gray-500">Balance</p>
                  <p className="text-2xl font-bold">₿ 12,450.00</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Send', 'Receive', 'Pay', 'QR'].map((label) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-[#0A6E3D]/5 transition cursor-pointer">
                      <p className="text-sm font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-[#0A6E3D]">EthioPay</span>?
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Experience the future of Ethiopian fintech with features designed for you.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Elite Security', desc: 'Bank-grade encryption protecting every transaction.' },
              { title: 'Instant Transfers', desc: 'Send and receive money in seconds.' },
              { title: 'Rewards & Offers', desc: 'Earn cashback on every transaction.' },
            ].map((feature, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-2xl p-8 text-center hover:shadow-xl transition hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#0A6E3D]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A6E3D]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to join Ethiopia's smartest <br />
              <span className="text-[#C89B2B]">digital wallet</span>?
            </h2>
            <Link
              to="/register"
              className="inline-block bg-[#C89B2B] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#A87B1A] transition shadow-lg shadow-[#C89B2B]/30"
            >
              Create Free Account →
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-[#0A6E3D]">EthioPay</span>
              </div>
              <p className="text-sm text-gray-400">
                Pioneering financial inclusion for every Ethiopian.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">📱</a>
                <a href="#" className="text-gray-400 hover:text-white transition">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition">📷</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} EthioPay. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;