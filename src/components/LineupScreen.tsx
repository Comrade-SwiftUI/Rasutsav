import React, { useState } from 'react';
import { FESTIVAL_DAYS, NavratriDay } from '../data/festivalData';
import {
  Clock,
  Sparkles,
  Park,
  AcUnit,
  ConfirmationNumber,
  Activity,
  Music,
  Radio,
  Sliders,
  ChevronRight,
  Shield,
  Star,
  Groups,
  Stadium as Synagogue,
  Sliders as FilterList
} from './Icons';

interface LineupScreenProps {
  onSelectPassBooking?: (tierId?: string) => void;
  onBookPasses?: () => void;
  onOpenSoundStation: () => void;
}

export const LineupScreen: React.FC<LineupScreenProps> = ({
  onSelectPassBooking,
  onBookPasses,
  onOpenSoundStation
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'free' | 'paid' | 'superdome' | 'lawn'>('all');
  const [activeDayId, setActiveDayId] = useState<string | null>(null);

  // Filter festival days
  const filteredDays = FESTIVAL_DAYS.filter((day) => {
    if (activeCategory === 'free') return day.isFree;
    if (activeCategory === 'paid') return !day.isFree;
    if (activeCategory === 'superdome') return day.venue === 'superdome' || day.venue === 'both';
    if (activeCategory === 'lawn') return day.venue === 'lawn' || day.venue === 'both';
    return true;
  });

  const handleScrollToDay = (dayId: string) => {
    setActiveDayId(dayId);
    const element = document.getElementById(dayId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-[#f2ca50]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#f2ca50]');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e0e1f8] pb-16">
      {/* Editorial Header Section */}
      <section className="w-full px-4 sm:px-8 pt-8 pb-10 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Breadcrumb & Live Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#d0c5af]">
              <span>Festival 2025</span>
              <ChevronRight className="w-3 h-3 text-[#99907c]" />
              <span className="text-[#f2ca50] font-semibold">Official Schedule & Lineup</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1f2f] border border-[#26293a] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              <span className="text-xs text-[#f2ca50] font-semibold">Live RFID Sync: 87% Passes Claimed</span>
            </div>
          </div>

          {/* Section Title & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-1.5">
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Devotion, Rhythm & Royalty
              </span>
              <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-[#e0e1f8]">
                The Nine Sacred Nights Calendar
              </h1>
              <p className="text-xs sm:text-sm text-[#d0c5af] max-w-2xl mt-1">
                Immerse in Gujarat’s definitive celebration of heritage. From classical Ghatasthapana ragas to 100-Dhol grand finales, witness consecrated maestros across state-of-the-art super arenas and heritage starry lawns.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="p-4 rounded-xl bg-[#14172e] border border-[#26293a] shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#99907c] uppercase tracking-wider">Sanctified Grounds</span>
                  <span className="font-['Playfair_Display'] text-base font-bold text-[#e0e1f8]">
                    GMDC Ground & Superdome
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'bg-[#181b2b] text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]'
                }`}
              >
                All 9 Nights
              </button>
              <button
                onClick={() => setActiveCategory('free')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === 'free'
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'bg-[#181b2b] text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]'
                }`}
              >
                Free Entry Nights
              </button>
              <button
                onClick={() => setActiveCategory('paid')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === 'paid'
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'bg-[#181b2b] text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]'
                }`}
              >
                Paid Passes
              </button>
              <button
                onClick={() => setActiveCategory('superdome')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === 'superdome'
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'bg-[#181b2b] text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]'
                }`}
              >
                AC Super-Dome Arena
              </button>
              <button
                onClick={() => setActiveCategory('lawn')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === 'lawn'
                    ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'bg-[#181b2b] text-[#d0c5af] hover:text-[#e0e1f8] hover:bg-[#26293a]'
                }`}
              >
                Open Heritage Lawn
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#99907c]">
              <FilterList className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>
                Showing <strong className="text-[#e0e1f8]">{filteredDays.length}</strong> of 9 Ceremonial Evenings
              </span>
            </div>
          </div>

          {/* Quick Day Tab Selector Strip */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex items-center gap-2.5 min-w-max">
              {FESTIVAL_DAYS.map((day) => (
                <button
                  key={day.id}
                  onClick={() => handleScrollToDay(day.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-left border transition-all ${
                    activeDayId === day.id
                      ? 'bg-[#26293a] border-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.25)] scale-105'
                      : 'bg-[#14172e] border-[#26293a] hover:border-[#f2ca50]/40'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center font-bold text-xs">
                    {day.dayNumber}
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-[#e0e1f8]">{day.date.split(',')[0]}</span>
                    <span className="block text-[10px] text-[#99907c]">{day.tithi}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9-Day Detailed Schedule Stream */}
      <section className="w-full px-4 sm:px-8 py-6 bg-[#0a0d1d]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {filteredDays.map((day) => (
            <article
              key={day.id}
              id={day.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#14172e] border border-[#26293a] hover:border-[#f2ca50]/40 transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Timing & Day title */}
                <div className="lg:col-span-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider">
                      Day 0{day.dayNumber} • {day.date.split(',')[0]}
                    </span>
                    {day.isFree ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#d4af37] text-[#3c2f00] text-[10px] font-bold">
                        Free Entry
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#26293a] text-[#ffb3b6] text-[10px] font-semibold">
                        Paid Pass
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] mt-1">
                    {day.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af] leading-relaxed">{day.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#99907c] mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                    <span>{day.timing} • Gate {day.gateOpens}</span>
                  </div>
                </div>

                {/* Middle: Artist Spotlight banner */}
                <div className="lg:col-span-5 flex items-center gap-4 p-3.5 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <img
                    src={day.artist.image}
                    alt={day.artist.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-md border border-[#26293a]"
                  />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider">
                      {day.artist.designation}
                    </span>
                    <h4 className="font-['Playfair_Display'] text-base font-bold text-[#e0e1f8] truncate">
                      {day.artist.name}
                    </h4>
                    <p className="text-xs text-[#d0c5af] line-clamp-2">{day.artist.bio}</p>
                    <span className="text-[10px] text-[#ff9961] font-semibold mt-0.5">
                      Taal: {day.artist.genre}
                    </span>
                  </div>
                </div>

                {/* Dress Code Theme & Venue Spec */}
                <div className="lg:col-span-2 flex flex-col gap-2">
                  <div className="p-2.5 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 border border-white/20 shadow-sm"
                      style={{ backgroundColor: day.dressCode.colorHex }}
                    ></span>
                    <div>
                      <span className="block text-[10px] text-[#99907c] uppercase">Dress Code</span>
                      <span className="text-xs font-bold text-[#e0e1f8]">{day.dressCode.colorName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#d0c5af]">
                    {day.venue === 'superdome' ? (
                      <>
                        <AcUnit className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>AC Super-Dome Arena</span>
                      </>
                    ) : day.venue === 'lawn' ? (
                      <>
                        <Park className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>Open Heritage Lawn</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>Both Super-Dome & Grounds</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right CTA */}
                <div className="lg:col-span-2 flex flex-col gap-1.5 justify-center items-start lg:items-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPassBooking) {
                        onSelectPassBooking(day.isFree ? 'free-community' : 'single-general');
                      } else if (onBookPasses) {
                        onBookPasses();
                      }
                    }}
                    className={`w-full lg:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                      day.isFree
                        ? 'bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00]'
                        : 'bg-[#26293a] hover:bg-[#d4af37] hover:text-[#3c2f00] text-[#e0e1f8]'
                    }`}
                  >
                    <span>{day.isFree ? 'Free RSVP Pass' : 'Book Night Pass'}</span>
                    <ConfirmationNumber className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-[#99907c]">
                    {day.isFree ? 'Pre-Registration Required' : `From ₹${day.priceFrom} / Night`}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DUAL ARENAS TECHNICAL SPECIFICATIONS */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Architectural Craftsmanship
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e0e1f8] mt-1">
              Dual Arenas, Unmatched Precision
            </h2>
            <p className="text-xs sm:text-sm text-[#d0c5af] max-w-2xl mt-1">
              Choose your festival atmosphere: the climatically controlled high-tech sanctuary of the Super-Dome or the celestial heritage expanse of the starlit open lawns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Superdome Technical Specs */}
            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-[#f2ca50]">
                    <AcUnit className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Weather-Proof Palace</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1c1f2f] text-xs font-bold text-[#f2ca50]">
                    250,000 Sq. Ft
                  </span>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] mt-1">
                  AC Super-Dome Arena
                </h3>
                <p className="text-xs text-[#d0c5af] mt-2">
                  Engineered with massive German hangar architecture, providing complete thermal comfort, zero sweat humidity, and certified safety infrastructure for over 25,000 concurrent dancers.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Chilled AC Capacity</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">240 Tons HVAC</span>
                    <span className="block text-[10px] text-[#d0c5af]">22°C ambient comfort</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Flooring System</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">Cushioned Teak</span>
                    <span className="block text-[10px] text-[#d0c5af]">Anti-skid shock deck</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Sound Distribution</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">L-Acoustics K2</span>
                    <span className="block text-[10px] text-[#d0c5af]">Line-array delay tuning</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Foot Fatigue</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">40% Less Stress</span>
                    <span className="block text-[10px] text-[#d0c5af]">Multi-ply sports sub-base</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0d1d] border border-[#26293a] flex items-center justify-between text-xs">
                <span className="text-[#e0e1f8]">HEPA Purified Clean Air Filtration Active</span>
                <span className="text-[#f2ca50] font-bold">Tier-1 Access</span>
              </div>
            </div>

            {/* Open Heritage Lawns Specs */}
            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-[#ff9961]">
                    <Park className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sacred Sky Heritage</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1c1f2f] text-xs font-bold text-[#ff9961]">
                    15 Acres Lawn
                  </span>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] mt-1">
                  Open Heritage Lawns
                </h3>
                <p className="text-xs text-[#d0c5af] mt-2">
                  Designed for those who revere the authentic cosmic experience of spinning under Ahmedabad’s moonlit autumn sky, enveloped by fragrant marigolds and central ceremonial pyres.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Surface Base</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">Compacted Velvet</span>
                    <span className="block text-[10px] text-[#d0c5af]">Heavy red carpet ring</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Celestial Lighting</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">Sky Beam Lasers</span>
                    <span className="block text-[10px] text-[#d0c5af]">360° starlit canopies</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Ritual Space</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">Maha Mandap</span>
                    <span className="block text-[10px] text-[#d0c5af]">1,000-person Aarti ring</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="block text-[10px] text-[#99907c]">Dhol Drummer Ring</span>
                    <span className="font-bold text-sm text-[#e0e1f8]">Live Acoustic Core</span>
                    <span className="block text-[10px] text-[#d0c5af]">Non-amplified dhols</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0d1d] border border-[#26293a] flex items-center justify-between text-xs">
                <span className="text-[#e0e1f8]">Traditional Circular Garba Rings (Sheri Garba Style)</span>
                <span className="text-[#ff9961] font-bold">Open to All Tiers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYMPHONY OF SOUND & ACOUSTIC ARCHITECTURE */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0a0d1d]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-3">
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Symphony Of Consecrated Sound
              </span>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e0e1f8]">
                Meet the Rhythm Conductors & Sonic Architects
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af]">
                Every beat reverberates with pinpoint fidelity. Over 50 classical percussionists, octapad virtuosos, and shehnai masters collaborate alongside an internationally recognized acoustic engineering consortium.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs">
                <button
                  onClick={onOpenSoundStation}
                  className="px-4 py-2 rounded-xl bg-[#f2ca50]/20 border border-[#f2ca50] text-[#f2ca50] font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(242,202,80,0.3)] hover:scale-105 transition-all"
                >
                  <Music className="w-4 h-4" />
                  <span>Launch Live Sound Synthesizer</span>
                </button>
                <div className="flex items-center gap-1.5 text-[#d0c5af]">
                  <Activity className="w-4 h-4 text-[#f2ca50]" />
                  <span>Zero Echo Cancellation</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#d0c5af]">
                  <Sliders className="w-4 h-4 text-[#f2ca50]" />
                  <span>&lt;2ms Latency Line Monitor</span>
                </div>
              </div>
            </div>

            {/* Live Acoustic Frequency Calibration Graphic */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#26293a]">
                <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                  Acoustic Balance • Decibel Calibration
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold">
                  Safety Certified 94 dB
                </span>
              </div>

              {/* Graphic Visual Spectrum Bars */}
              <div className="w-full h-32 flex items-end justify-between gap-1.5 py-3">
                <div className="w-1/12 bg-[#f2ca50]/30 rounded-t h-[35%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/40 rounded-t h-[55%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/60 rounded-t h-[75%]"></div>
                <div className="w-1/12 bg-[#f2ca50] rounded-t h-[92%] animate-pulse"></div>
                <div className="w-1/12 bg-[#ff9961] rounded-t h-[88%]"></div>
                <div className="w-1/12 bg-[#f2ca50] rounded-t h-[98%] animate-pulse"></div>
                <div className="w-1/12 bg-[#f2ca50]/80 rounded-t h-[70%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/50 rounded-t h-[60%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/40 rounded-t h-[45%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/30 rounded-t h-[30%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/20 rounded-t h-[25%]"></div>
                <div className="w-1/12 bg-[#f2ca50]/10 rounded-t h-[15%]"></div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block text-[10px] text-[#99907c]">Sub-Bass (Dhol)</span>
                  <span className="font-bold text-[#f2ca50]">42 Hz Crisp</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block text-[10px] text-[#99907c]">Mid-Vocals (Aarti)</span>
                  <span className="font-bold text-[#e0e1f8]">1.2 kHz True</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block text-[10px] text-[#99907c]">Treble (Dandiya)</span>
                  <span className="font-bold text-[#ffb3b6]">8.5 kHz Crisp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Master Instrumentalists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#14172e] border border-[#26293a] flex items-center gap-3">
              <Radio className="w-8 h-8 text-[#f2ca50] shrink-0" />
              <div>
                <span className="font-bold text-xs text-[#e0e1f8]">50+ Dhol Ensembles</span>
                <span className="block text-[11px] text-[#d0c5af]">Kathiawadi sheesham barrels</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#14172e] border border-[#26293a] flex items-center gap-3">
              <Music className="w-8 h-8 text-[#f2ca50] shrink-0" />
              <div>
                <span className="font-bold text-xs text-[#e0e1f8]">Shehnai Virtuosos</span>
                <span className="block text-[11px] text-[#d0c5af]">Auspicious festive ragas</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#14172e] border border-[#26293a] flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#f2ca50] shrink-0" />
              <div>
                <span className="font-bold text-xs text-[#e0e1f8]">Octapad Legends</span>
                <span className="block text-[11px] text-[#d0c5af]">Live Roland digital percussions</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#14172e] border border-[#26293a] flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#f2ca50] shrink-0" />
              <div>
                <span className="font-bold text-xs text-[#e0e1f8]">Zero Feedback Array</span>
                <span className="block text-[11px] text-[#d0c5af]">Acoustic ear protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROUP & MANDALA REGISTRATION BANNER */}
      <section className="w-full px-4 sm:px-8 py-10 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1e2246] via-[#14172e] to-[#1e2246] border border-[#f2ca50]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center shrink-0">
              <Groups className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8]">
                Planning a Group or Garba Mandala?
              </h4>
              <p className="text-xs text-[#d0c5af] mt-0.5">
                Special enclosure allotments for traditional Garba troupes (20+ revelers) with private changing vanity lounges.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onSelectPassBooking) onSelectPassBooking('royal-vip');
                else onBookPasses?.();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#26293a] hover:bg-[#313445] text-xs font-semibold text-[#e0e1f8] transition-all"
            >
              Mandala Registration
            </button>
            <button
              onClick={() => {
                if (onSelectPassBooking) onSelectPassBooking('season-pass');
                else onBookPasses?.();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-md transition-all"
            >
              Book All 9 Nights Pass
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
