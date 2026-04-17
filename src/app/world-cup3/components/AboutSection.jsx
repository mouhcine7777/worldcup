"use client";

import { useState } from "react";

const MATCHES = [
  {
    id: "metlife",
    stadium: "MetLife Stadium",
    city: "New York",
    match: "BRÉSIL VS MAROC",
    flag1: "/flag-br.png",
    flag2: "/flag-ma.png",
    date: "13 Juin · 18:00",
    capacity: "82 500",
    distance: "30 min du centre",
    surface: "Gazon naturel",
    opened: "Inauguré en 2010",
    image: "/metlife-1.png",
    desc: "Le MetLife Stadium, situé dans le New Jersey, est l'une des plus grandes arènes sportives des États-Unis. Il accueille les Giants et les Jets de la NFL, et sera l'un des stades phares de la Coupe du Monde 2026.",
  },
  {
    id: "gillette",
    stadium: "Gillette Stadium",
    city: "Boston",
    match: "ÉCOSSE VS MAROC",
    flag1: "/flag-sc.png",
    flag2: "/flag-ma.png",
    date: "19 Juin · 21:00",
    capacity: "65 878",
    distance: "45 min du centre",
    surface: "Gazon hybride",
    opened: "Inauguré en 2002",
    image: "/gillette-1.png",
    desc: "Le Gillette Stadium, domicile des New England Patriots, est situé à Foxborough, Massachusetts. Réputé pour son atmosphère électrique, il sera l'un des théâtres incontournables du Mondial 2026.",
  },
];

