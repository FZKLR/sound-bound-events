'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Disc3,
  MapPin,
  Minus,
  Music2,
  Plus,
  Radio,
  Ticket,
} from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const ticketTiers = [
  {
    id: 'early',
    name: 'Early Bird',
    price: 120,
    description: 'Illustrative advance-entry tier.',
  },
  {
    id: 'general',
    name: 'General Admission',
    price: 180,
    description: 'Illustrative standard-entry tier.',
  },
  {
    id: 'vip',
    name: 'VIP Admission',
    price: 350,
    description: 'Illustrative premium tier. Benefits to be agreed.',
  },
];

const faqs = [
  {
    question: 'What is Sound Bound: Halloween?',
    answer:
      'A proposed Halloween party by Sound Bound, presented here as a concept for Rumba. The final event format and arrangements are still being discussed.',
  },
  {
    question: 'Are the event details confirmed?',
    answer:
      'Not yet. The proposed date and venue shown here are part of this presentation. The lineup, timings, entry requirements, and event policies will be published once agreed.',
  },
  {
    question: 'Can I buy tickets now?',
    answer:
      'This is a demonstration of the booking experience. Ticket names and prices are illustrative, and no payments are being accepted.',
  },
  {
    question: 'Will there be VIP options or table bookings?',
    answer:
      'VIP options and table arrangements can be added once the packages, availability, and booking process have been agreed with the venue.',
  },
];

