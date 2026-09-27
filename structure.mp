# ==============================================================================
# RASUTSAV NAVRATRI MAHOTSAV 2025 - HIGHER-LEVEL PROJECT STRUCTURE (.mp)
# ==============================================================================
# File: structure.mp
# Description: Architectural Mindmap, Data Flow, Component Topology, and
#              Audio Synthesizer Engine Blueprint for the Rasutsav Web Platform.
# ==============================================================================

[PROJECT_METADATA]
Name           : Rasutsav Navratri Mahotsav 2025
Description    : 9 Sacred Nights of Rhythm, Garba, Raas, Aarti, BookMyShow Ticketing,
                 Web Audio API Sound Station, and Google Maps Live Arena Guide.
Core Stack     : React 19, TypeScript 5, Vite 8, Tailwind CSS v4, Motion (Framer)
Audio Synthesizer: Pure Web Audio API (OscillatorNode, BiquadFilterNode, AnalyserNode)
Maps Provider  : @vis.gl/react-google-maps (GMDC Ground, Ahmedabad, Gujarat)
Entrypoint     : src/main.tsx -> src/App.tsx

# ==============================================================================
# 1. CORE COMPONENT TOPOLOGY & SCREEN ROUTING
# ==============================================================================

ROOT [src/App.tsx] (Master Container & Global State Manager)
├── State Management
│   ├── currentTab ('home' | 'lineup' | 'booking' | 'guide')
│   ├── isSoundModalOpen (boolean)
│   ├── isBmsModalOpen (boolean)
│   ├── selectedTierForBooking (TicketTier | null)
│   └── isPlayingAudio (boolean)
│
├── Navigation & Header Layer [src/components/Navbar.tsx]
│   ├── Brand Identity Logo & Festival Title
│   ├── Tab Selector Buttons (Home, Lineup, Booking, Visitor Guide)
│   ├── Sound Studio Quick Trigger Button
│   └── Book Passes CTA Button
│
├── Active Screen Render Layer (Conditional Tab Views)
│   ├── [1] HOME SCREEN [src/components/HomeScreen.tsx]
│   │   ├── Hero Banner with Live Countdown & Quick Action Buttons
│   │   ├── 9 Sacred Nights Highlights Carousel / Grid
│   │   ├── Headliner Artist Spotlight (Falguni Pathak, Aditya Gadhvi, etc.)
│   │   ├── Garba Sound Station Interactive Teaser
│   │   ├── Box Office Pickup Hub Preview Cards
│   │   └── Direct Ticket Booking CTA Banner
│   │
│   ├── [2] LINEUP SCREEN [src/components/LineupScreen.tsx]
│   │   ├── 9-Night Filter & Date Selector (Pratipada to Navami)
│   │   ├── Comprehensive Night Cards:
│   │   │   ├── Tithi, Date, Gate Timings & Venue Badge
│   │   │   ├── Dress Code & Sacred Color Significance (#Hex)
│   │   │   ├── Artist Bio, Photo & Genre Tag
│   │   │   └── Direct Garba Beat Audio Preview Trigger
│   │   └── Book Passes Direct Link Button
│   │
│   ├── [3] BOOKING SCREEN [src/components/BookingScreen.tsx]
│   │   ├── Festival Pass Category Filters (Single Night vs 9-Night Season)
│   │   ├── Pricing Tier Grid:
│   │   │   ├── Single Night General Pass (₹499)
│   │   │   ├── AC Super-Dome Premium Pass (₹999)
│   │   │   ├── 9-Night Full Season Pass (₹3,499 - 58% Savings)
│   │   │   ├── Couple Season Pass (₹5,999)
│   │   │   ├── Royal VIP & Corporate Lounge (₹12,999)
│   │   │   └── Free Community Aarti Pass (Devotional Seva)
│   │   ├── Tier Feature Breakdown Lists
│   │   └── Frequently Asked Questions (FAQ) Accordion
│   │
│   └── [4] VISITOR GUIDE SCREEN [src/components/VisitorGuideScreen.tsx]
│       ├── Interactive Venue Map Container [src/components/InteractiveMap.tsx]
│       │   ├── Google Maps API Integration (@vis.gl/react-google-maps)
│       │   ├── GMDC Ground Arena Center Marker
│       │   ├── Gates 1 to 6 Interactive Markers
│       │   └── 4 Box Office Hub Location Pins
│       ├── Box Office Hub List & Operating Hours
│       ├── Real-time Parking Zone Status (Zones A, B, C, D)
│       └── Emergency & Helpline Contact Cards (108, 1091, Support)
│
├── Floating Dock Action Layer (Fixed Bottom-Right Dock)
│   ├── Floating Garba Beats Sound Toggle (Pulse animation + Audio State indicator)
│   └── Quick "Book Passes" Floating Action Button
│
├── Global Overlay Modals Layer
│   ├── [A] SOUND STATION MODAL [src/components/SoundStationModal.tsx]
│   │   ├── Web Audio Visualizer Canvas Element
│   │   ├── Rhythm Selectors (Dhol 3-Taali, Aarti Temple Bell, Sanedo 3-Taali)
│   │   ├── One-Shot Sound Triggers (Shankh Naad, Dandiya Clack)
│   │   ├── Tempo BPM Slider (70 BPM to 180 BPM)
│   │   └── Master Audio Engine Subscription Handler
│   │
│   └── [B] BOOKMYSHOW CHECKOUT MODAL [src/components/BookMyShowModal.tsx]
│       ├── Selected Pass Tier Details & Price Calculation
│       ├── Date Selector (Day 1 to Day 9 or All 9 Nights)
│       ├── Quantity Incrementer / Decrementer
│       ├── Subtotal, Tax & Total Price Computation
│       └── Direct Redirect Button to BookMyShow Portal
│
└── Site Footer Layer [src/components/Footer.tsx]
    ├── Organizers & Trust Information
    ├── Quick Navigation Links
    ├── Emergency Helpline Quick Call Buttons
    └── Copyright & Credits

# ==============================================================================
# 2. WEB AUDIO API SYNTHESIZER ENGINE ARCHITECTURE [src/utils/audioEngine.ts]
# ==============================================================================

NavratriAudioEngine (Singleton Class)
│
├── AudioContext & Nodes Initialization
│   ├── AudioContext (Web Audio API instance)
│   └── AnalyserNode (fftSize: 64 for visualizer rendering)
│
├── State & Event Emitter Model
│   ├── State: { isPlaying: boolean, mode: RhythmMode, bpm: number }
│   ├── Listeners: Set<(state: AudioEngineState) => void>
│   └── Methods: subscribe(), notify(), getState(), isPlayingState()
│
├── Pure Synthesized Instrument Sound Modules:
│   ├── [1] playShankhNaad() [Auspicious Conch Shell]
│   │   ├── Oscillators: Sawtooth (220Hz -> 330Hz -> 320Hz) + Sine (440Hz -> 660Hz)
│   │   ├── Filter: Lowpass BiquadFilter (800Hz cutoff)
│   │   └── Envelope: Linear Ramp attack (0.6s) -> Exponential decay (3.5s)
│   │
│   ├── [2] playDandiyaClack() [Wooden Stick Strike]
│   │   ├── Tonal Body: Triangle Osc (1400Hz -> 300Hz in 0.08s)
│   │   ├── Wood Texture: White Noise Buffer + Bandpass Filter (2400Hz)
│   │   └── Envelope: Fast Exponential drop (0.05s - 0.09s)
│   │
│   ├── [3] playTempleBell(freq) [Resonant Brass Bell]
│   │   ├── Partials: Multi-harmonic Sines [1.0x, 2.01x, 3.02x, 4.2x base frequency]
│   │   └── Envelope: Individual exponential gain decays up to 2.5s
│   │
│   ├── [4] playDholBass(accent) [Deep Kathiyawadi/Baroda Drum Thump]
│   │   ├── Oscillator: Sine wave pitch envelope (135Hz/105Hz -> 42Hz)
│   │   └── Duration: 0.24s - 0.35s exponential gain decay
│   │
│   └── [5] playDholTreble() [Crisp Chanti / Tasha Strike]
│       ├── Oscillator: Triangle wave pitch drop (650Hz -> 220Hz)
│       └── Duration: 0.08s - 0.09s quick decay
│
└── Rhythmic Loop Sequencers (setInterval based step clock):
    ├── mode: 'dhol'   -> 118 BPM 3-Taali Rhythm Loop (Beats: Bass, Treble, Clack)
    ├── mode: 'aarti'  -> 84 BPM Holy Aarti Cadence (Temple Bells + Solemn Dhol)
    └── mode: 'sanedo' -> 138 BPM Fast High-Energy Sanedo Loop

# ==============================================================================
# 3. DATA ARCHITECTURE & SCHEMAS [src/data/festivalData.ts]
# ==============================================================================

DATASETS
├── FESTIVAL_DAYS : NavratriDay[] (9-Night Complete Event Dataset)
│   ├── Schema: { id, dayNumber, date, tithi, title, description, timing, gateOpens,
│   │             artist: { name, designation, bio, image, genre },
│   │             dressCode: { colorName, colorHex, significance },
│   │             venue: 'lawn'|'superdome'|'both', venueName, isFree, priceFrom, highlightTag }
│   └── Content: Day 1 (Atul Purohit), Day 2 (Kinjal Dave), Day 3 (Osman Mir),
│                Day 4 (Sachin-Jigar), Day 5 (Bhoomi Trivedi), Day 6 (Aditya Gadhvi),
│                Day 7 (Kirtidan Gadhvi), Day 8 (Falguni Pathak), Day 9 (100-Dhol Finale)
│
├── TICKET_TIERS : TicketTier[] (6 Comprehensive Pass Categories)
│   ├── Schema: { id, name, badge, subtitle, price, priceSuffix, isPopular, isFree, savings,
│   │             type: 'single'|'season', icon, features: { text, included, bold }[] }
│   └── Tiers: Single General (₹499), Single Dome (₹999), 9-Night Season (₹3,499),
│              Couple Season (₹5,999), Royal VIP (₹12,999), Free Community Aarti (₹0)
│
├── BOX_OFFICE_HUBS : BoxOfficeHub[] (4 Pass Pickup Counters across Ahmedabad)
│   ├── Schema: { id, hubNumber, name, location, address, lat, lng, hours, status, description, image }
│   └── Hubs: GMDC Ground Gate 3, Courtyard Marriott, Ahmedabad One Mall, Airport Desk (24/7)
│
├── PARKING_ZONES : ParkingZone[] (Live Arena Parking Lots)
│   ├── Schema: { id, zone, title, gate, badgeColor, totalBays, occupiedBays, description, statusText, recommendedFor }
│   └── Zones: Zone A (VIP 1,200 bays), Zone B (4-Wheelers 3,500 bays),
│              Zone C (2-Wheelers 8,000 bays), Zone D (Cabs & Rideshare 500 bays)
│
└── FESTIVAL_GATES & ARENA_CENTER (Coordinates & Gate Maps)

# ==============================================================================
# 4. FILE SYSTEM DIRECTORY MAP
# ==============================================================================

/ (Root)
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── structure.mp
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── HomeScreen.tsx
    │   ├── LineupScreen.tsx
    │   ├── BookingScreen.tsx
    │   ├── VisitorGuideScreen.tsx
    │   ├── InteractiveMap.tsx
    │   ├── SoundStationModal.tsx
    │   ├── BookMyShowModal.tsx
    │   ├── Footer.tsx
    │   └── Icons.tsx
    ├── data/
    │   └── festivalData.ts
    └── utils/
        └── audioEngine.ts

# ==============================================================================
# END OF HIGHER-LEVEL STRUCTURE BLUEPRINT (.mp)
# ==============================================================================
