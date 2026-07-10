import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Community from '../components/landing/Community';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import Stats from '../components/landing/Stats';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import '../styles/landing.css';

const Landing = () => {
  useEffect(() => {
    document.title = 'EthioPay - The Future of Financial Freedom in Ethiopia';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Community />
      <HowItWorks />
      <Testimonials />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;