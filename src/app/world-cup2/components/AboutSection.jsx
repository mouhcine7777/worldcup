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
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="about"
        ref={ref}
        className="relative overflow-hidden"
        style={{
          background: "#F7F4F0",
          padding: "clamp(48px,6vw,88px) clamp(20px,6vw,80px)",
        }}
      >
        {/* Decorative background number */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -20,
            right: -10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(160px, 22vw, 280px)",
            lineHeight: 1,
            color: "rgba(193,39,45,0.045)",
            textTransform: "uppercase",
            userSelect: "none",
            letterSpacing: "-0.04em",
            pointerEvents: "none",
          }}
        >
          2026
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: "clamp(28px,4vw,52px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div>
            {/* Eyebrow — same style as Hero */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 1, background: "#C1272D" }} />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#C1272D",
                }}
              >
                USA 2026 · Nos Terrains de Jeu
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px,7vw,78px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#111",
                margin: 0,
              }}
            >
              Les Stades{" "}
              <span style={{ color: "#C1272D" }}>du Maroc</span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.42)",
              maxWidth: 300,
              margin: 0,
            }}
          >
            Deux enceintes mythiques. Deux batailles pour les Lions de l'Atlas. 🇲🇦
          </p>
        </div>

        {/* CARDS */}
        <div
          className="stade-cards"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}
        >
          {STADES.map((s, i) => (
            <div
              key={s.num}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "clamp(320px,38vw,460px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(40px)",
                transition: `opacity .9s ease ${i * 0.18}s, transform .9s ease ${i * 0.18}s`,
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
                  filter: "brightness(0.6) saturate(0.85)",
                  transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

              {/* Big number */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 18,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(56px,8vw,88px)",
                  color: "rgba(193,39,45,0.45)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                {s.num}
              </div>

              {/* Top-right badges */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: 13,
                    color: "#fff",
                    background: "rgba(0,0,0,0.5)",
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.capacity}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#4caf50",
                    background: "rgba(0,0,0,0.5)",
                    padding: "3px 10px",
                  }}
                >
                  {s.dist} du centre
                </span>
              </div>

              {/* Bottom overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "60px 20px 20px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)",
                }}
              >
                {/* Date pill — Hero red style */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid rgba(193,39,45,0.5)",
                    background: "rgba(193,39,45,0.15)",
                    padding: "4px 12px",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#C1272D",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#C1272D",
                    }}
                  >
                    {s.date}
                  </span>
                </div>

                {/* City */}
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(28px,4.5vw,48px)",
                    color: "#fff",
                    lineHeight: 0.92,
                    textTransform: "uppercase",
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.city}
                </div>

                {/* Match line */}
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(11px,1.4vw,14px)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: 5,
                  }}
                >
                  {s.match}{" "}
                  <span style={{ color: "#4caf50", fontWeight: 600 }}>· {s.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            color: "rgba(0,0,0,0.25)",
            marginTop: 14,
          }}
        >
          * Horaires et stades à titre indicatif, sous réserve de confirmation FIFA.
        </p>

        <style>{`
          @media (max-width: 640px) {
            .stade-cards { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}