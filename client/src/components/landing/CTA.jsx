// client/src/components/landing/CTA.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { Container } from './Container';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#0A6E3D] to-[#08532E]">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to join Ethiopia's smartest <br />
            <span className="text-[#C89B2B]">digital wallet</span>?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Start your journey to financial freedom today.
          </p>
          <Link to="/register">
            <Button variant="gold" icon={ArrowRight} size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTA;