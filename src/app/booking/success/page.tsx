'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft, ShieldCheck, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-16 selection:bg-[#00FF66] selection:text-black">
      <div className="max-w-md w-full bg-[#0D0D0D] border border-[#1C1C1C] rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00FF66]/15 blur-[90px] pointer-events-none rounded-full" />

        <div className="w-16 h-16 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center mx-auto mb-6 text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.2)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Booking Confirmed</span>
        <h1 className="text-3xl font-black uppercase mt-2 tracking-tight">You're on the list!</h1>
        
        <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Your payment was processed successfully. Present your booking reference or name at the door for entry.
        </p>

        {/* Digital Ticket Card */}
        <div className="mt-6 p-5 rounded-2xl bg-[#141414] border border-[#222] text-left text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#222]">
            <span className="font-bold uppercase tracking-wider text-neutral-400 text-[10px]">Event Pass</span>
            <span className="px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] font-bold text-[10px] uppercase">Confirmed</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-black text-sm uppercase text-white">Sound Bound: Halloween Special</h3>
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-[#00FF66]" /> Saturday, Oct 31, 2026 • 10:00 PM
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#00FF66]" /> Rumba Club, Dubai
            </div>
          </div>

          {sessionId && (
            <div className="flex justify-between items-center text-neutral-500 pt-2 border-t border-[#222] font-mono text-[10px]">
              <span>Reference Code</span>
              <span className="text-neutral-300 font-bold">{sessionId.slice(-10).toUpperCase()}</span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)]"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Official Sound Bound Ticket Verification
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <SuccessContent />
    </Suspense>
  );
}