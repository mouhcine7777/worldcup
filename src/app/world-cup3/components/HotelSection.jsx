"use client";

import { useState } from "react";

const ITEMS = [
  {
    id: "metlife",
    type: "stade",
    city: "New York",
    label: "Stade",
    image: "/metlife-1.png",
    name: "MetLife Stadium",
    address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    match: "Brésil vs Maroc",
    flag1: "/flag-br.png",
    flag2: "/flag-ma.png",
    date: "13 Juin · 18:00",
    capacity: "82 500 places",
    distance: "30 min du centre",
    surface: "Gazon naturel",
    opened: "Inauguré en 2010",
    description: "Le MetLife Stadium, situé dans le New Jersey, est l'une des plus grandes arènes sportives des États-Unis. Il sera l'un des stades phares de la Coupe du Monde 2026, accueillant les matchs les plus décisifs du tournoi.",
    perks: ["82 500 places", "30 min du centre-ville", "Gazon naturel", "Inauguré en 2010"],
  },
  {
    id: "thegallivant",
    type: "hotel",
    city: "New York",
    label: "Hôtel 4★",
    image: "/thegallivant.webp",
    name: "The Gallivant Times Square",
    address: "234 W 48th St, New York, NY 10036",
    description: "Niché au cœur de Times Square, The Gallivant capture l'énergie iconique de New York et l'intensité lumineuse de Broadway. Un établissement moderne, connecté et tourné vers l'expérience New-Yorkaise.",
    perks: ["Au cœur de Times Square", "Accès Broadway & 5th Avenue", "Design urbain & ambiance dynamique", "Transferts hôtel–stade inclus"],
    gallery: ["/thegallivant.webp", "/hotel-ny-2.jpg", "/hotel-ny-3.jpg"],
  },
  {
    id: "gillette",
    type: "stade",
    city: "Boston",
    label: "Stade",
    image: "/gillette-1.png",
    name: "Gillette Stadium",
    address: "1 Patriot Pl, Foxborough, MA 02035",
    match: "Écosse vs Maroc",
    flag1: "/flag-sc.png",
    flag2: "/flag-ma.png",
    date: "19 Juin · 21:00",
    capacity: "65 878 places",
    distance: "45 min du centre",
    surface: "Gazon hybride",
    opened: "Inauguré en 2002",
    description: "Le Gillette Stadium, domicile des New England Patriots, est situé à Foxborough, Massachusetts. Réputé pour son atmosphère électrique, il sera l'un des théâtres incontournables du Mondial 2026.",
    perks: ["65 878 places", "45 min du centre-ville", "Gazon hybride", "Inauguré en 2002"],
  },
  {
    id: "omni",
    type: "hotel",
    city: "Boston",
    label: "Hôtel 4★",
    image: "/omni.jpeg",
    name: "Omni Boston Hotel",
    address: "450 Summer St, Boston, MA 02210",
    description: "Situé au cœur du quartier des affaires de Boston, l'Omni offre un luxe raffiné à quelques minutes de Gillette Stadium. Un établissement 4★ alliant confort moderne et élégance classique.",
    perks: ["À 20 min de Gillette Stadium", "Vue panoramique sur la ville", "Spa & fitness center inclus", "Transferts hôtel–stade inclus"],
    gallery: ["/omni.jpeg", "/hotel-boston-2.jpg", "/hotel-boston-3.jpg"],
  },
];

