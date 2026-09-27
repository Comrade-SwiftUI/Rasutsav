import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Volume2, VolumeX, Calendar, Music, Sparkles, ExternalLink, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'lineup' | 'booking' | 'guide';
  setCurrentTab?: (tab: 'home' | 'lineup' | 'booking' | 'guide') => void;
  onSelectTab?: (tab: 'home' | 'lineup' | 'booking' | 'guide') => void;
  openBookingModal?: (tierId?: string) => void;
  onOpenBooking?: (tierId?: string) => void;
  openSoundModal?: () => void;
  onOpenSoundStation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onSelectTab,
  openBookingModal,
  onOpenBooking,
  openSoundModal,
  onOpenSoundStation
}) => {
  const handleSelectTab = (tab: 'home' | 'lineup' | 'booking' | 'guide') => {
    if (onSelectTab) onSelectTab(tab);
    else if (setCurrentTab) setCurrentTab(tab);
  };

  const handleOpenBooking = (tierId?: string) => {
    if (onOpenBooking) onOpenBooking(tierId);
    else if (openBookingModal) openBookingModal(tierId);
  };

  const handleOpenSound = () => {
    if (onOpenSoundStation) onOpenSoundStation();
    else if (openSoundModal) openSoundModal();
  };
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlayingAudio(state.isPlaying);
    });
    return unsub;
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      audioEngine.stop();
    } else {
      audioEngine.toggleRhythm('dhol');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Auspicious Announcement Bar */}
      <aside
        aria-label="Festival Announcement"
        className="w-full bg-[#0a0d1d]/95 backdrop-blur-md border-b border-[#f2ca50]/15 shadow-[0_1px_12px_rgba(242,202,80,0.08)]"
      >
        <div className="w-full px-4 sm:px-8 h-9 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex-1 flex items-center justify-center gap-2 text-center text-[#f2ca50] tracking-wider uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
            <span className="truncate">
              Phase 1 Early Bird Passes selling fast! Free entry on Sharad Purnima Night
              (Pre-registration required)
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse hidden sm:inline-block"></span>
          </div>

          {/* Quick Sound Station Launcher in Top Strip */}
          <button
            onClick={openSoundModal}
            className="hidden md:flex items-center gap-1.5 text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors py-0.5 px-2 rounded bg-[#1c1f2f]/80 border border-[#f2ca50]/20"
          >
            <Music className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>Sound & Dhol Station</span>
          </button>
        </div>
      </aside>

      {/* Main Glassmorphic Navigation Bar */}
      <header className="w-full bg-[#0a0d1d]/90 backdrop-blur-xl border-b border-[#26293a]/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Royal Title */}
          <div
            onClick={() => {
              handleSelectTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#f2ca50] to-[#b38600] p-0.5 shadow-[0_0_18px_rgba(242,202,80,0.35)] group-hover:shadow-[0_0_26px_rgba(242,202,80,0.6)] transition-all">
              <div className="w-full h-full bg-[#0f1222] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#f2ca50] group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold tracking-widest text-[#f2ca50] uppercase leading-none drop-shadow-sm">
                Rasutsav
              </span>
              <span className="text-[11px] sm:text-xs text-[#d0c5af] font-medium tracking-wider uppercase mt-1">
                Navratri Mahotsav 2025
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#181b2b]/80 border border-[#26293a]">
            <button
              onClick={() => handleSelectTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                  : 'text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleSelectTab('lineup')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'lineup'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                  : 'text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]/60'
              }`}
            >
              Events & Lineup
            </button>
            <button
              onClick={() => handleSelectTab('booking')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'booking'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                  : 'text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]/60'
              }`}
            >
              Passes & Booking
            </button>
            <button
              onClick={() => handleSelectTab('guide')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'guide'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                  : 'text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]/60'
              }`}
            >
              Visitor Guide & Safety
            </button>
          </nav>

          {/* Right Action Controls: Sound Player, Date Badge, Book Passes */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Festival Date Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1f2f] border border-[#26293a] text-xs text-[#d0c5af]">
              <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>Oct 03 - Oct 11, 2025 • GMDC Ground</span>
            </div>

            {/* Quick Audio Beats Toggle Button */}
            <button
              onClick={handleToggleSound}
              title={isPlayingAudio ? 'Pause Navratri Dhol Beats' : 'Play Live 50-Dhol Ensemble'}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                isPlayingAudio
                  ? 'bg-[#f2ca50]/20 border-[#f2ca50] text-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.3)] animate-pulse'
                  : 'bg-[#181b2b] border-[#26293a] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/40'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#f2ca50]" />
                  <span className="hidden sm:inline text-xs font-semibold">Dhol On</span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-[#f2ca50] h-2 rounded-full animate-bounce"></span>
                    <span className="w-0.5 bg-[#f2ca50] h-3 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-0.5 bg-[#f2ca50] h-1.5 rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#99907c]" />
                  <span className="hidden sm:inline text-xs">Play Dhol</span>
                </>
              )}
            </button>

            {/* Primary Book Passes CTA */}
            <button
              onClick={() => handleOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e9c349] hover:from-[#f2ca50] hover:to-[#ffe088] text-[#3c2f00] font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_24px_rgba(242,202,80,0.35)] hover:shadow-[0_0_36px_rgba(242,202,80,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book Passes</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#181b2b] border border-[#26293a] text-[#e0e1f8]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-4 bg-[#0f1222] border-b border-[#26293a] flex flex-col gap-2">
            <button
              onClick={() => {
                handleSelectTab('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentTab === 'home' ? 'bg-[#d4af37] text-[#3c2f00]' : 'text-[#e0e1f8]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                handleSelectTab('lineup');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentTab === 'lineup' ? 'bg-[#d4af37] text-[#3c2f00]' : 'text-[#e0e1f8]'
              }`}
            >
              Events & Lineup
            </button>
            <button
              onClick={() => {
                handleSelectTab('booking');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentTab === 'booking' ? 'bg-[#d4af37] text-[#3c2f00]' : 'text-[#e0e1f8]'
              }`}
            >
              Passes & Booking
            </button>
            <button
              onClick={() => {
                handleSelectTab('guide');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                currentTab === 'guide' ? 'bg-[#d4af37] text-[#3c2f00]' : 'text-[#e0e1f8]'
              }`}
            >
              Visitor Guide & Safety
            </button>
            <div className="pt-2 border-t border-[#26293a] flex items-center justify-between">
              <button
                onClick={() => {
                  handleOpenSound();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-[#f2ca50]"
              >
                <Music className="w-4 h-4" />
                <span>Open Sound Station</span>
              </button>
              <button
                onClick={() => {
                  handleOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-[#3c2f00] text-xs font-bold"
              >
                Book
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
