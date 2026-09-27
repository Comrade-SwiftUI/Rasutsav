export interface NavratriDay {
  id: string;
  dayNumber: number;
  date: string;
  tithi: string;
  title: string;
  description: string;
  timing: string;
  gateOpens: string;
  artist: {
    name: string;
    designation: string;
    bio: string;
    image: string;
    genre: string;
  };
  dressCode: {
    colorName: string;
    colorHex: string;
    significance: string;
  };
  venue: 'lawn' | 'superdome' | 'both';
  venueName: string;
  isFree?: boolean;
  priceFrom: number;
  highlightTag?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  price: number;
  priceSuffix: string;
  isPopular?: boolean;
  isFree?: boolean;
  savings?: string;
  features: { text: string; included: boolean; bold?: boolean }[];
  type: 'single' | 'season';
  icon: string;
}

export interface BoxOfficeHub {
  id: string;
  hubNumber: string;
  name: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  status: string;
  description: string;
  image: string;
}

export interface ParkingZone {
  id: string;
  zone: string;
  title: string;
  gate: string;
  badgeColor: string;
  totalBays: number;
  occupiedBays: number;
  description: string;
  statusText: string;
  recommendedFor: string;
}

export const FESTIVAL_DAYS: NavratriDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: 'Oct 03, 2025',
    tithi: 'Pratipada',
    title: 'Aagman & Ghatasthapana',
    description: 'Pratipada Puja, traditional sacred kalash sthapana, and inaugural 1,008-lamp lighting invocation.',
    timing: '07:30 PM Onwards',
    gateOpens: '06:00 PM',
    artist: {
      name: 'Atul Purohit Classical Troupe',
      designation: 'Headline Classical Performance',
      bio: 'Authentic Baroda-style slow cadence garbi rhythms & divine hymns honoring Maa Shailputri.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBknsB0ycTSSjxutW2_FN18dc1ipOVvPPzsr3APvy5H1cKEbwSJOMMOcyO62xOXEch5sn1zWNO6rKIz-ciK-QC1U7_5xqulZek_uqzE13XsHECSg3eJAL-zj-aigyBRLqU6h_UBFsoyXyvzfKy6BE5Dv9p7iPlefwXlhXHiZQTnQ8XDZFYKUXo-uc6Z6a-HPDp4k8lHn7d14OQJxbSihRJnjbIb86O138o5JpC5yFId6HqNunm9fLI1',
      genre: 'Prachin Garbi & Aarti'
    },
    dressCode: {
      colorName: 'Royal Yellow',
      colorHex: '#eab308',
      significance: 'Signifying optimism, dawn, and devotion to Maa Shailputri'
    },
    venue: 'lawn',
    venueName: 'Open Heritage Lawn',
    isFree: true,
    priceFrom: 0,
    highlightTag: 'Free Entry With Pre-Registration'
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: 'Oct 04, 2025',
    tithi: 'Dwitiya',
    title: 'Dandiya Dhoom',
    description: 'Fast-paced 3-taali raas sessions with explosive contemporary Gujarati folk basslines.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:30 PM',
    artist: {
      name: 'Kinjal Dave & Folk Beats',
      designation: 'Folk Headliner & Troupe',
      bio: 'Electrifying folk sensations featuring viral hits, energetic live dhol combos, and chorus chants.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3d_q69mqEl5lvwuJ1SE8qNjvQLsNY360MqE6ua3wx7ijf7-jekapVezjMBxjlsNFw6Em-Hm_WYi_T4bytpGpO29a6CMdG2bcnSiOyD7e6yOSDc5nqkY6gzCUAMuyHcpvNAMR5k1e6-x3uqYsyof4ZAn5DUuJRDtqukv0nonD5ooE-6zfg4Y0EIb3RbqIdDlxxLkzb5cWMHC3I0QgyIFbOi18k986_nUQieIuvkRn2laFWmNDiEEBr',
      genre: 'High-Voltage 3-Taali & Sanedo'
    },
    dressCode: {
      colorName: 'Peacock Green',
      colorHex: '#059669',
      significance: 'Honoring Maa Brahmacharini, reflecting purity and nature'
    },
    venue: 'superdome',
    venueName: 'AC Super-Dome Arena',
    priceFrom: 999,
    highlightTag: 'Superdome Climate Comfort'
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: 'Oct 05, 2025',
    tithi: 'Tritiya',
    title: 'Chandraghanta Raas',
    description: 'Soul-stirring spiritual melodies seamlessly transitioning into mesmerizing circular trance spins.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:30 PM',
    artist: {
      name: 'Osman Mir & Troupe',
      designation: 'Sufi-Garba Ensemble',
      bio: 'A majestic symphony bridging Kutchhi heritage, Qawwali intonations, and high-octane dandiya beats.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZoieudKXRLVh_vo0qcVZrvgNtHMhhuAjhRXEU9LKAYiB4ASzu_XtHBpjgmk73vztaCdOxN_N1C_lkwfVzOYCrPdqphe_8q_bzMHIze7xZ4EhZeBTLB2zDsLvAFgscyujE3oNE4tbj5iVP7uoiRDW1IU_TO9zidNr7ooJBLoqxFADPPF-g4MjlYY292mKNcr7RiS4Z0AbRDNuqUp28CDbJPprId_cUE6sOd--N5_yJI9zQqnmnCtso',
      genre: 'Kutchhi Folk & Sufi Fusion'
    },
    dressCode: {
      colorName: 'Slate Grey & Silver',
      colorHex: '#94a3b8',
      significance: 'Symbolizing tranquility and courage of Maa Chandraghanta'
    },
    venue: 'superdome',
    venueName: 'AC Super-Dome Arena',
    priceFrom: 1199,
    highlightTag: 'Weekend Special'
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: 'Oct 06, 2025',
    tithi: 'Chaturthi',
    title: 'Kushmanda Euphoria',
    description: 'Modern Gujarati Bollywood fusion night featuring world instruments, brass sections, and sync drums.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:30 PM',
    artist: {
      name: 'Sachin-Jigar Live Folk Troupe',
      designation: 'Folk-Fusion Live Band',
      bio: 'Blockbuster composers bringing theatrical folk-rock arrangements and contemporary youth energy.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MTbzIhmworr9waQngtlZjRnBxlouuSKRkgOair7x4KPL3UO2ZZ77e9LA8a0_GhCwlTjSuKwy_oF-mRE1uTB6nsrHk_LCXIYAGabjNZd24FCN-soDH64UVIW-E3BdA723cGCIRrMjUTMzy6wx9XfSr3MKNkPsPFDjmJHjU3NaQy4mrQjm5d4rX68iIFx6xSmBUPIw53Aa9144R0AlctLsVBm2SXBfiSFz1VTUc9fTKtZx5LqYDHFX',
      genre: 'Urban Folk & Dholak Groove'
    },
    dressCode: {
      colorName: 'Radiant Orange',
      colorHex: '#ea580c',
      significance: 'Radiating the creative cosmic power of Maa Kushmanda'
    },
    venue: 'superdome',
    venueName: 'AC Super-Dome Arena',
    priceFrom: 1499,
    highlightTag: 'Bollywood Fusion Night'
  },
  {
    id: 'day-5',
    dayNumber: 5,
    date: 'Oct 07, 2025',
    tithi: 'Panchami',
    title: 'Skandamata Fusion',
    description: 'Lush open-sky raas night illuminated by traditional torans, mirror-work pavilions, and brass bells.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:30 PM',
    artist: {
      name: 'Bhoomi Trivedi & Troupe',
      designation: 'Vocals & 30-Piece Troupe',
      bio: 'Powerhouse vocals, resonant rustic thumping dholaks, and synchronized Gujarati celebratory anthems.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZo6tc03z5SCbixlqOCO_zYW3MdQvwCT9thKNXqmQDKjFWQC3WP82oljFOKA3Zjgeou1QUXa0pPqP3O0pBUPI5FDH_BYHqwFOEeZg1IPKfr13z2Kn7TrjpqjtXIWX0ia_9jOQOGMe9LZp5AXnLMHjB7z75qgUwWlGDnUKsygPZuGiDAMFcpXWPylhIuAlGmW-HIs66F8iAwlGu0LIwveUJVC9p_okbPqs8ffafJeTWaJTEKncCENRl',
      genre: 'Ram-Leela & Desi Folk'
    },
    dressCode: {
      colorName: 'White & Mirrorwork',
      colorHex: '#f8fafc',
      significance: 'Embodying maternal peace and purity of Maa Skandamata'
    },
    venue: 'lawn',
    venueName: 'Open Heritage Lawn',
    priceFrom: 999,
    highlightTag: 'Folk Heritage Night'
  },
  {
    id: 'day-6',
    dayNumber: 6,
    date: 'Oct 08, 2025',
    tithi: 'Shasthi',
    title: 'Katyayani Mega Night',
    description: 'The biggest viral sensation evening featuring contemporary Gujarati seafaring anthems and raas.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:00 PM',
    artist: {
      name: "Aditya Gadhvi ('Khalasi')",
      designation: 'Coke Studio Star & Dayro Vocalist',
      bio: 'The iconic Gujarati voice accompanied by live coastal percussions, brass horns, and rapid dhol tempos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDA_Gg402mzhBETPvII93_E396vUHCdY0MswtInaqANBSIB_usr6CYdSt4Gq-Wf0FNXyEubyAWjYlaATZtyIu8WBhi__9rS2raw_AJZJ7a-tSDvvxTEbETYk5aj3k_8lCA5uymfI7FkmNpVLSooewDov9QkbuoX67TqoBWkEiLp9JOBdmBCvXTLi995zRh6cAheYN5z4-znVniabiuDF-ymqQOBiFHL3_U9WwKvG4NNCuhnCz2iP2B',
      genre: 'Coke Studio Khalasi & Coastal Raas'
    },
    dressCode: {
      colorName: 'Royal Red & Gold',
      colorHex: '#dc2626',
      significance: 'Invoking the fiery valor and courage of warrior Maa Katyayani'
    },
    venue: 'superdome',
    venueName: 'AC Super-Dome Arena',
    priceFrom: 1799,
    highlightTag: 'Fast Selling • Khalasi Night'
  },
  {
    id: 'day-7',
    dayNumber: 7,
    date: 'Oct 09, 2025',
    tithi: 'Saptami',
    title: 'Kaalratri Trance',
    description: 'Traditional Saurashtra Dayro storytelling woven seamlessly into midnight devotional raas circles.',
    timing: '08:00 PM Onwards',
    gateOpens: '06:30 PM',
    artist: {
      name: 'Kirtidan Gadhvi & Dayro Kings',
      designation: 'Dayro Royalty & Spiritual Bard',
      bio: 'Legendary folk maestro renowned for soulful bhajans, classic dohas, and soaring high-pitch melodies.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEE0i5iqIOa5CxH8YmTOKSOxxSFOtrvznYT2LcgBO-jlp-QFKsobREjrOTow4x3f1SEx-jMciKc10y6dOiOJfdX6qffkHUNx5ZRjhmaY5A4S1rkd8gmAPMA25Z5L1VP-zAbx2xhsNvsFRXuc4OoZ-hwvqoTjSPlJDrVjbt0JysOm09ysLla3DyekOzwSIHAPnswGUECqf7wW3R70SVuY8i8lVeGfFPPYV-2eQCirC-O-6AKD02TIUp',
      genre: 'Kathiyawadi Dayro & Midnight Raas'
    },
    dressCode: {
      colorName: 'Royal Navy Blue',
      colorHex: '#1e3a8a',
      significance: 'Protective cosmos and immense power of Maa Kaalratri'
    },
    venue: 'lawn',
    venueName: 'Open Heritage Lawn',
    priceFrom: 1299,
    highlightTag: 'Dayro & Midnight Bhakti'
  },
  {
    id: 'day-8',
    dayNumber: 8,
    date: 'Oct 10, 2025',
    tithi: 'Ashtami',
    title: 'Maha Gauri Gala',
    description: 'The Queen of Dandiya returns for the quintessential Navratri extravaganza of unmatched energy.',
    timing: '08:00 PM Onwards',
    gateOpens: '05:30 PM',
    artist: {
      name: 'Falguni Pathak (Ta-Thaiya)',
      designation: 'The Dandiya Queen',
      bio: 'Four continuous hours of evergreen garba classics, pristine rhythm transitions, and joyous unison.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyK8Eybcw0G39me3PcwkTbkCii9d9lw5-L22lfuC-Fjpu_h8paBJTKxJLQFQph3eXP1b4X_-66NSDtyVWYCwbQVC3dhkdJd5H-lFntDYgrxPCSyxKc8HAiOCJsj-IX-kE9866E9JDHPomVM-eihuDtQw1ar3HV2vU6FXzSPkn07f6waH6X6u043leWZ0aFmcyK-EQgKvcP2g9bNSW4R1OySaW-pSpFPLmOExUqsjYaiaRH62oWmB5b',
      genre: 'Evergreen Ta-Thaiya Classics'
    },
    dressCode: {
      colorName: 'Pink & Magenta',
      colorHex: '#db2777',
      significance: 'Signifying universal compassion and abundance of Maa Mahagauri'
    },
    venue: 'superdome',
    venueName: 'AC Super-Dome Arena',
    priceFrom: 2499,
    highlightTag: 'Mega Star Night • Ashtami Special'
  },
  {
    id: 'day-9',
    dayNumber: 9,
    date: 'Oct 11, 2025',
    tithi: 'Navami',
    title: 'Siddhi Datri & Maha Finale',
    description: 'The majestic culmination featuring Grand Mega Aarti, 100 synchronized dhols, and royal trophy presentations.',
    timing: '07:00 PM Onwards',
    gateOpens: '05:00 PM',
    artist: {
      name: 'Falguni Pathak & 100-Dhol Troupe',
      designation: 'Maha Grand Production',
      bio: 'Historic 100-dhol thunderous countdown, Maa Ambe Maha Aarti with 10,000 diyas, and Best Garba awards.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4ZKl314dyBdzH08N5kJjTc4mRAeVwe28P9LLq2Adi1a_KWwBr_7il6WrO-SJm-2z7HZOBFYBTua2jkiP08XihwdQm9uUh3LGHrThZV4rKujycg0hOdxEy1MPfne75y0WUgOba_tdrw_X4onNqbiSISZAwRJlyU7edLIPAsRG7y-_T3IHso1wLDg_QQOdgjZNR80KFRrdqqfCsJKnI13nWhlebYw8y_tqXwgDAhqKxeKJKZe_CBwy4',
      genre: '100-Dhol Thunder & Mega Aarti'
    },
    dressCode: {
      colorName: 'Royal Purple & Gold',
      colorHex: '#7e22ce',
      significance: 'Spiritual perfection and benediction of Maa Siddhidatri'
    },
    venue: 'both',
    venueName: 'Super-Dome & Open Grounds',
    priceFrom: 2799,
    highlightTag: 'Grand Finale Ceremony'
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'single-general',
    name: 'Single Night General Pass',
    badge: 'Phase 1 Tier',
    subtitle: 'Valid for 1 chosen calendar night. Entry to vibrant Open Grounds and culinary night bazaar.',
    price: 499,
    priceSuffix: '/ night per person',
    type: 'single',
    icon: 'confirmation_number',
    features: [
      { text: '1 Night Validated Digital QR Pass', included: true },
      { text: 'Open Heritage Lawn & Folk Courtyard', included: true },
      { text: 'Access to 40+ Kathiyawadi Food Stalls', included: true },
      { text: 'AC Super-Dome restricted', included: false }
    ]
  },
  {
    id: 'single-dome',
    name: 'Single Night AC Dome Premium',
    badge: 'Climate Comfort',
    subtitle: 'Valid for 1 selected night with direct access to the state-of-the-art 22°C AC Super-Dome and Open Grounds.',
    price: 999,
    priceSuffix: '/ night per person',
    type: 'single',
    icon: 'ac_unit',
    features: [
      { text: 'Dual Access: 22°C AC Dome + Open Grounds', included: true, bold: true },
      { text: 'Fast-Track Express Security Lane (Gate 2)', included: true },
      { text: 'Acoustically Tuned Stage Ring Zone', included: true },
      { text: 'Digital Locker access coupon', included: true }
    ]
  },
  {
    id: 'season-pass',
    name: '9-Night Full Season Pass',
    badge: 'MOST POPULAR • BEST VALUE',
    subtitle: 'Unrestricted access to all 9 nights across both AC Dome and Open Lawns with physical silicon RFID kit.',
    price: 3499,
    priceSuffix: 'all 9 nights',
    isPopular: true,
    savings: 'Save 58%',
    type: 'season',
    icon: 'workspace_premium',
    features: [
      { text: 'Customized Holographic RFID Wristband Kit', included: true, bold: true },
      { text: 'All 9 Nights Full Access (Dome + Lawn)', included: true },
      { text: '2 Complimentary Carved Wooden Dandiya Pairs', included: true },
      { text: '10% Discount on all Maha Food Court orders', included: true },
      { text: 'Priority Box-Office Home Courier Available', included: true }
    ]
  },
  {
    id: 'couple-season',
    name: 'Couple Season Pass',
    badge: 'Dual Admission',
    subtitle: 'Complete 9-night celebration for 1 Male + 1 Female or registered couples with dedicated couple entry portals.',
    price: 5999,
    priceSuffix: 'couple • all 9 nights',
    savings: 'Save 65%',
    type: 'season',
    icon: 'favorite',
    features: [
      { text: '2x Twin Silicon RFID Badges', included: true, bold: true },
      { text: 'Dedicated Red Carpet Couple Gates', included: true },
      { text: 'Full AC Dome & Open Lawn Access', included: true },
      { text: 'Complimentary Festive Beverage Pass', included: true }
    ]
  },
  {
    id: 'royal-vip',
    name: 'Royal VIP & Corporate Lounge',
    badge: 'Haute Concierge',
    subtitle: 'Ultra-premium elevated seating, bespoke hospitality, and unrestricted access to headliner artist corridors.',
    price: 12999,
    priceSuffix: 'all 9 nights / VIP guest',
    type: 'season',
    icon: 'crown',
    features: [
      { text: 'Elevated VIP Seated Lounge with Waiter Service', included: true, bold: true },
      { text: 'Complimentary Unlimited Royal Buffet Dinners', included: true },
      { text: 'Dedicated Valet Drop & Chauffeur Lounge', included: true },
      { text: 'Backstage Photo Op with Lead Folk Singers', included: true },
      { text: 'Personal Security Escort to Ring Dance Floor', included: true }
    ]
  },
  {
    id: 'free-community',
    name: 'Free Community Pass',
    badge: 'Devotional Seva',
    subtitle: 'Maha Aarti Darshan on Day 1 (Ghatasthapana) & Day 9 (Maha Navami). Subsidized under Trust Patronage.',
    price: 0,
    priceSuffix: 'Pre-registration mandatory',
    isFree: true,
    type: 'single',
    icon: 'temple_hindu',
    features: [
      { text: 'Valid for Day 1 or Day 9 Evening Aarti (7-9 PM)', included: true },
      { text: 'Mandatory Govt ID Verification (Aadhaar / Voter)', included: true },
      { text: 'Limited to first 5,000 devotees per night', included: true },
      { text: 'Late night Garba arena access excluded', included: false }
    ]
  }
];

