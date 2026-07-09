// client/src/components/landing/Community.jsx
import { Heart } from 'lucide-react';
import { Container } from './Container';

const Community = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
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
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D'].map((letter) => (
                    <div key={letter} className="w-12 h-12 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-semibold">Joined by 10k+ new users</p>
                  <p className="text-white/60 text-sm">this month</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#C89B2B]/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#C89B2B]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Community First</p>
                    <p className="text-white/60 text-sm">Powered by Ethiopians</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  "EthioPay has transformed how I manage my money. It's fast, secure, and truly built for Ethiopians."
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white font-medium">- Abebe Kebede</p>
                  <p className="text-white/60 text-xs">Addis Ababa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Community;