import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { LineupScreen } from './components/LineupScreen';
import { BookingScreen } from './components/BookingScreen';
import { VisitorGuideScreen } from './components/VisitorGuideScreen';
import { Footer } from './components/Footer';
import { SoundStationModal } from './components/SoundStationModal';
import { BookMyShowModal } from './components/BookMyShowModal';
import { audioEngine } from './utils/audioEngine';
import { TicketTier } from './data/festivalData';
import { Music, Ticket, Volume2, Sparkles, AlertCircle } from 'lucide-react';

export type AppTab = 'home' | 'lineup' | 'booking' | 'guide';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);
  const [isBmsModalOpen, setIsBmsModalOpen] = useState(false);
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<TicketTier | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Scroll to top on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  useEffect(() => {
    const checkAudio = () => {
      setIsPlayingAudio(audioEngine.isPlayingState());
    };
    const interval = setInterval(checkAudio, 500);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBooking = (tier?: TicketTier) => {
    setSelectedTierForBooking(tier || null);
    setIsBmsModalOpen(true);
  };

  const handleToggleSound = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
    } else {
      audioEngine.playRhythm('dhol');
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070505] text-[#f5ebd6] selection:bg-[#f2ca50] selection:text-black flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSoundStation={() => setIsSoundModalOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomeScreen
            onNavigateToLineup={() => setCurrentTab('lineup')}
            onNavigateToBooking={() => {
              setCurrentTab('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToGuide={() => setCurrentTab('guide')}
            onOpenSoundStation={() => setIsSoundModalOpen(true)}
            onOpenTicketModal={handleOpenBooking}
          />
        )}

        {currentTab === 'lineup' && (
          <LineupScreen
            onBookPasses={() => setCurrentTab('booking')}
            onOpenSoundStation={() => setIsSoundModalOpen(true)}
          />
        )}

        {currentTab === 'booking' && (
          <BookingScreen
            onOpenBookMyShowModal={handleOpenBooking}
            onNavigateToGuide={() => setCurrentTab('guide')}
          />
        )}

        {currentTab === 'guide' && (
          <VisitorGuideScreen
            onNavigateToBooking={() => setCurrentTab('booking')}
            onOpenBookMyShowModal={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Floating Bottom Quick Action Dock on Mobile / Desktop */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        {/* Floating Sound Toggle */}
        <button
          onClick={() => setIsSoundModalOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
            isPlayingAudio
              ? 'bg-[#d4af37]/20 border-[#f2ca50] text-[#f2ca50] shadow-[#f2ca50]/20 animate-pulse'
              : 'bg-[#181313]/90 border-white/10 text-[#d4af37] hover:border-[#f2ca50]/50'
          }`}
          title="Open Navratri Garba Sound Studio"
        >
          <Music className={`w-4 h-4 ${isPlayingAudio ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Garba Beats</span>
          {isPlayingAudio && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
        </button>

        {/* Floating Book Passes Button */}
        {currentTab !== 'booking' && (
          <button
            onClick={() => handleOpenBooking()}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e63946] text-black font-extrabold text-sm shadow-[0_8px_30px_rgba(242,202,80,0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Passes</span>
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Sound Station Modal */}
      <SoundStationModal
        isOpen={isSoundModalOpen}
        onClose={() => setIsSoundModalOpen(false)}
      />

      {/* BookMyShow Pass Booking Modal */}
      <BookMyShowModal
        isOpen={isBmsModalOpen}
        onClose={() => setIsBmsModalOpen(false)}
        selectedTier={selectedTierForBooking}
      />
    </div>
  );
}
