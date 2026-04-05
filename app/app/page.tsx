"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MapWrapper from "@/components/MapWrapper";
import ActionButtons, { type AppMode } from "@/components/ActionButtons";
import TripStatus from "@/components/TripStatus";
import AccidentForm from "@/components/AccidentForm";
import { SOSConfirmation, SOSActive } from "@/components/SOSConfirmation";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  boatName?: string;
  boatType?: string;
}

const DEFAULT_LOCATION = { lat: 61.212322, lng: 6.076083 };

// Simulated nearby boats (will come from backend later)
const NEARBY_BOATS = [
  { id: 1, name: "Sander", phone: "+47 47352127" },
  { id: 2, name: "Arne Ove", phone: "+47 99288837" },
];

export default function AppPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [centerTrigger, setCenterTrigger] = useState(0);

  // Mode state
  const [mode, setMode] = useState<AppMode>("idle");
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);

  // Trip mode state
  const [tripStartTime, setTripStartTime] = useState<number>(0);
  const watchIdRef = useRef<number | null>(null);

  // Accident mode state
  const [accidentMarker, setAccidentMarker] = useState<{ lat: number; lng: number } | null>(null);

  // Auth + initial location
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLocation(DEFAULT_LOCATION);
          setLoading(false);
        }
      );
    } else {
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
    }
  }, [router]);

  // Start/stop continuous GPS tracking for trip mode
  useEffect(() => {
    if (mode === "tur" && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        undefined,
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [mode]);

  const handleModeChange = useCallback((newMode: AppMode) => {
    if (newMode === "sos") {
      setShowSOSConfirm(true);
      return;
    }

    if (newMode === "tur") {
      setTripStartTime(Date.now());
    }

    if (newMode === "idle") {
      setAccidentMarker(null);
    }

    setMode(newMode);
  }, []);

  const handleSOSConfirm = useCallback(() => {
    setShowSOSConfirm(false);
    setMode("sos");
  }, []);

  const handleSOSCancel = useCallback(() => {
    setShowSOSConfirm(false);
    setMode("idle");
  }, []);

  const handleAccidentSubmit = useCallback(
    (data: { type: string; description: string; position: { lat: number; lng: number } }) => {
      // TODO: Send to backend
      console.log("Accident report:", data);
      // Keep marker visible, return to idle after a delay
      setTimeout(() => setMode("idle"), 3000);
    },
    []
  );

  if (loading || !user || !location) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-foreground">Laster...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* SOS full-screen confirmation overlay */}
      {showSOSConfirm && (
        <SOSConfirmation onConfirm={handleSOSConfirm} onCancel={handleSOSCancel} />
      )}

      {/* Header — changes per mode */}
      <div className="mb-4">
        {mode === "idle" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Hei, {user.firstName}
            </h1>
            <p className="text-foreground/70 text-sm">
              <button
                onClick={() => setCenterTrigger((prev) => prev + 1)}
                className="text-primary hover:text-primary-hover underline font-semibold"
              >
                {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
              </button>
            </p>
          </>
        )}

        {mode === "tur" && (
          <TripStatus
            position={location}
            startTime={tripStartTime}
            onEndTrip={() => handleModeChange("idle")}
          />
        )}

        {mode === "sos" && (
          <SOSActive
            position={location}
            userName={user.firstName}
            notifiedBoats={NEARBY_BOATS}
            onCancel={handleSOSCancel}
          />
        )}
      </div>

      {/* Action buttons */}
      {mode !== "sos" && (
        <div className="mb-4">
          <ActionButtons mode={mode} onModeChange={handleModeChange} />
        </div>
      )}

      {/* Map — hidden during SOS to avoid Leaflet z-index conflicts */}
      {mode !== "sos" && (
        <div className="bg-white rounded-lg shadow-lg p-2">
          <MapWrapper
            mode={mode}
            centerTrigger={centerTrigger}
            userPosition={location}
            accidentMarker={accidentMarker}
            sosActive={false}
            onMapClick={(lat, lng) => setAccidentMarker({ lat, lng })}
          />
        </div>
      )}

      {/* Accident form — below map */}
      {mode === "ulykke" && (
        <div className="mt-4">
          <AccidentForm
            accidentPosition={accidentMarker}
            onSubmit={handleAccidentSubmit}
          />
        </div>
      )}
    </div>
  );
}
