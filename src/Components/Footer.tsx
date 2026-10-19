'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'VIP & Contact' },
  ];

  return (
    <header className="border-b border-[#141414] bg-[#050505]/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00FF66] shadow-[0_0_12px_#00FF66]" />
          <span className="font-black text-xl tracking-widest uppercase">SOUND BOUND</span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8 text-xs font-bold tracking-widest uppercase text-neutral-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[#00FF66] ${
                pathname === link.href ? 'text-[#00FF66]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events/halloween-rumba-dubai"
            className="hidden sm:inline-block px-5 py-2.5 bg-[#00FF66] text-black font-extrabold rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:opacity-90 transition"
          >
            Get Tickets
          </Link>
        </nav>
      </div>
    </header>
  );
}