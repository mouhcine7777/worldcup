"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "48", label: "Nations qualifiées" },
  { value: "3", label: "Pays hôtes" },
  { value: "16", label: "Villes hôtes" },
  { value: "100+", label: "Matchs au programme" },
];

const PILLARS = [
  {
    id: "stades",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="14" rx="12" ry="7" stroke="#D71B1B" strokeWidth="1.5" fill="none"/>
        <ellipse cx="14" cy="14" rx="6" ry="3.5" stroke="#D71B1B" strokeWidth="1.5" fill="rgba(215,27,27,0.1)"/>
        <line x1="14" y1="7" x2="14" y2="21" stroke="#D71B1B" strokeWidth="1.2"/>
        <line x1="2" y1="14" x2="26" y2="14" stroke="#D71B1B" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Stades spectaculaires",
    desc: "MetLife Stadium (New York), AT&T Stadium (Dallas), Estadio Azteca (Mexico) — des enceintes légendaires au cœur de l'action.",
  },
  {
    id: "nations",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#D71B1B" strokeWidth="1.5" fill="none"/>
        <path d="M14 3 C10 8 10 20 14 25" stroke="#D71B1B" strokeWidth="1.2" fill="none"/>
        <path d="M14 3 C18 8 18 20 14 25" stroke="#D71B1B" strokeWidth="1.2" fill="none"/>
        <line x1="3.5" y1="10" x2="24.5" y2="10" stroke="#D71B1B" strokeWidth="1.2"/>
        <line x1="3.5" y1="18" x2="24.5" y2="18" stroke="#D71B1B" strokeWidth="1.2"/>
      </svg>
    ),
    title: "Trois nations hôtes",
    desc: "États-Unis, Canada, Mexique — trois pays aux cultures sportives incomparables, réunis pour accueillir le plus grand événement de la planète.",
  },
  {
    id: "culture",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 22 L14 6 L23 22 Z" stroke="#D71B1B" strokeWidth="1.5" fill="rgba(215,27,27,0.08)"/>
        <path d="M8 17 L20 17" stroke="#D71B1B" strokeWidth="1.2"/>
        <circle cx="14" cy="6" r="2" fill="#D71B1B" opacity="0.7"/>
      </svg>
    ),
    title: "Immersion culturelle",
    desc: "Cérémonies d'ouverture et de clôture dignes des plus grands shows internationaux, animations locales et expériences technologiques inédites.",
  },
  {
    id: "atmosphere",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L16.5 10.5 L23.5 10.5 L17.9 14.6 L20.2 21.2 L14 17.2 L7.8 21.2 L10.1 14.6 L4.5 10.5 L11.5 10.5 Z" stroke="#D71B1B" strokeWidth="1.5" fill="rgba(215,27,27,0.1)"/>
      </svg>
    ),
    title: "Atmosphère électrique",
    desc: "Supporters venus des quatre coins du globe, organisation calibrée au millimètre — chaque rencontre promet une intensité hors du commun.",
  },
];

