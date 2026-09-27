import React, { useState } from 'react';
import { OFFICIAL_SUPPORT_PHONE, SHE_SAFETY_PHONE } from '../data/festivalData';
import { Sparkles, PhoneCall, CheckCircle, Shield, Mail, Radio, Camera, Film, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: 'home' | 'lineup' | 'booking' | 'guide') => void;
  onSelectTab?: (tab: 'home' | 'lineup' | 'booking' | 'guide') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onSelectTab }) => {
  const handleTab = (tab: 'home' | 'lineup' | 'booking' | 'guide') => {
    if (onSelectTab) onSelectTab(tab);
    else if (onNavigateTab) onNavigateTab(tab);
  };
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0a0d1d] border-t border-[#26293a] text-[#d0c5af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#26293a]">
          {/* Col 1: Branding & Heritage (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b38600] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#0a0d1d] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#f2ca50]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-['Playfair_Display'] text-lg font-bold text-[#f2ca50] tracking-wider uppercase">
                  Rasutsav Mahotsav
                </span>
                <span className="text-[10px] text-[#99907c] uppercase">Navratri 2025</span>
              </div>
            </div>

            <p className="text-xs text-[#d0c5af] leading-relaxed max-w-sm">
              Experience nine nights of celestial transcendence, resonant royal rhythm, and consecrated heritage under Ahmedabad's starlit canopies.
            </p>

            <div className="p-3 rounded-xl bg-[#14172e] border border-[#26293a] flex flex-col gap-1 text-xs">
              <span className="font-semibold text-[#f2ca50] uppercase tracking-wider text-[10px]">
                Patronage & Heritage
              </span>
              <span className="text-[#e0e1f8]">
                Presented by Royal Heritage Cultural Trust & Gujarat Tourism partner
              </span>
            </div>
          </div>

          {/* Col 2: Visitor Concierge (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Playfair_Display'] font-bold text-sm text-[#e0e1f8]">
              Visitor Concierge
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <button
                  onClick={() => handleTab('booking')}
                  className="hover:text-[#f2ca50] transition-colors text-left flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Pass Verification & RFID Bands</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTab('guide')}
                  className="hover:text-[#f2ca50] transition-colors text-left flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Box Office Pickup Counters</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTab('guide')}
                  className="hover:text-[#f2ca50] transition-colors text-left flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Interactive Ground Google Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTab('guide')}
                  className="hover:text-[#f2ca50] transition-colors text-left flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Traditional Attire & Dandiya Rules</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTab('guide')}
                  className="hover:text-[#f2ca50] transition-colors text-left flex items-center gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>First Aid & Ambulance Posts</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency 24/7 (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-['Playfair_Display'] font-bold text-sm text-[#e0e1f8]">
              Emergency 24/7
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#14172e] border border-[#26293a]">
                <span className="block text-[10px] text-[#ffb3b6] uppercase font-semibold">Helpline Direct</span>
                <span className="font-bold text-[#e0e1f8]">{OFFICIAL_SUPPORT_PHONE}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#14172e] border border-[#26293a]">
                <span className="block text-[10px] text-[#f2ca50] uppercase font-semibold">Women Safety Squad</span>
                <span className="font-bold text-[#e0e1f8]">Toll Free {SHE_SAFETY_PHONE}</span>
              </div>
              <span className="text-[10px] text-[#99907c]">Stationed across all 6 ground quadrants.</span>
            </div>
          </div>

          {/* Col 4: Daily Darshan & Photos Newsletter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Playfair_Display'] font-bold text-sm text-[#e0e1f8]">
              Daily Darshan & Photos
            </h4>
            <p className="text-xs text-[#d0c5af]">
              Subscribe for high-resolution morning Aarti photography, nightly garba high-reels, and artist announcement alerts.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-[#059669]/20 border border-[#059669]/40 text-[#059669] text-xs font-semibold">
                ✓ Subscribed! Dispatches delivered at 03:00 AM daily.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-1.5">
                <div className="flex items-center rounded-xl bg-[#14172e] border border-[#26293a] p-1 focus-within:border-[#f2ca50]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-1.5 text-xs text-[#e0e1f8] placeholder:text-[#99907c] outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] text-xs font-bold transition-colors"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-[#99907c]">Dispatches issued at 03:00 AM daily.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#99907c]">
          <p>© 2025 Rasutsav Navratri Mahotsav. Certified by Gujarat Tourism. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#f2ca50] cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#f2ca50] cursor-pointer transition-colors">Terms of Admission</span>
            <span>•</span>
            <span className="hover:text-[#f2ca50] cursor-pointer transition-colors">RFID Pass Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