export default function HomePage() {
  const [selectedTierId, setSelectedTierId] = useState('general');
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeTier =
    ticketTiers.find((tier) => tier.id === selectedTierId) ??
    ticketTiers[0];

  const total = activeTier.price * quantity;

  return (
    <>
      <Navbar />

      <main className="relative z-10 min-w-0 flex-1">
        {/* PRESENTATION NOTICE */}
        <div className="border-b border-white/10 bg-[#080B0A]/90 px-5 py-2.5 text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-neutral-400 sm:text-[10px]">
            Event concept preview
            <span className="mx-2 text-neutral-600">/</span>
            Details subject to confirmation
          </p>
        </div>

        {/* HERO */}
        <section
          aria-labelledby="hero-heading"
          className="relative isolate overflow-hidden px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
        >
          {/* Soft backlight only — no circles or radar rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-x-[12%] top-[24%] h-[240px] bg-gradient-to-r from-[#00FF66]/[0.07] via-[#00F0FF]/[0.10] to-transparent blur-[100px] sm:inset-x-[20%] sm:h-[320px]" />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/60" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
            <div className="mb-8 inline-flex items-center gap-2.5 border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-sm sm:mb-10">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#00FF66]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300 sm:text-xs">
                Sound Bound Presents / Halloween
              </span>
            </div>

            <h1
              id="hero-heading"
              className="w-full max-w-6xl text-[clamp(2.8rem,8.5vw,7.5rem)] font-black uppercase leading-[0.94] tracking-[-0.065em]"
            >
              <span className="block text-white">
                Bound by Sound.
              </span>

              <span className="mt-2 block bg-gradient-to-r from-[#B8FFF0] via-[#00F0FF] to-[#00FF66] bg-clip-text text-transparent sm:mt-3">
                Built for the Night.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mt-8 sm:text-lg">
              This Halloween, step into the sound.
              A night of music, movement, and after-dark energy—
              imagined for Rumba, Dubai.
            </p>

            <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
              <a
                href="#events"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#00FF66] px-7 py-4 text-xs font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#6FFFAB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00FF66]"
              >
                Explore Halloween
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>

              <a
                href="#tickets"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/20 bg-black/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00F0FF]"
              >
                Preview Passes
                <Ticket aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-14 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500 sm:mt-20">
              <span aria-hidden="true" className="h-px w-8 bg-white/15" />
              Halloween / Rumba / Dubai
              <span aria-hidden="true" className="h-px w-8 bg-white/15" />
            </div>
          </div>
        </section>

        {/* BRAND STRIP */}
        <div className="border-y border-white/10 bg-black/35">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { label: 'Sound First', Icon: Music2 },
              { label: 'Halloween Energy', Icon: Radio },
              { label: 'After Dark', Icon: Disc3 },
            ].map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 px-5 py-4 sm:py-5"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 text-[#00FF66]"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED HALLOWEEN EVENT */}
        <section
          id="events"
          aria-labelledby="events-heading"
          className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FF66] sm:text-xs">
                  01 / The Halloween Edition
                </p>

                <h2
                  id="events-heading"
                  className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl"
                >
                  A Night Out of the Ordinary.
                </h2>
              </div>

              <Link
                href="/about"
                className="inline-flex min-h-11 items-center gap-2 self-start text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors hover:text-[#00FF66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00FF66]"
              >
                Meet Sound Bound
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative overflow-hidden border border-white/15 bg-[#080B0A]/90">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-[#00FF66]"
              />

              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:p-14">
                <div>
                  <span className="inline-flex border border-[#00FF66]/25 bg-[#00FF66]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00FF66]">
                    Proposed Event
                  </span>

                  <h3 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                    Sound Bound:
                    <br />
                    <span className="text-[#00FF66]">
                      Halloween.
                    </span>
                  </h3>

                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base">
                    The concept: bring Sound Bound’s party energy
                    to Rumba for a Halloween edition built around
                    music, atmosphere, and a connected dance floor.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {['Halloween Edition', 'Music & Movement', 'Dubai'].map(
                      (label) => (
                        <span
                          key={label}
                          className="border border-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-400"
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <dl className="divide-y divide-white/10 text-sm">
                    <div className="flex items-start gap-4 pb-5">
                      <CalendarDays
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF66]"
                      />

                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Proposed Date
                        </dt>

                        <dd className="mt-1.5 font-medium text-neutral-200">
                          31 October 2026
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 py-5">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#00F0FF]"
                      />

                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Proposed Venue
                        </dt>

                        <dd className="mt-1.5 font-medium text-neutral-200">
                          Rumba, Dubai
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 py-5">
                      <Music2
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF66]"
                      />

                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Lineup & Timings
                        </dt>

                        <dd className="mt-1.5 font-medium text-neutral-200">
                          To be announced
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <a
                    href="#tickets"
                    className="mt-3 inline-flex min-h-12 items-center justify-center gap-3 bg-[#00FF66] px-5 py-4 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-[#6FFFAB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00FF66]"
                  >
                    Explore Passes
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>

                  <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                    Presentation concept. Date and venue subject
                    to agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TICKET PREVIEW */}
        <section
          id="tickets"
          aria-labelledby="tickets-heading"
          className="scroll-mt-24 px-5 pb-16 sm:px-6 sm:pb-24"
        >
          <div className="mx-auto max-w-6xl border-t border-white/10 pt-10 sm:pt-12">
            <div className="mb-8 sm:mb-10">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00F0FF] sm:text-xs">
                02 / Your Way In
              </p>

              <h2
                id="tickets-heading"
                className="text-3xl font-black uppercase tracking-tight sm:text-5xl"
              >
                Choose Your Night.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">
                Explore the proposed booking experience.
                Pass names, prices, and inclusions below are
                illustrative and will be finalized before sales open.
              </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
              <fieldset className="min-w-0 space-y-3">
                <legend className="sr-only">
                  Select an illustrative ticket tier
                </legend>

                {ticketTiers.map((tier) => {
                  const selected = selectedTierId === tier.id;

                  return (
                    <label
                      key={tier.id}
                      className={`relative flex cursor-pointer items-center justify-between gap-4 border p-5 transition-colors sm:p-6 ${
                        selected
                          ? 'border-[#00FF66]/70 bg-[#00FF66]/[0.06]'
                          : 'border-white/10 bg-black/35 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ticket-tier"
                        value={tier.id}
                        checked={selected}
                        onChange={() => setSelectedTierId(tier.id)}
                        className="peer sr-only"
                      />

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#00FF66]"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                              selected
                                ? 'border-[#00FF66] bg-[#00FF66] text-black'
                                : 'border-neutral-600'
                            }`}
                          >
                            {selected && <Check className="h-3 w-3" />}
                          </span>

                          <span className="text-sm font-black uppercase tracking-wide sm:text-lg">
                            {tier.name}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                          {tier.description}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span
                          className={`text-2xl font-black tracking-tight sm:text-3xl ${
                            selected ? 'text-[#00FF66]' : 'text-white'
                          }`}
                        >
                          {tier.price}
                        </span>

                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          AED / Example
                        </span>
                      </div>
                    </label>
                  );
                })}
              </fieldset>

              <div className="border border-white/15 bg-[#080B0A]/95 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-300">
                    Your Night
                  </h3>

                  <span className="border border-[#00F0FF]/25 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#00F0FF]">
                    Demo
                  </span>
                </div>

                <p className="mt-6 text-xs text-neutral-500">
                  Sound Bound: Halloween
                </p>

                <p className="mt-2 text-xl font-black uppercase tracking-tight">
                  {activeTier.name}
                </p>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <span className="text-sm text-neutral-400">
                    Guests
                  </span>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="Decrease guest quantity"
                      disabled={quantity === 1}
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-[#00FF66]/60 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF66]"
                    >
                      <Minus aria-hidden="true" className="h-4 w-4" />
                    </button>

                    <span
                      aria-live="polite"
                      className="min-w-5 text-center text-sm font-bold"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      aria-label="Increase guest quantity"
                      disabled={quantity === 10}
                      onClick={() =>
                        setQuantity((current) => Math.min(10, current + 1))
                      }
                      className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-[#00FF66]/60 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF66]"
                    >
                      <Plus aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-7 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Example Total
                  </span>

                  <p aria-live="polite" className="text-right">
                    <span className="text-3xl font-black tracking-tight text-[#00FF66]">
                      {total.toLocaleString('en-US')}
                    </span>

                    <span className="ml-2 text-xs font-bold text-neutral-400">
                      AED
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  disabled
                  aria-describedby="checkout-preview-note"
                  className="mt-7 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-3 bg-[#00FF66]/70 px-5 py-4 text-xs font-black uppercase tracking-wider text-black"
                >
                  Checkout Preview
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>

                <p
                  id="checkout-preview-note"
                  className="mt-4 text-center text-xs leading-relaxed text-neutral-500"
                >
                  Demonstration only. No payment will be taken.
                  Final pricing and packages are still to be agreed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="px-5 pb-20 sm:px-6 sm:pb-28"
        >
          <div className="mx-auto grid max-w-6xl gap-8 border-t border-white/10 pt-10 sm:pt-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00FF66] sm:text-xs">
                03 / Need to Know
              </p>

              <h2
                id="faq-heading"
                className="text-3xl font-black uppercase tracking-tight sm:text-4xl"
              >
                Before the Night.
              </h2>
            </div>

            <div className="border-t border-white/10">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-white/10"
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold leading-relaxed text-neutral-200 transition-colors hover:text-[#00FF66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00FF66] sm:text-base"
                      >
                        <span>{faq.question}</span>

                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 text-[#00FF66] transition-transform duration-200 motion-reduce:transition-none ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="pb-6 pr-6 text-sm leading-relaxed text-neutral-400"
                    >
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}