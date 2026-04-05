"use client";

import { useState } from "react";

type Step = "form" | "preview" | "sent";

interface AccidentFormProps {
  accidentPosition: { lat: number; lng: number } | null;
  userName: string;
  userPhone: string;
  onSubmit: (data: { type: string; description: string; position: { lat: number; lng: number } }) => void;
  onCancel: () => void;
  mapSlot?: React.ReactNode;
}

export default function AccidentForm({
  accidentPosition,
  userName,
  userPhone,
  onSubmit,
  onCancel,
  mapSlot,
}: AccidentFormProps) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<Step>("form");

  // Step 3: Message sent
  if (step === "sent") {
    return (
      <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center space-y-4">
        <span className="text-4xl block">✅</span>
        <h3 className="text-lg font-bold text-green-800">Meldingen er sendt til brukere i din region.</h3>
        <a
          href="tel:113"
          className="block w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg transition-colors"
        >
          Ring nødnummer 113
        </a>
      </div>
    );
  }

  // Step 2: Preview the generated emergency message
  if (step === "preview" && accidentPosition) {
    return (
      <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <span>⚠️</span> Nødmelding
        </h3>

        <div className="bg-white rounded-lg p-4 border border-orange-200 text-sm text-foreground leading-relaxed">
          <p className="font-semibold mb-2">Dette er en generert nødmelding fra Sjøhjelp</p>
          <p>
            {userName} har sett en ulykke i nærheten av{" "}
            <strong>{accidentPosition.lat.toFixed(5)}, {accidentPosition.lng.toFixed(5)}</strong>.
            Ring {userName} på telefonnummer{" "}
            <strong>{userPhone}</strong> for mer informasjon.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onSubmit({ type, description, position: accidentPosition });
              setStep("sent");
            }}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-lg transition-colors"
          >
            Fortsett, send nødmelding
          </button>
          <button
            onClick={() => setStep("form")}
            className="w-full py-3 border-2 border-orange-400 text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition-colors"
          >
            Angre, trekk nødmelding
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Form
  return (
    <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span>⚠️</span> Rapporter ulykke
      </h3>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          1. Marker ulykke på kart <span className="text-red-500">*</span>
        </label>
        {mapSlot}
        {accidentPosition ? (
          <p className="text-sm text-foreground/70 mt-1">
            Markert: {accidentPosition.lat.toFixed(5)}, {accidentPosition.lng.toFixed(5)}
          </p>
        ) : (
          <p className="text-foreground/70 text-sm mt-1">
            Trykk på kartet for å markere ulykken
          </p>
        )}
      </div>

      <div>
        <label htmlFor="accidentType" className="block text-sm font-medium text-foreground mb-1">
          2. Type ulykke <span className="text-red-500">*</span>
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
          3. Beskrivelse (valgfritt)
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
        onClick={() => setStep("preview")}
        disabled={!accidentPosition || !type}
        className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base"
      >
        Send melding
      </button>
    </div>
  );
}
