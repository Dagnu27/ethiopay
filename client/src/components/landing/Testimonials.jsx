// client/src/components/landing/Testimonials.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Container } from './Container';

const testimonials = [
  {
    name: 'Selamawit Tadesse',
    role: 'Small Business Owner',
    photo: 'S',
    quote: 'EthioPay has revolutionized how I manage my business finances. Instant transfers and secure payments have made my life so much easier.',
    rating: 5,
  },
  {
    name: 'Abebe Kebede',
    role: 'Software Engineer',
    photo: 'A',
    quote: 'The best digital wallet in Ethiopia. Fast, reliable, and the customer support is outstanding. I recommend it to everyone I know.',
    rating: 5,
  },
  {
    name: 'Helen Gebre',
    role: 'Freelance Designer',
    photo: 'H',
    quote: 'I love how easy it is to send and receive money. The QR code feature is a game-changer for my freelance business.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#F8FAFC]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hear From the <span className="bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-lg text-[#64748B]">
            Real stories from real users who trust EthioPay.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C89B2B] text-[#C89B2B]" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-[#0F172A] leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A6E3D]/10 flex items-center justify-center text-[#0A6E3D] font-bold text-lg">
                    {testimonials[currentIndex].photo}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0F172A]">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-[#64748B]">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronLeft className="w-6 h-6 text-[#0A6E3D]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronRight className="w-6 h-6 text-[#0A6E3D]" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;