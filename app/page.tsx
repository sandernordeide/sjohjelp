import MapWrapper from "@/components/MapWrapper";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Velkommen til Sjøhjelp</h1>
            <p className="text-lg text-foreground/80">
              Båtredning i Høyanger, Vestland - Se brukere på sjøen og få hjelp i nødsituasjoner
            </p>
          </div>
          <a
            href="/register"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            Bli med nå
          </a>
        </div>
      </div>
      
      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <MapWrapper />
      </div>
    </div>
  );
}
