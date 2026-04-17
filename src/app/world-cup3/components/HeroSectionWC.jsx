"use client";

export default function HeroSection() {
  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .hero-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 10px;
          font-size: clamp(18px, 4vw, 42px);
        }
        .hero-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
          font-size: clamp(13px, 2vw, 22px);
        }
        .hero-desc {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          margin-bottom: 32px;
          font-size: clamp(12px, 1.4vw, 15px);
          max-width: 420px;
        }
        .hero-btn {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #fff;
          background: #8B0000;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
          font-size: clamp(10px, 1.1vw, 13px);
          padding: clamp(10px, 1.2vw, 16px) clamp(28px, 4vw, 48px);
        }
        .hero-btn:hover { background: #6a0000; }
        .hero-btn:active { transform: scale(0.95); }
      `}</style>

      <section
        style={{ height: "100dvh", minHeight: 600 }}
        className="relative flex items-center justify-center w-full overflow-hidden bg-[#0a0000]"
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.75)" }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/20 to-transparent" />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6"
          style={{ maxWidth: "min(860px, 90vw)" }}
        >
          <h1 className="hero-title">
            Vivez la Coupe du Monde avec l'Équipe Nationale
          </h1>

          <p className="hero-subtitle">
            Une expérience complète, à portée d'un clic
          </p>

          <p className="hero-desc">
            Une Coupe du Monde historique. Une expérience à vivre de l'intérieur.
            Billets officiels, hôtels 4★, transferts inclus.
            Tout est pensé pour que vous y soyez.
          </p>

          <button className="hero-btn" onClick={scrollToPackages}>
            Réserver ma place
          </button>
        </div>
      </section>
    </>
  );
}