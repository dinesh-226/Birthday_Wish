import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Copy, Check, Feather, ChevronRight, ChevronLeft, BookOpen, Quote, Star, Award, ShieldCheck, Flame, Laptop, Mountain, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const LetterSection = ({ onNextPage, onPrevPage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('paged'); // 'paged' or 'full'

  const letterChapters = [
    {
      id: 0,
      badge: "Part I • The Beginning",
      title: "From College Corridors to Inseparable",
      subtitle: "How sitting next to you turned into my biggest blessing",
      icon: Feather,
      photo: "/photos/manya_1.jpg",
      photoTag: "Where it all started ✨",
      content: `Dearest Manya (My Moto),

Looking back at the day we first crossed paths in our college corridors at Aman Bhalla Institute, I never could have imagined how deeply you would impact my life. What started as casual conversations between classmates in crowded lecture halls, exchanging notes, and laughing at classroom chaos quickly grew into something so rare and precious.

You turned ordinary college days into unforgettable memories. Sitting next to you in class, sharing snacks, complaining about assignments, and plotting crazy plans became the best part of my routine. College without Moto isn't just incomplete—it's unimaginable.

Thank you for bringing your radiant energy, your brilliant mind, and that bright smile into my world right from day one.`
    },
    {
      id: 1,
      badge: "Part II • The SIH 2025 Hackathon Grind",
      title: "Team Visionary Coders & Hackathon Hustle",
      subtitle: "The 3 AM PPT panics, jury demos, and unbreakable spirit",
      icon: Code,
      photo: "/photos/manya_sih_pitch.jpg",
      photoTag: "SIH 2025 • Pitching on Stage 🚀",
      content: `Look at this photo of us pitching our 'Smart Tourist Safety Monitoring System' at the Smart India Hackathon 2025! 

Remember staying up until 3 AM debugging slides, drinking endless chai, rehearsing our pitch 100 times, and standing nervously before the jury panel showing our live mobile app prototype?

Even when the competition got fierce and the judges grilled us, having you right beside me made every single attempt feel like a victory. You commanded that stage with confidence, passion, and brilliance. Being part of Team Visionary Coders with you taught me that having the right teammate is worth a million trophies.`
    },
    {
      id: 2,
      badge: "Part III • Engineer's Day & Trophy Pride",
      title: "Dev Spark Trophies & Celebrating Together",
      subtitle: "Holding our awards high with pride and broad smiles",
      icon: Award,
      photo: "/photos/manya_event_2.jpg",
      photoTag: "Engineer's Day 2026 Trophies 🏆",
      content: `Standing on stage with you on Engineer's Day, holding our mementos with broad smiles alongside our mentors and friends—that memory is etched in my heart forever.

Every presentation, every late submission panic, and every lab experiment led up to moments where we proved our dedication. Seeing you proud and happy with that award in your hands was the best reward I could ever ask for. We fought together, we learned together, and we celebrated together!`
    },
    {
      id: 3,
      badge: "Part IV • The Sisterhood & Trips to the Hills",
      title: "Trips, Bunny Ears & My 24/7 Support",
      subtitle: "Calling you 'Moto' and sharing every secret without filter",
      icon: Mountain,
      photo: "/photos/manya_trip_2.jpg",
      photoTag: "Mountain Trip Squad & Sister for Life 👭💖",
      content: `Somewhere between project deadlines and college life, 'friend' stopped being a big enough word for what you mean to me. You earned the nickname 'Moto' and became the sister I always needed.

Remember sitting against the stone wall on our mountain trip, making funny bunny ears, and laughing until our stomachs hurt? Whenever life got messy, stressful, or overwhelming, you were always that one reassuring anchor. You cheered the loudest for my small wins and never let me give up during tough times.

Having a sister who listens without judgment, who fiercely protects you, and who treats your happiness as her own is a true blessing.`
    },
    {
      id: 4,
      badge: "Part V • The Lifetime Promise",
      title: "Thank You & Happy Birthday, Moto!",
      subtitle: "A heartfelt wish for your brightest year yet",
      icon: Star,
      photo: "/photos/manya_portrait_white.jpg",
      photoTag: "The Sweetest Moto • Forever Grateful 🥂🎉",
      content: `On this beautiful birthday, Manya, I want you to know how deeply you are appreciated, loved, and valued.

Thank you for being a part of my journey as a sister and a friend.

May this new chapter bring you endless success, glowing health, immense peace, and the courage to conquer every single dream you have. May you walk into rooms with your head held high, knowing how capable and remarkable you are. And mark my words: this year, Team Visionary Coders is going to celebrate even bigger wins together!

Happy Birthday, my dear Moto! 🎉💖

With all my love and lifelong respect,
Your Teammate, Classmate & Friend Always.`
    }
  ];

  const handleNextTab = () => {
    soundEngine.playSparkleFX();
    if (activeTab < letterChapters.length - 1) {
      setActiveTab(prev => prev + 1);
    }
  };

  const handlePrevTab = () => {
    soundEngine.playSparkleFX();
    if (activeTab > 0) {
      setActiveTab(prev => prev - 1);
    }
  };

  const handleCopy = () => {
    soundEngine.playSparkleFX();
    const allText = letterChapters.map(c => `=== ${c.title} ===\n\n${c.content}\n\n`).join('\n');
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentChapter = letterChapters[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/40 border border-pink-500/30 mb-3">
          <Feather className="w-3.5 h-3.5 text-pink-400" />
          PAGE 4 OF 6 • THE GOLDEN LETTER
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          A Letter For <span className="pink-gradient-text">Moto</span> 💌
        </h2>
        <p className="text-sm text-pink-200/80 font-serif italic mt-2 max-w-lg mx-auto">
          “To my classmate, teammate, support system, and sister at heart.”
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="glass-panel p-1 rounded-full flex items-center border border-pink-500/30">
            <button
              onClick={() => setViewMode('paged')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'paged'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)]'
                  : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Chapter Book Mode
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'full'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)]'
                  : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              Read Full Scroll
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Tabs (Paged Mode) */}
      {viewMode === 'paged' && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {letterChapters.map((ch, idx) => {
            const IconComp = ch.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  soundEngine.playSparkleFX();
                  setActiveTab(idx);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(255,77,141,0.6)] border border-pink-300'
                    : 'glass-panel text-slate-400 hover:text-pink-300 border border-pink-500/20'
                }`}
              >
                <IconComp className="w-3 h-3" />
                <span className="hidden sm:inline">Part {idx + 1}</span>
                <span className="sm:hidden">{idx + 1}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Paged Mode Card */}
      {viewMode === 'paged' && (
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-pink-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#120D1A]/95 relative overflow-hidden">
          {/* Top Bar with actions */}
          <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] font-bold tracking-wider border border-pink-400/30 uppercase">
                {currentChapter.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-full bg-black/40 hover:bg-pink-900/40 text-xs text-pink-300 border border-pink-500/30 flex items-center gap-1.5 transition-colors"
                title="Copy entire letter"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
              </button>
            </div>
          </div>

          {/* Letter Layout with attached Polaroid photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Letter Text Column */}
            <div className="md:col-span-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {currentChapter.title}
              </h3>
              <p className="text-xs text-pink-300/80 italic font-serif mb-5">
                {currentChapter.subtitle}
              </p>

              <div className="whitespace-pre-line font-serif text-sm sm:text-base text-pink-50 leading-relaxed tracking-wide bg-black/30 rounded-2xl p-5 border border-pink-500/20 shadow-inner">
                {currentChapter.content}
              </div>
            </div>

            {/* Polaroid Attachment Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="bg-[#181222] p-3 rounded-2xl border border-pink-400/40 shadow-[0_10px_30px_rgba(255,77,141,0.25)] transform rotate-2 hover:rotate-0 transition-transform duration-300 w-full max-w-[240px]">
                {/* Tape decoration */}
                <div className="w-16 h-3 bg-pink-400/30 -mt-5 mx-auto rounded-sm border border-pink-300/40 backdrop-blur-sm shadow-sm mb-2"></div>

                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/60 mb-2">
                  <img
                    src={currentChapter.photo}
                    alt={currentChapter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-pink-300 font-serif italic">
                    {currentChapter.photoTag}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-pink-500/20 flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={handlePrevTab}
              disabled={activeTab === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 0
                  ? 'opacity-30 cursor-not-allowed text-slate-500'
                  : 'glass-panel text-pink-300 hover:text-white border border-pink-500/30'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Chapter
            </button>

            <span className="text-xs text-pink-400 font-medium">
              Chapter {activeTab + 1} of {letterChapters.length}
            </span>

            <button
              onClick={handleNextTab}
              disabled={activeTab === letterChapters.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === letterChapters.length - 1
                  ? 'opacity-30 cursor-not-allowed text-slate-500'
                  : 'pink-btn text-white'
              }`}
            >
              Next Chapter
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Full Scroll View Mode */}
      {viewMode === 'full' && (
        <div className="space-y-6">
          {letterChapters.map((ch, idx) => (
            <div
              key={ch.id}
              className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-pink-400/40 bg-[#120D1A]/95 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 mb-4">
                <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">
                  {ch.badge}
                </span>
                <span className="text-xs text-slate-400">#0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{ch.title}</h3>
              <p className="text-xs text-pink-300/80 font-serif italic mb-4">{ch.subtitle}</p>

              <div className="whitespace-pre-line font-serif text-sm sm:text-base text-pink-50 leading-relaxed bg-black/30 rounded-2xl p-4 sm:p-5 border border-pink-500/20">
                {ch.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Signature Highlight Banner */}
      <div className="mt-8 glass-panel rounded-2xl p-5 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-gradient-to-r from-pink-950/40 via-black/60 to-pink-950/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 text-xl shadow-[0_0_15px_rgba(255,105,180,0.4)]">
            👑
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">Always by your side, Moto!</div>
            <div className="text-xs text-pink-300/80 font-serif italic">“Teammate, classmate, and chosen family.”</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onPrevPage && (
            <button
              onClick={onPrevPage}
              className="glass-panel px-4 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white border border-pink-500/30"
            >
              ⬅️ Photos
            </button>
          )}
          {onNextPage && (
            <button
              onClick={onNextPage}
              className="pink-btn px-5 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
            >
              <span>Cut Birthday Cake 🎂</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
