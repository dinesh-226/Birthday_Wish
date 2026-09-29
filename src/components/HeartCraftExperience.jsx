import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Wind, Gift, ArrowRight, RotateCcw, Check, ChevronRight, Share2, Grid, Layers, ChevronLeft, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export const HeartCraftExperience = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  // Background Audio Element (Always ON, no pause feature)
  const bgAudioRef = useRef(null);

  // Step 2: Balloons State
  const [poppedBalloons, setPoppedBalloons] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // Step 3: Cake Module States ('lit' | 'blown' | 'cut' | 'eaten')
  const [cakePhase, setCakePhase] = useState('lit');
  const [isCuttingKnife, setIsCuttingKnife] = useState(false);

  // Step 5: Memories Deck & View State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [galleryViewMode, setGalleryViewMode] = useState('stack'); // 'stack' or 'grid'

  // Step 6: Envelope State
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  // Step 7: Gift Box State
  const [giftOpened, setGiftOpened] = useState(false);

  // Step 8: Sweet Birthday Wish Input Box & Dedicated Thank You Note Screen
  const [birthdayWish, setBirthdayWish] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [showThankYouScreen, setShowThankYouScreen] = useState(false);

  const [copiedLink, setCopiedLink] = useState(false);

  // Comprehensive Media Deck with exact objectPosition so Manya's face is 100% visible
  const mediaDeck = [
    {
      id: 1,
      type: "photo",
      src: "/photos/manya_1.jpg",
      caption: "The Radiant Moto ✨",
      sub: "Boss girl energy & that million-dollar smile!",
      objectPos: "center 12%",
      rotate: "-rotate-2"
    },
    {
      id: 2,
      type: "photo",
      src: "/photos/manya_portrait_white.jpg",
      caption: "Pure Sunshine & Joy 💖",
      sub: "The sweetest friend, teammate & sister!",
      objectPos: "center 18%",
      rotate: "rotate-3"
    },
    {
      id: 3,
      type: "photo",
      src: "/photos/manya_2.jpg",
      caption: "Graceful & Ever Smiling 🌸",
      sub: "Moments of warmth, beauty and happiness!",
      objectPos: "center 10%",
      rotate: "-rotate-3"
    },
    {
      id: 4,
      type: "photo",
      src: "/photos/manya_3.jpg",
      caption: "Celebrating Our Bond 🥂",
      sub: "A special friendship that lasts forever!",
      objectPos: "center 15%",
      rotate: "rotate-2"
    },
    {
      id: 5,
      type: "photo",
      src: "/photos/manya_sih_pitch.jpg",
      caption: "Smart India Hackathon 2025 🚀",
      sub: "Team Visionary Coders live on stage!",
      objectPos: "center 20%",
      rotate: "-rotate-2"
    },
    {
      id: 6,
      type: "photo",
      src: "/photos/manya_sih_judging.jpg",
      caption: "SIH Jury Demo & Pitch 💻",
      sub: "Answering tough jury questions together!",
      objectPos: "center 20%",
      rotate: "rotate-3"
    },
    {
      id: 7,
      type: "photo",
      src: "/photos/manya_event_2.jpg",
      caption: "Dev Spark 2026 Trophies 🏆",
      sub: "Aman Bhalla Institute • Proud moment!",
      objectPos: "center 15%",
      rotate: "-rotate-1"
    },
    {
      id: 8,
      type: "photo",
      src: "/photos/manya_event_1.jpg",
      caption: "Dev Spark Celebration 🌟",
      sub: "Holding certificates with our radiant smiles!",
      objectPos: "center 18%",
      rotate: "rotate-2"
    },
    {
      id: 9,
      type: "photo",
      src: "/photos/manya_trip_2.jpg",
      caption: "College Trip Moments ✨",
      sub: "Sitting on the bench laughing uncontrollably!",
      objectPos: "center 25%",
      rotate: "-rotate-2"
    },
    {
      id: 10,
      type: "photo",
      src: "/photos/manya_trip_1.jpg",
      caption: "Mountain Scenic Memories 🌸",
      sub: "Trips, laughter & pure good vibes!",
      objectPos: "center 20%",
      rotate: "rotate-1"
    },
    {
      id: 11,
      type: "photo",
      src: "/photos/manya_presentation.jpg",
      caption: "AI Agents Lab Presentation 💻",
      sub: "The tech duo conquering the lab!",
      objectPos: "center 25%",
      rotate: "-rotate-3"
    },
    {
      id: 12,
      type: "video",
      src: "/photos/manya_video_1.mp4",
      caption: "Candid College Reel 1 🎥",
      sub: "Tap play to watch this candid memory!",
      objectPos: "center center",
      rotate: "rotate-2"
    },
    {
      id: 13,
      type: "video",
      src: "/photos/manya_video_2.mp4",
      caption: "Candid College Reel 2 🎬",
      sub: "Tap play to watch this sweet reel!",
      objectPos: "center center",
      rotate: "-rotate-2"
    }
  ];

  // Initialize and Auto-play Continuous Friendship Music (Always ON)
  useEffect(() => {
    bgAudioRef.current = new Audio('/song.mp3');
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.55;

    const startAudioOnInteraction = () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };

    window.addEventListener('click', startAudioOnInteraction);
    window.addEventListener('touchstart', startAudioOnInteraction);

    return () => {
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, []);

  const ensureMusicPlaying = () => {
    if (bgAudioRef.current && bgAudioRef.current.paused) {
      bgAudioRef.current.play().catch(() => {});
    }
  };

  // Step 1: Handle "No" button jumping playfully away
  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 180;
    const randomY = (Math.random() - 0.5) * 140;
    setNoBtnPos({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
    soundEngine.playSparkleFX();
  };

  // Step 1: Handle Yes
  const handleYes = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#FF7096', '#FF9EBB', '#FFD6E2', '#FFFFFF', '#FFD700']
    });
    setCurrentStep(2);
  };

  // Step 2: Pop Balloon
  const handlePopBalloon = (id) => {
    if (poppedBalloons[id]) return;
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setPoppedBalloons(prev => ({ ...prev, [id]: true }));

    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.5 },
      colors: ['#FF7096', '#70D6FF', '#70E000', '#C77DFF', '#FFD700']
    });
  };

  const allBalloonsPopped = Object.values(poppedBalloons).every(Boolean);

  // Step 3: Blow Candle
  const handleBlowCandle = () => {
    if (cakePhase !== 'lit') return;
    ensureMusicPlaying();
    soundEngine.playBlowCandleFX();
    setCakePhase('blown');

    setTimeout(() => {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#FF7096', '#FFA3C8', '#FFFFFF', '#FFD700', '#C77DFF']
      });
    }, 600);
  };

  // Step 3: Interactive Cake Cutting with Knife
  const handleCutCake = () => {
    if (cakePhase !== 'blown') return;
    ensureMusicPlaying();
    setIsCuttingKnife(true);
    soundEngine.playCakeCutFX();

    setTimeout(() => {
      setIsCuttingKnife(false);
      setCakePhase('cut');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#FF7096', '#FFD700', '#FFFFFF']
      });
    }, 1000);
  };

  // Step 3: Eat cake slice from my side
  const handleEatCake = () => {
    if (cakePhase !== 'cut') return;
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setCakePhase('eaten');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FF4D8D', '#FF7096', '#FFD700', '#FFFFFF']
    });
  };

  // Step 5: Swipe / Navigate Polaroid Card
  const handleNextCard = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setCurrentCardIndex((prev) => (prev + 1) % mediaDeck.length);
  };

  const handlePrevCard = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setCurrentCardIndex((prev) => (prev - 1 + mediaDeck.length) % mediaDeck.length);
  };

  // Step 6: Open Envelope
  const handleOpenEnvelope = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setEnvelopeOpen(true);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#FF7096', '#FFC2D4', '#FFFFFF', '#FFD700']
    });
  };

  // Step 7: Open Gift Box
  const handleOpenGift = () => {
    if (giftOpened) return;
    ensureMusicPlaying();
    setGiftOpened(true);
    soundEngine.playConfettiFX();

    // Grand celebration multi-cannon confetti storm
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#FF4D8D', '#FF7096', '#FFB6C1', '#FFFFFF', '#FFD700', '#C77DFF', '#70D6FF', '#55D6C2'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      setCurrentStep(8);
    }, 1300);
  };

  // Step 8: Submit Birthday Wish & Transition to Calm Animated Thank You Note
  const handleSubmitWish = (e) => {
    e.preventDefault();
    if (!birthdayWish.trim()) return;
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setWishSubmitted(true);

    // Save to localStorage so it is preserved locally
    try {
      localStorage.setItem('manya_birthday_wish', JSON.stringify({
        wish: birthdayWish,
        submittedAt: new Date().toLocaleString()
      }));
    } catch (err) {
      console.log('LocalStorage save error:', err);
    }

    // Send the birthday wish directly to your email (paurdinesh226@gmail.com)
    try {
      fetch("https://formsubmit.co/ajax/paurdinesh226@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "🎁💖 Birthday Wish from MANYA (Moto)!",
          _template: "table",
          _captcha: "false",
          Recipient: "Dinesh",
          Sender: "MANYA (Moto)",
          Birthday_Wish: birthdayWish,
          Submitted_At: new Date().toLocaleString()
        })
      }).catch((err) => console.log('Email notification error:', err));
    } catch (err) {
      console.log('Fetch error:', err);
    }

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF4D8D', '#FF7096', '#FFD700', '#FFFFFF', '#C77DFF']
    });

    // Smoothly transition to the dedicated Thank You Note from my side (with no background animations)
    setTimeout(() => {
      setShowThankYouScreen(true);
      soundEngine.playSparkleFX();
    }, 850);
  };

  // Replay
  const handleReplay = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    setPoppedBalloons({ 1: false, 2: false, 3: false, 4: false });
    setCakePhase('lit');
    setCurrentCardIndex(0);
    setEnvelopeOpen(false);
    setGiftOpened(false);
    setWishSubmitted(false);
    setShowThankYouScreen(false);
    setBirthdayWish('');
    setCurrentStep(1);
  };

  const handleShare = () => {
    ensureMusicPlaying();
    soundEngine.playSparkleFX();
    if (navigator.share) {
      navigator.share({
        title: "Happy Birthday MANYA 💖",
        text: "Check out this cute HeartCraft Birthday Surprise for MANYA!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* BACKGROUND RISING SMALL CIRCULAR PHOTO BUBBLES (HIDDEN ON THANK YOU NOTE) */}
      {/* ========================================================================= */}
      {!showThankYouScreen && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 animate-fadeIn" aria-hidden="true">
          {/* Rising Small Photo Bubble 1 - Left */}
          <div className="absolute left-[7%] w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-1">
            <img src="/photos/manya_1.jpg" alt="Manya" className="w-full h-full object-cover object-[center_12%]" />
          </div>

          {/* Rising Small Photo Bubble 2 - Mid Left */}
          <div className="absolute left-[23%] w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-2">
            <img src="/photos/manya_portrait_white.jpg" alt="Manya" className="w-full h-full object-cover object-[center_18%]" />
          </div>

          {/* Rising Small Photo Bubble 3 - Center Left */}
          <div className="absolute left-[42%] w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-5">
            <img src="/photos/manya_2.jpg" alt="Manya" className="w-full h-full object-cover object-[center_10%]" />
          </div>

          {/* Rising Small Photo Bubble 4 - Center Right */}
          <div className="absolute right-[42%] w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-6">
            <img src="/photos/manya_1.jpg" alt="Manya" className="w-full h-full object-cover object-[center_12%]" />
          </div>

          {/* Rising Small Photo Bubble 5 - Mid Right */}
          <div className="absolute right-[23%] w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-3">
            <img src="/photos/manya_3.jpg" alt="Manya" className="w-full h-full object-cover object-[center_15%]" />
          </div>

          {/* Rising Small Photo Bubble 6 - Right */}
          <div className="absolute right-[7%] w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-pink-300/80 shadow-[0_8px_20px_rgba(232,58,107,0.3)] bg-pink-100/60 ring-2 ring-white/60 rise-photo-bubble-4">
            <img src="/photos/manya_portrait_white.jpg" alt="Manya" className="w-full h-full object-cover object-[center_18%]" />
          </div>

          {/* 3D Floating ambient sparkle & heart particles */}
          <span className="absolute top-1/3 left-[14%] text-2xl floating-3d-particle opacity-60">💖</span>
          <span className="absolute top-1/2 right-[12%] text-2xl floating-3d-particle opacity-60 delay-1000">🌸</span>
          <span className="absolute bottom-1/3 left-[20%] text-2xl floating-3d-particle opacity-60 delay-500">✨</span>
          <span className="absolute top-2/3 right-[18%] text-xl floating-3d-particle opacity-50 delay-1500">💫</span>
        </div>
      )}

      {/* MAIN 3D FLOATING STAGE (NO RIGID WHITE BOX & NO STEPS INDICATOR) */}
      <div className="max-w-md w-full relative z-10 flex flex-col items-center mt-2">
        {/* ========================================================= */}
        {/* STEP 1: WELCOME & ARE YOU EXCITED QUESTION                */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center">
            {/* Pacifico Style Header */}
            <div className="mb-4">
              <h1 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] leading-tight mb-1 drop-shadow-sm">
                Happy Birthday,
              </h1>
              <h2 className="font-pacifico text-5xl sm:text-6xl text-[#C43864] tracking-wide drop-shadow-md">
                MANYA
              </h2>
            </div>

            {/* 3D Cute Birthday Characters with Cake */}
            <div className="relative w-56 h-48 mb-6 flex items-center justify-center">
              {/* Soft Radial Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-rose-200/40 rounded-full blur-2xl -z-10 animate-pulse"></div>

              <div className="text-7xl sm:text-8xl select-none filter drop-shadow-[0_12px_20px_rgba(232,58,107,0.25)] hover:scale-110 transition-transform duration-300 animate-balloon-bob-1">
                🐻🎂🐰
              </div>

              {/* 3D Sparkle floating badges */}
              <div className="absolute top-2 right-4 text-xl animate-bounce delay-300">✨</div>
              <div className="absolute bottom-4 left-4 text-xl animate-bounce delay-700">💖</div>
            </div>

            {/* Question in Pacifico Font */}
            <p className="font-pacifico text-2xl sm:text-3xl text-[#701D38] mb-6">
              Are you excited for what's next?
            </p>

            {/* Interactive 3D Buttons */}
            <div className="flex items-center justify-center gap-5 w-full relative min-h-[55px]">
              <button
                onClick={handleYes}
                className="heartcraft-btn-primary px-9 py-3 rounded-full text-base font-bold shadow-lg cursor-pointer flex items-center gap-2 font-pacifico"
              >
                <span>Yes</span>
                <Heart className="w-4 h-4 fill-white animate-pulse" />
              </button>

              <button
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={{
                  transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                  transition: 'all 0.16s ease',
                }}
                className="heartcraft-btn-secondary px-7 py-3 rounded-full text-sm font-semibold text-pink-900 border border-pink-300 cursor-pointer font-sans"
              >
                {noCount > 0 ? "Are you sure? 😜" : "No"}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: POP ALL 4 BALLOONS (COMING FROM UP EFFECT)        */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[500px] justify-between">
            <div className="mb-2">
              <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1">
                Pop all 4 balloons 🎈
              </h2>
              <p className="text-xs text-pink-800/80 font-medium font-sans">
                Watch them float down from the sky & tap to reveal the secret!
              </p>
            </div>

            {/* 4 3D Floating Balloons with "Drop from Up" Animation */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 w-full max-w-[320px] my-auto py-4">
              {/* Balloon 1: Pink -> "You" */}
              <div className="balloon-drop-1 flex flex-col items-center">
                {!poppedBalloons[1] ? (
                  <button
                    onClick={() => handlePopBalloon(1)}
                    className="w-20 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-rose-400 via-pink-400 to-pink-200 balloon-3d animate-balloon-bob-1 cursor-pointer hover:scale-115 active:scale-95 transition-transform relative flex items-center justify-center group"
                    title="Pop me!"
                  >
                    <div className="balloon-highlight"></div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-md font-sans">Pop!</span>
                    <span className="absolute -top-1 -right-1 text-xs animate-ping">✨</span>
                    <div className="absolute -bottom-2 w-2.5 h-3 bg-pink-500 rounded-sm"></div>
                    <svg className="absolute -bottom-9 w-4 h-8 text-pink-400" viewBox="0 0 20 40">
                      <path d="M10,0 Q18,15 10,25 T10,40" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                ) : (
                  <div className="h-24 flex items-center justify-center animate-fadeIn">
                    <span className="font-pacifico text-3xl sm:text-4xl text-[#C43864] drop-shadow-sm">You</span>
                  </div>
                )}
              </div>

              {/* Balloon 2: Sky Blue -> "are" */}
              <div className="balloon-drop-2 flex flex-col items-center">
                {!poppedBalloons[2] ? (
                  <button
                    onClick={() => handlePopBalloon(2)}
                    className="w-20 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-sky-500 via-sky-400 to-sky-200 balloon-3d animate-balloon-bob-2 cursor-pointer hover:scale-115 active:scale-95 transition-transform relative flex items-center justify-center group"
                    title="Pop me!"
                  >
                    <div className="balloon-highlight"></div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-md font-sans">Pop!</span>
                    <span className="absolute -top-1 -right-1 text-xs animate-ping">⭐</span>
                    <div className="absolute -bottom-2 w-2.5 h-3 bg-sky-500 rounded-sm"></div>
                    <svg className="absolute -bottom-9 w-4 h-8 text-sky-400" viewBox="0 0 20 40">
                      <path d="M10,0 Q2,15 10,25 T10,40" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                ) : (
                  <div className="h-24 flex items-center justify-center animate-fadeIn">
                    <span className="font-pacifico text-3xl sm:text-4xl text-[#C43864] drop-shadow-sm">are</span>
                  </div>
                )}
              </div>

              {/* Balloon 3: Mint Emerald -> "best" */}
              <div className="balloon-drop-3 flex flex-col items-center">
                {!poppedBalloons[3] ? (
                  <button
                    onClick={() => handlePopBalloon(3)}
                    className="w-20 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-200 balloon-3d animate-balloon-bob-3 cursor-pointer hover:scale-115 active:scale-95 transition-transform relative flex items-center justify-center group"
                    title="Pop me!"
                  >
                    <div className="balloon-highlight"></div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-md font-sans">Pop!</span>
                    <span className="absolute -top-1 -right-1 text-xs animate-ping">💖</span>
                    <div className="absolute -bottom-2 w-2.5 h-3 bg-emerald-500 rounded-sm"></div>
                    <svg className="absolute -bottom-9 w-4 h-8 text-emerald-400" viewBox="0 0 20 40">
                      <path d="M10,0 Q18,15 10,25 T10,40" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                ) : (
                  <div className="h-24 flex items-center justify-center animate-fadeIn">
                    <span className="font-pacifico text-3xl sm:text-4xl text-[#C43864] drop-shadow-sm">best</span>
                  </div>
                )}
              </div>

              {/* Balloon 4: Purple -> "always" */}
              <div className="balloon-drop-4 flex flex-col items-center">
                {!poppedBalloons[4] ? (
                  <button
                    onClick={() => handlePopBalloon(4)}
                    className="w-20 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-purple-200 balloon-3d animate-balloon-bob-4 cursor-pointer hover:scale-115 active:scale-95 transition-transform relative flex items-center justify-center group"
                    title="Pop me!"
                  >
                    <div className="balloon-highlight"></div>
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-md font-sans">Pop!</span>
                    <span className="absolute -top-1 -right-1 text-xs animate-ping">🌸</span>
                    <div className="absolute -bottom-2 w-2.5 h-3 bg-purple-500 rounded-sm"></div>
                    <svg className="absolute -bottom-9 w-4 h-8 text-purple-400" viewBox="0 0 20 40">
                      <path d="M10,0 Q2,15 10,25 T10,40" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                ) : (
                  <div className="h-24 flex items-center justify-center animate-fadeIn">
                    <span className="font-pacifico text-3xl sm:text-4xl text-[#C43864] drop-shadow-sm">always</span>
                  </div>
                )}
              </div>
            </div>

            {/* Revealed Sentence & Continue */}
            {allBalloonsPopped ? (
              <div className="w-full mt-2 animate-fadeIn flex flex-col items-center">
                <div className="heartcraft-glass-pill py-3 px-6 rounded-2xl mb-3 border border-pink-300 shadow-md">
                  <p className="font-pacifico text-2xl sm:text-3xl text-[#701D38]">
                    “You are best always 💖”
                  </p>
                </div>
                <p className="font-pacifico text-lg text-pink-800 italic mb-4">
                  To my classmate, teammate & sister Moto 🌸
                </p>
                <button
                  onClick={() => {
                    soundEngine.playSparkleFX();
                    setCurrentStep(3);
                  }}
                  className="heartcraft-btn-primary w-full max-w-xs py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico text-base"
                >
                  <span>Next Surprise</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs font-semibold text-pink-700 animate-pulse mt-2 font-sans">
                ✨ Tap each balloon to reveal the full secret!
              </p>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: BLOW CANDLE + CUT CAKE WITH KNIFE + EAT SLICE    */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[530px] justify-between">
            <div>
              <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1">
                {cakePhase === 'lit' && "Blow the candle, MANYA 🕯️"}
                {cakePhase === 'blown' && "Cut the Cake with Knife, MANYA 🔪"}
                {cakePhase === 'cut' && "Take a Bite, MANYA! 🍰😋"}
                {cakePhase === 'eaten' && "Yummy! Happy Birthday Moto! 🍰💖"}
              </h2>
              <p className="text-xs text-pink-800/80 font-medium font-sans">
                {cakePhase === 'lit' && "Make a special birthday wish before blowing!"}
                {cakePhase === 'blown' && "Hold the knife and slice through your birthday cake! ✨"}
                {cakePhase === 'cut' && "Here is your delicious cake slice from my side, eat it Moto! 🍰"}
                {cakePhase === 'eaten' && "Sweetest memories & celebrations always! 💖"}
              </p>
            </div>

            {/* 3D Cake & Candle & Knife Animation Stage */}
            <div className="my-auto flex flex-col items-center relative py-4 w-full max-w-xs">
              {/* Ready Knife to Cut (When Blown) */}
              {cakePhase === 'blown' && !isCuttingKnife && (
                <div 
                  onClick={handleCutCake}
                  className="absolute -top-3 right-8 z-30 cursor-pointer animate-bounce hover:scale-125 transition-transform"
                  title="Click knife to cut the cake!"
                >
                  <span className="text-5xl filter drop-shadow-md">🔪</span>
                  <span className="block text-[10px] font-bold text-pink-700 font-sans bg-white/90 px-2 py-0.5 rounded-full border border-pink-300 shadow-sm mt-0.5">
                    Tap to slice!
                  </span>
                </div>
              )}

              {/* Animated Slicing Knife Active Motion */}
              {isCuttingKnife && (
                <div className="absolute z-40 top-2 inset-x-0 flex items-center justify-center animate-knife-slice pointer-events-none">
                  <span className="text-6xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">🔪✨</span>
                </div>
              )}

              {/* Candle Stick & 3D Flame */}
              <div className="flex flex-col items-center mb-1">
                {cakePhase === 'lit' ? (
                  <div className="w-5 h-8 mb-1 animate-candle-flame-3d cursor-pointer" onClick={handleBlowCandle} title="Tap to blow">
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-pink-500 via-amber-300 to-white shadow-[0_0_16px_#FF7096]"></div>
                  </div>
                ) : (
                  <div className="w-5 h-8 mb-1 flex items-center justify-center">
                    <span className="text-base text-pink-500 animate-bounce">💨</span>
                  </div>
                )}
                <div className="w-3 h-12 rounded-t-sm bg-gradient-to-b from-pink-200 via-rose-300 to-rose-400 border border-pink-200 shadow-md"></div>
              </div>

              {/* 3D Cake Body */}
              <div 
                onClick={cakePhase === 'blown' ? handleCutCake : undefined}
                className={`w-56 h-28 rounded-3xl bg-gradient-to-b from-[#FFF5F8] via-[#FFE4EC] to-[#FFC2D4] border-2 border-pink-300 shadow-[0_15px_30px_rgba(232,58,107,0.25)] flex flex-col items-center justify-center relative overflow-hidden ${cakePhase === 'blown' ? 'cursor-pointer hover:border-pink-500' : ''}`}
              >
                {/* Frosting Drips */}
                <div className="absolute top-0 inset-x-0 h-4 bg-pink-400 rounded-t-2xl opacity-80 shadow-inner"></div>

                {/* Cake Cut Line Indicator */}
                {(cakePhase === 'cut' || cakePhase === 'eaten') && (
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-pink-500 to-rose-400 shadow-inner rounded-full animate-fadeIn"></div>
                )}

                <span className="font-pacifico text-xl sm:text-2xl text-[#701D38] mt-2">
                  Happy Birthday MANYA
                </span>
                <span className="font-pacifico text-sm text-pink-700">Sweetest Sister & Friend</span>
              </div>

              {/* 3D Cake Stand / Plate */}
              <div className="w-64 h-4 rounded-full bg-pink-200/90 border border-pink-300 shadow-md mt-1.5"></div>

              {/* EATING / FEEDING SLICE ANIMATION */}
              {cakePhase === 'cut' && (
                <div 
                  onClick={handleEatCake}
                  className="mt-4 animate-cake-feed flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-pink-400 shadow-[0_10px_25px_rgba(232,58,107,0.3)] flex items-center gap-3">
                    <span className="text-4xl animate-bounce">🍰🍴</span>
                    <div className="text-left">
                      <p className="font-pacifico text-base text-[#701D38]">A sweet bite for you!</p>
                      <p className="text-[11px] text-pink-700 font-sans font-semibold">Tap to eat from my side Moto 😋</p>
                    </div>
                  </div>
                </div>
              )}

              {cakePhase === 'eaten' && (
                <div className="mt-4 animate-fadeIn flex flex-col items-center">
                  <span className="text-4xl animate-bounce">😋💖✨</span>
                  <span className="font-pacifico text-xl text-[#C43864] mt-1">
                    Cake eaten with love! 🍰💖
                  </span>
                  <span className="text-xs text-pink-700 font-sans font-medium">So sweet and tasty!</span>
                </div>
              )}
            </div>

            {/* Action Buttons for all 4 Cake Phases */}
            <div className="w-full max-w-xs">
              {cakePhase === 'lit' && (
                <button
                  onClick={handleBlowCandle}
                  className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer font-pacifico"
                >
                  <Wind className="w-4 h-4 animate-pulse" />
                  <span>Tap to blow the candle 💨</span>
                </button>
              )}

              {cakePhase === 'blown' && (
                <button
                  onClick={handleCutCake}
                  className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer font-pacifico"
                >
                  <span>Take Knife & Cut Cake 🔪🎂</span>
                </button>
              )}

              {cakePhase === 'cut' && (
                <button
                  onClick={handleEatCake}
                  className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer font-pacifico"
                >
                  <span>Take a bite 🍰😋</span>
                </button>
              )}

              {cakePhase === 'eaten' && (
                <button
                  onClick={() => {
                    soundEngine.playSparkleFX();
                    setCurrentStep(4);
                  }}
                  className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico"
                >
                  <span>Continue 💖</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: YOUR ROSE BOUQUET 🌹                              */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[500px] justify-between">
            <div>
              <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1">
                Your Rose Bouquet 🌹
              </h2>
              <p className="text-xs text-pink-800/80 font-medium font-sans">
                A bouquet of gratitude & love for being by my side.
              </p>
            </div>

            {/* 3D Rose Bouquet Visual */}
            <div className="my-auto flex flex-col items-center animate-fadeIn py-4">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-200/40 to-rose-100/60 border border-pink-300/80 flex items-center justify-center shadow-lg relative mb-4 hover:scale-105 transition-transform">
                <div className="text-8xl select-none filter drop-shadow-[0_15px_25px_rgba(232,58,107,0.3)] animate-balloon-bob-1">
                  💐
                </div>
                <div className="absolute top-2 left-4 text-xl animate-pulse">✨</div>
                <div className="absolute bottom-4 right-4 text-xl animate-pulse delay-300">💖</div>
              </div>

              <div className="heartcraft-glass-pill p-4 rounded-2xl max-w-xs border border-pink-300/80 shadow-md">
                <p className="font-pacifico text-lg sm:text-xl text-pink-900 leading-snug">
                  “To the one who turned college stress into memories, competition panics into laughter, and friendship into family. 🌸”
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playSparkleFX();
                setCurrentStep(5);
              }}
              className="heartcraft-btn-primary w-full max-w-xs py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico"
            >
              <span>Continue 💖</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: ALL PHOTOS & VIDEOS (PERFECT FACE ALIGNMENT)      */}
        {/* ========================================================= */}
        {currentStep === 5 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[550px] justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between px-2 mb-1">
                <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38]">
                  Some Sweet Moments
                </h2>
                {/* View Mode Toggle Button */}
                <button
                  onClick={() => setGalleryViewMode(prev => prev === 'stack' ? 'grid' : 'stack')}
                  className="px-3 py-1.5 rounded-full bg-white/90 border border-pink-300 text-xs font-bold text-pink-900 flex items-center gap-1.5 shadow-sm hover:bg-pink-50 transition-all cursor-pointer font-sans"
                  title="Toggle 3D Stack / All Grid"
                >
                  {galleryViewMode === 'stack' ? (
                    <>
                      <Grid className="w-3.5 h-3.5 text-pink-600" />
                      <span>Grid Wall ({mediaDeck.length})</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5 text-pink-600" />
                      <span>3D Stack Deck</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-pink-800/80 font-sans">
                {galleryViewMode === 'stack'
                  ? `(Swipe/tap cards • Memory ${currentCardIndex + 1} of ${mediaDeck.length})`
                  : `(All ${mediaDeck.length} photos & candid videos together)`}
              </p>
            </div>

            {/* VIEW MODE 1: ROCK-SOLID 3D STACKED POLAROID DECK */}
            {galleryViewMode === 'stack' ? (
              <div className="my-auto relative w-full max-w-[310px] sm:max-w-[330px] h-[430px] sm:h-[450px] flex items-center justify-center py-2">
                {mediaDeck.map((item, idx) => {
                  const isCurrent = idx === currentCardIndex;
                  const isNext = idx === (currentCardIndex + 1) % mediaDeck.length;

                  if (!isCurrent && !isNext) return null;

                  return (
                    <div
                      key={item.id}
                      onClick={handleNextCard}
                      className={`absolute inset-0 bg-white rounded-3xl p-3 sm:p-4 border-2 border-pink-200 shadow-[0_20px_45px_rgba(232,58,107,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? `z-20 scale-100 ${item.rotate}`
                          : 'z-10 scale-95 rotate-3 opacity-60 pointer-events-none'
                      }`}
                    >
                      {/* 3D Cute Washi Tape Strip */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 tape-strip rounded-sm opacity-90 z-30 pointer-events-none"></div>

                      {/* Media container (Photo or Video) */}
                      <div className="w-full h-[240px] sm:h-[260px] rounded-2xl overflow-hidden bg-pink-50 relative polaroid-sheen mb-2 shadow-inner">
                        {item.type === 'photo' ? (
                          <img
                            src={item.src}
                            alt={item.caption}
                            style={{ objectPosition: item.objectPos || "center center" }}
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                        ) : (
                          /* Interactive Video Reel */
                          <div className="w-full h-full relative bg-black flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <video
                              src={item.src}
                              controls
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Polaroid Caption */}
                      <div className="text-center flex flex-col justify-center flex-grow px-1">
                        <div className="font-pacifico text-lg sm:text-xl text-[#701D38] leading-tight">
                          {item.caption}
                        </div>
                        <div className="text-xs text-pink-700 font-sans mt-0.5 font-medium">
                          {item.sub}
                        </div>
                      </div>

                      {/* Card Footer Bar */}
                      <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-pink-600 font-sans font-medium" onClick={(e) => e.stopPropagation()}>
                        <span className="font-semibold">Memory {idx + 1}/{mediaDeck.length}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrevCard}
                            className="p-1.5 rounded-full hover:bg-pink-100 transition-colors"
                            title="Previous Photo"
                          >
                            <ChevronLeft className="w-4 h-4 text-pink-700" />
                          </button>
                          <button
                            onClick={handleNextCard}
                            className="px-2 py-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors font-bold text-pink-800 flex items-center gap-0.5 text-xs"
                            title="Next Photo"
                          >
                            <span>Next</span>
                            <ChevronRight className="w-3.5 h-3.5 text-pink-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* VIEW MODE 2: GRID WALL OF ALL 13 MEDIA ITEMS */
              <div className="w-full max-h-[380px] overflow-y-auto grid grid-cols-2 gap-3 p-2 my-auto">
                {mediaDeck.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-2 border border-pink-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="w-full h-[130px] rounded-xl overflow-hidden bg-black/5 mb-1.5">
                      {item.type === 'photo' ? (
                        <img
                          src={item.src}
                          alt={item.caption}
                          style={{ objectPosition: item.objectPos || "center center" }}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={item.src}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="text-xs font-pacifico text-[#701D38] truncate text-center">
                      {item.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Controls */}
            <div className="w-full max-w-xs flex items-center gap-3 mt-3">
              {galleryViewMode === 'stack' && (
                <button
                  onClick={handleNextCard}
                  className="heartcraft-btn-secondary px-5 py-3 rounded-full text-xs font-bold text-pink-900 border border-pink-300 cursor-pointer font-sans"
                >
                  Next ⟳
                </button>
              )}

              <button
                onClick={() => {
                  soundEngine.playSparkleFX();
                  setCurrentStep(6);
                }}
                className="heartcraft-btn-primary flex-1 py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: A MESSAGE FROM MY HEART (ENVELOPE & LETTER)       */}
        {/* ========================================================= */}
        {currentStep === 6 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[540px] justify-between">
            <div>
              <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1">
                A Message From My Heart
              </h2>
              <p className="text-xs text-pink-800/80 font-medium font-sans">
                {!envelopeOpen ? "(Tap the envelope to unfold the letter)" : "(A heartfelt letter for MANYA)"}
              </p>
            </div>

            {/* 3D Envelope & Unfolded Letter */}
            <div className="my-auto w-full py-2 flex flex-col items-center">
              {!envelopeOpen ? (
                <div
                  onClick={handleOpenEnvelope}
                  className="cursor-pointer group flex flex-col items-center justify-center p-7 rounded-3xl heartcraft-glass-pill hover:scale-108 transition-all duration-300 shadow-xl"
                >
                  {/* 3D Pastel Envelope */}
                  <div className="w-32 h-24 bg-gradient-to-tr from-pink-300 to-rose-200 rounded-2xl border-2 border-pink-300 shadow-lg relative flex items-center justify-center mb-3">
                    <div className="absolute inset-0 bg-pink-400/30 rounded-2xl clip-triangle"></div>
                    <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md animate-bounce">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                  </div>
                  <span className="font-pacifico text-xl text-pink-900 tracking-wide">
                    Tap to Open Letter 💌
                  </span>
                </div>
              ) : (
                /* Rich Unfolded Letter Sheet with Pacifico & Emojis */
                <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-pink-300 shadow-[0_15px_35px_rgba(232,58,107,0.2)] text-left text-xs sm:text-sm text-[#4A1525] font-serif leading-relaxed max-h-[340px] overflow-y-auto animate-fadeIn relative">
                  <div className="absolute top-3.5 right-4 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-sm">
                    💖
                  </div>

                  <p className="font-pacifico text-2xl text-[#701D38] mb-2">
                    Dear MANYA, 🌸✨
                  </p>

                  <p className="mb-2.5">
                    Happy Birthday to the most amazing person, my constant support, and my favorite human! 🎉🎂💖
                  </p>

                  <p className="mb-2.5">
                    You are sweet, fiercely loyal, my constant rock 🪨, and my safe haven 🛡️. In a world full of noise, having you to share everything with is one of the greatest blessings I could ever ask for. 🌟✨
                  </p>

                  <p className="mb-2.5">
                    From our endless college lectures, frantic lab sessions, to 3 AM hackathon slides (Team Visionary Coders! 💻🚀☕) — we participated in multiple competitions together. Even if we didn't win the trophy, having you as my partner by my side made every single attempt feel like a triumph. 🏆❤️
                  </p>

                  <p className="mb-2.5">
                    Whenever I felt low, stressed, or doubted myself, you were always right there with your bright smile, infectious laughter, and endless encouragement to lift me up. 🌸🌟
                  </p>

                  <p className="mb-2.5">
                    On your special day, I wish you boundless happiness, peace, good health, and the courage to chase down every single dream you have. May this year shower you with all the wins and joy you truly deserve! 🌈💫
                  </p>

                  <div className="my-3 p-3 rounded-2xl bg-pink-50/90 border border-pink-200">
                    <p className="font-pacifico text-lg text-pink-800 text-center">
                      “Thank you for being a part of my journey as a sister and a friend.” 💖🌸
                    </p>
                  </div>

                  <div className="text-right mt-3">
                    <p className="font-pacifico text-lg text-[#701D38]">
                      With endless love & best wishes always,
                    </p>
                    <p className="text-xs text-pink-900 font-bold font-sans">
                      Your Teammate & Forever Friend 🤝🌸🎂
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Button */}
            {envelopeOpen && (
              <button
                onClick={() => {
                  soundEngine.playSparkleFX();
                  setCurrentStep(7);
                }}
                className="heartcraft-btn-primary w-full max-w-xs py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg font-pacifico"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: ONE LAST THING... (TAP THE GIFT BOX)              */}
        {/* ========================================================= */}
        {currentStep === 7 && (
          <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center min-h-[500px] justify-between">
            <div>
              <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1">
                One Last Thing...
              </h2>
              <p className="text-xs text-pink-800/80 font-medium font-sans">
                (Tap the gift to unbox the finale surprise)
              </p>
            </div>

            {/* 3D Wiggling Gift Box */}
            <div
              onClick={handleOpenGift}
              className="my-auto cursor-pointer group flex flex-col items-center justify-center py-4"
            >
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 border-2 border-pink-200 shadow-[0_15px_35px_rgba(232,58,107,0.4)] flex items-center justify-center animate-gift-wiggle-3d hover:scale-115 active:scale-95 transition-transform relative">
                {/* 3D Silk Ribbons */}
                <div className="absolute inset-x-0 h-5 bg-white/80 shadow-sm"></div>
                <div className="absolute inset-y-0 w-5 bg-white/80 shadow-sm"></div>
                <span className="text-6xl relative z-10 select-none filter drop-shadow-md">🎁</span>
              </div>

              <span className="font-pacifico text-xl text-pink-900 mt-5 group-hover:text-pink-700 transition-colors animate-pulse">
                Tap to unbox your grand surprise! ✨
              </span>
            </div>

            <p className="text-xs font-semibold text-pink-700 font-sans">
              A grand celebration awaits inside ✨
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 8: GRAND FINALE / DEDICATED HEARTFELT THANK YOU NOTE */}
        {/* ========================================================= */}
        {currentStep === 8 && (
          <div className="w-full text-center flex flex-col items-center">
            {!showThankYouScreen ? (
              /* Phase A: Grand Finale + Birthday Wish Input Box */
              <div className="heartcraft-stage w-full py-4 text-center animate-fadeIn flex flex-col items-center">
                {/* 3D Festive Celebration Graphics (No Boy/Girl Emoji) */}
                <div className="relative w-56 h-40 mb-3 flex items-center justify-center">
                  <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-2xl -z-10 animate-pulse"></div>
                  <div className="text-6xl sm:text-7xl select-none filter drop-shadow-[0_12px_20px_rgba(232,58,107,0.3)] animate-balloon-bob-1 flex items-center justify-center gap-1">
                    <span>🎉</span>
                    <span>🎂</span>
                    <span>👑</span>
                    <span>✨</span>
                    <span>🎁</span>
                  </div>
                  <span className="absolute top-1 right-3 text-xl animate-bounce">💖</span>
                  <span className="absolute bottom-1 left-3 text-xl animate-bounce delay-300">🌟</span>
                </div>

                {/* Lots of happiness for you */}
                <h2 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] mb-1 leading-tight">
                  Lots of happiness for you 💖
                </h2>

                <p className="font-pacifico text-xl sm:text-2xl text-[#C43864] mb-3 leading-snug">
                  I hope you like my birthday gift 🎁💖
                </p>

                <div className="heartcraft-glass-pill p-3.5 rounded-2xl max-w-xs mb-5 border border-pink-300 shadow-md">
                  <p className="font-pacifico text-lg text-pink-900 leading-snug">
                    “Once again, Happy Birthday MANYA! May all your dreams come true! 🎉🌸”
                  </p>
                </div>

                {/* ========================================================= */}
                {/* SWEET BIRTHDAY WISHLIST / GIFT INPUT BOX (NO WHATSAPP)    */}
                {/* ========================================================= */}
                <div className="w-full max-w-xs bg-white/95 rounded-3xl p-5 border-2 border-pink-300/80 shadow-[0_12px_30px_rgba(232,58,107,0.18)] mb-6 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎁</span>
                    <h3 className="font-pacifico text-xl text-[#701D38]">
                      What do you want, Moto?
                    </h3>
                  </div>
                  <p className="text-[11px] text-pink-700 font-sans mb-3">
                    Tell me what gift or treat you wish for on your birthday! 💖
                  </p>

                  <form onSubmit={handleSubmitWish} className="space-y-3">
                    <textarea
                      value={birthdayWish}
                      onChange={(e) => setBirthdayWish(e.target.value)}
                      placeholder="Type your birthday wish or gift you want from me... 🎂✨"
                      rows="3"
                      className="w-full text-xs font-sans p-3 rounded-2xl border border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50/50 text-[#4A1525] placeholder:text-pink-400/80 resize-none shadow-inner"
                    />
                    <button
                      type="submit"
                      disabled={!birthdayWish.trim()}
                      className="heartcraft-btn-primary w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 font-pacifico text-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Wish to Me 💌</span>
                    </button>
                  </form>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 w-full max-w-xs">
                  <button
                    onClick={handleReplay}
                    className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Experience ↺</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 rounded-full text-xs font-semibold text-pink-800 hover:text-pink-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-sans bg-white/80 border border-pink-200 shadow-sm"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? "Link Copied!" : "Share Birthday Surprise 💖"}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Phase B: Calm, Elegant Thank You Note (No Background Animations) */
              <div className="w-full py-4 text-center animate-thankyou-reveal flex flex-col items-center max-w-md">
                {/* Header in Pacifico */}
                <div className="mb-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-pink-500 text-white flex items-center justify-center text-xl shadow-md mb-2 animate-bounce">
                    💖
                  </div>
                  <h1 className="font-pacifico text-3xl sm:text-4xl text-[#701D38] leading-tight mb-1">
                    Thank You, MANYA 🌸
                  </h1>
                  <p className="font-pacifico text-xl text-[#C43864]">
                    A Special Note From My Heart
                  </p>
                </div>

                {/* Sealed Wish Badge */}
                {birthdayWish && (
                  <div className="w-full bg-white/90 border-2 border-pink-300 rounded-3xl p-4 mb-4 text-center shadow-md">
                    <span className="text-xs font-bold text-pink-700 font-sans uppercase tracking-wider block mb-1">
                      🎁 Your Birthday Wish
                    </span>
                    <p className="font-pacifico text-lg text-[#701D38] italic mb-1">
                      “{birthdayWish}”
                    </p>
                    <p className="text-[11px] text-pink-600 font-sans font-semibold">
                      ✨ Locked in my heart — I promise to make it happen, Moto! ✨
                    </p>
                  </div>
                )}

                {/* The Heartfelt Thank You Letter */}
                <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-pink-200 shadow-[0_15px_35px_rgba(232,58,107,0.18)] text-left text-xs sm:text-sm text-[#4A1525] font-serif leading-relaxed thankyou-card-glow relative mb-5">
                  <div className="absolute top-3.5 right-4 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-sm">
                    🌸
                  </div>

                  <p className="font-pacifico text-2xl text-[#701D38] mb-2.5">
                    Dear Moto, 🌸💖
                  </p>

                  <p className="mb-2.5">
                    I wanted to take a quiet, sincere moment to say a huge, heartfelt <strong>THANK YOU</strong> for being such an irreplaceable part of my life.
                  </p>

                  <p className="mb-2.5">
                    Thank you for standing by me through every hectic college lecture, frantic presentation, and late-night hackathon rush in <em>Team Visionary Coders</em> 🚀💻. Having you as my partner always gave me the confidence to face every challenge.
                  </p>

                  <p className="mb-2.5">
                    Thank you for all the endless laughs, for listening to me whenever I needed to talk, and for being the most genuine, caring sister and friend anyone could ever ask for. 🛡️✨
                  </p>

                  <p className="mb-3">
                    I hope you loved this entire birthday surprise and that it brought a big smile to your face. You deserve all the joy, success, and love this universe has to offer! 🌟💖
                  </p>

                  <div className="p-3.5 bg-pink-50 rounded-2xl border border-pink-200 text-center my-3">
                    <p className="font-pacifico text-base sm:text-lg text-pink-900 leading-snug">
                      “Forever grateful for our bond. Happy Birthday once again MANYA! 🎂🌸🎉”
                    </p>
                  </div>

                  <div className="text-right mt-3">
                    <p className="font-pacifico text-lg text-[#701D38]">
                      With endless gratitude & best wishes,
                    </p>
                    <p className="text-xs text-pink-900 font-bold font-sans">
                      Your Forever Friend & Teammate 🤝🌸🎂
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 w-full max-w-xs">
                  <button
                    onClick={handleReplay}
                    className="heartcraft-btn-primary w-full py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg font-pacifico"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Experience ↺</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 rounded-full text-xs font-semibold text-pink-800 hover:text-pink-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-sans bg-white/80 border border-pink-200 shadow-sm"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? "Link Copied!" : "Share Birthday Surprise 💖"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Branding in Pacifico Font */}
      <div className="mt-8 text-center font-pacifico text-xl text-pink-800/80 font-bold z-10">
        Crafted with ❤️ for MANYA
      </div>
    </div>
  );
};
