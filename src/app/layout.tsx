import type { Metadata } from 'next';
import './globals.css';
import AudioWaveBackground from '@/Components/AudioWaveBackground';
import SoundPlayer from '@/Components/SoundPlayer';

export const metadata: Metadata = {
  title: 'SOUND BOUND | Dubai Social Experiences & Underground Events',
  description: 'Curated nightlife takeovers, deep tech-house, and elite party spaces across Dubai. Official tickets and VIP passes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030303] text-white antialiased selection:bg-[#00FF66] selection:text-black min-h-screen flex flex-col relative bg-grid-pattern">
        {/* Global Dynamic Audio Visualizer & Particles */}
        <AudioWaveBackground />
        
        {/* Global Floating Sound Player Preview */}
        <SoundPlayer />

        {/* Dynamic Page Content */}
        {children}
      </body>
    </html>
  );
}