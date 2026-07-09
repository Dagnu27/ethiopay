// client/src/components/landing/Stats.jsx
import { motion } from 'framer-motion';
import { Users, CreditCard, Activity, Headphones } from 'lucide-react';
import { Container } from './Container';

const stats = [
  { icon: Users, value: '1M+', label: 'Active Users' },
  { icon: CreditCard, value: '50M+', label: 'Transactions' },
  { icon: Activity, value: '99.99%', label: 'Uptime' },
  { icon: Headphones, value: '24/7', label: 'Support' },
];

const Stats = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">
                <stat.icon className="w-8 h-8 text-[#0A6E3D]" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-[#0F172A]">{stat.value}</p>
              <p className="text-sm text-[#64748B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Stats;