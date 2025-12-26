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

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Velkommen til Sjøhjelp</h1>
        <p className="text-lg text-foreground/80">
          Båtredning i Høyanger, Vestland - Se brukere på sjøen og få hjelp i nødsituasjoner
        </p>
      </div>
      
      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Map />
      </div>
    </div>
  );
}
