"use client";
import { useState, useEffect, useRef } from "react";
import BookingFormPopup from "./BookingFormPopup";

const PACKAGES = [
  {
    id: 1,
    badge: "Disponible",
    featured: false,
    city: "New York",
    matchup: "Brésil vs Maroc",
    dates: "12 – 16 juin 2026",
    duration: "5 jours · 4 nuits",
    includes: [
      "The Gallivant Times Square ★★★★",
      "1 billet inclus",
      "Transferts complets",
      "Petit-déjeuner chaque matin",
    ],
    matches: [
      { date: "13 juin · 18:00", teams: "Brésil vs Maroc", stadium: "MetLife Stadium" },
    ],
    seats: [
      { label: "Corner / Goal", price: 2990 },
      { label: "Sup Longside", price: 3740 },
    ],
  },
  {
    id: 2,
    badge: "Le Plus Populaire",
    featured: true,
    city: "NY + Boston",
    matchup: "2 Matchs du Maroc",
    dates: "12 – 20 juin 2026",
    duration: "9 jours · 8 nuits",
    includes: [
      "Gallivant NY + Omni Boston Seaport ★★★★",
      "2 billets inclus",
      "Transferts NY & Boston",
      "Petit-déjeuner chaque matin",
    ],
    matches: [
      { date: "13 juin · 18:00", teams: "Brésil vs Maroc", stadium: "MetLife, New York" },
      { date: "19 juin · 18:00", teams: "Écosse vs Maroc", stadium: "Gillette, Boston" },
    ],
    seats: [
      { label: "Corner / Goal", price: 3690 },
      { label: "Sup Longside", price: 4640 },
    ],
  },
];

const IconHotel = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C1272D" strokeWidth="1.4">
    <rect x="1" y="4" width="12" height="9" rx="0" />
    <path d="M4 13V8h6v5" />
    <path d="M1 4V2.5A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5V4" />
  </svg>
);
const IconTicket = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C1272D" strokeWidth="1.4">
    <rect x="1" y="3" width="12" height="8" rx="0" />
    <line x1="5" y1="3" x2="5" y2="11" strokeDasharray="2 2" />
  </svg>
);
const IconTransfer = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C1272D" strokeWidth="1.4">
    <rect x="1" y="5" width="12" height="5" rx="0" />
    <circle cx="3.5" cy="10.5" r="1.5" />
    <circle cx="10.5" cy="10.5" r="1.5" />
    <path d="M1 5l2-3h6l2 3" />
  </svg>
);
const IconBreakfast = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C1272D" strokeWidth="1.4">
    <path d="M3 3v4a4 4 0 0 0 8 0V3" />
    <line x1="7" y1="11" x2="7" y2="13" />
    <line x1="4" y1="13" x2="10" y2="13" />
    <path d="M11 3c1 0 2 .5 2 2s-1 2-2 2" />
  </svg>
);

