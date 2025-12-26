import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sjøhjelp - Boat Rescue Service",
  description: "Emergency boat rescue service for Høyanger, Vestland, Norway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="flex flex-col min-h-screen">
        {/* Mobile-only container */}
        <div className="max-w-md mx-auto w-full min-h-screen flex flex-col shadow-xl">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
