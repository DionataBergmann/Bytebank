import { useState } from "react";
import AdvantagesSection from "./AdvantagesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function LandingPage() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsOpenLoginModal={setIsOpenLoginModal} isOpenLoginModal={isOpenLoginModal} />

      <main
        className="flex-grow bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/bg-gradient.png')" }}
      >
        <HeroSection setIsOpenLoginModal={setIsOpenLoginModal} isOpenLoginModal={isOpenLoginModal}/>
        <AdvantagesSection />
      </main>

      <Footer />
    </div>
  );
}
