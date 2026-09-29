import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const AudioPlayer = ({ autoStarted = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoStarted && !isPlaying) {
      soundEngine.startBGM();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [autoStarted]);

  const togglePlay = () => {
    soundEngine.init();
    const active = soundEngine.toggleBGM();
    setIsPlaying(active);
    setHasInteracted(true);
    if (active) {
      soundEngine.playSparkleFX();
    }
  };

  const toggleMute = () => {
    soundEngine.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <div className="glass-panel px-3.5 py-2 rounded-full flex items-center gap-3 border border-pink-500/30 shadow-[0_0_20px_rgba(255,105,180,0.25)] bg-[#120F19]/90 backdrop-blur-xl">
        {/* Animated Equalizer Bars */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 text-xs font-medium text-pink-200 hover:text-white transition-colors group"
          title={isPlaying ? "Pause Birthday Melody" : "Play Birthday Melody"}
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-pink-500/20 group-hover:bg-pink-500/30 border border-pink-400/40 transition-all">
            <Music className={`w-3.5 h-3.5 text-pink-300 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold flex items-center gap-1">
              Melody <Sparkles className="w-2.5 h-2.5 text-pink-300" />
            </span>
            <span className="text-xs text-white/90 font-medium">
              {isPlaying ? "Moto's Lullaby" : "Tap to Play"}
            </span>
          </div>

          {/* Equalizer Visualizer */}
          <div className="flex items-end gap-0.5 h-4 px-1">
            <span className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5'}`}></span>
            <span className={`w-1 bg-pink-300 rounded-full transition-all duration-300 ${isPlaying ? 'h-2.5 animate-pulse delay-75' : 'h-1.5'}`}></span>
            <span className={`w-1 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? 'h-4.5 animate-pulse delay-150' : 'h-1.5'}`}></span>
            <span className={`w-1 bg-pink-200 rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse delay-100' : 'h-1.5'}`}></span>
          </div>
        </button>

        <div className="w-[1px] h-5 bg-white/15"></div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-1 text-slate-400 hover:text-pink-300 transition-colors"
          title={isMuted ? "Unmute" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
        </button>
      </div>
    </div>
  );
};