export const BOX_OFFICE_HUBS: BoxOfficeHub[] = [
  {
    id: 'hub-1',
    hubNumber: 'Hub 01',
    name: 'GMDC Ground Main Box Office',
    location: 'Gate 3, 132 Feet Ring Road, Ahmedabad',
    address: 'GMDC Ground, 132 Feet Ring Road, Vastrapur, Ahmedabad, Gujarat 380052',
    lat: 23.0454,
    lng: 72.5348,
    hours: '10 AM to 10 PM',
    status: 'Active Now',
    description: 'Central pickup hub featuring 12 express counters, VIP fast lanes, and instant pass replacement desks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJDNBDVwD1cTJkIJcevBgzmV8Lf7ErrzNWNR_N7Fl6Rr1Kuq1tVg6IwXmGSPG82iRVGrIgXI-VUHOBdA7C3gIeLp9KgiRPKi1EU-Egy1Osa-mPqsa3TmkFTsn0bhrNcV1hnYkVCz3nry66jGMm4zOp6S5MGhOVECPxMYZn_BxJQpwiyFmJnIFxCUYebyZXhZn5T_GKgoPPDV48da8vXh_boNeoaUheBoMPv_Nx3xnoWsB9mgL67_H'
  },
  {
    id: 'hub-2',
    hubNumber: 'Hub 02',
    name: 'Courtyard Marriott Lobby Desk',
    location: 'Ramdevnagar, Satellite Road, Ahmedabad',
    address: 'Courtyard by Marriott, Ramdevnagar Cross Road, Satellite, Ahmedabad, Gujarat 380015',
    lat: 23.0286,
    lng: 72.5074,
    hours: '11 AM to 8 PM',
    status: 'Concierge Ready',
    description: 'Premium lounge concierge pickup desk. Ideal for Royal VIP passes and corporate bulk ticket delegations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBujmJeVXr1HnOX9PLsPjfGH72VNAVlK9f13ehFJTTZoV1MmEGxuXpWSHum_dw_eND4nTO3YBXkHRIbcyTs4PQ_gaKnn0w7BOwlDuGYZTIfKHMMiYWBykQNySaz8J-usyJQyB1MU1kamBvD54DS_kh2I011Kp1d7dT0EnHuJsRNRWa9cF99ize8BDLWJB8f0b0_w2zIv4wHKavV5XZ-_5KavuSqbJ1TmfO45UAqze3sEBGfnFPP2CcM'
  },
  {
    id: 'hub-3',
    hubNumber: 'Hub 03',
    name: 'Ahmedabad One Mall Counter',
    location: 'Atrium Level 1, Vastrapur, Ahmedabad',
    address: 'Ahmedabad One Mall, Vastrapur Lake Road, Vastrapur, Ahmedabad, Gujarat 380054',
    lat: 23.0401,
    lng: 72.5298,
    hours: '11 AM to 9 PM',
    status: 'Active Now',
    description: 'Convenient central shopping hub counter with festive photo booth and merchandise preview zone.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7FRME3udUhifBeKBlxekg13PEh1hlUZWQLcWhh1XrO1J-0L7Wrz5nDkEB1QwjCT7XxMoGoyb_qWW5o_xS5b7-I0sk9_v973eApPlTUioxj6l_4l7MQy3RLFCs6o7TKHlrWdlal9ei8jcCvm4TOnJkKvVokpzA1Bych-jyHtFuhcGx_VUxRx1kiougZae6hbwx_dGmN7zOetp3gmHN6Ijz8akVJNJLH4ZKU1roy9Dtqpry5MUBtnR1'
  },
  {
    id: 'hub-4',
    hubNumber: 'Hub 04',
    name: 'Airport Departure Kiosk',
    location: 'Terminal 1 Arrivals / Departure Hall, Ahmedabad',
    address: 'Sardar Vallabhbhai Patel International Airport, Hansol, Ahmedabad, Gujarat 380003',
    lat: 23.0734,
    lng: 72.6266,
    hours: '24 Hours Open',
    status: 'Direct Transit',
    description: '24/7 designated desk for NRI visitors, inter-state flights, and late-night airport arrivals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Y6UNxpwI0LIVQtbCOOcTx2_JV7vI6hl1RQk0pNOMa4vc5_njpogGZSrEnwWlhllG6P5083nB-kWTe8L02_kpjI9roTfpR09iBL3hDKG1LXDmaHwlELg3Qpj_ive2_iPw8vgM_IpfwXuUjEPfEXgsySdukS89ATjXahW1Su_2TsROYjwuFKs_xt2ghkfLRbFjt-SjGth14MoCYfwsnChWglMH1lYCSpR4BO7qbrtz6HO99RqWZtFA'
  }
];

