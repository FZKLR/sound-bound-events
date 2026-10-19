'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Flame, Sparkles, Music, Loader2 } from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  total_quantity?: number;
  sold_quantity?: number;
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

  // Fetch real-time tiers from Supabase if configured
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
      console.error(err);
      alert('Error initiating checkout. Please check Stripe keys.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00FF66] selection:text-black flex flex-col justify-between relative overflow-hidden">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section with Sound Radar Rings */}
        <section className="relative px-6 pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Animated Sound Wave Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[680px] md:h-[680px] border border-[#00FF66]/15 rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[480px] md:h-[480px] border border-[#00FF66]/25 rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[280px] md:h-[280px] border border-[#00FF66]/35 rounded-full pointer-events-none -z-10 shadow-[0_0_80px_rgba(0,255,102,0.15)]" />

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 mb-8 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> Dubai Social Experiences
          </div>

          {/* Hero Title */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] max-w-5xl">
            Bound by Sound. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00FF66]">
              Built for the Night.
            </span>
          </h1>

          <p className="mt-8 text-neutral-400 max-w-xl text-base sm:text-lg">
            Immersive social parties built around sound, movement, and elite nightlife venues across Dubai.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="#tickets"
              className="px-8 py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,255,102,0.45)] hover:scale-105 transition transform flex items-center gap-2"
            >
              Get Tickets <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about"
              className="px-8 py-4 bg-[#111111] border border-[#222222] hover:border-[#444] text-neutral-200 font-bold uppercase tracking-wider rounded-xl transition"
            >
              Our Story
            </Link>
          </div>
        </section>

        {/* 3. Featured Event Card */}
        <section id="events" className="px-6 py-10 max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A] p-8 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00FF66]/10 blur-[90px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Upcoming Takeover</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Sound Bound: Halloween Special</h2>
                
                <div className="flex flex-wrap gap-6 pt-2 text-sm text-neutral-300">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF66]" /> Saturday, Oct 31, 2026</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00FF66]" /> 10:00 PM – Late</span>
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FF66]" /> Rumba Club, Dubai</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/events/halloween-rumba-dubai"
                  className="px-6 py-4 bg-[#181818] border border-[#2A2A2A] hover:border-[#444] text-white font-bold uppercase tracking-wider rounded-xl transition text-center text-xs"
                >
                  Event Details
                </Link>
                <a
                  href="#tickets"
                  className="px-8 py-4 bg-white text-black hover:bg-[#00FF66] font-black uppercase tracking-wider rounded-xl transition text-center text-xs"
                >
                  Book Passes
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Direct Ticket Purchase Section */}
        <section id="tickets" className="px-6 py-20 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Official Ticketing</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2">Select Passes</h2>
            <p className="text-neutral-400 text-sm mt-3">Instant confirmation and digital entry pass sent to your email.</p>
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
                        ? 'border-[#00FF66] bg-[#00FF66]/5 shadow-[0_0_25px_rgba(0,255,102,0.15)]'
                        : 'border-[#1C1C1C] bg-[#0D0D0D] hover:border-[#333]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-black text-lg uppercase">{tier.name}</h4>
                      <p className="text-xs text-neutral-400">Guaranteed venue admission & official QR pass.</p>
                    </div>

                    <div className="text-right shrink-0 ml-4">
                      <span className="text-2xl font-black text-[#00FF66]">
                        {tier.price} <span className="text-xs font-bold text-neutral-400">AED</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout Box */}
            <div className="lg:col-span-5 bg-[#0D0D0D] border border-[#1C1C1C] rounded-3xl p-6 sm:p-8 sticky top-28">
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6">Reservation Summary</h3>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="p-4 rounded-xl bg-[#141414] border border-[#222]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm uppercase">{activeTier?.name}</span>
                    <span className="text-[#00FF66] font-black text-lg">{activeTier?.price} AED</span>
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
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#242424] text-white focus:outline-none focus:border-[#00FF66] text-sm"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#242424] text-white focus:outline-none focus:border-[#00FF66] text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-[#222]">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold uppercase text-neutral-400">Total Due</span>
                    <span className="text-3xl font-black text-[#00FF66]">
                      {(activeTier?.price || 0) * quantity} AED
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:opacity-90 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
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
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Official Sound Bound Ticket Verification
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 5. Brand Pillars */}
        <section id="about" className="px-6 py-24 border-t border-[#141414] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1C1C1C]">
              <Music className="w-8 h-8 text-[#00FF66] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Curated Sounds</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">High-energy tech-house, minimal grooves, and underground rhythms from top DJs.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1C1C1C]">
              <Flame className="w-8 h-8 text-[#00FF66] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Elite Venues</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Curated club takeovers across Dubai with custom lighting and sound production.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-[#1C1C1C]">
              <ShieldCheck className="w-8 h-8 text-[#00FF66] mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Seamless Entry</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Direct digital check-in with verified QR passes sent immediately to your phone.</p>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Global Footer */}
      <Footer />
    </div>
  );
}