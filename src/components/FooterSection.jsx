import React, { useState, useEffect } from 'react';
import { Heart, Share2, Sparkles, Send, Copy, Check, MessageCircle, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const FooterSection = () => {
  const [wishInput, setWishInput] = useState('');
  const [wishes, setWishes] = useState([
    { id: 1, name: "Your Teammate", text: "To the most dedicated, fun, and unstoppable sister. Happy Birthday Moto! 🎉", time: "Just now" },
    { id: 2, name: "College Gang", text: "Never won a competition, but always won our hearts! Have a blast Manya ✨", time: "Today" }
  ]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('moto_birthday_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    soundEngine.playSparkleFX();
    const newWish = {
      id: Date.now(),
      name: "Special Friend",
      text: wishInput.trim(),
      time: "Just now"
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    setWishInput('');
    try {
      localStorage.setItem('moto_birthday_wishes', JSON.stringify(updated));
    } catch (err) {}

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FFB6C1', '#FF4D8D', '#FFA3C8', '#FFFFFF']
    });
  };

  const handleShare = () => {
    soundEngine.playSparkleFX();
    const shareData = {
      title: "Happy Birthday Manya (Moto) ✨🎂",
      text: "Check out this 3D Birthday Tribute for Moto!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <footer className="relative py-16 px-4 max-w-4xl mx-auto z-10 border-t border-pink-500/20">
      {/* Big Final Highlight Tribute Card */}
      <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 text-center border border-pink-400/50 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 mb-4 shadow-[0_0_20px_rgba(255,105,180,0.4)]">
          <Heart className="w-7 h-7 text-pink-400 fill-pink-400 animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Happy Birthday, <span className="pink-gradient-text">Manya! 🎈</span>
        </h2>

        <p className="text-base sm:text-lg text-pink-200/90 font-serif italic max-w-xl mx-auto mb-4">
          “Here’s to more memories, more attempts, and finally… some wins.”
        </p>

        {/* The required exact quote */}
        <div className="max-w-lg mx-auto bg-black/50 border border-pink-500/30 rounded-2xl p-4 my-6 shadow-inner">
          <p className="text-xs sm:text-sm font-semibold text-pink-300 leading-relaxed">
            ✨ “Thank you for being a part of my journey as a sister and a friend.” ✨
          </p>
        </div>

        {/* Share Button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="pink-btn px-7 py-3 rounded-full text-sm font-bold text-white flex items-center gap-2"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-200" /> : <Share2 className="w-4 h-4 text-white" />}
            {copiedLink ? 'Link Copied to Clipboard!' : 'Share This Wish'}
          </button>
        </div>
      </div>

      {/* Birthday Wish Wall / Guestbook */}
      <div className="glass-panel rounded-2xl p-6 border border-pink-500/25 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-4 h-4 text-pink-400" />
          <h3 className="text-base font-bold text-white">Leave a Birthday Note for Moto</h3>
        </div>

        <form onSubmit={handleAddWish} className="flex gap-2 mb-6">
          <input
            type="text"
            value={wishInput}
            onChange={(e) => setWishInput(e.target.value)}
            placeholder="Write a sweet birthday wish for Manya..."
            className="flex-1 bg-black/60 border border-pink-500/30 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
          />
          <button
            type="submit"
            className="pink-btn px-5 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {wishes.map((w) => (
            <div key={w.id} className="p-3 rounded-xl bg-black/40 border border-pink-500/15 flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-bold text-pink-300">{w.name}</div>
                <div className="text-xs text-slate-200">{w.text}</div>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0">{w.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center text-xs text-slate-400 flex flex-col items-center gap-1">
        <p className="flex items-center gap-1 text-pink-300 font-medium">
          Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for Moto (Manya)
        </p>
        <p className="text-[11px] text-slate-500">
          Designed with emotional 3D elegance & friendship memories.
        </p>
      </div>
    </footer>
  );
};
