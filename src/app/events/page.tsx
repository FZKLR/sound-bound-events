import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Calendar, MapPin, Clock, ArrowRight, Flame } from 'lucide-react';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 'halloween-rumba-dubai',
      title: 'Sound Bound: Halloween Special',
      date: 'Saturday, Oct 31, 2026',
      time: '10:00 PM – 3:00 AM',
      venue: 'Rumba Club, Dubai',
      price: 'From 120 AED',
      status: 'Selling Fast',
      description: 'Our debut Halloween edition. Deep tech beats, costume vibes, and heavy underground energy.',
    },
  ];

  const pastEvents = [
    {
      title: 'Sound Bound: Secret Warehouse Session',
      date: 'September 2026',
      venue: 'Al Quoz Industrial Area, Dubai',
      attendance: '350+ Guests',
    },
    {
      title: 'Sound Bound: Sunset to Starlight',
      date: 'August 2026',
      venue: 'Palm Jumeirah Rooftop, Dubai',
      attendance: '500+ Guests',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> Event Calendar
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Our Takeovers</h1>
          <p className="text-neutral-400 text-base">
            Explore our upcoming party editions and secure your tickets directly with instant QR delivery.
          </p>
        </div>

        {/* Upcoming Events Grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-wider text-[#00FF66]">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] text-xs font-bold uppercase border border-[#00FF66]/20">
                    {event.status}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{event.title}</h3>
                  <div className="flex flex-wrap gap-6 text-sm text-neutral-300 pt-1">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF66]" /> {event.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00FF66]" /> {event.time}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FF66]" /> {event.venue}</span>
                  </div>
                  <p className="text-sm text-neutral-400 max-w-2xl">{event.description}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <span className="text-xs uppercase text-neutral-400 font-bold">Tickets starting at</span>
                  <span className="text-3xl font-black text-[#00FF66]">{event.price}</span>
                  <Link
                    href={`/events/${event.id}`}
                    className="px-8 py-4 bg-[#00FF66] text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition flex items-center gap-2 text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)]"
                  >
                    Select Tickets <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Archive */}
        <section className="space-y-6 pt-10 border-t border-[#141414]">
          <h2 className="text-xl font-black uppercase tracking-wider text-neutral-400">Past Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((past, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#141414] space-y-2">
                <span className="text-xs text-neutral-500 font-bold uppercase">{past.date}</span>
                <h4 className="font-bold text-lg uppercase text-white">{past.title}</h4>
                <p className="text-xs text-neutral-400">{past.venue} • {past.attendance}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}