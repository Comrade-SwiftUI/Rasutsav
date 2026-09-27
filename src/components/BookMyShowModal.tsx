import React, { useState, useEffect } from 'react';
import { TICKET_TIERS, REAL_BOOKMYSHOW_URL, TicketTier } from '../data/festivalData';
import { X, CheckCircle, ExternalLink, Ticket, QrCode, Shield, Download, Printer, Sparkles, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookMyShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
  selectedTier?: TicketTier | null;
}

export const BookMyShowModal: React.FC<BookMyShowModalProps> = ({
  isOpen,
  onClose,
  initialTierId = 'season-pass',
  selectedTier
}) => {
  const [selectedTierId, setSelectedTierId] = useState(selectedTier?.id || initialTierId);

  useEffect(() => {
    if (selectedTier) {
      setSelectedTierId(selectedTier.id);
    }
  }, [selectedTier]);
  const [selectedNight, setSelectedNight] = useState('all-9');
  const [quantity, setQuantity] = useState(1);
  const [hasDandiya, setHasDandiya] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [holderName, setHolderName] = useState('Bhavesh Chavda');
  const [holderPhone, setHolderPhone] = useState('+91 98765 43210');

  // Booking completion state
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<any>(null);

  if (!isOpen) return null;

  const currentTier = TICKET_TIERS.find((t) => t.id === selectedTierId) || TICKET_TIERS[2];

  const basePrice = currentTier.price * quantity;
  const dandiyaPrice = hasDandiya ? 250 * quantity : 0;
  const parkingPrice = hasParking ? 300 * quantity : 0;
  const subtotal = basePrice + dandiyaPrice + parkingPrice;
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxable = Math.max(0, subtotal - discountAmount);
  const gst = taxable > 0 ? taxable * 0.18 : 0;
  const finalTotal = taxable + gst;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GARBA2025' || promoCode.trim().toUpperCase() === 'BOOKMYSHOW') {
      setDiscountPercent(10);
      setPromoMessage('Promo Code Applied: 10% Festive Discount Activated!');
    } else {
      setPromoMessage('Invalid code. Try "GARBA2025" for 10% off!');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f2ca50', '#e11d48', '#ff9961']
    });

    const bookingRef = 'BMS-RASUT-' + Math.floor(100000 + Math.random() * 900000);
    const rfidChip = 'RFID-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    setConfirmedBookingData({
      bookingRef,
      rfidChip,
      holderName,
      holderPhone,
      tierName: currentTier.name,
      quantity,
      selectedNight: selectedNight === 'all-9' ? 'All 9 Nights (Oct 03 - 11, 2025)' : selectedNight,
      totalPaid: finalTotal,
      gate: currentTier.id.includes('vip') ? 'Gate 1 (Royal Red Carpet VIP)' : 'Gate 2 & 3 (Express Turnstile)',
      dateIssued: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    });

    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    setConfirmedBookingData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-[#14172e] border border-[#f2ca50]/30 shadow-[0_0_60px_rgba(242,202,80,0.3)] overflow-hidden">
        {/* Header Strip with BookMyShow Official Branding */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#26293a] bg-[#0a0d1d]/90">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded bg-[#e11d48] text-white font-bold text-xs tracking-wider uppercase">
              BookMyShow
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8]">
                {bookingConfirmed ? 'Official RFID E-Pass Confirmation' : 'Official Festival Ticket Desk'}
              </h3>
              <p className="text-xs text-[#d0c5af]">Rasutsav Navratri Mahotsav 2025 • GMDC Ground</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#99907c] hover:text-[#e0e1f8] hover:bg-[#26293a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!bookingConfirmed ? (
          <form onSubmit={handleConfirmBooking} className="p-6 flex flex-col gap-5">
            {/* Direct External Link to Real BookMyShow Portal */}
            <div className="p-3 rounded-xl bg-[#e11d48]/10 border border-[#e11d48]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Ticket className="w-5 h-5 text-[#e11d48] shrink-0" />
                <span className="text-xs text-[#ffb3b6]">
                  Looking for the direct web portal? You can also view this event directly on BookMyShow:
                </span>
              </div>
              <a
                href={REAL_BOOKMYSHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#e11d48] hover:bg-[#cc003c] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>BookMyShow Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Select Access Tier */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#d0c5af] uppercase tracking-wider">
                Select Access Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TICKET_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3 rounded-xl text-left border flex flex-col justify-between transition-all ${
                      selectedTierId === tier.id
                        ? 'bg-[#d4af37]/20 border-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.25)]'
                        : 'bg-[#181b2b] border-[#26293a] hover:border-[#f2ca50]/40'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#e0e1f8] truncate">{tier.name}</span>
                    <span className="text-xs font-bold text-[#f2ca50] mt-1">
                      {tier.price === 0 ? 'FREE' : `₹${tier.price.toLocaleString('en-IN')}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date / Validity Selection & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#d0c5af]">Select Validity / Night</label>
                <select
                  value={selectedNight}
                  onChange={(e) => setSelectedNight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#181b2b] border border-[#26293a] text-xs text-[#e0e1f8] focus:border-[#f2ca50] outline-none"
                >
                  <option value="all-9">All 9 Nights (Oct 03 - 11, 2025)</option>
                  <option value="Night 01 • Oct 03 (Pratipada - Grand Opening)">Night 01 • Oct 03 (Pratipada - Opening)</option>
                  <option value="Night 02 • Oct 04 (Dwitiya - Kinjal Dave)">Night 02 • Oct 04 (Dwitiya - Kinjal Dave)</option>
                  <option value="Night 03 • Oct 05 (Tritiya - Osman Mir)">Night 03 • Oct 05 (Tritiya - Osman Mir)</option>
                  <option value="Night 04 • Oct 06 (Chaturthi - Sachin-Jigar)">Night 04 • Oct 06 (Chaturthi - Sachin-Jigar)</option>
                  <option value="Night 05 • Oct 07 (Panchami - Bhoomi Trivedi)">Night 05 • Oct 07 (Panchami - Bhoomi Trivedi)</option>
                  <option value="Night 06 • Oct 08 (Shasthi - Aditya Gadhvi)">Night 06 • Oct 08 (Shasthi - Aditya Gadhvi)</option>
                  <option value="Night 07 • Oct 09 (Saptami - Kirtidan Gadhvi)">Night 07 • Oct 09 (Saptami - Kirtidan Gadhvi)</option>
                  <option value="Night 08 • Oct 10 (Ashtami - Falguni Pathak)">Night 08 • Oct 10 (Ashtami - Falguni Pathak)</option>
                  <option value="Night 09 • Oct 11 (Navami - 100-Dhol Finale)">Night 09 • Oct 11 (Navami - 100-Dhol Finale)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#d0c5af]">Pass Quantity</label>
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#181b2b] border border-[#26293a]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-[#f2ca50]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-[#26293a] hover:bg-[#313445] text-[#e0e1f8] font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Holder Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#d0c5af]">Pass Holder Name</label>
                <input
                  type="text"
                  required
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#181b2b] border border-[#26293a] text-xs text-[#e0e1f8] focus:border-[#f2ca50] outline-none"
                  placeholder="Enter full name as per Govt ID"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#d0c5af]">Mobile for Instant WhatsApp QR</label>
                <input
                  type="tel"
                  required
                  value={holderPhone}
                  onChange={(e) => setHolderPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#181b2b] border border-[#26293a] text-xs text-[#e0e1f8] focus:border-[#f2ca50] outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Add-on Experiences */}
            <div className="flex flex-col gap-2 pt-1 border-t border-[#26293a]">
              <span className="text-xs font-semibold text-[#d0c5af]">Festival Add-Ons</span>
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#181b2b] border border-[#26293a] cursor-pointer hover:border-[#f2ca50]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasDandiya}
                    onChange={(e) => setHasDandiya(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#e0e1f8]">Carved Rosewood Dandiya Pair</span>
                    <span className="text-[10px] text-[#99907c]">Handcrafted Saurashtra brass bell sticks</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#f2ca50]">+₹250</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#181b2b] border border-[#26293a] cursor-pointer hover:border-[#f2ca50]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasParking}
                    onChange={(e) => setHasParking(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#e0e1f8]">Reserved Gate-1 VIP Parking Pass</span>
                    <span className="text-[10px] text-[#99907c]">Guaranteed covered bay next to arena</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#f2ca50]">+₹300</span>
              </label>
            </div>

            {/* Promo Code Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder='Enter promo code (e.g. "GARBA2025")'
                  className="flex-1 px-3 py-2 rounded-xl bg-[#181b2b] border border-[#26293a] text-xs text-[#e0e1f8] focus:border-[#f2ca50] outline-none uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#313445] text-xs font-semibold text-[#f2ca50]"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <span className={`text-[11px] ${discountPercent > 0 ? 'text-[#059669]' : 'text-[#ffb4ab]'}`}>
                  {promoMessage}
                </span>
              )}
            </div>

            {/* Order Cost Breakdown */}
            <div className="p-3.5 rounded-xl bg-[#0a0d1d] border border-[#26293a] flex flex-col gap-1.5 text-xs text-[#d0c5af]">
              <div className="flex justify-between">
                <span>
                  {currentTier.name} (x{quantity})
                </span>
                <span className="text-[#e0e1f8] font-semibold">₹{basePrice.toLocaleString('en-IN')}.00</span>
              </div>
              {hasDandiya && (
                <div className="flex justify-between">
                  <span>Carved Dandiya Sticks (x{quantity})</span>
                  <span className="text-[#e0e1f8]">₹{dandiyaPrice.toLocaleString('en-IN')}.00</span>
                </div>
              )}
              {hasParking && (
                <div className="flex justify-between">
                  <span>Gate-1 VIP Parking (x{quantity})</span>
                  <span className="text-[#e0e1f8]">₹{parkingPrice.toLocaleString('en-IN')}.00</span>
                </div>
              )}
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#059669]">
                  <span>Festive Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}.00</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-[#26293a]">
                <span>Govt Cultural Cess & GST (18%)</span>
                <span className="text-[#e0e1f8]">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1.5 text-sm font-bold text-[#f2ca50]">
                <span>Total Payable</span>
                <span className="text-lg">
                  ₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e9c349] hover:from-[#f2ca50] hover:to-[#ffe088] text-[#3c2f00] font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(242,202,80,0.4)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Complete Payment & Issue Holographic RFID Pass</span>
            </button>
          </form>
        ) : (
          /* Confirmation & Holographic E-Pass View */
          <div className="p-6 flex flex-col gap-6 items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#059669]/20 text-[#059669] flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-['Playfair_Display'] text-2xl font-bold text-[#f2ca50]">
                Booking Confirmed!
              </h4>
              <p className="text-xs text-[#d0c5af] mt-1">
                Your official RFID digital pass is now active. SMS & WhatsApp confirmation dispatched to{' '}
                <strong className="text-[#e0e1f8]">{confirmedBookingData.holderPhone}</strong>.
              </p>
            </div>

            {/* Holographic E-Pass Card */}
            <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-[#1e2246] via-[#14172e] to-[#0a0d1d] border-2 border-[#f2ca50] p-5 shadow-[0_0_30px_rgba(242,202,80,0.35)] relative overflow-hidden text-left">
              {/* Gold watermark badge */}
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#f2ca50]/10 blur-xl"></div>
              
              <div className="flex items-center justify-between pb-3 border-b border-[#f2ca50]/30">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f2ca50]" />
                  <span className="font-['Playfair_Display'] font-bold text-[#f2ca50] tracking-wider uppercase text-sm">
                    Rasutsav 2025
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#f2ca50] text-[#3c2f00] font-bold uppercase">
                  Verified RFID
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#99907c] uppercase">Tier & Access</span>
                  <span className="text-sm font-bold text-[#e0e1f8]">{confirmedBookingData.tierName}</span>
                  <span className="text-[11px] text-[#d0c5af]">{confirmedBookingData.selectedNight}</span>
                  <span className="text-xs text-[#f2ca50] font-semibold mt-1">
                    Holder: {confirmedBookingData.holderName} (x{confirmedBookingData.quantity})
                  </span>
                  <span className="text-[10px] text-[#059669] font-medium mt-0.5">
                    {confirmedBookingData.gate}
                  </span>
                </div>

                {/* QR Code Graphic */}
                <div className="p-2 rounded-xl bg-white text-black shrink-0 flex flex-col items-center shadow-lg">
                  <QrCode className="w-20 h-20" />
                  <span className="text-[8px] font-mono mt-0.5 font-bold tracking-tight">
                    {confirmedBookingData.bookingRef}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#26293a] flex items-center justify-between text-[10px] text-[#99907c]">
                <span>Chip ID: {confirmedBookingData.rfidChip}</span>
                <span>Issued: {confirmedBookingData.dateIssued}</span>
              </div>
            </div>

            {/* Actions: Print, Download, Close */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#313445] text-xs font-semibold text-[#e0e1f8] flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#26293a] hover:bg-[#313445] text-xs font-semibold text-[#f2ca50] flex items-center gap-1.5 transition-colors"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book Another Pass</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-[#d4af37] hover:bg-[#f2ca50] text-xs font-bold text-[#3c2f00] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
