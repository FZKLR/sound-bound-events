'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, ShieldCheck, Music, Sparkles, Loader2 } from 'lucide-react';

export default function EventDetailPage() {
  const [selectedTier, setSelectedTier] = useState('general');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const tiers = [
    { id: 'early', name: 'Early Bird Admission', price: 120, desc: 'Entry before 11:30 PM. Limited slots.' },
    { id: 'general', name: 'General Admission', price: 180, desc: 'Full night entry + 1 complimentary drink.' },
    { id: 'vip', name: 'VIP Backstage Access', price: 350, desc: 'Queue skip & exclusive backstage bar access.' },
    { id: 'table', name: 'VIP Table (Up to 6 Pax)', price: 2500, desc: 'Reserved table, 2 bottles & mixers included.' },
  ];

  const activeTier = tiers.find((t) => t.id === selectedTier) || tiers[1];

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
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      alert('Checkout error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full space-y-12">
        {/* Event Banner */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-8 md:p-12 space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] text-xs font-bold uppercase border border-[#00FF66]/20">
            Halloween 2026 Edition
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Sound Bound: Halloween Special
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-neutral-300 pt-2">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF66]" /> Saturday, Oct 31, 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00FF66]" /> 10:00 PM – Late</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FF66]" /> Rumba Club, Dubai</span>
          </div>
        </div>

        {/* Details & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event Intel & Tier Picker */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">Event Information</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sound Bound takes over Rumba Club for an immersive Halloween night experience. Expect dark minimal grooves, heavy basslines, and top-tier crowd energy. Costumes are highly encouraged.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-neutral-500 font-bold uppercase">Music Policy</span>
                  <p className="text-white font-bold mt-1">Tech House / Minimal / Deep</p>
                </div>
                <div className="p-4 rounded-xl bg-[#141414] border border-[#222]">
                  <span className="text-neutral-500 font-bold uppercase">Dress Code</span>
                  <p className="text-white font-bold mt-1">Halloween Chic / Costumes</p>
                </div>
              </div>
            </div>

            {/* Ticket Tiers */}
            <div className="space-y-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">Select Ticket Tier</h2>
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    selectedTier === tier.id
                      ? 'border-[#00FF66] bg-[#00FF66]/5 shadow-[0_0_20px_rgba(0,255,102,0.15)]'
                      : 'border-[#1C1C1C] bg-[#0D0D0D] hover:border-[#333]'
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-base uppercase">{tier.name}</h3>
                    <p className="text-xs text-neutral-400">{tier.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-2xl font-black text-[#00FF66]">{tier.price} AED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout Box */}
          <div className="lg:col-span-5 bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8 sticky top-28">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6">Order Summary</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#222]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm uppercase">{activeTier.name}</span>
                  <span className="text-[#00FF66] font-black text-lg">{activeTier.price} AED</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-neutral-400 mt-4 pt-3 border-t border-[#222]">
                  <span>Quantity</span>
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
                  <span className="text-xs font-bold uppercase text-neutral-400">Total</span>
                  <span className="text-3xl font-black text-[#00FF66]">
                    {activeTier.price * quantity} AED
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
                >
                  {isCheckingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Proceed to Checkout'}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 mt-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Official Door Pass with QR
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}