export const PARKING_ZONES: ParkingZone[] = [
  {
    id: 'zone-a',
    zone: 'ZONE A',
    title: 'VIP & Season Passes',
    gate: 'Direct Gate 1',
    badgeColor: 'bg-primary-container text-on-primary-container',
    totalBays: 1200,
    occupiedBays: 504,
    description: '1,200 covered four-wheeler bays with dedicated express security archways and complimentary royal valet drivers.',
    statusText: 'Plentiful bays open',
    recommendedFor: 'Royal VIP & Season Wristband Holders'
  },
  {
    id: 'zone-b',
    zone: 'ZONE B',
    title: 'Four-Wheeler General',
    gate: 'Gate 4 Transit',
    badgeColor: 'bg-surface-container-highest text-on-surface',
    totalBays: 3500,
    occupiedBays: 2275,
    description: 'University Ground East parking accommodating 3,500 cars. Free continuous golf cart shuttles straight to Gate 4.',
    statusText: 'Moderate flow, 6 shuttles active',
    recommendedFor: 'Daily 4-Wheeler Pass Holders'
  },
  {
    id: 'zone-c',
    zone: 'ZONE C',
    title: 'Two-Wheeler Mega Lot',
    gate: 'Gate 6 Avenue',
    badgeColor: 'bg-surface-container-highest text-on-surface',
    totalBays: 8000,
    occupiedBays: 3040,
    description: '8,000 motorized bike & scooter bays with digital tokenized barcode parking slips and biometric exit checks.',
    statusText: 'Express entry lanes active',
    recommendedFor: 'Bikes, Scooters & Mopeds'
  },
  {
    id: 'zone-d',
    zone: 'ZONE D',
    title: 'Cab & Ride-Share Hub',
    gate: 'Gate 2 Concourse',
    badgeColor: 'bg-secondary-container text-on-secondary',
    totalBays: 500,
    occupiedBays: 125,
    description: 'Dedicated Ola/Uber geo-fenced lounge. Features air-cooled waiting bays, fast mobile charging towers, and water points.',
    statusText: 'Avg pickup wait: 3.5 mins',
    recommendedFor: 'Ola, Uber & Auto Rickshaws'
  }
];

