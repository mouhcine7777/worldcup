"use client";

import { useEffect, useState } from "react";
import BookingFormPopup from "./BookingFormPopup";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Aperçu", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Hôtels", href: "#hotels" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const onScroll = () => {
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

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenForm = (packageData = null) => {
    setSelectedPackage(packageData);
    setIsPopupOpen(true);
  };

  const handleCloseForm = () => {
    setIsPopupOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Wrapper — positions the pill floating at the top */}
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        {/* Pill container */}
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            background: "#8B0000",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            height: 64,
            boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
          }}
        >
          {/* Logos */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/pe.png"
              alt="Public Events"
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
            <div
              style={{
                width: 1,
                height: 24,
                background: "rgba(255,255,255,0.25)",
              }}
            />
            <img
              src="/leonis.png"
              alt="Leonis Travel"
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* Desktop Nav Links */}
          <ul
            className="nav-desktop-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 40px)",
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
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      paddingBottom: isActive ? 2 : 0,
                      borderBottom: isActive ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.color = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Burger (mobile) */}
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
                  background: "#fff",
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

        {/* Mobile Dropdown */}
        <div
          className="nav-mobile-menu"
          style={{
            position: "absolute",
            top: 72,
            left: 20,
            right: 20,
            overflow: "hidden",
            maxHeight: menuOpen ? 320 : 0,
            transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
            background: "#8B0000",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: "12px 0 16px" }}>
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    style={{
                      display: "block",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      padding: "12px 28px",
                      borderLeft: isActive ? "3px solid #fff" : "3px solid transparent",
                      transition: "color 0.2s",
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li style={{ padding: "8px 28px 4px" }}>
              <button
                onClick={() => { setMenuOpen(false); handleOpenForm(); }}
                style={{
                  width: "100%",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8B0000",
                  background: "#fff",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                }}
              >
                Réserver ma place
              </button>
            </li>
          </ul>
        </div>
      </div>

      <BookingFormPopup
        isOpen={isPopupOpen}
        onClose={handleCloseForm}
        preselectedPackage={selectedPackage}
      />
    </>
  );
}