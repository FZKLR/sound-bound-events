'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Users, Ticket, DollarSign, Calendar, MapPin, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: eventsData } = await supabase.from('events').select('*, ticket_tiers(*)').order('created_at', { ascending: false });
    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

    setEvents(eventsData || []);
    setOrders(ordersData || []);
    setLoading(false);
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('events').insert({
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      venue,
      event_date: new Date(date).toISOString(),
      is_published: true,
    });

    if (!error) {
      setTitle('');
      setSlug('');
      setVenue('');
      setDate('');
      fetchData();
    } else {
      alert(error.message);
    }
    setIsSubmitting(false);
  };

  const totalRevenue = orders.reduce((acc, order) => acc + (Number(order.total_amount) || 0), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 selection:bg-[#00FF66] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00FF66] font-bold">Management Portal</span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1">Sound Bound Admin</h1>
          </div>
          <Link href="/" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-[#00FF66] transition flex items-center gap-1.5 font-bold">
            <ArrowLeft className="w-4 h-4" /> Live Website
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex items-center gap-4">
            <div className="p-3.5 bg-[#00FF66]/10 text-[#00FF66] rounded-xl border border-[#00FF66]/20">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Total Sales</span>
              <p className="text-2xl font-black text-white">{totalRevenue.toFixed(2)} AED</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex items-center gap-4">
            <div className="p-3.5 bg-[#00FF66]/10 text-[#00FF66] rounded-xl border border-[#00FF66]/20">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Tickets Sold</span>
              <p className="text-2xl font-black text-white">{orders.length}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex items-center gap-4">
            <div className="p-3.5 bg-[#00FF66]/10 text-[#00FF66] rounded-xl border border-[#00FF66]/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Active Events</span>
              <p className="text-2xl font-black text-white">{events.length}</p>
            </div>
          </div>
        </div>

        {/* Add Event + Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Event Form */}
          <div className="lg:col-span-5 bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8">
            <h2 className="text-base font-black uppercase tracking-wider mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#00FF66]" /> Create New Event
            </h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Event Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neon Horizon Night"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. neon-horizon-dubai"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Venue</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rumba Club, Dubai"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 font-bold mb-1.5">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#222] text-sm text-white focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition text-xs flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Event'}
              </button>
            </form>
          </div>

          {/* Event Inventory & Door List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8">
              <h2 className="text-base font-black uppercase tracking-wider mb-4">Event Inventory</h2>
              {loading ? (
                <div className="py-6 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#00FF66]" /></div>
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev.id} className="p-4 rounded-xl bg-[#141414] border border-[#222] flex justify-between items-center">
                      <div>
                        <h3 className="font-black uppercase text-sm">{ev.title}</h3>
                        <p className="text-xs text-neutral-400">{ev.venue} • {new Date(ev.event_date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-[11px] px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] font-bold uppercase border border-[#00FF66]/20">
                        {ev.ticket_tiers?.length || 0} Tiers
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Door List / Attendee Verification */}
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8">
              <h2 className="text-base font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00FF66]" /> Door Check-In List
              </h2>
              {orders.length === 0 ? (
                <p className="text-xs text-neutral-500 py-3">No attendee records yet. Orders will populate here once placed.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#222] text-neutral-400 uppercase text-[10px]">
                        <th className="pb-3 font-bold">Customer</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                      {orders.map((o) => (
                        <tr key={o.id}>
                          <td className="py-3 font-bold">{o.customer_name || 'Guest'}<br/><span className="text-neutral-500 font-normal text-[11px]">{o.customer_email}</span></td>
                          <td className="py-3"><span className="text-[#00FF66] font-black uppercase">{o.payment_status}</span></td>
                          <td className="py-3 font-black">{o.total_amount} AED</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}