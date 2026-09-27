import React, { useState, useEffect } from 'react';
import { FESTIVAL_DAYS, TICKET_TIERS } from '../data/festivalData';
import { audioEngine } from '../utils/audioEngine';
import {
  Sparkles,
  Hourglass,
  ConfirmationNumber,
  Music,
  AcUnit,
  Groups,
  Shield,
  Loyalty,
  Mic,
  LiveTv,
  Stadium,
  Park,
  Play,
  Pause,
  Star,
  Verified,
  TempleHindu,
  ArrowForward,
  Check,
  Close,
  ChevronRight
} from './Icons';

interface HomeScreenProps {
  onNavigateToLineup: () => void;
  onNavigateToBooking: (tierId?: string) => void;
  onOpenSoundStation: () => void;
  onNavigateToGuide?: () => void;
  onOpenTicketModal?: (tier?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToLineup,
  onNavigateToBooking,
  onOpenSoundStation,
  onNavigateToGuide,
  onOpenTicketModal
}) => {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 168, hours: 14, mins: 36, secs: 42 });
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);

  useEffect(() => {
    const festivalDate = new Date('October 03, 2026 19:30:00 GMT+0530').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = festivalDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlayingAnthem(state.isPlaying && state.mode === 'dhol');
    });
    return unsub;
  }, []);

  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      audioEngine.stop();
    } else {
      audioEngine.toggleRhythm('dhol');
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e0e1f8]">
      {/* IMMERSIVE HERO WITH NEGATIVE MARGIN CLEARANCE */}
      <section className="relative w-full -mt-28 pt-36 pb-20 px-4 sm:px-8 overflow-hidden bg-[#0a0d1d]">
        {/* Ambient Glows & Mandala Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#f2ca50]/10 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[#cc003c]/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-[#ff9961]/15 rounded-full blur-[130px]"></div>

          {/* Intricate SVG Mandala Watermark */}
          <svg
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] text-[#f2ca50]/5 select-none animate-spin-slow"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.3"></circle>
            <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="0.4"></circle>
            <circle cx="50" cy="50" fill="none" r="32" stroke="currentColor" strokeDasharray="1,1" strokeWidth="0.3"></circle>
            <path d="M50 0 L55 35 L50 40 L45 35 Z M50 100 L55 65 L50 60 L45 65 Z M0 50 L35 55 L40 50 L35 45 Z M100 50 L65 55 L60 50 L65 45 Z" opacity="0.6"></path>
            <path d="M15 15 L40 40 L35 45 L10 20 Z M85 85 L60 60 L65 55 L90 80 Z M85 15 L60 40 L55 35 L80 10 Z M15 85 L40 60 L45 65 L20 90 Z" opacity="0.4"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Sacred Festive Sub-Header Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26293a]/80 border border-[#f2ca50]/30 backdrop-blur-md shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-[#f2ca50]" />
            <span className="font-['Playfair_Display'] text-xs sm:text-sm text-[#f2ca50] tracking-widest uppercase font-semibold">
              Shree Navratri Mahotsav 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
          </div>

          {/* Main Master Headline */}
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold text-[#e0e1f8] max-w-5xl tracking-tight leading-tight">
            Experience India's Grandest <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2ca50] via-[#ffe088] to-[#ff9961] drop-shadow-[0_2px_24px_rgba(242,202,80,0.35)]">
              Navratri Celebration
            </span>
          </h1>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-base sm:text-xl text-[#d0c5af] max-w-3xl font-light">
            9 Divine Nights of Rhythm, Garba, Raas & Devotion under Asia's Largest AC Mega-Dome & Royal Open Amphitheatre in Ahmedabad.
          </p>

          {/* Live Glowing Countdown Container */}
          <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-[#14172e]/80 border border-[#f2ca50]/20 backdrop-blur-xl shadow-2xl flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Hourglass className="w-4 h-4 text-[#f2ca50]" />
              <span className="text-xs text-[#d0c5af] uppercase tracking-widest font-semibold">
                Shubh Muhurat Countdown • 03 October 2026
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] py-3 px-2 rounded-xl bg-[#0a0d1d]/90 border border-[#26293a] shadow-inner">
                <span className="font-['Playfair_Display'] text-2xl sm:text-4xl text-[#f2ca50] font-bold tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="text-[11px] text-[#99907c] uppercase tracking-wider mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] py-3 px-2 rounded-xl bg-[#0a0d1d]/90 border border-[#26293a] shadow-inner">
                <span className="font-['Playfair_Display'] text-2xl sm:text-4xl text-[#f2ca50] font-bold tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#99907c] uppercase tracking-wider mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] py-3 px-2 rounded-xl bg-[#0a0d1d]/90 border border-[#26293a] shadow-inner">
                <span className="font-['Playfair_Display'] text-2xl sm:text-4xl text-[#f2ca50] font-bold tabular-nums">
                  {String(timeLeft.mins).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#99907c] uppercase tracking-wider mt-1">Mins</span>
              </div>
              <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px] py-3 px-2 rounded-xl bg-[#0a0d1d]/90 border border-[#26293a] shadow-inner">
                <span className="font-['Playfair_Display'] text-2xl sm:text-4xl text-[#ff9961] font-bold tabular-nums">
                  {String(timeLeft.secs).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#99907c] uppercase tracking-wider mt-1">Secs</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToBooking()}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e9c349] hover:from-[#f2ca50] hover:to-[#ffe088] text-[#3c2f00] font-bold text-base sm:text-lg shadow-[0_0_28px_rgba(242,202,80,0.4)] hover:shadow-[0_0_42px_rgba(242,202,80,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ConfirmationNumber className="w-5 h-5" />
              <span>Book Festival Passes</span>
            </button>
            <button
              onClick={onNavigateToLineup}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#26293a]/80 text-[#e0e1f8] hover:text-[#f2ca50] hover:bg-[#313445] border border-[#26293a] backdrop-blur-md font-semibold text-base shadow-md transition-all duration-200"
            >
              <Music className="w-5 h-5 text-[#f2ca50]" />
              <span>Explore 9-Night Lineup</span>
            </button>
          </div>

          {/* Quick Key Facts Strip */}
          <div className="mt-12 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl bg-[#181b2b]/70 border border-[#26293a] backdrop-blur-md shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#f2ca50]">
                <AcUnit className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Dual Venues</span>
              </div>
              <span className="text-xs text-[#e0e1f8]">100% Weatherproof AC Super-Dome + 15-Acre Lawns</span>
            </div>

            <div className="p-4 rounded-xl bg-[#181b2b]/70 border border-[#26293a] backdrop-blur-md shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#f2ca50]">
                <Groups className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Scale</span>
              </div>
              <span className="text-xs text-[#e0e1f8]">45,000+ Synchronized Dancers Every Night</span>
            </div>

            <div className="p-4 rounded-xl bg-[#181b2b]/70 border border-[#26293a] backdrop-blur-md shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#f2ca50]">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Sanctuary</span>
              </div>
              <span className="text-xs text-[#e0e1f8]">500+ Security Personnel, She-Team & 360° CCTV</span>
            </div>

            <div className="p-4 rounded-xl bg-[#181b2b]/70 border border-[#26293a] backdrop-blur-md shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#f2ca50]">
                <Loyalty className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Hospitality</span>
              </div>
              <span className="text-xs text-[#e0e1f8]">Free Community Pass & Royal VIP Hospitality</span>
            </div>
          </div>
        </div>
      </section>

      {/* CELEBRITY HOST BAR */}
      <section className="w-full bg-[#14172e] border-y border-[#26293a] py-3 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-[#f2ca50] shrink-0" />
            <span className="font-['Playfair_Display'] text-xs font-semibold text-[#f2ca50] tracking-widest uppercase">
              Celebrity Hosts:
            </span>
            <span className="text-xs sm:text-sm text-[#e0e1f8] font-semibold">
              Hosted by RJ Devaki & Thespian Siddharth Randeria
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#99907c]">
            <LiveTv className="w-4 h-4 text-[#ff9961]" />
            <span>Nightly Broadcast on DD Girnar & Global Livestream</span>
          </div>
        </div>
      </section>

      {/* STAR HEADLINERS & CELESTIAL MAESTROS */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#0f1222] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#f2ca50] font-['Playfair_Display'] text-xs tracking-widest uppercase">
                <span className="w-8 h-px bg-[#f2ca50]"></span>
                <span>Celestial Maestro Lineup</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e0e1f8]">
                The Golden Voices of Navratri
              </h2>
              <p className="text-sm text-[#d0c5af] max-w-xl">
                Witness legendary classical exponents, folk royalty, and state-of-the-art live dhol symphonies across all 9 nights.
              </p>
            </div>

            {/* Audio Anthem Interactive Player Widget */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1f2f] border border-[#26293a] backdrop-blur-md shadow-lg self-start md:self-auto">
              <button
                onClick={handleToggleAnthem}
                className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#3c2f00] flex items-center justify-center shadow-[0_0_16px_rgba(242,202,80,0.35)] hover:scale-105 transition-all"
              >
                {isPlayingAnthem ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <div className="flex flex-col pr-3">
                <span className="text-xs font-bold text-[#e0e1f8] tracking-wide">
                  Rasutsav Royal Anthem 2026
                </span>
                <span className="text-[11px] text-[#f2ca50]">
                  {isPlayingAnthem ? 'Playing: 50-Dhol Live Ensemble' : 'Listen to Live 50-Dhol Beats'}
                </span>
              </div>
              <button
                onClick={onOpenSoundStation}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-[#26293a] hover:bg-[#313445] text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
              >
                Full Station
              </button>
            </div>
          </div>

          {/* 4 Feature Maestro Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Artist 1: Falguni Pathak */}
            <div className="group rounded-2xl overflow-hidden bg-[#181b2b] border border-[#26293a] hover:border-[#f2ca50]/50 flex flex-col shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden bg-[#26293a]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqnwfPvMpR54PCfSzaeBlp2iKvJriTOsk5cjypdthF5FNJaV3H87Nc4ONlTDACZ5o52S10155kqpNYfGfNsgSQvzhc6Am7EHVd2R8-3mpn719-f5qRC8jobOJee2m-BUmEc8-EzYTFCZNLql3NZ-5zsmVmf1DtozkkXAFGtTQIHFltGwwMpVj6jELMvJyjAPI_QXHKs_srOve9dwlWcYfunRq3Ri6LoJDxrT4jsicKpGXWrBsE3lS2"
                  alt="Falguni Pathak"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181b2b] via-[#181b2b]/20 to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#cc003c] text-white font-semibold text-[11px] uppercase tracking-wider shadow-md">
                  Nights 1, 2 & 9
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="font-['Playfair_Display'] text-[11px] text-[#f2ca50] uppercase tracking-widest font-semibold">
                  The Dandiya Queen
                </span>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8] mt-0.5">
                  Falguni Pathak & Ta-Thaiya
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1.5 line-clamp-2">
                  The undisputed sovereign of Dandiya Raas brings her iconic 4-decade repertoire with 24 live musicians.
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#99907c] border-t border-[#26293a]">
                  <span className="flex items-center gap-1">
                    <Stadium className="w-3.5 h-3.5 text-[#f2ca50]" /> Royal AC Dome
                  </span>
                  <span className="text-[#f2ca50] font-semibold">21:00 Onwards</span>
                </div>
              </div>
            </div>

            {/* Artist 2: Sachin-Jigar */}
            <div className="group rounded-2xl overflow-hidden bg-[#181b2b] border border-[#26293a] hover:border-[#f2ca50]/50 flex flex-col shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden bg-[#26293a]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApsm3dYH5YeDhdiI4WLt6KMNqIwXc4kwYJZnjWmSiyZWm0HyjHfor5XyzKz4e7tvZKXDBNg1hJE5TU1JerJEodWwpU0uTebX16ZR8uCJKiajU6e3C3E2SVG126xEWmCxTFG6LrfVfv0aFwlX87_HWNsi2jUGepWgPKd-Nj6ZSq4CH5uOIgml9-XpxagEoZEjUP3bSnzUxO8RVFbcIVkUMIC0uUI7Yax7HKZqytqjE-OHnm75svR2Eh"
                  alt="Sachin-Jigar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181b2b] via-[#181b2b]/20 to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#3c2f00] font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Nights 4 & 5
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="font-['Playfair_Display'] text-[11px] text-[#f2ca50] uppercase tracking-widest font-semibold">
                  Symphonic Fusion Masters
                </span>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8] mt-0.5">
                  Sachin-Jigar Live Folk Troupe
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1.5 line-clamp-2">
                  Bollywood hitmakers merge high-tempo western brass arrangements with authentic Saurashtra Dhol roots.
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#99907c] border-t border-[#26293a]">
                  <span className="flex items-center gap-1">
                    <Stadium className="w-3.5 h-3.5 text-[#f2ca50]" /> Royal AC Dome
                  </span>
                  <span className="text-[#f2ca50] font-semibold">20:30 Onwards</span>
                </div>
              </div>
            </div>

            {/* Artist 3: Atul Purohit */}
            <div className="group rounded-2xl overflow-hidden bg-[#181b2b] border border-[#26293a] hover:border-[#f2ca50]/50 flex flex-col shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden bg-[#26293a]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN7geKsFqlyFsnaazxSeHH_uI608otxWLmjbTYcViSUHdMxy-S5u80fkAE7SZJWvRUUeavlk0t8hI-I3c2fgaD9LGQqRiK-AngcDCwmOwmbjWtm5Hfx8I4bm3ifUFjeLZWagb5ExwCvEKY3X64E6qYnTlG-whPyKRvDpoGLr2exW8Hawb13_CLg9QFUYYpywXfrTdoKnjzuNYPFGkooaKFs6O5rzlv2RcMyXJX6mBTzn8EMNge2RPQ"
                  alt="Atul Purohit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181b2b] via-[#181b2b]/20 to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#313445] text-[#e0e1f8] font-semibold text-[11px] uppercase tracking-wider shadow-md">
                  Nights 1, 3 & 6
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="font-['Playfair_Display'] text-[11px] text-[#f2ca50] uppercase tracking-widest font-semibold">
                  Heritage Classical Maestro
                </span>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8] mt-0.5">
                  Atul Purohit Garba Samrat
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1.5 line-clamp-2">
                  The consecrated voice of United Way Baroda brings timeless Prachin Garba ragas and Tara Vina Shyam.
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#99907c] border-t border-[#26293a]">
                  <span className="flex items-center gap-1">
                    <Park className="w-3.5 h-3.5 text-[#f2ca50]" /> Heritage Lawns
                  </span>
                  <span className="text-[#f2ca50] font-semibold">20:00 Onwards</span>
                </div>
              </div>
            </div>

            {/* Artist 4: Kinjal Dave & Osman Mir */}
            <div className="group rounded-2xl overflow-hidden bg-[#181b2b] border border-[#26293a] hover:border-[#f2ca50]/50 flex flex-col shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden bg-[#26293a]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUxo73MIlQifF4ucz22jWHEQTRWn0LyIN2GlZBgxiP5WGLoT2F7zVWUmS587giQ3qMN6fPIdVqMUW3KbxSucFcK_WsQgklAOA1PREAuX1qr9LNbhpTyP_O8BPxJ2OlvLyfLBHveWIONnTqGiHayXfxKnCHD9rvmpcjnjXYTacPHS4X15tMCkpPbt8fPTwU-wEffU1Wpe08ghV5EkiLcc5H2jto_fMEP7Ktce6n3IQJE7FvMoTtny4u"
                  alt="Kinjal Dave and Osman Mir"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181b2b] via-[#181b2b]/20 to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#ff9961] text-[#341100] font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Nights 7 & 8
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="font-['Playfair_Display'] text-[11px] text-[#ff9961] uppercase tracking-widest font-semibold">
                  Sufi & Desi High Voltage
                </span>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8] mt-0.5">
                  Kinjal Dave & Osman Mir
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1.5 line-clamp-2">
                  A spellbinding jugalbandi spanning soul-stirring Sufi qawwalis to high-octane 3-Taali anthems.
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#99907c] border-t border-[#26293a]">
                  <span className="flex items-center gap-1">
                    <Park className="w-3.5 h-3.5 text-[#f2ca50]" /> Heritage Lawns
                  </span>
                  <span className="text-[#f2ca50] font-semibold">21:00 Onwards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Percussion Feature */}
          <div className="mt-8 p-4 rounded-xl bg-[#14172e] border border-[#26293a] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#e0e1f8]">
                  50-Member Live Percussion & Nasik Dhol Ensemble
                </h4>
                <p className="text-xs text-[#d0c5af]">
                  Performing traditional Dakla, Tasha, and Dholak transitions between artist sets every 45 minutes.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToLineup}
              className="shrink-0 px-4 py-2 rounded-lg bg-[#26293a] hover:bg-[#313445] text-[#f2ca50] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View Complete 9-Day Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* DUAL ARENAS SHOWCASE */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#0a0d1d] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Architectural Grandeur
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e0e1f8] mt-1">
              Two Extraordinary Worlds. One Royal Sanctuary.
            </h2>
            <p className="text-sm text-[#d0c5af] mt-2">
              Choose between climate-controlled haute acoustic luxury or the ancestral mysticism of open-air midnight dhol under the autumn stars.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Arena 1: Royal AC Super-Dome */}
            <div className="rounded-2xl overflow-hidden bg-[#14172e] border border-[#26293a] shadow-2xl flex flex-col">
              <div className="h-64 sm:h-72 w-full relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdW8ti46OKKlfaqLWMuO1YCZ3i7HOnV2iKqPwwGCyYzHOBFb3B35CS4kk-kos6MG2bW9WPwid6PbHZZWjrXJIOfan9kkIh6rxfcC6VRM6W0__Mggl4f-SYCkHXK1zHx1Tl9hJylEkoirG7DuKobFAgDTc1IPLsc7-Eqhl3NO_7_Sfn7M8p9Zkxzvzx3QS6widNcHj8T8XqACpUgahETrpbOUuHpRKzrHISCRf-KdTnROodKWseYItp"
                  alt="Royal AC Super-Dome"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14172e] via-[#14172e]/30 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <AcUnit className="w-3.5 h-3.5" /> Climate Controlled 22°C
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                    Asia's Largest Enclosure
                  </span>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">
                    The Royal AC Super-Dome
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <p className="text-sm text-[#d0c5af]">
                  Engineered for absolute festival comfort. Dance for hours in zero-humidity air conditioning, surrounded by acoustic drapes and vibration-dampened wooden dance decking.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#e0e1f8]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                    <span>Line-Array Concert Sound Insulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                    <span>Triple-Layer Cushioned Wooden Floors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                    <span>Elevated VIP Boxes & Waiter Lounges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                    <span>Curated Royal Farali Gourmet Buffet</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#26293a]">
                  <span className="text-xs text-[#f2ca50]">Included in: VIP Pass & Super-Dome Passes</span>
                  <button
                    onClick={() => onNavigateToBooking('single-dome')}
                    className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#d4af37] hover:text-[#3c2f00] text-xs font-semibold text-[#e0e1f8] transition-all"
                  >
                    Select Arena →
                  </button>
                </div>
              </div>
            </div>

            {/* Arena 2: Grand Heritage Open Lawns */}
            <div className="rounded-2xl overflow-hidden bg-[#14172e] border border-[#26293a] shadow-2xl flex flex-col">
              <div className="h-64 sm:h-72 w-full relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQrxw3jHUgKXecQoJnrak8OYIBVWYXrlkmkaqd8rzcLr_pPvJ-c-iVXhikN_hfGPOgCUXz2vi-ziW3vtiGuKDJ90JLtLoo2bqZ9zy-h1LOrv_SXuL0_f2E6jS8yIOEgQaVukqdyKI22g9U58NMUsnMGb_hzKSSXU3zoEkrplSfRKifpIzoe1Ih4-svJkFZsoMlbT8hwlfqRJYwFskBmyFtqBqhBJY0fXvQRRc4NYKwam3zqNlD2N8"
                  alt="Grand Heritage Open Lawns"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14172e] via-[#14172e]/30 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#cc003c] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Park className="w-3.5 h-3.5" /> 15-Acre Starlit Amphitheatre
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-['Playfair_Display'] text-xs text-[#ffb3b6] uppercase tracking-widest font-semibold">
                    Ancestral Prachin Experience
                  </span>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">
                    Grand Heritage Open Lawns
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <p className="text-sm text-[#d0c5af]">
                  The sacred essence of classical Gujarati garba. Reconnect with primal rhythm beneath the autumn full moon, surrounded by fragrant marigold arches and midnight street feasts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#e0e1f8]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3b6]"></span>
                    <span>Open Sky Garba Vortex with 10,000 Diyas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3b6]"></span>
                    <span>360° Central Mandir Stage with Quad Sound</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3b6]"></span>
                    <span>Traditional 100+ Chauta Bazaar & Food Stalls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3b6]"></span>
                    <span>Dedicated Dandiya Raas Enclosure</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#26293a]">
                  <span className="text-xs text-[#ffb3b6]">Included in: General, Season & Free Passes</span>
                  <button
                    onClick={() => onNavigateToBooking('single-general')}
                    className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#cc003c] hover:text-white text-xs font-semibold text-[#e0e1f8] transition-all"
                  >
                    Select Lawns →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PASS CATEGORIES PREVIEW */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#0f1222] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Secure Your Sansthan Entry
              </span>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e0e1f8] mt-1">
                Pass Categories & Season Access
              </h2>
              <p className="text-sm text-[#d0c5af] max-w-xl">
                RFID digital wristbands with encrypted access credentials. All passes include sacred Prasadam coupon and hydration stations.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14172e] border border-[#26293a] text-xs text-[#99907c]">
              <Verified className="w-4 h-4 text-[#f2ca50]" />
              <span>Gujarat Tourism Certified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TICKET_TIERS.slice(0, 4).map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 ${
                  tier.isPopular
                    ? 'bg-[#181b2b] border-2 border-[#f2ca50] shadow-[0_0_30px_rgba(242,202,80,0.2)] -mt-2'
                    : 'bg-[#14172e] border border-[#26293a]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#d0c5af] font-medium">{tier.badge}</span>
                    {tier.savings && (
                      <span className="px-2 py-0.5 rounded bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold">
                        {tier.savings}
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8] mt-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#d0c5af] mt-1">{tier.subtitle}</p>

                  <div className="mt-4 pb-4 border-b border-[#26293a] flex items-baseline gap-1">
                    <span className="font-['Playfair_Display'] text-3xl font-bold text-[#f2ca50]">
                      {tier.price === 0 ? '₹0' : `₹${tier.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="text-xs text-[#99907c]">{tier.priceSuffix}</span>
                  </div>

                  <ul className="flex flex-col gap-2 mt-4 text-xs text-[#e0e1f8]">
                    {tier.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                        ) : (
                          <Close className="w-3.5 h-3.5 text-[#99907c] shrink-0" />
                        )}
                        <span className={f.included ? (f.bold ? 'font-bold text-[#ffe088]' : '') : 'text-[#99907c]'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateToBooking(tier.id)}
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#3c2f00] shadow-[0_0_16px_rgba(242,202,80,0.3)] hover:scale-105'
                      : 'bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8]'
                  }`}
                >
                  {tier.price === 0 ? 'Pre-Register Free' : 'Configure & Book'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLIMPSES OF RANGUTSAV PHOTO MOSAIC */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#0a0d1d] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Spiritual Splendor in Motion
              </span>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e0e1f8] mt-1">
                Glimpses of Rasutsav
              </h2>
              <p className="text-sm text-[#d0c5af] max-w-xl">
                From midnight Maha Aarti devotion to swirling mirror-work Chaniya Cholis and thundering Dhol rhythms.
              </p>
            </div>
            <span className="text-xs text-[#99907c]">Over 1,200 High-Res Festival Frames Uploaded Nightly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Tile 1: Mirror Work Dancers (Tall) */}
            <div className="md:col-span-2 lg:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group bg-[#181b2b] min-h-[360px] shadow-xl border border-[#26293a]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-iU1QQnbGhDpNC-5lojGn816JGmVEfyb4zrgGeDBieyePuhy2hiONkw5RK8UcoPPRUsWQRRk_zNT2KuHlxMkzJanCPwMtjAErKfuI_dLQie85Ioyq_9XDKn_-ilzvhgcdFovDGjfGvUAw2oCx63-ZoYNqjD6jJGhcPQEzcS1JbjlcTgYFBJZ3zWmuMsdf47O5MOh3rCrFrCcUBJbFA8ogWTM4JtSvSVKoAreDFgE84eTnp0DVDQr"
                alt="Mirror Work Garba Dancers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-[#0a0d1d]/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider">
                  Haute Heritage
                </span>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] mt-1">
                  The Swirl of Authentic Kutch Mirror-Work
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1 max-w-md">
                  Over 40,000 dancers adorned in consecrated Kutchi, Kathiawadi, and Bandhani heirloom attire.
                </p>
              </div>
            </div>

            {/* Tile 2: Maha Aarti Devotion */}
            <div className="rounded-2xl overflow-hidden relative group bg-[#181b2b] min-h-[220px] shadow-xl border border-[#26293a]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvRJpA2HIN9yYylx_3JNl4uN9BBypaklxZeK2Qo2SOj4SxSQ3_XiFzxQokc2rZuoEbs4eiyg21tkYaTOFewjTwQIESl6X1Bnuju-W7F_8eBy8DzbnnPLmB0qGHz4ppaaVoGT_x-wnL89Tc6q0rycqEJ3y0HenGMVWf_59qCAM60pQfWJiYHqlodaRVTIeZSZXxTMShYAWzLsgObJI6HUi5ATzrQ9R-1bUFgfz8X0SCsGf-jvNEBske"
                alt="Midnight Maha Aarti"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold text-[#f2ca50]">Midnight Maha Aarti</span>
                <p className="text-xs text-[#e0e1f8]">5,000 brass diyas lit in holy unison</p>
              </div>
            </div>

            {/* Tile 3: Live Dhol Players */}
            <div className="rounded-2xl overflow-hidden relative group bg-[#181b2b] min-h-[220px] shadow-xl border border-[#26293a]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpGP0oHGfJzwwEB7MpoyVUZf96iCzdVI279ITXdwSw1HCQteRBU-0rYCtgi3K-0Rvg_znE5nUm7sg_US9II6r4WN93oVAv9bKL9gBGEFUCY8IIrWSPztKLpZJIRsqlJfWrBb4_Z7tOUWikqSA4yvQk97lQiFdsZqe-XLqK70jS3O6C3fQho8xQGoRPjw49ZeTFy4dKK5PerIqCr-aqT08PRKdkxVLh4kAt0K7jNfq8hsoz7y1uf1Dg"
                alt="Pulse of Saurashtra Dhol"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold text-[#ff9961]">The Pulse of Saurashtra</span>
                <p className="text-xs text-[#e0e1f8]">High-octane Dhol rhythms</p>
              </div>
            </div>

            {/* Tile 4: Illuminated Mandala Stage */}
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl overflow-hidden relative group bg-[#181b2b] min-h-[220px] shadow-xl border border-[#26293a]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrm7xvYV2EuTTaSeVWKcXb8p18L9KJhucp0aSuS_h2Hw-mZwJeEXQpug3Dr8EysJP3dEdtRTNNbD24lJEly6aDyjQQ9Q-5DErqUPC4JT1H4HH3WNrH0mHSy9MED6jpnHyiuqKVBd4-LfGQ-FJkZ70P6M4JrhVliLjdGEQMj5MyBjn5I37dIFJ39lTLefl2_7DF_WzbBif07lGOCNe7Qpf2ZAK1uxZJDFpEv6s5VhRaGkjkNooqI-0J"
                alt="Maha Mandala Sanctum"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold text-[#f2ca50]">The Maha Mandala Sanctum</span>
                  <p className="text-xs text-[#e0e1f8]">360-degree tiered architectural installation</p>
                </div>
                <span className="text-[11px] text-[#99907c]">Ahmedabad Ground</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATRON REVIEWS & MEDIA ACCLAIM */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#0f1222] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Patron Acclaim
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e0e1f8] mt-1">
              Cherished by Revelers & Critics
            </h2>
            <div className="flex items-center justify-center gap-1 mt-2 text-[#f2ca50]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-semibold text-[#e0e1f8] ml-2">
                4.9 / 5 Rating (28,400+ Verified Devotee Reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <p className="text-xs sm:text-sm text-[#e0e1f8] italic leading-relaxed">
                “The AC Super-Dome was a total game-changer. Dancing for 5 uninterrupted hours in full traditional Chaniya Choli without exhaustion or humidity is something I never thought possible in Gujarat!”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center font-bold text-sm">
                  RP
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#e0e1f8]">Radhika Patel</span>
                  <span className="block text-[11px] text-[#99907c]">Garba Enthusiast, Vadodara</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <p className="text-xs sm:text-sm text-[#e0e1f8] italic leading-relaxed">
                “Rasutsav seamlessly bridges 600-year-old traditional Gujarati bhakti with modern arena acoustics. Security and crowd management protocols set an unprecedented benchmark for cultural mega-festivals.”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#313445] text-[#f2ca50] flex items-center justify-center font-bold text-xs">
                  TOI
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#e0e1f8]">The Times of India</span>
                  <span className="block text-[11px] text-[#99907c]">Annual Culture Desk 2024</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <p className="text-xs sm:text-sm text-[#e0e1f8] italic leading-relaxed">
                “We purchased the Royal VIP Season passes for our family of six. From dedicated valet drop-off to the divine Saatvik buffet and private balcony seating, the hospitality was truly palatial.”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cc003c]/20 text-[#ffb3b6] flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#e0e1f8]">Anand & Meera Shah</span>
                  <span className="block text-[11px] text-[#99907c]">Ahmedabad / New Jersey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CELEBRATION CTA */}
      <section className="w-full py-16 px-4 sm:px-8 bg-gradient-to-b from-[#0a0d1d] to-[#14172e] border-t border-[#26293a] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <TempleHindu className="w-10 h-10 text-[#f2ca50] animate-bounce" />
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e0e1f8] mt-3">
            Nine Sacred Nights. Infinite Joy. <br /> Be Part of History.
          </h2>
          <p className="text-sm text-[#d0c5af] mt-2 max-w-xl font-light">
            Tickets for VIP Enclosures and AC Mega-Dome are strictly limited to prevent overcrowding and ensure an authentic devotee experience.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToBooking()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e9c349] hover:from-[#f2ca50] hover:to-[#ffe088] text-[#3c2f00] font-bold text-sm shadow-[0_0_32px_rgba(242,202,80,0.5)] hover:scale-105 transition-transform"
            >
              Claim Your Early Bird Pass Now
            </button>
            <button
              onClick={onOpenSoundStation}
              className="px-6 py-3.5 rounded-xl bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8] font-semibold text-sm transition-colors"
            >
              Launch Garba Dhol Player
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
