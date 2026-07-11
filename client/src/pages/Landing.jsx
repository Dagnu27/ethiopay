import { Link } from 'react-router-dom';
import { Container } from '../components/landing/Container';
import '../styles/landing.css';

// Import all images
import heroPhone from '/images/hero/hero-phone.png';
import heroBackground from '/images/hero/hero-background.png';
import heroEthiopia from '/images/hero/hero-ethiopia.png';

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
import logoEthioPay from '/images/logos/logo-ethiopay.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={logoEthioPay} 
                alt="EthioPay" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/40x40/0A6E3D/FFFFFF?text=E';
                }}
              />
              <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-[#0A6E3D] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#08532E] transition shadow-lg shadow-[#0A6E3D]/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center pt-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        
        <Container className="relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#0A6E3D]/10 text-[#0A6E3D] px-4 py-1 rounded-full text-sm font-medium mb-4 flex items-center gap-2">
                <img src={iconShield} alt="Shield" className="h-4 w-4" />
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
                  className="bg-[#0A6E3D] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#08532E] transition shadow-lg shadow-[#0A6E3D]/20 flex items-center gap-2"
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
                  <img src={community1} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src={community2} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src={community3} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">10k+ New Users</p>
                  <p className="text-sm text-gray-500">Joined this month</p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-[320px] h-[640px]">
                <div className="absolute -inset-8 bg-[#0A6E3D]/20 rounded-full blur-3xl animate-float"></div>
                <div className="relative w-full h-full bg-[#0F172A] rounded-[40px] p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                    <img 
                      src={heroPhone} 
                      alt="EthioPay App" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/320x640/0A6E3D/FFFFFF?text=EthioPay+App';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
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
              { 
                icon: iconSecurity, 
                title: 'Elite Security', 
                desc: 'Bank-grade encryption with NIBE standards protecting every transaction.',
                bg: 'bg-blue-50'
              },
              { 
                icon: iconSpeed, 
                title: 'Instant Transfers', 
                desc: 'Send and receive money in seconds with zero downtime.',
                bg: 'bg-yellow-50'
              },
              { 
                icon: iconRewards, 
                title: 'Rewards & Offers', 
                desc: 'Earn cashback and exclusive offers on every transaction.',
                bg: 'bg-purple-50'
              },
            ].map((feature, i) => (
              <div key={i} className="group bg-[#F8FAFC] rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <img src={feature.icon} alt={feature.title} className="h-8 w-8 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <Container>
          <div className="bg-[#0A6E3D] rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Designed for the <br />
                  <span className="text-[#C89B2B]">Community</span>
                </h2>
                <p className="text-white/80 text-lg">
                  Built by Ethiopians, for Ethiopians. Every feature is designed with our community in mind.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    <img src={community1} alt="Community" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                    <img src={community2} alt="Community" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                    <img src={community3} alt="Community" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">10k+ New Users</p>
                    <p className="text-white/60 text-sm">Joined this month</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-sm bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <img 
                    src={communityMain} 
                    alt="Ethiopian Community" 
                    className="w-full rounded-xl aspect-video object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300/0A6E3D/FFFFFF?text=🇪🇹+Community';
                    }}
                  />
                  <p className="text-white/60 text-center text-sm mt-4">
                    Ethiopian community coming together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What Our <span className="text-[#0A6E3D]">Community</span> Says
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Real stories from real users who trust EthioPay.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Selamawit T.',
                role: 'Business Owner',
                quote: 'EthioPay has revolutionized my business. Instant transfers and secure payments have made my life so much easier.',
                image: user1
              },
              {
                name: 'Abebe K.',
                role: 'Software Engineer',
                quote: 'The best digital wallet in Ethiopia. Fast, reliable, and the customer support is outstanding.',
                image: user2
              },
              {
                name: 'Helen G.',
                role: 'Freelance Designer',
                quote: 'I love how easy it is to send and receive money. The QR code feature is a game-changer for my business.',
                image: user3
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-2xl p-8 hover:shadow-xl transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#C89B2B]">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/48x48/0A6E3D/FFFFFF?text=' + testimonial.name.charAt(0);
                    }}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bank Logos Section */}
      <section className="py-16 bg-[#F8FAFC] border-y border-gray-200">
        <Container>
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by leading Ethiopian Banks</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src={logoCbe} alt="Commercial Bank of Ethiopia" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
            <img src={logoAwash} alt="Awash Bank" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
            <img src={logoDashen} alt="Dashen Bank" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
            <img src={logoAbyssinia} alt="Bank of Abyssinia" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
            <img src={logoCooperative} alt="Cooperative Bank" className="h-12 w-auto grayscale hover:grayscale-0 transition" />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
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
                <img src={logoEthioPay} alt="EthioPay" className="h-10 w-auto" />
                <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
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
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <p className="text-sm text-gray-400 mb-4">Get the latest updates on Ethiopian Fintech.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📱</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-2xl">📷</a>
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