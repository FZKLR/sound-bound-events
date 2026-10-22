'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Zap, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events & Lineups' },
    { href: '/about', label: 'Ethos & Movement' },
    { href: '/contact', label: 'VIP Tables & Concierge' },
  ];

  return (
    <>
      <header className="border-b border-[#181818] bg-[#030303]/90 backdrop-blur-xl sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#00FF66] opacity-75" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#00FF66] shadow-[0_0_15px_#00FF66]" />
            </div>
            <span className="font-black text-xl tracking-widest uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00FF66] transition-all">
              SOUND BOUND
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-black tracking-widest uppercase text-neutral-400">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#00F0FF] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#tickets"
              className="px-6 py-2.5 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black rounded-xl shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:scale-105 transition-all text-xs"
            >
              Get Tickets
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#111] border border-[#222] text-white hover:text-[#00FF66] transition"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 bg-[#030303]/98 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between p-8 border-t border-[#181818] animate-in fade-in duration-200">
          <div className="space-y-6 pt-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF66] flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-[#00FF66]" /> Rave & Nightlife Collective
            </span>

            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-black uppercase tracking-tight text-white hover:text-[#00FF66] transition py-1 flex items-center justify-between border-b border-[#141414]"
                >
                  {link.label}
                  <ArrowRight className="w-5 h-5 text-neutral-600" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 pb-6">
            <Link
              href="/#tickets"
              onClick={() => setMobileOpen(false)}
              className="w-full py-4 bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,255,102,0.45)] flex items-center justify-center gap-2 text-sm"
            >
              Book Halloween Passes <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-center text-neutral-500 uppercase tracking-widest">
              © 2026 Sound Bound Events • Dubai, UAE
            </p>
          </div>
        </div>
      )}
    </>
  );
}