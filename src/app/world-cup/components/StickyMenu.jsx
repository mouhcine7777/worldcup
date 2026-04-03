"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Aperçu", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Hotels", href: "#hotels" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Highlight active section
      const sections = ["hero", "overview", "packages", "contact"];
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

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          background: scrolled ? "rgba(10,10,10,0.92)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
        }}
      >
        {/* Top gold accent line — only when scrolled */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.35) 60%, transparent 100%)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 56px)",
            height: 68,
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
              gap: 0,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            {/* Logo 1 — Public Events */}
            <img
              src="/pe.png"
              alt="Public Events"
              style={{
                height: 36,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* Separator */}
            <span
              style={{
                display: "inline-block",
                width: 1,
                height: 28,
                background:
                  "linear-gradient(180deg, transparent, rgba(201,168,76,0.55), transparent)",
                margin: "0 16px",
                flexShrink: 0,
              }}
            />

            {/* Logo 2 — Leonis Travel */}
            <img
              src="/leonis.png"
              alt="Leonis Travel"
              style={{
                height: 36,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 40px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop-links"
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
                      color: isActive ? "#C9A84C" : scrolled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      position: "relative",
                      paddingBottom: 4,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.color = "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {label}
                    {/* active underline */}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 1,
                          background: "#C9A84C",
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── DESKTOP CTA ── */}
          <a
            href="#packages"
            onClick={(e) => handleNav(e, "#packages")}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#000",
              background: "#C9A84C",
              padding: "9px 22px",
              textDecoration: "none",
              flexShrink: 0,
              transition: "background 0.2s",
              display: "inline-block",
            }}
            className="nav-cta-btn"
            onMouseEnter={(e) => (e.target.style.background = "#d4b05a")}
            onMouseLeave={(e) => (e.target.style.background = "#C9A84C")}
          >
            Voir les packages
          </a>

          {/* ── BURGER (mobile) ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
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
            className="nav-burger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: i === 1 ? 18 : 24,
                  height: 1.5,
                  background: "#C9A84C",
                  transition: "transform 0.25s, opacity 0.25s, width 0.25s",
                  transformOrigin: "center",
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
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
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 320 : 0,
            transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
            background: "rgba(10,10,10,0.97)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
          }}
          className="nav-mobile-menu"
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "12px 0 20px",
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
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: isActive ? "#C9A84C" : "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      padding: "12px clamp(20px,5vw,56px)",
                      borderLeft: isActive ? "2px solid #C9A84C" : "2px solid transparent",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li style={{ padding: "12px clamp(20px,5vw,56px) 0" }}>
              <a
                href="#packages"
                onClick={(e) => handleNav(e, "#packages")}
                style={{
                  display: "inline-block",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#000",
                  background: "#C9A84C",
                  padding: "10px 24px",
                  textDecoration: "none",
                }}
              >
                Voir les packages
              </a>
            </li>
          </ul>
        </div>

        {/* ── RESPONSIVE STYLES ── */}
        <style>{`
          @media (max-width: 768px) {
            .nav-desktop-links { display: none !important; }
            .nav-cta-btn { display: none !important; }
            .nav-burger { display: flex !important; }
          }
          @media (min-width: 769px) {
            .nav-mobile-menu { display: none !important; }
          }
        `}</style>
      </nav>

    </>
  );
}