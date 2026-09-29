import React, { useState, useEffect } from 'react';
import { Heart, Cake, Image, MessageSquare, Sparkles, Menu, X, Trophy, BookOpen, Gift, Home } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Navbar = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: 'Page 1' },
    { id: 'story', label: 'Our Story', icon: BookOpen, badge: 'Page 2' },
    { id: 'gallery', label: 'Photos 📸', icon: Image, badge: 'Page 3' },
    { id: 'letter', label: 'Letter 💌', icon: MessageSquare, badge: 'Page 4' },
    { id: 'cake', label: 'Cut Cake 🎂', icon: Cake, badge: 'Page 5' },
    { id: 'vault', label: 'Vault 🎁', icon: Gift, badge: 'Page 6' },
  ];

  const handleNav = (targetId) => {
    soundEngine.playSparkleFX();
    onNavigate(targetId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#08070B]/90 backdrop-blur-xl border-b border-pink-500/20 py-3.5 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(255,105,180,0.3)]">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-wider flex items-center gap-1.5">
                <span>MANYA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/30 text-pink-300 font-bold border border-pink-500/30">
                  MOTO
                </span>
              </div>
              <div className="text-[10px] text-pink-400/80 tracking-widest font-mono">
                BIRTHDAY 2026
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-pink-500/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)]'
                      : 'text-slate-300 hover:text-pink-300 hover:bg-pink-950/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Cake Action (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNav('cake')}
              className="pink-btn px-4 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,77,141,0.4)]"
            >
              <Cake className="w-3.5 h-3.5" />
              <span>Cut Cake 🎂</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-panel text-pink-300 border border-pink-500/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F0C16]/95 border-b border-pink-500/30 px-4 py-4 space-y-2 backdrop-blur-2xl animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(255,77,141,0.4)]'
                      : 'text-slate-200 hover:text-pink-300 hover:bg-pink-950/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-pink-300" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] opacity-70 bg-black/40 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar (Mobile / Tablet Quick Dock) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="glass-panel-glow px-2 py-2 rounded-2xl flex items-center justify-around border border-pink-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-[#0C0913]/95 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-pink-300 scale-110 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-pink-500/30 border border-pink-400/50 shadow-[0_0_10px_rgba(255,77,141,0.5)]' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] mt-0.5 font-medium tracking-tight truncate max-w-[48px]">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
