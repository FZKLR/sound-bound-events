import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#141414] bg-[#080808] py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#00FF66]" />
            <span className="font-black text-lg tracking-widest uppercase text-white">SOUND BOUND</span>
          </div>
          <p className="text-xs text-neutral-500 max-w-sm">
            Curated nightlife and underground music movements across premier venues in Dubai, UAE.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-bold text-neutral-400">
          <Link href="/" className="hover:text-[#00FF66] transition">Home</Link>
          <Link href="/events" className="hover:text-[#00FF66] transition">Events</Link>
          <Link href="/about" className="hover:text-[#00FF66] transition">About</Link>
          <Link href="/contact" className="hover:text-[#00FF66] transition">VIP Tables</Link>
          <Link href="/admin" className="hover:text-white transition">Admin</Link>
        </div>

        <div className="text-xs text-neutral-500 uppercase tracking-widest">
          © 2026 SOUND BOUND EVENTS • DUBAI
        </div>
      </div>
    </footer>
  );
}