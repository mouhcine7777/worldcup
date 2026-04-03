"use client";

export default function HeroSection() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="hero"
        style={{ height: "100dvh", minHeight: 600 }}
        className="relative flex flex-col w-full overflow-hidden bg-[#0a0a0a]"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[url('/bg.jpeg')]"
          style={{
            filter: "brightness(0.85)",
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/25 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-1 items-center px-8 md:px-14">
          <div className="max-w-xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 opacity-0 animate-[fadeUp_0.7s_ease_0.2s_forwards]">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="font-adidas text-xs font-semibold tracking-[0.3em] uppercase text-[#C9A84C]"
              >
                Package Officiel · Maroc
              </span>
            </div>

            {/* Title */}
            <h1
              style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 0.9 }}
              className="text-[clamp(52px,8vw,88px)] tracking-wide mb-6 opacity-0 animate-[fadeUp_0.7s_ease_0.4s_forwards]"
            >
              <span className="font-['Bebas_Neue'] text-white block">World Cup</span>
              <span className="font-['Bebas_Neue'] text-[#C9A84C] block">2026</span>
            </h1>

            {/* Description */}
            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-sm font-light leading-relaxed text-white/55 max-w-sm mb-10 opacity-0 animate-[fadeUp_0.7s_ease_0.6s_forwards]"
            >
              Packages tout-inclus — hôtel 4★, billets officiels & transferts —
              pour vivre la Coupe du Monde aux États-Unis avec les Lions de l'Atlas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 opacity-0 animate-[fadeUp_0.7s_ease_0.8s_forwards]">
              <button
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="font-adidas text-sm font-bold tracking-widest uppercase px-9 py-3.5 bg-[#C9A84C] text-black hover:bg-[#d4b05a] transition-colors duration-200"
                onClick={() => scrollTo("packages")}
              >
                Voir les packages
              </button>
              <button
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="font-adidas text-sm font-semibold tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors duration-200"
                onClick={() => scrollTo("about")}
              >
                Les matchs →
              </button>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="relative z-10 flex border-t border-white/10 opacity-0 animate-[fadeIn_0.8s_ease_1.1s_forwards] shrink-0">
          {[
            { n: "48", l: "Nations" },
            { n: "104", l: "Matchs" },
            { n: "16", l: "Villes" },
            { n: "4★", l: "Hôtels" },
          ].map((s, i, arr) => (
            <div
              key={s.l}
              className={`flex-1 py-4 text-center bg-black/50 backdrop-blur-sm ${
                i < arr.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <div
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                className="text-2xl text-[#C9A84C] leading-none"
              >
                {s.n}
              </div>
              <div
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-[10px] tracking-widest uppercase text-white/40 mt-1"
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
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