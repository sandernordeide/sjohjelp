"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.phone === phone) {
        // Set logged in status
        localStorage.setItem("isLoggedIn", "true");
        setLoading(false);
        router.push("/app");
        return;
      }
    }

    setError("Telefonnummer ikke funnet. Vennligst registrer deg først.");
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <span className="text-6xl">⚓</span>
          <h1 className="text-3xl font-bold text-foreground mt-4">Logg inn</h1>
          <p className="text-foreground/70 mt-2">
            Velkommen tilbake til Sjøhjelp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Telefonnummer
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+47 XXX XX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/70">
            Har du ikke en konto?{" "}
            <a href="/register" className="text-primary hover:text-primary-hover font-semibold">
              Registrer deg her
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
