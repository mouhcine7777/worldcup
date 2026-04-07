"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

const HOTELS = [
  {
    step: "01",
    stepLabel: "Première étape",
    city: "New York",
    cityDisplay: ["NEW", "YORK"],
    dates: "12 – 16 Juin 2026",
    nights: "4 nuits",
    match: "Brésil vs Maroc",
    matchTime: "13 juin · 18:00 · MetLife",
    stadium: "MetLife · ~30 min",
    name: "The Gallivant Times Square",
    address: "234 W 48th St, New York",
    img: "/thegallivant.webp",
    imgAlt: "The Gallivant Times Square",
    perks: ["Times Square", "Broadway", "5th Avenue"],
    photoLeft: true,
    featured: true,
  },
  {
    step: "02",
    stepLabel: "Deuxième étape",
    city: "Boston",
    cityDisplay: ["BOSTON"],
    dates: "16 – 20 Juin 2026",
    nights: "4 nuits",
    match: "Écosse vs Maroc",
    matchTime: "19 juin · 18:00 · Gillette",
    stadium: "Gillette · ~35 min",
    name: "Omni Boston Hotel at the Seaport",
    address: "450 Summer St, Boston",
    img: "/omni.jpeg",
    imgAlt: "Omni Boston Hotel at the Seaport",
    perks: ["Seaport District", "Vue sur la baie", "Luxe urbain"],
    photoLeft: false,
    featured: false,
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="#C1272D">
    <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
  </svg>
);

function HotelCard({ hotel, index, visible }) {
  const infoRows = [
    { label: "Adresse", value: hotel.address, light: true },
    { label: "Stade", value: hotel.stadium, light: false },
    { label: "Durée", value: hotel.nights, light: false },
    { label: "Inclus", value: "Nuits + petit-déjeuner + transferts", light: false },
  ];

  const PhotoSide = (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        flex: "0 0 55%",
      }}
    >
      <img
        src={hotel.img}
        alt={hotel.imgAlt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.9) saturate(0.8)",
          transition: "transform 0.8s ease",
          position: "absolute",
          inset: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* City name bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "60px 32px 28px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(52px,7vw,80px)",
            lineHeight: 0.88,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#fff",
            marginBottom: 10,
          }}
        >
          {hotel.cityDisplay.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 5,
              height: 5,
              background: "#C1272D",
              transform: "rotate(45deg)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#C1272D",
            }}
          >
            {hotel.dates}
          </span>
        </div>
      </div>

      {/* Match badge */}
      <div
        style={{
          position: "absolute",
          top: 24,
          [hotel.photoLeft ? "left" : "right"]: 24,
          background: "rgba(193,39,45,0.92)",
          padding: "7px 14px",
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          {hotel.match}
        </div>
        <div
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            color: "rgba(255,255,255,0.65)",
            marginTop: 2,
          }}
        >
          {hotel.matchTime}
        </div>
      </div>
    </div>
  );

  const InfoSide = (
    <div
      style={{
        flex: "0 0 45%",
        background: hotel.featured ? "#fff" : "#F7F4F0",
        padding: "clamp(32px,4vw,52px) clamp(28px,3.5vw,44px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderLeft: hotel.photoLeft ? "1px solid rgba(0,0,0,0.07)" : "none",
        borderRight: !hotel.photoLeft ? "1px solid rgba(0,0,0,0.07)" : "none",
      }}
    >
      {/* Step marker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: hotel.featured ? "#C1272D" : "transparent",
            border: hotel.featured ? "none" : "1.5px solid rgba(193,39,45,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 12,
              color: hotel.featured ? "#fff" : "#C1272D",
            }}
          >
            {hotel.step}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.28)",
          }}
        >
          {hotel.stepLabel}
        </span>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(18px,2.2vw,26px)",
          lineHeight: 1.1,
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          color: "#111",
          margin: "0 0 10px",
        }}
      >
        {hotel.name}
      </h3>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
        {Array.from({ length: 4 }).map((_, i) => <StarIcon key={i} />)}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 32,
          height: 2,
          background: "#C1272D",
          opacity: 0.35,
          marginBottom: 20,
        }}
      />

      {/* Info rows */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}>
        {infoRows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
              padding: "9px 0",
              borderBottom: i < infoRows.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.28)",
                flexShrink: 0,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: row.light ? 300 : 400,
                fontSize: 12,
                color: row.light ? "rgba(0,0,0,0.5)" : "#111",
                textAlign: "right",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Perk chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {hotel.perks.map((perk) => (
          <span
            key={perk}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 8,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
              background: "rgba(0,0,0,0.05)",
              padding: "4px 9px",
            }}
          >
            {perk}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: hotel.photoLeft ? "row" : "row-reverse",
        minHeight: 500,
        borderTop: "1px solid rgba(0,0,0,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity .8s ease ${index * 0.2}s, transform .8s ease ${index * 0.2}s`,
      }}
      className="hotel-card-flex"
    >
      {PhotoSide}
      {InfoSide}
    </div>
  );
}

export default function HotelsSection() {
  const [ref, visible] = useInView();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="hotels"
        ref={ref}
        style={{
          background: "#F7F4F0",
          padding: "clamp(48px,6vw,88px) 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -20,
            right: -10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(140px,20vw,260px)",
            lineHeight: 1,
            color: "rgba(193,39,45,0.04)",
            textTransform: "uppercase",
            userSelect: "none",
            letterSpacing: "-0.04em",
            pointerEvents: "none",
          }}
        >
          USA
        </div>

        {/* HEADER */}
        <div
          style={{
            padding: "0 clamp(20px,6vw,80px)",
            marginBottom: "clamp(36px,5vw,56px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
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
                  Villes d'Accueil · Hôtels 4★
                </span>
              </div>
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
                Vos Hôtels{" "}
                <span style={{ color: "#C1272D" }}>d'Exception</span>
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
              Deux établissements 4★ à New York et Boston — au plus proche des stades et de l'énergie de la ville.
            </p>
          </div>
        </div>

        {/* HOTEL CARDS */}
        <div>
          {HOTELS.map((hotel, i) => (
            <HotelCard key={hotel.city} hotel={hotel} index={i} visible={visible} />
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div
          style={{
            padding: "20px clamp(20px,6vw,80px)",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            opacity: visible ? 1 : 0,
            transition: "opacity .7s ease .6s",
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              color: "rgba(0,0,0,0.25)",
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            * L'hôtel mentionné est susceptible d'être remplacé par un établissement de standing similaire ou supérieur, en fonction des disponibilités au moment de la réservation.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["New York", "Boston"].map((city, i) => (
              <span key={city} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.28)",
                  }}
                >
                  {city}
                </span>
                {i < 1 && (
                  <span style={{ width: 1, height: 10, background: "rgba(193,39,45,0.25)", display: "inline-block" }} />
                )}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hotel-card-flex { flex-direction: column !important; }
            .hotel-card-flex > div:first-child { min-height: 300px !important; flex: none !important; }
            .hotel-card-flex > div:last-child { flex: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}