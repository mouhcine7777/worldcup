"use client";

export default function HeroSection() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="hero"
        style={{ height: "100dvh", minHeight: 600 }}
        className="relative flex flex-col w-full overflow-hidden bg-[#0d1f0d]"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[url('/bg.jpeg')]"
          style={{ filter: "brightness(0.55) saturate(0.8)" }}
        />

        {/* Overlays — dark green tint instead of pure black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0d] via-[#0d1f0d]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f0d]/60 to-transparent" />



        {/* CONTENT */}
        <div className="relative z-10 flex flex-1 items-center px-8 md:px-14">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">
              <div className="w-6 h-px bg-[#C1272D]" />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                className="text-[11px] tracking-[0.28em] uppercase text-[#C1272D]"
              >
                Agence Officielle · Supporters Maroc
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
              className="text-[clamp(48px,9vw,96px)] mb-2 opacity-0 animate-[fadeUp_0.6s_ease_0.35s_forwards]"
            >
              <span className="text-white block">Vis la</span>
              <span className="text-white block">Coupe du</span>
              <span className="text-white block">Monde 2026</span>
            </h1>

            {/* Sub-line */}
            <p
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
              className="text-base tracking-wide text-[#4caf50] uppercase mb-4 opacity-0 animate-[fadeUp_0.6s_ease_0.5s_forwards]"
            >
              avec les Lions de l'Atlas 🇲🇦
            </p>

            {/* Description */}
            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-sm font-light leading-relaxed text-white/60 max-w-md mb-8 opacity-0 animate-[fadeUp_0.6s_ease_0.65s_forwards]"
            >
              Billets officiels + hôtel + transferts — tout inclus.
              Réservez votre place avant qu'il ne soit trop tard.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 opacity-0 animate-[fadeUp_0.6s_ease_0.8s_forwards]">
              <button
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                className="text-sm tracking-widest uppercase px-8 py-3.5 bg-[#C1272D] text-white hover:bg-[#a8222a] active:scale-95 transition-all duration-150"
                onClick={() => scrollTo("packages")}
              >
                Réserver un package
              </button>
              <button
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                className="text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-200"
                onClick={() => scrollTo("about")}
              >
                Les matchs →
              </button>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="relative z-10 flex border-t border-white/10 opacity-0 animate-[fadeIn_0.7s_ease_1.05s_forwards] shrink-0">
          {[
            { n: "3", l: "Matchs Maroc" },
            { n: "100%", l: "Officiel" },
            { n: "4★", l: "Hôtels inclus" },
            { n: "24h", l: "Support" },
          ].map((s, i, arr) => (
            <div
              key={s.l}
              className={`flex-1 py-4 text-center bg-black/60 backdrop-blur-sm ${
                i < arr.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <div
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                className="text-xl text-[#4caf50] leading-none"
              >
                {s.n}
              </div>
              <div
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                className="text-[10px] tracking-widest uppercase text-white/40 mt-1"
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>
      </section>
    </>
  );
}