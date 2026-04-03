"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.06) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const STADES = [
  {
    num: "01",
    city: "NEW YORK",
    name: "MetLife Stadium",
    match: "Brésil vs Maroc",
    date: "13 Juin · 18:00",
    img: "/metlife.webp",
    capacity: "82 500",
    dist: "30 min",
  },
  {
    num: "02",
    city: "BOSTON",
    name: "Gillette Stadium",
    match: "Écosse vs Maroc",
    date: "19 Juin · 18:00",
    img: "/gillette.jpg",
    capacity: "65 878",
    dist: "35 min",
  },
];

export default function StadesSection() {
  const [ref, visible] = useInView();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="about"
        ref={ref}
        style={{
          background: "#F7F3EE",
          padding: "clamp(40px, 5vw, 72px) clamp(20px, 7vw, 96px)",
          overflow: "hidden",
        }}
      >
        {/* HEADER — single compact row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: "clamp(28px, 4vw, 48px)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                USA 2026 · Nos Terrains de Jeu
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 72px)",
                color: "#111",
                lineHeight: 0.9,
                margin: 0,
              }}
            >
              Les Stades <span style={{ color: "#C9A84C" }}>du Maroc</span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(0,0,0,0.38)",
              maxWidth: 300,
              margin: 0,
            }}
          >
            Deux enceintes mythiques. Deux batailles pour les Lions de l'Atlas.
          </p>
        </div>

        {/* CARDS — side by side */}
        <div
          className="stade-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          }}
        >
          {STADES.map((s, i) => (
            <div
              key={s.num}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(40px)",
                transition: `opacity .9s ease ${i * 0.18}s, transform .9s ease ${i * 0.18}s`,
                position: "relative",
                overflow: "hidden",
                height: "clamp(320px, 40vw, 480px)",
              }}
            >
              {/* Photo */}
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.65) contrast(1.08)",
                  transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />

              {/* Number — top corner */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 22,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(48px, 7vw, 80px)",
                  color: "rgba(201,168,76,0.55)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {s.num}
              </div>

              {/* Top-right: capacity + dist */}
              <div
                style={{
                  position: "absolute",
                  top: 22,
                  right: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 16,
                    color: "#fff",
                    background: "rgba(0,0,0,0.45)",
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.capacity}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    background: "rgba(0,0,0,0.45)",
                    padding: "3px 10px",
                  }}
                >
                  {s.dist} du centre
                </span>
              </div>

              {/* Bottom gradient + info */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "52px 22px 22px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                }}
              >
                {/* Match pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(201,168,76,0.2)",
                    border: "1px solid rgba(201,168,76,0.4)",
                    padding: "4px 12px",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                    }}
                  >
                    {s.date}
                  </span>
                </div>

                {/* City */}
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    color: "#fff",
                    lineHeight: 0.95,
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.city}
                </div>

                {/* Match */}
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(12px, 1.5vw, 15px)",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginTop: 4,
                  }}
                >
                  {s.match} · {s.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            opacity: visible ? 1 : 0,
            transition: "opacity .7s ease 0.6s",
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              fontWeight: 300,
              color: "rgba(0,0,0,0.28)",
              margin: 0,
            }}
          >
            * Horaires et stades à titre indicatif, sous réserve de confirmation FIFA.
          </p>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .stade-cards { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}