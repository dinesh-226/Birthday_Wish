import React, { useState } from 'react';
import { Sparkles, Heart, Gift, ArrowRight, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const IntroScene = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      soundEngine.init();
      soundEngine.startBGM();
      soundEngine.playSparkleFX();
    } catch (e) {
      console.warn("Audio init deferred:", e);
    }

    // Welcome soft confetti
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FF69B4', '#FF4D8D', '#FFFFFF', '#FFA3C8'],
      });
    } catch (e) {}

    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08070B] px-4 cursor-pointer transition-all duration-700 select-none ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow orbs */}
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-pink-600/25 blur-[120px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
      <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-[100px] bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Animated Badge */}
        <div className="mb-6 animate-bounce">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-pink-300 bg-pink-950/60 border border-pink-500/40 shadow-[0_0_25px_rgba(255,105,180,0.4)] backdrop-blur-md">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
            A TRIBUTE TO A SPECIAL BOND
          </span>
        </div>

        {/* Main Title & Sequence (Immediately visible & stunning) */}
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-xs sm:text-sm text-pink-300 font-semibold tracking-widest uppercase mb-3">
            To my classmate, teammate & sister
          </p>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-2">
            <span className="text-white">For </span>
            <span className="pink-gradient-text drop-shadow-[0_0_35px_rgba(255,77,141,0.8)]">
              “Moto”
            </span>
          </h1>

          <div className="mt-2 text-xl sm:text-2xl font-serif italic text-pink-200 flex items-center justify-center gap-2">
            <span>✨ Happy Birthday, Manya 🎉</span>
          </div>

          <p className="text-xs text-slate-300 max-w-sm mt-3 leading-relaxed">
            Welcome to your personalized 3D world filled with college memories, photos, letters, and cake cutting!
          </p>
        </div>

        {/* Enter Button */}
        <div className="w-full flex flex-col items-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            className="group relative px-8 py-4 rounded-full text-base font-bold text-white pink-btn flex items-center gap-3 shadow-[0_0_35px_rgba(255,77,141,0.6)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Gift className="w-5 h-5 text-pink-100 group-hover:rotate-12 transition-transform duration-300" />
              Enter Your Birthday World
              <ArrowRight className="w-5 h-5 text-pink-100 group-hover:translate-x-1.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <p className="mt-4 text-xs text-pink-300/80 flex items-center justify-center gap-1.5 font-medium animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Tap anywhere to begin the celebration
          </p>
        </div>
      </div>
    </div>
  );
};
