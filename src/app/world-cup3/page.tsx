import HeroSectionWC from "./components/HeroSectionWC";
import PackagesSection from "./components/PackagesSection";
import SectionStretch from "./components/SectionStretch";
import HotelSection from "./components/HotelSection";
import FooterSection from "./components/FooterSection";


export default function Home() {
  return (
    <main>
      <HeroSectionWC />
      <HotelSection />
      <PackagesSection />
      <SectionStretch />
      <FooterSection />
    </main>
  );
}