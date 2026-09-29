import React, { useState } from 'react';
import { Heart, Sparkles, Trophy, Cake, MessageSquare, Compass, Stars, ArrowRight, BookOpen, Camera, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const HeroSection = ({ onNavigate }) => {
  const [loveCount, setLoveCount] = useState(1024);
  const [hasLiked, setHasLiked] = useState(false);

  const handleSendLove = () => {
    setLoveCount(prev => prev + 1);
    setHasLiked(true);
    soundEngine.playSparkleFX();

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FFB6C1', '#FF4D8D', '#FFA3C8', '#FFFFFF'],
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      {/* Page Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/50 border border-pink-500/40 shadow-[0_0_15px_rgba(255,105,180,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          PAGE 1 OF 6 • WELCOME WORLD
        </span>
      </div>

      {/* Floating Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-br from-pink-500/20 via-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full text-center flex flex-col items-center">
        {/* Floating Relationship Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-medium text-pink-300 border border-pink-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,105,180,0.2)]">
            🎓 College Classmate
          </span>
          <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-medium text-pink-300 border border-pink-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,105,180,0.2)]">
            👭 Sister at Heart
          </span>
          <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-medium text-pink-300 border border-pink-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,105,180,0.2)]">
            🏆 Teammate in Every Battle
          </span>
          <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-medium text-pink-300 border border-pink-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,105,180,0.2)]">
            🛡️ 24/7 Support System
          </span>
        </div>

        {/* Main Glass Card */}
        <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-10 border border-pink-400/40 relative overflow-hidden backdrop-blur-2xl">
          {/* Top Subtle Shine */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

          {/* Birthday Subheading */}
          <div className="flex items-center justify-center gap-2 text-pink-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>Dedicated with Heart & Soul</span>
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
          </div>

          {/* Big Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3 text-white leading-tight">
            Happy Birthday, <br />
            <span className="pink-gradient-text drop-shadow-[0_0_40px_rgba(255,77,141,0.7)]">
              Moto 🎂💖
            </span>
          </h1>

          <div className="text-pink-300 font-serif italic text-lg sm:text-xl mb-6">
            ✨ (The one and only Manya) ✨
          </div>

          {/* Heartfelt Opening Subtext */}
          <div className="relative max-w-2xl mx-auto mb-8 bg-black/40 rounded-2xl p-5 sm:p-6 border border-pink-500/25 text-slate-200 text-sm sm:text-base leading-relaxed text-left sm:text-center shadow-inner">
            <p>
              To my classmate, my friend, my sister, my teammate, my support system.
              From college corridors to every competition we entered (yes, even the ones we didn’t win 😅), 
              you’ve been there. This interactive multi-page birthday world was crafted just for you. Explore each page to discover our memories!
            </p>
          </div>

          {/* Quick Page Explorer Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-2xl mx-auto">
            <button
              onClick={() => onNavigate('story')}
              className="glass-panel hover:bg-pink-900/40 p-3.5 rounded-2xl border border-pink-500/30 flex flex-col items-center gap-1.5 transition-all hover:scale-105 group"
            >
              <BookOpen className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Our Story</span>
              <span className="text-[10px] text-slate-400">College journey</span>
            </button>

            <button
              onClick={() => onNavigate('gallery')}
              className="glass-panel hover:bg-pink-900/40 p-3.5 rounded-2xl border border-pink-500/30 flex flex-col items-center gap-1.5 transition-all hover:scale-105 group"
            >
              <Camera className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Photos & 3D Cube</span>
              <span className="text-[10px] text-slate-400">Special moments</span>
            </button>

            <button
              onClick={() => onNavigate('letter')}
              className="glass-panel hover:bg-pink-900/40 p-3.5 rounded-2xl border border-pink-500/30 flex flex-col items-center gap-1.5 transition-all hover:scale-105 group"
            >
              <MessageSquare className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Heartfelt Letter</span>
              <span className="text-[10px] text-slate-400">5-Part message</span>
            </button>

            <button
              onClick={() => onNavigate('cake')}
              className="pink-btn p-3.5 rounded-2xl flex flex-col items-center gap-1.5 transition-all hover:scale-105 group shadow-[0_0_20px_rgba(255,77,141,0.5)]"
            >
              <Cake className="w-5 h-5 text-white animate-bounce" />
              <span className="text-xs font-bold text-white">Cut Cake</span>
              <span className="text-[10px] text-pink-200">Interactive 3D</span>
            </button>
          </div>

          {/* Bottom Bar: Send Love & Next Page */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={handleSendLove}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/50 text-pink-300 hover:text-white transition-all text-xs font-bold group"
            >
              <Heart className={`w-4 h-4 text-pink-400 group-hover:scale-125 transition-transform ${hasLiked ? 'fill-pink-400' : ''}`} />
              <span>Send Love to Moto ({loveCount})</span>
            </button>

            <button
              onClick={() => onNavigate('story')}
              className="pink-btn px-6 py-2.5 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-[0_0_20px_rgba(255,77,141,0.4)]"
            >
              <span>Begin Story (Page 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
