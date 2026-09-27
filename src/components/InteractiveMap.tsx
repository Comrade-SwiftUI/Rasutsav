import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { BOX_OFFICE_HUBS, FESTIVAL_ARENA_CENTER, FESTIVAL_GATES } from '../data/festivalData';
import { MapPin, Navigation, Sparkles, Clock, Compass } from 'lucide-react';

interface InteractiveMapProps {
  activeHubId?: string | null;
  onSelectHub?: (hubId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  activeHubId,
  onSelectHub
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyC_8OUfyJuV0Hfx9-I2csfnSJFm-Yb-2W8';

  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState(FESTIVAL_ARENA_CENTER);
  const [zoomLevel, setZoomLevel] = useState(15);

  // If activeHubId changes from outside, center on that hub
  React.useEffect(() => {
    if (activeHubId) {
      const hub = BOX_OFFICE_HUBS.find((h) => h.id === activeHubId);
      if (hub) {
        setMapCenter({ lat: hub.lat, lng: hub.lng, name: hub.name, address: hub.address });
        setZoomLevel(16);
        setSelectedMarker({
          title: hub.name,
          address: hub.address,
          hours: hub.hours,
          status: hub.status,
          lat: hub.lat,
          lng: hub.lng
        });
      }
    }
  }, [activeHubId]);

  const handleResetToGrounds = () => {
    setMapCenter(FESTIVAL_ARENA_CENTER);
    setZoomLevel(15);
    setSelectedMarker({
      title: 'Rasutsav Festival Arena (GMDC Ground)',
      address: '132 Feet Ring Road, Vastrapur, Ahmedabad',
      hours: 'Gates open 06:00 PM nightly',
      status: 'Main Venue',
      lat: FESTIVAL_ARENA_CENTER.lat,
      lng: FESTIVAL_ARENA_CENTER.lng
    });
  };

  const openGoogleMapsDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Map Control Buttons Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#14172e] border border-[#26293a]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#f2ca50]">
          <Compass className="w-4 h-4 text-[#f2ca50]" />
          <span>Interactive Ground Schema & Ahmedabad Box Office Hubs</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToGrounds}
            className="px-3 py-1 rounded-lg bg-[#1c1f2f] hover:bg-[#26293a] text-xs text-[#e0e1f8] font-medium border border-[#26293a] transition-colors"
          >
            Reset to GMDC Ground
          </button>
          <button
            type="button"
            onClick={() => openGoogleMapsDirections(mapCenter.lat, mapCenter.lng)}
            className="px-3 py-1 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-xs text-[#3c2f00] font-bold shadow-sm transition-colors flex items-center gap-1"
          >
            <Navigation className="w-3 h-3" />
            <span>Open in Maps</span>
          </button>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#f2ca50]/20 shadow-2xl bg-[#0a0d1d]">
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: '100%', height: '100%' }}
            center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
            zoom={zoomLevel}
            mapId="DEMO_MAP_ID"
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          >
            {/* Main Central Venue Marker */}
            <AdvancedMarker
              position={{ lat: FESTIVAL_ARENA_CENTER.lat, lng: FESTIVAL_ARENA_CENTER.lng }}
              title={FESTIVAL_ARENA_CENTER.name}
              onClick={() =>
                setSelectedMarker({
                  title: 'Rasutsav Festival Arena & Super-Dome',
                  address: FESTIVAL_ARENA_CENTER.address,
                  hours: 'Oct 03-11, 2025 • 06:00 PM to 02:00 AM',
                  status: 'Main Festival Grounds',
                  lat: FESTIVAL_ARENA_CENTER.lat,
                  lng: FESTIVAL_ARENA_CENTER.lng
                })
              }
            >
              <Pin
                background="#d4af37"
                borderColor="#3c2f00"
                glyphColor="#3c2f00"
                scale={1.3}
              />
            </AdvancedMarker>

            {/* Gate Markers on GMDC Ground */}
            {FESTIVAL_GATES.map((gate, i) => (
              <AdvancedMarker
                key={i}
                position={gate.coord}
                title={gate.name}
                onClick={() =>
                  setSelectedMarker({
                    title: gate.name,
                    address: gate.role,
                    hours: 'Security Access Open 06:00 PM',
                    status: 'Entry Portal',
                    lat: gate.coord.lat,
                    lng: gate.coord.lng
                  })
                }
              >
                <Pin
                  background={gate.type === 'vip' ? '#e11d48' : '#26293a'}
                  borderColor="#f2ca50"
                  glyphColor="#f2ca50"
                  scale={0.9}
                />
              </AdvancedMarker>
            ))}

            {/* Box Office Hub Markers in Ahmedabad */}
            {BOX_OFFICE_HUBS.map((hub) => (
              <AdvancedMarker
                key={hub.id}
                position={{ lat: hub.lat, lng: hub.lng }}
                title={hub.name}
                onClick={() => {
                  setSelectedMarker({
                    title: hub.name,
                    address: hub.address,
                    hours: hub.hours,
                    status: hub.status,
                    lat: hub.lat,
                    lng: hub.lng
                  });
                  if (onSelectHub) onSelectHub(hub.id);
                }}
              >
                <Pin
                  background="#059669"
                  borderColor="#ffffff"
                  glyphColor="#ffffff"
                  scale={1.1}
                />
              </AdvancedMarker>
            ))}

            {/* Active Marker InfoWindow */}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-1 max-w-[220px] text-black">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#b38600] uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedMarker.status}</span>
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 mt-0.5 leading-snug">
                    {selectedMarker.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 leading-tight">
                    {selectedMarker.address}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1.5">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{selectedMarker.hours}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openGoogleMapsDirections(selectedMarker.lat, selectedMarker.lng)}
                    className="mt-2 w-full py-1 px-2 rounded bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Legend Overlay at bottom */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto px-3 py-2 rounded-xl bg-[#0a0d1d]/90 backdrop-blur-md border border-[#26293a] flex flex-wrap items-center gap-3 text-[11px] text-[#e0e1f8] shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#d4af37]"></span>
            <span>Rasutsav Ground</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#e11d48]"></span>
            <span>VIP Gate 1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#26293a] border border-[#f2ca50]"></span>
            <span>Turnstiles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#059669]"></span>
            <span>Box Office Hubs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
