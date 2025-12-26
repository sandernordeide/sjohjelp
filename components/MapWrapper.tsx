"use client";

import dynamic from "next/dynamic";

// Import Map dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-secondary/10 rounded">
      <p className="text-foreground/60">Laster kart...</p>
    </div>
  ),
});

export default function MapWrapper() {
  return <Map />;
}
