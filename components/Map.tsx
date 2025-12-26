"use client";

export default function Map() {
  // Høyanger coordinates: 61.2145° N, 6.0766° E
  const latitude = 61.2145;
  const longitude = 6.0766;
  const zoom = 13;

  return (
    <div className="w-full h-full min-h-[500px] rounded overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "500px" }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik&marker=${latitude},${longitude}`}
        title="Map of Høyanger, Vestland, Norway"
      />
      <div className="text-xs text-center mt-2 text-foreground/60">
        <a 
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          Se større kart på OpenStreetMap
        </a>
      </div>
    </div>
  );
}