export default function HotelsStadesSection() {
  const [active, setActive] = useState(null);
  const activeItem = ITEMS.find((i) => i.id === active);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap" rel="stylesheet" />

      <style>{`
        .hs-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s ease;
        }
        .hs-card:hover { transform: translateY(-4px); }
        .hs-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.4s ease;
        }
        .hs-card:hover img { transform: scale(1.05); filter: brightness(0.45); }
        .hs-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 55%, transparent 100%);
          transition: background 0.4s ease;
        }
        .hs-card:hover .hs-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }
        .hs-voir {
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hs-card:hover .hs-voir { opacity: 1; transform: translateY(0); }

        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.72);
          z-index: 2000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: bIn 0.2s ease forwards;
        }
        .modal-box {
          background: #fff;
          width: 100%; max-width: 820px;
          max-height: 88vh; overflow-y: auto;
          border-radius: 16px; position: relative;
          animation: mIn 0.3s cubic-bezier(.77,0,.18,1) forwards;
        }
        @keyframes bIn { from { opacity:0 } to { opacity:1 } }
        @keyframes mIn { from { opacity:0; transform:translateY(20px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }

        @media (max-width: 900px) {
          .hs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .hs-grid { grid-template-columns: 1fr !important; }
          .modal-inner { flex-direction: column !important; }
          .modal-gallery { width: 100% !important; flex-direction: row !important; height: 160px !important; }
          .modal-gallery img { flex: 1; width: 33.33% !important; height: 100% !important; }
        }
      `}</style>

      <section id="hotels" style={{ background: "#f5f5f5", padding: "clamp(48px,6vw,88px) 0" }}>

        {/* Header */}
        <div style={{ padding: "0 clamp(20px,6vw,80px)", marginBottom: "clamp(32px,4vw,56px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 2, background: "#8B0000", borderRadius: 1 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B0000" }}>Coupe du Monde 2026</span>
          </div>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3.5vw,42px)", color: "#111", margin: "0 0 10px", textTransform: "uppercase" }}>
            Hôtels & Stades
          </h2>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "clamp(9px,1vw,11px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: 0, maxWidth: 560 }}>
            Deux villes, deux stades, deux hôtels 4★ — tout est pensé pour vous offrir une expérience complète
          </p>
        </div>

        {/* Full-width grid */}
        <div
          className="hs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 3,
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="hs-card"
              onClick={() => setActive(item.id)}
              style={{ height: "clamp(320px, 42vw, 580px)" }}
            >
              <img src={item.image} alt={item.name} style={{ filter: "brightness(0.6)" }} />
              <div className="hs-overlay" />

              {/* Type badge */}
              <div style={{
                position: "absolute", top: 16, left: 16,
                background: item.type === "stade" ? "#8B0000" : "rgba(255,255,255,0.15)",
                backdropFilter: item.type === "hotel" ? "blur(8px)" : "none",
                border: item.type === "hotel" ? "1px solid rgba(255,255,255,0.2)" : "none",
                color: "#fff",
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "4px 10px", borderRadius: 999,
              }}>
                {item.label}
              </div>

              {/* Bottom content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,2.5vw,28px)" }}>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 6px" }}>
                  {item.city}
                </p>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,26px)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", margin: "0 0 10px", lineHeight: 1.15 }}>
                  {item.name}
                </h3>

                {/* Stadium: show flags + match */}
                {item.type === "stade" && (
                  <div className="hs-voir" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <img src={item.flag1} alt="" style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.5)" }} />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}>VS</span>
                    <img src={item.flag2} alt="" style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.5)" }} />
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)", marginLeft: 4 }}>{item.date}</span>
                  </div>
                )}

                <div className="hs-voir" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 1, background: "#fff" }} />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
                    Voir plus →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {active && activeItem && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}>
          <div className="modal-box">

            {/* Red top accent */}
            <div style={{ height: 3, background: "linear-gradient(90deg, #8B0000 0%, rgba(139,0,0,0.2) 100%)", borderRadius: "16px 16px 0 0" }} />

            {/* Close */}
            <button onClick={() => setActive(null)} style={{
              position: "absolute", top: 16, right: 16,
              width: 32, height: 32, borderRadius: 999,
              background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(0,0,0,0.4)", transition: "all .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; e.currentTarget.style.color = "rgba(0,0,0,0.4)"; }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 1l10 10M11 1L1 11" /></svg>
            </button>

            <div className="modal-inner" style={{ display: "flex" }}>

              {/* Gallery / image */}
              {activeItem.type === "hotel" ? (
                <div className="modal-gallery" style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  {activeItem.gallery.map((src, i) => (
                    <img key={i} src={src} alt={`${activeItem.name} ${i + 1}`} style={{ width: "100%", height: "calc((88vh - 40px) / 3)", objectFit: "cover", display: "block" }} />
                  ))}
                </div>
              ) : (
                <div style={{ width: 260, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                  <img src={activeItem.image} alt={activeItem.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.08) 100%)" }} />
                  {/* Flags overlay */}
                  <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <img src={activeItem.flag1} alt="" style={{ width: 38, height: 25, objectFit: "cover", borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.6)" }} />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em" }}>VS</span>
                    <img src={activeItem.flag2} alt="" style={{ width: 38, height: 25, objectFit: "cover", borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.6)" }} />
                  </div>
                </div>
              )}

              {/* Info */}
              <div style={{ flex: 1, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>

                {/* Type badge */}
                <span style={{ display: "inline-block", background: activeItem.type === "stade" ? "#8B0000" : "rgba(0,0,0,0.06)", color: activeItem.type === "stade" ? "#fff" : "#111", fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999, marginBottom: 12, width: "fit-content" }}>
                  {activeItem.label} · {activeItem.city}
                </span>

                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,22px)", color: "#0d0d0d", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 4 }}>
                  {activeItem.name}
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 16 }}>
                  {activeItem.address}
                </p>

                {/* Stadium: match info */}
                {activeItem.type === "stade" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: "10px 14px", background: "rgba(139,0,0,0.05)", border: "1px solid rgba(139,0,0,0.12)", borderRadius: 8 }}>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#8B0000" }}>{activeItem.date}</span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 12, color: "#111" }}>{activeItem.match}</span>
                  </div>
                )}

                <p style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(0,0,0,0.6)", lineHeight: 1.75, marginBottom: 20 }}>
                  {activeItem.description}
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {activeItem.perks.map((perk, i) => (
                    <li key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0d0d0d", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B0000", flexShrink: 0 }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}