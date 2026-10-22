import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Calendar, MapPin, Clock, ArrowRight, Flame, Zap } from 'lucide-react';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 'halloween-rumba-dubai',
      title: 'Sound Bound: Halloween Special',
      date: 'Saturday, Oct 31, 2026',
      time: '10:00 PM – 3:00 AM',
      venue: 'Rumba Club, Dubai',
      price: 'From 120 AED',
      status: 'Confirmed Takeover',
      description: 'Our signature Halloween debut. Deep tech-house rhythms, full venue production, and hypnotic sound.',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full space-y-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 fill-[#00FF66]" /> Official Event Calendar
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Upcoming Takeovers
          </h1>
          <p className="text-neutral-400 text-base">
            Select your edition and secure direct entry passes with instant QR delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-[#1A1A1A] hover:border-[#00F0FF]/40 transition-all"
            >
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-black uppercase tracking-wider border border-[#00F0FF]/30">
                  {event.status}
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{event.title}</h3>
                <div className="flex flex-wrap gap-6 text-sm text-neutral-300 pt-1">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00FF66]" /> {event.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00F0FF]" /> {event.time}</span>
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00FF66]" /> {event.venue}</span>
                </div>
                <p className="text-sm text-neutral-400 max-w-2xl">{event.description}</p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <span className="text-xs uppercase text-neutral-400 font-bold">Passes starting at</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00F0FF]">
                  {event.price}
                </span>
                <Link
                  href={`/events/${event.id}`}
                  className="px-8 py-4 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black uppercase tracking-wider rounded-xl hover:opacity-90 transition flex items-center gap-2 text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Select Passes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}