"use client";

import { useEffect, useState } from "react";

interface TripStatusProps {
  position: { lat: number; lng: number } | null;
  startTime: number;
  onEndTrip: () => void;
}

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

export default function TripStatus({ position, startTime, onEndTrip }: TripStatusProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="bg-primary/10 border-2 border-primary rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span>⛵</span> Du er på tur
        </h2>
        <span className="text-lg font-mono font-bold text-primary">
          {formatElapsed(elapsed)}
        </span>
      </div>

      {position && (
        <p className="text-sm text-foreground/70 mb-4">
          Posisjon: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      )}

      <button
        onClick={onEndTrip}
        className="w-full py-3 px-4 bg-foreground text-white font-semibold rounded-lg hover:bg-foreground/80 transition-colors"
      >
        Avslutt tur
      </button>
    </div>
  );
}