function useInView(threshold = 0.08) {
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

export default function WorldCupSection() {
  const [ref, visible] = useInView();

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        .wc-section {
          background: #0a0a0a;
          padding: clamp(56px, 8vw, 100px) clamp(24px, 6vw, 80px);
          overflow: hidden;
        }

        /* ── HEADER ── */
        .wc-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .wc-eyebrow-line {
          width: 28px;
          height: 2px;
          background: #D71B1B;
          border-radius: 1px;
        }
        .wc-eyebrow-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #D71B1B;
        }
        .wc-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(28px, 4.5vw, 58px);
          color: #fff;
          text-transform: uppercase;
          line-height: 1.05;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .wc-title span {
          color: #D71B1B;
        }
        .wc-subtitle {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: clamp(13px, 1.2vw, 16px);
          color: rgba(255,255,255,0.45);
          margin: 0 0 clamp(36px, 5vw, 60px);
          max-width: 560px;
          line-height: 1.7;
        }

        /* ── STATS BAND ── */
        .wc-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: clamp(36px, 5vw, 60px);
        }
        .wc-stat {
          background: #111;
          padding: clamp(18px, 2.5vw, 28px) clamp(14px, 2vw, 24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .wc-stat-value {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(30px, 4vw, 48px);
          color: #D71B1B;
          line-height: 1;
        }
        .wc-stat-label {
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          font-size: clamp(10px, 0.9vw, 12px);
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
        }

        /* ── BODY GRID ── */
        .wc-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: start;
        }

        /* ── LEFT: editorial text ── */
        .wc-editorial {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .wc-editorial-block {
          border-left: 2px solid rgba(215,27,27,0.35);
          padding-left: 20px;
        }
        .wc-editorial-block h3 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: clamp(13px, 1.2vw, 15px);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 8px;
        }
        .wc-editorial-block p {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: clamp(12px, 1.1vw, 14px);
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          margin: 0;
        }

        .wc-quote {
          position: relative;
          padding: 24px 28px;
          background: rgba(215,27,27,0.06);
          border: 1px solid rgba(215,27,27,0.18);
          border-radius: 10px;
        }
        .wc-quote-mark {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 72px;
          color: rgba(215,27,27,0.18);
          line-height: 0.7;
          display: block;
          margin-bottom: 14px;
        }
        .wc-quote p {
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.2vw, 15px);
          color: rgba(255,255,255,0.75);
          line-height: 1.75;
          margin: 0;
          font-style: italic;
        }

        /* ── RIGHT: pillars grid ── */
        .wc-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .wc-pillar {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .wc-pillar:hover {
          border-color: rgba(215,27,27,0.3);
          background: rgba(215,27,27,0.04);
        }
        .wc-pillar-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: clamp(11px, 1vw, 13px);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }
        .wc-pillar-desc {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: clamp(11px, 0.95vw, 13px);
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
          margin: 0;
        }

        /* ── BOTTOM CTA BAND ── */
        .wc-cta-band {
          margin-top: clamp(36px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: clamp(20px, 3vw, 32px) clamp(24px, 3vw, 40px);
          background: linear-gradient(135deg, rgba(215,27,27,0.12) 0%, rgba(215,27,27,0.04) 100%);
          border: 1px solid rgba(215,27,27,0.22);
          border-radius: 14px;
        }
        .wc-cta-band-text h3 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(16px, 1.8vw, 22px);
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 6px;
          letter-spacing: 0.03em;
        }
        .wc-cta-band-text p {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          font-size: clamp(12px, 1vw, 14px);
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .wc-cta-btn {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          background: #D71B1B;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          padding: 14px 32px;
          transition: background 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .wc-cta-btn:hover {
          background: #b01515;
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .wc-body {
            grid-template-columns: 1fr;
          }
          .wc-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 520px) {
          .wc-pillars {
            grid-template-columns: 1fr;
          }
          .wc-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section className="wc-section" id="worldcup" ref={ref}>

        {/* ── EYEBROW + TITLE ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(22px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}>
          <div className="wc-eyebrow">
            <div className="wc-eyebrow-line" />
            <span className="wc-eyebrow-text">11 Juin — 19 Juillet 2026</span>
          </div>
          <h2 className="wc-title">
            Un tournant<br /><span>historique</span>
          </h2>
          <p className="wc-subtitle">
            Tant par son format élargi que par l'ampleur de ses infrastructures, la Coupe du Monde 2026 s'annonce comme l'édition la plus spectaculaire de tous les temps.
          </p>
        </div>

        {/* ── STATS BAND ── */}
        <div className="wc-stats" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(18px)",
          transition: "opacity .7s ease .15s, transform .7s ease .15s",
        }}>
          {STATS.map((s, i) => (
            <div key={i} className="wc-stat">
              <span className="wc-stat-value">{s.value}</span>
              <span className="wc-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── BODY GRID ── */}
        <div className="wc-body" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(18px)",
          transition: "opacity .7s ease .25s, transform .7s ease .25s",
        }}>

          {/* LEFT: editorial */}
          <div className="wc-editorial">
            <div className="wc-editorial-block">
              <h3>L'Amérique du Nord, un cadre inédit</h3>
              <p>
                Avec des réseaux de transport ultramodernes, des complexes hôteliers de standing international et une capacité d'accueil sans précédent, l'Amérique du Nord offre un cadre digne des plus grands rendez-vous sportifs de la planète.
              </p>
            </div>
            <div className="wc-editorial-block">
              <h3>Plus que du football</h3>
              <p>
                La Coupe du Monde 2026, c'est une immersion totale dans la diversité culturelle du continent nord-américain — des cérémonies d'ouverture et de clôture dignes des plus grands shows internationaux, des expériences technologiques inédites et une hospitalité reconnue mondialement.
              </p>
            </div>
            <div className="wc-quote">
              <span className="wc-quote-mark">"</span>
              <p>Vivez un moment historique où le sport, la culture et l'émotion se rencontrent à une échelle jamais atteinte.</p>
            </div>
          </div>

          {/* RIGHT: pillars */}
          <div className="wc-pillars">
            {PILLARS.map((p, i) => (
              <div key={p.id} className="wc-pillar" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(14px)",
                transition: `opacity .6s ease ${0.3 + i * 0.08}s, transform .6s ease ${0.3 + i * 0.08}s`,
              }}>
                {p.icon}
                <p className="wc-pillar-title">{p.title}</p>
                <p className="wc-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BAND ── */}
        <div className="wc-cta-band" style={{
          opacity: visible ? 1 : 0,
          transition: "opacity .7s ease .5s",
        }}>
          <div className="wc-cta-band-text">
            <h3>Assurez votre place dès maintenant</h3>
            <p>La demande explose déjà — les billets VIP sont disponibles en quantité limitée.</p>
          </div>
          <button className="wc-cta-btn" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
            Voir les packages
          </button>
        </div>

      </section>
    </>
  );
}