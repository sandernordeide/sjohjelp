"use client";

export type AppMode = "idle" | "tur" | "ulykke" | "sos";

interface ActionButtonsProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export default function ActionButtons({ mode, onModeChange }: ActionButtonsProps) {
  if (mode !== "idle") {
    return (
      <button
        onClick={() => onModeChange("idle")}
        className="w-full py-3 px-4 border-2 border-foreground/30 text-foreground font-semibold rounded-lg hover:bg-foreground/10 transition-colors"
      >
        ← Avbryt
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => onModeChange("tur")}
        className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-lg transition-colors flex items-center justify-center gap-3"
      >
        <span className="text-2xl">⛵</span>
        Jeg skal på tur
      </button>

      <button
        onClick={() => onModeChange("ulykke")}
        className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-lg transition-colors flex items-center justify-center gap-3"
      >
        <span className="text-2xl">⚠️</span>
        Jeg ser en ulykke
      </button>

      <button
        onClick={() => onModeChange("sos")}
        className="w-full py-5 px-6 bg-red-600 hover:bg-red-700 text-white text-2xl font-black rounded-lg transition-colors flex items-center justify-center gap-3 tracking-wide"
      >
        <span className="text-3xl">🆘</span>
        SOS
      </button>
    </div>
  );
}
