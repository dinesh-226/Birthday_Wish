import React, { useState } from 'react';
import { Cake, Sparkles, Wind, Flame, Scissors, CheckCircle2, RotateCcw, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const CakeCuttingSection = ({ onNextPage, onPrevPage }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [isCuttingAnim, setIsCuttingAnim] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [sliceEaten, setSliceEaten] = useState(false);

  // Step 1: Blow out candles
  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setIsBlowing(true);
    soundEngine.playBlowCandleFX();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#FFB6C1', '#FFA3C8', '#FFFFFF', '#FF69B4']
      });
    }, 700);
  };

  // Step 2: Cut the Cake
  const handleCutCake = () => {
    if (isCut || isCuttingAnim) return;
    setIsCuttingAnim(true);
    soundEngine.playCakeCutFX();

    setTimeout(() => {
      setIsCut(true);
      setIsCuttingAnim(false);
      soundEngine.playConfettiFX();

      const end = Date.now() + 2.5 * 1000;
      const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFFFFF', '#D81E5B', '#FFD700'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 900);
  };

  const handleReset = () => {
    soundEngine.playSparkleFX();
    setCandlesLit(true);
    setIsCut(false);
    setWishMade(false);
    setSliceEaten(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/40 border border-pink-500/30 mb-3">
          <Cake className="w-3.5 h-3.5 text-pink-400" />
          PAGE 5 OF 6 • BIRTHDAY CAKE CEREMONY
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Make a Wish & <span className="pink-gradient-text">Cut the Cake</span> 🎂
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          An interactive 3D velvet cake crafted for Moto. Follow the two steps below!
        </p>
      </div>

      {/* Main Cake Stage */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-pink-400/40 relative overflow-hidden flex flex-col items-center mb-8">
        {/* Step Progression Bar */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 w-full max-w-md">
          {/* Step 1 Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                !candlesLit ? 'bg-emerald-500 text-white' : 'bg-pink-500 text-white animate-pulse'
              }`}
            >
              {!candlesLit ? <CheckCircle2 className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-xs font-medium ${!candlesLit ? 'text-emerald-400' : 'text-pink-300'}`}>
              Blow Candles
            </span>
          </div>

          <div className={`h-[1px] flex-1 transition-colors ${!candlesLit ? 'bg-pink-400' : 'bg-white/10'}`}></div>

          {/* Step 2 Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isCut ? 'bg-emerald-500 text-white' : !candlesLit ? 'bg-pink-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'
              }`}
            >
              {isCut ? <CheckCircle2 className="w-4 h-4" /> : '2'}
            </div>
            <span className={`text-xs font-medium ${isCut ? 'text-emerald-400' : !candlesLit ? 'text-pink-300' : 'text-slate-500'}`}>
              Cut the Cake
            </span>
          </div>
        </div>

        {/* 3D Visual Layered Cake */}
        <div className="relative w-72 sm:w-80 h-64 sm:h-72 flex flex-col items-center justify-end my-4 perspective-1000 select-none">
          <div className="absolute bottom-2 w-64 h-8 bg-pink-500/20 blur-xl rounded-full"></div>

          {/* Candle Flames & Candles */}
          <div className="flex items-end justify-center gap-6 mb-1 z-20">
            {[0, 1, 2].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {candlesLit ? (
                  <div className="relative w-4 h-6 mb-1 flex items-center justify-center animate-flame">
                    <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-pink-500 via-amber-300 to-white shadow-[0_0_15px_#FF4D8D]"></div>
                    <div className="absolute inset-0 bg-pink-400/40 rounded-full blur-[2px] animate-ping opacity-60"></div>
                  </div>
                ) : (
                  <div className="w-4 h-6 mb-1 flex items-center justify-center">
                    <span className="text-[10px] text-pink-300/60 animate-bounce">💨</span>
                  </div>
                )}

                <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-pink-200 via-pink-400 to-pink-600 border border-pink-300/50 shadow-[0_0_8px_rgba(255,105,180,0.5)]">
                  <div className="w-full h-1 bg-white/60"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Tier Cake */}
          <div className="relative z-10 w-40 sm:w-48 h-16 rounded-t-2xl bg-gradient-to-b from-[#2B1B35] via-[#1E1225] to-[#140C1A] border-t-2 border-x-2 border-pink-400/60 shadow-[0_0_20px_rgba(255,77,141,0.25)] flex items-center justify-center">
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 rounded-t-xl opacity-90"></div>
            <span className="text-xs font-bold text-pink-200 tracking-wider uppercase drop-shadow">
              Moto • Manya
            </span>
          </div>

          {/* Bottom Tier Cake */}
          <div className="relative w-56 sm:w-64 h-24 rounded-2xl bg-gradient-to-b from-[#23172E] via-[#170E1E] to-[#0D0811] border-2 border-pink-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 flex items-center justify-around px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
            </div>

            <div className="text-center z-10 mt-2">
              <div className="text-sm font-extrabold text-white">✨ Sweetest Sister ✨</div>
              <div className="text-[11px] text-pink-300 font-serif italic">Queen of Attempting & Conquering</div>
            </div>

            {isCut && (
              <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-b from-pink-300 to-pink-600 shadow-[0_0_10px_#FF4D8D] animate-pulse"></div>
            )}
          </div>

          <div className="w-64 sm:w-72 h-4 rounded-full bg-gradient-to-r from-zinc-700 via-pink-300 to-zinc-700 border border-pink-400/40 shadow-lg"></div>

          {isCuttingAnim && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-none">
              <div className="text-4xl transform rotate-45 filter drop-shadow-[0_0_10px_#FF4D8D]">
                🔪
              </div>
            </div>
          )}
        </div>

        {/* Slice Pull-out Celebration (Unlocked after Cut) */}
        {isCut && (
          <div className="w-full max-w-md bg-gradient-to-br from-pink-950/60 to-black/80 rounded-2xl p-4 sm:p-5 border border-pink-400/60 shadow-[0_0_30px_rgba(255,77,141,0.3)] my-4 text-center animate-fadeIn">
            <div className="text-3xl mb-1 animate-bounce">🍰✨</div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              The First Slice is Yours, Moto! 💖
            </h4>
            <p className="text-xs sm:text-sm text-pink-200/90 leading-relaxed font-serif italic">
              "Here’s to another year of zero regrets, endless laughs, crazy college stories, and finally holding trophies together!"
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playSparkleFX();
                  setSliceEaten(true);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  sliceEaten
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                    : 'pink-btn text-white'
                }`}
              >
                {sliceEaten ? '🎉 Yummy! Best Cake Ever' : '😋 Take a Virtual Bite'}
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          {candlesLit && (
            <button
              onClick={handleBlowCandles}
              className="pink-btn px-7 py-3 rounded-full text-sm font-bold text-white flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,77,141,0.5)] group"
            >
              <Wind className="w-4 h-4 text-pink-100 group-hover:scale-125 transition-transform" />
              Blow Out the Candles 💨
            </button>
          )}

          {!candlesLit && !isCut && (
            <button
              onClick={handleCutCake}
              className="pink-btn px-7 py-3 rounded-full text-sm font-bold text-white flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,77,141,0.5)] group animate-pulse"
            >
              <Scissors className="w-4 h-4 text-pink-100 group-hover:rotate-45 transition-transform" />
              Cut the Birthday Cake 🔪🎂
            </button>
          )}

          {isCut && (
            <button
              onClick={handleReset}
              className="glass-panel hover:bg-pink-900/30 px-5 py-2.5 rounded-full text-xs font-semibold text-pink-300 border border-pink-500/30 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Relive the Cake Cutting
            </button>
          )}
        </div>
      </div>

      {/* Page Navigation Footer */}
      <div className="glass-panel rounded-2xl p-4 border border-pink-500/30 flex items-center justify-between flex-wrap gap-3">
        {onPrevPage && (
          <button
            onClick={onPrevPage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-pink-300 hover:text-white border border-pink-500/30"
          >
            <ChevronLeft className="w-4 h-4" />
            Letter (Page 4)
          </button>
        )}

        {onNextPage && (
          <button
            onClick={onNextPage}
            className="pink-btn px-6 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 ml-auto shadow-[0_0_15px_rgba(255,77,141,0.4)]"
          >
            <span>Surprise Vault (Page 6)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
