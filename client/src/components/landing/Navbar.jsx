// client/src/components/landing/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wallet, Send } from 'lucide-react';
import { Button } from '../Button';
import { Container } from './Container';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0A6E3D] rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0A6E3D]">EthioPay</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Testimonials</a>
            <Link to="/register" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Sign Up</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button icon={Send}>Get Started</Button>
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">How It Works</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Testimonials</a>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#0A6E3D] transition">Sign In</Link>
              <Link to="/register">
                <Button className="w-full justify-center" icon={Send}>Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;