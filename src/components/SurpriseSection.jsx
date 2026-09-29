import React, { useState } from 'react';
import { Gift, Sparkles, Trophy, Heart, Coffee, Star, CheckCircle, Unlock, Lock, ChevronLeft, RotateCcw, Film, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';
import { FooterSection } from './FooterSection';

export const SurpriseSection = ({ onPrevPage, onRestart }) => {
  const [unlockedGifts, setUnlockedGifts] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [playingVideo, setPlayingVideo] = useState(null);

  const gifts = [
    {
      id: 1,
      name: "The Hall of Fame Trophy 🏆",
      short: "For the Most Loyal Teammate",
      icon: Trophy,
      reward: "OFFICIAL 1ST PRIZE AWARD",
      desc: "Awarded to Manya for fearlessly joining every single competition & hackathon (SIH 2025 Team Visionary Coders). Even if we didn't take 1st place on paper, you are always #1 in dedication and team spirit!",
      color: "from-amber-500/30 to-pink-500/20"
    },
    {
      id: 2,
      name: "Secret Video Tape Reel 📼🎥",
      short: "Live Candid Memories Player",
      icon: Film,
      reward: "EXCLUSIVE VIDEO REEL UNLOCKED",
      desc: "Watch your live candid moments, smiles, and laughter captured on tape! Tap the video below to play with sound.",
      isVideoGift: true,
      color: "from-purple-500/30 to-pink-600/20"
    },
    {
      id: 3,
      name: "Lifetime Sisterhood Pass 👭",
      short: "Unlimited 24/7 Support",
      icon: Heart,
      reward: "ZERO EXPIRY DATE",
      desc: "Guaranteed lifelong emergency support, warm hugs, unfiltered advice, and someone who always has your back through thick and thin.",
      color: "from-pink-500/30 to-rose-600/20"
    },
    {
      id: 4,
      name: "The Future Fortune Cookie 🔮",
      short: "Prediction for Moto's Next Year",
      icon: Star,
      reward: "100% HAPPINESS & SUCCESS",
      desc: "The stars predict this year is going to bring immense growth, successful placements, huge personal milestones, and finally... real competition wins!",
      color: "from-rose-500/30 to-indigo-500/20"
    }
  ];

  const handleUnlock = (id) => {
    soundEngine.playSparkleFX();
    setUnlockedGifts(prev => ({ ...prev, [id]: !prev[id] }));

    if (!unlockedGifts[id]) {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#FFB6C1', '#FF4D8D', '#FFA3C8', '#FFFFFF', '#FFD700']
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/40 border border-pink-500/30 mb-3">
          <Gift className="w-3.5 h-3.5 text-pink-400" />
          PAGE 6 OF 6 • SURPRISE VAULT & GUESTBOOK
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Moto's Secret <span className="pink-gradient-text">Surprise Vault</span> 🎁
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Tap each mystery box to unlock exclusive birthday perks and secret video reels!
        </p>
      </div>

      {/* 4 Mystery Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12">
        {gifts.map((gift) => {
          const isUnlocked = unlockedGifts[gift.id];
          const IconComp = gift.icon;

          return (
            <div
              key={gift.id}
              onClick={() => handleUnlock(gift.id)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${gift.color} ${
                isUnlocked
                  ? 'glass-panel-glow border-pink-400 shadow-[0_0_25px_rgba(255,77,141,0.3)] scale-[1.01]'
                  : 'glass-panel border-pink-500/20 hover:border-pink-400/60 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(255,105,180,0.3)]">
                  <IconComp className="w-5 h-5" />
                </div>

                <span
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                    isUnlocked
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-black/50 text-pink-300 border-pink-500/30'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Unlock className="w-3 h-3" /> Unlocked
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" /> Tap to Open
                    </>
                  )}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {gift.name}
              </h3>
              <p className="text-xs text-pink-200/80 mb-3">
                {gift.short}
              </p>

              {isUnlocked ? (
                <div className="pt-3 border-t border-pink-500/30 animate-fadeIn">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-pink-400 mb-1">
                    {gift.reward}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-serif italic mb-3">
                    "{gift.desc}"
                  </p>

                  {/* Video Reel Player if Video Gift */}
                  {gift.isVideoGift && (
                    <div className="mt-3 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="rounded-xl overflow-hidden border border-pink-400/40 bg-black">
                        <video
                          src="/photos/manya_video_1.mp4"
                          controls
                          playsInline
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="p-1.5 text-center text-[10px] text-pink-300 font-bold">
                          🎬 Reel 1
                        </div>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-pink-400/40 bg-black">
                        <video
                          src="/photos/manya_video_2.mp4"
                          controls
                          playsInline
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="p-1.5 text-center text-[10px] text-pink-300 font-bold">
                          🎥 Reel 2
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-3 border-t border-white/5 flex items-center text-[11px] text-pink-400/60 font-medium">
                  <span>✨ Tap box to reveal your gift voucher</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Guestbook & Final Tribute Section */}
      <FooterSection />

      {/* Page Navigation Footer */}
      <div className="glass-panel rounded-2xl p-4 border border-pink-500/30 flex items-center justify-between flex-wrap gap-3 mt-8">
        {onPrevPage && (
          <button
            onClick={onPrevPage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-pink-300 hover:text-white border border-pink-500/30"
          >
            <ChevronLeft className="w-4 h-4" />
            Cake Ceremony (Page 5)
          </button>
        )}

        {onRestart && (
          <button
            onClick={onRestart}
            className="pink-btn px-6 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 ml-auto shadow-[0_0_15px_rgba(255,77,141,0.4)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Home (Page 1)</span>
          </button>
        )}
      </div>
    </div>
  );
};
