import { Suspense } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import EventDetailClient from '@/Components/EventDetailClient';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const { data: events } = await supabase.from('events').select('slug');
    if (events && events.length > 0) {
      return events.map((event) => ({ slug: event.slug }));
    }
  } catch (e) {
    // build time fallback
  }
  return [{ slug: 'halloween-rumba-dubai' }];
}

// Inner async component that resolves params and fetches data inside Suspense
async function EventContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let eventData: {
    title?: string | null;
    venue?: string | null;
    event_date?: string | null;
    description?: string | null;
    ticket_tiers?: {
      id: string | number;
      name: string;
      price: number | string;
    }[] | null;
  } | null = null;
  try {
    const { data } = await supabase
      .from('events')
      .select('*, ticket_tiers(*)')
      .eq('slug', slug)
      .single();
    eventData = data;
  } catch (e) {
    // fallback if supabase is unreachable at build time
  }

  const formattedEvent = {
    title: eventData?.title || 'Sound Bound: Halloween Special',
    venue: eventData?.venue || 'Rumba Club, Dubai',
    date: eventData?.event_date ? new Date(eventData.event_date).toLocaleDateString() : 'Saturday, Oct 31, 2026',
    time: '10:00 PM – Late',
    description: eventData?.description || 'Sound Bound takes over Rumba Club for an immersive nightlife experience. Deep beats, high energy, and unbound sound.',
    musicPolicy: 'Tech House / Minimal / Deep',
    dressCode: 'Halloween Chic / Costumes',
  };

  const defaultTiers = [
    { id: 'early', name: 'Early Bird Admission', price: 120, desc: 'Entry before 11:30 PM. Limited slots.' },
    { id: 'general', name: 'General Admission', price: 180, desc: 'Full night entry + 1 complimentary drink.' },
    { id: 'vip', name: 'VIP Backstage Access', price: 350, desc: 'Queue skip & exclusive backstage bar access.' },
    { id: 'table', name: 'VIP Table (Up to 6 Pax)', price: 2500, desc: 'Reserved table, 2 bottles & mixers included.' },
  ];

  const tiers = (eventData?.ticket_tiers && eventData.ticket_tiers.length > 0)
    ? eventData.ticket_tiers.map((t) => ({
        id: String(t.id),
        name: t.name,
        price: Number(t.price),
        desc: 'Instant QR ticket delivered to email.',
      }))
    : defaultTiers;

  return <EventDetailClient slug={slug} initialEvent={formattedEvent} tiers={tiers} />;
}

// Root page wrapper with Suspense boundary
export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-[#00FF66]" />
          </div>
        }
      >
        <EventContent params={params} />
      </Suspense>
      <Footer />
    </div>
  );
}