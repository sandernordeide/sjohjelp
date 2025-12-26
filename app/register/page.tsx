"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    boatName: "",
    boatType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user data in localStorage for now
    localStorage.setItem("user", JSON.stringify(formData));
    
    setLoading(false);
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Registrer deg</h1>
        <p className="text-foreground/70 mb-6">
          Bli en del av Sjøhjelp-nettverket i Høyanger, Vestland
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Personlig informasjon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  Fornavn *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Etternavn *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Telefonnummer *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+47 XXX XX XXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                E-post *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="din@epost.no"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Boat Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Båtinformasjon</h2>
            
            <div>
              <label htmlFor="boatName" className="block text-sm font-medium text-foreground mb-2">
                Båtnavn
              </label>
              <input
                type="text"
                id="boatName"
                name="boatName"
                value={formData.boatName}
                onChange={handleChange}
                placeholder="F.eks. 'Havfrue'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="boatType" className="block text-sm font-medium text-foreground mb-2">
                Båttype
              </label>
              <select
                id="boatType"
                name="boatType"
                value={formData.boatType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Velg båttype</option>
                <option value="sailboat">Seilbåt</option>
                <option value="motorboat">Motorbåt</option>
                <option value="rib">RIB</option>
                <option value="kayak">Kajakk</option>
                <option value="other">Annet</option>
              </select>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-secondary/10 p-4 rounded-lg">
            <p className="text-sm text-foreground/80">
              Ved å registrere deg samtykker du til at din posisjon og telefonnummer kan vises til andre brukere i nødsituasjoner.
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrerer..." : "Registrer deg"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
