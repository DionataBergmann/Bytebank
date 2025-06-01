import { useState } from "react";
import AdvantagesSection from "./AdvantagesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main
        className="flex-grow bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/bg-gradient.png')" }}
      >
        <HeroSection />
        <AdvantagesSection />
      </main>

      <Footer />
    </div>
  );
}
