// client/src/components/landing/Features.jsx
import { motion } from 'framer-motion';
import { Shield, Zap, Gift } from 'lucide-react';
import { Container } from './Container';

const features = [
  {
    icon: Shield,
    title: 'Elite Security',
    description: 'Bank-grade encryption with NIBE standards protecting every transaction.',
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    description: 'Send and receive money in seconds with zero downtime.',
  },
  {
    icon: Gift,
    title: 'Rewards & Offers',
    description: 'Earn cashback and exclusive offers on every transaction.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">EthioPay</span>?
          </h2>
          <p className="text-lg text-[#64748B]">
            Experience the future of Ethiopian fintech with features designed for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#F8FAFC] rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-[#0A6E3D]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0A6E3D] transition-colors group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-[#0A6E3D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-[#64748B] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;