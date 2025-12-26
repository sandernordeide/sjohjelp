"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <nav className="bg-primary text-white shadow-md relative">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚓</span>
            <h1 className="text-xl font-bold">Sjøhjelp</h1>
          </div>
          
          {/* Hamburger menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-secondary transition-colors p-2"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-64 bg-white shadow-lg rounded-bl-lg z-50">
          <div className="py-2">
            <a
              href="/settings"
              className="block px-4 py-3 text-foreground hover:bg-secondary/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Mine innstillinger
            </a>
            
            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
            >
              Logg ut
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
