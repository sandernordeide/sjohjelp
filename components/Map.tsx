"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icons in React-Leaflet
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

// Custom boat icon
const boatIcon = L.divIcon({
  html: '<div style="font-size: 32px; text-align: center; line-height: 1;">⛵</div>',
  className: "boat-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// User location icon
const userIcon = L.divIcon({
  html: '<div style="text-align: center;"><div style="font-size: 24px; line-height: 1;">📍</div><div style="font-size: 12px; font-weight: bold; color: #1e3a5f; margin-top: 2px;">Deg</div></div>',
  className: "user-marker",
  iconSize: [50, 40],
  iconAnchor: [25, 20],
  popupAnchor: [0, -20],
});

interface Boat {
  id: number;
  name: string;
  phone: string;
  lat: number;
  lng: number;
}

interface MapProps {
  centerTrigger?: number;
}

// Component to programmatically control map
function MapController({ centerTrigger }: { centerTrigger?: number }) {
  const map = useMap();
  const userLocation: [number, number] = [61.212322, 6.076083];

  useEffect(() => {
    if (centerTrigger) {
      map.setView(userLocation, 15, { animate: true, duration: 1 });
    }
  }, [centerTrigger, map]);

  return null;
}

export default function Map({ centerTrigger }: MapProps) {
  // User location
  const userLocation: [number, number] = [61.212322, 6.076083];
  
  // Boats on the water
  const boats: Boat[] = [
    {
      id: 1,
      name: "Sander",
      phone: "+47 47352127",
      lat: 61.21455,
      lng: 6.06385,
    },
    {
      id: 2,
      name: "Arne Ove",
      phone: "+47 99288837",
      lat: 61.20969,
      lng: 6.07033,
    },
  ];

  return (
    <div className="w-full h-[500px] rounded overflow-hidden relative">
      <MapContainer
        center={userLocation}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController centerTrigger={centerTrigger} />
        
        {/* User location */}
        <Marker position={userLocation} icon={userIcon} />
        
        {/* Boats */}
        {boats.map((boat) => (
          <Marker
            key={boat.id}
            position={[boat.lat, boat.lng]}
            icon={boatIcon}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-lg">⛵ {boat.name}</strong>
                <p className="text-sm mt-2">
                  <a 
                    href={`tel:${boat.phone}`}
                    className="text-primary hover:text-primary-hover font-semibold"
                  >
                    {boat.phone}
                  </a>
                </p>
                <button
                  onClick={() => window.open(`tel:${boat.phone}`)}
                  className="mt-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded text-sm"
                >
                  Ring nå
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
