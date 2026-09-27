import React, { useState } from 'react';
import { TICKET_TIERS, BOX_OFFICE_HUBS, TicketTier, BoxOfficeHub, REAL_BOOKMYSHOW_URL } from '../data/festivalData';
import {
  Sparkles,
  Shield,
  QrCode,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowForward,
  ExternalLink,
  Ticket,
  Calendar,
  Lock,
  Sliders,
  Check,
  Close,
  ChevronRight,
  Car
} from './Icons';

interface BookingScreenProps {
  onOpenCheckoutModal?: (tierId?: string) => void;
  onOpenBookMyShowModal?: (tier?: any) => void;
  onSelectHubForMap?: (hubId: string) => void;
  onNavigateToGuide?: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  onOpenCheckoutModal,
  onOpenBookMyShowModal,
  onSelectHubForMap,
  onNavigateToGuide
}) => {
  const handleOpenBooking = (tierOrId?: any) => {
    if (onOpenBookMyShowModal) {
      if (typeof tierOrId === 'string') {
        const found = TICKET_TIERS.find(t => t.id === tierOrId);
        onOpenBookMyShowModal(found);
      } else {
        onOpenBookMyShowModal(tierOrId);
      }
    } else if (onOpenCheckoutModal) {
      onOpenCheckoutModal(typeof tierOrId === 'string' ? tierOrId : tierOrId?.id);
    }
  };
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[2]); // Default 9-Night Season Pass
  const [filterType, setFilterType] = useState<'all' | 'single' | 'season'>('all');
  const [quantity, setQuantity] = useState(1);
  const [selectedValidity, setSelectedValidity] = useState('All 9 Nights (Oct 03 - Oct 11, 2025)');
  const [hasDandiya, setHasDandiya] = useState(false);
  const [hasParking, setHasParking] = useState(false);

  // Filter tiers
  const displayedTiers = TICKET_TIERS.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const basePrice = selectedTier.price * quantity;
  const dandiyaCost = hasDandiya ? 250 * quantity : 0;
  const parkingCost = hasParking ? 300 * quantity : 0;
  const taxable = basePrice + dandiyaCost + parkingCost;
  const gst = taxable > 0 ? taxable * 0.18 : 0;
  const grandTotal = taxable + gst;

  const handleSelectTier = (tier: TicketTier) => {
    setSelectedTier(tier);
    if (tier.type === 'season') {
      setSelectedValidity('All 9 Nights (Oct 03 - Oct 11, 2025)');
    } else {
      setSelectedValidity('Night 01 • Oct 03 (Pratipada - Opening)');
    }
    const customizerEl = document.getElementById('ticket-customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e0e1f8] pb-16">
      {/* Top Trust & Editorial Hero Header */}
      <section className="relative w-full px-4 sm:px-8 pt-8 pb-12 overflow-hidden bg-[#0f1222]">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#f2ca50]/10 blur-[128px] pointer-events-none"></div>
        <div className="absolute top-12 right-10 w-80 h-80 rounded-full bg-[#cc003c]/15 blur-[110px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26293a] border border-[#f2ca50]/30 shadow-md mb-4">
            <Sparkles className="w-4 h-4 text-[#f2ca50]" />
            <span className="text-xs text-[#f2ca50] tracking-widest uppercase font-semibold">
              Certified Box Office • Navratri 2025
            </span>
          </div>

          <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#e0e1f8] mb-3 tracking-tight">
            Official Festival Passes & Season Badges 2025
          </h1>
          <p className="text-xs sm:text-base text-[#d0c5af] max-w-2xl mb-8 font-light">
            Instant RFID digital confirmation + physical holographic pass kit dispatched to your hub. Select your access tier for sacred nights of rhythm, devotion, and high-energy Garba.
          </p>

          {/* Trust Badges Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl text-left">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1222]/80">
              <div className="w-10 h-10 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e0e1f8]">100% Genuine RFID</span>
                <span className="text-[11px] text-[#99907c]">Encrypted silicon chip</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1222]/80">
              <div className="w-10 h-10 rounded-lg bg-[#cc003c]/20 text-[#ffb3b6] flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e0e1f8]">QR-Based Entry</span>
                <span className="text-[11px] text-[#99907c]">Instant barcode sync</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1222]/80">
              <div className="w-10 h-10 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e0e1f8]">Zero Scalping</span>
                <span className="text-[11px] text-[#99907c]">Govt anti-scalping seal</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1222]/80">
              <div className="w-10 h-10 rounded-lg bg-[#313445] text-[#ff9961] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e0e1f8]">Govt Tax Inclusive</span>
                <span className="text-[11px] text-[#99907c]">Clean audit billing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Visual Showcase Bar */}
      <section className="w-full px-4 sm:px-8 mb-12 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group border border-[#26293a]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUDMBiyLxxr4ZKXiQxulREj909PMWZ3RkQE8PAv4XS-1c27Gn77bDLCAmzEzieBZUVOpi34n1yRJIlEh6Uy2WGF6Q3pT_qLy6grVWXL8jlZ2qUqTfomAqXVriEoXTdQlYSiSHyIYSOABupy_vHX96LZfEtcuHFfIbgTnOWujAzROr98glYrferKQDp6Hso4o4E5eerW9c-09plx4GVFtgKOMFK3uU0GQLJBWKPgFcJdL6_YyfDWT0j"
              alt="Grand Open-Air Heritage Quad"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-[#0a0d1d]/40 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] text-[#f2ca50] font-bold uppercase tracking-wider">Atmosphere</span>
              <span className="font-['Playfair_Display'] text-base font-bold text-[#e0e1f8]">
                Grand Open-Air Heritage Quad
              </span>
            </div>
          </div>

          <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group border border-[#26293a]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOy-kN6eOGGNKFeuozf5YJ4DJ94MqXmBVB1awR2ggQDKlm8ZrGI9md_jGcVdbGO5C6olkfMV9fRqPKIpbIliqCX5fuo934e5spEFCGQrY-Kr2lJNoBg2lSpsi0gSqbCIF3y2oRNPc9yYlyeb7o2SL7wMbO04XxahN72aeApFuz6nDBnnLNOgF8nDb--7ZQ0kVkxOd_PvkHQrCoVwjBrj-YwMySlaDZ-k_Ysiku7OoyTKk8oB3VuK3"
              alt="22°C Mega Super-Dome Arena"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-[#0a0d1d]/40 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] text-[#f2ca50] font-bold uppercase tracking-wider">Climate Control</span>
              <span className="font-['Playfair_Display'] text-base font-bold text-[#e0e1f8]">
                22°C Mega Super-Dome Arena
              </span>
            </div>
          </div>

          <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group border border-[#26293a]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo5QDoM25d159n-JEtXb9eKM4AtnnujkP2xIDKFdKyuffqg8HI96zlipWLz8IyT6FrUdHJAPd7NoiKg4auzv7t2xxs4Iw2Q6N58i43aTpiV8KFNInr13UnT6RN20apiaOx4nol7MIHvfnoTCayt8r_Ks2Un8JuXz0BIjQmQ54x77C96Nt_B7yS53w1xAGxFrdNZRNmIDSy4TbDNO9aYsN8wjLOLgGrB1CexZX7L_HJa31GI5a_x_yf"
              alt="Royal Enclosure & Artist Balcony"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1d] via-[#0a0d1d]/40 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] text-[#f2ca50] font-bold uppercase tracking-wider">Luxury Privilege</span>
              <span className="font-['Playfair_Display'] text-base font-bold text-[#e0e1f8]">
                Royal Enclosure & Artist Balcony
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BookMyShow Banner */}
      <section className="w-full px-4 sm:px-8 mb-10">
        <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-[#e11d48]/15 via-[#14172e] to-[#e11d48]/15 border border-[#e11d48]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#e11d48] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
              BMS
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#e0e1f8]">
                BookMyShow Official Ticketing Partner
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Book securely online with zero convenience fee for Phase 1 passes or proceed via our in-app gateway.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={REAL_BOOKMYSHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#e11d48] hover:bg-[#cc003c] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Book on BookMyShow</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => handleOpenBooking(selectedTier.id)}
              className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-md transition-all"
            >
              Instant In-App E-Pass
            </button>
          </div>
        </div>
      </section>

      {/* 6 Tiers Grid Matrix */}
      <section className="w-full px-4 sm:px-8 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Select Access Tier
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#e0e1f8]">
                Festive Passes & Season Enclosures
              </h2>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14172e] border border-[#26293a]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-[#d4af37] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-[#e0e1f8]'
                }`}
              >
                All Passes
              </button>
              <button
                onClick={() => setFilterType('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'single'
                    ? 'bg-[#d4af37] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-[#e0e1f8]'
                }`}
              >
                Daily Nights
              </button>
              <button
                onClick={() => setFilterType('season')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'season'
                    ? 'bg-[#d4af37] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-[#e0e1f8]'
                }`}
              >
                Season Badges
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative transition-all duration-300 ${
                  tier.isPopular
                    ? 'bg-[#181b2b] border-2 border-[#f2ca50] shadow-[0_0_35px_rgba(242,202,80,0.25)] lg:scale-105'
                    : 'bg-[#14172e] border border-[#26293a] hover:border-[#f2ca50]/40'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MOST POPULAR • BEST VALUE</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#26293a] text-[#d0c5af] font-semibold">
                      {tier.badge}
                    </span>
                    {tier.savings && (
                      <span className="text-xs font-bold text-[#ffb3b6]">{tier.savings}</span>
                    )}
                  </div>

                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] mt-3">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#d0c5af] mt-1.5 leading-relaxed">{tier.subtitle}</p>

                  <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-[#26293a]">
                    <span className="font-['Playfair_Display'] text-3xl font-bold text-[#f2ca50]">
                      {tier.price === 0 ? '₹0' : `₹${tier.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="text-xs text-[#99907c]">{tier.priceSuffix}</span>
                  </div>

                  <ul className="flex flex-col gap-2.5 text-xs text-[#e0e1f8] mb-6">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {feat.included ? (
                          <Check className="w-4 h-4 text-[#f2ca50] shrink-0" />
                        ) : (
                          <Close className="w-4 h-4 text-[#99907c] shrink-0" />
                        )}
                        <span className={feat.included ? (feat.bold ? 'font-bold text-[#ffe088]' : '') : 'text-[#99907c]'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      selectedTier.id === tier.id
                        ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_16px_rgba(242,202,80,0.4)]'
                        : 'bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8]'
                    }`}
                  >
                    <span>Configure Pass</span>
                    <ArrowForward className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(tier)}
                    className="p-2.5 rounded-xl bg-[#e11d48]/20 hover:bg-[#e11d48] text-[#ffb3b6] hover:text-white border border-[#e11d48]/30 transition-all"
                    title="Direct Book on BookMyShow Modal"
                  >
                    <Ticket className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking Drawer / Pass Customizer Widget */}
      <section className="w-full px-4 sm:px-8 mb-16" id="ticket-customizer">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#14172e] border border-[#f2ca50]/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#f2ca50]/10 blur-[96px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Customizer & Add-ons (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#f2ca50] text-xs uppercase tracking-wider font-semibold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Step 2 • Configure Your Pass Package</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">
                  Ticket Customizer & Add-ons
                </h3>
              </div>

              {/* Selected Tier Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0f1222] border border-[#26293a]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#99907c] uppercase">Selected Tier</span>
                    <span className="text-base font-bold text-[#e0e1f8]">{selectedTier.name}</span>
                  </div>
                </div>
                <span className="font-['Playfair_Display'] text-2xl font-bold text-[#f2ca50]">
                  {selectedTier.price === 0 ? 'FREE' : `₹${selectedTier.price.toLocaleString('en-IN')}`}
                </span>
              </div>

              {/* Date & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#d0c5af] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                    <span>Select Night or Validity</span>
                  </label>
                  <select
                    value={selectedValidity}
                    onChange={(e) => setSelectedValidity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0f1222] border border-[#26293a] text-xs text-[#e0e1f8] focus:border-[#f2ca50] outline-none cursor-pointer"
                  >
                    <option value="All 9 Nights (Oct 03 - Oct 11, 2025)">All 9 Nights (Oct 03 - Oct 11, 2025)</option>
                    <option value="Night 01 • Oct 03 (Pratipada - Opening)">Night 01 • Oct 03 (Pratipada - Opening)</option>
                    <option value="Night 02 • Oct 04 (Dwitiya - Kinjal Dave)">Night 02 • Oct 04 (Dwitiya - Kinjal Dave)</option>
                    <option value="Night 03 • Oct 05 (Tritiya - Osman Mir)">Night 03 • Oct 05 (Tritiya - Osman Mir)</option>
                    <option value="Night 04 • Oct 06 (Chaturthi - Sachin-Jigar)">Night 04 • Oct 06 (Chaturthi - Sachin-Jigar)</option>
                    <option value="Night 05 • Oct 07 (Panchami - Bhoomi Trivedi)">Night 05 • Oct 07 (Panchami - Bhoomi Trivedi)</option>
                    <option value="Night 06 • Oct 08 (Shasthi - Aditya Gadhvi)">Night 06 • Oct 08 (Shasthi - Aditya Gadhvi)</option>
                    <option value="Night 07 • Oct 09 (Saptami - Kirtidan Gadhvi)">Night 07 • Oct 09 (Saptami - Kirtidan Gadhvi)</option>
                    <option value="Night 08 • Oct 10 (Ashtami - Falguni Pathak)">Night 08 • Oct 10 (Ashtami - Falguni Pathak)</option>
                    <option value="Night 09 • Oct 11 (Navami - Grand Finale)">Night 09 • Oct 11 (Navami - Grand Finale)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#d0c5af]">Pass Quantity</label>
                  <div className="flex items-center justify-between px-4 py-1.5 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-[#1c1f2f] hover:bg-[#26293a] text-[#e0e1f8] font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-bold text-base text-[#f2ca50]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-[#1c1f2f] hover:bg-[#26293a] text-[#e0e1f8] font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <span className="text-xs font-semibold text-[#d0c5af] uppercase tracking-wider">
                  Enhance Your Experience
                </span>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0f1222] border border-[#26293a] cursor-pointer hover:border-[#f2ca50]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasDandiya}
                      onChange={(e) => setHasDandiya(e.target.checked)}
                      className="w-4 h-4 accent-[#f2ca50] rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#e0e1f8]">Carved Rosewood Dandiya Pair</span>
                      <span className="text-[11px] text-[#99907c]">Handcrafted Saurashtra artisans, brass bell accents</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#f2ca50]">+₹250</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0f1222] border border-[#26293a] cursor-pointer hover:border-[#f2ca50]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasParking}
                      onChange={(e) => setHasParking(e.target.checked)}
                      className="w-4 h-4 accent-[#f2ca50] rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#e0e1f8]">Reserved Gate-1 VIP Parking Pass</span>
                      <span className="text-[11px] text-[#99907c]">Guaranteed covered bay next to arena security gates</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#f2ca50]">+₹300</span>
                </label>
              </div>
            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#0f1222] border border-[#26293a] shadow-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#26293a]">
                  <span className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8]">
                    Order Summary
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[10px] font-bold">
                    GST Compliant
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-xs text-[#d0c5af]">
                  <div className="flex justify-between">
                    <span>{selectedTier.name} (x{quantity})</span>
                    <span className="text-[#e0e1f8] font-semibold">₹{basePrice.toLocaleString('en-IN')}.00</span>
                  </div>

                  {hasDandiya && (
                    <div className="flex justify-between">
                      <span>Carved Dandiya Sticks (x{quantity})</span>
                      <span className="text-[#e0e1f8] font-semibold">₹{dandiyaCost.toLocaleString('en-IN')}.00</span>
                    </div>
                  )}

                  {hasParking && (
                    <div className="flex justify-between">
                      <span>VIP Gate-1 Parking (x{quantity})</span>
                      <span className="text-[#e0e1f8] font-semibold">₹{parkingCost.toLocaleString('en-IN')}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-1 border-t border-[#26293a]">
                    <span>Govt Cultural Cess & GST (18%)</span>
                    <span className="text-[#e0e1f8] font-semibold">₹{gst.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#14172e] border border-[#26293a] flex items-start gap-2.5 text-xs text-[#99907c]">
                  <CheckCircle className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                  <p>
                    Physical holographic wristband will be issued at selected box office upon presenting QR voucher & Govt photo ID.
                  </p>
                </div>
              </div>

              {/* Total & CTA Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-[#26293a]">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="block text-[10px] text-[#99907c] uppercase">Final Payable Amount</span>
                    <span className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#f2ca50]">
                      ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#99907c]">Instant SMS / WhatsApp QR</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(selectedTier.id)}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e9c349] hover:from-[#f2ca50] hover:to-[#ffe088] text-[#3c2f00] font-bold text-sm shadow-[0_0_24px_rgba(242,202,80,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Secure Payment</span>
                  <ArrowForward className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#99907c]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted • UPI / Cards / NetBanking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Pass Collection Centers (Box Office Hubs) */}
      <section className="w-full px-4 sm:px-8 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Physical Pass Dispatch
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#e0e1f8] mt-1">
                Box Office Collection Hubs
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af] max-w-2xl mt-1">
                Collect your physical RFID wristband kit, water-sealed holographic badges, and complimentary Dandiya sticks at any of our 4 official city kiosks prior to entering festival gates.
              </p>
            </div>
            {onNavigateToGuide && (
              <button
                onClick={onNavigateToGuide}
                className="px-4 py-2 rounded-xl bg-[#14172e] hover:bg-[#26293a] border border-[#26293a] text-xs font-semibold text-[#f2ca50] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <span>View Google Ground Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOX_OFFICE_HUBS.map((hub) => (
              <div
                key={hub.id}
                className="rounded-2xl p-4 bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-lg hover:border-[#f2ca50]/50 transition-all"
              >
                <div>
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-[#26293a]">
                    <img src={hub.image} alt={hub.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0a0d1d]/85 backdrop-blur text-[10px] font-bold text-[#f2ca50]">
                      {hub.hubNumber}
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-[#e0e1f8] leading-tight mb-1">{hub.name}</h4>
                  <span className="block text-xs font-semibold text-[#f2ca50] mb-2">{hub.location}</span>
                  <p className="text-xs text-[#d0c5af] leading-relaxed">{hub.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#26293a] flex items-center justify-between text-xs">
                  <span className="text-[#99907c] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                    {hub.hours}
                  </span>
                  <span className="text-[#f2ca50] font-bold">{hub.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Verification Checklist */}
          <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8]">
                  Mandatory Verification Checklist
                </h4>
                <p className="text-xs text-[#d0c5af] max-w-2xl mt-0.5">
                  To pick up your physical RFID wristband kit and security hologram badge, please present the following at the kiosk:
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#e0e1f8]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#f2ca50]" /> Digital Booking Confirmation SMS / Email
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#f2ca50]" /> Original Govt ID (Aadhaar / Voter / DL)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#f2ca50]" /> Primary Holder Mobile for OTP Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