export const FESTIVAL_GATES = [
  { name: 'Gate 1', role: 'VIP, Artists & Performers Only', coord: { lat: 23.0465, lng: 72.5338 }, type: 'vip' },
  { name: 'Gate 2 & 3', role: 'Cabs, Shuttles & Pedestrian Fast Lane', coord: { lat: 23.0454, lng: 72.5348 }, type: 'general' },
  { name: 'Gate 4', role: 'General Four-Wheelers & Parking Shuttles', coord: { lat: 23.0445, lng: 72.5358 }, type: 'general' },
  { name: 'Gate 5 & 6', role: 'Two-Wheelers & Main Box Office Pickup', coord: { lat: 23.0435, lng: 72.5332 }, type: 'boxoffice' }
];

export const FESTIVAL_ARENA_CENTER = {
  lat: 23.0454,
  lng: 72.5348,
  name: 'Rasutsav Festival Arena (GMDC Ground)',
  address: '132 Feet Ring Road, Vastrapur, Ahmedabad, Gujarat 380052'
};

export const REAL_BOOKMYSHOW_URL = 'https://in.bookmyshow.com/explore/events-ahmedabad';
export const OFFICIAL_SUPPORT_PHONE = '+91 79 2658 9000';
export const SHE_SAFETY_PHONE = '1091';
export const MEDICAL_EMERGENCY_PHONE = '108';
