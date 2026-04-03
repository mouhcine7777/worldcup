import StickyMenu from "./components/StickyMenu";
import HeroSectionWC from "./components/HeroSectionWC";
import AboutSection from "./components/AboutSection";
import PackagesSection from "./components/PackagesSection";
import HotelSection from "./components/HotelSection";
import FooterSection from "./components/FooterSection";


export default function Home() {
  return (
    <main>
        <StickyMenu />
      <HeroSectionWC />
      <AboutSection />
      <PackagesSection />
      <HotelSection />
      <FooterSection />
    </main>
  );
}