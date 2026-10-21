'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

export default function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=tech-house-vibes-112199.mp3"
      />
      <div className="flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#00FF66]/30 shadow-[0_0_25px_rgba(0,255,102,0.25)] hover:border-[#00F0FF]/60 transition-all">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FF66] to-[#00F0FF] text-black flex items-center justify-center font-bold hover:scale-105 transition"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
        </button>

        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-black">Sound Bound Radio</span>
          <span className="text-xs font-bold text-white">Halloween Tech Preview</span>
        </div>

        {/* Live Audio Visualizer Bars */}
        <div className="flex items-end gap-1 h-4 ml-2">
          <span className={`w-0.5 bg-[#00FF66] rounded-full transition-all ${isPlaying ? 'h-4 animate-bounce' : 'h-1'}`} />
          <span className={`w-0.5 bg-[#00F0FF] rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce delay-75' : 'h-2'}`} />
          <span className={`w-0.5 bg-[#00FF66] rounded-full transition-all ${isPlaying ? 'h-4 animate-bounce delay-150' : 'h-1'}`} />
          <span className={`w-0.5 bg-[#00F0FF] rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce delay-100' : 'h-1.5'}`} />
        </div>
      </div>
    </div>
  );
}