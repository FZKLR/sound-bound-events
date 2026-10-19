import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Music, Flame, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Our Philosophy</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Bound by Sound. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FF66]">
              Built for the Night.
            </span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Sound Bound Events is a Dubai-born nightlife collective founded on one principle: delivering uncompromised underground music culture, electric social energy, and premier venue production.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A] space-y-4">
            <Music className="w-8 h-8 text-[#00FF66]" />
            <h3 className="text-xl font-black uppercase">Pure Sound Curation</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We skip generic commercial sets in favor of deep tech, minimal house, and infectious underground rhythms curated by top talent.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A] space-y-4">
            <Flame className="w-8 h-8 text-[#00FF66]" />
            <h3 className="text-xl font-black uppercase">Venue Takeovers</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From iconic beach clubs to underground lounges and warehouse spaces, every venue is transformed with custom green lighting and sound.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A] space-y-4">
            <Sparkles className="w-8 h-8 text-[#00FF66]" />
            <h3 className="text-xl font-black uppercase">Community First</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A curated community of music enthusiasts, tastemakers, and partygoers connected by a shared passion for high-energy nights.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}