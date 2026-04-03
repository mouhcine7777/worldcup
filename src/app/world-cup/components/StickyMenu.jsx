"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Aperçu", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Hôtels", href: "#hotels" },
];

export default function NavBar({ onOpenForm = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", "about", "packages", "hotels"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pulse the CTA every 4s to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes ctaPulse {
          0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.55); }
          60%  { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }
        @keyframes ctaShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cta-pulse { animation: ctaPulse 0.7s ease-out forwards; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          background: scrolled ? "rgba(8,8,18,0.94)" : "rgba(8,8,18,0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.14)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.55)" : "none",
        }}
      >
        {/* Top gold accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.4) 55%, transparent 100%)",
            opacity: scrolled ? 1 : 0.5,
            transition: "opacity 0.35s ease",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 56px)",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* ── LOGOS ── */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img src="/pe.png" alt="Public Events" style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }} />
            <span
              style={{
                display: "inline-block",
                width: 1,
                height: 28,
                background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.55), transparent)",
                margin: "0 16px",
              }}
            />
            <img src="/leonis.png" alt="Leonis Travel" style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }} />
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul
            className="nav-desktop-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 36px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: isActive ? "#C9A84C" : "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      position: "relative",
                      paddingBottom: 4,
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.target.style.color = "rgba(255,255,255,0.85)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.target.style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {label}
                    {isActive && (
                      <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#C9A84C" }} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── DESKTOP CTA ── */}
          <div className="nav-cta-desktop" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {/* Seats indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 6,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                Places disponibles
              </span>
            </div>

            {/* Main CTA */}
            <button
              onClick={() => onOpenForm && onOpenForm()}
              className={pulse ? "cta-pulse" : ""}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#080810",
                background: "linear-gradient(105deg, #C9A84C 0%, #e8c96b 45%, #C9A84C 100%)",
                backgroundSize: "200% auto",
                padding: "0 20px",
                height: 40,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 4,
                transition: "transform 0.15s ease, filter 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Flag emoji */}
              Réserver ma place
              {/* Arrow */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="#080810" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ── BURGER ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="nav-burger"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              flexShrink: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: i === 1 ? 18 : 24,
                  height: 1.5,
                  background: "#C9A84C",
                  transition: "transform 0.25s, opacity 0.25s",
                  transformOrigin: "center",
                  transform: menuOpen
                    ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                    : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        <div
          className="nav-mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 380 : 0,
            transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
            background: "rgba(8,8,18,0.98)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: "12px 0 8px" }}>
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: isActive ? "#C9A84C" : "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      padding: "11px clamp(20px,5vw,56px)",
                      borderLeft: isActive ? "2px solid #C9A84C" : "2px solid transparent",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}

            {/* Mobile CTA */}
            <li style={{ padding: "16px clamp(20px,5vw,56px) 20px" }}>
              <button
                onClick={() => { setMenuOpen(false); onOpenForm && onOpenForm(); }}
                style={{
                  width: "100%",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#080810",
                  background: "linear-gradient(105deg, #C9A84C 0%, #e8c96b 50%, #C9A84C 100%)",
                  padding: "13px 20px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                Réserver ma place
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="#080810" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Available indicator */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block" }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  Places disponibles
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}