export default function MatchesSection() {
  const [active, setActive] = useState(null);
  const activeMatch = MATCHES.find((m) => m.id === active);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .badge {
          display: inline-block;
          border: 1px solid rgba(139,0,0,0.55);
          border-radius: 999px;
          padding: 5px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
        }
        .img-btn {
          cursor: pointer;
          position: relative;
          transition: transform 0.4s cubic-bezier(.77,0,.18,1);
        }
        .img-btn:hover { transform: scale(1.03); }
        .img-btn img {
          width: 100%;
          height: auto;
          display: block;
          transition: filter 0.4s ease;
        }
        .slide-right {
          animation: slideRight 0.45s cubic-bezier(.77,0,.18,1) forwards;
        }
        .slide-left {
          animation: slideLeft 0.45s cubic-bezier(.77,0,.18,1) forwards;
        }
        .fade-up {
          animation: fadeUp 0.45s ease forwards;
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .default-row {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .default-center {
          flex: 1;
          text-align: center;
          padding: 0 clamp(16px, 3vw, 48px);
          flex-shrink: 0;
        }
        .active-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(24px, 4vw, 80px);
          width: 100%;
          padding: 0 clamp(24px, 6vw, 80px);
        }
        .active-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 480px;
          flex: 1;
        }
        @media (max-width: 700px) {
          .default-row {
            flex-direction: column !important;
            gap: 24px;
            padding: 0 24px;
          }
          .default-img-left,
          .default-img-right {
            margin: 0 !important;
            width: 100% !important;
          }
          .default-center { order: -1; padding: 0; }
          .active-row {
            flex-direction: column !important;
            padding: 0 24px;
            gap: 24px;
          }
          .active-info {
            align-items: center !important;
            text-align: center !important;
            max-width: 100%;
          }
          .active-info .badges { justify-content: center; }
          .active-img { width: 100% !important; }
        }
      `}</style>

      <section
        id="about"
        style={{
          background: "#f5f5f5",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 0",
        }}
      >
        {/* Trophy watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/trophy.png')",
            backgroundSize: "45%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

          {/* DEFAULT STATE */}
          {!active && (
            <div className="default-row">

              {/* Left image */}
              <div
                className="default-img-left slide-right"
                style={{ flexShrink: 0, marginLeft: "-2vw", width: "clamp(300px, 38vw, 520px)" }}
              >
                <div className="img-btn" onClick={() => setActive("metlife")}>
                  <img src={MATCHES[0].image} alt={MATCHES[0].stadium} />
                  <div style={{
                    position: "absolute", bottom: 12, left: 0, right: 0,
                    textAlign: "center",
                  }}>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "'Montserrat', sans-serif", fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "#fff",
                      background: "#8B0000",
                      borderRadius: 999,
                      padding: "5px 14px",
                    }}>
                      Cliquer →
                    </span>
                  </div>
                </div>
              </div>

              {/* Center */}
              <div className="default-center fade-up">
                <div style={{ width: 28, height: 1, background: "#8B0000", margin: "0 auto 16px" }} />
                <h2 style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
                  fontSize: "clamp(18px, 2.4vw, 32px)", color: "#111",
                  lineHeight: 1.2, textTransform: "uppercase", marginBottom: 14,
                }}>
                  Les matchs du Maroc
                </h2>
                <p style={{
                  fontFamily: "'Barlow', sans-serif", fontSize: 14,
                  color: "rgba(0,0,0,0.55)", fontWeight: 300, lineHeight: 1.7,
                }}>
                  Deux villes, deux rendez-vous décisifs pour les Lions de l'Atlas.
                </p>
              </div>

              {/* Right image */}
              <div
                className="default-img-right slide-left"
                style={{ flexShrink: 0, marginRight: "-2vw", width: "clamp(300px, 38vw, 520px)" }}
              >
                <div className="img-btn" onClick={() => setActive("gillette")}>
                  <img src={MATCHES[1].image} alt={MATCHES[1].stadium} />
                  <div style={{
                    position: "absolute", bottom: 12, left: 0, right: 0,
                    textAlign: "center",
                  }}>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "'Montserrat', sans-serif", fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "#fff",
                      background: "#8B0000",
                      borderRadius: 999,
                      padding: "5px 14px",
                    }}>
                      Cliquer →
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ACTIVE STATE */}
          {active && activeMatch && (
            <div className="active-row">

              {/* Image */}
              <div
                className={`active-img ${active === "metlife" ? "slide-right" : "slide-left"}`}
                style={{
                  order: active === "metlife" ? 0 : 1,
                  flexShrink: 0,
                  width: "clamp(300px, 38vw, 520px)",
                }}
              >
                <div className="img-btn" onClick={() => setActive(null)}>
                  <img src={activeMatch.image} alt={activeMatch.stadium} />
                  <div style={{
                    position: "absolute", bottom: 12, left: 0, right: 0,
                    textAlign: "center",
                  }}>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "'Montserrat', sans-serif", fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "#fff",
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: 999,
                      padding: "5px 14px",
                    }}>
                      ✕ Fermer
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div
                className={`active-info ${active === "metlife" ? "slide-left" : "slide-right"}`}
                style={{ order: active === "metlife" ? 1 : 0 }}
              >
                {/* Stadium label */}
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
                  fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "#8B0000", marginBottom: 10,
                }}>
                  {activeMatch.stadium}
                </p>

                {/* Match title */}
                <h3 style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
                  fontSize: "clamp(24px, 3.5vw, 48px)", color: "#111",
                  lineHeight: 1.05, marginBottom: 16,
                }}>
                  {activeMatch.match}
                </h3>

                {/* Flags + date row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={activeMatch.flag1} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 6px rgba(0,0,0,0.18)" }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10, color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em" }}>VS</span>
                    <img src={activeMatch.flag2} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 6px rgba(0,0,0,0.18)" }} />
                  </div>
                  <div style={{ width: 1, height: 20, background: "rgba(0,0,0,0.12)" }} />
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#111", fontWeight: 400 }}>{activeMatch.date}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(0,0,0,0.45)", fontWeight: 300 }}>· {activeMatch.city}</span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: "'Barlow', sans-serif", fontSize: 13,
                  color: "rgba(0,0,0,0.5)", fontWeight: 300, lineHeight: 1.75,
                  marginBottom: 22, maxWidth: 420,
                }}>
                  {activeMatch.desc}
                </p>

                {/* Stats chips */}
                <div className="badges" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                  {[
                    activeMatch.capacity + " places",
                    activeMatch.distance,
                    activeMatch.surface,
                    activeMatch.opened,
                  ].map((label, i) => (
                    <span key={i} style={{
                      display: "inline-flex", alignItems: "center",
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
                      fontSize: 10, letterSpacing: "0.08em",
                      color: "#111",
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: 999,
                      padding: "6px 14px",
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* Retour */}
                <button
                  onClick={() => setActive(null)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(0,0,0,0.4)", background: "none",
                    border: "1px solid rgba(0,0,0,0.15)", borderRadius: 999,
                    padding: "8px 20px", cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.4)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}
                >
                  ← Retour
                </button>
              </div>

            </div>
          )}

        </div>
      </section>
    </>
  );
}