// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-pe.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-[#D71B1B]/30 z-10" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-6">
        {/* Logo with red glow effect */}
        <div className="w-48 md:w-64 mb-8 md:mb-12 relative">
          <div className="absolute inset-0 blur-md bg-[#D71B1B]/20 animate-pulse" />
          <Image
            src="/logo.png"
            alt="Public Events Logo"
            width={256}
            height={128}
            className="relative z-10 w-full h-auto"
          />
        </div>

        {/* Hero Text with Creative Layout */}
        <div className="space-y-4 md:space-y-6 text-center max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-montserrat)' }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">NOUS ARRIVONS</span>
            <br />
            <span className="inline-block text-[#D71B1B] transform hover:scale-105 transition-transform duration-300 delay-100">BIENTÔT</span>
          </h1>

          {/* Red line separator */}
          <div className="w-16 md:w-24 h-1 bg-[#D71B1B] mx-auto transform hover:scale-150 transition-transform duration-300" />

          {/* Subheading with gradient text - Made fully responsive */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 mx-auto leading-relaxed px-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
            <span className="sm:whitespace-nowrap">Notre site web refait peau neuve.</span>
            <span className="hidden sm:inline"> </span>
            <span className="block sm:inline">Nous revenons très bientôt !</span>
            <br />
            En attendant, n'hésitez pas à nous contacter pour tous vos besoins.
          </p>
        </div>

        {/* CTA Button with creative hover effect - mailto link */}
        <div className="mt-8 md:mt-12 relative group">
          <div className="absolute inset-0 bg-[#D71B1B] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <Link 
            href="mailto:contact@publicevents.ma"
            className="inline-block relative bg-white text-black px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold 
                       hover:bg-[#D71B1B] hover:text-white transition-all duration-300 transform hover:scale-105
                       border-2 border-transparent hover:border-white"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;