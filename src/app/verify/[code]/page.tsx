'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, XCircle, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';

type VerifiedOrder = {
  id: string;
  payment_status: string;
  ticket_tiers: { name: string } | null;
  customer_name: string | null;
  customer_email: string | null;
  total_amount: number | string;
};

function VerificationContent() {
  const params = useParams();
  const ticketCode = params?.code as string;

  const [order, setOrder] = useState<VerifiedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    async function verifyTicket() {
      if (!ticketCode) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, ticket_tiers(*)')
          .or(`ticket_code.eq.${ticketCode},stripe_session_id.eq.${ticketCode}`)
          .single();

        if (error) {
          console.error(error);
        } else {
          setOrder(data);
          setIsCheckedIn(data.payment_status === 'checked_in');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    verifyTicket();
  }, [ticketCode]);

  const handleCheckIn = async () => {
    if (!order) return;
    setCheckingIn(true);

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      });

      const result = await res.json();

      if (result.success) {
        setIsCheckedIn(true);
      } else {
        alert(result.error || 'Failed to update check-in status');
      }
    } catch (e) {
      alert('Error updating check-in status');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
        <Loader2 className="w-10 h-10 animate-spin text-[#00FF66]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-[#00FF66] selection:text-black">
        <div className="max-w-md w-full bg-[#0D0D0D] border border-red-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
            <XCircle className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-red-400 font-bold">Verification Failed</span>
          <h1 className="text-2xl font-black uppercase">Invalid Ticket Pass</h1>
          <p className="text-xs text-neutral-400">This QR code does not match any confirmed booking in the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-[#00FF66] selection:text-black">
      <div className="max-w-md w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {isCheckedIn ? (
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <AlertCircle className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-black">Already Used</span>
            <h1 className="text-3xl font-black uppercase">Guest Checked In</h1>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center mx-auto text-[#00FF66] shadow-[0_0_25px_rgba(0,255,102,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#00FF66] font-black">Valid Entry Pass</span>
            <h1 className="text-3xl font-black uppercase">Verified Ticket</h1>
          </div>
        )}

        {/* Ticket Details */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#222] text-left text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#222]">
            <span className="text-neutral-500 font-bold uppercase text-[10px]">Tier</span>
            <span className="text-[#00FF66] font-black uppercase text-xs">
              {order.ticket_tiers?.name || 'General Admission'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-neutral-500 font-bold uppercase text-[10px]">Attendee</span>
            <h3 className="font-bold text-sm text-white uppercase">{order.customer_name}</h3>
            <p className="text-neutral-400 text-xs">{order.customer_email}</p>
          </div>

          <div className="pt-2 border-t border-[#222] flex justify-between text-neutral-400 text-[11px]">
            <span>Amount Paid:</span>
            <span className="text-white font-bold">{order.total_amount} AED</span>
          </div>
        </div>

        {/* Action Button */}
        {!isCheckedIn ? (
          <button
            onClick={handleCheckIn}
            disabled={checkingIn}
            className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:opacity-90 transition active:scale-95 flex items-center justify-center gap-2 text-xs"
          >
            {checkingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Door Check-In'}
          </button>
        ) : (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Pass Marked as Checked In
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Official Sound Bound Door Security
        </div>
      </div>
    </div>
  );
}

export default function TicketVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
          <Loader2 className="w-10 h-10 animate-spin text-[#00FF66]" />
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}