"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import type { AppMode } from "@/components/ActionButtons";

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

// Accident marker icon
const accidentIcon = L.divIcon({
  html: '<div style="font-size: 32px; text-align: center; line-height: 1;">🔴</div>',
  className: "boat-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// SOS marker icon
const sosIcon = L.divIcon({
  html: '<div class="sos-pulse" style="font-size: 40px; text-align: center; line-height: 1;">🆘</div>',
  className: "boat-marker",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

interface Boat {
  id: number;
  name: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface MapProps {
  mode: AppMode;
  centerTrigger?: number;
  userPosition?: { lat: number; lng: number } | null;
  accidentMarker?: { lat: number; lng: number } | null;
  sosActive?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
}

// Component to programmatically control map
function MapController({
  centerTrigger,
  userPosition,
  followUser,
}: {
  centerTrigger?: number;
  userPosition: [number, number];
  followUser: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (centerTrigger) {
      map.setView(userPosition, 15, { animate: true, duration: 1 });
    }
  }, [centerTrigger, map, userPosition]);

  useEffect(() => {
    if (followUser) {
      map.setView(userPosition, map.getZoom(), { animate: true, duration: 0.5 });
    }
  }, [followUser, userPosition, map]);

  return null;
}

// Click handler for accident pin-drop
function ClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map({
  mode,
  centerTrigger,
  userPosition,
  accidentMarker,
  sosActive,
  onMapClick,
}: MapProps) {
  const pos = userPosition ?? { lat: 61.212322, lng: 6.076083 };
  const userLocation: [number, number] = [pos.lat, pos.lng];

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

        <MapController
          centerTrigger={centerTrigger}
          userPosition={userLocation}
          followUser={mode === "tur"}
        />

        {/* Click-to-pin in accident mode */}
        {mode === "ulykke" && <ClickHandler onMapClick={onMapClick} />}

        {/* User location */}
        <Marker position={userLocation} icon={sosActive ? sosIcon : userIcon} />

        {/* Accident marker */}
        {accidentMarker && (
          <Marker position={[accidentMarker.lat, accidentMarker.lng]} icon={accidentIcon}>
            <Popup>
              <strong>Rapportert ulykke</strong>
            </Popup>
          </Marker>
        )}

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
