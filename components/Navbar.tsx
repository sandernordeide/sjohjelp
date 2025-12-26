export default function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚓</span>
            <h1 className="text-xl font-bold">Sjøhjelp</h1>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="hover:text-secondary transition-colors">
              Hjem
            </a>
            <a href="/map" className="hover:text-secondary transition-colors">
              Kart
            </a>
            <a href="/about" className="hover:text-secondary transition-colors">
              Om oss
            </a>
            <a 
              href="/register" 
              className="bg-white text-primary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Registrer deg
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
