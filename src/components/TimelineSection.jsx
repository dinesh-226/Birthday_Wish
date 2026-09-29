import React, { useState } from 'react';
import { Sparkles, Trophy, Heart, Coffee, BookOpen, Rocket, Award, ShieldAlert, ChevronRight, ChevronLeft, Laptop, Mountain, Users, Code } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const TimelineSection = ({ onNextPage, onPrevPage }) => {
  const [activeStory, setActiveStory] = useState(1);

  const stories = [
    {
      id: 1,
      tag: "Chapter 1 • Day One",
      title: "We Met in College (ABIET)...",
      icon: BookOpen,
      photo: "/photos/manya_1.jpg",
      short: "From stranger classmates in lecture halls to sitting together in every single class.",
      detail: "Who knew that the college lecture halls would introduce me to my all-time favorite human? What started as random class talks and sharing notes turned into a daily routine where college without Moto felt totally incomplete.",
      badge: "The Beginning",
      accent: "from-pink-500/20 to-purple-500/10"
    },
    {
      id: 2,
      tag: "Chapter 2 • SIH 2025 Hustle",
      title: "Smart India Hackathon • Visionary Coders",
      icon: Code,
      photo: "/photos/manya_sih_pitch.jpg",
      short: "Pitching our Smart Tourist Safety AI & Geo-Fencing system under Team ID ABGI2511.",
      detail: "The intense prep, making slides till 3 AM, practicing our pitch 50 times, and presenting before the jury panel. Explaining our AI architecture and live mobile prototype side-by-side with you made us the most passionate team in the entire room!",
      badge: "SIH 2025 Hackathon 🚀",
      accent: "from-purple-600/25 to-pink-500/20"
    },
    {
      id: 3,
      tag: "Chapter 3 • Engineer's Day 2026",
      title: "Dev Spark & Trophy Moments",
      icon: Trophy,
      photo: "/photos/manya_event_2.jpg",
      short: "Holding awards high on Engineer's Day at Aman Bhalla Institute!",
      detail: "Standing together on stage holding our awards on 15th September. All the late-night prep, debugging, and classroom hustle turned into proud smiles with our mentors and friends.",
      badge: "Trophy Moments 🏆",
      accent: "from-amber-500/20 to-pink-500/20"
    },
    {
      id: 4,
      tag: "Chapter 4 • The Bond & Trips",
      title: "Mountain Getaways, Bunny Ears & Family",
      icon: Mountain,
      photo: "/photos/manya_trip_2.jpg",
      short: "Sitting together against the mountain walls, doing bunny ears, and sharing every unfiltered secret.",
      detail: "From crazy group trips to 2 AM life talks, you became the sister I tell everything to. No filter, no judgment, pure unconditional support. You earned the nickname 'Moto' and a forever spot in my heart.",
      badge: "Sister For Life 👭",
      accent: "from-pink-600/25 to-rose-600/10"
    },
    {
      id: 5,
      tag: "Chapter 5 • The Future",
      title: "To Future Triumphs & Big Wins!",
      icon: Rocket,
      photo: "/photos/manya_2.jpg",
      short: "Here’s to more adventures, more attempts, and finally... bagging even bigger wins together!",
      detail: "This birthday marks another incredible year of growth, laughter, and ambitious goals. Whatever you dream of achieving this year—career, life, happiness—I know you’re going to conquer it. And next time we enter a hackathon, we're taking the grand prize home!",
      badge: "The Next Era 🚀",
      accent: "from-pink-500/30 to-rose-500/20"
    }
  ];

  const handleCardClick = (id) => {
    soundEngine.playSparkleFX();
    setActiveStory(activeStory === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/40 border border-pink-500/30 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-pink-400" />
          PAGE 2 OF 6 • OUR CHRONICLES
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The Journey of <span className="pink-gradient-text">Us</span> 📖
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          From SIH Hackathon pitches and Engineer's Day trophies to college mountain trips.
        </p>
      </div>

      {/* Timeline Steps with photo integration */}
      <div className="relative border-l border-pink-500/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-6 mb-12">
        {stories.map((item, idx) => {
          const IconComp = item.icon;
          const isExpanded = activeStory === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#08070B] border-2 border-pink-400 flex items-center justify-center shadow-[0_0_15px_rgba(255,77,141,0.6)] group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              </div>

              {/* Timeline Card */}
              <div
                onClick={() => handleCardClick(item.id)}
                className={`cursor-pointer glass-panel rounded-2xl p-5 sm:p-6 border transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${item.accent} ${
                  isExpanded
                    ? 'border-pink-400/80 shadow-[0_0_30px_rgba(255,77,141,0.25)] scale-[1.01]'
                    : 'border-pink-500/20 hover:border-pink-400/50 hover:shadow-[0_0_20px_rgba(255,105,180,0.15)]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-pink-500/20 border border-pink-400/30 text-pink-300">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold tracking-wider text-pink-400 uppercase">
                        {item.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-200 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/40 text-pink-300 border border-pink-500/30">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {item.short}
                </p>

                {/* Expandable behind the scenes memory with photo */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-pink-500/20 bg-black/40 rounded-xl p-4 border border-pink-500/20 animate-fadeIn flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-pink-400/40 shadow-md">
                      <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-pink-100/95 leading-relaxed font-serif italic">
                        "{item.detail}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-[11px] text-pink-400/70">
                  <span>{isExpanded ? '▲ Click to collapse' : '▼ Tap to view photo & memory'}</span>
                  <span className="text-slate-500">#{idx + 1}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Page Navigation Footer */}
      <div className="glass-panel rounded-2xl p-4 border border-pink-500/30 flex items-center justify-between flex-wrap gap-3">
        {onPrevPage && (
          <button
            onClick={onPrevPage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-pink-300 hover:text-white border border-pink-500/30"
          >
            <ChevronLeft className="w-4 h-4" />
            Home (Page 1)
          </button>
        )}

        {onNextPage && (
          <button
            onClick={onNextPage}
            className="pink-btn px-6 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 ml-auto shadow-[0_0_15px_rgba(255,77,141,0.4)]"
          >
            <span>Photo Vault (Page 3)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
