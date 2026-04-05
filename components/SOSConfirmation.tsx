"use client";

import { useState } from "react";

interface Boat {
  id: number;
  name: string;
  phone: string;
}

interface SOSConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SOSConfirmation({ onConfirm, onCancel }: SOSConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-red-600 z-[9999] flex flex-col items-center justify-center p-8 text-white text-center">
      <span className="text-8xl mb-6">🆘</span>
      <h1 className="text-3xl font-black mb-4">Er du sikker?</h1>
      <p className="text-xl mb-10 max-w-sm">
        Dette varsler alle i området og ringer båter til sjøs.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={onConfirm}
          className="w-full py-5 bg-white text-red-600 text-xl font-black rounded-lg"
        >
          Ja, send SOS
        </button>
        <button
          onClick={onCancel}
          className="w-full py-4 border-2 border-white text-white text-lg font-semibold rounded-lg"
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}

interface SOSActiveProps {
  position: { lat: number; lng: number } | null;
  userName: string;
  notifiedBoats: Boat[];
  onCancel: () => void;
}

export function SOSActive({ position, userName, notifiedBoats, onCancel }: SOSActiveProps) {
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 space-y-4 relative z-[1000]">
      <div className="text-center">
        <span className="text-5xl block sos-pulse">🆘</span>
        <h2 className="text-2xl font-black text-red-600 mt-3">SOS aktiv</h2>
        <p className="text-red-700 font-medium mt-1">SOS melding til andre er sendt</p>
        {position && (
          <p className="text-sm text-red-600/70 mt-2">
            Din posisjon: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
          </p>
        )}
      </div>

      {/* Call emergency services */}
      <a
        href="tel:113"
        className="block w-full py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-black rounded-lg text-center transition-colors"
      >
        Ring nødetatene (113)
      </a>

      {notifiedBoats.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-2">Varslet båter i nærheten:</h3>
          <div className="space-y-2">
            {notifiedBoats.map((boat) => (
              <div key={boat.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                <span className="font-medium text-foreground">⛵ {boat.name}</span>
                <a
                  href={`tel:${boat.phone}`}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Ring
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {!confirmCancel ? (
        <button
          onClick={() => setConfirmCancel(true)}
          className="w-full py-3 px-4 border-2 border-red-400 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
        >
          Avbryt SOS
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-red-600 font-medium text-center">Er du sikker på at du vil avbryte?</p>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg"
            >
              Ja, avbryt
            </button>
            <button
              onClick={() => setConfirmCancel(false)}
              className="flex-1 py-3 border-2 border-red-400 text-red-600 font-semibold rounded-lg"
            >
              Nei, behold
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
