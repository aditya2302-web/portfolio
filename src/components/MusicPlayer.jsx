import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ isPlaying, toggleMusic }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(65);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (window.realmAudio) {
      window.realmAudio.toggleMute();
    }
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (window.realmAudio) {
      window.realmAudio.setVolume(val / 100);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 bg-[#0B0D12]/90 border border-[#8F7238] rounded-full px-5 py-2.5 flex items-center gap-4 backdrop-blur-xl shadow-2xl hover:border-[#C5A15B] transition-all">
      <button
        onClick={toggleMusic}
        className="text-[#C5A15B] hover:text-[#FFE28A] hover:scale-110 transition-transform"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="flex flex-col">
        <span className="font-serif text-[11px] font-bold tracking-wider text-[#E7E1D5] uppercase">
          Crown &amp; Cipher
        </span>
        <span className="text-[9px] text-[#C5A15B] tracking-widest uppercase font-mono">
          {isPlaying ? 'ORCHESTRA PLAYING' : 'ATMOSPHERIC SUITE'}
        </span>
      </div>

      <button
        onClick={toggleMute}
        className="text-[#C5A15B] hover:text-[#FFE28A] transition-colors"
        aria-label="Mute"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolume}
        className="w-16 h-1 bg-white/20 accent-[#C5A15B] rounded cursor-pointer hidden sm:block"
        aria-label="Volume"
      />
    </div>
  );
}