const ICONS = [<IconHotel />, <IconTicket />, <IconTransfer />, <IconBreakfast />];

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function PackageCard({ pkg, visible, delay, onBook }) {
  const [seat, setSeat] = useState(0);
  const price = pkg.seats[seat].price;

  const handleReserve = () => {
    onBook({
      package: pkg.id === 1
        ? "Package 1 — Brésil vs Maroc (New York)"
        : "Package 2 — 2 Matchs Maroc (NY + Boston)",
      categorie: pkg.seats[seat].label,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#fff",
        border: pkg.featured ? "1.5px solid rgba(193,39,45,0.35)" : "1px solid rgba(0,0,0,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 3,
          background: pkg.featured
            ? "#C1272D"
            : "rgba(193,39,45,0.25)",
        }}
      />

      {/* Header */}
      <div style={{ padding: "24px 28px 20px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
            padding: "4px 10px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            background: pkg.featured ? "#C1272D" : "rgba(193,39,45,0.08)",
            color: pkg.featured ? "#fff" : "#C1272D",
            border: pkg.featured ? "none" : "1px solid rgba(193,39,45,0.2)",
          }}
        >
          {pkg.featured && (
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
          )}
          {pkg.badge}
        </span>

        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px,4vw,50px)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "#111",
            margin: "0 0 6px",
          }}
        >
          {pkg.city}
        </h3>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C1272D",
            margin: "0 0 4px",
          }}
        >
          {pkg.matchup}
        </p>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: "rgba(0,0,0,0.35)",
            margin: 0,
          }}
        >
          {pkg.dates} · {pkg.duration}
        </p>
      </div>

      <div style={{ margin: "0 28px", height: 1, background: "rgba(0,0,0,0.07)" }} />

      {/* Includes */}
      <div style={{ padding: "16px 28px" }}>
        {pkg.includes.map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
            <div
              style={{
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(193,39,45,0.18)",
                background: "rgba(193,39,45,0.04)",
                flexShrink: 0,
              }}
            >
              {ICONS[i]}
            </div>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                color: "rgba(0,0,0,0.58)",
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ margin: "0 28px", height: 1, background: "rgba(0,0,0,0.07)" }} />

      {/* Matches */}
      <div style={{ padding: "16px 28px" }}>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.25)",
            margin: "0 0 10px",
          }}
        >
          Matchs
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {pkg.matches.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "8px 12px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C1272D",
                  background: "rgba(193,39,45,0.08)",
                  padding: "2px 8px",
                  border: "1px solid rgba(193,39,45,0.15)",
                }}
              >
                {m.date}
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#111",
                }}
              >
                {m.teams}
              </span>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 11,
                  color: "rgba(0,0,0,0.35)",
                  marginLeft: "auto",
                }}
              >
                {m.stadium}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 28px", height: 1, background: "rgba(0,0,0,0.07)" }} />

      {/* Seat selector */}
      <div style={{ padding: "16px 28px" }}>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.25)",
            margin: "0 0 10px",
          }}
        >
          Catégorie
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {pkg.seats.map((s, i) => (
            <button
              key={i}
              onClick={() => setSeat(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: "left",
                padding: "8px 14px",
                border: seat === i
                  ? "1.5px solid #C1272D"
                  : "1px solid rgba(0,0,0,0.12)",
                background: seat === i ? "rgba(193,39,45,0.05)" : "transparent",
                cursor: "pointer",
                transition: "all .15s ease",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: seat === i ? "#C1272D" : "rgba(0,0,0,0.35)",
              }}
            >
              {s.label}
              <strong
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: 15,
                  letterSpacing: "normal",
                  color: seat === i ? "#C1272D" : "#111",
                }}
              >
                {s.price.toLocaleString("fr-FR")} €
              </strong>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "20px 28px 24px",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.25)",
              margin: "0 0 4px",
            }}
          >
            À partir de
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px,4.5vw,52px)",
              lineHeight: 1,
              color: "#111",
              margin: 0,
            }}
          >
            {price.toLocaleString("fr-FR")} €
          </p>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              color: "rgba(0,0,0,0.25)",
              margin: "4px 0 0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            TTC / personne · Vols non inclus
          </p>
        </div>
        <button
          onClick={handleReserve}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#C1272D",
            border: "none",
            cursor: "pointer",
            padding: "12px 22px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "background .15s ease, transform .15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#a8222a";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#C1272D";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Réserver maintenant
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function PackagesSection() {
  const [ref, visible] = useInView();
  const [popupOpen, setPopupOpen] = useState(false);
  const [preselected, setPreselected] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setPopupOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = (data) => {
    setPreselected(data);
    setPopupOpen(true);
  };

  const handleGenericBook = () => {
    setPreselected(null);
    setPopupOpen(true);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <BookingFormPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        preselectedPackage={preselected}
      />

      <section
        id="packages"
        ref={ref}
        style={{
          position: "relative",
          background: "#EDF0ED",
          padding: "clamp(48px,6vw,88px) clamp(20px,6vw,80px)",
          overflow: "hidden",
        }}
      >
        {/* Decorative background number — same as Stades */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -20,
            right: -10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(160px,22vw,280px)",
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

        {/* Header */}
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
                Packages Officiels · Lions de l'Atlas · Coupe du Monde 2026
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
              Choisissez votre{" "}
              <span style={{ color: "#C1272D" }}>aventure</span>
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
            Deux formules tout-inclus pour vivre la Coupe du Monde avec les Lions de l'Atlas — billets, hôtel 4★ et transferts.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="pkg-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              visible={visible}
              delay={0.15 + i * 0.15}
              onBook={handleBook}
            />
          ))}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            opacity: visible ? 1 : 0,
            transition: "opacity .7s ease .5s",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(0,0,0,0.38)",
                margin: "0 0 4px",
              }}
            >
              Besoin d'un accompagnement personnalisé ?
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                color: "rgba(0,0,0,0.55)",
                margin: 0,
              }}
            >
              <strong
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  color: "#111",
                }}
              >
                Public Events × Leonis Travel
              </strong>{" "}
              — votre équipe dédiée à Casablanca
            </p>
          </div>
          <button
            onClick={handleGenericBook}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C1272D",
              background: "transparent",
              border: "1px solid rgba(193,39,45,0.3)",
              cursor: "pointer",
              padding: "12px 22px",
              transition: "all .15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(193,39,45,0.06)";
              e.currentTarget.style.borderColor = "#C1272D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(193,39,45,0.3)";
            }}
          >
            Demander un devis →
          </button>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            color: "rgba(0,0,0,0.22)",
            marginTop: 14,
            position: "relative",
            zIndex: 1,
          }}
        >
          * L'hôtel mentionné est susceptible d'être remplacé par un établissement de standing similaire ou supérieur. Prix TTC par personne. Vols non inclus.
        </p>

        <style>{`
          @media (max-width: 640px) {
            .pkg-cards { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}