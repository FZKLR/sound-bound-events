import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sound Bound Events | Dubai Social Experiences",
  description: "Curated nightlife, underground sounds, and elite club takeovers across Dubai. Get official passes and VIP table reservations.",
  openGraph: {
    title: "Sound Bound Events — Bound by Sound. Built for the Night.",
    description: "Halloween Special at Rumba Club, Dubai. Book official tickets and backstage VIP passes directly.",
    url: "https://sound-bound-events.netlify.app",
    siteName: "Sound Bound Events",
    locale: "en_AE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}