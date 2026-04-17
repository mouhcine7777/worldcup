"use client";

import { useState, useEffect, useRef } from "react";
import BookingFormPopup from "./BookingFormPopup";

const PACKAGES = [
  {
    id: 1,
    badge: "Popular",
    city: "New York",
    matchup: "Brésil vs Maroc",
    flags: ["/flag-br.png", "/flag-ma.png"],
    headerImage: "/newyork.jpg",
    stadiumMaps: {
      0: "/stadium-map-ny-corner.png",
      1: "/stadium-map-ny-longside.png",
    },
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
      { label: "Corner / Goal", price: 3290 },
      { label: "Sup Longside", price: 4040 },
    ],
  },
  {
    id: 2,
    badge: "Best-Seller",
    city: "NY + Boston",
    matchup: "2 Matchs du Maroc",
    flags: ["/flag-br.png", "/flag-ma.png", "/flag-sc.png", "/flag-ma.png"],
    headerImage: "/boston.jpg",
    stadiumMaps: {
      0: "/stadium-map-boston-corner.png",
      1: "/stadium-map-boston-longside.png",
    },
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
      { label: "Corner / Goal", price: 5450 },
      { label: "Sup Longside", price: 6400 },
    ],
  },
];

const TicketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="8" y1="5" x2="8" y2="19" strokeDasharray="3 3" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function PackagesSection() {
  const [ref, visible] = useInView();
  const [popupOpen, setPopupOpen] = useState(false);
  const [preselected, setPreselected] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [hoveredSeat, setHoveredSeat] = useState(null); // { pkgId, seatIdx }

  const handleBook = (data) => { setPreselected(data); setPopupOpen(true); };

  const activePkg = expanded ? PACKAGES.find(p => p.id === expanded.pkgId) : null;
  const activeSeat = activePkg ? activePkg.seats[expanded.seatIdx] : null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Barlow:wght@300;400&display=swap" rel="stylesheet" />

      <style>{`
        .pkg-card-wrap {
          flex: 1;
          min-width: 0;
          transition: opacity .4s ease, transform .4s ease;
        }
        .pkg-card-inner {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0,0,0,0.07);
          height: 100%;
        }
        .seat-btn-card {
          transition: all .2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .seat-btn-card:hover {
          border-color: #8B0000 !important;
          background: linear-gradient(135deg, rgba(139,0,0,0.06) 0%, rgba(139,0,0,0.02) 100%) !important;
          box-shadow: 0 4px 16px rgba(139,0,0,0.15) !important;
          transform: translateY(-2px);
        }
        .seat-btn-card:active {
          transform: translateY(0px) scale(0.98);
        }
        .pkg-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: start;
        }
        .pkg-expanded-view {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.07);
          background: #fff;
          display: flex;
          flex-direction: row;
        }
        @media (max-width: 860px) {
          .pkg-cards-grid { grid-template-columns: 1fr !important; }
          .pkg-expanded-view { flex-direction: column !important; }
          .pkg-expanded-right { min-height: 340px !important; }
        }
        @media (max-width: 540px) {
          .pkg-expanded-right { min-height: 260px !important; }
        }
      `}</style>

      <BookingFormPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} preselectedPackage={preselected} />

      <section id="packages" ref={ref} style={{ background: "#f5f5f5", padding: "clamp(48px,6vw,88px) clamp(20px,6vw,80px)" }}>

        {/* ── HEADER ── */}
        <div style={{
          marginBottom: "clamp(28px,4vw,48px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 2, background: "#8B0000", borderRadius: 1 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B0000" }}>Coupe du Monde 2026</span>
          </div>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3.5vw,40px)", color: "#111", margin: "0 0 10px", textTransform: "uppercase" }}>
            Planifiez votre expérience
          </h2>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "clamp(9px,1vw,11px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: 0 }}>
            Soyez au cœur de l'action · De la réservation au coup d'envoi
          </p>
        </div>

        {/* ── DEFAULT: 2 cards ── */}
        {!expanded && (
          <div className="pkg-cards-grid" style={{
            opacity: visible ? 1 : 0,
            transition: "opacity .5s ease .1s",
          }}>
            {PACKAGES.map((pkg, pi) => (
              <div key={pkg.id} className="pkg-card-wrap" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(28px)",
                transition: `opacity .7s ease ${0.1 + pi * 0.15}s, transform .7s ease ${0.1 + pi * 0.15}s`,
              }}>
                <div className="pkg-card-inner">

                  {/* Red header with city image background */}
                  <div style={{ position: "relative", overflow: "hidden", padding: "20px 24px 22px", flexShrink: 0 }}>
                    <img src={pkg.headerImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                        <TicketIcon />
                      </div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "0 0 8px" }}>{pkg.badge}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: pkg.flags.length > 2 ? 5 : 10, marginBottom: 10 }}>
                        {pkg.flags.length > 2 ? (
                          <>
                            <img src={pkg.flags[0]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em" }}>VS</span>
                            <img src={pkg.flags[1]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
                            <img src={pkg.flags[2]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em" }}>VS</span>
                            <img src={pkg.flags[3]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                          </>
                        ) : (
                          <>
                            <img src={pkg.flags[0]} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>VS</span>
                            <img src={pkg.flags[1]} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
                          </>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(18px,2.5vw,26px)", color: "#fff", margin: "0 0 2px", lineHeight: 1.2 }}>{pkg.city}</h3>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "clamp(14px,2vw,20px)", color: "#fff", margin: 0 }}>{pkg.matchup}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>{pkg.dates} · {pkg.duration}</p>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, color: "#111", margin: 0 }}>Infos</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {pkg.includes.map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B0000", flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{t}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {pkg.matches.map((m, i) => (
                        <div key={i} style={{ background: "rgba(139,0,0,0.05)", border: "1px solid rgba(139,0,0,0.15)", borderRadius: 8, padding: "7px 11px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 7 }}>
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#8B0000" }}>{m.date}</span>
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 12, color: "#111" }}>{m.teams}</span>
                          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(0,0,0,0.35)", marginLeft: "auto" }}>{m.stadium}</span>
                        </div>
                      ))}
                    </div>

                    {/* Seat selector — styled as real clickable buttons */}
                    <div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", margin: "0 0 8px" }}>Choisissez votre placement</p>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {pkg.seats.map((s, si) => {
                          const isHovered = hoveredSeat?.pkgId === pkg.id && hoveredSeat?.seatIdx === si;
                          return (
                            <button
                              key={si}
                              className="seat-btn-card"
                              onClick={() => setExpanded({ pkgId: pkg.id, seatIdx: si })}
                              onMouseEnter={() => setHoveredSeat({ pkgId: pkg.id, seatIdx: si })}
                              onMouseLeave={() => setHoveredSeat(null)}
                              style={{
                                flex: 1,
                                minWidth: 130,
                                padding: "14px 16px",
                                border: `2px solid ${isHovered ? "#8B0000" : "rgba(139,0,0,0.2)"}`,
                                borderRadius: 12,
                                background: isHovered
                                  ? "linear-gradient(135deg, rgba(139,0,0,0.07) 0%, rgba(139,0,0,0.02) 100%)"
                                  : "#fff",
                                boxShadow: isHovered
                                  ? "0 6px 20px rgba(139,0,0,0.15)"
                                  : "0 2px 8px rgba(0,0,0,0.06)",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                              }}
                            >
                              {/* Top row: label + arrow */}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{
                                  fontFamily: "'Montserrat',sans-serif",
                                  fontWeight: 700,
                                  fontSize: 10,
                                  letterSpacing: "0.14em",
                                  textTransform: "uppercase",
                                  color: "#8B0000",
                                }}>{s.label}</span>
                                <span style={{ color: "#8B0000", opacity: isHovered ? 1 : 0.4, transition: "opacity .2s, transform .2s", transform: isHovered ? "translateX(3px)" : "none", display: "flex" }}>
                                  <ChevronRight />
                                </span>
                              </div>
                              {/* Price */}
                              <span style={{
                                fontFamily: "'Montserrat',sans-serif",
                                fontWeight: 900,
                                fontSize: 22,
                                color: "#111",
                                lineHeight: 1,
                              }}>{s.price.toLocaleString("fr-FR")} €</span>
                              {/* Subtext */}
                              <span style={{
                                fontFamily: "'Barlow',sans-serif",
                                fontSize: 10,
                                color: "rgba(0,0,0,0.35)",
                              }}>par personne · TTC</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer: subtle prompt only — no CTA until seat selected */}
                    <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(139,0,0,0.3)", display: "inline-block" }} />
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "rgba(0,0,0,0.3)", margin: 0, fontStyle: "italic" }}>
                        Sélectionnez un placement pour réserver
                      </p>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(139,0,0,0.3)", display: "inline-block" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── EXPANDED VIEW ── */}
        {expanded && activePkg && activeSeat && (
          <div className="pkg-expanded-view" style={{ animation: "fadeSlideIn .4s ease forwards" }}>
            <style>{`
              @keyframes fadeSlideIn {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* LEFT: card info */}
            <div style={{ flex: "0 0 clamp(340px, 35%, 480px)", display: "flex", flexDirection: "column", minWidth: 0 }}>

              <div style={{ position: "relative", overflow: "hidden", padding: "20px 24px 22px", flexShrink: 0 }}>
                <img src={activePkg.headerImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <button onClick={() => setExpanded(null)} style={{
                    position: "absolute", top: -8, right: -10,
                    width: 30, height: 30, borderRadius: 999,
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", transition: "background .15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 1l10 10M11 1L1 11" /></svg>
                  </button>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <TicketIcon />
                  </div>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "0 0 8px" }}>{activePkg.badge}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: activePkg.flags.length > 2 ? 5 : 10, marginBottom: 10 }}>
                    {activePkg.flags.length > 2 ? (
                      <>
                        <img src={activePkg.flags[0]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em" }}>VS</span>
                        <img src={activePkg.flags[1]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                        <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
                        <img src={activePkg.flags[2]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em" }}>VS</span>
                        <img src={activePkg.flags[3]} alt="" style={{ width: 28, height: 19, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 6px rgba(0,0,0,0.5)" }} />
                      </>
                    ) : (
                      <>
                        <img src={activePkg.flags[0]} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>VS</span>
                        <img src={activePkg.flags[1]} alt="" style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
                      </>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(18px,2vw,24px)", color: "#fff", margin: "0 0 2px", lineHeight: 1.2 }}>{activePkg.city}</h3>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "clamp(14px,1.6vw,18px)", color: "#fff", margin: 0 }}>{activePkg.matchup}</p>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 14, background: "#fff" }}>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>{activePkg.dates} · {activePkg.duration}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {activePkg.includes.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B0000", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {activePkg.matches.map((m, i) => (
                    <div key={i} style={{ background: "rgba(139,0,0,0.05)", border: "1px solid rgba(139,0,0,0.15)", borderRadius: 8, padding: "7px 11px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 7 }}>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#8B0000" }}>{m.date}</span>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 12, color: "#111" }}>{m.teams}</span>
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(0,0,0,0.35)", marginLeft: "auto" }}>{m.stadium}</span>
                    </div>
                  ))}
                </div>

                {/* Seat selector — highlighted */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {activePkg.seats.map((s, si) => (
                    <button key={si} className="seat-btn-card"
                      onClick={() => setExpanded({ pkgId: activePkg.id, seatIdx: si })}
                      style={{
                        flex: 1, minWidth: 120, padding: "12px 14px",
                        border: expanded.seatIdx === si ? "2px solid #8B0000" : "2px solid rgba(139,0,0,0.15)",
                        borderRadius: 12,
                        background: expanded.seatIdx === si ? "rgba(139,0,0,0.05)" : "#fff",
                        boxShadow: expanded.seatIdx === si ? "0 4px 14px rgba(139,0,0,0.12)" : "0 2px 6px rgba(0,0,0,0.05)",
                        textAlign: "left",
                      }}>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: expanded.seatIdx === si ? "#8B0000" : "rgba(0,0,0,0.4)", margin: "0 0 3px" }}>{s.label}</p>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 18, color: expanded.seatIdx === si ? "#8B0000" : "#111", margin: 0 }}>{s.price.toLocaleString("fr-FR")} €</p>
                    </button>
                  ))}
                </div>

                {/* CTA — visible because seat is selected */}
                <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(0,0,0,0.3)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sélectionné</p>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(22px,2.5vw,30px)", color: "#8B0000", margin: 0, lineHeight: 1 }}>{activeSeat.price.toLocaleString("fr-FR")} €</p>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 10, color: "rgba(0,0,0,0.25)", margin: "3px 0 0" }}>TTC / personne · Vols non inclus</p>
                  </div>
                  <button
                    onClick={() => handleBook({ package: activePkg.id === 1 ? "Package 1 — Brésil vs Maroc (New York)" : "Package 2 — 2 Matchs Maroc (NY + Boston)", categorie: activeSeat.label })}
                    style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "#8B0000", border: "none", borderRadius: 999, cursor: "pointer", padding: "13px 26px", transition: "background .15s ease, transform .15s ease", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(139,0,0,0.3)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#6a0000"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,0,0,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#8B0000"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,0,0,0.3)"; }}>
                    Acheter maintenant
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: stadium map */}
            <div className="pkg-expanded-right" style={{ flex: 1, background: "#f5f5f5", display: "flex", flexDirection: "row", alignItems: "stretch", minHeight: 500, overflow: "hidden" }}>
              <div style={{ width: "clamp(200px, 22%, 280px)", flexShrink: 0, padding: "32px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, borderRight: "1px solid rgba(0,0,0,0.07)" }}>
                <div>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 16px" }}>Placements</p>
                  {activePkg.seats.map((s, si) => {
                    const isActive = expanded.seatIdx === si;
                    return (
                      <div key={si} onClick={() => setExpanded({ pkgId: activePkg.id, seatIdx: si })} style={{ padding: "12px 14px", borderRadius: 10, background: isActive ? "#fff" : "transparent", border: isActive ? "1.5px solid rgba(139,0,0,0.2)" : "1.5px solid transparent", cursor: "pointer", marginBottom: 8, transition: "all .2s ease" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: si === 0 ? "#2563eb" : "#b8860b", flexShrink: 0 }} />
                          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: isActive ? "#8B0000" : "rgba(0,0,0,0.5)", margin: 0 }}>{s.label}</p>
                        </div>
                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 18, color: isActive ? "#8B0000" : "#111", margin: "0 0 0 16px", lineHeight: 1 }}>{s.price.toLocaleString("fr-FR")} €</p>
                        {isActive && <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 10, color: "rgba(0,0,0,0.4)", margin: "3px 0 0 16px" }}>/ personne TTC</p>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: 0 }}>Légende</p>
                  {[{ color: "#2563eb", label: "Corner / Goal" }, { color: "#b8860b", label: "Sup Longside" }].map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
                <img src={activePkg.stadiumMaps[expanded.seatIdx]} alt="Plan du stade" style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }} />
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
}