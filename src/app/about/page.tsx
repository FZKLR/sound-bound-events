import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Music, Flame, Sparkles, Disc3 } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full space-y-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#00F0FF] font-black">Our Ethos</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Bound by Sound. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#00FF66]">
              Built for the Night.
            </span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-medium">
            Sound Bound Events is a Dubai-born nightlife collective founded on one uncompromising principle: delivering pure underground soundscapes, immersive social energy, and elite venue production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card space-y-4 border border-[#1A1A1A] hover:border-[#00FF66]/40 transition-all">
            <Music className="w-8 h-8 text-[#00FF66]" />
            <h3 className="text-xl font-black uppercase">Pure Sound Policy</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We bypass generic commercial playlists in favor of deep tech, minimal house, and hypnotic groove-driven sets curated by leading local and international talent.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4 border border-[#1A1A1A] hover:border-[#00F0FF]/40 transition-all">
            <Flame className="w-8 h-8 text-[#00F0FF]" />
            <h3 className="text-xl font-black uppercase">Venue Transformations</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From intimate club takeovers to warehouse spaces, every event features bespoke lighting rigs, synchronized lasers, and heavy bass production.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4 border border-[#1A1A1A] hover:border-[#00FF66]/40 transition-all">
            <Disc3 className="w-8 h-8 text-[#00FF66]" />
            <h3 className="text-xl font-black uppercase">Curated Movement</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A community of music lovers, night owls, and tastemakers connected under a shared passion for high-energy underground gatherings.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}