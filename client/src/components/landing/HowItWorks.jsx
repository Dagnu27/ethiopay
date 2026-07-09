// client/src/components/landing/HowItWorks.jsx
import { motion } from 'framer-motion';
import { UserPlus, Link as LinkIcon, Send } from 'lucide-react';
import { Container } from './Container';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up with your phone number or email address in minutes.',
  },
  {
    number: '02',
    icon: LinkIcon,
    title: 'Link Your Bank',
    description: 'Connect your bank account or card for seamless transactions.',
  },
  {
    number: '03',
    icon: Send,
    title: 'Transact Freely',
    description: 'Send, receive, and manage your money with ease.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Getting Started in <span className="bg-gradient-to-r from-[#0A6E3D] to-[#C89B2B] bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-[#64748B]">
            Join thousands of users who have simplified their financial lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0A6E3D]/10 text-[#0A6E3D] font-bold text-2xl mb-4 mx-auto">
                {step.number}
              </div>
              <div className="w-14 h-14 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-[#0A6E3D]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-[#64748B]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;