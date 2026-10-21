'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import AudioWaveBackground from '@/Components/AudioWaveBackground';
import SoundPlayer from '@/Components/SoundPlayer';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Flame, Sparkles, Music, Loader2, Zap } from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  price: number;
}

export default function HomePage() {
  const [tiers, setTiers] = useState<TicketTier[]>([
    { id: 'early', name: 'Early Bird', price: 120 },
    { id: 'general', name: 'General Admission', price: 180 },
    { id: 'backstage', name: 'VIP Backstage Pass', price: 350 },
    { id: 'table', name: 'VIP Table (6 Pax)', price: 2500 },
  ]);

  const [selectedTierId, setSelectedTierId] = useState<string>('general');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    async function loadTiers() {
      const { data } = await supabase
        .from('ticket_tiers')
        .select('*')
        .order('price', { ascending: true });

      if (data && data.length > 0) {
        setTiers(data);
        setSelectedTierId(data[1]?.id || data[0].id);
      }
    }
    loadTiers();
  }, []);

  const activeTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) {
      alert('Please fill in your name and email');
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: activeTier.id,
          tierName: activeTier.name,
          price: activeTier.price,
          quantity,
          eventTitle: 'Sound Bound: Halloween Special',
          customerName,
          customerEmail,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout initialization failed');
      }
    } catch (err) {
      alert('Error initiating checkout.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#00FF66] selection:text-black flex flex-col justify-between relative overflow-hidden bg-grid-pattern">
      {/* 1. Interactive Dual Tone Visualizer Background */}
      <AudioWaveBackground />

      {/* 2. Floating Sound Player Widget */}
      <SoundPlayer />

      {/* 3. Global Header */}
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* 4. Hero Section with Dual Tone Cyber Glow */}
        <section className="relative px-6 pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Dual Glow Backdrops (Neon Green & Electric Cyan) */}
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#00FF66]/15 blur-[160px] pointer-events-none rounded-full" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#00F0FF]/15 blur-[160px] pointer-events-none rounded-full" />

          {/* Sound Radar Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[750px] md:h-[750px] border border-[#00FF66]/10 rounded-full pointer-events-none animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[550px] md:h-[550px] border border-dashed border-[#00F0FF]/20 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[320px] md:h-[320px] border border-[#00FF66]/30 rounded-full pointer-events-none shadow-[0_0_90px_rgba(0,255,102,0.18)]" />

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 mb-8 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(0,255,102,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]" />
            </span>
            Dubai Social Experiences
          </div>

          {/* Main Typography with Dual Gradient */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] max-w-5xl">
            Bound by Sound. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#00FF66] drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">
              Built for the Night.
            </span>
          </h1>

          <p className="mt-8 text-neutral-400 max-w-xl text-base sm:text-lg leading-relaxed font-medium">
            Immersive nightlife takeovers built on deep tech-house, hypnotic sound design, and elite Dubai party spaces.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5 items-center">
            <a
              href="#tickets"
              className="px-9 py-4 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(0,255,102,0.45)] hover:scale-105 transition-all transform flex items-center gap-2.5 text-sm"
            >
              Get Tickets <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about"
              className="px-9 py-4 bg-[#0D0D0D]/80 backdrop-blur-md border border-[#222222] hover:border-[#00F0FF]/50 text-neutral-200 font-bold uppercase tracking-wider rounded-xl transition text-sm"
            >
              Our Story
            </Link>
          </div>
        </section>

        {/* 5. Festival Marquee Ticker */}
        <div className="w-full border-y border-[#1A1A1A] bg-[#080808]/80 backdrop-blur-md py-4 overflow-hidden mb-16">
          <div className="flex gap-12 whitespace-nowrap text-xs font-black uppercase tracking-widest text-neutral-400 animate-pulse">
            <span className="flex items-center gap-2 text-[#00FF66]"><Zap className="w-3.5 h-3.5 fill-[#00FF66]" /> Halloween Takeover @ Rumba Club</span>
            <span className="flex items-center gap-2 text-[#00F0FF]"><Music className="w-3.5 h-3.5" /> Tech House • Minimal • Deep Grooves</span>
            <span className="flex items-center gap-2 text-white"><Flame className="w-3.5 h-3.5 text-[#00FF66]" /> Oct 31, 2026 • Dubai UAE</span>
            <span className="flex items-center gap-2 text-[#00FF66]"><Sparkles className="w-3.5 h-3.5" /> VIP Backstage Tables Available</span>
          </div>
        </div>

        {/* 6. Featured Event Showcase */}
        <section id="events" className="px-6 py-8 max-w-6xl mx-auto">
          <div className="relative rounded-3xl glass-card p-8 md:p-12 overflow-hidden shadow-2xl transition-all border border-[#1A1A1A] hover:border-[#00F0FF]/40">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-[#00F0FF]/15 to-[#00FF66]/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-black uppercase tracking-widest border border-[#00F0FF]/30">
                  Upcoming Edition
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Sound Bound: Halloween Special</h2>
                
                <div className="flex flex-wrap gap-6 pt-2 text-sm text-neutral-300">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF66]" /> Saturday, Oct 31, 2026</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00F0FF]" /> 10:00 PM – Late</span>
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FF66]" /> Rumba Club, Dubai</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
                <Link
                  href="/events/halloween-rumba-dubai"
                  className="px-6 py-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#00F0FF]/50 text-white font-bold uppercase tracking-wider rounded-xl transition text-center text-xs"
                >
                  Event Details
                </Link>
                <a
                  href="#tickets"
                  className="px-8 py-4 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black uppercase tracking-wider rounded-xl transition text-center text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90"
                >
                  Book Passes
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Direct Ticket Purchase Grid */}
        <section id="tickets" className="px-6 py-20 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#00F0FF] font-black">Official Reservation</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Select Passes</h2>
            <p className="text-neutral-400 text-sm">Instant digital ticket delivery with QR code check-in.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tiers List */}
            <div className="lg:col-span-7 space-y-4">
              {tiers.map((tier) => {
                const active = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      active
                        ? 'border-[#00F0FF] bg-gradient-to-r from-[#00FF66]/10 to-[#00F0FF]/10 shadow-[0_0_30px_rgba(0,240,255,0.2)] scale-[1.01]'
                        : 'border-[#1C1C1C] bg-[#0D0D0D]/70 backdrop-blur-md hover:border-[#333]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-black text-lg uppercase tracking-wide">{tier.name}</h4>
                      <p className="text-xs text-neutral-400">Official venue admission & instant mobile pass.</p>
                    </div>

                    <div className="text-right shrink-0 ml-4">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00F0FF]">
                        {tier.price} <span className="text-xs font-bold text-neutral-400">AED</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 sticky top-28 border border-[#1A1A1A]">
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6">Reservation Summary</h3>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="p-4 rounded-xl bg-[#141414]/90 border border-[#222]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm uppercase">{activeTier?.name}</span>
                    <span className="text-[#00F0FF] font-black text-lg">{activeTier?.price} AED</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-4 pt-3 border-t border-[#222]">
                    <span>Pass Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-[#222] hover:bg-[#333] flex items-center justify-center font-bold text-white transition text-sm"
                      >
                        -
                      </button>
                      <span className="text-white font-black text-sm">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-[#222] hover:bg-[#333] flex items-center justify-center font-bold text-white transition text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414]/80 border border-[#242424] text-white focus:outline-none focus:border-[#00F0FF] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414]/80 border border-[#242424] text-white focus:outline-none focus:border-[#00F0FF] text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-[#222]">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold uppercase text-neutral-400">Total</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00F0FF]">
                      {(activeTier?.price || 0) * quantity} AED
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:opacity-95 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                      </>
                    ) : (
                      'Proceed to Payment'
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 mt-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" /> Official Sound Bound Ticket Verification
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 8. Brand Pillars */}
        <section id="about" className="px-6 py-24 border-t border-[#141414] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl glass-card transition-all border border-[#1A1A1A] hover:border-[#00F0FF]/40">
              <Music className="w-8 h-8 text-[#00F0FF] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Curated Sounds</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">High-energy tech-house, minimal grooves, and underground rhythms from top DJs.</p>
            </div>
            <div className="p-8 rounded-3xl glass-card transition-all border border-[#1A1A1A] hover:border-[#00FF66]/40">
              <Flame className="w-8 h-8 text-[#00FF66] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Elite Venues</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Curated club takeovers across Dubai with custom lighting and sound production.</p>
            </div>
            <div className="p-8 rounded-3xl glass-card transition-all border border-[#1A1A1A] hover:border-[#00F0FF]/40">
              <ShieldCheck className="w-8 h-8 text-[#00F0FF] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Seamless Entry</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Direct digital check-in with verified QR passes sent immediately to your phone.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}