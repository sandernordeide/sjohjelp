"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MapWrapper from "@/components/MapWrapper";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  boatName?: string;
  boatType?: string;
}

export default function AppPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Get user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default Høyanger location if geolocation fails
          setLocation({
            lat: 61.212322,
            lng: 6.076083,
          });
          setLoading(false);
        }
      );
    } else {
      // Use default location if geolocation not supported
      setLocation({
        lat: 61.212322,
        lng: 6.076083,
      });
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  if (loading || !user || !location) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-foreground">Laster...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Velkommen {user.firstName}!
          </h1>
          <p className="text-lg text-foreground/80 mb-2">
            Vi er med deg på båtturen, og følger din posisjon
          </p>
          <p className="text-foreground/70">
            <strong>Din lokasjon er:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </p>
          <p className="text-lg font-semibold text-primary mt-2">God tur!</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Logg ut
        </button>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <MapWrapper />
      </div>
    </div>
  );
}
