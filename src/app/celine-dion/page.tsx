import HeroSection from "./components/HeroSection";
import AboutFest from "./components/AboutFest";
import PricesSection from "./components/PricesSection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <PricesSection />
      <AboutFest />
      
      <Footer />
    </main>
  );
}