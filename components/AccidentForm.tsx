"use client";

import { useState } from "react";

interface AccidentFormProps {
  accidentPosition: { lat: number; lng: number } | null;
  onSubmit: (data: { type: string; description: string; position: { lat: number; lng: number } }) => void;
}

export default function AccidentForm({ accidentPosition, onSubmit }: AccidentFormProps) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
        <span className="text-4xl block mb-3">✅</span>
        <h3 className="text-lg font-bold text-green-800 mb-1">Melding sendt</h3>
        <p className="text-green-700 text-sm">
          Brukere i din region blir varslet. Du står som kontaktperson i meldingen.
        </p>
        <a
          href="tel:113"
          className="mt-4 inline-block w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-base"
        >
          Send nødmelding
        </a>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span>⚠️</span> Rapporter ulykke
      </h3>

      {!accidentPosition ? (
        <p className="text-foreground/70 text-sm font-medium">
          Trykk på kartet for å markere ulykken
        </p>
      ) : (
        <p className="text-sm text-foreground/70">
          Markert: {accidentPosition.lat.toFixed(5)}, {accidentPosition.lng.toFixed(5)}
        </p>
      )}

      <div>
        <label htmlFor="accidentType" className="block text-sm font-medium text-foreground mb-1">
          Type ulykke
        </label>
        <select
          id="accidentType"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-base"
        >
          <option value="">Velg type</option>
          <option value="boat_distress">Båt i nød</option>
          <option value="person_overboard">Person i vannet</option>
          <option value="grounding">Grunnstøting</option>
          <option value="other">Annet</option>
        </select>
      </div>

      <div>
        <label htmlFor="accidentDesc" className="block text-sm font-medium text-foreground mb-1">
          Beskrivelse (valgfritt)
        </label>
        <input
          type="text"
          id="accidentDesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kort beskrivelse av situasjonen"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-base"
        />
      </div>

      <button
        onClick={() => {
          if (accidentPosition && type) {
            onSubmit({ type, description, position: accidentPosition });
            setSubmitted(true);
          }
        }}
        disabled={!accidentPosition || !type}
        className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base"
      >
        Send melding
      </button>

      <p className="text-xs text-foreground/50 text-center">
        Etter innsending kan du ringe nødetatene direkte.
      </p>
    </div>
  );
}
