'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Direct Inquiries</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">VIP Tables & Contact</h1>
          <p className="text-neutral-400 text-sm">
            For bespoke table reservations, DJ submissions, and brand collaborations, reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8 bg-[#0D0D0D] border border-[#1A1A1A] p-8 rounded-3xl">
            <h2 className="text-xl font-black uppercase text-white">Direct Connect</h2>
            <div className="space-y-6 text-sm">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222] text-[#00FF66]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase text-neutral-500 font-bold block">Email</span>
                  <span className="font-bold">contact@soundbound.ae</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-300">
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222] text-[#00FF66]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase text-neutral-500 font-bold block">WhatsApp VIP</span>
                  <span className="font-bold">+971 50 000 0000</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-300">
                <div className="p-3 rounded-xl bg-[#141414] border border-[#222] text-[#00FF66]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase text-neutral-500 font-bold block">Base</span>
                  <span className="font-bold">Dubai, United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#0D0D0D] border border-[#1A1A1A] p-8 rounded-3xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#00FF66] mx-auto" />
                <h3 className="text-2xl font-black uppercase">Inquiry Received</h3>
                <p className="text-sm text-neutral-400">Our concierge team will reach out via WhatsApp / Email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-black uppercase text-white mb-6">VIP Table Reservation</h2>
                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Smith"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Inquiry Type</label>
                  <select className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]">
                    <option>VIP Table Reservation (Halloween at Rumba)</option>
                    <option>DJ / Artist Booking</option>
                    <option>Sponsorship / Brand Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Special Requests / Group Size</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Table for 8 guests, arriving around 11:30 PM"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)]"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}