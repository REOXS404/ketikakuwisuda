"use client";

import { useState } from "react";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Gallery from "./components/Gallery/Gallery";

export default function Home() {
  const [location] = useState({
    lat: -6.3668,
    lng: 106.8386,
    name: "Ayam Goreng Wijaya",
    address: "Jakarta",
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* subtle tiled pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"80\" height=\"80\" fill=\"%23666\" rx=\"8\"/%3E%3C/svg%3E")',
            backgroundSize: "120px 120px",
            backgroundPosition: "0 0",
          }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 py-8">
        <Contact location={location} />
        <Gallery />
      </main>
    </div>
  );
}
