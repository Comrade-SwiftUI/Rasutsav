import React, { useState } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { PARKING_ZONES, BOX_OFFICE_HUBS, SHE_SAFETY_PHONE, MEDICAL_EMERGENCY_PHONE } from '../data/festivalData';
import {
  Shield,
  ShieldPerson,
  Videocam,
  Emergency,
  LocalParking,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  Car,
  Check,
  Close,
  Printer,
  Download
} from './Icons';

interface VisitorGuideScreenProps {
  onNavigateToBooking?: () => void;
  onOpenBookMyShowModal?: () => void;
}

export const VisitorGuideScreen: React.FC<VisitorGuideScreenProps> = ({
  onNavigateToBooking,
  onOpenBookMyShowModal
}) => {
  const [selectedHubForMap, setSelectedHubForMap] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full text-[#e0e1f8] pb-16">
      {/* Editorial Header Block */}
      <section className="relative w-full px-4 sm:px-8 pt-8 pb-12 flex flex-col items-center text-center bg-[#0f1222]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26293a] border border-[#f2ca50]/30 text-[#f2ca50] mb-4 shadow-sm">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">
            Official Operations & Protocol Guide
          </span>
        </div>

        <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl font-bold text-[#e0e1f8] mb-3 tracking-tight max-w-4xl">
          Visitor Guide, Parking Zones & Safety Protocols
        </h1>
        <p className="text-xs sm:text-base text-[#d0c5af] max-w-2xl font-light">
          Everything you need to know for a seamless, secure, and joyful festival experience across the 9 consecrated nights.
        </p>

        {/* Quick Metrics Strip */}
        <div className="w-full max-w-5xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="text-xs font-semibold">Total Parking</span>
              <LocalParking className="w-5 h-5 text-[#f2ca50]" />
            </div>
            <div className="mt-2">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">12,700+</span>
              <span className="block text-xs text-[#d0c5af]">Dedicated marked bays</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="text-xs font-semibold">Security Personnel</span>
              <ShieldPerson className="w-5 h-5 text-[#f2ca50]" />
            </div>
            <div className="mt-2">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">500+</span>
              <span className="block text-xs text-[#d0c5af]">Guards & SHE-Team</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="text-xs font-semibold">AI CCTV Coverage</span>
              <Videocam className="w-5 h-5 text-[#f2ca50]" />
            </div>
            <div className="mt-2">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">360° 4K</span>
              <span className="block text-xs text-[#d0c5af]">Command room sync</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#99907c]">
              <span className="text-xs font-semibold">Medical Emergency</span>
              <Emergency className="w-5 h-5 text-[#ffb3b6]" />
            </div>
            <div className="mt-2">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">2 ICU Units</span>
              <span className="block text-xs text-[#d0c5af]">Mobile trauma on site</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Logistics & Parking Architecture */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#0a0d1d]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
                Ground Logistics
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#e0e1f8] mt-1">
                Parking Architecture & Real-Time Capacity
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14172e] border border-[#26293a] text-xs text-[#d0c5af]">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              <span>Telemetry Updated 4 mins ago</span>
            </div>
          </div>

          {/* 4-Zone Matrix with Integrated Capacity Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {PARKING_ZONES.map((zone) => {
              const pct = Math.round((zone.occupiedBays / zone.totalBays) * 100);
              return (
                <div
                  key={zone.id}
                  className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between gap-4 shadow-lg hover:border-[#f2ca50]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${zone.badgeColor}`}>
                        {zone.zone}
                      </span>
                      <span className="text-xs font-semibold text-[#f2ca50]">{zone.gate}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#e0e1f8] mb-1">{zone.title}</h3>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">{zone.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#99907c]">Live Occupancy</span>
                      <span className="font-bold text-[#f2ca50]">
                        {pct}% ({zone.occupiedBays}/{zone.totalBays})
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#26293a] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#d4af37] to-[#f2ca50] rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span className="block mt-1 text-[11px] text-[#99907c]">{zone.statusText}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Google Maps Interactive Ground Layout & Traffic Advisory */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Google Map (8 cols) */}
            <div className="lg:col-span-8 p-4 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl flex flex-col">
              <InteractiveMap activeHubId={selectedHubForMap} />

              <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block font-bold text-[#f2ca50]">Gate 1</span>
                  <span className="text-[11px] text-[#99907c]">VIP & Artists Only</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block font-bold text-[#e0e1f8]">Gate 2 & 3</span>
                  <span className="text-[11px] text-[#99907c]">Cabs & Pedestrians</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block font-bold text-[#e0e1f8]">Gate 4</span>
                  <span className="text-[11px] text-[#99907c]">General 4-Wheelers</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0f1222] border border-[#26293a]">
                  <span className="block font-bold text-[#e0e1f8]">Gate 5 & 6</span>
                  <span className="text-[11px] text-[#99907c]">2-Wheelers & Box Office</span>
                </div>
              </div>
            </div>

            {/* Right: Traffic Advisory & Helpline (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#f2ca50] mb-3">
                  <Car className="w-5 h-5 text-[#f2ca50]" />
                  <span className="font-['Playfair_Display'] font-bold text-base text-[#e0e1f8]">
                    Traffic Advisory
                  </span>
                </div>
                <p className="text-xs text-[#d0c5af] leading-relaxed mb-4">
                  Peak entry congestion occurs between <strong className="text-[#e0e1f8]">08:00 PM and 09:30 PM</strong>. We urge revelers to arrive by 07:15 PM for sacred Sandhya Aarti and swift vehicle ingress.
                </p>

                <div className="space-y-3 text-xs text-[#e0e1f8]">
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50] mt-1 shrink-0"></span>
                    <span>Special Navratri Metro drops at Helmet Cross Road (600m walk).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#cc003c] mt-1 shrink-0"></span>
                    <span>No roadside parking on 132 Ft Ring Road (Strict Tow-away zone).</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#0a0d1d] border border-[#26293a]">
                <span className="block text-[10px] text-[#99907c] uppercase tracking-wider mb-1">
                  PARKING HELPLINE DISPATCH
                </span>
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50]">
                  +91 79 2658 9114
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Pass Collection Counter Layout */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Box Office & RFID Validation
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#e0e1f8] mt-1">
              Physical Pass Collection Counter Layout
            </h2>
            <p className="text-xs text-[#d0c5af] mt-1">
              Exchange your digital voucher for non-transferable tamper-proof RFID wristbands. Counters open daily from <strong>11:00 AM to 11:30 PM</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#d4af37] text-[#3c2f00] font-bold flex items-center justify-center text-sm mb-3">
                  A
                </div>
                <h3 className="font-bold text-sm text-[#e0e1f8] mb-1">Fast-Track Online Redemption</h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  12 dedicated scan bays for BookMyShow and official portal pre-bookings. Instant wristband tagging under 45 seconds.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-[#f2ca50] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Average queue: ~2 mins
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#26293a] text-[#e0e1f8] font-bold flex items-center justify-center text-sm mb-3">
                  B
                </div>
                <h3 className="font-bold text-sm text-[#e0e1f8] mb-1">Spot Booking & Box Office</h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  On-spot daily passes subject to real-time ground capacity. Accepts UPI, Credit/Debit cards, and INR currency.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-[#ffb3b6] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Closes at 9:30 PM nightly
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#f2ca50] text-[#3c2f00] font-bold flex items-center justify-center text-sm mb-3">
                  C
                </div>
                <h3 className="font-bold text-sm text-[#e0e1f8] mb-1">VIP & Lounge Access Bands</h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  Exclusive air-conditioned suite for Royal Pavilion, Corporate Boxes, and Season VVIP pass distribution with hospitality escort.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-[#f2ca50] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Zero waiting line
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#313445] text-[#e0e1f8] font-bold flex items-center justify-center text-sm mb-3">
                  D
                </div>
                <h3 className="font-bold text-sm text-[#e0e1f8] mb-1">Senior Citizens & Priority Desk</h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  Step-free ramp entry, seated desk verification, wheelchair requisition point, and priority assistant escorts.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-[#d0c5af] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" /> Dedicated wheelchair desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety, Women Protection & Emergency Wing */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#0a0d1d]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Zero Compromise
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#e0e1f8] mt-1">
              Safety, Women Protection & Emergency Wing
            </h2>
            <p className="text-xs sm:text-sm text-[#d0c5af] max-w-2xl mt-1">
              Engineered in direct partnership with Ahmedabad Police, State Disaster Response, and Certified Healthcare Providers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SHE-Team Deployment Flagship Card */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cc003c]/20 border border-[#cc003c]/40 text-[#ffb3b6] text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldPerson className="w-4 h-4" />
                  <span>Dedicated SHE-Team Deployment</span>
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8]">
                  Women Safety Squad & 4 Pink Sanctuary Kiosks
                </h3>
                <p className="text-xs sm:text-sm text-[#d0c5af] mt-2 leading-relaxed">
                  Equipped with plainclothes female officers circulating the garba circle, private SOS lounges, female guards at every turnstile, and zero-hesitation rapid response marshals. Any misbehavior results in immediate police detainment and criminal booking.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <div className="p-3.5 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="font-['Playfair_Display'] text-2xl font-bold text-[#ffb3b6] block">
                      1091
                    </span>
                    <span className="font-bold text-xs text-[#e0e1f8] block mt-0.5">
                      Toll-Free Direct SHE Helpline
                    </span>
                    <span className="text-[11px] text-[#99907c]">Dedicated inner control room link</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0f1222] border border-[#26293a]">
                    <span className="font-['Playfair_Display'] text-2xl font-bold text-[#f2ca50] block">
                      4 Kiosks
                    </span>
                    <span className="font-bold text-xs text-[#e0e1f8] block mt-0.5">
                      Pink Sanctuaries
                    </span>
                    <span className="text-[11px] text-[#99907c]">Sanitary kits, mirrors & counselors</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden h-40 bg-[#26293a]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ69O0LLjNoQwVCBXFzjNK4CSidfYdYubJXPIy3ppcMvjop4fRmxC1cvyuE2aPQb4_Zd_L0fsU3RRh9VM0MumRf1he-jlnKj_2KdQDrM1J6i2T9oJ7fJer--dQfnXrua73mq58Yx3nfZAcKIzI4EXLjL5sE7fyOMRqiIbaZI0QA8IAfgtGKC90970zTrOkBHHbBVV8A_c7ILCUH27Cnu3qGjKpbQopDLxPnr2p576FX8i0vD72Oz5e"
                  alt="High Tech Navratri Security Control Room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column Bento Items */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-lg">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center">
                    <Videocam className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#e0e1f8]">360° AI Surveillance</h4>
                    <span className="text-[10px] text-[#99907c]">Command room active 24/7</span>
                  </div>
                </div>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  Over 280 facial-recognition and density heat-mapping cameras analyze crowd flow in real-time, preventing bottlenecks and identifying uncredentialed zone trespassers instantly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-lg">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#cc003c]/20 text-[#ffb3b6] flex items-center justify-center">
                    <Emergency className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#e0e1f8]">Trauma & Medical Wing</h4>
                    <span className="text-[10px] text-[#99907c]">Partnered with Zydus Hospital</span>
                  </div>
                </div>
                <p className="text-xs text-[#d0c5af] leading-relaxed mb-3">
                  Two advanced life-support mobile ICU ambulances on immediate standby at Gate 1 and Gate 5. On-site 12-bed air-conditioned clinic with emergency doctors.
                </p>
                <div className="p-2.5 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-center justify-between text-xs">
                  <span className="text-[#e0e1f8]">Free Hydration & ORS</span>
                  <strong className="text-[#f2ca50]">Every 50 Meters</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-lg">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#e0e1f8]">Child Wristband & Lost Child Desk</h4>
                    <span className="text-[10px] text-[#99907c]">Mandatory for minors under 10</span>
                  </div>
                </div>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  Every child receives an encrypted waterproof contact wristband containing parent phone numbers at turnstiles. Lost kids are accompanied to the air-cooled nursery kiosk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct & Dress Code */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#0f1222]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="font-['Playfair_Display'] text-xs text-[#f2ca50] uppercase tracking-widest font-semibold">
              Preserving Sanctity
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#e0e1f8] mt-1">
              Festival Code of Conduct & Dress Code
            </h2>
            <p className="text-xs text-[#d0c5af] mt-1">
              Rasutsav is a consecrated spiritual celebration of Goddess Amba. We celebrate with royal decorum, timeless heritage, and shared communal respect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DO's */}
            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#f2ca50] mb-4">
                  <CheckCircle className="w-5 h-5 text-[#f2ca50]" />
                  <h3 className="font-bold text-sm text-[#e0e1f8]">Traditional Garb & Celebratory Etiquette</h3>
                </div>

                <div className="space-y-3 text-xs text-[#e0e1f8]">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Traditional Indian Festive Attire</strong>
                      <span className="text-[#d0c5af]">
                        Authentic mirror-work Chaniya Cholis, Bandhej Kediyu, Dhoti Kurta, or Sherwanis are honored and encouraged.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Wood or Padded Dandiyas Only</strong>
                      <span className="text-[#d0c5af]">
                        Use smoothed wooden or fiber dandiya sticks. Traditional bell-tassel batons must be securely tied.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Respect the Central Mandvi Garba Circle</strong>
                      <span className="text-[#d0c5af]">
                        The inner sanctuary revolves around Maa Amba’s Akhand Jyot. Shoes must be removed when entering the consecrated sanctum.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Carry Valid RFID Band at All Times</strong>
                      <span className="text-[#d0c5af]">
                        Do not tamper with, fold, or remove the wristband during the festival.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-center gap-3 text-xs text-[#d0c5af]">
                <Sparkles className="w-4 h-4 text-[#f2ca50] shrink-0" />
                <span>Costume emergency repair desks and dupatta styling booths available beside Gate 3.</span>
              </div>
            </div>

            {/* DONT's */}
            <div className="p-6 rounded-2xl bg-[#14172e] border border-[#26293a] flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-[#ffb3b6] mb-4">
                  <Close className="w-5 h-5 text-[#cc003c]" />
                  <h3 className="font-bold text-sm text-[#e0e1f8]">Strictly Prohibited Items & Eviction Rules</h3>
                </div>

                <div className="space-y-3 text-xs text-[#e0e1f8]">
                  <div className="flex items-start gap-2.5">
                    <Close className="w-4 h-4 text-[#cc003c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">No Metallic, Heavy Brass or Sharp Dandiyas</strong>
                      <span className="text-[#d0c5af]">
                        Metal weapons or pointed heavy props are banned for crowd safety and will be confiscated at bag scan.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Close className="w-4 h-4 text-[#cc003c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Zero Alcohol, Narcotics, Tobacco & Vapes</strong>
                      <span className="text-[#d0c5af]">
                        Rasutsav is a completely dry and smoke-free festival sanctuary. Intoxicated visitors will be handed straight to police patrol.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Close className="w-4 h-4 text-[#cc003c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Strict Anti-Harassment & Non-Consensual Recording</strong>
                      <span className="text-[#d0c5af]">
                        Unsolicited filming or stalking carries instant permanent eviction and criminal report.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Close className="w-4 h-4 text-[#cc003c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">No Large Backpacks or Outside Cooked Food</strong>
                      <span className="text-[#d0c5af]">
                        Only personal purses under 12"x12" permitted. Traditional fasting food courts are abundant inside.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-[#0f1222] border border-[#26293a] flex items-center gap-3 text-xs text-[#ffb3b6]">
                <Shield className="w-4 h-4 text-[#cc003c] shrink-0" />
                <span>Security personnel possess zero-tolerance authorization to invalidate RFID wristbands.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Rapid Action Emergency Grid */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#0a0d1d]">
        <div className="max-w-7xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#14172e] border border-[#26293a] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="font-['Playfair_Display'] text-xs text-[#ffb3b6] uppercase tracking-widest font-semibold">
                24/7 Rapid Action
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#e0e1f8] mt-0.5">
                Emergency & Ground Liaison Contact Grid
              </h2>
            </div>
            <span className="text-xs text-[#99907c]">Save these numbers to your device before visiting.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0f1222] border border-[#26293a] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#99907c] uppercase">POLICE & CENTRAL SECURITY</span>
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] block mt-1">
                  100 / 112
                </span>
                <span className="text-xs text-[#d0c5af] block mt-1">Direct tie-up with Gujarat Police on-site desk.</span>
              </div>
              <a href="tel:112" className="mt-4 text-xs font-semibold text-[#f2ca50] flex items-center gap-1 hover:underline">
                <span>Quick Call Control</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1222] border border-[#26293a] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#ffb3b6] uppercase">WOMEN SAFETY HELPLINE</span>
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#ffb3b6] block mt-1">
                  {SHE_SAFETY_PHONE}
                </span>
                <span className="text-xs text-[#d0c5af] block mt-1">SHE-Team immediate rapid intervention dispatch.</span>
              </div>
              <a href={`tel:${SHE_SAFETY_PHONE}`} className="mt-4 text-xs font-semibold text-[#ffb3b6] flex items-center gap-1 hover:underline">
                <span>Direct SHE Line</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1222] border border-[#26293a] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#99907c] uppercase">MEDICAL & AMBULANCE</span>
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] block mt-1">
                  {MEDICAL_EMERGENCY_PHONE}
                </span>
                <span className="text-xs text-[#d0c5af] block mt-1">Trauma response & field ICU vehicle dispatcher.</span>
              </div>
              <a href={`tel:${MEDICAL_EMERGENCY_PHONE}`} className="mt-4 text-xs font-semibold text-[#f2ca50] flex items-center gap-1 hover:underline">
                <span>Summon Medic Team</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1222] border border-[#26293a] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#99907c] uppercase">LOST & FOUND DESK</span>
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#e0e1f8] block mt-1">
                  +91 79 2658 9099
                </span>
                <span className="text-xs text-[#d0c5af] block mt-1">Child reunion lounge & lost property station.</span>
              </div>
              <a href="tel:+917926589099" className="mt-4 text-xs font-semibold text-[#f2ca50] flex items-center gap-1 hover:underline">
                <span>Report Item / Child</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#26293a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#99907c]">
            <span>All emergency stations are clearly illuminated with high-lumens overhead lanterns across every quadrant.</span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Offline Safety Guide</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
