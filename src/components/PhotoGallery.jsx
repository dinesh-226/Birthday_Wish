import React, { useState } from 'react';
import { Sparkles, Heart, Eye, Maximize2, X, ChevronLeft, ChevronRight, Box, Image as ImageIcon, Camera, Filter, Trophy, Users, GraduationCap, Mountain, Code, Cpu, Film, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const PhotoGallery = ({ onNextPage, onPrevPage }) => {
  const [activeMode, setActiveMode] = useState('carousel'); // 'carousel' or 'cube'
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [cubeRotation, setCubeRotation] = useState({ x: -15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [likes, setLikes] = useState({
    0: 420, 1: 580, 2: 512, 3: 690, 4: 730, 5: 630, 6: 590, 7: 475, 8: 535, 9: 610, 10: 495,
    'v1': 820, 'v2': 950
  });

  const mediaItems = [
    // --- Videos ---
    {
      id: 'v1',
      type: 'video',
      category: 'videos',
      src: "/photos/manya_video_1.mp4",
      title: "Moto's Candid Magic 🎬",
      tag: "Live Video Reel • Golden Memory",
      vibe: "✨ Unfiltered Moto",
      caption: "A special live video capturing Manya's candid expressions, genuine laughter, and bright personality.",
      memory: "Watching this brings an instant smile. The most authentic, cheerful, and lively sister and friend!",
      date: "Special Video Reel"
    },
    {
      id: 'v2',
      type: 'video',
      category: 'videos',
      src: "/photos/manya_video_2.mp4",
      title: "Pure Energy & Laughter 🎥",
      tag: "Live Moments • Pure Joy",
      vibe: "💖 High Energy Vibes",
      caption: "Full of life, drama, and smiles! A live keepsake video celebrating Moto in her element.",
      memory: "Every video tells a story of friendship, fun, and why college days are forever special with you.",
      date: "Special Video Reel"
    },
    // --- Photos ---
    {
      id: 0,
      type: 'image',
      category: 'sih',
      src: "/photos/manya_sih_pitch.jpg",
      title: "Smart India Hackathon 2025 • The Pitch",
      tag: "Team Visionary Coders (ABGI2511)",
      vibe: "🚀 SIH 2025 Pitching",
      caption: "Manya commanding the stage presenting our 'Smart Tourist Safety Monitoring System using AI, Geo-Fencing & Blockchain'.",
      memory: "Sleepless nights refining slides, practicing our pitch 100 times, and explaining AI architecture with full passion!",
      date: "SIH 2025 Hackathon"
    },
    {
      id: 1,
      type: 'image',
      category: 'sih',
      src: "/photos/manya_sih_judging.jpg",
      title: "SIH 2025 • Jury & Prototype Demo",
      tag: "Live App Evaluation Round",
      vibe: "⚡ Intense Evaluation",
      caption: "Showing our live mobile prototype to the faculty evaluation jury. Stress on the outside, unstoppable team energy on the inside!",
      memory: "Surrounded by judges, question grilling, and quick thinking. Moto handled the pressure like a true boss!",
      date: "SIH Internal Round"
    },
    {
      id: 2,
      type: 'image',
      category: 'solo',
      src: "/photos/manya_portrait_white.jpg",
      title: "The Sweetest Moto",
      tag: "Natural & Radiant Charm",
      vibe: "✨ Pure Sunshine",
      caption: "That calm, sweet, and genuine smile that makes every college challenge feel so much lighter.",
      memory: "A candid moment of happiness. Your warmth and honesty make you the most irreplaceable friend and sister.",
      date: "Precious Moments"
    },
    {
      id: 3,
      type: 'image',
      category: 'solo',
      src: "/photos/manya_1.jpg",
      title: "The Visionary Smile",
      tag: "Professional & Radiant",
      vibe: "👑 Boss Girl Energy",
      caption: "Confident, sharp, and always ready to conquer. The best brain and biggest support system.",
      memory: "Standing tall in the blazer, ready to take on the world. Lighting up every room effortlessly.",
      date: "College Days"
    },
    {
      id: 4,
      type: 'image',
      category: 'solo',
      src: "/photos/manya_2.jpg",
      title: "Grace, Elegance & Joy",
      tag: "Festive Splendor",
      vibe: "🌸 Pure Grace",
      caption: "Effortlessly royal and elegant. Bringing traditional charm and a heart full of warmth wherever you go.",
      memory: "Captured in festive celebration. Your kindness and cheerful spirit are unmatched.",
      date: "Festive Season"
    },
    {
      id: 5,
      type: 'image',
      category: 'solo',
      src: "/photos/manya_3.jpg",
      title: "The Unstoppable Moto",
      tag: "Sassy & Sweet with Mehendi",
      vibe: "💖 Pure Attitude & Fun",
      caption: "The partner in crime, the queen of dramatic poses, and the sister who makes every moment 1000x more colorful.",
      memory: "Behind every shared laugh and wild plan, there’s you making life vibrant and memorable.",
      date: "Memories with Moto"
    },
    {
      id: 6,
      type: 'image',
      category: 'events',
      src: "/photos/manya_event_2.jpg",
      title: "Engineer's Day 2026 • Dev Spark",
      tag: "ABIET Pathankot • Trophy Moment",
      vibe: "🏆 Proud Teammates",
      caption: "Holding our awards high on Engineer's Day! All the hard work, late prep, and dedication shining bright on stage.",
      memory: "Aman Bhalla Institute of Engineering & Technology (Dev Spark 2026). Seeing you smile with the trophy made all our attempts worth it!",
      date: "15 September 2026"
    },
    {
      id: 7,
      type: 'image',
      category: 'events',
      src: "/photos/manya_event_1.jpg",
      title: "Dev Spark Awards Ceremony",
      tag: "Stage & Faculty Honors",
      vibe: "🎖️ Champion Spirit",
      caption: "Standing proud with faculty, mentors, and friends. A day etched forever in our college journey.",
      memory: "Every competition we entered led up to moments like this. The energy, the cheers, and our unstoppable team spirit.",
      date: "Engineer's Day 2026"
    },
    {
      id: 8,
      type: 'image',
      category: 'presentation',
      src: "/photos/manya_presentation.jpg",
      title: "AI Agents & Autonomous Systems",
      tag: "Computer Lab Presentation",
      vibe: "💻 Tech Duo in Action",
      caption: "Presenting our AI research at the podium together. Endless slide revisions and lab sessions turned into pure confidence.",
      memory: "Behind this presentation was hours of coffee, fixing demo bugs at the last minute, and rehearsing our lines until we nailed it.",
      date: "College Seminar"
    },
    {
      id: 9,
      type: 'image',
      category: 'trips',
      src: "/photos/manya_trip_2.jpg",
      title: "The College Squad on Bench",
      tag: "Bunny Ears & Pure Laughter",
      vibe: "👭 Chosen Family",
      caption: "Sitting together against the mountain stone wall, doing bunny ears, and sharing jokes that only our gang understands.",
      memory: "Manya right in the center surrounded by love, warmth, and lifelong friendships. This is what true happiness looks like.",
      date: "College Getaway"
    },
    {
      id: 10,
      type: 'image',
      category: 'trips',
      src: "/photos/manya_trip_1.jpg",
      title: "Mountain Getaway & Smiles",
      tag: "Garh Outing Adventures",
      vibe: "🌄 Wanderlust & Freedom",
      caption: "Bunking the stress and heading to the hills. Fresh air, endless photo sessions, and core college memories.",
      memory: "No exams, no assignment pressure—just good vibes, mountain views, and the best gang in the universe.",
      date: "Trip Chronicles"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Vault (13)', icon: Sparkles },
    { id: 'videos', label: '🎥 Videos & Reels (2)', icon: Film },
    { id: 'sih', label: 'Smart India Hackathon (2)', icon: Code },
    { id: 'solo', label: 'Radiant Moto (4)', icon: Heart },
    { id: 'events', label: "Engineer's Day (2)", icon: Trophy },
    { id: 'presentation', label: 'AI Presentation (1)', icon: GraduationCap },
    { id: 'trips', label: 'College Trips & Gang (2)', icon: Mountain },
  ];

  const filteredItems = activeCategory === 'all'
    ? mediaItems
    : mediaItems.filter(p => p.category === activeCategory);

  const handleLike = (id, e) => {
    e?.stopPropagation();
    soundEngine.playSparkleFX();
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FF4D8D', '#FFA3C8', '#FFFFFF']
    });
  };

  const openLightbox = (item) => {
    soundEngine.playSparkleFX();
    setSelectedMedia(item);
  };

  // Cube Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setCubeRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;
    setCubeRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-950/40 border border-pink-500/30 mb-3">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          PAGE 3 OF 6 • PHOTOS & VIDEO REELS ({mediaItems.length} ITEMS)
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Moments with <span className="pink-gradient-text">Moto & The Team</span> 📸🎥
        </h2>
        <p className="text-sm text-pink-200/80 font-serif italic mt-2 max-w-xl mx-auto">
          “Live video reels, SIH hackathon pitches, Engineer's Day trophies & mountain adventures.”
        </p>

        {/* View Switcher: Polaroid vs 3D Cube */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="glass-panel p-1 rounded-full flex items-center border border-pink-500/30">
            <button
              onClick={() => setActiveMode('carousel')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === 'carousel'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)]'
                  : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Gallery & Videos
            </button>
            <button
              onClick={() => setActiveMode('cube')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === 'cube'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)]'
                  : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              6-Sided 3D Cube
            </button>
          </div>
        </div>

        {/* Category Filters */}
        {activeMode === 'carousel' && (
          <div className="flex items-center justify-center gap-2 flex-wrap mt-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playSparkleFX();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-pink-500/30 text-pink-300 border border-pink-400 shadow-[0_0_12px_rgba(255,105,180,0.3)]'
                      : 'glass-panel text-slate-400 hover:text-white border border-pink-500/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mode 1: Polaroid Cards Grid (Photos & Videos) */}
      {activeMode === 'carousel' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-2 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative cursor-pointer transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 perspective-1000"
            >
              <div className={`rounded-2xl p-3.5 border transition-all flex flex-col h-full ${
                item.type === 'video'
                  ? 'bg-[#1C142A] border-pink-400/60 shadow-[0_12px_35px_rgba(255,77,141,0.3)]'
                  : 'bg-[#15111E] border-pink-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-pink-400/60'
              }`}>
                {/* Pin Ribbon */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-pink-500/25 border border-pink-400/40 text-[9px] font-bold text-pink-300 uppercase tracking-wider backdrop-blur-md">
                  {item.date}
                </div>

                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/70 mb-2.5">
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-black">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        muted
                        playsInline
                        loop
                        onMouseOver={(e) => e.target.play().catch(() => {})}
                        onMouseOut={(e) => e.target.pause()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors">
                        <div className="w-12 h-12 rounded-full bg-pink-500/80 border-2 border-white/80 flex items-center justify-center shadow-[0_0_20px_#FF4D8D] group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 pointer-events-none">
                    <span className="text-[11px] text-white font-medium flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-pink-400" />
                      {item.type === 'video' ? 'Play Video Reel' : 'Expand memory'}
                    </span>
                  </div>

                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-pink-500/30 text-[10px] font-semibold text-pink-300">
                    {item.vibe}
                  </span>
                </div>

                {/* Caption Info */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors truncate">
                      {item.title}
                    </h3>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-0.5 text-xs text-pink-400 hover:text-pink-300 p-0.5"
                    >
                      <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                      <span className="text-[11px]">{likes[item.id]}</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-pink-400/90 font-medium mb-1.5 truncate">
                    {item.tag}
                  </span>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2">
                    {item.caption}
                  </p>

                  <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-pink-400/70 font-serif italic">
                    <span>{item.type === 'video' ? '🎥 Video Tape' : '📸 Polaroid'}</span>
                    <span>✨ Always</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 2: Interactive 6-Sided 3D Cube */}
      {activeMode === 'cube' && (
        <div className="flex flex-col items-center justify-center py-10 mb-12 select-none">
          <p className="text-xs text-pink-400 mb-8 flex items-center gap-1.5 animate-pulse font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Drag with mouse or finger to rotate the SIH pitch, Engineer's Day, and memories in full 3D!
          </p>

          <div
            className="w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing preserve-3d transition-transform duration-75"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{
              transform: `perspective(900px) rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
            }}
          >
            {/* Front Face: SIH 2025 Pitch */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 shadow-[0_0_30px_rgba(255,77,141,0.5)] bg-black"
              style={{ transform: 'translateZ(130px)' }}
            >
              <img src="/photos/manya_sih_pitch.jpg" alt="SIH Pitch" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">🚀 SIH 2025 • Visionary Coders</span>
              </div>
            </div>

            {/* Back Face: Radiant Manya in Blazer */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 shadow-[0_0_30px_rgba(255,77,141,0.5)] bg-black"
              style={{ transform: 'rotateY(180deg) translateZ(130px)' }}
            >
              <img src="/photos/manya_1.jpg" alt="Manya 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">🌟 The Radiant Moto</span>
              </div>
            </div>

            {/* Right Face: Engineer's Day 2026 Trophy */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 shadow-[0_0_30px_rgba(255,77,141,0.5)] bg-black"
              style={{ transform: 'rotateY(90deg) translateZ(130px)' }}
            >
              <img src="/photos/manya_event_2.jpg" alt="Engineer's Day" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">🏆 Dev Spark 2026 Trophies</span>
              </div>
            </div>

            {/* Left Face: SIH Jury Demo */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 shadow-[0_0_30px_rgba(255,77,141,0.5)] bg-black"
              style={{ transform: 'rotateY(-90deg) translateZ(130px)' }}
            >
              <img src="/photos/manya_sih_judging.jpg" alt="SIH Jury Demo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">⚡ SIH Jury Evaluation Demo</span>
              </div>
            </div>

            {/* Top Face: College Trip Squad on Bench */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 bg-black"
              style={{ transform: 'rotateX(90deg) translateZ(130px)' }}
            >
              <img src="/photos/manya_trip_2.jpg" alt="Trip Gang" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">👭 College Gang & Bunny Ears</span>
              </div>
            </div>

            {/* Bottom Face: Cute Close-up Smile */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-pink-400/70 bg-black"
              style={{ transform: 'rotateX(-90deg) translateZ(130px)' }}
            >
              <img src="/photos/manya_portrait_white.jpg" alt="Sweet Moto" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-pink-300">💖 The Sweetest Moto</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-10">
            <button
              onClick={() => setCubeRotation(prev => ({ ...prev, y: prev.y - 90 }))}
              className="px-4 py-1.5 rounded-full glass-panel text-xs text-pink-300 hover:text-white border border-pink-500/30"
            >
              ⟲ Rotate Left
            </button>
            <button
              onClick={() => setCubeRotation(prev => ({ ...prev, x: prev.x - 90 }))}
              className="px-4 py-1.5 rounded-full glass-panel text-xs text-pink-300 hover:text-white border border-pink-500/30"
            >
              ▲ Flip Up
            </button>
            <button
              onClick={() => setCubeRotation(prev => ({ ...prev, y: prev.y + 90 }))}
              className="px-4 py-1.5 rounded-full glass-panel text-xs text-pink-300 hover:text-white border border-pink-500/30"
            >
              Rotate Right ⟳
            </button>
          </div>
        </div>
      )}

      {/* Full-screen Lightbox Modal (Supports Image & Video Player) */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fadeIn">
          <div className="relative max-w-2xl w-full glass-panel-glow rounded-3xl p-5 sm:p-6 border border-pink-400/50 flex flex-col max-h-[94vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-slate-300 hover:text-white hover:bg-pink-600 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Player / Viewer */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[55vh] w-full rounded-2xl overflow-hidden bg-black mb-4 flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div>
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                    {selectedMedia.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedMedia.title}</h3>
                </div>
                <button
                  onClick={(e) => handleLike(selectedMedia.id, e)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/50 text-pink-300 font-bold text-xs hover:scale-105 transition-transform"
                >
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <span>{likes[selectedMedia.id]} Loves</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-pink-500/20 mb-3">
                <p className="text-xs sm:text-sm text-pink-100 font-serif italic">
                  "{selectedMedia.memory}"
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedMedia.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Navigation Footer */}
      <div className="glass-panel rounded-2xl p-4 border border-pink-500/30 flex items-center justify-between flex-wrap gap-3">
        {onPrevPage && (
          <button
            onClick={onPrevPage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-pink-300 hover:text-white border border-pink-500/30"
          >
            <ChevronLeft className="w-4 h-4" />
            Our Story (Page 2)
          </button>
        )}

        {onNextPage && (
          <button
            onClick={onNextPage}
            className="pink-btn px-6 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 ml-auto shadow-[0_0_15px_rgba(255,77,141,0.4)]"
          >
            <span>Read Letter (Page 4)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
